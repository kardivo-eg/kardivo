// V89 tests: "Fill with top Steam games" never adds a game the store already has (including hand-made ones), but still adds the other games of the same series. Steam is mocked.
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
// ---- fake Steam: a ranked list (search) and per-game store data (appdetails)
const G = (name, usd, extra = {}) => ({ name, type: "game", short_description: name + " description", header_image: "https://shared.akamai.steamstatic.com/h.jpg", screenshots: [], price_overview: { final: Math.round(usd * 100), currency: "USD" }, ...extra });
const games = {
  377160: G("Fallout 4", 20), 1151340: G("Fallout 76", 40), 22380: G("Fallout: New Vegas", 10), 38400: G("Fallout 3: Game of the Year Edition", 10),
  1091500: G("Cyberpunk 2077", 30), 271590: G("Grand Theft Auto V", 30), 489830: G("The Elder Scrolls V: Skyrim Special Edition", 40),
  730: G("Counter-Strike 2", 0, { is_free: true, price_overview: undefined }), 99001: G("Some Soundtrack", 5, { type: "music" }), 555: G("Hades", 25), 556: G("Hades II", 30),
  1245620: G("ELDEN RING™", 60), 292030: G("The Witcher® 3: Wild Hunt", 40),
};
const ranked = [377160, 1151340, 22380, 38400, 1091500, 271590, 489830, 730, 99001, 555, 556, 1245620, 292030];
const row = (id) => `<a href="https://store.steampowered.com/app/${id}/x/" data-ds-appid="${id}" class="search_result_row ds_collapse_flag"><div class="responsive_search_name_combined"><div class="col search_name ellipsis"><span class="title">${games[id].name.replace(/&/g, "&amp;")}</span></div></div></a>`;
const bundle = `<a href="https://store.steampowered.com/bundle/1/x/" data-ds-bundleid="1" data-ds-appid="1,2,3" class="search_result_row"><span class="title">A Bundle</span></a>`;
let limitAfter = Infinity, details = 0, topCalls = 0;
globalThis.fetch = async (u) => {
  u = String(u);
  if (u.includes("/search/results/")) { topCalls++; const q = new URL(u).searchParams, st = +q.get("start"), ct = +q.get("count"); return new Response(JSON.stringify({ success: 1, total_count: ranked.length + 1, start: st, results_html: (st === 0 ? bundle : "") + ranked.slice(st, st + ct).map(row).join("") })); }
  const m = u.match(/appdetails\?appids=(\d+)/); if (!m) return new Response("{}", { status: 404 });
  if (++details > limitAfter) return new Response("slow down", { status: 429 });
  const d = games[m[1]]; return new Response(JSON.stringify({ [m[1]]: d ? { success: true, data: d } : { success: false } }));
};
await call("GET", "/api/health");
const admin = await call("POST", "/api/auth/login", { body: { email: "admin@test.com", password: "adminpass123" } });
db.exec("UPDATE settings SET value='50' WHERE key='usd_exchange_rate'");
const mk = (name, slug, appId = null, active = 1) => db.prepare("INSERT INTO products(name,slug,price,delivery_type,active,steam_app_id) VALUES(?,?,100,'manual',?,?)").run(name, slug, active, appId);
mk("Fallout 4 - Steam Gift (PC)", "fo4-hand");              // hand-made, no Steam link, extra words
mk("Grand Theft Auto 5", "gta5-hand");                       // hand-made, arabic numeral vs roman numeral
mk("Skyrim Special Edition", "skyrim-hand", null, 0);          // hand-made, hidden, shorter than the Steam title
mk("Hades", "hades-linked", 555);                            // already linked by Steam number
mk("Fallout", "fallout-1-hand");                             // a different game that merely starts the same

// the list endpoint
const top = await call("POST", "/api/admin/steam/top", { cookie: admin.cookie, body: { start: 0, count: 50 } });
ok("top list returns games in rank order and skips bundles", top.status === 200 && top.json.items.map((x) => x.app).join() === ranked.join(), JSON.stringify(top.json).slice(0, 200));
ok("top list carries the Steam title", top.json.items[0].name === "Fallout 4");
ok("non-admin cannot read the top list or fill", (await call("POST", "/api/admin/steam/top", { body: {} })).status === 403 && (await call("POST", "/api/admin/steam/fill", { body: { items: [{ app: 1 }] } })).status === 403);
ok("fill rejects an empty list", (await call("POST", "/api/admin/steam/fill", { cookie: admin.cookie, body: { items: [] } })).status === 400);

details = 0;
const fill = await call("POST", "/api/admin/steam/fill", { cookie: admin.cookie, body: { items: top.json.items.slice(0, 10) } });
const by = Object.fromEntries(fill.json.results.map((r) => [r.app, r]));
const count = (like) => db.prepare("SELECT COUNT(*) n FROM products WHERE name LIKE ?").get(like).n;
ok("Fallout 4 owned by hand (with extra words) is not added again", by[377160].status === "exists" && count("Fallout 4%") === 1, JSON.stringify(by[377160]));
ok("...it was skipped WITHOUT asking Steam about it", details === 6, String(details));
ok("other Fallout games are still added", by[1151340].status === "added" && by[22380].status === "added", JSON.stringify([by[1151340], by[22380]]));
ok("hand-made plain 'Fallout' does not block Fallout 76 / New Vegas", count("Fallout 76") === 1 && count("Fallout: New Vegas") === 1);
ok("Fallout 3 GOTY is added (only Fallout 4 was owned)", by[38400].status === "added");
ok("hand-made 'Grand Theft Auto 5' blocks 'Grand Theft Auto V'", by[271590].status === "exists" && count("Grand Theft Auto%") === 1, JSON.stringify(by[271590]));
ok("hidden hand-made Skyrim blocks the Steam Skyrim title", by[489830].status === "exists" && count("%Skyrim%") === 1, JSON.stringify(by[489830]));
ok("a new game is added with Steam cost and price", by[1091500].status === "added" && db.prepare("SELECT cost_price,price,gift_type FROM products WHERE steam_app_id=1091500").get().price === 1737);
ok("Steam-linked game already in the store is skipped", (await call("POST", "/api/admin/steam/fill", { cookie: admin.cookie, body: { items: [{ app: 555, name: "Hades" }] } })).json.results[0].status === "exists" && db.prepare("SELECT COUNT(*) n FROM products WHERE steam_app_id=555").get().n === 1);

const fill2 = await call("POST", "/api/admin/steam/fill", { cookie: admin.cookie, body: { items: top.json.items.slice(7) } });
const by2 = Object.fromEntries(fill2.json.results.map((r) => [r.app, r]));
ok("free game skipped", by2[730].status === "skipped" && !db.prepare("SELECT 1 FROM products WHERE steam_app_id=730").get());
ok("non-game (music) skipped", by2[99001].status === "skipped" && !db.prepare("SELECT 1 FROM products WHERE steam_app_id=99001").get());
ok("Hades II is added even though Hades is owned", by2[556].status === "added");
ok("symbols like ™ ® and 'The' do not matter when adding", by2[1245620].status === "added" && by2[292030].status === "added");

// running the whole thing again adds nothing
const before = db.prepare("SELECT COUNT(*) n FROM products").get().n;
const again = await call("POST", "/api/admin/steam/fill", { cookie: admin.cookie, body: { items: top.json.items.slice(0, 10) } });
const again2 = await call("POST", "/api/admin/steam/fill", { cookie: admin.cookie, body: { items: top.json.items.slice(10) } });
ok("second run adds nothing", db.prepare("SELECT COUNT(*) n FROM products").get().n === before && [...again.json.results, ...again2.json.results].every((r) => r.status !== "added"), JSON.stringify([...again.json.results, ...again2.json.results].map((r) => r.status)));

// the same game twice in one request is added once
db.exec("DELETE FROM products WHERE steam_app_id=292030");
const twice = await call("POST", "/api/admin/steam/fill", { cookie: admin.cookie, body: { items: [{ app: 292030, name: "The Witcher 3: Wild Hunt" }, { app: 292030, name: "The Witcher 3: Wild Hunt" }] } });
ok("duplicate ids in one request are added once", db.prepare("SELECT COUNT(*) n FROM products WHERE steam_app_id=292030").get().n === 1 && twice.json.results.length === 1);

// Steam rate limit: nothing is lost, the games come back as "retry"
db.exec("DELETE FROM products WHERE steam_app_id IN (1245620,292030)");
details = 0; limitAfter = 1;
const lim = await call("POST", "/api/admin/steam/fill", { cookie: admin.cookie, body: { items: [{ app: 1245620, name: "ELDEN RING" }, { app: 292030, name: "The Witcher 3" }] } });
limitAfter = Infinity;
ok("rate limit: first is added, the rest come back as retry", lim.json.results[0].status === "added" && lim.json.results[1].status === "retry", JSON.stringify(lim.json.results));
const retry = await call("POST", "/api/admin/steam/fill", { cookie: admin.cookie, body: { items: [{ app: 292030, name: "The Witcher 3" }] } });
ok("retry then succeeds", retry.json.results[0].status === "added");

// the old paste-links import is unchanged: it still adds a game on purpose
const paste = await call("POST", "/api/admin/steam/import", { cookie: admin.cookie, body: { items: "271590" } });
ok("paste import still works as before", paste.json.results[0].status === "added");
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
