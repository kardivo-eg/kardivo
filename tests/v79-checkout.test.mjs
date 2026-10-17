// V79 tests: the multi-step checkout API (order, then payment proof AFTER payment), funnel events, and server-rendered home products.
// Run from the project folder: node --no-warnings tests/v79-checkout.test.mjs  (Node 22 or newer). Uses an in-memory database, never your live store.
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
const env = { DB, R2, ADMIN_EMAIL: "admin@test.com", ADMIN_PASSWORD: "adminpass123", ASSETS: { fetch: async () => new Response(shell, { headers: { "content-type": "text/html" } }) } };
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

await call("GET", "/api/health");
db.exec("INSERT OR REPLACE INTO settings(key,value) VALUES('instapay','kard@instapay'),('reserve_hours','12')");
const cat = db.prepare("SELECT id FROM categories LIMIT 1").get();
const pid = Number(db.prepare("INSERT INTO products(name,slug,price,delivery_type,active,featured,category_id) VALUES('Test Card','test-card',100,'code',1,1,?)").run(cat.id).lastInsertRowid);
const mid = Number(db.prepare("INSERT INTO products(name,slug,price,delivery_type,active,featured,category_id) VALUES('Manual Item','manual-item',50,'manual',1,0,?)").run(cat.id).lastInsertRowid);
for (let i = 0; i < 5; i++) db.prepare("INSERT INTO inventory(product_id,code,status) VALUES(?,?,'available')").run(pid, "CODE" + i);

// --- server-rendered home
const home = await call("GET", "/");
ok("home HTML already contains the featured product", typeof home.json === "string" && home.json.includes("Test Card") && home.json.includes("/test-card"));
ok("home HTML has an ItemList for search engines", typeof home.json === "string" && home.json.includes('"ItemList"'));
ok("home HTML prices are EGP", /100\.00 ج\.م/.test(home.json));
const homeEn = await call("GET", "/?lang=en");
ok("English home HTML shows EGP", /100\.00 EGP/.test(homeEn.json));
ok("checkout page is noindex", (await call("GET", "/checkout")).json.includes('content="noindex,nofollow"'));
ok("robots.txt blocks /checkout", (await call("GET", "/robots.txt")).json.includes("Disallow: /checkout"));

// --- order first, proof afterwards
const A = await call("POST", "/api/auth/register", { body: { name: "Alice A", email: "alice@test.com", password: "password123" } });
const o = await call("POST", "/api/orders", { cookie: A.cookie, body: { items: [{ product_id: pid, quantity: 2 }], payment_method: "instapay", lang: "en" } });
ok("order placed with no proof", o.status === 201 && o.json.total === 200 && o.json.destination === "kard@instapay", JSON.stringify(o.json));
ok("order says how long stock is held (12h setting)", o.json.hold_hours === 12 && o.json.expires_at > Date.now() + 11 * 3600000, JSON.stringify([o.json.hold_hours, o.json.expires_at]));
const m = await call("POST", "/api/orders", { cookie: A.cookie, body: { items: [{ product_id: mid, quantity: 1 }], payment_method: "instapay", lang: "en" } });
ok("manual-delivery order holds no stock", m.status === 201 && m.json.hold_hours === 0, JSON.stringify(m.json));
const png = new Blob([Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64")], { type: "image/png" });
const fd = new FormData(); fd.append("file", png, "proof.png"); fd.append("ref", "123456");
const up = await call("POST", `/api/orders/${o.json.order_id}/payment-proof`, { cookie: A.cookie, body: fd });
ok("proof can be uploaded after the order exists", up.status === 200 && up.json.ok, JSON.stringify(up.json));
const row = db.prepare("SELECT payment_proof_key,payment_ref FROM orders WHERE id=?").get(o.json.order_id);
ok("proof and reference saved on the order", !!row.payment_proof_key && row.payment_ref === "123456");

// --- funnel
for (const ev of ["cart_viewed", "checkout_started", "checkout_payment_step", "checkout_completed", "proof_step_viewed", "proof_uploaded", "proof_whatsapp_clicked", "payment_copied"]) {
  const r = await call("POST", "/api/checkout-events", { body: { event: ev, session_key: "s1", order_id: o.json.order_id } });
  ok("event accepted: " + ev, r.status === 200 && r.json.ok, JSON.stringify(r.json));
}
ok("unknown event rejected", (await call("POST", "/api/checkout-events", { body: { event: "nope", session_key: "s1" } })).status === 400);
const admin = await call("POST", "/api/auth/login", { body: { email: "admin@test.com", password: "adminpass123" } });
const rep = await call("GET", "/api/admin/reports?days=30", { cookie: admin.cookie });
ok("report lists the 6 funnel steps in order", rep.json.funnel_steps?.map((s) => s.name).join("|") === "Viewed cart|Started checkout|Reached payment choice|Placed order|Reached proof step|Sent proof (upload or WhatsApp)", JSON.stringify(rep.json.funnel_steps));
ok("report counts one session per step", rep.json.funnel_steps.every((s) => s.sessions === 1));
ok("report has a proof rate", rep.json.proof_rate?.orders === 2 && rep.json.proof_rate?.with_proof === 1, JSON.stringify(rep.json.proof_rate));
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
