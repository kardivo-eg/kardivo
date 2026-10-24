// V94 tests: Steam genres are saved on import, filled in for older games by the hourly Steam refresh, and editable by hand (they feed the genre mini-categories in Games). Steam is mocked.
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
const G = (name, usd, genres, extra = {}) => ({ name, type: "game", short_description: name + " description", header_image: "https://shared.akamai.steamstatic.com/h.jpg", screenshots: [], genres, price_overview: { final: Math.round(usd * 100), currency: "USD" }, ...extra });
const gn = (...a) => a.map((d, i) => ({ id: String(i + 1), description: d }));
const games = {
  1: G("Fallout 4", 20, gn("Action", "RPG")), 2: G("Stardew Valley", 15, gn("Indie", "RPG", "Simulation", "Casual", "Strategy", "Sports")),
  3: G("Mystery Game", 10, []), 4: G("Odd, Name", 10, gn("Action & Adventure, Co-op", "Action & Adventure, Co-op")),
};
globalThis.fetch = async (u) => {
  const m = String(u).match(/appdetails\?appids=(\d+)/); if (!m) return new Response("{}", { status: 404 });
  const d = games[m[1]]; return new Response(JSON.stringify({ [m[1]]: d ? { success: true, data: d } : { success: false } }));
};
await call("GET", "/api/health");
const admin = await call("POST", "/api/auth/login", { body: { email: "admin@test.com", password: "adminpass123" } });
const ck = admin.cookie;
db.exec("UPDATE settings SET value='50' WHERE key='usd_exchange_rate'");
const col = db.prepare("PRAGMA table_info(products)").all().some((c) => c.name === "genres");
ok("products has a genres column", col);
const imp = await call("POST", "/api/admin/steam/import", { cookie: ck, body: { items: "1 2 3 4" } });
ok("import works", imp.status === 200, JSON.stringify(imp.json).slice(0, 160));
const g = (app) => db.prepare("SELECT genres FROM products WHERE steam_app_id=?").get(app).genres;
ok("genres are saved on import", g(1) === "Action, RPG", g(1));
ok("at most 4 genres are kept", g(2) === "Indie, RPG, Simulation, Casual", g(2));
ok("a game with no Steam genres gets Other", g(3) === "Other", g(3));
ok("commas inside a genre name and duplicates are cleaned", g(4) === "Action & Adventure Co-op", g(4));
const pub = await call("GET", "/api/products");
ok("the public product list carries genres", pub.json.find((p) => p.steam_app_id === 1 || p.name === "Fallout 4")?.genres === "Action, RPG");

// older games (added before V94) have no genres: the refresh fills them in, and does it before re-checking prices of games that already have them
db.exec("UPDATE products SET genres='' WHERE steam_app_id IN (1,2)");
const ref = await call("POST", "/api/admin/steam/refresh", { cookie: ck, body: {} });
ok("refresh runs", ref.status === 200, JSON.stringify(ref.json).slice(0, 160));
ok("refresh fills in the missing genres", g(1) === "Action, RPG" && g(2) === "Indie, RPG, Simulation, Casual", g(1) + " | " + g(2));

// editing by hand
const id1 = db.prepare("SELECT id FROM products WHERE steam_app_id=1").get().id;
const full = (await call("GET", "/api/admin/products", { cookie: ck })).json.find((p) => p.id === id1);
const put = await call("PUT", "/api/admin/products/" + id1, { cookie: ck, body: { ...full, genres: " Horror , Co-op ,, Action " } });
ok("admin can set genres by hand (trimmed, empty parts dropped)", put.status === 200 && g(1) === "Horror, Co-op, Action", g(1) + " " + put.status);
const keep = await call("PUT", "/api/admin/products/" + id1, { cookie: ck, body: (({ genres, ...r }) => r)(full) });
ok("saving without a genres field leaves them alone", keep.status === 200 && g(1) === "Horror, Co-op, Action", g(1));
const mkp = await call("POST", "/api/admin/products", { cookie: ck, body: { name: "Hand Made Game", price: 50, delivery_type: "manual", genres: "Racing" } });
ok("a new product can be created with genres", (mkp.status === 200 || mkp.status === 201) && db.prepare("SELECT genres FROM products WHERE name='Hand Made Game'").get()?.genres === "Racing", String(mkp.status));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
