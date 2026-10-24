// V92 tests: the admin Products list comes back one page at a time with search and status filters (no more downloading every product), and the old full list still works.
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
const admin = await call("POST", "/api/auth/login", { body: { email: "admin@test.com", password: "adminpass123" } });
const ck = admin.cookie;
const ins = db.prepare("INSERT INTO products(name,slug,price,platform,region,delivery_type,active,featured,category_id) VALUES(?,?,?,?,?,?,?,?,?)");
for (let i = 1; i <= 250; i++) ins.run(i % 50 === 0 ? `Fallout ${i}` : `Game ${i}`, `game-${i}`, 100 + i, i % 2 ? "PC" : "PlayStation", "Global", i % 3 === 0 ? "code" : "manual", i % 10 === 0 ? 0 : 1, i % 25 === 0 ? 1 : 0, 1);
const vins = db.prepare("INSERT INTO product_variants(product_id,name,price,active,sort_order) VALUES(?,?,?,1,0)");
const firstIds = db.prepare("SELECT id FROM products ORDER BY id LIMIT 5").all().map((r) => r.id);
for (const id of firstIds) vins.run(id, "Edition", 99);
db.prepare("INSERT INTO inventory(product_id,code,status) VALUES(?,?,'available')").run(3, "CODE-3");
const get = (qs) => call("GET", "/api/admin/products" + qs, { cookie: ck });

const p1 = await get("?limit=50&page=1");
ok("first page returns 50 products with totals", p1.status === 200 && p1.json.items.length === 50 && p1.json.total === 250 && p1.json.pages === 5 && p1.json.page === 1, JSON.stringify(p1.json).slice(0, 120));
const p5 = await get("?limit=50&page=5");
ok("last page returns the rest", p5.json.items.length === 50 && p5.json.page === 5);
const ids = new Set([...(await get("?limit=50&page=1")).json.items, ...(await get("?limit=50&page=2")).json.items].map((x) => x.id));
ok("pages do not overlap", ids.size === 100);
ok("a page past the end falls back to the last page", (await get("?limit=50&page=99")).json.page === 5);
ok("limit is capped at 100", (await get("?limit=5000")).json.items.length === 100);
ok("a junk limit and page still work", (await get("?limit=abc&page=-4")).json.items.length === 50);
ok("rows keep the fields the edit form needs", "description" in p1.json.items[0] && "cost_price" in p1.json.items[0] && "category_name" in p1.json.items[0] && "stock" in p1.json.items[0] && Array.isArray(p1.json.items[0].gallery));
const lastPage = (await get("?limit=100&page=3")).json.items;
const withVar = lastPage.filter((x) => x.variants.length);
ok("variants come with their products on a later page (page 3 of 100, 250 products)", withVar.length === 5 && withVar.every((x) => x.variants[0].name === "Edition" && x.variants[0].product_id === x.id), String(withVar.length));
ok("products without variants get an empty list", (await get("?limit=100&page=1")).json.items.every((x) => Array.isArray(x.variants) && x.variants.length === 0));
const s = await get("?limit=50&q=Fallout");
ok("search finds products by name", s.json.total === 5 && s.json.items.every((x) => x.name.startsWith("Fallout")), String(s.json.total));
ok("search matches the slug", (await get("?limit=50&q=game-17")).json.items.some((x) => x.slug === "game-17"));
ok("search matches platform", (await get("?limit=50&q=playstation")).json.total === 125);
ok("search with no match is an empty page", (await get("?limit=50&q=zzzzqq")).json.total === 0 && (await get("?limit=50&q=zzzzqq")).json.items.length === 0);
ok("a % in the search is not a wildcard", (await get("?limit=50&q=%25")).json.total === 0);
ok("a quote in the search does not break the query", (await get("?limit=50&q=" + encodeURIComponent("o'brien\"; DROP TABLE products;--"))).status === 200 && db.prepare("SELECT COUNT(*) n FROM products").get().n === 250);
ok("status=hidden", (await get("?limit=100&status=hidden")).json.total === 25 && (await get("?limit=100&status=hidden")).json.items.every((x) => x.active === 0));
ok("status=active", (await get("?limit=100&status=active")).json.total === 225);
ok("status=featured", (await get("?limit=100&status=featured")).json.total === 10);
ok("status=code", (await get("?limit=100&status=code")).json.total === 83);
ok("status=manual", (await get("?limit=100&status=manual")).json.total === 167);
const out = await get("?limit=100&status=out");
ok("status=out lists code products with no codes left", out.json.total === 82 && !out.json.items.some((x) => x.id === 3));
ok("search and status combine", (await get("?limit=50&q=Fallout&status=hidden")).json.total === 5);
const full = await get("");
ok("without limit the whole list still comes back as an array (CSV export, merge tool)", Array.isArray(full.json) && full.json.length === 250);
ok("the paged list needs an admin login", (await call("GET", "/api/admin/products?limit=50")).status === 401 || (await call("GET", "/api/admin/products?limit=50")).status === 403);
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
