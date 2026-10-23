// V86 tests: Steam gift products (friend code / invite link taken at checkout, shown to the admin, sent by hand).
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
db.exec("INSERT OR REPLACE INTO settings(key,value) VALUES('instapay','kard@instapay')");
const admin = await call("POST", "/api/auth/login", { body: { email: "admin@test.com", password: "adminpass123" } });
const cat = db.prepare("SELECT id FROM categories LIMIT 1").get();

// --- admin makes a Steam gift product (even if "code" delivery is sent, a gift product is forced to manual)
const mk = await call("POST", "/api/admin/products", { cookie: admin.cookie, body: { name: "Cyberpunk 2077", price: "500", delivery_type: "code", category_id: cat.id, gift_type: "steam", active: true } });
ok("admin can create a gift product", mk.status === 201, JSON.stringify(mk.json));
const gid = mk.json.id;
const row = db.prepare("SELECT gift_type,delivery_type FROM products WHERE id=?").get(gid);
ok("gift product is saved as steam + manual", row.gift_type === "steam" && row.delivery_type === "manual", JSON.stringify(row));
const pub = await call("GET", "/api/products");
const listed = (pub.json.products || pub.json).find?.((p) => p.id === gid);
ok("shoppers can see gift_type on the product", listed?.gift_type === "steam", JSON.stringify(listed)?.slice(0, 200));

const A = await call("POST", "/api/auth/register", { body: { name: "Alice A", email: "alice@test.com", password: "password123" } });
const order = (gift, qty = 1) => call("POST", "/api/orders", { cookie: A.cookie, body: { items: [{ product_id: gid, quantity: qty, gift_target: gift }], payment_method: "instapay", lang: "en" } });

// --- checkout check
for (const bad of ["", "abc", "12", "http://s.team/p/abc", "https://evil.com/p/abc", "https://s.team.evil.com/p/abc", "javascript:alert(1)"]) {
  const r = await order(bad);
  ok(`rejects "${bad}"`, r.status === 400 && /Steam/.test(r.json.error || ""), JSON.stringify(r.json));
}
const open0 = db.prepare("SELECT COUNT(*) n FROM orders").get().n;
ok("rejected attempts create no orders", open0 === 0, String(open0));

const good = await order("123456789", 3);
ok("friend code is accepted", good.status === 201, JSON.stringify(good.json));
const it = db.prepare("SELECT quantity,gift_target,delivery_type FROM order_items WHERE order_id=?").get(good.json.order_id);
ok("gift is always quantity 1", it.quantity === 1, JSON.stringify(it));
ok("friend code stored on the order item", it.gift_target === "123456789", JSON.stringify(it));
ok("total is for one copy", Number(good.json.total) === 500, String(good.json.total));

for (const link of ["https://s.team/p/abcd-efgh/XYZ123", "https://steamcommunity.com/profiles/76561198000000000", "https://steamcommunity.com/id/some_name/"]) {
  const r = await order(link);
  ok(`accepts ${link}`, r.status === 201, JSON.stringify(r.json));
  db.exec("UPDATE orders SET fulfillment_status='cancelled' WHERE id<>"+good.json.order_id);
}

// --- admin sees it
const od = await call("GET", `/api/admin/orders/${good.json.order_id}`, { cookie: admin.cookie });
ok("admin order shows the friend code", od.json.items?.[0]?.gift_target === "123456789", JSON.stringify(od.json.items));

db.exec("UPDATE orders SET fulfillment_status='cancelled'");
// --- a normal product is untouched
const nid = Number(db.prepare("INSERT INTO products(name,slug,price,delivery_type,active,category_id) VALUES('Plain','plain',50,'manual',1,?)").run(cat.id).lastInsertRowid);
const plain = await call("POST", "/api/orders", { cookie: A.cookie, body: { items: [{ product_id: nid, quantity: 2 }], payment_method: "instapay", lang: "en" } });
ok("normal products need no gift details and keep quantity", plain.status === 201 && db.prepare("SELECT quantity FROM order_items WHERE order_id=?").get(plain.json.order_id).quantity === 2, JSON.stringify(plain.json));

// --- custom gift type
const cm = await call("POST", "/api/admin/products", { cookie: admin.cookie, body: { name: "Epic Gift", price: "100", gift_type: "custom", gift_label: "Epic account email", active: true } });
const cid = cm.json.id;
const short = await call("POST", "/api/orders", { cookie: A.cookie, body: { items: [{ product_id: cid, quantity: 1, gift_target: "x" }], payment_method: "instapay", lang: "en" } });
ok("custom gift needs details", short.status === 400, JSON.stringify(short.json));

// --- turning it off
const off = await call("PUT", `/api/admin/products/${gid}`, { cookie: admin.cookie, body: { name: "Cyberpunk 2077", price: "500", delivery_type: "manual", gift_type: "", active: true } });
ok("admin can switch the gift option off", db.prepare("SELECT gift_type FROM products WHERE id=?").get(gid).gift_type === "", JSON.stringify(off.json));

// --- storefront code is present and built
const app = fs.readFileSync(path.join(HERE, "../public/app.js"), "utf8");
ok("built storefront has the gift field", app.includes("data-gift") && app.includes("pGift"));
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
