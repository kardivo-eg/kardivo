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

// ---- V97 tests: the AI admin assistant. Gemini, Steam and the web are mocked. ----
const sql = (q, ...b) => db.prepare(q).run(...b);
const row = (q, ...b) => db.prepare(q).get(...b);
const calls = []; // every Gemini request body, newest last
let script = []; // queue of Gemini answers (functionCall or text), consumed one per generateContent call
const fc = (name, args) => ({ candidates: [{ content: { role: "model", parts: [{ functionCall: { name, args }, thoughtSignature: "sig-" + name }] } }] });
const say = (text) => ({ candidates: [{ content: { role: "model", parts: [{ text }] } }] });
const PNG = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0]);
globalThis.fetch = async (u, init = {}) => {
  u = String(u);
  if (u.includes("generativelanguage.googleapis.com")) {
    const body = JSON.parse(init.body);
    if (body.tools?.[0]?.google_search) return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '{"pages":["https://publisher.example/game"]}' }] }, groundingMetadata: { groundingChunks: [] } }] }));
    calls.push(body);
    const next = script.shift();
    return new Response(JSON.stringify(next || say("(no more scripted answers)")));
  }
  if (u.includes("store.steampowered.com/api/storesearch")) return new Response(JSON.stringify({ items: [{ id: 1245620, name: "ELDEN RING" }] }));
  if (u.includes("appdetails?appids=1245620")) return new Response(JSON.stringify({ 1245620: { success: true, data: { name: "ELDEN RING", header_image: "https://shared.akamai.steamstatic.com/er-header.jpg", capsule_image: "https://shared.akamai.steamstatic.com/er-capsule.jpg", screenshots: [{ path_full: "https://shared.akamai.steamstatic.com/er-s1.jpg" }] } } }));
  if (u === "https://publisher.example/game") return new Response('<html><head><meta property="og:image" content="/art/cover.png"></head></html>', { headers: { "content-type": "text/html" } });
  if (u === "https://publisher.example/art/cover.png" || u === "https://shared.akamai.steamstatic.com/er-header.jpg") return new Response(PNG, { headers: { "content-type": "image/png", "content-length": String(PNG.length) } });
  if (u.startsWith("https://notimage.example")) return new Response("<html></html>", { headers: { "content-type": "text/html" } });
  return new Response("{}", { status: 404 });
};
await call("GET", "/api/health");
const adm = await call("POST", "/api/auth/login", { body: { email: "admin@test.com", password: "adminpass123" } });
const ck = adm.cookie;
const chat = (message, history = []) => call("POST", "/api/admin/agent/chat", { cookie: ck, body: { message, history } });

// seed
sql("INSERT INTO settings(key,value) VALUES('gemini_api_key','AIzaFAKEKEYFAKEKEYFAKEKEYFAKEKEY1234') ON CONFLICT(key) DO UPDATE SET value=excluded.value");
const cat = row("SELECT id FROM categories WHERE slug='games'").id;
const mk = (name, slug, price, extra = "") => sql(`INSERT INTO products(name,slug,price,category_id,delivery_type,active,cost_price${extra ? "," + extra.split("=")[0] : ""}) VALUES(?,?,?,?, 'manual',1,?${extra ? "," + extra.split("=")[1] : ""})`, name, slug, price, cat, Math.round(price * 0.6));
mk("Elden Ring", "elden-ring", 1000); mk("Elden Ring Nightreign", "elden-ring-nightreign", 800); mk("Hades", "hades", 300);
mk("Steam Auto Game", "steam-auto-game", 500, "steam_app_id=777");
sql("UPDATE products SET steam_auto=1, gift_type='steam' WHERE slug='steam-auto-game'");
mk("Multi Option", "multi-option", 100); const multi = row("SELECT id FROM products WHERE slug='multi-option'").id;
sql("INSERT INTO product_variants(product_id,name,price) VALUES(?,?,?)", multi, "1 month", 100);
const er = row("SELECT id FROM products WHERE slug='elden-ring'").id, hades = row("SELECT id FROM products WHERE slug='hades'").id;
const priceOf = (id) => row("SELECT price FROM products WHERE id=?", id).price;

// access control
const anon = await call("POST", "/api/admin/agent/chat", { body: { message: "hi" } });
ok("a visitor cannot use the assistant", anon.status === 403, anon.status);
const noKey = await (async () => { sql("UPDATE settings SET value='' WHERE key='gemini_api_key'"); const r = await chat("hi"); sql("UPDATE settings SET value='AIzaFAKEKEYFAKEKEYFAKEKEYFAKEKEY1234' WHERE key='gemini_api_key'"); return r; })();
ok("without a Gemini key it explains what to do", noKey.status === 400 && /Gemini API key/.test(noKey.json.error), JSON.stringify(noKey.json));

// 1. change a price: search -> set_price -> waits for Apply
script = [fc("search_products", { query: "elden ring" }), fc("set_price", { product_id: er, price: 850 }), say("Waiting for your OK to change Elden Ring to 850 EGP.")];
let r = await chat("change elden ring price to 850");
ok("chat works", r.status === 200 && /Elden Ring/.test(r.json.reply), JSON.stringify(r.json).slice(0, 200));
ok("it sends tool declarations (and none for no-argument tools)", calls[0].tools?.[0]?.functionDeclarations?.some((d) => d.name === "set_price") && calls[0].tools[0].functionDeclarations.find((d) => d.name === "list_campaigns").parameters === undefined);
ok("tool answers are sent back with the model's own turn kept (thought signatures)", JSON.stringify(calls[1].contents).includes("sig-search_products"));
ok("the price did NOT change before Apply", priceOf(er) === 1000);
ok("a pending card is returned", r.json.actions.length === 1 && r.json.actions[0].status === "pending" && /1000 EGP → 850 EGP/.test(r.json.actions[0].lines[0]), JSON.stringify(r.json.actions));
const id1 = r.json.actions[0].id;
let ap = await call("POST", `/api/admin/agent/actions/${id1}/apply`, { cookie: ck });
ok("Apply changes the price", ap.status === 200 && priceOf(er) === 850 && ap.json.card.status === "applied", JSON.stringify(ap.json));
ok("it is written to the audit log", !!row("SELECT id FROM audit_logs WHERE action='agent_set_price'"));
const ap2 = await call("POST", `/api/admin/agent/actions/${id1}/apply`, { cookie: ck });
ok("a second Apply is refused (no double run)", ap2.status === 409 && priceOf(er) === 850, ap2.status);
const un = await call("POST", `/api/admin/agent/actions/${id1}/undo`, { cookie: ck });
ok("Undo restores the old price", un.status === 200 && priceOf(er) === 1000 && un.json.card.status === "undone", JSON.stringify(un.json));
const un2 = await call("POST", `/api/admin/agent/actions/${id1}/undo`, { cookie: ck });
ok("Undo cannot run twice", un2.status === 409);

// 2. cancel
script = [fc("set_price", { product_id: hades, price: 250 }), say("ok")];
r = await chat("hades 250");
const cn = await call("POST", `/api/admin/agent/actions/${r.json.actions[0].id}/cancel`, { cookie: ck });
ok("Cancel leaves the price alone", cn.json.card.status === "cancelled" && priceOf(hades) === 300);
const afterCancel = await call("POST", `/api/admin/agent/actions/${r.json.actions[0].id}/apply`, { cookie: ck });
ok("a cancelled action cannot be applied", afterCancel.status === 409 && priceOf(hades) === 300);

// 3. safety: variants, steam auto games, below cost, big changes
script = [fc("set_price", { product_id: multi, price: 90 }), say("which option?")];
r = await chat("multi option 90");
ok("a product with variants is not changed blindly", r.json.actions.length === 0, JSON.stringify(r.json.actions));
ok("the model is told which variants exist", /1 month/.test(JSON.stringify(calls[calls.length - 1].contents)));
const sg = row("SELECT id FROM products WHERE slug='steam-auto-game'").id;
script = [fc("set_price", { product_id: sg, price: 450 }), say("ok")];
r = await chat("steam auto game 450");
ok("a Steam auto-priced game warns that auto pricing will be turned off", r.json.actions[0].warnings.some((w) => /priced automatically from Steam/.test(w)));
await call("POST", `/api/admin/agent/actions/${r.json.actions[0].id}/apply`, { cookie: ck });
ok("applying it switches auto pricing off so the price stays", priceOf(sg) === 450 && row("SELECT steam_auto s FROM products WHERE id=?", sg).s === 0);
await call("POST", `/api/admin/agent/actions/${r.json.actions[0].id}/undo`, { cookie: ck });
ok("undo puts auto pricing and the price back", priceOf(sg) === 500 && row("SELECT steam_auto s FROM products WHERE id=?", sg).s === 1);
script = [fc("set_price", { product_id: hades, price: 100 }), say("ok")];
r = await chat("hades 100");
ok("below cost is flagged", r.json.actions[0].warnings.some((w) => /Below your cost/.test(w)) && r.json.actions[0].risky);
script = [fc("set_price", { product_id: hades, price: -5 }), say("bad")];
r = await chat("hades -5");
ok("a negative price is refused", r.json.actions.length === 0);

// 4. sale display
script = [fc("set_price", { product_id: er, price: 700, mark_as_sale: true }), say("ok")];
r = await chat("put elden ring on sale at 700");
await call("POST", `/api/admin/agent/actions/${r.json.actions[0].id}/apply`, { cookie: ck });
ok("mark_as_sale shows the old price crossed out", row("SELECT price,old_price FROM products WHERE id=?", er).old_price === 1000 && priceOf(er) === 700);
const saleId = r.json.actions[0].id;
await call("POST", `/api/admin/agent/actions/${saleId}/undo`, { cookie: ck });
ok("undo clears it again", row("SELECT price,old_price FROM products WHERE id=?", er).old_price === null && priceOf(er) === 1000);

// 5. automatic mode applies only small, safe changes
const setAuto = await call("PUT", "/api/admin/agent", { cookie: ck, body: { auto: true } });
ok("automatic mode can be switched on", setAuto.status === 200 && (await call("GET", "/api/admin/agent", { cookie: ck })).json.auto === true);
script = [fc("set_price", { product_id: hades, price: 330 }), say("done")];
r = await chat("hades 330");
ok("a small safe change is applied at once", priceOf(hades) === 330 && r.json.actions[0].status === "applied", JSON.stringify(r.json.actions));
script = [fc("set_price", { product_id: hades, price: 600 }), say("waiting")];
r = await chat("hades 600");
ok("a big jump still waits for Apply in automatic mode", priceOf(hades) === 330 && r.json.actions[0].status === "pending");
script = [fc("create_discount", { code: "AUTO10", type: "percentage", amount: 10 }), say("waiting")];
r = await chat("make a 10% code AUTO10");
ok("discounts always wait, even in automatic mode", r.json.actions[0].status === "pending" && !row("SELECT id FROM discounts WHERE code='AUTO10'"));
await call("PUT", "/api/admin/agent", { cookie: ck, body: { auto: false } });
sql("UPDATE products SET price=300 WHERE id=?", hades);

// 6. campaign: discount code first, then the banner (both wait; Apply all runs them in order)
script = [
  fc("search_products", { query: "hades" }),
  fc("create_discount", { code: "hades20", type: "percentage", amount: 20, expires_at: "2026-11-01T20:00:00Z" }),
  fc("create_campaign", { title: "Hades week", title_ar: "أسبوع هيدز", body: "Escape the underworld for less.", body_ar: "اهرب من العالم السفلي بسعر أقل.", cta_text: "Shop now", product_ids: [hades], discount_code: "hades20", ends_at: "2026-11-01T20:00:00Z", show_on_home: true }),
  say("I prepared a 20% code and a banner. Press Apply all."),
];
r = await chat("do a campaign for hades with 20% off");
ok("a discount card and a campaign card are waiting", r.json.actions.length === 2 && r.json.actions.every((a) => a.status === "pending"), JSON.stringify(r.json.actions).slice(0, 300));
ok("nothing is created before Apply", !row("SELECT id FROM discounts WHERE code='HADES20'") && !row("SELECT id FROM promo_campaigns WHERE title='Hades week'"));
const all = await call("POST", "/api/admin/agent/apply-all", { cookie: ck, body: { ids: r.json.actions.map((a) => a.id) } });
ok("Apply all runs both", all.status === 200 && all.json.cards.length === 2 && !all.json.error, JSON.stringify(all.json).slice(0, 300));
const camp = row("SELECT * FROM promo_campaigns WHERE title='Hades week'");
ok("the code is created in upper case", !!row("SELECT id FROM discounts WHERE code='HADES20' AND amount=20 AND type='percentage'"));
ok("the campaign has Arabic copy, the code, the product link and the product", camp && camp.title_ar === "أسبوع هيدز" && camp.discount_code === "HADES20" && camp.link === "/hades" && JSON.parse(camp.product_ids)[0] === hades && camp.show_on_home === 1, JSON.stringify(camp));
const live = await call("GET", "/api/campaigns");
ok("the public site can use it (campaign is stored valid)", live.status !== 500);
const undoCamp = await call("POST", `/api/admin/agent/actions/${all.json.cards[1].id}/undo`, { cookie: ck });
ok("undo removes the campaign", undoCamp.status === 200 && !row("SELECT id FROM promo_campaigns WHERE title='Hades week'"));
script = [fc("create_discount", { code: "HADES20", type: "percentage", amount: 5 }), say("exists")];
r = await chat("another hades20");
ok("a code that already exists is refused", r.json.actions.length === 0);
script = [fc("create_campaign", { title: "Bad", body: "x", product_ids: [99999] }), say("no")];
r = await chat("campaign for a missing product");
ok("a campaign for a product that does not exist is refused", r.json.actions.length === 0);

// 7. bulk price change
script = [fc("adjust_prices", { category: "Games", percent: -10, mark_as_sale: true }), say("waiting")];
r = await chat("10% off all games");
const bulk = r.json.actions[0];
ok("bulk change lists products and skips variants and Steam auto games", bulk.status === "pending" && bulk.warnings.some((w) => /Steam auto price/.test(w)) && bulk.warnings.some((w) => /has variants/.test(w)), JSON.stringify(bulk));
const beforeBulk = priceOf(er);
await call("POST", `/api/admin/agent/actions/${bulk.id}/apply`, { cookie: ck });
ok("bulk apply lowers prices by 10% and keeps the old price", priceOf(er) === 900 && row("SELECT old_price FROM products WHERE id=?", er).old_price === beforeBulk && priceOf(sg) === 500);
await call("POST", `/api/admin/agent/actions/${bulk.id}/undo`, { cookie: ck });
ok("bulk undo puts every price back", priceOf(er) === 1000 && priceOf(hades) === 300 && row("SELECT old_price FROM products WHERE id=?", er).old_price === null);

// 8. pictures
script = [fc("find_images", { product_id: er }), say("Pick one of these.")];
r = await chat("find images for elden ring");
const set = r.json.images?.[0];
ok("find_images returns a picker with Steam art for a Steam game", set && set.product_id === er && set.images.some((i) => /er-header/.test(i.url)), JSON.stringify(r.json.images));
const nr = row("SELECT id FROM products WHERE slug='elden-ring-nightreign'").id;
script = [fc("find_images", { product_id: nr }), say("Pick one.")];
const r2 = await chat("find images for nightreign");
ok("a different game never borrows another game's Steam art", !JSON.stringify(r2.json.images).includes("er-header") && !JSON.stringify(r2.json.images).includes("er-capsule"), JSON.stringify(r2.json.images));
ok("without Steam art it falls back to the official page picture", r2.json.images?.[0]?.images?.some((i) => i.url === "https://publisher.example/art/cover.png" && i.source === "Official page"), JSON.stringify(r2.json.images));
ok("pictures that are not images are dropped", !set.images.some((i) => /notimage/.test(i.url)));
const pick = await call("POST", "/api/admin/agent/act", { cookie: ck, body: { tool: "set_image", args: { product_id: er, image_url: "https://publisher.example/art/cover.png" } } });
const img = row("SELECT image_url,image_original FROM products WHERE id=?", er);
ok("choosing a picture stores it in R2 and sets it as the product image", pick.status === 200 && /^\/media\/product\/products%2F\d+%2F/.test(img.image_url) && store.size === 1, JSON.stringify(pick.json) + JSON.stringify(img));
const bad = await call("POST", "/api/admin/agent/act", { cookie: ck, body: { tool: "set_image", args: { product_id: er, image_url: "https://notimage.example/x.png" } } });
ok("a link that is not a picture is refused and the image stays", bad.status === 400 && row("SELECT image_url FROM products WHERE id=?", er).image_url === img.image_url, JSON.stringify(bad.json));
const insecure = await call("POST", "/api/admin/agent/act", { cookie: ck, body: { tool: "set_image", args: { product_id: er, image_url: "http://x.example/a.png" } } });
ok("http picture links are refused", insecure.status === 400);
await call("POST", `/api/admin/agent/actions/${pick.json.card.id}/undo`, { cookie: ck });
ok("undo restores the old picture", row("SELECT image_url FROM products WHERE id=?", er).image_url === "");
const notTool = await call("POST", "/api/admin/agent/act", { cookie: ck, body: { tool: "search_products", args: {} } });
ok("the button endpoint only accepts changing actions", notTool.status === 400);

// 9. text, visibility
script = [fc("update_text", { product_id: hades, description: "A roguelike about escaping the underworld.", meta_title: "Hades PC game key" }), fc("set_visibility", { product_id: hades, active: false }), say("waiting")];
r = await chat("improve hades description and hide it");
for (const a of r.json.actions) await call("POST", `/api/admin/agent/actions/${a.id}/apply`, { cookie: ck });
const hrow = row("SELECT description,meta_title,active FROM products WHERE id=?", hades);
ok("text and visibility change on Apply", /roguelike/.test(hrow.description) && hrow.meta_title === "Hades PC game key" && hrow.active === 0);
for (const a of r.json.actions) await call("POST", `/api/admin/agent/actions/${a.id}/undo`, { cookie: ck });
const hrow2 = row("SELECT description,meta_title,active FROM products WHERE id=?", hades);
ok("and undo brings them back", hrow2.description === "" && hrow2.active === 1);

// 10. read tools and history
script = [fc("sales_report", { days: 7 }), fc("list_campaigns", {}), say("Nothing sold yet.")];
r = await chat("how did we do this week?", [{ role: "user", text: "hi" }, { role: "assistant", text: "Hello" }]);
ok("read tools work and chat history is sent as plain text turns", r.status === 200 && calls[calls.length - 3].contents.length === 3 && calls[calls.length - 3].contents[1].role === "model", JSON.stringify(r.json).slice(0, 150));
script = [fc("search_products", { query: "zzzz nothing" }), say("I found nothing.")];
r = await chat("find zzzz nothing");
ok("an unknown product does not break the chat", r.status === 200);
script = [fc("delete_everything", {}), say("cannot")];
r = await chat("delete all");
ok("an unknown tool is answered with an error, not run", r.status === 200 && r.json.actions.length === 0);

// 11. listing
const list = await call("GET", "/api/admin/agent", { cookie: ck });
ok("the panel can reload recent actions with their status", list.status === 200 && list.json.configured === true && list.json.actions.some((a) => a.status === "undone") && list.json.actions.some((a) => a.status === "applied" || a.status === "cancelled"));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
