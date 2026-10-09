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
};
async function ensureSchema(env) {
  if (schemaReady) return;
  const cols = async (t) =>
    (await env.DB.prepare(`PRAGMA table_info(${t})`).all()).results.map(
      (r) => r.name,
    );
  const add = async (t, c, def) => {
    try {
      if (!(await cols(t)).includes(c))
        await env.DB.prepare(`ALTER TABLE ${t} ADD COLUMN ${c} ${def}`).run();
    } catch (e) {
      if (!/duplicate column/i.test(String(e.message))) throw e;
    }
  };
  await add("discounts", "max_uses", "INTEGER");
  await add("discounts", "used_count", "INTEGER NOT NULL DEFAULT 0");
  await add("orders", "discount_code", "TEXT");
  await add("orders", "delivery_message", "TEXT DEFAULT ''");
  await add("orders", "payment_proof_key", "TEXT");
  await add("orders", "payment_proof_name", "TEXT");
  await add("orders", "payment_proof_type", "TEXT");
  await add("products", "name_ar", "TEXT DEFAULT ''");
  await add("products", "description_ar", "TEXT DEFAULT ''");
  await add("categories", "name_ar", "TEXT DEFAULT ''");
  await add("inventory", "variant_id", "INTEGER");
  await add("order_items", "variant_id", "INTEGER");
  await add("order_items", "variant_name", "TEXT DEFAULT ''");
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS product_variants(id INTEGER PRIMARY KEY AUTOINCREMENT,product_id INTEGER NOT NULL,name TEXT NOT NULL,price REAL NOT NULL DEFAULT 0,old_price REAL,active INTEGER NOT NULL DEFAULT 1,sort_order INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE)",
  ).run();
  await env.DB.prepare(
    "CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id,active,sort_order,id)",
  ).run();
  await env.DB.prepare(
    "CREATE INDEX IF NOT EXISTS idx_inventory_variant ON inventory(variant_id,status)",
  ).run();
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS variant_sources(id INTEGER PRIMARY KEY AUTOINCREMENT,variant_id INTEGER NOT NULL,source_product_id INTEGER NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE(variant_id,source_product_id),FOREIGN KEY(variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,FOREIGN KEY(source_product_id) REFERENCES products(id) ON DELETE CASCADE)",
  ).run();
  await env.DB.prepare(
    "CREATE INDEX IF NOT EXISTS idx_variant_sources_variant ON variant_sources(variant_id)",
  ).run();
  await env.DB.prepare(
    "CREATE INDEX IF NOT EXISTS idx_variant_sources_product ON variant_sources(source_product_id)",
  ).run();
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS audit_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,admin_user_id INTEGER,action TEXT NOT NULL,target_type TEXT,target_id INTEGER,details TEXT DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(admin_user_id) REFERENCES users(id) ON DELETE SET NULL)",
  ).run();
  await env.DB.prepare(
    "CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at)",
  ).run();
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS checkout_events(id INTEGER PRIMARY KEY AUTOINCREMENT,event TEXT NOT NULL,session_key TEXT,order_id INTEGER,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  ).run();
  await env.DB.prepare(
    "CREATE INDEX IF NOT EXISTS idx_checkout_events_created ON checkout_events(created_at,event)",
  ).run();
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS product_reviews(id INTEGER PRIMARY KEY AUTOINCREMENT,product_id INTEGER NOT NULL,user_id INTEGER,order_id INTEGER,rating INTEGER NOT NULL,body TEXT DEFAULT '',approved INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE(product_id,order_id,user_id),FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE SET NULL)",
  ).run();
  await env.DB.prepare(
    "CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id,approved,created_at)",
  ).run();
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS customer_notifications(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER,order_id INTEGER,kind TEXT NOT NULL,title TEXT NOT NULL,message TEXT NOT NULL,read_at TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE SET NULL)",
  ).run();
  await env.DB.prepare(
    "CREATE INDEX IF NOT EXISTS idx_notifications_user ON customer_notifications(user_id,created_at)",
  ).run();
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS login_attempts(key TEXT PRIMARY KEY,count INTEGER NOT NULL,reset_at INTEGER NOT NULL)",
  ).run();
  await env.DB.prepare("DELETE FROM login_attempts WHERE reset_at<?")
    .bind(Date.now())
    .run();
  await env.DB.batch(
    Object.entries(DEFAULTS).map(([k, v]) =>
      env.DB.prepare(
        "INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)",
      ).bind(k, v),
    ),
  );
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
const BAD_DISCOUNT =
  "This discount code is invalid, expired, or doesn't apply to your cart.";
async function calcDiscount(env, rawCode, subtotal) {
  const code = clean(rawCode).toUpperCase();
  if (!code) return { code: null, discount: 0 };
  const d = await env.DB.prepare(
    "SELECT * FROM discounts WHERE code=? AND active=1",
  )
    .bind(code)
    .first();
  if (!d) return { error: BAD_DISCOUNT };
  if (d.expires_at) {
    const t = Date.parse(d.expires_at);
    if (Number.isFinite(t) && t < Date.now()) return { error: BAD_DISCOUNT };
  }
  if (d.max_uses != null && Number(d.used_count || 0) >= Number(d.max_uses))
    return { error: BAD_DISCOUNT };
  if (subtotal < Number(d.min_order || 0)) return { error: BAD_DISCOUNT };
  let discount =
    d.type === "fixed"
      ? Number(d.amount)
      : (subtotal * Math.min(100, Number(d.amount))) / 100;
  discount = money(Math.max(0, Math.min(subtotal, discount)));
  return { code: d.code, discount };
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
      "SELECT id FROM orders WHERE payment_status='awaiting_payment' AND fulfillment_status='pending' AND payment_proof_key IS NULL AND created_at<datetime('now',?) AND id IN (SELECT order_id FROM order_items WHERE delivery_type='code')",
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
  for (const id of ids) await releaseDiscount(env, id);
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
  return orders.map(
    ({
      notes,
      payment_proof_key,
      payment_proof_name,
      payment_proof_type,
      ...o
    }) => ({
      ...o,
      codes: codes.filter((c) => c.order_id === o.id),
      payment_proof: !!payment_proof_key,
    }),
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
  for (const p of rows) p.variants = vs.filter((v) => v.product_id === p.id);
  return rows;
}
const blank = (v) => v === "" || v == null;
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
  const targetId = Number(b.target_id),
    sourceIds = [
      ...new Set(
        (Array.isArray(b.source_ids) ? b.source_ids : [])
          .map(Number)
          .filter(Boolean)
          .filter((x) => x !== targetId),
      ),
    ];
  if (!targetId || !sourceIds.length)
    return {
      error: "Choose a target product and at least one different source product.",
      status: 400,
    };
  const ids = [targetId, ...sourceIds],
    rows = (
      await env.DB.prepare(
        `SELECT p.*,(SELECT COUNT(*) FROM inventory i WHERE i.product_id=p.id AND i.status='available') stock,(SELECT COUNT(*) FROM order_items oi WHERE oi.product_id=p.id) orders FROM products p WHERE p.id IN (${inMarks(ids)})`,
      )
        .bind(...ids)
        .all()
    ).results;
  if (rows.length !== ids.length)
    return { error: "One or more selected products no longer exist.", status: 404 };
  const target = rows.find((x) => x.id === targetId),
    sources = sourceIds.map((id) => rows.find((x) => x.id === id));
  if (target.delivery_type !== "code")
    return {
      error:
        "The target product must be a digital-code product for a safe stock-preserving merge.",
      status: 400,
    };
  const base = await env.DB.prepare(
      "SELECT COUNT(*) n FROM inventory WHERE product_id=? AND variant_id IS NULL",
    )
      .bind(targetId)
      .first(),
    selfMapped = await env.DB.prepare(
      "SELECT 1 x FROM variant_sources vs JOIN product_variants v ON v.id=vs.variant_id WHERE v.product_id=? AND vs.source_product_id=?",
    )
      .bind(targetId, targetId)
      .first(),
    needsSelf = Number(base.n) > 0 && !selfMapped,
    selfExisting = needsSelf
      ? await env.DB.prepare(
          "SELECT id FROM product_variants WHERE product_id=? AND name=?",
        )
          .bind(targetId, target.name)
          .first()
      : null,
    names = new Set(needsSelf ? [target.name] : []),
    links = [];
  for (const source of sources) {
    if (source.delivery_type !== "code")
      return {
        error: `${source.name} is manual delivery. Merge only digital-code products in this tool.`,
        status: 400,
      };
    if (names.has(source.name))
      return {
        error: `Two selected products have the same name (${source.name}). Rename one first so each denomination gets its own variant.`,
        status: 400,
      };
    names.add(source.name);
    const own = await env.DB.prepare(
      "SELECT COUNT(*) n FROM product_variants WHERE product_id=?",
    )
      .bind(source.id)
      .first();
    if (Number(own.n) > 0)
      return {
        error: `${source.name} already has variants. Merge that product manually first so its stock mapping stays unambiguous.`,
        status: 400,
      };
    const existing = await env.DB.prepare(
      "SELECT id FROM product_variants WHERE product_id=? AND name=?",
    )
      .bind(targetId, source.name)
      .first();
    if (existing) {
      const linked = await env.DB.prepare(
        "SELECT id FROM variant_sources WHERE variant_id=? AND source_product_id=?",
      )
        .bind(existing.id, source.id)
        .first();
      if (linked)
        return {
          error: `${source.name} is already linked to this product.`,
          status: 409,
        };
    }
    links.push({ source, existingId: existing ? existing.id : null });
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
    return json({ ok: true, version: "9.1.0", logo: LOGO_URL });
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
    product.reviews = (
      await env.DB.prepare(
        "SELECT r.id,r.rating,r.body,r.created_at,u.name user_name FROM product_reviews r LEFT JOIN users u ON u.id=r.user_id WHERE r.product_id=? AND r.approved=1 ORDER BY r.id DESC LIMIT 20",
      )
        .bind(product.id)
        .all()
    ).results;
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
    if (!(await throttle(env, `disc:${ipOf(req)}`, 30)))
      return json({ error: "Too many attempts. Try again later." }, 429);
    const cart = await priceCart(env, b.items, s);
    if (cart.error) return json({ error: cart.error }, 400);
    const dc = await calcDiscount(env, b.code, cart.subtotal);
    if (dc.error) return json({ error: dc.error }, 400);
    return json({
      subtotal: cart.subtotal,
      discount: dc.discount,
      total: money(cart.subtotal - dc.discount),
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
    const dc = await calcDiscount(env, b.discount_code, cart.subtotal);
    if (dc.error) return json({ error: dc.error }, 400);
    const subtotal = cart.subtotal,
      discount = dc.discount,
      total = money(subtotal - discount);
    const pm = PAYMENT_METHODS.includes(b.payment_method)
      ? b.payment_method
      : "";
    if (!pm || s[`${pm}_enabled`] === "0" || !clean(s[pm]))
      return json({ error: "Choose an enabled payment method." }, 400);
    if (!(await throttle(env, `order:${ipOf(req)}`, 6, 900000)))
      return json({ error: "Too many order attempts. Try again later." }, 429);
    const orderNumber = `${clean(s.order_prefix) || "KDV"}-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const guestName = me ? null : clean(b.guest_name),
      guestContact = me ? null : clean(b.guest_contact);
    // The order and its items are written in one atomic batch.
    const stmts = [
      env.DB.prepare(
        "INSERT INTO orders(order_number,user_id,guest_name,guest_contact,subtotal,discount,total,payment_method,discount_code) VALUES(?,?,?,?,?,?,?,?,?)",
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
    let claimed = false;
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
      return json({ error: message }, status);
    };
    // Claim one use of the discount atomically so max_uses can't be exceeded.
    if (dc.code) {
      const u = await env.DB.prepare(
        "UPDATE discounts SET used_count=COALESCE(used_count,0)+1 WHERE code=? AND active=1 AND (max_uses IS NULL OR COALESCE(used_count,0)<max_uses)",
      )
        .bind(dc.code)
        .run();
      if (!(u.meta.changes > 0)) return abort(BAD_DISCOUNT, 400);
      claimed = true;
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
    const cur = clean(s.store_currency) || "EGP",
      ar = b.lang === "ar",
      PAY_AR = {
        instapay: "إنستاباي",
        vodafone_cash: "فودافون كاش",
        telda: "تيلدا",
      },
      waText = ar
        ? `أهلاً فريق دعم ${s.store_name}\nرقم الطلب: ${orderNumber}\nالإجمالي: ${total.toFixed(2)} ${cur === "EGP" ? "ج.م" : cur}\nطريقة الدفع: ${PAY_AR[pm] || pm}`
        : `Hello ${s.store_name} Support\nOrder: ${orderNumber}\nTotal: ${total.toFixed(2)} ${cur}\nPayment method: ${pm}`,
      wa = s.whatsapp
        ? `https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(waText)}`
        : "";
    const adminLink = `${url.origin}/?admin_order=${orderId}`;
    notifyDiscord(env, ctx, `Order ${orderNumber}`, [
      ["Total", `${total.toFixed(2)} ${cur}`, true],
      ["Payment", pm, true],
      [
        "Customer",
        `${me ? me.name : guestName} - ${me ? me.email : guestContact}`,
      ],
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
      ...(dc.code ? [["Discount code", dc.code, true]] : []),
    ]);
    return json(
      {
        order_id: orderId,
        order_number: orderNumber,
        total,
        subtotal,
        discount,
        payment_method: pm,
        destination: s[pm],
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
    const key = `payment-proofs/${id}/${crypto.randomUUID()}.${extFromType(file.type)}`;
    await bucket.put(key, await file.arrayBuffer(), {
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
      "UPDATE orders SET payment_proof_key=?,payment_proof_name=?,payment_proof_type=?,updated_at=CURRENT_TIMESTAMP WHERE id=?",
    )
      .bind(key, safeFileName(file.name), file.type, id)
      .run();
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
    const b = await readJson(req),
      pid = Number(b.product_id),
      rating = Math.max(1, Math.min(5, Math.floor(Number(b.rating) || 0))),
      body = clean(b.body).slice(0, 1000),
      oid = Number(b.order_id || 0);
    if (!pid || !rating || !oid)
      return json({ error: "A verified order is required." }, 400);
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
    try {
      await env.DB.prepare(
        "INSERT INTO product_reviews(product_id,user_id,order_id,rating,body) VALUES(?,?,?,?,?)",
      )
        .bind(pid, me.id, oid, rating, body)
        .run();
    } catch {
      return json({ error: "You already reviewed this purchase." }, 409);
    }
    return json({ ok: true }, 201);
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
    const st = await allSettings(env);
    const th = Number(st.low_stock_threshold) || 3,
      q = (sql) => env.DB.prepare(sql).first();
    const [p, c, o, u, rev, stock, pend, low] = await Promise.all([
      q("SELECT COUNT(*) n FROM products WHERE active=1"),
      q("SELECT COUNT(*) n FROM categories"),
      q("SELECT COUNT(*) n FROM orders"),
      q("SELECT COUNT(*) n FROM users WHERE role='customer'"),
      q(
        "SELECT COALESCE(SUM(total),0) n FROM orders WHERE payment_status='paid'",
      ),
      q("SELECT COUNT(*) n FROM inventory WHERE status='available'"),
      q(
        "SELECT COUNT(*) n FROM orders WHERE payment_status='awaiting_payment' AND fulfillment_status<>'cancelled'",
      ),
      env.DB.prepare(
        "SELECT p.name,(SELECT COALESCE(SUM(vs.stock),0) FROM (SELECT v.id,(SELECT COUNT(*) FROM inventory i WHERE i.product_id=p.id AND i.variant_id=v.id AND i.status='available')+(SELECT COUNT(*) FROM inventory i JOIN variant_sources x ON x.source_product_id=i.product_id WHERE x.variant_id=v.id AND i.variant_id IS NULL AND i.status='available') stock FROM product_variants v WHERE v.product_id=p.id) vs) + (SELECT COUNT(*) FROM inventory i WHERE i.product_id=p.id AND i.variant_id IS NULL AND i.status='available') stock FROM products p WHERE p.active=1 AND p.delivery_type='code' ORDER BY stock",
      )
        .bind()
        .all(),
    ]);
    const [d7, d30, cancelled, avg] = await Promise.all([
      q(
        "SELECT COALESCE(SUM(total),0) n FROM orders WHERE payment_status='paid' AND created_at>=datetime('now','-7 days')",
      ),
      q(
        "SELECT COALESCE(SUM(total),0) n FROM orders WHERE payment_status='paid' AND created_at>=datetime('now','-30 days')",
      ),
      q("SELECT COUNT(*) n FROM orders WHERE fulfillment_status='cancelled'"),
      q(
        "SELECT COALESCE(AVG(total),0) n FROM orders WHERE payment_status='paid'",
      ),
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
      low_stock: (low.results || []).filter((x) => Number(x.stock) <= th),
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
      "INSERT INTO products(name,slug,description,name_ar,description_ar,price,old_price,image_url,category_id,platform,region,delivery_type,active,featured) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
      existing = await env.DB.prepare("SELECT id,active FROM products WHERE id=?")
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
      "UPDATE products SET name=?,slug=?,description=?,name_ar=?,description_ar=?,price=?,old_price=?,image_url=?,category_id=?,platform=?,region=?,delivery_type=?,active=?,featured=?,updated_at=CURRENT_TIMESTAMP WHERE id=?",
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
      codes = [
        ...new Set(
          String(b.codes || "")
            .split(/\r?\n/)
            .map(clean)
            .filter(Boolean),
        ),
      ];
    if (!productId || !codes.length)
      return json(
        { error: "Select a product and enter at least one code." },
        400,
      );
    if (
      !(await env.DB.prepare("SELECT id FROM products WHERE id=?")
        .bind(productId)
        .first())
    )
      return json({ error: "Product not found." }, 404);
    if (
      !variantId &&
      (await env.DB.prepare(
        "SELECT 1 x FROM product_variants WHERE product_id=? AND active=1 LIMIT 1",
      )
        .bind(productId)
        .first())
    )
      return json(
        {
          error:
            "This product has options. Choose which option the codes belong to.",
        },
        400,
      );
    if (
      variantId &&
      !(await env.DB.prepare(
        "SELECT id FROM product_variants WHERE id=? AND product_id=?",
      )
        .bind(variantId, productId)
        .first())
    )
      return json({ error: "Selected variant is invalid." }, 400);
    let added = 0;
    for (const code of codes) {
      const exists = await env.DB.prepare(
        "SELECT id FROM inventory WHERE product_id=? AND code=?",
      )
        .bind(productId, code)
        .first();
      if (!exists) {
        await env.DB.prepare(
          "INSERT INTO inventory(product_id,code,variant_id) VALUES(?,?,?)",
        )
          .bind(productId, code, variantId)
          .run();
        added++;
      }
    }
    return json({ count: added }, 201);
  }
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
        "INSERT INTO discounts(code,type,amount,min_order,active,expires_at,max_uses) VALUES(?,?,?,?,?,?,?)",
      )
        .bind(
          code,
          b.type === "fixed" ? "fixed" : "percentage",
          Number(b.amount),
          Number(b.min_order) || 0,
          b.active === false ? 0 : 1,
          expiryOf(b.expires_at),
          maxUses(b),
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
        "UPDATE discounts SET code=?,type=?,amount=?,min_order=?,active=?,expires_at=?,max_uses=? WHERE id=?",
      )
        .bind(
          code,
          b.type === "fixed" ? "fixed" : "percentage",
          Number(b.amount) || 0,
          Number(b.min_order) || 0,
          b.active ? 1 : 0,
          expiryOf(b.expires_at),
          maxUses(b),
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
  if (path === "/api/admin/orders" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT o.*,u.name user_name,u.email user_email,(SELECT GROUP_CONCAT(oi.product_name || CASE WHEN COALESCE(oi.variant_name,'')<>'' THEN ' — '||oi.variant_name ELSE '' END || ' × ' || oi.quantity, ', ') FROM order_items oi WHERE oi.order_id=o.id) item_summary FROM orders o LEFT JOIN users u ON u.id=o.user_id ORDER BY o.id DESC",
        ).all()
      ).results,
    );
  const orderMatch = path.match(/^\/api\/admin\/orders\/(\d+)$/);
  if (orderMatch && method === "GET") {
    const order = await env.DB.prepare(
      "SELECT o.*,u.name user_name,u.email user_email FROM orders o LEFT JOIN users u ON u.id=o.user_id WHERE o.id=?",
    )
      .bind(Number(orderMatch[1]))
      .first();
    if (!order) return json({ error: "Order not found." }, 404);
    const items = (
      await env.DB.prepare(
        "SELECT * FROM order_items WHERE order_id=? ORDER BY id",
      )
        .bind(order.id)
        .all()
    ).results;
    const codes = (
      await env.DB.prepare(
        "SELECT i.*,p.name product_name,COALESCE(v.name,'') variant_name FROM inventory i JOIN products p ON p.id=i.product_id LEFT JOIN product_variants v ON v.id=i.variant_id WHERE i.order_id=?",
      )
        .bind(order.id)
        .all()
    ).results;
    order.payment_proof = !!order.payment_proof_key;
    return json({ order, items, codes });
  }
  if (orderMatch && method === "PUT") {
    const b = await readJson(req),
      id = Number(orderMatch[1]),
      existing = await env.DB.prepare("SELECT * FROM orders WHERE id=?")
        .bind(id)
        .first();
    if (!existing) return json({ error: "Order not found." }, 404);
    const payment = ["awaiting_payment", "paid", "failed", "refunded"].includes(
        b.payment_status,
      )
        ? b.payment_status
        : existing.payment_status,
      fulfill = ["pending", "processing", "fulfilled", "cancelled"].includes(
        b.fulfillment_status,
      )
        ? b.fulfillment_status
        : existing.fulfillment_status;
    if (
      payment !== existing.payment_status &&
      existing.payment_status === "refunded" &&
      payment !== "refunded"
    )
      return json(
        {
          error: "Refunded orders cannot move back to an active payment state.",
        },
        409,
      );
    if (
      fulfill !== existing.fulfillment_status &&
      existing.fulfillment_status === "fulfilled" &&
      fulfill !== "fulfilled"
    )
      return json(
        {
          error:
            "Fulfilled orders cannot move backwards. Create a support adjustment instead.",
        },
        409,
      );
    if (fulfill === "fulfilled" && payment !== "paid")
      return json(
        { error: "An order must be paid before it can be fulfilled." },
        409,
      );
    if (
      payment === "failed" ||
      payment === "refunded" ||
      fulfill === "cancelled"
    )
      await env.DB.prepare(
        "UPDATE inventory SET status='available',order_id=NULL WHERE order_id=? AND status='reserved'",
      )
        .bind(id)
        .run();
    else if (payment === "paid") {
      const items = (
        await env.DB.prepare(
          "SELECT * FROM order_items WHERE order_id=? AND delivery_type='code'",
        )
          .bind(id)
          .all()
      ).results;
      for (const item of items) {
        const have = await orderHolds(
          env,
          id,
          item.product_id,
          item.variant_id,
        );
        const need = Number(item.quantity) - have;
        if (
          need > 0 &&
          !(await reserveCodes(env, id, item.product_id, need, item.variant_id))
        )
          return json(
            {
              error: `Not enough codes in stock for ${item.variant_name || item.product_name}. Add codes first, then save again.`,
            },
            409,
          );
      }
      if (fulfill === "fulfilled")
        await env.DB.prepare(
          "UPDATE inventory SET status='sold' WHERE order_id=? AND status='reserved'",
        )
          .bind(id)
          .run();
    }
    const dm = clean(b.delivery_message),
      notes = clean(b.notes);
    await env.DB.prepare(
      "UPDATE orders SET payment_status=?,fulfillment_status=?,notes=?,delivery_message=?,updated_at=CURRENT_TIMESTAMP WHERE id=?",
    )
      .bind(payment, fulfill, notes, dm, id)
      .run();
    if (
      fulfill === "cancelled" &&
      existing.fulfillment_status !== "cancelled" &&
      existing.discount_code
    )
      await releaseDiscount(env, id);
    await audit(
      env,
      me,
      "order_update",
      "order",
      id,
      `${existing.payment_status}/${existing.fulfillment_status} -> ${payment}/${fulfill}`,
    );
    if (existing.user_id && payment !== existing.payment_status)
      await customerNotify(
        env,
        existing.user_id,
        id,
        "payment",
        `Payment ${payment}`,
        `Order ${existing.order_number}: payment status is now ${payment}.`,
      );
    if (existing.user_id && fulfill !== existing.fulfillment_status)
      await customerNotify(
        env,
        existing.user_id,
        id,
        "fulfillment",
        `Order ${fulfill}`,
        `Order ${existing.order_number}: delivery status is now ${fulfill}.${dm ? ` ${dm}` : ""}`,
      );
    return json({ ok: true });
  }
  if (path === "/api/admin/merged-products" && method === "GET") {
    return json(
      (
        await env.DB.prepare(
          "SELECT v.id,v.name,p.name target_name,GROUP_CONCAT(src.name, ', ') sources FROM product_variants v JOIN products p ON p.id=v.product_id JOIN variant_sources vs ON vs.variant_id=v.id JOIN products src ON src.id=vs.source_product_id GROUP BY v.id,v.name,p.name ORDER BY v.id DESC",
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
      warning:
        "This preview makes no changes. Execute only after reviewing the mapping.",
    });
  }
  if (path === "/api/admin/product-merger/execute" && method === "POST") {
    const plan = await planMerge(env, await readJson(req));
    if (plan.error) return json({ error: plan.error }, plan.status);
    const { target, links, selfVariant, selfExisting } = plan,
      ops = [];
    const addOption = (prod, existingId, sort) => {
      if (existingId)
        ops.push(
          env.DB.prepare(
            "INSERT OR IGNORE INTO variant_sources(variant_id,source_product_id) VALUES(?,?)",
          ).bind(existingId, prod.id),
        );
      else {
        ops.push(
          env.DB.prepare(
            "INSERT INTO product_variants(product_id,name,price,old_price,active,sort_order) VALUES(?,?,?,?,1,?)",
          ).bind(target.id, prod.name, Number(prod.price), prod.old_price, sort),
        );
        ops.push(
          env.DB.prepare(
            "INSERT INTO variant_sources(variant_id,source_product_id) SELECT id,? FROM product_variants WHERE product_id=? AND name=? ORDER BY id DESC LIMIT 1",
          ).bind(prod.id, target.id, prod.name),
        );
      }
    };
    // The target's own codes get their own option, otherwise they would stop being sellable.
    if (selfVariant || selfExisting)
      addOption(target, selfExisting ? selfExisting.id : null, 0);
    links.forEach((l, i) => {
      addOption(l.source, l.existingId, i + 1);
      ops.push(
        env.DB.prepare(
          "UPDATE products SET active=0,updated_at=CURRENT_TIMESTAMP WHERE id=?",
        ).bind(l.source.id),
      );
    });
    await env.DB.batch(ops);
    await audit(
      env,
      me,
      "product_merge",
      "product",
      target.id,
      `Merged source products: ${links.map((l) => l.source.id).join(",")}`,
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
    const s = await allSettings(env),
      th = Number(s.low_stock_threshold) || 3,
      all = await productList(env, false),
      rows = [];
    for (const p of all.filter((x) => x.delivery_type === "code")) {
      const stock = p.variants?.length
        ? p.variants.reduce((n, v) => n + Number(v.stock || 0), 0)
        : Number(p.stock || 0);
      if (stock <= th) rows.push({ id: p.id, name: p.name, stock });
    }
    if (rows.length)
      notifyDiscord(
        env,
        ctx,
        "Kardivo low-stock alert",
        rows.slice(0, 10).map((x) => [x.name, `${x.stock} left`, true]),
        "Low stock",
      );
    await audit(
      env,
      me,
      "low_stock_alert",
      "inventory",
      null,
      `${rows.length} products at or below ${th}`,
    );
    return json({ ok: true, count: rows.length });
  }
  if (path === "/api/admin/reviews" && method === "GET")
    return json(
      (
        await env.DB.prepare(
          "SELECT r.*,p.name product_name,u.name user_name FROM product_reviews r JOIN products p ON p.id=r.product_id LEFT JOIN users u ON u.id=r.user_id ORDER BY r.id DESC",
        ).all()
      ).results,
    );
  const reviewAdminMatch = path.match(/^\/api\/admin\/reviews\/(\d+)$/);
  if (reviewAdminMatch && method === "PUT") {
    const b = await readJson(req);
    await env.DB.prepare("UPDATE product_reviews SET approved=? WHERE id=?")
      .bind(b.approved ? 1 : 0, Number(reviewAdminMatch[1]))
      .run();
    await audit(
      env,
      me,
      "review_moderation",
      "review",
      Number(reviewAdminMatch[1]),
      b.approved ? "approved" : "hidden",
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
async function htmlForProduct(env, request, url) {
  let res = await env.ASSETS.fetch(
    new Request(new URL("/index.html", url), request),
  );
  if (!res.ok) return res;
  const slug = decodeURIComponent(url.pathname.slice(1)).replace(/\/$/, "");
  const p = await env.DB.prepare(
    "SELECT p.name,p.description,p.image_url,c.name category_name FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.slug=? AND p.active=1 LIMIT 1",
  )
    .bind(slug)
    .first();
  if (!p) return res;
  let html = await res.text();
  const title = `${p.name} | Kardivo`,
    desc = clean(p.description) || `${p.name} — digital product at Kardivo.`;
  html = html
    .replace(/<title>[^<]*<\/title>/i, `<title>${htmlEsc(title)}</title>`)
    .replace(
      /(<meta name="description" id="metaDesc" content=")[^"]*(")/i,
      `$1${htmlEsc(desc)}$2`,
    );
  const og = `<meta property="og:title" content="${htmlEsc(title)}"><meta property="og:description" content="${htmlEsc(desc)}">${p.image_url ? `<meta property="og:image" content="${htmlEsc(new URL(p.image_url, url).href)}">` : ""}<meta property="og:type" content="product"><meta property="og:url" content="${htmlEsc(url.href)}"><meta name="twitter:card" content="${p.image_url ? "summary_large_image" : "summary"}">`;
  html = html.replace(/<\/head>/i, og + "</head>");
  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=60",
    },
  });
}
export default {
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
    if (url.pathname.startsWith("/media/product/")) {
      const bucket = bucketOf(env);
      if (!bucket) return new Response("Not found", { status: 404 });
      const key = decodeURIComponent(
        url.pathname.slice("/media/product/".length),
      );
      const obj = await bucket.get(key);
      if (!obj) return new Response("Not found", { status: 404 });
      return new Response(obj.body, {
        headers: {
          "content-type":
            obj.httpMetadata?.contentType || "application/octet-stream",
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    }
    if (url.pathname === "/robots.txt")
      return new Response(
        `User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml\n`,
        { headers: { "content-type": "text/plain; charset=utf-8" } },
      );
    if (url.pathname === "/sitemap.xml") {
      await ensureSchema(env);
      const rows = (
        await env.DB.prepare(
          "SELECT slug FROM products WHERE active=1 ORDER BY id",
        ).all()
      ).results;
      const urls = [
        url.origin + "/",
        ...rows.map((p) => url.origin + "/" + encodeURIComponent(p.slug)),
      ];
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${htmlEsc(u)}</loc></url>`).join("")}</urlset>`,
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
    if (
      request.method === "GET" &&
      !url.pathname.includes(".") &&
      url.pathname !== "/"
    ) {
      try {
        return await htmlForProduct(env, request, url);
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
      res = await env.ASSETS.fetch(
        new Request(new URL("/index.html", url), request),
      );
    return res;
  },
};
