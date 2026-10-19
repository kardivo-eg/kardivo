// V81 tests: support hours, pinch-zoom, own-domain share image, real home-page numbers, per-product "How to redeem".
// Run from the project folder: node --no-warnings tests/v80-email.test.mjs  (Node 22 or newer). Uses an in-memory database, never your live store.
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(HERE, "../worker.js"), "utf8");
const mod = await import("data:text/javascript;base64," + Buffer.from(src).toString("base64"));
const db = new DatabaseSync(":memory:"); db.exec(fs.readFileSync(path.join(HERE, "../schema.sql"), "utf8"));
const norm = (v) => (v === undefined ? null : typeof v === "boolean" ? (v ? 1 : 0) : v);
function stmt(sql) { let binds = []; const o = { bind(...a) { binds = a.map(norm); return o; }, async first() { const r = db.prepare(sql).get(...binds); return r ? { ...r } : null; }, async all() { return { results: db.prepare(sql).all(...binds).map((r) => ({ ...r })) }; }, async run() { const r = db.prepare(sql).run(...binds); return { meta: { changes: Number(r.changes), last_row_id: Number(r.lastInsertRowid) }, success: true }; } }; return o; }
const DB = { prepare: stmt, async batch(list) { const out = []; db.exec("BEGIN"); try { for (const s of list) out.push(await s.run()); db.exec("COMMIT"); } catch (e) { db.exec("ROLLBACK"); throw e; } return out; }, async exec(s) { db.exec(s); } };
const store = new Map();
const R2 = { async put(k, v) { store.set(k, v); }, async get(k) { return store.has(k) ? { body: "x", httpMetadata: {} } : null; }, async delete(k) { store.delete(k); } };
const shell = fs.readFileSync(path.join(HERE, "../public/index.html"), "utf8");
const env = { DB, R2, RESEND_API_KEY: "re_test", EMAIL_FROM: "Kardivo <orders@kardivo.store>", PUBLIC_ORIGIN: "https://kardivo.store", ADMIN_EMAIL: "admin@test.com", ADMIN_PASSWORD: "adminpass123", ASSETS: { fetch: async () => new Response(shell, { headers: { "content-type": "text/html" } }) } };
const ctx = { waitUntil(p) { Promise.resolve(p).catch(() => {}); } };
let ipN = 0;
async function call(method, p, { body, cookie, headers = {} } = {}) {
  const h = { "cf-connecting-ip": "8.8.8." + (++ipN), ...headers };
  if (cookie) h.cookie = cookie;
  let b; if (body instanceof FormData) b = body; else if (body) { b = JSON.stringify(body); h["content-type"] = "application/json"; }
  const r = await mod.default.fetch(new Request("https://kardivo.store" + p, { method, headers: h, body: b }), env, ctx);
  const txt = await r.text(); let j; try { j = JSON.parse(txt); } catch { j = txt; }
  return { status: r.status, json: j, cookie: (r.headers.get("set-cookie") || "").split(";")[0] };
}
let pass = 0, fail = 0; const ok = (n, c, x = "") => { (c ? pass++ : fail++); console.log((c ? "PASS" : "FAIL") + " - " + n + (c ? "" : " " + x)); };


// Capture every email the worker sends (Resend API) instead of reaching the network.
const sent = [];
globalThis.fetch = async (u, init) => { if (String(u).includes("api.resend.com")) { const b = JSON.parse(init.body); sent.push({ to: b.to[0], subject: b.subject, html: b.html || "", text: b.text || "", headers: b.headers || {} }); return new Response("{}", { status: 200 }); } return new Response("{}", { status: 404 }); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const tick = async (event = { scheduledTime: Date.now() }) => { const pend = []; await mod.default.scheduled(event, env, { waitUntil: (p) => pend.push(p) }); await Promise.all(pend); };
const mailTo = (to, kind) => sent.filter((m) => m.to === to && (!kind || m.subject.includes(kind)));
const hNow = Number(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: "Africa/Cairo" }).format(new Date())) % 24;
const setS = (o) => { for (const [k, v] of Object.entries(o)) db.prepare("INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(k, String(v)); };

const read = (f) => fs.readFileSync(path.join(HERE, "..", f), "utf8");
await call("GET", "/api/health");
const admin = await call("POST", "/api/auth/login", { body: { email: "admin@test.com", password: "adminpass123" } });
const cat = db.prepare("SELECT id FROM categories LIMIT 1").get();

// --- 1. support hours text comes from the admin working hours
{
  const app = read("src/app.js"), a = app.indexOf("function hourLabel"), b = app.indexOf("// V81: real numbers");
  const state = { lang: "en", settings: { work_start_hour: "10", work_end_hour: "23" } };
  const t = (k) => k;
  const fn = new Function("state", "t", app.slice(a, b) + "; return supportHoursText;")(state, t);
  ok("English hours text uses the admin hours (10 AM - 11 PM)", fn() === "Chat with us in Arabic, daily 10 AM – 11 PM", fn());
  state.lang = "ar";
  ok("Arabic hours text uses the admin hours", fn() === "كلمنا بالعربي كل يوم من 10 ص لـ 11 م", fn());
  state.settings = { work_start_hour: "0", work_end_hour: "12" }; state.lang = "en";
  ok("midnight and noon read correctly", fn().endsWith("12 AM – 12 PM"), fn());
  state.settings = { work_start_hour: "9", work_end_hour: "9" };
  ok("equal start and end never promises hours", fn() === "Chat with us in Arabic", fn());
  ok('no page still says "any time" for support', !/Chat with us in Arabic, any time/.test(read("public/index.html")));
}

// --- 2. pinch zoom
{
  const html = read("public/index.html"), js = read("public/app.js"), src = read("src/app.js");
  ok("viewport tag allows zoom", !/user-scalable|maximum-scale/.test(html));
  ok("no script blocks pinch gestures any more", !/gesturestart/.test(js) && !/gesturestart/.test(src));
}

// --- 3. share image on our own domain
{
  const home = await call("GET", "/");
  const hom = typeof home.json === "string" ? home.json : "";
  ok("home page has an og:image on our own domain", /<meta property="og:image" content="https:\/\/kardivo\.store\/icons\/og-image\.png">/.test(hom), hom.slice(hom.indexOf("og:image") - 20, hom.indexOf("og:image") + 120));
  ok("home page no longer points at ibb.co", !/ibb\.co/.test(hom));
  ok("og:image size is declared", /og:image:width" content="1200"/.test(hom));
  ok("the share image file exists", fs.existsSync(path.join(HERE, "../public/icons/og-image.png")));
  setS({ logo_url: "https://i.ibb.co/rRqtGKkw/0db84367-e795-4617-835e-5e0a2bf2ff45.jpg" });
  const st = await call("GET", "/api/settings/public");
  ok("a stored old ibb.co logo is treated as 'default' and replaced", st.json.logo_url === "/icons/icon-512.png", st.json.logo_url);
  setS({ logo_url: "https://cdn.example.com/my-logo.png" });
  const home2 = await call("GET", "/");
  ok("a logo the admin really set is still used for link previews", /og:image" content="https:\/\/cdn\.example\.com\/my-logo\.png"/.test(String(home2.json)));
  db.prepare("DELETE FROM settings WHERE key='logo_url'").run();
}

// --- 4. real numbers
{
  const s0 = await call("GET", "/api/stats/public");
  ok("a new store shows no numbers", s0.json.enabled === true && s0.json.orders === null && s0.json.median_minutes === null && s0.json.rating === null, JSON.stringify(s0.json));
  const pid0 = Number(db.prepare("INSERT INTO products(name,slug,price,delivery_type,active,category_id) VALUES('Stat Card','stat-card',50,'manual',1,?)").run(cat.id).lastInsertRowid);
  for (let i = 0; i < 12; i++) {
    const oid = Number(db.prepare("INSERT INTO orders(order_number,subtotal,total,payment_method,payment_status,fulfillment_status,lang) VALUES(?,50,50,'instapay','paid','fulfilled','en')").run("KDV-S" + i).lastInsertRowid);
    db.prepare("INSERT INTO kd_order_events(order_id,kind,created_at) VALUES(?,?,datetime('now','-2 hours'))").run(oid, "proof_received");
    db.prepare("INSERT INTO kd_order_events(order_id,kind,created_at) VALUES(?,?,datetime('now','-2 hours','+" + (i < 6 ? 10 : 30) + " minutes'))").run(oid, "delivered");
  }
  db.prepare("INSERT INTO orders(order_number,subtotal,total,payment_method,payment_status,fulfillment_status,lang) VALUES('KDV-REF',50,50,'instapay','refunded','fulfilled','en')").run();
  db.prepare("INSERT INTO orders(order_number,subtotal,total,payment_method,payment_status,fulfillment_status,lang) VALUES('KDV-PEND',50,50,'instapay','awaiting_payment','pending','en')").run();
  const s1 = await call("GET", "/api/stats/public");
  ok("12 delivered orders are counted (refunded and pending ones are not)", s1.json.orders === 12, JSON.stringify(s1.json));
  ok("median delivery time is the middle of 10 and 30 minutes (20)", s1.json.median_minutes === 20, JSON.stringify(s1.json));
  ok("no rating until there are enough reviews", s1.json.rating === null);
  for (const r of [5, 5, 4, 5, 4]) db.prepare("INSERT INTO product_reviews(product_id,rating,body,approved) VALUES(?,?,'ok',1)").run(pid0, r);
  db.prepare("INSERT INTO product_reviews(product_id,rating,body,approved) VALUES(?,1,'bad',0)").run(pid0);
  const s2 = await call("GET", "/api/stats/public");
  ok("rating is the average of approved reviews only (4.6)", s2.json.rating === 4.6 && s2.json.rating_count === 5, JSON.stringify(s2.json));
  setS({ stats_min_orders: 50 });
  const s3 = await call("GET", "/api/stats/public");
  ok("the minimum-orders setting hides order count and delivery time", s3.json.orders === null && s3.json.median_minutes === null && s3.json.rating === 4.6, JSON.stringify(s3.json));
  setS({ stats_enabled: 0 });
  const s4 = await call("GET", "/api/stats/public");
  ok("the switch turns everything off", s4.json.enabled === false && s4.json.orders === undefined, JSON.stringify(s4.json));
  setS({ stats_enabled: 1, stats_min_orders: 10 });
  const sv = await call("PUT", "/api/admin/settings", { cookie: admin.cookie, body: { stats_min_orders: "0", stats_enabled: "x" } });
  const st = await call("GET", "/api/settings/public");
  ok("settings save clamps the minimum to 1 and the switch to 1/0", sv.status === 200 && st.json.stats_min_orders === "1" && st.json.stats_enabled === "1", JSON.stringify([sv.status, st.json.stats_min_orders, st.json.stats_enabled]));
  setS({ stats_min_orders: 10 });
  const dflt = read("worker.js").slice(read("worker.js").indexOf("  deal_1:"), read("worker.js").indexOf("  deal_1:") + 200);
  ok("the developer-style deal text is gone from the defaults", !/Stock-aware|Exact payment/.test(dflt), dflt);
  setS({ deal_2: "Stock-aware carts", deal_3_ar: "الإجمالي مظبوط للجنيه" });
  const st2 = await call("GET", "/api/settings/public");
  ok("an old stored 'Stock-aware carts' shows the new wording", st2.json.deal_2 === "Your code arrives in minutes" && st2.json.deal_3_ar === "الكود مش شغال؟ بنبدّله أو بنرجّع فلوسك", JSON.stringify([st2.json.deal_2, st2.json.deal_3_ar]));
  setS({ deal_2: "My own text" });
  const st3 = await call("GET", "/api/settings/public");
  ok("text the owner wrote is never overwritten", st3.json.deal_2 === "My own text");
}

// --- 5. How to redeem
{
  const col = db.prepare("PRAGMA table_info(products)").all().map((c) => c.name);
  ok("new columns exist (additive)", col.includes("redeem_steps") && col.includes("redeem_steps_ar"));
  const mk = await call("POST", "/api/admin/products", { cookie: admin.cookie, body: { name: "Redeem Card", slug: "redeem-card", price: 100, delivery_type: "manual", category_id: cat.id, redeem_steps: "1. Open the store\r\n2. Choose Redeem   code\n\n\n\n3. Enter the code", redeem_steps_ar: "١. افتح المتجر\n٢. اختار استرداد كود" } });
  ok("product with redeem steps is created", mk.status === 201, JSON.stringify(mk.json));
  const pub = await call("GET", "/api/products/redeem-card");
  ok("public product API returns the steps, tidied (one step per line, no triple blank lines)", pub.json.redeem_steps === "1. Open the store\n2. Choose Redeem code\n\n3. Enter the code" && pub.json.redeem_steps_ar.includes("افتح المتجر"), JSON.stringify(pub.json.redeem_steps));
  const put = await call("PUT", `/api/admin/products/${mk.json.id}`, { cookie: admin.cookie, body: { name: "Redeem Card", slug: "redeem-card", price: 110, delivery_type: "manual", category_id: cat.id } });
  const pub2 = await call("GET", "/api/products/redeem-card");
  ok("an update that does not send the field (old admin page, bulk edit) keeps the steps", put.status === 200 && pub2.json.redeem_steps.startsWith("1. Open"), JSON.stringify(put.json));
  const long = "x".repeat(3000);
  await call("PUT", `/api/admin/products/${mk.json.id}`, { cookie: admin.cookie, body: { name: "Redeem Card", slug: "redeem-card", price: 110, delivery_type: "manual", category_id: cat.id, redeem_steps: long } });
  ok("steps are capped at 1500 characters", db.prepare("SELECT length(redeem_steps) n FROM products WHERE id=?").get(mk.json.id).n === 1500);
  await call("PUT", `/api/admin/products/${mk.json.id}`, { cookie: admin.cookie, body: { name: "Redeem Card", slug: "redeem-card", price: 110, delivery_type: "manual", category_id: cat.id, redeem_steps: "1. Open the store\n2. Choose Redeem code" } });

  // delivered email carries the steps, in the order's language, only for the products in the order
  const other = Number(db.prepare("INSERT INTO products(name,slug,price,delivery_type,active,category_id) VALUES('No Steps Card','no-steps',10,'manual',1,?)").run(cat.id).lastInsertRowid);
  const U = await call("POST", "/api/auth/register", { body: { name: "Rita R", email: "rita@test.com", password: "password123", lang: "en" } });
  const UA = await call("POST", "/api/auth/register", { body: { name: "Rami R", email: "rami@test.com", password: "password123", lang: "ar" } });
  setS({ instapay: "kard@instapay" });
  const o1 = await call("POST", "/api/orders", { cookie: U.cookie, body: { items: [{ product_id: mk.json.id, quantity: 1 }, { product_id: other, quantity: 1 }], payment_method: "instapay", lang: "en" } });
  const o2 = await call("POST", "/api/orders", { cookie: UA.cookie, body: { items: [{ product_id: mk.json.id, quantity: 1 }], payment_method: "instapay", lang: "ar" } });
  ok("test orders placed", !!o1.json.order_id && !!o2.json.order_id, JSON.stringify([o1.json, o2.json]));
  for (const o of [o1, o2]) await call("PUT", `/api/admin/orders/${o.json.order_id}`, { cookie: admin.cookie, body: { payment_status: "paid", fulfillment_status: "fulfilled" } });
  await sleep(120);
  const m1 = sent.filter((m) => m.to === "rita@test.com" && /delivered/i.test(m.subject)), m2 = sent.filter((m) => m.to === "rami@test.com" && m.subject.includes("اتسلّم"));
  ok("English delivered email has a How to redeem block with the steps", m1.length === 1 && m1[0].html.includes("How to redeem") && m1[0].html.includes("Choose Redeem code") && m1[0].text.includes("How to redeem:"), JSON.stringify(m1[0]?.text));
  ok("the product without steps adds nothing", m1[0] && !m1[0].text.includes("No Steps Card"));
  ok("Arabic order gets the Arabic steps", m2.length === 1 && m2[0].html.includes("طريقة الاستخدام") && m2[0].html.includes("افتح المتجر"), JSON.stringify(m2[0]?.text));
  const o3 = await call("POST", "/api/orders", { cookie: U.cookie, body: { items: [{ product_id: other, quantity: 1 }], payment_method: "instapay", lang: "en" } });
  await call("PUT", `/api/admin/orders/${o3.json.order_id}`, { cookie: admin.cookie, body: { payment_status: "paid", fulfillment_status: "fulfilled" } });
  await sleep(120);
  const m3 = sent.filter((m) => m.to === "rita@test.com" && /delivered/i.test(m.subject)).pop();
  ok("an order with no steps gets no redeem block", m3 && !m3.html.includes("How to redeem"));

  // AI fields
  const w = read("worker.js");
  ok("AI auto-fill asks for redeem steps in both languages", w.includes('"redeem_steps":"English redeem steps"') && w.includes("redeem_steps_ar: stepsClean(obj.redeem_steps_ar)"));
  const app = read("src/app.js"), js = read("public/app.js");
  ok("admin form, save, single and bulk AI fill all handle redeem steps", ["pRedeem", "pRedeemAr", "fillIf(\"redeem_steps\"", "put(\"#pRedeem\""].every((k) => app.includes(k)));
  ok("built storefront includes the product redeem box and the stats code", js.includes("product-redeem") && js.includes("deal-stat"));
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
