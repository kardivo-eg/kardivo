// V88 tests: Steam import (name, cover, screenshots, Steam price as cost, cost + markup as price) and automatic price refresh. Steam is mocked.
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
// Steam is replaced by a fake: app 1091500 costs 29.99 USD, 730 is free, 999 has no page, 555 costs 10 USD.
const steam = { 1091500: { name: "Cyberpunk 2077", short_description: "An open-world &amp; action RPG <b>set</b> in Night City", header_image: "https://shared.akamai.steamstatic.com/h.jpg?t=1", screenshots: [{ path_full: "https://shared.akamai.steamstatic.com/s1.jpg" }, { path_full: "https://shared.akamai.steamstatic.com/s2.jpg" }], price_overview: { currency: "USD", final: 2999 } }, 730: { name: "Free Game", is_free: true }, 555: { name: "Cheap Game", short_description: "x", header_image: "https://shared.akamai.steamstatic.com/c.jpg", screenshots: [], price_overview: { currency: "USD", final: 1000 } } };
const hits = [];
globalThis.fetch = async (u) => { const m = String(u).match(/store\.steampowered\.com\/api\/appdetails\?appids=(\d+)&cc=(\w+)/); if (!m) return new Response("{}", { status: 404 }); hits.push(m[2]); const d = steam[m[1]]; return new Response(JSON.stringify({ [m[1]]: d ? { success: true, data: d } : { success: false } })); };
await call("GET", "/api/health");
const admin = await call("POST", "/api/auth/login", { body: { email: "admin@test.com", password: "adminpass123" } });
db.exec("UPDATE settings SET value='50' WHERE key='usd_exchange_rate'");

const imp = await call("POST", "/api/admin/steam/import", { cookie: admin.cookie, body: { items: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/\n730 999, 555 abc 1091500" } });
ok("import works", imp.status === 200, JSON.stringify(imp.json));
const by = Object.fromEntries(imp.json.results.map((r) => [r.app, r]));
ok("duplicate ids in one paste are handled once", imp.json.results.length === 4, String(imp.json.results.length));
ok("Cyberpunk added", by[1091500].status === "added");
const cp = db.prepare("SELECT * FROM products WHERE steam_app_id=1091500").get();
ok("cost is the Steam price in EGP (29.99 x 50)", cp.cost_price === 1499.5, String(cp.cost_price));
ok("selling price is cost +10%, grossed up for 5% cashback, rounded up (1499.5 x 1.1 / 0.95)", cp.price === 1737 && cp.price * 0.95 - cp.cost_price >= cp.cost_price * 0.1 - 1e-6, String(cp.price));
ok("is a manual Steam gift product", cp.gift_type === "steam" && cp.delivery_type === "manual" && cp.active === 1);
ok("name, cover and clean description come from Steam", cp.name === "Cyberpunk 2077" && cp.image_url.includes("h.jpg") && cp.description === "An open-world & action RPG set in Night City", cp.description);
ok("screenshots saved to the gallery", JSON.parse(cp.gallery).length === 2);
ok("uses the Egypt store region", hits.every((c) => c === "eg"), hits.join());
ok("free game skipped", by[730].status === "skipped");
ok("missing page reported", by[999].status === "error");
ok("second game added", by[555].status === "added" && db.prepare("SELECT price FROM products WHERE steam_app_id=555").get().price === 579);
const again = await call("POST", "/api/admin/steam/import", { cookie: admin.cookie, body: { items: "1091500" } });
ok("importing twice does not duplicate", again.json.results[0].status === "exists" && db.prepare("SELECT COUNT(*) n FROM products WHERE steam_app_id=1091500").get().n === 1);
ok("non-admin cannot import", (await call("POST", "/api/admin/steam/import", { body: { items: "555" } })).status === 403);
ok("bad input is rejected", (await call("POST", "/api/admin/steam/import", { cookie: admin.cookie, body: { items: "hello world" } })).status === 400);

// --- markup setting and automatic refresh
const st = await call("POST", "/api/admin/steam/settings", { cookie: admin.cookie, body: { pct: 20, cashback: 5, min: 0 } });
ok("pricing can be changed", st.json.pct === 20 && st.json.cashback === 5 && st.json.count === 2, JSON.stringify(st.json));
steam[1091500].price_overview.final = 3999; // Steam raises the price
const rf = await call("POST", "/api/admin/steam/refresh", { cookie: admin.cookie });
ok("refresh checks both games and changes both prices", rf.json.checked === 2 && rf.json.changed === 2, JSON.stringify(rf.json));
const cp2 = db.prepare("SELECT cost_price,price FROM products WHERE steam_app_id=1091500").get();
ok("new Steam price becomes the cost (39.99 x 50) and price = cost +20% / 0.95", cp2.cost_price === 1999.5 && cp2.price === 2526, JSON.stringify(cp2));
// owner switches one game off
db.exec("UPDATE products SET steam_auto=0 WHERE steam_app_id=555");
steam[555].price_overview.final = 5000;
await call("POST", "/api/admin/steam/refresh", { cookie: admin.cookie });
ok("a game with auto prices off keeps its price", db.prepare("SELECT price FROM products WHERE steam_app_id=555").get().price === 632 || db.prepare("SELECT price FROM products WHERE steam_app_id=555").get().price === 579);
await call("POST", "/api/admin/steam/settings", { cookie: admin.cookie, body: { auto: false } });
steam[1091500].price_overview.final = 100;
const off = await call("POST", "/api/admin/steam/refresh", { cookie: admin.cookie });
ok("global switch off stops all updates", off.json.off === true && db.prepare("SELECT price FROM products WHERE steam_app_id=1091500").get().price === 2526);
// the hourly job
await call("POST", "/api/admin/steam/settings", { cookie: admin.cookie, body: { auto: true } });
await mod.default.scheduled({ scheduledTime: Date.now() }, env, { waitUntil: (p) => p.catch?.(() => {}) });
await new Promise((r) => setTimeout(r, 300));
ok("hourly job re-prices from Steam", db.prepare("SELECT price FROM products WHERE steam_app_id=1091500").get().price !== 2526);
ok("steam settings are never sent to shoppers", !JSON.stringify((await call("GET", "/api/settings")).json).includes("steam_private"));
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
