const LOGO_URL =
  "https://i.ibb.co/rRqtGKkw/0db84367-e795-4617-835e-5e0a2bf2ff45.jpg";
const PAYMENT_METHODS = ["instapay", "vodafone_cash", "telda"];
const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
const hex = (b) =>
  [...new Uint8Array(b)].map((n) => n.toString(16).padStart(2, "0")).join("");
const sha = async (v) =>
  hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v)));
const PBKDF2_ITER = 50000;
async function pbkdf2(pw, salt, iter) {
  const k = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pw),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  return hex(
    await crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt, iterations: iter },
      k,
      256,
    ),
  );
}
async function hashPassword(pw) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${PBKDF2_ITER}$${hex(salt)}$${await pbkdf2(pw, salt, PBKDF2_ITER)}`;
}
async function verifyPassword(pw, stored) {
  stored = String(stored || "");
  if (stored.startsWith("pbkdf2$")) {
    const [, it, sl, h] = stored.split("$");
    return (
      (await pbkdf2(
        pw,
        new Uint8Array(sl.match(/../g).map((x) => parseInt(x, 16))),
        Number(it),
      )) === h
    );
  }
  return (await sha(pw)) === stored;
}
const readJson = async (req) => {
  try {
    return await req.json();
  } catch {
    return {};
  }
};
const clean = (s) => String(s ?? "").trim();
const slugify = (s) => {
  const r =
    clean(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `item-${Date.now()}`;
  return r === "api" ? "api-1" : r;
};
const cookie = (value, maxAge) =>
  `kardivo_session=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
const money = (n) => Math.round(Number(n || 0) * 100) / 100;
const bucketOf = (env) =>
  env.R2 || env.MEDIA || env.PAYMENT_PROOFS || env.PRODUCT_ASSETS || null;
const safeFileName = (s) =>
  clean(s)
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .slice(0, 120) || "upload";
const extFromType = (t) =>
  ({
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
  })[String(t || "").toLowerCase()] || "bin";
const htmlEsc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
async function currentUser(req, env) {
  const raw = req.headers.get("Cookie") || "",
    match = raw.match(/(?:^|; )kardivo_session=([^;]+)/);
  if (!match) return null;
  return env.DB.prepare(
    "SELECT u.id,u.name,u.email,u.role FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.id=? AND s.expires_at>? ",
  )
    .bind(match[1], Date.now())
    .first();
}
let adminChecked = false,
  schemaReady = false;
async function ensureAdmin(env) {
  if (adminChecked || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return;
  const email = clean(env.ADMIN_EMAIL).toLowerCase();
  const exists = await env.DB.prepare("SELECT id FROM users WHERE email=?")
    .bind(email)
    .first();
  if (!exists)
    await env.DB.prepare(
      "INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,'admin')",
    )
      .bind("Kardivo Admin", email, await hashPassword(env.ADMIN_PASSWORD))
      .run();
  adminChecked = true;
}
const SECRET_KEYS = ["instapay", "vodafone_cash", "telda"];
// Discord alert for new orders. Needs the DISCORD_WEBHOOK_URL secret; DISCORD_USER_ID (var) is who gets pinged.
// Customer-supplied text only goes inside the embed and allowed_mentions is locked to one user id, so a customer can never ping @everyone or anyone else.
function notifyDiscord(env, ctx, title, fields, label = "New order") {
  const hook = env.DISCORD_WEBHOOK_URL;
  if (!hook) return;
  const uid = String(env.DISCORD_USER_ID || "").replace(/\D/g, ""),
    cut = (v, n) => String(v || "-").slice(0, n) || "-";
  const body = {
    content: (uid ? `<@${uid}> ` : "") + label,
    allowed_mentions: uid ? { users: [uid] } : { parse: [] },
    embeds: [
      {
        title: cut(title, 200),
        color: 0x8b5cf6,
        timestamp: new Date().toISOString(),
        fields: fields
          .slice(0, 10)
          .map(([name, value, inline]) => ({
            name: cut(name, 200),
            value: cut(value, 1000),
            inline: !!inline,
          })),
      },
    ],
  };
  const task = fetch(hook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((r) => {
      if (!r.ok) console.error("discord webhook", r.status);
    })
    .catch((e) => console.error("discord webhook", e));
  if (ctx && ctx.waitUntil) ctx.waitUntil(task);
}

const DEFAULTS = {
  store_name: "Kardivo",
  logo_url: LOGO_URL,
  store_currency: "EGP",
  accent_color: "#8b5cf6",
  announcement: "",
  meta_title: "Digital gaming marketplace",
  meta_description: "Kardivo digital gaming marketplace",
  orders_open: "1",
  orders_closed_text: "Orders are temporarily paused. Please check back soon.",
  order_prefix: "KDV",
  max_qty: "10",
  reserve_hours: "24",
  low_stock_threshold: "3",
  show_stock: "1",
  hero_eyebrow: "DIGITAL GOODS · EGYPT",
  hero_title: "Game night,\nsorted.",
  hero_text:
    "Games, gift cards, subscriptions and digital products without the ancient ritual of hunting through twelve tabs.",
  hero_cta: "Browse store",
  hero_cta2: "How it works",
  trust_1: "✓ Guest checkout",
  trust_2: "✓ Manual payment",
  trust_3: "✓ Human support",
  catalog_eyebrow: "THE CATALOG",
  catalog_title: "Pick your upgrade.",
  search_placeholder: "Search games, cards, subscriptions...",
  deals_eyebrow: "SMART SHOPPING",
  deals_title: "Deals that actually calculate.",
  deals_text:
    "Use a valid discount code at checkout and the server recalculates the total.",
  deal_1: "Clear pricing",
  deal_2: "Stock-aware carts",
  deal_3: "Exact payment total",
  how_eyebrow: "THE PROCESS",
  how_title: "Three steps. No ceremony.",
  step1_title: "Build your cart",
  step1_text:
    "Browse as a guest. Search, filter, sort, add. An account is not required.",
  step2_title: "Choose payment",
  step2_text:
    "At checkout, select an enabled InstaPay, Vodafone Cash, or Telda method and see the exact destination and total.",
  step3_title: "Send proof",
  step3_text:
    "Complete the payment, then send your order number and screenshot to Kardivo Support through WhatsApp.",
  footer_tagline: "Digital goods, minus the nonsense.",
  footer_credit: "Made by 3ellwa",
  instapay: "",
  vodafone_cash: "",
  telda: "",
  instapay_enabled: "1",
  vodafone_cash_enabled: "1",
  telda_enabled: "1",
  whatsapp: "",
  support_text:
    "Send your payment screenshot and order number to Kardivo Support.",
  support_email: "",
  instagram: "",
  facebook: "",
  tiktok: "",
  announcement_ar: "",
  meta_title_ar: "متجر ألعاب ومنتجات رقمية",
  meta_description_ar:
    "Kardivo - متجرك للألعاب وكروت الهدايا والاشتراكات الرقمية في مصر.",
  orders_closed_text_ar:
    "استقبال الطلبات واقف مؤقتاً دلوقتي. ارجع تاني بعد شوية.",
  hero_eyebrow_ar: "منتجات رقمية · مصر",
  hero_title_ar: "سهرة الجيمنج\nجاهزة.",
  hero_text_ar:
    "ألعاب وكروت هدايا واشتراكات ومنتجات رقمية، من غير ما تلف على اتناشر تاب وتتعب نفسك.",
  hero_cta_ar: "شوف المتجر",
  hero_cta2_ar: "إزاي بتطلب؟",
  trust_1_ar: "✓ اطلب كضيف من غير حساب",
  trust_2_ar: "✓ دفع يدوي بالتحويل",
  trust_3_ar: "✓ دعم من ناس حقيقيين",
  catalog_eyebrow_ar: "الكتالوج",
  catalog_title_ar: "اختار اللي نفسك فيه.",
  search_placeholder_ar: "دوّر على ألعاب، كروت، اشتراكات...",
  deals_eyebrow_ar: "وفّر فلوسك",
  deals_title_ar: "خصومات حسابها مظبوط.",
  deals_text_ar:
    "حط كود خصم صالح وانت بتأكد الطلب، والموقع هيحسبلك الإجمالي الجديد أوتوماتيك.",
  deal_1_ar: "أسعار واضحة",
  deal_2_ar: "السلة بتعرف المتاح",
  deal_3_ar: "الإجمالي مظبوط للجنيه",
  how_eyebrow_ar: "الخطوات",
  how_title_ar: "تلات خطوات من غير تعقيد.",
  step1_title_ar: "جهّز سلتك",
  step1_text_ar: "اتفرج وانت ضيف: دوّر، رتّب، وضيف للسلة. مش لازم تعمل حساب.",
  step2_title_ar: "اختار طريقة الدفع",
  step2_text_ar:
    "وانت بتأكد الطلب، اختار إنستاباي أو فودافون كاش أو تيلدا، وهتشوف الرقم اللي هتحوّل عليه والمبلغ بالظبط.",
  step3_title_ar: "ابعت إثبات الدفع",
  step3_text_ar:
    "حوّل المبلغ، وبعدها ابعت رقم الطلب وسكرين شوت التحويل لدعم Kardivo على واتساب.",
  support_text_ar: "ابعت سكرين شوت التحويل ورقم الطلب لدعم Kardivo.",
  footer_tagline_ar: "منتجات رقمية من غير وجع دماغ.",
  footer_credit_ar: "تنفيذ 3ellwa",
  referral_enabled: "1",
  referral_discount_percent: "10",
  referral_reward: "20",
  email_codes: "0",
  backup_keep: "14",
  testimonials_enabled: "1",
};
const SCHEMA_VERSION = 12;
// Columns added over time. Each is added only if missing (additive, never destructive).
const COLUMN_ADDS = [
  ["discounts", "max_uses", "INTEGER"],
  ["discounts", "used_count", "INTEGER NOT NULL DEFAULT 0"],
  ["discounts", "first_order_only", "INTEGER NOT NULL DEFAULT 0"],
  ["discounts", "product_id", "INTEGER"],
  ["discounts", "category_id", "INTEGER"],
  ["discounts", "min_qty", "INTEGER NOT NULL DEFAULT 0"],
  ["discounts", "auto_apply", "INTEGER NOT NULL DEFAULT 0"],
  ["orders", "discount_code", "TEXT"],
  ["orders", "delivery_message", "TEXT DEFAULT ''"],
  ["orders", "payment_proof_key", "TEXT"],
  ["orders", "payment_proof_name", "TEXT"],
  ["orders", "payment_proof_type", "TEXT"],
  ["orders", "payment_proof_hash", "TEXT"],
  ["orders", "payment_ref", "TEXT DEFAULT ''"],
  ["orders", "dup_flag", "TEXT DEFAULT ''"],
  ["orders", "credit_used", "REAL NOT NULL DEFAULT 0"],
  ["orders", "credit_returned", "INTEGER NOT NULL DEFAULT 0"],
  ["orders", "referrer_id", "INTEGER"],
  ["orders", "referral_rewarded", "INTEGER NOT NULL DEFAULT 0"],
  ["orders", "lang", "TEXT DEFAULT 'ar'"],
  ["orders", "reserve_reset_at", "TEXT"],
  ["products", "name_ar", "TEXT DEFAULT ''"],
  ["products", "description_ar", "TEXT DEFAULT ''"],
  ["products", "low_stock_threshold", "INTEGER"],
  ["products", "cost_price", "REAL"],
  ["categories", "name_ar", "TEXT DEFAULT ''"],
  ["inventory", "variant_id", "INTEGER"],
  ["inventory", "batch_id", "INTEGER"],
  ["order_items", "variant_id", "INTEGER"],
  ["order_items", "variant_name", "TEXT DEFAULT ''"],
  ["users", "credit", "REAL NOT NULL DEFAULT 0"],
  ["users", "referral_code", "TEXT"],
  ["product_reviews", "photo_key", "TEXT"],
  ["product_reviews", "featured", "INTEGER NOT NULL DEFAULT 0"],
];
const SCHEMA_TABLES = [
  "CREATE TABLE IF NOT EXISTS product_variants(id INTEGER PRIMARY KEY AUTOINCREMENT,product_id INTEGER NOT NULL,name TEXT NOT NULL,price REAL NOT NULL DEFAULT 0,old_price REAL,active INTEGER NOT NULL DEFAULT 1,sort_order INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE)",
  "CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id,active,sort_order,id)",
  "CREATE INDEX IF NOT EXISTS idx_inventory_variant ON inventory(variant_id,status)",
  "CREATE TABLE IF NOT EXISTS variant_sources(id INTEGER PRIMARY KEY AUTOINCREMENT,variant_id INTEGER NOT NULL,source_product_id INTEGER NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE(variant_id,source_product_id),FOREIGN KEY(variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,FOREIGN KEY(source_product_id) REFERENCES products(id) ON DELETE CASCADE)",
  "CREATE INDEX IF NOT EXISTS idx_variant_sources_variant ON variant_sources(variant_id)",
  "CREATE INDEX IF NOT EXISTS idx_variant_sources_product ON variant_sources(source_product_id)",
  "CREATE TABLE IF NOT EXISTS audit_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,admin_user_id INTEGER,action TEXT NOT NULL,target_type TEXT,target_id INTEGER,details TEXT DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(admin_user_id) REFERENCES users(id) ON DELETE SET NULL)",
  "CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at)",
  "CREATE TABLE IF NOT EXISTS checkout_events(id INTEGER PRIMARY KEY AUTOINCREMENT,event TEXT NOT NULL,session_key TEXT,order_id INTEGER,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  "CREATE INDEX IF NOT EXISTS idx_checkout_events_created ON checkout_events(created_at,event)",
  "CREATE TABLE IF NOT EXISTS product_reviews(id INTEGER PRIMARY KEY AUTOINCREMENT,product_id INTEGER NOT NULL,user_id INTEGER,order_id INTEGER,rating INTEGER NOT NULL,body TEXT DEFAULT '',approved INTEGER NOT NULL DEFAULT 0,photo_key TEXT,featured INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE(product_id,order_id,user_id),FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE SET NULL)",
  "CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id,approved,created_at)",
  "CREATE TABLE IF NOT EXISTS customer_notifications(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER,order_id INTEGER,kind TEXT NOT NULL,title TEXT NOT NULL,message TEXT NOT NULL,read_at TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE SET NULL)",
  "CREATE INDEX IF NOT EXISTS idx_notifications_user ON customer_notifications(user_id,created_at)",
  "CREATE TABLE IF NOT EXISTS login_attempts(key TEXT PRIMARY KEY,count INTEGER NOT NULL,reset_at INTEGER NOT NULL)",
  // ---- V10 ----
  "CREATE TABLE IF NOT EXISTS kd_order_events(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id INTEGER NOT NULL,kind TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  "CREATE INDEX IF NOT EXISTS idx_order_events_order ON kd_order_events(order_id,id)",
  "CREATE TABLE IF NOT EXISTS kd_order_messages(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id INTEGER NOT NULL,sender TEXT NOT NULL,body TEXT NOT NULL,read_by_admin INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  "CREATE INDEX IF NOT EXISTS idx_ordmsg_order ON kd_order_messages(order_id,id)",
  "CREATE TABLE IF NOT EXISTS kd_refund_log(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id INTEGER NOT NULL,kind TEXT NOT NULL DEFAULT 'refund',reason TEXT NOT NULL,note TEXT DEFAULT '',amount REAL,admin_user_id INTEGER,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  "CREATE INDEX IF NOT EXISTS idx_refund_order ON kd_refund_log(order_id)",
  "CREATE TABLE IF NOT EXISTS kd_supplier_batches(id INTEGER PRIMARY KEY AUTOINCREMENT,product_id INTEGER NOT NULL,variant_id INTEGER,supplier TEXT DEFAULT '',unit_cost REAL,quantity INTEGER NOT NULL DEFAULT 0,note TEXT DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  "CREATE TABLE IF NOT EXISTS kd_stock_subscriptions(id INTEGER PRIMARY KEY AUTOINCREMENT,product_id INTEGER NOT NULL,variant_id INTEGER,contact TEXT NOT NULL,is_email INTEGER NOT NULL DEFAULT 0,user_id INTEGER,lang TEXT DEFAULT 'ar',status TEXT NOT NULL DEFAULT 'waiting',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,notified_at TEXT)",
  "CREATE INDEX IF NOT EXISTS idx_stocksub_product ON kd_stock_subscriptions(product_id,status)",
  "CREATE TABLE IF NOT EXISTS kd_credit_ledger(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,amount REAL NOT NULL,reason TEXT NOT NULL,order_id INTEGER,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  "CREATE INDEX IF NOT EXISTS idx_credit_user ON kd_credit_ledger(user_id,id)",
  "CREATE UNIQUE INDEX IF NOT EXISTS idx_credit_once ON kd_credit_ledger(order_id,reason) WHERE reason IN ('referral_reward','referral_reversal','credit_returned')",
  "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_referral ON users(referral_code)",
  "CREATE TABLE IF NOT EXISTS kd_password_resets(token_hash TEXT PRIMARY KEY,user_id INTEGER NOT NULL,expires_at INTEGER NOT NULL)",
  "CREATE TABLE IF NOT EXISTS kd_push_subscriptions(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,endpoint TEXT NOT NULL UNIQUE,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  "CREATE TABLE IF NOT EXISTS kd_admin_alerts(id INTEGER PRIMARY KEY AUTOINCREMENT,kind TEXT NOT NULL,title TEXT NOT NULL,body TEXT DEFAULT '',url TEXT DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  "CREATE TABLE IF NOT EXISTS kd_job_runs(job TEXT PRIMARY KEY,ran_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,ok INTEGER NOT NULL DEFAULT 1,detail TEXT DEFAULT '')",
  "CREATE INDEX IF NOT EXISTS idx_orders_hash ON orders(payment_proof_hash)",
  "CREATE INDEX IF NOT EXISTS idx_orders_ref ON orders(payment_ref)",
];
async function ensureSchema(env) {
  if (schemaReady) return;
  // One cheap read decides whether the migration already ran. A migration costs ~35 D1 calls, so it must not repeat on every cold start.
  let ver = 0;
  try {
    ver = Number(
      (await env.DB.prepare("SELECT v FROM schema_meta WHERE k='version'").first())?.v || 0,
    );
  } catch {}
  if (ver >= SCHEMA_VERSION) {
    schemaReady = true;
    return;
  }
  const have = new Map();
  for (const t of ["discounts", "orders", "products", "categories", "inventory", "order_items", "users", "product_reviews"]) {
    try {
      have.set(
        t,
        new Set(
          (await env.DB.prepare(`PRAGMA table_info(${t})`).all()).results.map((r) => r.name),
        ),
      );
    } catch {
      have.set(t, new Set());
    }
  }
  for (const [t, c, def] of COLUMN_ADDS) {
    if (have.get(t)?.has(c)) continue;
    // Tables that don't exist yet are skipped (schema.sql creates them); duplicate-column races are harmless.
    if (!have.get(t)?.size) continue;
    try {
      await env.DB.prepare(`ALTER TABLE ${t} ADD COLUMN ${c} ${def}`).run();
    } catch (e) {
      if (!/duplicate column/i.test(String(e.message))) throw e;
    }
  }
  await env.DB.batch(SCHEMA_TABLES.map((s) => env.DB.prepare(s)));
  await env.DB.prepare("DELETE FROM login_attempts WHERE reset_at<?").bind(Date.now()).run();
  const rows = Object.entries(DEFAULTS);
  for (let i = 0; i < rows.length; i += 80)
    await env.DB.batch(
      rows
        .slice(i, i + 80)
        .map(([k, v]) =>
          env.DB.prepare("INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)").bind(k, v),
        ),
    );
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS schema_meta(k TEXT PRIMARY KEY,v TEXT)"),
  ]);
  await env.DB.prepare(
    "INSERT INTO schema_meta(k,v) VALUES('version',?) ON CONFLICT(k) DO UPDATE SET v=excluded.v",
  )
    .bind(String(SCHEMA_VERSION))
    .run();
  schemaReady = true;
}
async function allSettings(env) {
  return { ...DEFAULTS, ...(await settings(env)) };
}
async function throttle(env, key, max = 8, windowMs = 900000) {
  const now = Date.now(),
    r = await env.DB.prepare(
      "SELECT count,reset_at FROM login_attempts WHERE key=?",
    )
      .bind(key)
      .first();
  if (r && r.reset_at > now) {
    if (r.count >= max) return false;
    await env.DB.prepare("UPDATE login_attempts SET count=count+1 WHERE key=?")
      .bind(key)
      .run();
    return true;
  }
  await env.DB.prepare(
    "INSERT OR REPLACE INTO login_attempts(key,count,reset_at) VALUES(?,1,?)",
  )
    .bind(key, now + windowMs)
    .run();
  return true;
}
const ipOf = (req) => req.headers.get("cf-connecting-ip") || "x";
async function variantSourceIds(env, variantId) {
  const rows = (
    await env.DB.prepare(
      "SELECT source_product_id FROM variant_sources WHERE variant_id=?",
    )
      .bind(variantId)
      .all()
  ).results;
  return [...new Set(rows.map((r) => Number(r.source_product_id)))];
}
const inMarks = (list) => (list.length ? list.map(() => "?").join(",") : "NULL");
// Stock of one option = codes assigned to that option + codes of the products merged into it.
async function availableCount(env, productId, variantId) {
  if (variantId) {
    const sources = await variantSourceIds(env, variantId);
    return Number(
      (
        await env.DB.prepare(
          `SELECT COUNT(*) n FROM inventory WHERE status='available' AND ((product_id=? AND variant_id=?) OR (variant_id IS NULL AND product_id IN (${inMarks(sources)})))`,
        )
          .bind(productId, variantId, ...sources)
          .first()
      ).n || 0,
    );
  }
  return Number(
    (
      await env.DB.prepare(
        "SELECT COUNT(*) n FROM inventory WHERE status='available' AND product_id=? AND variant_id IS NULL",
      )
        .bind(productId)
        .first()
    ).n || 0,
  );
}
async function orderHolds(env, orderId, productId, variantId) {
  if (variantId) {
    const sources = await variantSourceIds(env, variantId);
    return Number(
      (
        await env.DB.prepare(
          `SELECT COUNT(*) n FROM inventory WHERE order_id=? AND status IN ('reserved','sold') AND ((product_id=? AND variant_id=?) OR (variant_id IS NULL AND product_id IN (${inMarks(sources)})))`,
        )
          .bind(orderId, productId, variantId, ...sources)
          .first()
      ).n || 0,
    );
  }
  return Number(
    (
      await env.DB.prepare(
        "SELECT COUNT(*) n FROM inventory WHERE order_id=? AND product_id=? AND variant_id IS NULL AND status IN ('reserved','sold')",
      )
        .bind(orderId, productId)
        .first()
    ).n || 0,
  );
}
async function priceCart(env, items, s) {
  const maxQty = Math.max(1, Number(s.max_qty) || 10);
  if (!Array.isArray(items) || !items.length)
    return { error: "Cart is empty." };
  const q = new Map();
  for (const x of items) {
    const id = Number(x.product_id);
    const vid = x.variant_id ? Number(x.variant_id) : null;
    const key = `${id}:${vid || 0}`;
    const prev = q.get(key);
    q.set(key, {
      product_id: id,
      variant_id: vid,
      quantity: Math.min(
        maxQty,
        (prev?.quantity || 0) +
          Math.max(1, Math.floor(Number(x.quantity)) || 1),
      ),
    });
  }
  const normalized = [...q.values()],
    ids = [...new Set(normalized.map((x) => x.product_id))];
  const products = (
    await env.DB.prepare(
      `SELECT p.*,c.name category_name,c.name_ar category_name_ar FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.active=1 AND p.id IN (${ids.map(() => "?").join(",")})`,
    )
      .bind(...ids)
      .all()
  ).results;
  const map = new Map(products.map((p) => [p.id, p]));
  let subtotal = 0;
  for (const it of normalized) {
    const p = map.get(it.product_id);
    if (!p) return { error: "One of the products is no longer available." };
    let price = Number(p.price),
      variant = null;
    if (it.variant_id) {
      variant = await env.DB.prepare(
        "SELECT * FROM product_variants WHERE id=? AND product_id=? AND active=1",
      )
        .bind(it.variant_id, p.id)
        .first();
      if (!variant)
        return { error: "One of the selected options is no longer available." };
      price = Number(variant.price);
    } else if (
      await env.DB.prepare(
        "SELECT 1 x FROM product_variants WHERE product_id=? AND active=1 LIMIT 1",
      )
        .bind(p.id)
        .first()
    )
      return { error: `Choose an option for ${p.name}.` };
    if (p.delivery_type === "code") {
      const stock = await availableCount(env, p.id, it.variant_id);
      if (stock < it.quantity)
        return { error: `Not enough stock for ${variant?.name || p.name}.` };
    }
    it.price = price;
    it.variant_name = variant?.name || "";
    subtotal += price * it.quantity;
  }
  return { normalized, map, subtotal: money(subtotal) };
}
async function reserveCodes(env, orderId, productId, qty, variantId = null) {
  let got = 0;
  for (let attempt = 0; attempt < 4 && got < qty; attempt++) {
    const need = qty - got;
    let rows;
    if (variantId) {
      const sources = await variantSourceIds(env, variantId);
      rows = (
        await env.DB.prepare(
          `SELECT id FROM inventory WHERE status='available' AND ((product_id=? AND variant_id=?) OR (variant_id IS NULL AND product_id IN (${inMarks(sources)}))) ORDER BY id LIMIT ?`,
        )
          .bind(productId, variantId, ...sources, need)
          .all()
      ).results;
    } else
      rows = (
        await env.DB.prepare(
          "SELECT id FROM inventory WHERE product_id=? AND variant_id IS NULL AND status='available' ORDER BY id LIMIT ?",
        )
          .bind(productId, need)
          .all()
      ).results;
    if (!rows.length) break;
    for (const r of rows) {
      const u = await env.DB.prepare(
        "UPDATE inventory SET status='reserved',order_id=? WHERE id=? AND status='available'",
      )
        .bind(orderId, r.id)
        .run();
      got += u.meta.changes || 0;
    }
  }
  return got >= qty;
}
async function releaseDiscount(env, orderId) {
  const o = await env.DB.prepare(
    "SELECT discount_code FROM orders WHERE id=? AND discount_code IS NOT NULL",
  )
    .bind(orderId)
    .first();
  if (o?.discount_code)
    await env.DB.prepare(
      "UPDATE discounts SET used_count=MAX(0,COALESCE(used_count,0)-1) WHERE code=? AND used_count>0",
    )
      .bind(o.discount_code)
      .run();
}
async function expireReservations(env, s) {
  const cut = `-${Math.max(1, Number(s.reserve_hours) || 24)} hours`;
  const expired = (
    await env.DB.prepare(
      "SELECT id FROM orders WHERE payment_status='awaiting_payment' AND fulfillment_status='pending' AND payment_proof_key IS NULL AND COALESCE(reserve_reset_at,created_at)<datetime('now',?) AND id IN (SELECT order_id FROM order_items WHERE delivery_type='code')",
    )
      .bind(cut)
      .all()
  ).results;
  if (!expired.length) return 0;
  const ids = expired.map((x) => x.id),
    marks = ids.map(() => "?").join(",");
  await env.DB.prepare(
    `UPDATE inventory SET status='available',order_id=NULL WHERE status='reserved' AND order_id IN (${marks})`,
  )
    .bind(...ids)
    .run();
  for (const id of ids) {
    await releaseDiscount(env, id);
    await releaseCredit(env, id);
    await logEvent(env, id, "cancelled");
  }
  await env.DB.prepare(
    `UPDATE orders SET fulfillment_status='cancelled',notes=TRIM(COALESCE(notes,'')||' [auto-cancelled: payment not received in time]'),updated_at=CURRENT_TIMESTAMP WHERE id IN (${marks})`,
  )
    .bind(...ids)
    .run();
  return ids.length;
}
async function audit(env, admin, action, targetType, targetId, details = "") {
  try {
    await env.DB.prepare(
      "INSERT INTO audit_logs(admin_user_id,action,target_type,target_id,details) VALUES(?,?,?,?,?)",
    )
      .bind(
        admin?.id || null,
        action,
        targetType || null,
        targetId || null,
        String(details || "").slice(0, 2000),
      )
      .run();
  } catch (e) {
    console.error("audit", e);
  }
}
async function customerNotify(env, userId, orderId, kind, title, message) {
  if (!userId) return;
  try {
    await env.DB.prepare(
      "INSERT INTO customer_notifications(user_id,order_id,kind,title,message) VALUES(?,?,?,?,?)",
    )
      .bind(userId, orderId, kind, title, message)
      .run();
  } catch (e) {
    console.error("notification", e);
  }
}
async function productStock(env, p) {
  if (p.variants?.length)
    return p.variants.reduce((n, v) => n + Number(v.stock || 0), 0);
  return Number(
    (
      await env.DB.prepare(
        "SELECT COUNT(*) n FROM inventory WHERE product_id=? AND variant_id IS NULL AND status='available'",
      )
        .bind(p.id)
        .first()
    ).n || 0,
  );
}
async function ordersWithCodes(env, where, ...binds) {
  const orders = (
    await env.DB.prepare(
      `SELECT o.*,(SELECT GROUP_CONCAT(oi.product_name||CASE WHEN COALESCE(oi.variant_name,'')<>'' THEN ' — '||oi.variant_name ELSE '' END||' × '||oi.quantity,', ') FROM order_items oi WHERE oi.order_id=o.id) item_summary FROM orders o WHERE ${where} ORDER BY o.id DESC`,
    )
      .bind(...binds)
      .all()
  ).results;
  const ready = orders
    .filter(
      (o) =>
        o.payment_status === "paid" && o.fulfillment_status === "fulfilled",
    )
    .map((o) => o.id);
  let codes = [];
  if (ready.length)
    codes = (
      await env.DB.prepare(
        `SELECT i.order_id,i.product_id,i.code,p.name product_name,COALESCE(v.name,'') variant_name FROM inventory i JOIN products p ON p.id=i.product_id LEFT JOIN product_variants v ON v.id=i.variant_id WHERE i.status='sold' AND i.order_id IN (${ready.map(() => "?").join(",")})`,
      )
        .bind(...ready)
        .all()
    ).results;
  const evs = orders.length
    ? (
        await env.DB.prepare(
          `SELECT order_id,kind,created_at FROM kd_order_events WHERE order_id IN (${orders.map(() => "?").join(",")}) ORDER BY id`,
        )
          .bind(...orders.map((o) => o.id))
          .all()
      ).results
    : [];
  return orders.map(
    ({
      notes,
      payment_proof_key,
      payment_proof_name,
      payment_proof_type,
      payment_proof_hash,
      dup_flag,
      referrer_id,
      referral_rewarded,
      credit_returned,
      reserve_reset_at,
      ...o
    }) => {
      const out = {
        ...o,
        codes: codes.filter((c) => c.order_id === o.id),
        payment_proof: !!payment_proof_key,
      };
      out.timeline = buildTimeline(out, evs.filter((e) => e.order_id === o.id));
      return out;
    },
  );
}
async function settings(env) {
  const rows = (await env.DB.prepare("SELECT key,value FROM settings").all())
    .results;
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}
async function productList(env, includeInactive = false) {
  const where = includeInactive ? "" : "WHERE p.active=1";
  const rows = (
    await env.DB.prepare(
      `SELECT p.*,c.name category_name,c.name_ar category_name_ar,(SELECT COUNT(*) FROM inventory i WHERE i.product_id=p.id AND i.status='available') stock FROM products p LEFT JOIN categories c ON c.id=p.category_id ${where} ORDER BY p.featured DESC,p.id DESC`,
    ).all()
  ).results;
  const ids = rows.map((x) => x.id);
  const vs = ids.length
    ? (
        await env.DB.prepare(
          `SELECT v.*,(SELECT COUNT(*) FROM inventory i WHERE i.product_id=v.product_id AND i.variant_id=v.id AND i.status='available')+(SELECT COUNT(*) FROM inventory i JOIN variant_sources vs ON vs.source_product_id=i.product_id WHERE vs.variant_id=v.id AND i.variant_id IS NULL AND i.status='available') stock FROM product_variants v WHERE v.product_id IN (${ids.map(() => "?").join(",")}) ORDER BY v.sort_order,v.id`,
        )
          .bind(...ids)
          .all()
      ).results
    : [];
  for (const p of rows) {
    p.variants = vs.filter((v) => v.product_id === p.id);
    if (!includeInactive) {
      delete p.cost_price;
      delete p.low_stock_threshold;
    }
  }
  return rows;
}
const blank = (v) => v === "" || v == null;
const optNum = (v) => (blank(v) || !Number.isFinite(Number(v)) || Number(v) < 0 ? null : Number(v));
const optInt = (v) => (blank(v) || !Number.isFinite(Number(v)) || Number(v) < 0 ? null : Math.floor(Number(v)));
const badNum = (v) => !Number.isFinite(Number(v)) || Number(v) < 0;
function validateProduct(b) {
  if (!clean(b.name)) return "Product name is required.";
  if (blank(b.price) || badNum(b.price))
    return "Price must be a valid non-negative number.";
  if (!blank(b.old_price) && badNum(b.old_price))
    return "Old price must be a valid non-negative number.";
  return null;
}
function validateVariant(b) {
  if (!clean(b.name)) return "Variant name is required.";
  if (blank(b.price) || badNum(b.price))
    return "Variant price must be a valid non-negative number.";
  if (!blank(b.old_price) && badNum(b.old_price))
    return "Variant old price must be a valid non-negative number.";
  return null;
}
function validateDiscount(b) {
  if (!clean(b.code)) return "Enter a discount code.";
  if (blank(b.amount) || badNum(b.amount) || Number(b.amount) <= 0)
    return "Enter a discount amount greater than zero.";
  if (b.type !== "fixed" && Number(b.amount) > 100)
    return "A percentage discount can't exceed 100.";
  if (!blank(b.min_order) && badNum(b.min_order))
    return "Minimum order must be a valid number.";
  if (b.expires_at && !Number.isFinite(Date.parse(b.expires_at)))
    return "Expiry date is not valid.";
  return null;
}
const expiryOf = (v) => (v ? new Date(Date.parse(v)).toISOString() : null);
async function planMerge(env, b) {
  const rawTarget = Number(b.target_id) || 0,
    newName = rawTarget ? "" : clean(b.new_name).slice(0, 120),
    sourceIds = [
      ...new Set(
        (Array.isArray(b.source_ids) ? b.source_ids : [])
          .map(Number)
          .filter(Boolean)
          .filter((x) => x !== rawTarget),
      ),
    ],
    custom = b.options && typeof b.options === "object" ? b.options : {};
  if ((!rawTarget && !newName) || !sourceIds.length)
    return {
      error: "Choose the product to combine into (or type a name for a new one) and at least one product to add.",
      status: 400,
    };
  if (!rawTarget && sourceIds.length < 2)
    return { error: "Choose at least two products to create a new combined product.", status: 400 };
  const ids = rawTarget ? [rawTarget, ...sourceIds] : sourceIds,
    rows = (
      await env.DB.prepare(
        `SELECT p.*,(SELECT COUNT(*) FROM inventory i WHERE i.product_id=p.id AND i.status='available') stock,(SELECT COUNT(*) FROM order_items oi WHERE oi.product_id=p.id) orders FROM products p WHERE p.id IN (${inMarks(ids)})`,
      )
        .bind(...ids)
        .all()
    ).results;
  if (rows.length !== ids.length)
    return { error: "One or more selected products no longer exist.", status: 404 };
  const sources = sourceIds.map((id) => rows.find((x) => x.id === id)),
    target = rawTarget
      ? rows.find((x) => x.id === rawTarget)
      : { id: 0, isNew: true, name: newName, delivery_type: "code", stock: 0, orders: 0, price: Math.min(...sources.map((x) => Number(x.price))) };
  if (target.delivery_type !== "code")
    return { error: "The product you combine into must be a digital-code product.", status: 400 };
  const base = rawTarget
      ? await env.DB.prepare("SELECT COUNT(*) n FROM inventory WHERE product_id=? AND variant_id IS NULL").bind(rawTarget).first()
      : { n: 0 },
    selfMapped = rawTarget
      ? await env.DB.prepare(
          "SELECT 1 x FROM variant_sources vs JOIN product_variants v ON v.id=vs.variant_id WHERE v.product_id=? AND vs.source_product_id=?",
        ).bind(rawTarget, rawTarget).first()
      : null,
    needsSelf = Number(base.n) > 0 && !selfMapped,
    selfExisting = needsSelf
      ? await env.DB.prepare("SELECT id FROM product_variants WHERE product_id=? AND name=?").bind(rawTarget, target.name).first()
      : null,
    names = new Set(needsSelf ? [target.name.toLowerCase()] : []),
    links = [];
  for (const source of sources) {
    if (source.delivery_type !== "code")
      return { error: `${source.name} is manual delivery. Only digital-code products can be combined.`, status: 400 };
    const opt = custom[source.id] || custom[String(source.id)] || {},
      name = clean(opt.name).slice(0, 120) || source.name,
      price = opt.price === undefined || opt.price === "" || opt.price === null ? Number(source.price) : Number(opt.price);
    if (!Number.isFinite(price) || price < 0)
      return { error: `Enter a valid price for "${name}".`, status: 400 };
    if (names.has(name.toLowerCase()))
      return { error: `Two options would be called "${name}". Give each one its own option name.`, status: 400 };
    names.add(name.toLowerCase());
    const already = await env.DB.prepare("SELECT 1 x FROM variant_sources WHERE source_product_id=? AND variant_id IN (SELECT id FROM product_variants WHERE product_id<>?)").bind(source.id, source.id).first();
    if (already) return { error: `${source.name} is already combined into another product. Undo that first.`, status: 409 };
    const own = await env.DB.prepare("SELECT COUNT(*) n FROM product_variants WHERE product_id=?").bind(source.id).first();
    if (Number(own.n) > 0)
      return { error: `${source.name} already has options of its own. Combine only simple products (no options).`, status: 400 };
    const existing = rawTarget
      ? await env.DB.prepare("SELECT id FROM product_variants WHERE product_id=? AND name=?").bind(rawTarget, name).first()
      : null;
    if (existing) {
      const linked = await env.DB.prepare("SELECT id FROM variant_sources WHERE variant_id=? AND source_product_id=?").bind(existing.id, source.id).first();
      if (linked) return { error: `${source.name} is already combined into this product.`, status: 409 };
    }
    links.push({ source, existingId: existing ? existing.id : null, name, price, old_price: opt.price === undefined || opt.price === "" ? source.old_price : null });
  }
  return {
    target,
    sources,
    links,
    selfVariant: needsSelf && !selfExisting,
    selfExisting: needsSelf ? selfExisting : null,
  };
}
async function requireAdmin(req, env) {
  const me = await currentUser(req, env);
  return me && me.role === "admin" ? me : null;
}
// ===================== V10 helpers =====================
const looksEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(s));
const emailReady = (env) =>
  !!(
    clean(env.EMAIL_FROM) &&
    (env.RESEND_API_KEY || (env.MAILGUN_API_KEY && env.MAILGUN_DOMAIN))
  );
const pushReady = (env) => !!(env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY);
// Sends through Resend (RESEND_API_KEY) or Mailgun (MAILGUN_API_KEY + MAILGUN_DOMAIN). Never throws; a mail outage never blocks an order.
function sendEmail(env, ctx, { to, subject, html, text }) {
  if (!emailReady(env) || !looksEmail(to)) return Promise.resolve(false);
  const task = (async () => {
    try {
      let r;
      if (env.RESEND_API_KEY)
        r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            authorization: `Bearer ${env.RESEND_API_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ from: env.EMAIL_FROM, to: [to], subject, html, text }),
        });
      else {
        const host =
          String(env.MAILGUN_REGION || "").toLowerCase() === "eu"
            ? "api.eu.mailgun.net"
            : "api.mailgun.net";
        r = await fetch(`https://${host}/v3/${env.MAILGUN_DOMAIN}/messages`, {
          method: "POST",
          headers: { authorization: "Basic " + btoa("api:" + env.MAILGUN_API_KEY) },
          body: new URLSearchParams({ from: env.EMAIL_FROM, to, subject, html, text }),
        });
      }
      if (!r.ok) console.error("email", r.status, (await r.text()).slice(0, 200));
      return r.ok;
    } catch (e) {
      console.error("email", e);
      return false;
    }
  })();
  if (ctx?.waitUntil) ctx.waitUntil(task);
  return task;
}
function mailTemplate(lang, kind, d, storeName = "Kardivo") {
  const ar = lang !== "en";
  const T = {
    reset: {
      ar: ["إعادة تعيين كلمة المرور", "طلبت إعادة تعيين كلمة المرور. اضغط على الزر لاختيار كلمة مرور جديدة. الرابط صالح لمدة ساعة، ولو ماطلبتش ده تجاهل الرسالة.", "اختيار كلمة مرور جديدة"],
      en: ["Reset your password", "You asked to reset your password. Use the button to choose a new one. The link is valid for one hour. If this wasn't you, ignore this email.", "Choose a new password"],
    },
    delivered: {
      ar: [`طلبك ${d.order || ""} اتسلّم`, "طلبك اتسلّم. تقدر تشوف التفاصيل في أي وقت من «تتبّع الطلب».", "تتبّع الطلب"],
      en: [`Your order ${d.order || ""} is delivered`, "Your order has been delivered. You can see the details any time under Track order.", "Track order"],
    },
    reply: {
      ar: [`رد جديد على طلبك ${d.order || ""}`, "فريق الدعم رد على رسالتك:", "افتح الطلب"],
      en: [`New reply on your order ${d.order || ""}`, "Our support team replied to your message:", "Open order"],
    },
    restock: {
      ar: [`${d.product || ""} رجع متوفر`, "المنتج اللي كنت مستنيه رجع متوفر. الكمية محدودة.", "شوف المنتج"],
      en: [`${d.product || ""} is back in stock`, "The product you were waiting for is back in stock. Quantities are limited.", "View product"],
    },
  }[kind][ar ? "ar" : "en"];
  const [subject, intro, cta] = T;
  const extra = d.extra ? `<div style="margin:14px 0;padding:12px;background:#f4f1fb;border-radius:8px;white-space:pre-wrap">${htmlEsc(d.extra)}</div>` : "";
  const html = `<div dir="${ar ? "rtl" : "ltr"}" style="font-family:Tahoma,Arial,sans-serif;max-width:520px;margin:auto;padding:20px;color:#1c1530"><h2 style="margin:0 0 12px">${htmlEsc(subject)}</h2><p style="line-height:1.7">${htmlEsc(intro)}</p>${extra}${d.url ? `<p style="margin:22px 0"><a href="${htmlEsc(d.url)}" style="background:#7c3aed;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;display:inline-block">${htmlEsc(cta)}</a></p>` : ""}<p style="color:#8a84a0;font-size:12px">${htmlEsc(storeName)}</p></div>`;
  const text = `${subject}\n\n${intro}${d.extra ? "\n\n" + d.extra : ""}${d.url ? `\n\n${cta}: ${d.url}` : ""}\n\n${storeName}`;
  return { subject: `${subject} — ${storeName}`, html, text };
}
// ---- Web push (no payload: the service worker asks /api/admin/push-latest what to show) ----
const b64u = (buf) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
const unb64u = (s) => {
  s = String(s).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(s.padEnd(Math.ceil(s.length / 4) * 4, "=")), (c) => c.charCodeAt(0));
};
async function vapidJwt(env, aud) {
  const pub = unb64u(env.VAPID_PUBLIC_KEY);
  const key = await crypto.subtle.importKey(
    "jwk",
    { kty: "EC", crv: "P-256", d: env.VAPID_PRIVATE_KEY, x: b64u(pub.slice(1, 33)), y: b64u(pub.slice(33, 65)), ext: true },
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"],
  );
  const enc = (o) => b64u(new TextEncoder().encode(JSON.stringify(o)));
  const data =
    enc({ typ: "JWT", alg: "ES256" }) +
    "." +
    enc({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: env.VAPID_SUBJECT || "mailto:admin@example.com" });
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, new TextEncoder().encode(data));
  return data + "." + b64u(sig);
}
async function pushAdmins(env) {
  if (!pushReady(env)) return;
  try {
    const subs = (await env.DB.prepare("SELECT id,endpoint FROM kd_push_subscriptions").all()).results;
    const jwts = new Map();
    await Promise.all(
      subs.slice(0, 20).map(async (sub) => {
        try {
          const aud = new URL(sub.endpoint).origin;
          if (!jwts.has(aud)) jwts.set(aud, await vapidJwt(env, aud));
          const r = await fetch(sub.endpoint, {
            method: "POST",
            headers: {
              Authorization: `vapid t=${jwts.get(aud)}, k=${env.VAPID_PUBLIC_KEY}`,
              TTL: "3600",
              Urgency: "high",
            },
          });
          if (r.status === 404 || r.status === 410)
            await env.DB.prepare("DELETE FROM kd_push_subscriptions WHERE id=?").bind(sub.id).run();
        } catch (e) {
          console.error("push", e);
        }
      }),
    );
  } catch (e) {
    console.error("push", e);
  }
}
// One call for "something needs the admin": Discord + in-app alert row + phone push.
function adminAlert(env, ctx, { kind, title, body = "", url = "/", discord = null, label }) {
  const task = (async () => {
    try {
      await env.DB.prepare("INSERT INTO kd_admin_alerts(kind,title,body,url) VALUES(?,?,?,?)")
        .bind(kind, String(title).slice(0, 200), String(body).slice(0, 500), url)
        .run();
    } catch (e) {
      console.error("alert", e);
    }
    await pushAdmins(env);
  })();
  if (ctx?.waitUntil) ctx.waitUntil(task);
  if (discord) notifyDiscord(env, ctx, title, discord, label);
}
async function logEvent(env, orderId, kind) {
  try {
    await env.DB.prepare("INSERT INTO kd_order_events(order_id,kind) VALUES(?,?)").bind(orderId, kind).run();
  } catch (e) {
    console.error("event", e);
  }
}
const waNumber = (raw) => {
  let d = String(raw || "").replace(/[^\d+]/g, "");
  if (d.startsWith("+")) return d.slice(1);
  if (d.startsWith("00")) return d.slice(2);
  if (/^01\d{9}$/.test(d)) return "2" + d;
  return d.replace(/\D/g, "");
};
const REFUND_REASONS = ["wrong_code", "code_invalid", "duplicate_payment", "out_of_stock", "customer_changed_mind", "fraud", "other"];
const DISPUTE_REASONS = ["payment_not_received", "code_not_working", "wrong_product", "delivery_delay", "chargeback_or_claim", "other"];
const normRef = (v) => {
  const r = clean(v).toUpperCase().replace(/\s+/g, "").slice(0, 64);
  return r.length >= 5 ? r : "";
};
const hashBuf = async (buf) => hex(await crypto.subtle.digest("SHA-256", buf));
const csvCell = (v) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
// ---- store credit & referrals ----
async function releaseCredit(env, orderId) {
  const o = await env.DB.prepare(
    "SELECT user_id,credit_used,credit_returned FROM orders WHERE id=?",
  )
    .bind(orderId)
    .first();
  if (!o || !o.user_id || !(Number(o.credit_used) > 0) || o.credit_returned) return;
  const u = await env.DB.prepare(
    "UPDATE orders SET credit_returned=1 WHERE id=? AND credit_returned=0",
  )
    .bind(orderId)
    .run();
  if (!(u.meta.changes > 0)) return;
  try {
    await env.DB.batch([
      env.DB.prepare(
        "INSERT INTO kd_credit_ledger(user_id,amount,reason,order_id) VALUES(?,?,'credit_returned',?)",
      ).bind(o.user_id, Number(o.credit_used), orderId),
      env.DB.prepare("UPDATE users SET credit=credit+? WHERE id=?").bind(
        Number(o.credit_used),
        o.user_id,
      ),
    ]);
  } catch (e) {
    console.error("credit return", e);
  }
}
async function grantReferral(env, o, s) {
  if (!o.referrer_id || o.referral_rewarded) return;
  const reward = money(Number(s.referral_reward) || 0);
  const c = await env.DB.prepare(
    "UPDATE orders SET referral_rewarded=1 WHERE id=? AND referral_rewarded=0",
  )
    .bind(o.id)
    .run();
  if (!(c.meta.changes > 0) || reward <= 0) return;
  try {
    await env.DB.batch([
      env.DB.prepare(
        "INSERT INTO kd_credit_ledger(user_id,amount,reason,order_id) VALUES(?,?,'referral_reward',?)",
      ).bind(o.referrer_id, reward, o.id),
      env.DB.prepare("UPDATE users SET credit=credit+? WHERE id=?").bind(reward, o.referrer_id),
    ]);
    await customerNotify(
      env,
      o.referrer_id,
      o.id,
      "referral",
      "Referral reward",
      `A friend's order was delivered. ${reward.toFixed(2)} ${s.store_currency || "EGP"} store credit was added to your account.`,
    );
  } catch (e) {
    console.error("referral", e);
  }
}
async function reverseReferral(env, o) {
  if (!o.referrer_id || !o.referral_rewarded) return;
  const r = await env.DB.prepare(
    "SELECT amount FROM kd_credit_ledger WHERE order_id=? AND reason='referral_reward'",
  )
    .bind(o.id)
    .first();
  if (!r) return;
  try {
    await env.DB.batch([
      env.DB.prepare(
        "INSERT INTO kd_credit_ledger(user_id,amount,reason,order_id) VALUES(?,?,'referral_reversal',?)",
      ).bind(o.referrer_id, -Number(r.amount), o.id),
      env.DB.prepare("UPDATE users SET credit=MAX(0,credit-?) WHERE id=?").bind(
        Number(r.amount),
        o.referrer_id,
      ),
    ]);
  } catch (e) {
    /* already reversed */
  }
}
async function referralCodeFor(env, userId) {
  const u = await env.DB.prepare("SELECT referral_code FROM users WHERE id=?").bind(userId).first();
  if (u?.referral_code) return u.referral_code;
  const A = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  for (let i = 0; i < 6; i++) {
    const code = "K" + [...crypto.getRandomValues(new Uint8Array(6))].map((b) => A[b % A.length]).join("");
    try {
      const r = await env.DB.prepare(
        "UPDATE users SET referral_code=? WHERE id=? AND referral_code IS NULL",
      )
        .bind(code, userId)
        .run();
      if (r.meta.changes > 0) return code;
      return (await env.DB.prepare("SELECT referral_code FROM users WHERE id=?").bind(userId).first())?.referral_code || "";
    } catch {
      /* code collision, try another */
    }
  }
  return "";
}
// ---- discounts: percent / fixed, scoped to a product or category, first-order-only, minimum quantity, automatic bundle rules, referral codes ----
const BAD_DISCOUNT =
  "This discount code is invalid, expired, or doesn't apply to your cart.";
const FIRST_ONLY = "This code is only valid on your first order.";
const OWN_REFERRAL = "You can't use your own referral code.";
async function isFirstOrder(env, who) {
  const conds = [],
    binds = [];
  if (who.userId) {
    conds.push("user_id=?");
    binds.push(who.userId);
  }
  for (const c of new Set([who.contact, who.email].map((x) => clean(x).toLowerCase()).filter(Boolean))) {
    conds.push("LOWER(guest_contact)=?");
    binds.push(c);
  }
  if (!conds.length) return true;
  const r = await env.DB.prepare(
    `SELECT 1 x FROM orders WHERE fulfillment_status<>'cancelled' AND payment_status NOT IN ('failed','refunded') AND (${conds.join(" OR ")}) LIMIT 1`,
  )
    .bind(...binds)
    .first();
  return !r;
}
function evalDiscount(d, cart, first) {
  if (d.expires_at) {
    const t = Date.parse(d.expires_at);
    if (Number.isFinite(t) && t < Date.now()) return { error: BAD_DISCOUNT };
  }
  if (d.max_uses != null && Number(d.used_count || 0) >= Number(d.max_uses))
    return { error: BAD_DISCOUNT };
  if (cart.subtotal < Number(d.min_order || 0)) return { error: BAD_DISCOUNT };
  let base = 0,
    qty = 0;
  for (const it of cart.normalized) {
    const p = cart.map.get(it.product_id);
    if (d.product_id && Number(d.product_id) !== p.id) continue;
    if (d.category_id && Number(d.category_id) !== Number(p.category_id)) continue;
    base += it.price * it.quantity;
    qty += it.quantity;
  }
  if (!(base > 0) || Number(d.min_qty || 0) > qty) return { error: BAD_DISCOUNT };
  if (Number(d.first_order_only) && !first) return { error: FIRST_ONLY };
  const raw = d.type === "fixed" ? Number(d.amount) : (base * Math.min(100, Number(d.amount))) / 100;
  return { discount: money(Math.max(0, Math.min(base, raw))) };
}
// `who` = { userId, email, contact }. A coupon the customer typed that is invalid is an error; automatic rules are silent and the larger discount wins (they never stack).
async function calcDiscount(env, rawCode, cart, who, s) {
  const code = clean(rawCode).toUpperCase();
  const rows = (
    await env.DB.prepare("SELECT * FROM discounts WHERE active=1 AND (auto_apply=1 OR code=?)")
      .bind(code)
      .all()
  ).results;
  const coupon = code ? rows.find((d) => d.code === code) : null;
  let referrer = null;
  if (code && !coupon && s.referral_enabled !== "0")
    referrer = await env.DB.prepare("SELECT id,email FROM users WHERE referral_code=?").bind(code).first();
  if (code && !coupon && !referrer) return { error: BAD_DISCOUNT };
  const first =
    referrer || rows.some((d) => Number(d.first_order_only)) ? await isFirstOrder(env, who) : true;
  let best = { code: null, discount: 0, source: null, referrer_id: null };
  if (coupon) {
    const r = evalDiscount(coupon, cart, first);
    if (r.error) return { error: r.error };
    best = { code: coupon.code, discount: r.discount, source: "coupon", referrer_id: null };
  } else if (referrer) {
    const mine = [who.email, who.contact].map((x) => clean(x).toLowerCase());
    if (referrer.id === who.userId || mine.includes(String(referrer.email).toLowerCase()))
      return { error: OWN_REFERRAL };
    if (!first) return { error: FIRST_ONLY };
    const pct = Math.min(90, Math.max(0, Number(s.referral_discount_percent) || 0));
    best = {
      code,
      discount: money(Math.min(cart.subtotal, (cart.subtotal * pct) / 100)),
      source: "referral",
      referrer_id: referrer.id,
    };
  }
  for (const d of rows) {
    if (!Number(d.auto_apply) || (coupon && d.id === coupon.id)) continue;
    const r = evalDiscount(d, cart, first);
    if (!r.error && r.discount > best.discount)
      best = { code: d.code, discount: r.discount, source: "auto", referrer_id: null };
  }
  return best.discount > 0 ? best : { code: null, discount: 0, source: null, referrer_id: null };
}
// Store credit that may be applied to this cart (logged-in customers only).
async function creditFor(env, me, wantCredit, payable) {
  if (!me || !wantCredit || !(payable > 0)) return 0;
  const u = await env.DB.prepare("SELECT credit FROM users WHERE id=?").bind(me.id).first();
  return money(Math.min(Number(u?.credit || 0), payable));
}
// ---- low stock (per-product threshold, falls back to the global one) ----
async function lowStockList(env, s) {
  const th = Number(s.low_stock_threshold) || 3;
  const all = await productList(env, false);
  return all
    .filter((p) => p.delivery_type === "code")
    .map((p) => ({
      id: p.id,
      name: p.name,
      stock: p.variants?.length
        ? p.variants.reduce((n, v) => n + Number(v.stock || 0), 0)
        : Number(p.stock || 0),
      threshold:
        p.low_stock_threshold != null && p.low_stock_threshold !== ""
          ? Number(p.low_stock_threshold)
          : th,
    }))
    .filter((x) => x.stock <= x.threshold)
    .sort((a, b) => a.stock - b.stock);
}
async function sendLowStockAlert(env, ctx, s) {
  const rows = await lowStockList(env, s);
  if (rows.length)
    adminAlert(env, ctx, {
      kind: "low_stock",
      title: "Kardivo low-stock alert",
      body: rows.slice(0, 5).map((x) => `${x.name}: ${x.stock}`).join(", "),
      url: "/?admin_tab=inventory",
      discord: rows.slice(0, 10).map((x) => [x.name, `${x.stock} left (alert at ${x.threshold})`, true]),
      label: "Low stock",
    });
  return rows.length;
}
// ---- bulk code import (used by the paste box and the CSV upload) ----
async function importCodes(env, rows, opts = {}) {
  rows = rows.slice(0, 2000);
  const prods = (await env.DB.prepare("SELECT id,name,slug FROM products").all()).results;
  const vars = (await env.DB.prepare("SELECT id,product_id,name,active FROM product_variants").all()).results;
  const byKey = new Map();
  for (const p of prods) {
    byKey.set(String(p.id), p);
    byKey.set(String(p.slug).toLowerCase(), p);
    byKey.set(String(p.name).trim().toLowerCase(), p);
  }
  const errors = [],
    groups = new Map(),
    seen = new Set();
  let skipped = 0;
  rows.forEach((r, i) => {
    const code = clean(r.code);
    if (!code) return;
    const prodKey = clean(r.product).toLowerCase();
    const p = prodKey ? byKey.get(prodKey) : prods.find((x) => x.id === Number(opts.productId));
    if (!p) {
      errors.push({ line: i + 1, message: prodKey ? `Unknown product "${r.product}"` : "No product selected" });
      return;
    }
    let vid = null;
    const optName = clean(r.option).toLowerCase();
    const pv = vars.filter((v) => v.product_id === p.id);
    if (optName) {
      const v = pv.find((x) => String(x.name).trim().toLowerCase() === optName);
      if (!v) {
        errors.push({ line: i + 1, message: `Unknown option "${r.option}" for ${p.name}` });
        return;
      }
      vid = v.id;
    } else if (opts.variantId && p.id === Number(opts.productId)) {
      const v = pv.find((x) => x.id === Number(opts.variantId));
      if (!v) {
        errors.push({ line: i + 1, message: "Selected variant is invalid." });
        return;
      }
      vid = v.id;
    }
    if (!vid && pv.some((x) => Number(x.active))) {
      errors.push({ line: i + 1, message: `${p.name} has options. Say which option the code belongs to.` });
      return;
    }
    const key = `${p.id}|${code}`;
    if (seen.has(key)) {
      skipped++;
      return;
    }
    seen.add(key);
    const gk = `${p.id}|${vid || 0}`;
    if (!groups.has(gk)) groups.set(gk, { productId: p.id, variantId: vid, codes: [] });
    groups.get(gk).codes.push(code);
  });
  let added = 0;
  const touched = [];
  const trackBatch = !!(clean(opts.supplier) || clean(opts.note) || (opts.unitCost != null && opts.unitCost !== ""));
  for (const g of groups.values()) {
    let batchId = null;
    if (trackBatch) {
      const cost = opts.unitCost === "" || opts.unitCost == null ? null : Number(opts.unitCost);
      batchId = (
        await env.DB.prepare(
          "INSERT INTO kd_supplier_batches(product_id,variant_id,supplier,unit_cost,quantity,note) VALUES(?,?,?,?,0,?)",
        )
          .bind(g.productId, g.variantId, clean(opts.supplier).slice(0, 120), Number.isFinite(cost) ? cost : null, clean(opts.note).slice(0, 300))
          .run()
      ).meta.last_row_id;
    }
    let groupAdded = 0;
    for (let i = 0; i < g.codes.length; i += 100) {
      const res = await env.DB.batch(
        g.codes.slice(i, i + 100).map((code) =>
          env.DB.prepare(
            "INSERT INTO inventory(product_id,code,variant_id,batch_id) SELECT ?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM inventory WHERE product_id=? AND code=?)",
          ).bind(g.productId, code, g.variantId, batchId, g.productId, code),
        ),
      );
      groupAdded += res.reduce((n, r) => n + (r.meta.changes || 0), 0);
    }
    skipped += g.codes.length - groupAdded;
    added += groupAdded;
    if (batchId) {
      if (groupAdded)
        await env.DB.prepare("UPDATE kd_supplier_batches SET quantity=? WHERE id=?").bind(groupAdded, batchId).run();
      else await env.DB.prepare("DELETE FROM kd_supplier_batches WHERE id=?").bind(batchId).run();
    }
    if (groupAdded) touched.push({ productId: g.productId, variantId: g.variantId });
  }
  return { added, skipped, errors: errors.slice(0, 50), error_count: errors.length, touched };
}
// Back-in-stock: email the people who left an email, mark WhatsApp/phone ones "ready" for the admin to message.
async function notifyRestock(env, ctx, productId, variantId, origin = "") {
  const subs = (
    await env.DB.prepare(
      "SELECT * FROM kd_stock_subscriptions WHERE status='waiting' AND product_id=? AND COALESCE(variant_id,0)=COALESCE(?,0)",
    )
      .bind(productId, variantId || null)
      .all()
  ).results;
  if (!subs.length) return 0;
  await env.DB.prepare(
    "UPDATE kd_stock_subscriptions SET status=CASE WHEN is_email=1 THEN 'notified' ELSE 'ready' END,notified_at=CURRENT_TIMESTAMP WHERE status='waiting' AND product_id=? AND COALESCE(variant_id,0)=COALESCE(?,0)",
  )
    .bind(productId, variantId || null)
    .run();
  const p = await env.DB.prepare("SELECT name,name_ar,slug FROM products WHERE id=?").bind(productId).first();
  if (!p) return subs.length;
  origin = origin || env.PUBLIC_ORIGIN || "";
  for (const sub of subs.filter((x) => x.is_email).slice(0, 40)) {
    const lang = sub.lang === "en" ? "en" : "ar";
    const link = `${origin}/${encodeURIComponent(p.slug)}${lang === "en" ? "?lang=en" : ""}`;
    sendEmail(env, ctx, {
      to: sub.contact,
      ...mailTemplate(lang, "restock", { product: lang === "ar" && p.name_ar ? p.name_ar : p.name, url: origin ? link : "" }),
    });
  }
  const ready = subs.filter((x) => !x.is_email).length;
  if (ready)
    adminAlert(env, ctx, {
      kind: "restock",
      title: `Back in stock: ${p.name}`,
      body: `${ready} customer(s) are waiting for a WhatsApp message`,
      url: "/?admin_tab=waitlist",
      discord: [["Product", p.name, true], ["Waiting", `${ready} to message`, true]],
      label: "Back in stock",
    });
  return subs.length;
}
// ---- duplicate payment detection (same proof image bytes, or same transfer reference) ----
async function checkDuplicates(env, ctx, orderId) {
  const o = await env.DB.prepare(
    "SELECT id,order_number,payment_proof_hash,payment_ref,dup_flag FROM orders WHERE id=?",
  )
    .bind(orderId)
    .first();
  if (!o) return;
  const hits = new Map();
  if (o.payment_proof_hash)
    for (const r of (await env.DB.prepare("SELECT id,order_number,dup_flag FROM orders WHERE payment_proof_hash=? AND id<>?").bind(o.payment_proof_hash, o.id).all()).results)
      hits.set(r.id, { r, why: "proof" });
  if (o.payment_ref)
    for (const r of (await env.DB.prepare("SELECT id,order_number,dup_flag FROM orders WHERE payment_ref=? AND id<>?").bind(o.payment_ref, o.id).all()).results)
      hits.set(r.id, { r, why: hits.has(r.id) ? "proof+ref" : "ref" });
  if (!hits.size) return;
  const addFlag = async (id, current, entry) => {
    const set = new Set(String(current || "").split(";").filter(Boolean));
    set.add(entry);
    await env.DB.prepare("UPDATE orders SET dup_flag=? WHERE id=?").bind([...set].join(";"), id).run();
  };
  const mine = [];
  for (const { r, why } of hits.values()) {
    mine.push(`${why}:${r.order_number}`);
    await addFlag(r.id, r.dup_flag, `${why}:${o.order_number}`);
  }
  await addFlag(o.id, o.dup_flag, mine.join(";"));
  adminAlert(env, ctx, {
    kind: "duplicate",
    title: `Possible duplicate payment ${o.order_number}`,
    body: mine.join(", "),
    url: `/?admin_order=${o.id}`,
    discord: [["Order", o.order_number, true], ["Matches", mine.join("\n")]],
    label: "⚠ Duplicate payment?",
  });
}
function buildTimeline(o, events) {
  const at = (k) => events.find((e) => e.kind === k)?.created_at || null;
  const fulfilled = o.fulfillment_status === "fulfilled",
    paid = o.payment_status === "paid" || o.payment_status === "refunded" || fulfilled;
  const steps = [
    { kind: "placed", at: at("placed") || o.created_at, done: true },
    { kind: "proof_received", at: at("proof_received"), done: !!(at("proof_received") || o.payment_proof || paid) },
    { kind: "paid", at: at("paid") || (paid ? o.updated_at : null), done: paid },
    { kind: "delivered", at: at("delivered") || (fulfilled ? o.updated_at : null), done: fulfilled },
  ];
  if (o.fulfillment_status === "cancelled") steps.push({ kind: "cancelled", at: at("cancelled") || o.updated_at, done: true });
  if (o.payment_status === "failed") steps.push({ kind: "failed", at: at("failed") || o.updated_at, done: true });
  if (o.payment_status === "refunded") steps.push({ kind: "refunded", at: at("refunded") || o.updated_at, done: true });
  return steps;
}
// ---- backups: D1 -> gzipped SQL dump in R2 ----
const BACKUP_TABLES = ["users","categories","products","product_variants","variant_sources","kd_supplier_batches","inventory","discounts","orders","order_items","settings","kd_order_events","kd_order_messages","kd_refund_log","kd_stock_subscriptions","kd_credit_ledger","audit_logs","checkout_events","product_reviews","customer_notifications"];
async function runBackup(env, keep = 14) {
  const bucket = bucketOf(env);
  if (!bucket) return { ok: false, error: "R2 storage is not configured." };
  const lit = (v) =>
    v == null
      ? "NULL"
      : typeof v === "number"
        ? Number.isFinite(v) ? String(v) : "NULL"
        : Array.isArray(v)
          ? `X'${hex(Uint8Array.from(v))}'`
          : `'${String(v).replace(/'/g, "''")}'`;
  const out = [`-- Kardivo backup ${new Date().toISOString()}\n-- Restore into an EMPTY database after running schema.sql: wrangler d1 execute <db> --remote --file=<this file>\n`];
  let rows = 0;
  for (const t of BACKUP_TABLES) {
    let last = 0;
    for (;;) {
      let res;
      try {
        res = (await env.DB.prepare(`SELECT rowid AS __rid,* FROM ${t} WHERE rowid>? ORDER BY rowid LIMIT 2000`).bind(last).all()).results;
      } catch {
        break;
      }
      if (!res.length) break;
      for (const r of res) {
        const { __rid, ...cols } = r;
        const names = Object.keys(cols);
        out.push(`INSERT OR REPLACE INTO ${t}(${names.join(",")}) VALUES(${names.map((n) => lit(cols[n])).join(",")});\n`);
        last = __rid;
        rows++;
      }
      if (res.length < 2000) break;
    }
  }
  const gz = await new Response(new Blob(out).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer();
  const key = `backups/kardivo-${new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "").replace("T", "-")}.sql.gz`;
  await bucket.put(key, gz, { httpMetadata: { contentType: "application/gzip" } });
  const list = (await bucket.list({ prefix: "backups/" })).objects.map((o) => o.key).sort();
  for (const old of list.slice(0, Math.max(0, list.length - keep))) await bucket.delete(old);
  return { ok: true, key, bytes: gz.byteLength, rows };
}
async function markJob(env, job, ok, detail) {
  try {
    await env.DB.prepare(
      "INSERT INTO kd_job_runs(job,ran_at,ok,detail) VALUES(?,CURRENT_TIMESTAMP,?,?) ON CONFLICT(job) DO UPDATE SET ran_at=CURRENT_TIMESTAMP,ok=excluded.ok,detail=excluded.detail",
    )
      .bind(job, ok ? 1 : 0, String(detail || "").slice(0, 300))
      .run();
  } catch (e) {
    console.error("job", e);
  }
}
// Hourly cron: release expired reservations. Once a day (03:00 UTC): low-stock alert, D1 backup to R2, housekeeping.
async function runScheduled(env, ctx, event) {
  await ensureSchema(env);
  const s = await allSettings(env);
  const hour = new Date(event?.scheduledTime || Date.now()).getUTCHours();
  const run = async (job, fn) => {
    try {
      await markJob(env, job, 1, await fn());
    } catch (e) {
      console.error(job, e);
      await markJob(env, job, 0, e?.message || e);
    }
  };
  await run("release_reservations", async () => `Released ${await expireReservations(env, s)} unpaid orders`);
  if (hour !== 3 && event?.cron !== "daily") return;
  await run("low_stock_alert", async () => `${await sendLowStockAlert(env, ctx, s)} products low`);
  await run("backup", async () => {
    const r = await runBackup(env, Number(s.backup_keep) || 14);
    if (!r.ok) throw new Error(r.error);
    return `${r.key} (${r.rows} rows, ${Math.round(r.bytes / 1024)} KB)`;
  });
  await run("housekeeping", async () => {
    await env.DB.batch([
      env.DB.prepare("DELETE FROM sessions WHERE expires_at<?").bind(Date.now()),
      env.DB.prepare("DELETE FROM login_attempts WHERE reset_at<?").bind(Date.now()),
      env.DB.prepare("DELETE FROM kd_password_resets WHERE expires_at<?").bind(Date.now()),
      env.DB.prepare("DELETE FROM kd_admin_alerts WHERE created_at<datetime('now','-30 days')"),
      env.DB.prepare("DELETE FROM kd_stock_subscriptions WHERE status<>'waiting' AND created_at<datetime('now','-60 days')"),
    ]);
    return "ok";
  });
}
// Shared by the full order form and the one-click queue actions.
async function applyOrderUpdate(env, ctx, admin, existing, want, origin) {
  const id = existing.id;
  const payment = ["awaiting_payment", "paid", "failed", "refunded"].includes(want.payment_status)
      ? want.payment_status
      : existing.payment_status,
    fulfill = ["pending", "processing", "fulfilled", "cancelled"].includes(want.fulfillment_status)
      ? want.fulfillment_status
      : existing.fulfillment_status;
  if (payment !== existing.payment_status && existing.payment_status === "refunded" && payment !== "refunded")
    return { error: "Refunded orders cannot move back to an active payment state.", status: 409 };
  if (fulfill !== existing.fulfillment_status && existing.fulfillment_status === "fulfilled" && fulfill !== "fulfilled")
    return { error: "Fulfilled orders cannot move backwards. Create a support adjustment instead.", status: 409 };
  if (fulfill === "fulfilled" && payment !== "paid" && !(existing.fulfillment_status === "fulfilled" && payment === "refunded"))
    return { error: "An order must be paid before it can be fulfilled.", status: 409 };
  const newRefund = payment === "refunded" && existing.payment_status !== "refunded";
  if (newRefund && !REFUND_REASONS.includes(want.refund_reason))
    return { error: "Choose a refund reason before marking an order refunded.", status: 400 };
  if (payment === "failed" || payment === "refunded" || fulfill === "cancelled")
    await env.DB.prepare("UPDATE inventory SET status='available',order_id=NULL WHERE order_id=? AND status='reserved'").bind(id).run();
  else if (payment === "paid") {
    const items = (await env.DB.prepare("SELECT * FROM order_items WHERE order_id=? AND delivery_type='code'").bind(id).all()).results;
    for (const item of items) {
      const have = await orderHolds(env, id, item.product_id, item.variant_id);
      const need = Number(item.quantity) - have;
      if (need > 0 && !(await reserveCodes(env, id, item.product_id, need, item.variant_id)))
        return { error: `Not enough codes in stock for ${item.variant_name || item.product_name}. Add codes first, then save again.`, status: 409 };
    }
    if (fulfill === "fulfilled")
      await env.DB.prepare("UPDATE inventory SET status='sold' WHERE order_id=? AND status='reserved'").bind(id).run();
  }
  const dm = want.delivery_message === undefined ? clean(existing.delivery_message) : clean(want.delivery_message),
    notes = want.notes === undefined ? clean(existing.notes) : clean(want.notes);
  const ref = want.payment_ref === undefined ? existing.payment_ref || "" : normRef(want.payment_ref);
  await env.DB.prepare(
    "UPDATE orders SET payment_status=?,fulfillment_status=?,notes=?,delivery_message=?,payment_ref=?,updated_at=CURRENT_TIMESTAMP WHERE id=?",
  )
    .bind(payment, fulfill, notes, dm, ref, id)
    .run();
  if (ref && ref !== existing.payment_ref) await checkDuplicates(env, ctx, id);
  const wasReleased = existing.fulfillment_status === "cancelled" || existing.payment_status === "failed",
    nowReleased = fulfill === "cancelled" || payment === "failed";
  if (nowReleased && !wasReleased) {
    if (existing.discount_code) await releaseDiscount(env, id);
  }
  if ((nowReleased && !wasReleased) || newRefund) await releaseCredit(env, id);
  if (payment !== existing.payment_status) await logEvent(env, id, payment === "awaiting_payment" ? "placed" : payment);
  if (fulfill !== existing.fulfillment_status && fulfill !== "pending" && fulfill !== "processing")
    await logEvent(env, id, fulfill === "fulfilled" ? "delivered" : fulfill);
  const order = { ...existing, payment_status: payment, fulfillment_status: fulfill, delivery_message: dm };
  if (payment === "paid" && fulfill === "fulfilled" && !(existing.payment_status === "paid" && existing.fulfillment_status === "fulfilled"))
    await grantReferral(env, order, await allSettings(env));
  if (newRefund) {
    await reverseReferral(env, order);
    await env.DB.prepare("INSERT INTO kd_refund_log(order_id,kind,reason,note,amount,admin_user_id) VALUES(?,?,?,?,?,?)")
      .bind(id, "refund", want.refund_reason, clean(want.refund_note).slice(0, 500), Number.isFinite(Number(want.refund_amount)) && want.refund_amount !== "" && want.refund_amount != null ? Number(want.refund_amount) : Number(existing.total), admin?.id || null)
      .run();
  }
  await audit(env, admin, "order_update", "order", id, `${existing.payment_status}/${existing.fulfillment_status} -> ${payment}/${fulfill}`);
  if (existing.user_id && payment !== existing.payment_status)
    await customerNotify(env, existing.user_id, id, "payment", `Payment ${payment}`, `Order ${existing.order_number}: payment status is now ${payment}.`);
  if (existing.user_id && fulfill !== existing.fulfillment_status)
    await customerNotify(env, existing.user_id, id, "fulfillment", `Order ${fulfill}`, `Order ${existing.order_number}: delivery status is now ${fulfill}.${dm ? ` ${dm}` : ""}`);
  if (fulfill === "fulfilled" && existing.fulfillment_status !== "fulfilled")
    await emailDelivered(env, ctx, order, origin);
  return { ok: true, payment, fulfill };
}
async function emailDelivered(env, ctx, order, origin) {
  if (!emailReady(env)) return;
  const u = order.user_id ? await env.DB.prepare("SELECT email FROM users WHERE id=?").bind(order.user_id).first() : null;
  const to = u?.email || (looksEmail(order.guest_contact) ? clean(order.guest_contact) : "");
  if (!to) return;
  const s = await allSettings(env);
  let extra = clean(order.delivery_message);
  if (s.email_codes === "1") {
    const codes = (await env.DB.prepare("SELECT code FROM inventory WHERE order_id=? AND status='sold'").bind(order.id).all()).results;
    if (codes.length) extra = (extra ? extra + "\n\n" : "") + codes.map((c) => c.code).join("\n");
  }
  sendEmail(env, ctx, { to, ...mailTemplate(order.lang, "delivered", { order: order.order_number, extra, url: origin ? `${origin}/?track=${encodeURIComponent(order.order_number)}` : "" }, s.store_name) });
}
async function api(req, env, url, ctx) {
  if (!env.DB)
    return json(
      {
        error:
          "D1 binding DB is missing. Add it in wrangler.toml or the Cloudflare dashboard.",
      },
      500,
    );
  await ensureSchema(env);
  await ensureAdmin(env);
  const method = req.method,
    path = url.pathname,
    me = await currentUser(req, env);
  if (method !== "GET" && method !== "HEAD") {
    const o = req.headers.get("Origin");
    let originHost = "";
    if (o) {
      try {
        originHost = new URL(o).host;
      } catch {
        originHost = "invalid";
      }
    }
    if (o && originHost !== url.host)
      return json({ error: "Bad origin." }, 403);
  }
  if (path === "/api/health")
    return json({ ok: true, version: "10.0.0", logo: LOGO_URL });
  if (path === "/api/me" && method === "GET") return json({ user: me });
  if (path === "/api/categories" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT * FROM categories ORDER BY name COLLATE NOCASE",
        ).all()
      ).results,
    );
  if (path === "/api/products" && method === "GET")
    return json(await productList(env, false));
  const productSlugMatch = path.match(/^\/api\/products\/([^/]+)$/);
  if (productSlugMatch && method === "GET") {
    const slug = decodeURIComponent(productSlugMatch[1]);
    const product = await env.DB.prepare(
      "SELECT p.*,c.name category_name,c.name_ar category_name_ar,(SELECT COUNT(*) FROM inventory i WHERE i.product_id=p.id AND i.status='available') stock FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.slug=? AND p.active=1 LIMIT 1",
    )
      .bind(slug)
      .first();
    if (!product) return json({ error: "Product not found." }, 404);
    product.variants = (
      await env.DB.prepare(
        "SELECT v.*,(SELECT COUNT(*) FROM inventory i WHERE i.product_id=v.product_id AND i.variant_id=v.id AND i.status='available')+(SELECT COUNT(*) FROM inventory i JOIN variant_sources vs ON vs.source_product_id=i.product_id WHERE vs.variant_id=v.id AND i.variant_id IS NULL AND i.status='available') stock FROM product_variants v WHERE v.product_id=? AND v.active=1 ORDER BY v.sort_order,v.id",
      )
        .bind(product.id)
        .all()
    ).results;
    delete product.cost_price;
    delete product.low_stock_threshold;
    product.reviews = (
      await env.DB.prepare(
        "SELECT r.id,r.rating,r.body,r.created_at,r.photo_key,u.name user_name FROM product_reviews r LEFT JOIN users u ON u.id=r.user_id WHERE r.product_id=? AND r.approved=1 ORDER BY r.id DESC LIMIT 20",
      )
        .bind(product.id)
        .all()
    ).results;
    for (const r of product.reviews) {
      r.photo = r.photo_key ? `/media/review/${encodeURIComponent(r.photo_key)}` : "";
      delete r.photo_key;
    }
    return json(product);
  }
  if (path === "/api/settings/public" && method === "GET") {
    const s = await allSettings(env),
      out = {};
    for (const [k, v] of Object.entries(s)) {
      if (!SECRET_KEYS.includes(k)) out[k] = v;
    }
    for (const k of SECRET_KEYS) {
      out[k + "_enabled"] = s[k + "_enabled"] !== "0";
      out[k + "_ready"] = s[k + "_enabled"] !== "0" && !!clean(s[k]);
    }
    out.orders_open = s.orders_open !== "0";
    out.show_stock = s.show_stock !== "0";
    out.logo_url = clean(s.logo_url) || LOGO_URL;
    out.email_ready = emailReady(env);
    out.push_ready = pushReady(env);
    out.vapid_public_key = pushReady(env) ? env.VAPID_PUBLIC_KEY : "";
    out.referral_enabled = s.referral_enabled !== "0";
    out.testimonials_enabled = s.testimonials_enabled !== "0";
    delete out.email_codes;
    delete out.backup_keep;
    return json(out);
  }
  if (path === "/api/auth/register" && method === "POST") {
    const b = await readJson(req);
    if (!(await throttle(env, `register:${ipOf(req)}`, 10)))
      return json({ error: "Too many attempts. Try again later." }, 429);
    const name = clean(b.name),
      email = clean(b.email).toLowerCase(),
      password = String(b.password || "");
    if (name.length < 2 || !email.includes("@") || password.length < 8)
      return json(
        {
          error:
            "Enter a valid name, email, and password of at least 8 characters.",
        },
        400,
      );
    if (
      await env.DB.prepare("SELECT id FROM users WHERE email=?")
        .bind(email)
        .first()
    )
      return json({ error: "Email already exists." }, 409);
    const r = await env.DB.prepare(
      "INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,'customer')",
    )
      .bind(name, email, await hashPassword(password))
      .run();
    const sid = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO sessions(id,user_id,expires_at) VALUES(?,?,?)",
    )
      .bind(sid, r.meta.last_row_id, Date.now() + 2592000000)
      .run();
    return json(
      { user: { id: r.meta.last_row_id, name, email, role: "customer" } },
      201,
      { "Set-Cookie": cookie(sid, 2592000) },
    );
  }
  if (path === "/api/auth/login" && method === "POST") {
    const b = await readJson(req),
      email = clean(b.email).toLowerCase(),
      pw = String(b.password || ""),
      tkey = `login:${ipOf(req)}:${email}`;
    if (!(await throttle(env, tkey)))
      return json(
        { error: "Too many login attempts. Try again in 15 minutes." },
        429,
      );
    const row = await env.DB.prepare(
      "SELECT id,name,email,role,password_hash FROM users WHERE email=?",
    )
      .bind(email)
      .first();
    if (!row || !(await verifyPassword(pw, row.password_hash)))
      return json({ error: "Invalid email or password." }, 401);
    if (!String(row.password_hash).startsWith("pbkdf2$"))
      await env.DB.prepare("UPDATE users SET password_hash=? WHERE id=?")
        .bind(await hashPassword(pw), row.id)
        .run();
    await env.DB.prepare("DELETE FROM login_attempts WHERE key=?")
      .bind(tkey)
      .run();
    await env.DB.prepare("DELETE FROM sessions WHERE expires_at<?")
      .bind(Date.now())
      .run();
    const sid = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO sessions(id,user_id,expires_at) VALUES(?,?,?)",
    )
      .bind(sid, row.id, Date.now() + 2592000000)
      .run();
    return json(
      {
        user: { id: row.id, name: row.name, email: row.email, role: row.role },
      },
      200,
      { "Set-Cookie": cookie(sid, 2592000) },
    );
  }
  if (path === "/api/auth/logout" && method === "POST") {
    const raw = req.headers.get("Cookie") || "",
      match = raw.match(/(?:^|; )kardivo_session=([^;]+)/);
    if (match)
      await env.DB.prepare("DELETE FROM sessions WHERE id=?")
        .bind(match[1])
        .run();
    return new Response("ok", { headers: { "Set-Cookie": cookie("", 0) } });
  }
  if (path === "/api/auth/forgot" && method === "POST") {
    const b = await readJson(req),
      email = clean(b.email).toLowerCase(),
      okReply = json({ ok: true });
    if (!(await throttle(env, `forgot:${ipOf(req)}`, 6, 3600000)))
      return json({ error: "Too many attempts. Try again later." }, 429);
    if (!emailReady(env)) return json({ error: "Password reset by email isn't set up yet. Contact support." }, 503);
    if (!looksEmail(email) || !(await throttle(env, `forgot-email:${email}`, 3, 3600000))) return okReply;
    const u = await env.DB.prepare("SELECT id,name FROM users WHERE email=?").bind(email).first();
    if (!u) return okReply;
    const token = hex(crypto.getRandomValues(new Uint8Array(32)));
    await env.DB.batch([
      env.DB.prepare("DELETE FROM kd_password_resets WHERE user_id=?").bind(u.id),
      env.DB.prepare("INSERT INTO kd_password_resets(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(await sha(token), u.id, Date.now() + 3600000),
    ]);
    const st = await allSettings(env),
      lang = b.lang === "en" ? "en" : "ar";
    sendEmail(env, ctx, { to: email, ...mailTemplate(lang, "reset", { url: `${url.origin}/?reset=${token}${lang === "en" ? "&lang=en" : ""}` }, st.store_name) });
    return okReply;
  }
  if (path === "/api/auth/reset" && method === "POST") {
    const b = await readJson(req),
      pw = String(b.password || "");
    if (!(await throttle(env, `reset:${ipOf(req)}`, 15, 3600000)))
      return json({ error: "Too many attempts. Try again later." }, 429);
    if (pw.length < 8) return json({ error: "New password must be at least 8 characters." }, 400);
    const th = await sha(String(b.token || "")),
      r = await env.DB.prepare("SELECT user_id,expires_at FROM kd_password_resets WHERE token_hash=?").bind(th).first();
    if (!r || r.expires_at < Date.now())
      return json({ error: "This reset link is invalid or has expired. Request a new one." }, 400);
    const claim = await env.DB.prepare("DELETE FROM kd_password_resets WHERE token_hash=?").bind(th).run();
    if (!(claim.meta.changes > 0)) return json({ error: "This reset link is invalid or has expired. Request a new one." }, 400);
    await env.DB.batch([
      env.DB.prepare("UPDATE users SET password_hash=? WHERE id=?").bind(await hashPassword(pw), r.user_id),
      env.DB.prepare("DELETE FROM sessions WHERE user_id=?").bind(r.user_id),
    ]);
    return json({ ok: true });
  }
  if (path === "/api/me/referral" && method === "GET") {
    if (!me) return json({ error: "Login required." }, 401);
    const s = await allSettings(env),
      code = s.referral_enabled === "0" ? "" : await referralCodeFor(env, me.id),
      u = await env.DB.prepare("SELECT credit FROM users WHERE id=?").bind(me.id).first(),
      invited = await env.DB.prepare("SELECT COUNT(*) n FROM orders WHERE referrer_id=? AND fulfillment_status<>'cancelled'").bind(me.id).first(),
      ledger = (await env.DB.prepare("SELECT amount,reason,created_at FROM kd_credit_ledger WHERE user_id=? ORDER BY id DESC LIMIT 10").bind(me.id).all()).results;
    return json({
      enabled: s.referral_enabled !== "0",
      code,
      credit: money(u?.credit),
      discount_percent: Number(s.referral_discount_percent) || 0,
      reward: Number(s.referral_reward) || 0,
      invited: Number(invited.n),
      ledger,
    });
  }
  if (path === "/api/stock-subscribe" && method === "POST") {
    const b = await readJson(req),
      pid = Number(b.product_id),
      vid = b.variant_id ? Number(b.variant_id) : null,
      contact = clean(b.contact).slice(0, 120);
    if (!(await throttle(env, `stocksub:${ipOf(req)}`, 10, 3600000)))
      return json({ error: "Too many attempts. Try again later." }, 429);
    if (!pid || contact.length < 5) return json({ error: "Enter an email or WhatsApp number." }, 400);
    const p = await env.DB.prepare("SELECT id FROM products WHERE id=? AND active=1").bind(pid).first();
    if (!p) return json({ error: "Product not found." }, 404);
    const dup = await env.DB.prepare(
      "SELECT id FROM kd_stock_subscriptions WHERE status='waiting' AND product_id=? AND COALESCE(variant_id,0)=COALESCE(?,0) AND LOWER(contact)=?",
    ).bind(pid, vid, contact.toLowerCase()).first();
    if (!dup)
      await env.DB.prepare("INSERT INTO kd_stock_subscriptions(product_id,variant_id,contact,is_email,user_id,lang) VALUES(?,?,?,?,?,?)")
        .bind(pid, vid, contact, looksEmail(contact) ? 1 : 0, me?.id ?? null, b.lang === "en" ? "en" : "ar")
        .run();
    return json({ ok: true }, 201);
  }
  if (path === "/api/testimonials" && method === "GET") {
    const s = await allSettings(env);
    if (s.testimonials_enabled === "0") return json([]);
    const rows = (
      await env.DB.prepare(
        "SELECT r.id,r.rating,r.body,r.photo_key,p.name product_name,p.name_ar product_name_ar,p.slug,u.name user_name FROM product_reviews r JOIN products p ON p.id=r.product_id LEFT JOIN users u ON u.id=r.user_id WHERE r.approved=1 AND r.featured=1 AND p.active=1 ORDER BY r.id DESC LIMIT 9",
      ).all()
    ).results;
    return json(
      rows.map(({ photo_key, user_name, ...r }) => ({
        ...r,
        user_name: clean(user_name).split(/\s+/)[0] || "",
        photo: photo_key ? `/media/review/${encodeURIComponent(photo_key)}` : "",
      })),
    );
  }
  if (path === "/api/orders" && method === "GET") {
    if (!me) return json({ error: "Login required." }, 401);
    return json(await ordersWithCodes(env, "o.user_id=?", me.id));
  }
  if (path === "/api/orders/lookup" && method === "POST") {
    const b = await readJson(req);
    if (!(await throttle(env, `lookup:${ipOf(req)}`, 15)))
      return json({ error: "Too many attempts. Try again later." }, 429);
    const num = clean(b.order_number).toUpperCase(),
      contact = clean(b.contact).toLowerCase();
    if (!num || !contact)
      return json({ error: "Enter your order number and contact." }, 400);
    const list = await ordersWithCodes(
      env,
      "UPPER(o.order_number)=? AND (LOWER(o.guest_contact)=? OR o.user_id IN (SELECT id FROM users WHERE LOWER(email)=?))",
      num,
      contact,
      contact,
    );
    if (!list.length)
      return json({ error: "No order matches those details." }, 404);
    return json(list[0]);
  }
  if (path === "/api/discount/check" && method === "POST") {
    const b = await readJson(req),
      s = await allSettings(env);
    if (!(await throttle(env, `disc:${ipOf(req)}`, 60)))
      return json({ error: "Too many attempts. Try again later." }, 429);
    const cart = await priceCart(env, b.items, s);
    if (cart.error) return json({ error: cart.error }, 400);
    const dc = await calcDiscount(env, b.code, cart, { userId: me?.id, email: me?.email, contact: b.contact }, s);
    if (dc.error) return json({ error: dc.error }, 400);
    const afterDisc = money(cart.subtotal - dc.discount),
      credit = await creditFor(env, me, b.use_credit, afterDisc),
      bal = me ? Number((await env.DB.prepare("SELECT credit FROM users WHERE id=?").bind(me.id).first())?.credit || 0) : 0;
    return json({
      subtotal: cart.subtotal,
      discount: dc.discount,
      discount_source: dc.source,
      discount_code: dc.code,
      credit,
      credit_available: money(bal),
      total: money(afterDisc - credit),
    });
  }
  if (path === "/api/orders" && method === "POST") {
    if (!(await throttle(env, `order-try:${ipOf(req)}`, 40, 900000)))
      return json({ error: "Too many order attempts. Try again later." }, 429);
    const b = await readJson(req),
      s = await allSettings(env);
    if (s.orders_open === "0")
      return json(
        {
          error:
            (b.lang === "ar" && clean(s.orders_closed_text_ar)) ||
            s.orders_closed_text,
        },
        503,
      );
    if (!me && (!clean(b.guest_name) || !clean(b.guest_contact)))
      return json({ error: "Guest name and contact are required." }, 400);
    await expireReservations(env, s);
    const cart = await priceCart(env, b.items, s);
    if (cart.error) return json({ error: cart.error }, 400);
    const dc = await calcDiscount(
      env,
      b.discount_code,
      cart,
      { userId: me?.id, email: me?.email, contact: b.guest_contact },
      s,
    );
    if (dc.error) return json({ error: dc.error }, 400);
    const subtotal = cart.subtotal,
      discount = dc.discount,
      afterDisc = money(subtotal - discount),
      creditUsed = await creditFor(env, me, b.use_credit, afterDisc),
      total = money(afterDisc - creditUsed),
      coveredByCredit = total <= 0;
    let pm = PAYMENT_METHODS.includes(b.payment_method) ? b.payment_method : "";
    if (coveredByCredit) pm = creditUsed > 0 ? "store_credit" : "free";
    else if (!pm || s[`${pm}_enabled`] === "0" || !clean(s[pm]))
      return json({ error: "Choose an enabled payment method." }, 400);
    if (!(await throttle(env, `order:${ipOf(req)}`, 6, 900000)))
      return json({ error: "Too many order attempts. Try again later." }, 429);
    const orderNumber = `${clean(s.order_prefix) || "KDV"}-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const guestName = me ? null : clean(b.guest_name),
      guestContact = me ? null : clean(b.guest_contact),
      ar = b.lang !== "en",
      payRef = normRef(b.payment_ref);
    // The order and its items are written in one atomic batch.
    const stmts = [
      env.DB.prepare(
        "INSERT INTO orders(order_number,user_id,guest_name,guest_contact,subtotal,discount,total,payment_method,discount_code,credit_used,referrer_id,lang,payment_ref,payment_status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      ).bind(
        orderNumber,
        me?.id ?? null,
        guestName,
        guestContact,
        subtotal,
        discount,
        total,
        pm,
        dc.code || null,
        creditUsed,
        dc.referrer_id || null,
        ar ? "ar" : "en",
        payRef,
        coveredByCredit ? "paid" : "awaiting_payment",
      ),
    ];
    for (const item of cart.normalized) {
      const p = cart.map.get(item.product_id);
      stmts.push(
        env.DB.prepare(
          "INSERT INTO order_items(order_id,product_id,product_name,quantity,unit_price,delivery_type,variant_id,variant_name) SELECT id,?,?,?,?,?,?,? FROM orders WHERE order_number=?",
        ).bind(
          p.id,
          p.name,
          item.quantity,
          item.price,
          p.delivery_type,
          item.variant_id,
          item.variant_name || "",
          orderNumber,
        ),
      );
    }
    const orderId = (await env.DB.batch(stmts))[0].meta.last_row_id;
    let claimed = false,
      creditClaimed = false;
    const abort = async (message, status) => {
      await env.DB.prepare(
        "UPDATE inventory SET status='available',order_id=NULL WHERE order_id=? AND status='reserved'",
      )
        .bind(orderId)
        .run();
      await env.DB.prepare("DELETE FROM orders WHERE id=?").bind(orderId).run();
      if (claimed)
        await env.DB.prepare(
          "UPDATE discounts SET used_count=MAX(0,COALESCE(used_count,0)-1) WHERE code=?",
        )
          .bind(dc.code)
          .run();
      if (creditClaimed)
        await env.DB.prepare("UPDATE users SET credit=credit+? WHERE id=?")
          .bind(creditUsed, me.id)
          .run();
      return json({ error: message }, status);
    };
    // Claim one use of the discount atomically so max_uses can't be exceeded. Referral codes have no usage row.
    if (dc.code && dc.source !== "referral") {
      const u = await env.DB.prepare(
        "UPDATE discounts SET used_count=COALESCE(used_count,0)+1 WHERE code=? AND active=1 AND (max_uses IS NULL OR COALESCE(used_count,0)<max_uses)",
      )
        .bind(dc.code)
        .run();
      if (!(u.meta.changes > 0)) return abort(BAD_DISCOUNT, 400);
      claimed = true;
    }
    if (creditUsed > 0) {
      const u = await env.DB.prepare(
        "UPDATE users SET credit=credit-? WHERE id=? AND credit>=?",
      )
        .bind(creditUsed, me.id, creditUsed)
        .run();
      if (!(u.meta.changes > 0))
        return abort("Your store credit balance changed. Review the total and try again.", 409);
      creditClaimed = true;
    }
    for (const item of cart.normalized) {
      const p = cart.map.get(item.product_id);
      if (
        p.delivery_type === "code" &&
        !(await reserveCodes(
          env,
          orderId,
          p.id,
          item.quantity,
          item.variant_id,
        ))
      )
        return abort(`Not enough stock for ${item.variant_name || p.name}.`, 409);
    }
    if (creditUsed > 0)
      await env.DB.prepare(
        "INSERT INTO kd_credit_ledger(user_id,amount,reason,order_id) VALUES(?,?,'order_payment',?)",
      )
        .bind(me.id, -creditUsed, orderId)
        .run();
    await logEvent(env, orderId, "placed");
    if (coveredByCredit) await logEvent(env, orderId, "paid");
    if (payRef) await checkDuplicates(env, ctx, orderId);
    const cur = clean(s.store_currency) || "EGP",
      PAY_AR = {
        instapay: "إنستاباي",
        vodafone_cash: "فودافون كاش",
        telda: "تيلدا",
        store_credit: "رصيد المتجر",
        free: "مجاني",
      },
      waText = ar
        ? `أهلاً فريق دعم ${s.store_name}\nرقم الطلب: ${orderNumber}\nالإجمالي: ${total.toFixed(2)} ${cur === "EGP" ? "ج.م" : cur}\nطريقة الدفع: ${PAY_AR[pm] || pm}`
        : `Hello ${s.store_name} Support\nOrder: ${orderNumber}\nTotal: ${total.toFixed(2)} ${cur}\nPayment method: ${pm}`,
      wa = s.whatsapp
        ? `https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(waText)}`
        : "";
    const adminLink = `${url.origin}/?admin_order=${orderId}`;
    adminAlert(env, ctx, {
      kind: "order",
      title: `Order ${orderNumber}`,
      body: `${total.toFixed(2)} ${cur} · ${pm}`,
      url: `/?admin_order=${orderId}`,
      discord: [
        ["Total", `${total.toFixed(2)} ${cur}`, true],
        ["Payment", pm, true],
        ["Customer", `${me ? me.name : guestName} - ${me ? me.email : guestContact}`],
        [
          "Items",
          cart.normalized
            .map(
              (it) =>
                `${cart.map.get(it.product_id).name}${it.variant_name ? " — " + it.variant_name : ""} x ${it.quantity}`,
            )
            .join("\n"),
        ],
        ["Admin order", adminLink],
        ...(dc.code ? [["Discount code", `${dc.code} (${dc.source})`, true]] : []),
        ...(creditUsed > 0 ? [["Store credit used", `${creditUsed.toFixed(2)} ${cur}`, true]] : []),
      ],
    });
    return json(
      {
        order_id: orderId,
        order_number: orderNumber,
        total,
        subtotal,
        discount,
        credit_used: creditUsed,
        paid: coveredByCredit,
        payment_method: pm,
        destination: s[pm] || "",
        whatsapp: wa,
        support_text: (ar && clean(s.support_text_ar)) || s.support_text || "",
      },
      201,
    );
  }
  const proofMatch = path.match(/^\/api\/orders\/(\d+)\/payment-proof$/);
  if (proofMatch && method === "POST") {
    if (!(await throttle(env, `proof:${ipOf(req)}`, 20, 3600000)))
      return json({ error: "Too many attempts. Try again later." }, 429);
    const id = Number(proofMatch[1]),
      o = await env.DB.prepare("SELECT * FROM orders WHERE id=?")
        .bind(id)
        .first();
    if (!o) return json({ error: "Order not found." }, 404);
    const contact = clean(req.headers.get("X-Order-Contact"));
    if (
      !me &&
      (!contact ||
        String(o.guest_contact || "").toLowerCase() !== contact.toLowerCase())
    )
      return json({ error: "Order verification failed." }, 403);
    if (
      me &&
      o.user_id !== me.id &&
      String(o.guest_contact || "").toLowerCase() !==
        String(contact || "").toLowerCase()
    )
      return json({ error: "Order verification failed." }, 403);
    if (o.payment_status !== "awaiting_payment" || o.fulfillment_status === "cancelled")
      return json({ error: "This order doesn't need a payment proof." }, 409);
    const bucket = bucketOf(env);
    if (!bucket) return json({ error: "R2 storage is not configured." }, 503);
    const form = await req.formData(),
      file = form.get("file");
    if (
      !file ||
      typeof file.arrayBuffer !== "function" ||
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        String(file.type || "").toLowerCase(),
      )
    )
      return json({ error: "Upload a JPG, PNG, WEBP, or GIF image." }, 400);
    if (Number(file.size) > 8 * 1024 * 1024)
      return json({ error: "Payment proof must be 8 MB or smaller." }, 413);
    const key = `payment-proofs/${id}/${crypto.randomUUID()}.${extFromType(file.type)}`,
      bytes = await file.arrayBuffer(),
      proofHash = await hashBuf(bytes),
      refIn = normRef(form.get("ref"));
    await bucket.put(key, bytes, {
      httpMetadata: {
        contentType: file.type,
        cacheControl: "private, max-age=0",
      },
    });
    if (o.payment_proof_key)
      try {
        await bucket.delete(o.payment_proof_key);
      } catch {}
    await env.DB.prepare(
      "UPDATE orders SET payment_proof_key=?,payment_proof_name=?,payment_proof_type=?,payment_proof_hash=?,payment_ref=CASE WHEN ?<>'' THEN ? ELSE COALESCE(payment_ref,'') END,updated_at=CURRENT_TIMESTAMP WHERE id=?",
    )
      .bind(key, safeFileName(file.name), file.type, proofHash, refIn, refIn, id)
      .run();
    await logEvent(env, id, "proof_received");
    await checkDuplicates(env, ctx, id);
    adminAlert(env, ctx, {
      kind: "proof",
      title: `Payment proof received ${o.order_number}`,
      body: `${money(o.total).toFixed(2)} · ${o.payment_method}`,
      url: `/?admin_tab=queue`,
      discord: [["Order", o.order_number, true], ["Total", String(money(o.total)), true], ["Review", `${url.origin}/?admin_tab=queue`]],
      label: "Payment proof",
    });
    return json({ ok: true });
  }
  if (path === "/api/checkout-events" && method === "POST") {
    const b = await readJson(req),
      event = clean(b.event);
    if (!["checkout_started", "checkout_completed"].includes(event))
      return json({ error: "Invalid event." }, 400);
    const key = clean(b.session_key || ipOf(req)).slice(0, 120);
    if (!(await throttle(env, `event:${key}:${event}`, 20, 3600000)))
      return json({ ok: true });
    await env.DB.prepare(
      "INSERT INTO checkout_events(event,session_key,order_id) VALUES(?,?,?)",
    )
      .bind(event, key, b.order_id ? Number(b.order_id) : null)
      .run();
    return json({ ok: true });
  }
  if (path === "/api/reviews" && method === "GET") {
    const pid = Number(url.searchParams.get("product_id"));
    if (!pid) return json({ error: "Product required." }, 400);
    return json(
      (
        await env.DB.prepare(
          "SELECT r.id,r.rating,r.body,r.created_at,u.name user_name FROM product_reviews r LEFT JOIN users u ON u.id=r.user_id WHERE r.product_id=? AND r.approved=1 ORDER BY r.id DESC",
        )
          .bind(pid)
          .all()
      ).results,
    );
  }
  if (path === "/api/reviews" && method === "POST" && me) {
    const multipart = (req.headers.get("content-type") || "").includes("multipart/form-data");
    let b, photo = null;
    if (multipart) {
      const form = await req.formData();
      b = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string"));
      photo = form.get("photo");
    } else b = await readJson(req);
    const pid = Number(b.product_id),
      rating = Math.max(1, Math.min(5, Math.floor(Number(b.rating) || 0))),
      body = clean(b.body).slice(0, 1000),
      oid = Number(b.order_id || 0);
    if (!pid || !rating || !oid)
      return json({ error: "A verified order is required." }, 400);
    if (!(await throttle(env, `review:${me.id}`, 10, 3600000)))
      return json({ error: "Too many attempts. Try again later." }, 429);
    const verified = await env.DB.prepare(
      "SELECT 1 FROM orders o JOIN order_items oi ON oi.order_id=o.id WHERE o.id=? AND o.user_id=? AND o.payment_status='paid' AND oi.product_id=?",
    )
      .bind(oid, me.id, pid)
      .first();
    if (!verified)
      return json(
        { error: "You can only review products you purchased and paid for." },
        403,
      );
    let photoKey = null;
    if (photo && typeof photo.arrayBuffer === "function" && Number(photo.size) > 0) {
      const bucket = bucketOf(env);
      if (!["image/jpeg", "image/png", "image/webp"].includes(String(photo.type || "").toLowerCase()))
        return json({ error: "Upload a JPG, PNG or WEBP photo." }, 400);
      if (Number(photo.size) > 5 * 1024 * 1024)
        return json({ error: "Photo must be 5 MB or smaller." }, 413);
      if (!bucket) return json({ error: "R2 storage is not configured." }, 503);
      photoKey = `reviews/${pid}/${crypto.randomUUID()}.${extFromType(photo.type)}`;
      await bucket.put(photoKey, await photo.arrayBuffer(), {
        httpMetadata: { contentType: photo.type, cacheControl: "public, max-age=31536000, immutable" },
      });
    }
    try {
      await env.DB.prepare(
        "INSERT INTO product_reviews(product_id,user_id,order_id,rating,body,photo_key) VALUES(?,?,?,?,?,?)",
      )
        .bind(pid, me.id, oid, rating, body, photoKey)
        .run();
    } catch {
      if (photoKey) try { await bucketOf(env).delete(photoKey); } catch {}
      return json({ error: "You already reviewed this purchase." }, 409);
    }
    return json({ ok: true }, 201);
  }
  // ---- support thread on an order (customer side) ----
  const msgMatch = path.match(/^\/api\/orders\/(\d+)\/messages$/);
  if (msgMatch) {
    const id = Number(msgMatch[1]),
      o = await env.DB.prepare("SELECT * FROM orders WHERE id=?").bind(id).first();
    if (!o) return json({ error: "Order not found." }, 404);
    const contact = clean(req.headers.get("X-Order-Contact")).toLowerCase();
    let allowed = (me && o.user_id === me.id) || (!!contact && contact === String(o.guest_contact || "").toLowerCase());
    if (!allowed && contact && o.user_id)
      allowed = !!(await env.DB.prepare("SELECT 1 x FROM users WHERE id=? AND LOWER(email)=?").bind(o.user_id, contact).first());
    if (!allowed) return json({ error: "Order verification failed." }, 403);
    if (method === "GET")
      return json((await env.DB.prepare("SELECT id,sender,body,created_at FROM kd_order_messages WHERE order_id=? ORDER BY id").bind(id).all()).results);
    if (method === "POST") {
      const b = await readJson(req),
        text = clean(b.body).slice(0, 1000);
      if (!text) return json({ error: "Write a message first." }, 400);
      if (!(await throttle(env, `msg:${ipOf(req)}`, 20, 3600000)))
        return json({ error: "Too many attempts. Try again later." }, 429);
      await env.DB.prepare("INSERT INTO kd_order_messages(order_id,sender,body,read_by_admin) VALUES(?,'customer',?,0)").bind(id, text).run();
      adminAlert(env, ctx, {
        kind: "message",
        title: `New message on ${o.order_number}`,
        body: text.slice(0, 150),
        url: `/?admin_order=${id}`,
        discord: [["Order", o.order_number, true], ["Message", text.slice(0, 500)], ["Open", `${url.origin}/?admin_order=${id}`]],
        label: "Customer message",
      });
      return json({ ok: true }, 201);
    }
  }
  if (path.startsWith("/api/admin/")) {
    const admin = await requireAdmin(req, env);
    if (!admin) return json({ error: "Admin access required." }, 403);
  }
  const proofAdminMatch = path.match(
    /^\/api\/admin\/orders\/(\d+)\/payment-proof$/,
  );
  if (proofAdminMatch && method === "GET") {
    const o = await env.DB.prepare(
      "SELECT payment_proof_key,payment_proof_type FROM orders WHERE id=?",
    )
      .bind(Number(proofAdminMatch[1]))
      .first();
    const bucket = bucketOf(env);
    if (!o?.payment_proof_key || !bucket)
      return new Response("Not found", { status: 404 });
    const obj = await bucket.get(o.payment_proof_key);
    if (!obj) return new Response("Not found", { status: 404 });
    return new Response(obj.body, {
      headers: {
        "content-type": o.payment_proof_type || "application/octet-stream",
        "cache-control": "private, no-store",
      },
    });
  }
  const productImageMatch = path.match(
    /^\/api\/admin\/products\/(\d+)\/image$/,
  );
  if (productImageMatch && method === "POST") {
    const bucket = bucketOf(env);
    if (!bucket) return json({ error: "R2 storage is not configured." }, 503);
    const id = Number(productImageMatch[1]),
      exists = await env.DB.prepare("SELECT id FROM products WHERE id=?")
        .bind(id)
        .first();
    if (!exists) return json({ error: "Product not found." }, 404);
    const form = await req.formData(),
      file = form.get("file");
    if (
      !file ||
      typeof file.arrayBuffer !== "function" ||
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        String(file.type || "").toLowerCase(),
      )
    )
      return json({ error: "Upload a JPG, PNG, WEBP, or GIF image." }, 400);
    if (Number(file.size) > 8 * 1024 * 1024)
      return json({ error: "Image must be 8 MB or smaller." }, 413);
    const key = `products/${id}/${crypto.randomUUID()}.${extFromType(file.type)}`;
    await bucket.put(key, await file.arrayBuffer(), {
      httpMetadata: {
        contentType: file.type,
        cacheControl: "public, max-age=31536000, immutable",
      },
    });
    const imageUrl = `/media/product/${encodeURIComponent(key)}`;
    await env.DB.prepare(
      "UPDATE products SET image_url=?,updated_at=CURRENT_TIMESTAMP WHERE id=?",
    )
      .bind(imageUrl, id)
      .run();
    return json({ ok: true, image_url: imageUrl });
  }
  if (path === "/api/admin/summary" && method === "GET") {
    const st = await allSettings(env),
      q = (sql) => env.DB.prepare(sql).first();
    const [p, c, o, u, rev, stock, pend, queue, unread, waiting, low, jobs] = await Promise.all([
      q("SELECT COUNT(*) n FROM products WHERE active=1"),
      q("SELECT COUNT(*) n FROM categories"),
      q("SELECT COUNT(*) n FROM orders"),
      q("SELECT COUNT(*) n FROM users WHERE role='customer'"),
      q("SELECT COALESCE(SUM(total),0) n FROM orders WHERE payment_status='paid'"),
      q("SELECT COUNT(*) n FROM inventory WHERE status='available'"),
      q("SELECT COUNT(*) n FROM orders WHERE payment_status='awaiting_payment' AND fulfillment_status<>'cancelled'"),
      q("SELECT COUNT(*) n FROM orders WHERE payment_status='awaiting_payment' AND fulfillment_status<>'cancelled' AND payment_proof_key IS NOT NULL"),
      q("SELECT COUNT(DISTINCT order_id) n FROM kd_order_messages WHERE sender='customer' AND read_by_admin=0"),
      q("SELECT COUNT(*) n FROM kd_stock_subscriptions WHERE status='ready'"),
      lowStockList(env, st),
      env.DB.prepare("SELECT job,ran_at,ok,detail FROM kd_job_runs ORDER BY job").all(),
    ]);
    const [d7, d30, cancelled, avg] = await Promise.all([
      q("SELECT COALESCE(SUM(total),0) n FROM orders WHERE payment_status='paid' AND created_at>=datetime('now','-7 days')"),
      q("SELECT COALESCE(SUM(total),0) n FROM orders WHERE payment_status='paid' AND created_at>=datetime('now','-30 days')"),
      q("SELECT COUNT(*) n FROM orders WHERE fulfillment_status='cancelled'"),
      q("SELECT COALESCE(AVG(total),0) n FROM orders WHERE payment_status='paid'"),
    ]);
    return json({
      products: p.n,
      categories: c.n,
      orders: o.n,
      customers: u.n,
      paid_revenue: money(rev.n),
      revenue_7d: money(d7.n),
      revenue_30d: money(d30.n),
      cancelled: cancelled.n,
      avg_order: money(avg.n),
      available_codes: stock.n,
      awaiting_payment: pend.n,
      review_queue: queue.n,
      unread_messages: unread.n,
      waitlist_ready: waiting.n,
      low_stock: low,
      jobs: jobs.results || [],
      cron_note: "Scheduled jobs run from the Cloudflare cron trigger in wrangler.toml.",
    });
  }
  if (path === "/api/admin/products" && method === "GET")
    return json(await productList(env, true));
  if (path === "/api/admin/products" && method === "POST") {
    const b = await readJson(req),
      err = validateProduct(b);
    if (err) return json({ error: err }, 400);
    const base = slugify(b.slug || b.name);
    let slug = base;
    let n = 2;
    while (
      await env.DB.prepare("SELECT id FROM products WHERE slug=?")
        .bind(slug)
        .first()
    )
      slug = `${base}-${n++}`;
    const r = await env.DB.prepare(
      "INSERT INTO products(name,slug,description,name_ar,description_ar,price,old_price,image_url,category_id,platform,region,delivery_type,active,featured,low_stock_threshold,cost_price) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    )
      .bind(
        clean(b.name),
        slug,
        clean(b.description),
        clean(b.name_ar),
        clean(b.description_ar),
        Number(b.price),
        b.old_price === "" || b.old_price == null ? null : Number(b.old_price),
        clean(b.image_url),
        b.category_id ? Number(b.category_id) : null,
        clean(b.platform),
        clean(b.region),
        b.delivery_type === "code" ? "code" : "manual",
        b.active === false ? 0 : 1,
        b.featured ? 1 : 0,
        optInt(b.low_stock_threshold),
        optNum(b.cost_price),
      )
      .run();
    return json({ id: r.meta.last_row_id }, 201);
  }
  const productMatch = path.match(/^\/api\/admin\/products\/(\d+)$/);
  if (productMatch && method === "PUT") {
    const b = await readJson(req),
      err = validateProduct(b);
    if (err) return json({ error: err }, 400);
    const id = Number(productMatch[1]),
      existing = await env.DB.prepare("SELECT id,active,low_stock_threshold,cost_price FROM products WHERE id=?")
        .bind(id)
        .first();
    if (!existing) return json({ error: "Product not found." }, 404);
    let newSlug = slugify(b.slug || b.name);
    const conflict = await env.DB.prepare(
      "SELECT id FROM products WHERE slug=? AND id<>?",
    )
      .bind(newSlug, id)
      .first();
    if (conflict) newSlug = `${newSlug}-${id}`;
    await env.DB.prepare(
      "UPDATE products SET name=?,slug=?,description=?,name_ar=?,description_ar=?,price=?,old_price=?,image_url=?,category_id=?,platform=?,region=?,delivery_type=?,active=?,featured=?,low_stock_threshold=?,cost_price=?,updated_at=CURRENT_TIMESTAMP WHERE id=?",
    )
      .bind(
        clean(b.name),
        newSlug,
        clean(b.description),
        clean(b.name_ar),
        clean(b.description_ar),
        Number(b.price),
        b.old_price === "" || b.old_price == null ? null : Number(b.old_price),
        clean(b.image_url),
        b.category_id ? Number(b.category_id) : null,
        clean(b.platform),
        clean(b.region),
        b.delivery_type === "code" ? "code" : "manual",
        b.active === undefined
          ? existing.active
          : b.active && b.active !== "0"
            ? 1
            : 0,
        b.featured ? 1 : 0,
        b.low_stock_threshold === undefined ? existing.low_stock_threshold : optInt(b.low_stock_threshold),
        b.cost_price === undefined ? existing.cost_price : optNum(b.cost_price),
        id,
      )
      .run();
    return json({ ok: true });
  }
  if (productMatch && method === "DELETE") {
    const id = Number(productMatch[1]);
    if (url.searchParams.get("hard") === "1") {
      const used = await env.DB.prepare(
          "SELECT COUNT(*) n FROM order_items WHERE product_id=?",
        )
          .bind(id)
          .first(),
        linked = await env.DB.prepare(
          "SELECT COUNT(*) n FROM variant_sources WHERE source_product_id=?",
        )
          .bind(id)
          .first();
      if (Number(used.n) > 0 || Number(linked.n) > 0)
        return json(
          {
            error:
              "This product is part of order history or a variant merge, so it can't be permanently deleted. Hide it instead.",
          },
          409,
        );
      await env.DB.prepare("DELETE FROM products WHERE id=?").bind(id).run();
      return json({ ok: true });
    }
    await env.DB.prepare(
      "UPDATE products SET active=0,updated_at=CURRENT_TIMESTAMP WHERE id=?",
    )
      .bind(id)
      .run();
    return json({ ok: true });
  }
  const activeMatch = path.match(/^\/api\/admin\/products\/(\d+)\/active$/);
  if (activeMatch && method === "POST") {
    const b = await readJson(req);
    await env.DB.prepare(
      "UPDATE products SET active=?,updated_at=CURRENT_TIMESTAMP WHERE id=?",
    )
      .bind(b.active ? 1 : 0, Number(activeMatch[1]))
      .run();
    return json({ ok: true });
  }
  const variantMatch = path.match(
    /^\/api\/admin\/products\/(\d+)\/variants(?:\/(\d+))?$/,
  );
  if (variantMatch && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT * FROM product_variants WHERE product_id=? ORDER BY sort_order,id",
        )
          .bind(Number(variantMatch[1]))
          .all()
      ).results,
    );
  if (variantMatch && method === "POST") {
    const b = await readJson(req),
      pid = Number(variantMatch[1]);
    const verr = validateVariant(b);
    if (verr) return json({ error: verr }, 400);
    if (!(await env.DB.prepare("SELECT id FROM products WHERE id=?").bind(pid).first()))
      return json({ error: "Product not found." }, 404);
    const r = await env.DB.prepare(
      "INSERT INTO product_variants(product_id,name,price,old_price,active,sort_order) VALUES(?,?,?,?,?,?)",
    )
      .bind(
        pid,
        clean(b.name),
        Number(b.price),
        b.old_price === "" || b.old_price == null ? null : Number(b.old_price),
        b.active === false ? 0 : 1,
        Number(b.sort_order) || 0,
      )
      .run();
    return json({ id: r.meta.last_row_id }, 201);
  }
  if (variantMatch && method === "PUT" && variantMatch[2]) {
    const b = await readJson(req),
      id = Number(variantMatch[2]);
    const verr = validateVariant(b);
    if (verr) return json({ error: verr }, 400);
    await env.DB.prepare(
      "UPDATE product_variants SET name=?,price=?,old_price=?,active=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=? AND product_id=?",
    )
      .bind(
        clean(b.name),
        Number(b.price),
        b.old_price === "" || b.old_price == null ? null : Number(b.old_price),
        b.active ? 1 : 0,
        Number(b.sort_order) || 0,
        id,
        Number(variantMatch[1]),
      )
      .run();
    return json({ ok: true });
  }
  if (variantMatch && method === "DELETE" && variantMatch[2]) {
    const id = Number(variantMatch[2]);
    const used = await env.DB.prepare(
      "SELECT COUNT(*) n FROM order_items WHERE variant_id=?",
    )
      .bind(id)
      .first();
    if (Number(used.n) > 0)
      return json(
        {
          error:
            "This variant has past orders, so it can't be deleted. Disable it instead.",
        },
        409,
      );
    const merged = await env.DB.prepare(
      "SELECT COUNT(*) n FROM variant_sources WHERE variant_id=?",
    )
      .bind(id)
      .first();
    if (Number(merged.n) > 0)
      return json(
        {
          error:
            "This option was created by the product merger. Use Undo in Combine products instead.",
        },
        409,
      );
    // Codes of a deleted option go back to the product's base stock instead of vanishing.
    await env.DB.batch([
      env.DB.prepare(
        "UPDATE inventory SET variant_id=NULL WHERE variant_id=? AND product_id=?",
      ).bind(id, Number(variantMatch[1])),
      env.DB.prepare(
        "DELETE FROM product_variants WHERE id=? AND product_id=?",
      ).bind(id, Number(variantMatch[1])),
    ]);
    return json({ ok: true });
  }
  if (path === "/api/admin/categories" && method === "GET")
    return json(
      (await env.DB.prepare("SELECT * FROM categories ORDER BY id DESC").all())
        .results,
    );
  if (path === "/api/admin/categories" && method === "POST") {
    const b = await readJson(req);
    if (!clean(b.name))
      return json({ error: "Category name is required." }, 400);
    let s = slugify(b.slug || b.name),
      base = s,
      n = 2;
    while (
      await env.DB.prepare("SELECT id FROM categories WHERE slug=?")
        .bind(s)
        .first()
    )
      s = `${base}-${n++}`;
    const r = await env.DB.prepare(
      "INSERT INTO categories(name,slug,name_ar) VALUES(?,?,?)",
    )
      .bind(clean(b.name), s, clean(b.name_ar))
      .run();
    return json({ id: r.meta.last_row_id }, 201);
  }
  const catMatch = path.match(/^\/api\/admin\/categories\/(\d+)$/);
  if (catMatch && method === "PUT") {
    const b = await readJson(req);
    if (!clean(b.name))
      return json({ error: "Category name is required." }, 400);
    await env.DB.prepare(
      "UPDATE categories SET name=?,slug=?,name_ar=? WHERE id=?",
    )
      .bind(
        clean(b.name),
        slugify(b.slug || b.name),
        clean(b.name_ar),
        Number(catMatch[1]),
      )
      .run();
    return json({ ok: true });
  }
  if (catMatch && method === "DELETE") {
    await env.DB.prepare(
      "UPDATE products SET category_id=NULL WHERE category_id=?",
    )
      .bind(Number(catMatch[1]))
      .run();
    await env.DB.prepare("DELETE FROM categories WHERE id=?")
      .bind(Number(catMatch[1]))
      .run();
    return json({ ok: true });
  }
  if (path === "/api/admin/inventory" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT i.*,p.name product_name,COALESCE(v.name,'') variant_name FROM inventory i JOIN products p ON p.id=i.product_id LEFT JOIN product_variants v ON v.id=i.variant_id ORDER BY i.id DESC",
        ).all()
      ).results,
    );
  if (path === "/api/admin/inventory" && method === "POST") {
    const b = await readJson(req),
      productId = Number(b.product_id),
      variantId = b.variant_id ? Number(b.variant_id) : null,
      codes = String(b.codes || "").split(/\r?\n/).map(clean).filter(Boolean);
    if (!productId || !codes.length)
      return json({ error: "Select a product and enter at least one code." }, 400);
    if (!(await env.DB.prepare("SELECT id FROM products WHERE id=?").bind(productId).first()))
      return json({ error: "Product not found." }, 404);
    const r = await importCodes(env, codes.map((code) => ({ code })), {
      productId,
      variantId,
      supplier: b.supplier,
      unitCost: b.unit_cost,
      note: b.note,
    });
    if (!r.added && r.errors.length) return json({ error: r.errors[0].message }, 400);
    for (const t of r.touched) await notifyRestock(env, ctx, t.productId, t.variantId, url.origin);
    await audit(env, me, "codes_added", "inventory", productId, `${r.added} codes`);
    return json({ count: r.added, skipped: r.skipped }, 201);
  }
  // CSV / bulk import: rows = [{code, product?, option?}]; product may be an id, slug or exact name.
  if (path === "/api/admin/inventory/import" && method === "POST") {
    const b = await readJson(req),
      rows = Array.isArray(b.rows) ? b.rows : [];
    if (!rows.length) return json({ error: "The file has no rows." }, 400);
    if (rows.length > 1000) return json({ error: "Send at most 1000 rows per request." }, 400);
    const r = await importCodes(env, rows, {
      productId: Number(b.product_id) || null,
      variantId: Number(b.variant_id) || null,
      supplier: b.supplier,
      unitCost: b.unit_cost,
      note: b.note,
    });
    for (const t of r.touched) await notifyRestock(env, ctx, t.productId, t.variantId, url.origin);
    await audit(env, me, "codes_imported", "inventory", null, `${r.added} added, ${r.skipped} duplicates, ${r.error_count} errors`);
    return json(r, 201);
  }
  if (path === "/api/admin/batches" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT b.*,p.name product_name,COALESCE(v.name,'') variant_name,(SELECT COUNT(*) FROM inventory i WHERE i.batch_id=b.id AND i.status='available') available,(SELECT COUNT(*) FROM inventory i WHERE i.batch_id=b.id AND i.status IN ('sold','reserved')) used FROM kd_supplier_batches b JOIN products p ON p.id=b.product_id LEFT JOIN product_variants v ON v.id=b.variant_id ORDER BY b.id DESC LIMIT 200",
        ).all()
      ).results,
    );
  const invMatch = path.match(/^\/api\/admin\/inventory\/(\d+)$/);
  if (invMatch && method === "DELETE") {
    await env.DB.prepare(
      "DELETE FROM inventory WHERE id=? AND status='available'",
    )
      .bind(Number(invMatch[1]))
      .run();
    return json({ ok: true });
  }
  if (path === "/api/admin/discounts" && method === "GET")
    return json(
      (await env.DB.prepare("SELECT * FROM discounts ORDER BY id DESC").all())
        .results,
    );
  const discExtra = (b) => [
    b.first_order_only ? 1 : 0,
    Number(b.product_id) || null,
    Number(b.category_id) || null,
    Math.max(0, Math.floor(Number(b.min_qty)) || 0),
    b.auto_apply ? 1 : 0,
  ];
  const maxUses = (b) =>
    b.max_uses === "" || b.max_uses == null
      ? null
      : Math.max(0, Math.floor(Number(b.max_uses)) || 0);
  if (path === "/api/admin/discounts" && method === "POST") {
    const b = await readJson(req),
      code = clean(b.code).toUpperCase();
    const derr = validateDiscount(b);
    if (derr) return json({ error: derr }, 400);
    try {
      await env.DB.prepare(
        "INSERT INTO discounts(code,type,amount,min_order,active,expires_at,max_uses,first_order_only,product_id,category_id,min_qty,auto_apply) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
      )
        .bind(
          code,
          b.type === "fixed" ? "fixed" : "percentage",
          Number(b.amount),
          Number(b.min_order) || 0,
          b.active === false ? 0 : 1,
          expiryOf(b.expires_at),
          maxUses(b),
          ...discExtra(b),
        )
        .run();
    } catch {
      return json({ error: "That code already exists." }, 409);
    }
    return json({ ok: true }, 201);
  }
  const discMatch = path.match(/^\/api\/admin\/discounts\/(\d+)$/);
  if (discMatch && method === "PUT") {
    const b = await readJson(req),
      code = clean(b.code).toUpperCase();
    const derr = validateDiscount(b);
    if (derr) return json({ error: derr }, 400);
    try {
      await env.DB.prepare(
        "UPDATE discounts SET code=?,type=?,amount=?,min_order=?,active=?,expires_at=?,max_uses=?,first_order_only=?,product_id=?,category_id=?,min_qty=?,auto_apply=? WHERE id=?",
      )
        .bind(
          code,
          b.type === "fixed" ? "fixed" : "percentage",
          Number(b.amount) || 0,
          Number(b.min_order) || 0,
          b.active ? 1 : 0,
          expiryOf(b.expires_at),
          maxUses(b),
          ...discExtra(b),
          Number(discMatch[1]),
        )
        .run();
    } catch {
      return json({ error: "That code already exists." }, 409);
    }
    return json({ ok: true });
  }
  if (discMatch && method === "DELETE") {
    await env.DB.prepare("DELETE FROM discounts WHERE id=?")
      .bind(Number(discMatch[1]))
      .run();
    return json({ ok: true });
  }
  if (path === "/api/admin/orders/export.csv" && method === "GET") {
    const q = url.searchParams,
      where = [],
      binds = [];
    const st = clean(q.get("status"));
    if (["awaiting_payment", "paid", "failed", "refunded"].includes(st)) { where.push("o.payment_status=?"); binds.push(st); }
    else if (["pending", "processing", "fulfilled", "cancelled"].includes(st)) { where.push("o.fulfillment_status=?"); binds.push(st); }
    if (/^\d{4}-\d{2}-\d{2}$/.test(q.get("from") || "")) { where.push("date(o.created_at)>=?"); binds.push(q.get("from")); }
    if (/^\d{4}-\d{2}-\d{2}$/.test(q.get("to") || "")) { where.push("date(o.created_at)<=?"); binds.push(q.get("to")); }
    const rows = (
      await env.DB.prepare(
        `SELECT o.*,u.name user_name,u.email user_email,(SELECT GROUP_CONCAT(oi.product_name||CASE WHEN COALESCE(oi.variant_name,'')<>'' THEN ' - '||oi.variant_name ELSE '' END||' x '||oi.quantity,'; ') FROM order_items oi WHERE oi.order_id=o.id) items FROM orders o LEFT JOIN users u ON u.id=o.user_id ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY o.id DESC LIMIT 20000`,
      )
        .bind(...binds)
        .all()
    ).results;
    const head = ["order_number","created_at","customer","contact","items","subtotal","discount","discount_code","store_credit","total","payment_method","payment_status","fulfillment_status","payment_reference","duplicate_flag","notes"];
    const lines = [head.join(",")].concat(
      rows.map((o) =>
        [o.order_number, o.created_at, o.user_name || o.guest_name, o.user_email || o.guest_contact, o.items, o.subtotal, o.discount, o.discount_code, o.credit_used, o.total, o.payment_method, o.payment_status, o.fulfillment_status, o.payment_ref, o.dup_flag, o.notes].map(csvCell).join(","),
      ),
    );
    await audit(env, me, "orders_export", "orders", null, `${rows.length} rows`);
    return new Response("﻿" + lines.join("\r\n"), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="kardivo-orders-${new Date().toISOString().slice(0, 10)}.csv"`,
        "cache-control": "no-store",
      },
    });
  }
  if (path === "/api/admin/orders" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT o.*,u.name user_name,u.email user_email,(SELECT GROUP_CONCAT(oi.product_name || CASE WHEN COALESCE(oi.variant_name,'')<>'' THEN ' — '||oi.variant_name ELSE '' END || ' × ' || oi.quantity, ', ') FROM order_items oi WHERE oi.order_id=o.id) item_summary,(SELECT COUNT(*) FROM kd_order_messages m WHERE m.order_id=o.id AND m.sender='customer' AND m.read_by_admin=0) unread FROM orders o LEFT JOIN users u ON u.id=o.user_id ORDER BY o.id DESC",
        ).all()
      ).results.map(({ payment_proof_hash, ...o }) => o),
    );
  // Orders waiting for you: payment proof uploaded, not yet paid.
  if (path === "/api/admin/review-queue" && method === "GET") {
    const orders = (
      await env.DB.prepare(
        "SELECT o.*,u.name user_name,u.email user_email FROM orders o LEFT JOIN users u ON u.id=o.user_id WHERE o.payment_status='awaiting_payment' AND o.fulfillment_status<>'cancelled' AND o.payment_proof_key IS NOT NULL ORDER BY o.updated_at,o.id LIMIT 100",
      ).all()
    ).results;
    const ids = orders.map((o) => o.id),
      items = ids.length
        ? (await env.DB.prepare(`SELECT * FROM order_items WHERE order_id IN (${inMarks(ids)}) ORDER BY id`).bind(...ids).all()).results
        : [];
    return json(
      orders.map(({ payment_proof_key, payment_proof_hash, ...o }) => ({
        ...o,
        payment_proof: true,
        items: items.filter((i) => i.order_id === o.id),
      })),
    );
  }
  const orderMatch = path.match(/^\/api\/admin\/orders\/(\d+)$/);
  if (orderMatch && method === "GET") {
    const order = await env.DB.prepare(
      "SELECT o.*,u.name user_name,u.email user_email FROM orders o LEFT JOIN users u ON u.id=o.user_id WHERE o.id=?",
    )
      .bind(Number(orderMatch[1]))
      .first();
    if (!order) return json({ error: "Order not found." }, 404);
    const items = (await env.DB.prepare("SELECT * FROM order_items WHERE order_id=? ORDER BY id").bind(order.id).all()).results;
    const codes = (
      await env.DB.prepare(
        "SELECT i.*,p.name product_name,COALESCE(v.name,'') variant_name FROM inventory i JOIN products p ON p.id=i.product_id LEFT JOIN product_variants v ON v.id=i.variant_id WHERE i.order_id=?",
      )
        .bind(order.id)
        .all()
    ).results;
    const [messages, events, issues] = await Promise.all([
      env.DB.prepare("SELECT id,sender,body,created_at FROM kd_order_messages WHERE order_id=? ORDER BY id").bind(order.id).all(),
      env.DB.prepare("SELECT kind,created_at FROM kd_order_events WHERE order_id=? ORDER BY id").bind(order.id).all(),
      env.DB.prepare("SELECT l.*,u.name admin_name FROM kd_refund_log l LEFT JOIN users u ON u.id=l.admin_user_id WHERE l.order_id=? ORDER BY l.id").bind(order.id).all(),
    ]);
    await env.DB.prepare("UPDATE kd_order_messages SET read_by_admin=1 WHERE order_id=? AND sender='customer' AND read_by_admin=0").bind(order.id).run();
    order.payment_proof = !!order.payment_proof_key;
    order.timeline = buildTimeline(order, events.results);
    delete order.payment_proof_hash;
    return json({ order, items, codes, messages: messages.results, issues: issues.results, refund_reasons: REFUND_REASONS, dispute_reasons: DISPUTE_REASONS });
  }
  if (orderMatch && method === "PUT") {
    const b = await readJson(req),
      existing = await env.DB.prepare("SELECT * FROM orders WHERE id=?").bind(Number(orderMatch[1])).first();
    if (!existing) return json({ error: "Order not found." }, 404);
    const r = await applyOrderUpdate(env, ctx, me, existing, b, url.origin);
    return r.error ? json({ error: r.error }, r.status) : json({ ok: true });
  }
  // One click from the review queue. Keeps existing notes; delivery_message is optional.
  const quickMatch = path.match(/^\/api\/admin\/orders\/(\d+)\/(mark-paid-deliver|reject-proof|clear-dup|dispute|reply)$/);
  if (quickMatch && method === "POST") {
    const id = Number(quickMatch[1]),
      act = quickMatch[2],
      b = await readJson(req),
      existing = await env.DB.prepare("SELECT * FROM orders WHERE id=?").bind(id).first();
    if (!existing) return json({ error: "Order not found." }, 404);
    if (act === "mark-paid-deliver") {
      const r = await applyOrderUpdate(env, ctx, me, existing, {
        payment_status: "paid",
        fulfillment_status: "fulfilled",
        delivery_message: b.delivery_message === undefined || b.delivery_message === "" ? undefined : b.delivery_message,
      }, url.origin);
      return r.error ? json({ error: r.error }, r.status) : json({ ok: true });
    }
    if (act === "reject-proof") {
      if (!existing.payment_proof_key) return json({ error: "This order has no payment proof." }, 400);
      const bucket = bucketOf(env);
      try { if (bucket) await bucket.delete(existing.payment_proof_key); } catch {}
      // Restart the unpaid-hold timer so the customer has time to upload a better proof.
      await env.DB.prepare("UPDATE orders SET payment_proof_key=NULL,payment_proof_name=NULL,payment_proof_type=NULL,payment_proof_hash=NULL,reserve_reset_at=datetime('now'),updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(id).run();
      await logEvent(env, id, "proof_rejected");
      const why = clean(b.reason).slice(0, 300);
      const msg = why ? `Your payment proof for ${existing.order_number} could not be verified: ${why}. Please upload a clear screenshot of the transfer.` : `Your payment proof for ${existing.order_number} could not be verified. Please upload a clear screenshot of the transfer.`;
      await env.DB.prepare("INSERT INTO kd_order_messages(order_id,sender,body,read_by_admin) VALUES(?,'admin',?,1)").bind(id, msg).run();
      await customerNotify(env, existing.user_id, id, "payment", "Payment proof needs to be re-sent", msg);
      await audit(env, me, "proof_rejected", "order", id, why);
      return json({ ok: true });
    }
    if (act === "clear-dup") {
      await env.DB.prepare("UPDATE orders SET dup_flag='' WHERE id=?").bind(id).run();
      await audit(env, me, "dup_flag_cleared", "order", id);
      return json({ ok: true });
    }
    if (act === "dispute") {
      if (!DISPUTE_REASONS.includes(b.reason)) return json({ error: "Choose a dispute reason." }, 400);
      await env.DB.prepare("INSERT INTO kd_refund_log(order_id,kind,reason,note,amount,admin_user_id) VALUES(?,'dispute',?,?,?,?)")
        .bind(id, b.reason, clean(b.note).slice(0, 500), optNum(b.amount), me.id)
        .run();
      await audit(env, me, "dispute_logged", "order", id, b.reason);
      return json({ ok: true }, 201);
    }
    if (act === "reply") {
      const text = clean(b.body).slice(0, 1000);
      if (!text) return json({ error: "Write a message first." }, 400);
      await env.DB.prepare("INSERT INTO kd_order_messages(order_id,sender,body,read_by_admin) VALUES(?,'admin',?,1)").bind(id, text).run();
      await customerNotify(env, existing.user_id, id, "support", "New reply from support", text);
      const u = existing.user_id ? await env.DB.prepare("SELECT email FROM users WHERE id=?").bind(existing.user_id).first() : null;
      const to = u?.email || (looksEmail(existing.guest_contact) ? clean(existing.guest_contact) : "");
      if (to) {
        const st = await allSettings(env);
        sendEmail(env, ctx, { to, ...mailTemplate(existing.lang, "reply", { order: existing.order_number, extra: text, url: `${url.origin}/?track=${encodeURIComponent(existing.order_number)}` }, st.store_name) });
      }
      return json({ ok: true }, 201);
    }
  }
  if (path === "/api/admin/inbox" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT o.id,o.order_number,COALESCE(u.name,o.guest_name,'Guest') customer,(SELECT body FROM kd_order_messages m WHERE m.order_id=o.id ORDER BY m.id DESC LIMIT 1) last_body,(SELECT sender FROM kd_order_messages m WHERE m.order_id=o.id ORDER BY m.id DESC LIMIT 1) last_sender,(SELECT MAX(created_at) FROM kd_order_messages m WHERE m.order_id=o.id) last_at,(SELECT COUNT(*) FROM kd_order_messages m WHERE m.order_id=o.id AND m.sender='customer' AND m.read_by_admin=0) unread FROM orders o LEFT JOIN users u ON u.id=o.user_id WHERE EXISTS (SELECT 1 FROM kd_order_messages m WHERE m.order_id=o.id) ORDER BY last_at DESC LIMIT 100",
        ).all()
      ).results,
    );
  if (path === "/api/admin/refunds" && method === "GET") {
    const log = (
      await env.DB.prepare(
        "SELECT l.*,o.order_number,(SELECT GROUP_CONCAT(oi.product_name,', ') FROM order_items oi WHERE oi.order_id=o.id) products,u.name admin_name FROM kd_refund_log l JOIN orders o ON o.id=l.order_id LEFT JOIN users u ON u.id=l.admin_user_id ORDER BY l.id DESC LIMIT 300",
      ).all()
    ).results;
    const problem = (
      await env.DB.prepare(
        "SELECT oi.product_name,COUNT(DISTINCT l.id) cases,SUM(CASE WHEN l.kind='refund' THEN 1 ELSE 0 END) refunds,(SELECT reason FROM kd_refund_log x JOIN order_items y ON y.order_id=x.order_id WHERE y.product_name=oi.product_name GROUP BY x.reason ORDER BY COUNT(*) DESC LIMIT 1) top_reason FROM kd_refund_log l JOIN order_items oi ON oi.order_id=l.order_id GROUP BY oi.product_name ORDER BY cases DESC LIMIT 15",
      ).all()
    ).results;
    return json({ log, problem_products: problem });
  }
  if (path === "/api/admin/merged-products" && method === "GET") {
    return json(
      (
        await env.DB.prepare(
          "SELECT v.id,v.name,v.price,v.product_id target_id,p.name target_name,GROUP_CONCAT(src.name, ', ') sources,MAX(CASE WHEN vs.source_product_id=v.product_id THEN 1 ELSE 0 END) is_self,(SELECT COUNT(*) FROM inventory i WHERE i.product_id=v.product_id AND i.variant_id=v.id AND i.status='available')+(SELECT COUNT(*) FROM inventory i JOIN variant_sources x ON x.source_product_id=i.product_id WHERE x.variant_id=v.id AND i.variant_id IS NULL AND i.status='available') stock,(SELECT COUNT(*) FROM order_items oi WHERE oi.variant_id=v.id) orders FROM product_variants v JOIN products p ON p.id=v.product_id JOIN variant_sources vs ON vs.variant_id=v.id JOIN products src ON src.id=vs.source_product_id GROUP BY v.id,v.name,v.price,v.product_id,p.name ORDER BY v.product_id DESC,v.sort_order,v.id",
        ).all()
      ).results,
    );
  }
  if (path === "/api/admin/product-merger/preview" && method === "POST") {
    const plan = await planMerge(env, await readJson(req));
    if (plan.error) return json({ error: plan.error }, plan.status);
    const { target, sources, selfVariant } = plan;
    return json({
      target,
      sources,
      total_stock:
        sources.reduce((n, x) => n + Number(x.stock || 0), 0) +
        Number(target.stock || 0),
      historical_orders:
        sources.reduce((n, x) => n + Number(x.orders || 0), 0) +
        Number(target.orders || 0),
      target_option: selfVariant || !!plan.selfExisting,
      new_target: !!target.isNew,
      options: plan.links.map((l) => ({ source_id: l.source.id, name: l.name, price: l.price, stock: Number(l.source.stock || 0) })),
      warning:
        "This preview makes no changes. Execute only after reviewing the mapping.",
    });
  }
  if (path === "/api/admin/product-merger/execute" && method === "POST") {
    const plan = await planMerge(env, await readJson(req));
    if (plan.error) return json({ error: plan.error }, plan.status);
    const { links, selfVariant, selfExisting } = plan,
      ops = [];
    let target = plan.target;
    if (target.isNew) {
      // New combined product: borrow category, image, platform and region from the first product.
      const tpl = links[0].source,
        base = slugify(target.name);
      let slug = base,
        n = 2;
      while (await env.DB.prepare("SELECT id FROM products WHERE slug=?").bind(slug).first()) slug = `${base}-${n++}`;
      const r = await env.DB.prepare(
        "INSERT INTO products(name,slug,description,name_ar,description_ar,price,old_price,image_url,category_id,platform,region,delivery_type,active,featured) VALUES(?,?,?,?,?,?,NULL,?,?,?,?,'code',1,0)",
      )
        .bind(
          target.name,
          slug,
          clean(tpl.description),
          clean(tpl.name_ar),
          clean(tpl.description_ar),
          Math.min(...links.map((l) => l.price)),
          clean(tpl.image_url),
          tpl.category_id || null,
          clean(tpl.platform),
          clean(tpl.region),
        )
        .run();
      target = { ...target, id: r.meta.last_row_id };
    }
    const addOption = (prod, existingId, sort, name, price, oldPrice) => {
      if (existingId)
        ops.push(
          env.DB.prepare("INSERT OR IGNORE INTO variant_sources(variant_id,source_product_id) VALUES(?,?)").bind(existingId, prod.id),
        );
      else {
        ops.push(
          env.DB.prepare(
            "INSERT INTO product_variants(product_id,name,price,old_price,active,sort_order) VALUES(?,?,?,?,1,?)",
          ).bind(target.id, name, price, oldPrice ?? null, sort),
        );
        ops.push(
          env.DB.prepare(
            "INSERT INTO variant_sources(variant_id,source_product_id) SELECT id,? FROM product_variants WHERE product_id=? AND name=? ORDER BY id DESC LIMIT 1",
          ).bind(prod.id, target.id, name),
        );
      }
    };
    // The target's own codes get their own option, otherwise they would stop being sellable.
    if (selfVariant || selfExisting)
      addOption(target, selfExisting ? selfExisting.id : null, 0, target.name, Number(target.price), target.old_price);
    links.forEach((l, i) => {
      addOption(l.source, l.existingId, i + 1, l.name, l.price, l.old_price);
      ops.push(
        env.DB.prepare("UPDATE products SET active=0,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(l.source.id),
      );
    });
    await env.DB.batch(ops);
    await audit(
      env,
      me,
      "product_merge",
      "product",
      target.id,
      `Combined products: ${links.map((l) => l.source.id).join(",")}`,
    );
    return json({
      ok: true,
      target_id: target.id,
      variants_created: links.length + (selfVariant ? 1 : 0),
    });
  }
  if (path === "/api/admin/product-merger/undo" && method === "POST") {
    const b = await readJson(req),
      variantId = Number(b.variant_id);
    if (!variantId) return json({ error: "Choose a variant to undo." }, 400);
    const v = await env.DB.prepare("SELECT * FROM product_variants WHERE id=?")
      .bind(variantId)
      .first();
    if (!v) return json({ error: "Variant not found." }, 404);
    const used = await env.DB.prepare(
      "SELECT COUNT(*) n FROM order_items WHERE variant_id=?",
    )
      .bind(variantId)
      .first();
    if (Number(used.n) > 0)
      return json(
        {
          error:
            "This variant has been used in a new order, so it cannot be undone automatically.",
        },
        409,
      );
    const sources = (
      await env.DB.prepare(
        "SELECT source_product_id FROM variant_sources WHERE variant_id=?",
      )
        .bind(variantId)
        .all()
    ).results.map((x) => Number(x.source_product_id));
    if (!sources.length)
      return json(
        { error: "This variant has no merged source products." },
        400,
      );
    if (sources.includes(Number(v.product_id))) {
      const others = await env.DB.prepare(
        "SELECT COUNT(*) n FROM product_variants WHERE product_id=? AND id<>?",
      )
        .bind(v.product_id, variantId)
        .first();
      if (Number(others.n) > 0)
        return json(
          {
            error:
              "This option holds the target product's own codes. Undo the other combined options first.",
          },
          409,
        );
    }
    await env.DB.batch([
      env.DB.prepare(
        `UPDATE products SET active=1,updated_at=CURRENT_TIMESTAMP WHERE id IN (${inMarks(sources)})`,
      ).bind(...sources),
      env.DB.prepare("DELETE FROM variant_sources WHERE variant_id=?").bind(
        variantId,
      ),
      env.DB.prepare("DELETE FROM product_variants WHERE id=?").bind(variantId),
      // A combined product left with no options, no codes and no orders is hidden again.
      env.DB.prepare(
        "UPDATE products SET active=0,updated_at=CURRENT_TIMESTAMP WHERE id=? AND NOT EXISTS (SELECT 1 FROM product_variants WHERE product_id=?) AND NOT EXISTS (SELECT 1 FROM inventory WHERE product_id=?) AND NOT EXISTS (SELECT 1 FROM order_items WHERE product_id=?)",
      ).bind(v.product_id, v.product_id, v.product_id, v.product_id),
    ]);
    await audit(
      env,
      me,
      "product_merge_undo",
      "product",
      v.product_id,
      `Restored source products: ${sources.join(",")}`,
    );
    return json({ ok: true, restored: sources.length });
  }
  if (path === "/api/admin/maintenance/cleanup" && method === "POST") {
    const s = await allSettings(env),
      count = await expireReservations(env, s);
    await audit(
      env,
      me,
      "reservation_cleanup",
      "maintenance",
      null,
      `Expired ${count || 0} unpaid orders`,
    );
    return json({ ok: true, expired: Number(count || 0) });
  }
  if (path === "/api/admin/audit" && method === "GET") {
    const rows = (
      await env.DB.prepare(
        "SELECT a.*,u.name admin_name,u.email admin_email FROM audit_logs a LEFT JOIN users u ON u.id=a.admin_user_id ORDER BY a.id DESC LIMIT 250",
      ).all()
    ).results;
    return json(rows);
  }
  if (path === "/api/admin/low-stock/notify" && method === "POST") {
    const count = await sendLowStockAlert(env, ctx, await allSettings(env));
    await audit(env, me, "low_stock_alert", "inventory", null, `${count} products at or below their threshold`);
    return json({ ok: true, count });
  }
  if (path === "/api/admin/reports" && method === "GET") {
    const dq = Number(url.searchParams.get("days")),
      days = [7, 30, 90, 365].includes(dq) ? dq : 30,
      since = `-${days} days`,
      one = (sql, ...b) => env.DB.prepare(sql).bind(...b).first(),
      all = async (sql, ...b) => (await env.DB.prepare(sql).bind(...b).all()).results;
    const [started, completed, placed, paid, top, codeCost, prods, daily] = await Promise.all([
      one("SELECT COUNT(DISTINCT session_key) n FROM checkout_events WHERE event='checkout_started' AND created_at>=datetime('now',?)", since),
      one("SELECT COUNT(DISTINCT session_key) n FROM checkout_events WHERE event='checkout_completed' AND created_at>=datetime('now',?)", since),
      one("SELECT COUNT(*) n FROM orders WHERE created_at>=datetime('now',?)", since),
      one("SELECT COUNT(*) n,COALESCE(SUM(total),0) cash,COALESCE(SUM(discount),0) disc,COALESCE(SUM(credit_used),0) cred FROM orders WHERE payment_status='paid' AND created_at>=datetime('now',?)", since),
      all("SELECT COALESCE(oi.product_id,0) pid,oi.product_name name,SUM(oi.quantity) units,SUM(oi.unit_price*oi.quantity) revenue FROM order_items oi JOIN orders o ON o.id=oi.order_id WHERE o.payment_status='paid' AND o.created_at>=datetime('now',?) GROUP BY COALESCE(oi.product_id,0),oi.product_name ORDER BY revenue DESC LIMIT 20", since),
      all("SELECT i.product_id pid,COUNT(*) n,SUM(COALESCE(b.unit_cost,0)) cost,SUM(CASE WHEN b.unit_cost IS NULL THEN 1 ELSE 0 END) unknown FROM inventory i JOIN orders o ON o.id=i.order_id LEFT JOIN kd_supplier_batches b ON b.id=i.batch_id WHERE i.status='sold' AND o.payment_status='paid' AND o.created_at>=datetime('now',?) GROUP BY i.product_id", since),
      all("SELECT id,delivery_type,cost_price FROM products"),
      all("SELECT date(created_at) d,SUM(total) revenue,COUNT(*) orders FROM orders WHERE payment_status='paid' AND created_at>=datetime('now',?) GROUP BY date(created_at) ORDER BY d", since),
    ]);
    const pmap = new Map(prods.map((p) => [p.id, p])),
      cmap = new Map(codeCost.map((c) => [c.pid, c]));
    let totalCost = 0,
      anyUnknown = false;
    const products = top.map((t) => {
      const p = pmap.get(t.pid);
      let cost = null;
      if (p?.delivery_type === "code") {
        const c = cmap.get(t.pid);
        if (c) {
          cost = money(c.cost);
          if (Number(c.unknown) > 0) anyUnknown = true;
        } else anyUnknown = true;
      } else if (p && p.cost_price != null) cost = money(Number(p.cost_price) * Number(t.units));
      else anyUnknown = true;
      if (cost != null) totalCost += cost;
      return { name: t.name, units: Number(t.units), revenue: money(t.revenue), cost, profit: cost == null ? null : money(t.revenue - cost) };
    });
    return json({
      days,
      funnel: {
        started: Number(started.n),
        completed: Number(completed.n),
        rate: started.n ? Math.round((completed.n / started.n) * 1000) / 10 : 0,
        orders: Number(placed.n),
        paid_orders: Number(paid.n),
      },
      cash_revenue: money(paid.cash),
      discounts_given: money(paid.disc),
      credit_used: money(paid.cred),
      total_cost: money(totalCost),
      profit_estimate: money(paid.cash - totalCost),
      costs_incomplete: anyUnknown,
      products,
      daily: daily.map((d) => ({ date: d.d, revenue: money(d.revenue), orders: Number(d.orders) })),
    });
  }
  if (path === "/api/admin/backups" && method === "GET") {
    const bucket = bucketOf(env);
    if (!bucket) return json({ configured: false, backups: [] });
    const list = (await bucket.list({ prefix: "backups/" })).objects;
    return json({
      configured: true,
      backups: list.map((o) => ({ key: o.key, size: o.size, uploaded: o.uploaded })).sort((a, b) => (a.key < b.key ? 1 : -1)),
    });
  }
  if (path === "/api/admin/backups/run" && method === "POST") {
    const st = await allSettings(env),
      r = await runBackup(env, Number(st.backup_keep) || 14);
    await markJob(env, "backup", r.ok, r.ok ? `${r.key} (${r.rows} rows)` : r.error);
    if (!r.ok) return json({ error: r.error }, 503);
    await audit(env, me, "backup_run", "backup", null, r.key);
    return json(r);
  }
  if (path === "/api/admin/backups/download" && method === "GET") {
    const key = clean(url.searchParams.get("key")),
      bucket = bucketOf(env);
    if (!bucket || !/^backups\/[A-Za-z0-9._-]+$/.test(key)) return new Response("Not found", { status: 404 });
    const obj = await bucket.get(key);
    if (!obj) return new Response("Not found", { status: 404 });
    await audit(env, me, "backup_download", "backup", null, key);
    return new Response(obj.body, {
      headers: { "content-type": "application/gzip", "content-disposition": `attachment; filename="${key.slice(8)}"`, "cache-control": "no-store" },
    });
  }
  if (path === "/api/admin/push/subscribe" && method === "POST") {
    const b = await readJson(req),
      ep = clean(b.endpoint);
    if (!/^https:\/\//.test(ep) || ep.length > 1000) return json({ error: "Invalid subscription." }, 400);
    await env.DB.prepare("INSERT INTO kd_push_subscriptions(user_id,endpoint) VALUES(?,?) ON CONFLICT(endpoint) DO UPDATE SET user_id=excluded.user_id").bind(me.id, ep).run();
    return json({ ok: true }, 201);
  }
  if (path === "/api/admin/push/unsubscribe" && method === "POST") {
    const b = await readJson(req);
    await env.DB.prepare("DELETE FROM kd_push_subscriptions WHERE endpoint=?").bind(clean(b.endpoint)).run();
    return json({ ok: true });
  }
  if (path === "/api/admin/push-latest" && method === "GET") {
    const a = await env.DB.prepare("SELECT id,kind,title,body,url FROM kd_admin_alerts ORDER BY id DESC LIMIT 1").first();
    return json(a || {});
  }
  if (path === "/api/admin/waitlist" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT s.*,p.name product_name,p.name_ar product_name_ar,p.slug,COALESCE(v.name,'') variant_name FROM kd_stock_subscriptions s JOIN products p ON p.id=s.product_id LEFT JOIN product_variants v ON v.id=s.variant_id WHERE s.status IN ('waiting','ready') ORDER BY CASE s.status WHEN 'ready' THEN 0 ELSE 1 END,s.id DESC LIMIT 500",
        ).all()
      ).results,
    );
  const waitMatch = path.match(/^\/api\/admin\/waitlist\/(\d+)$/);
  if (waitMatch && (method === "POST" || method === "DELETE")) {
    if (method === "DELETE") await env.DB.prepare("DELETE FROM kd_stock_subscriptions WHERE id=?").bind(Number(waitMatch[1])).run();
    else await env.DB.prepare("UPDATE kd_stock_subscriptions SET status='notified',notified_at=CURRENT_TIMESTAMP WHERE id=?").bind(Number(waitMatch[1])).run();
    return json({ ok: true });
  }
  const revPhoto = path.match(/^\/api\/admin\/reviews\/(\d+)\/photo$/);
  if (revPhoto && method === "GET") {
    const r = await env.DB.prepare("SELECT photo_key FROM product_reviews WHERE id=?").bind(Number(revPhoto[1])).first(),
      bucket = bucketOf(env),
      obj = r?.photo_key && bucket ? await bucket.get(r.photo_key) : null;
    if (!obj) return new Response("Not found", { status: 404 });
    return new Response(obj.body, { headers: { "content-type": obj.httpMetadata?.contentType || "image/jpeg", "cache-control": "private, no-store" } });
  }
  if (path === "/api/admin/reviews" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT r.id,r.product_id,r.rating,r.body,r.approved,r.featured,r.created_at,(r.photo_key IS NOT NULL) has_photo,p.name product_name,u.name user_name FROM product_reviews r JOIN products p ON p.id=r.product_id LEFT JOIN users u ON u.id=r.user_id ORDER BY r.id DESC",
        ).all()
      ).results,
    );
  const reviewAdminMatch = path.match(/^\/api\/admin\/reviews\/(\d+)$/);
  if (reviewAdminMatch && method === "PUT") {
    const b = await readJson(req);
    if (b.approved !== undefined)
      await env.DB.prepare("UPDATE product_reviews SET approved=?,featured=CASE WHEN ?=0 THEN 0 ELSE featured END WHERE id=?")
        .bind(b.approved ? 1 : 0, b.approved ? 1 : 0, Number(reviewAdminMatch[1]))
        .run();
    if (b.featured !== undefined)
      await env.DB.prepare("UPDATE product_reviews SET featured=? WHERE id=? AND approved=1")
        .bind(b.featured ? 1 : 0, Number(reviewAdminMatch[1]))
        .run();
    await audit(
      env,
      me,
      "review_moderation",
      "review",
      Number(reviewAdminMatch[1]),
      b.featured !== undefined ? (b.featured ? "featured" : "unfeatured") : b.approved ? "approved" : "hidden",
    );
    return json({ ok: true });
  }
  if (path === "/api/notifications" && method === "GET" && me) {
    return json(
      (
        await env.DB.prepare(
          "SELECT * FROM customer_notifications WHERE user_id=? ORDER BY id DESC LIMIT 50",
        )
          .bind(me.id)
          .all()
      ).results,
    );
  }
  if (path === "/api/admin/settings" && method === "GET")
    return json(await allSettings(env));
  if (path === "/api/admin/settings" && method === "PUT") {
    const body = await readJson(req);
    for (const [key, value] of Object.entries(body)) {
      if (!(key in DEFAULTS)) continue;
      let v = String(value ?? "").trim();
      if (key === "accent_color" && !/^#[0-9a-fA-F]{6}$/.test(v))
        v = DEFAULTS.accent_color;
      if (["referral_discount_percent"].includes(key))
        v = String(Math.min(90, Math.max(0, Number(v) || 0)));
      if (["referral_reward"].includes(key)) v = String(Math.max(0, Number(v) || 0));
      if (["backup_keep"].includes(key))
        v = String(Math.min(90, Math.max(1, Math.floor(Number(v)) || 14)));
      if (["max_qty", "reserve_hours", "low_stock_threshold"].includes(key))
        v = String(Math.max(1, Math.floor(Number(v)) || Number(DEFAULTS[key])));
      await env.DB.prepare(
        "INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
      )
        .bind(key, v)
        .run();
    }
    return json({ ok: true });
  }
  if (path === "/api/admin/customers" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT u.id,u.name,u.email,u.role,u.created_at,(SELECT COUNT(*) FROM orders o WHERE o.user_id=u.id) orders,(SELECT COALESCE(SUM(total),0) FROM orders o WHERE o.user_id=u.id AND o.payment_status='paid') spent FROM users u ORDER BY u.id DESC",
        ).all()
      ).results,
    );
  if (path === "/api/admin/password" && method === "POST") {
    const b = await readJson(req),
      np = String(b.new_password || "");
    const row = await env.DB.prepare(
      "SELECT password_hash FROM users WHERE id=?",
    )
      .bind(me.id)
      .first();
    if (
      !row ||
      !(await verifyPassword(
        String(b.current_password || ""),
        row.password_hash,
      ))
    )
      return json({ error: "Current password is incorrect." }, 400);
    if (np.length < 8)
      return json(
        { error: "New password must be at least 8 characters." },
        400,
      );
    await env.DB.prepare("UPDATE users SET password_hash=? WHERE id=?")
      .bind(await hashPassword(np), me.id)
      .run();
    return json({ ok: true });
  }
  return json({ error: "Not found" }, 404);
}
const pageLang = (url) => (url.searchParams.get("lang") === "en" ? "en" : "ar");
const jsonLd = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;
// Arabic is the default language of every URL; the English version lives at the same path with ?lang=en (that is what hreflang points to).
function seoHead({ url, lang, title, desc, image, type, extra = "" }) {
  const bare = new URL(url.pathname, url.origin).href,
    en = bare + "?lang=en",
    self = lang === "en" ? en : bare;
  return (
    `<link rel="canonical" href="${htmlEsc(self)}">` +
    `<link rel="alternate" hreflang="ar" href="${htmlEsc(bare)}"><link rel="alternate" hreflang="en" href="${htmlEsc(en)}"><link rel="alternate" hreflang="x-default" href="${htmlEsc(bare)}">` +
    `<meta property="og:title" content="${htmlEsc(title)}"><meta property="og:description" content="${htmlEsc(desc)}"><meta property="og:type" content="${type}"><meta property="og:url" content="${htmlEsc(self)}">` +
    `<meta property="og:locale" content="${lang === "en" ? "en_US" : "ar_AR"}"><meta property="og:locale:alternate" content="${lang === "en" ? "ar_AR" : "en_US"}">` +
    (image ? `<meta property="og:image" content="${htmlEsc(new URL(image, url).href)}">` : "") +
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">` +
    extra
  );
}
function applySeo(html, { lang, title, desc, head }) {
  return html
    .replace(/<html lang="[^"]*" dir="[^"]*">/i, `<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">`)
    .replace(/<title>[^<]*<\/title>/i, `<title>${htmlEsc(title)}</title>`)
    .replace(/(<meta name="description" id="metaDesc" content=")[^"]*(")/i, `$1${htmlEsc(desc)}$2`)
    .replace(/<\/head>/i, head + "</head>");
}
const HTML_HEADERS = (status = 200, extra = {}) => ({
  status,
  headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=60", ...extra },
});
// Fetch the SPA shell. Workers Static Assets answers "/index.html" with a 307 redirect to "/",
// and passing that through to the browser caused a redirect loop, so ask for "/" and follow any redirect here.
async function shellFetch(env, url, request) {
  let target = new URL("/", url);
  for (let i = 0; i < 3; i++) {
    const res = await env.ASSETS.fetch(new Request(target, { method: "GET", headers: request.headers }));
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      target = new URL(res.headers.get("location"), target);
      continue;
    }
    return res;
  }
  return new Response("Static assets redirect loop.", { status: 500 });
}
async function htmlForHome(env, request, url) {
  const res = await shellFetch(env, url, request);
  if (!res.ok) return res;
  await ensureSchema(env);
  const s = await allSettings(env),
    lang = pageLang(url),
    ar = lang === "ar",
    name = s.store_name || "Kardivo",
    title = `${name} | ${(ar && clean(s.meta_title_ar)) || s.meta_title}`,
    desc = (ar && clean(s.meta_description_ar)) || s.meta_description,
    logo = clean(s.logo_url) || LOGO_URL;
  const head = seoHead({
    url,
    lang,
    title,
    desc,
    image: logo,
    type: "website",
    extra: jsonLd({ "@context": "https://schema.org", "@type": "Store", name, url: url.origin, logo }),
  });
  return new Response(applySeo(await res.text(), { lang, title, desc, head }), HTML_HEADERS());
}
async function htmlForProduct(env, request, url) {
  const res = await shellFetch(env, url, request);
  if (!res.ok) return res;
  await ensureSchema(env);
  const slug = decodeURIComponent(url.pathname.slice(1)).replace(/\/$/, ""),
    p = await env.DB.prepare(
      "SELECT p.id,p.name,p.name_ar,p.description,p.description_ar,p.image_url,p.price,p.delivery_type,p.slug,c.name category_name FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.slug=? AND p.active=1 LIMIT 1",
    )
      .bind(slug)
      .first();
  const html = await res.text(),
    lang = pageLang(url);
  if (!p)
    return new Response(
      applySeo(html, { lang, title: "Not found", desc: "", head: '<meta name="robots" content="noindex">' }),
      HTML_HEADERS(404, { "cache-control": "no-store" }),
    );
  const s = await allSettings(env),
    ar = lang === "ar",
    name = (ar && clean(p.name_ar)) || p.name,
    store = s.store_name || "Kardivo",
    title = `${name} | ${store}`,
    desc =
      (ar && clean(p.description_ar)) ||
      clean(p.description) ||
      (ar ? `${name} — منتج رقمي من ${store}.` : `${name} — digital product at ${store}.`),
    short = desc.replace(/\s+/g, " ").slice(0, 300);
  const vmin = await env.DB.prepare("SELECT MIN(price) mp FROM product_variants WHERE product_id=? AND active=1").bind(p.id).first();
  let inStock = true;
  if (p.delivery_type === "code")
    inStock = Number((await env.DB.prepare("SELECT COUNT(*) n FROM inventory WHERE product_id=? AND status='available'").bind(p.id).first()).n) > 0;
  const head = seoHead({
    url,
    lang,
    title,
    desc: short,
    image: p.image_url,
    type: "product",
    extra: jsonLd({
      "@context": "https://schema.org",
      "@type": "Product",
      name,
      description: short,
      sku: p.slug,
      ...(p.image_url ? { image: [new URL(p.image_url, url).href] } : {}),
      offers: {
        "@type": "Offer",
        url: new URL(url.pathname, url.origin).href,
        price: String(money(vmin?.mp ?? p.price)),
        priceCurrency: clean(s.store_currency) || "EGP",
        availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    }),
  });
  return new Response(applySeo(html, { lang, title, desc: short, head }), HTML_HEADERS());
}
async function serveMedia(env, key, check) {
  const bucket = bucketOf(env);
  if (!bucket || !check) return new Response("Not found", { status: 404 });
  const obj = await bucket.get(key);
  if (!obj) return new Response("Not found", { status: 404 });
  return new Response(obj.body, {
    headers: {
      "content-type": obj.httpMetadata?.contentType || "application/octet-stream",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runScheduled(env, ctx, event));
  },
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try {
        return await api(request, env, url, ctx);
      } catch (error) {
        console.error(error);
        return json({ error: error?.message || "Server error" }, 500);
      }
    }
    // Only product images are public. Anything else in the bucket (payment proofs, backups) is never served from here.
    if (url.pathname.startsWith("/media/product/")) {
      const key = decodeURIComponent(url.pathname.slice("/media/product/".length));
      return serveMedia(env, key, /^products\/[A-Za-z0-9._\/-]+$/.test(key) && !key.includes(".."));
    }
    if (url.pathname.startsWith("/media/review/")) {
      const key = decodeURIComponent(url.pathname.slice("/media/review/".length));
      let ok = false;
      if (/^reviews\/[A-Za-z0-9._\/-]+$/.test(key) && !key.includes("..")) {
        try {
          await ensureSchema(env);
          ok = !!(await env.DB.prepare("SELECT 1 x FROM product_reviews WHERE photo_key=? AND approved=1").bind(key).first());
        } catch {}
      }
      return serveMedia(env, key, ok);
    }
    if (url.pathname === "/robots.txt")
      return new Response(
        `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${url.origin}/sitemap.xml\n`,
        { headers: { "content-type": "text/plain; charset=utf-8" } },
      );
    if (url.pathname === "/sitemap.xml") {
      await ensureSchema(env);
      const rows = (
        await env.DB.prepare("SELECT slug,updated_at FROM products WHERE active=1 ORDER BY id").all()
      ).results;
      const entry = (path, lastmod) => {
        const ar = url.origin + path,
          en = ar + "?lang=en",
          alt = `<xhtml:link rel="alternate" hreflang="ar" href="${htmlEsc(ar)}"/><xhtml:link rel="alternate" hreflang="en" href="${htmlEsc(en)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${htmlEsc(ar)}"/>`,
          lm = lastmod ? `<lastmod>${htmlEsc(String(lastmod).slice(0, 10))}</lastmod>` : "";
        return `<url><loc>${htmlEsc(ar)}</loc>${lm}${alt}</url><url><loc>${htmlEsc(en)}</loc>${lm}${alt}</url>`;
      };
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entry("/")}${rows.map((p) => entry("/" + encodeURIComponent(p.slug), p.updated_at)).join("")}</urlset>`,
        {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=300",
          },
        },
      );
    }
    if (!env.ASSETS)
      return new Response(
        'Static assets binding missing. Add binding = "ASSETS" under [assets] in wrangler.toml.',
        { status: 500 },
      );
    if (request.method === "GET" && !url.pathname.includes(".")) {
      try {
        return url.pathname === "/"
          ? await htmlForHome(env, request, url)
          : await htmlForProduct(env, request, url);
      } catch (e) {
        console.error("seo", e);
      }
    }
    let res = await env.ASSETS.fetch(request);
    if (
      res.status === 404 &&
      request.method === "GET" &&
      (request.headers.get("accept") || "").includes("text/html")
    )
      res = await shellFetch(env, url, request);
    return res;
  },
};
