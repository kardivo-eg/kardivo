// V80 tests: automatic emails (proof received, unpaid-order reminder, welcome, abandoned cart, follow-up, win-back), unsubscribe, and the admin "send an email" box.
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

await call("GET", "/api/health");
setS({ instapay: "kard@instapay", reserve_hours: 12, email_welcome_code: "WELCOME10", email_cart_code: "CART5", proof_eta_minutes: 20 });
const cat = db.prepare("SELECT id FROM categories LIMIT 1").get();
const pid = Number(db.prepare("INSERT INTO products(name,slug,price,delivery_type,active,featured,category_id) VALUES('Test Card','test-card',100,'code',1,1,?)").run(cat.id).lastInsertRowid);
for (let i = 0; i < 20; i++) db.prepare("INSERT INTO inventory(product_id,code,status) VALUES(?,?,'available')").run(pid, "CODE" + i);
const admin = await call("POST", "/api/auth/login", { body: { email: "admin@test.com", password: "adminpass123" } });

// --- welcome email (+ opt-in choice)
const A = await call("POST", "/api/auth/register", { body: { name: "Alice A", email: "alice@test.com", password: "password123", marketing: true, lang: "en" } });
const B = await call("POST", "/api/auth/register", { body: { name: "Bob B", email: "bob@test.com", password: "password123", marketing: false } });
await sleep(80);
ok("welcome email sent, with the first-order code", mailTo("alice@test.com", "Welcome").length === 1 && mailTo("alice@test.com")[0].html.includes("WELCOME10"));
ok("opted-in welcome has an unsubscribe link + header", mailTo("alice@test.com")[0].html.includes("/api/unsubscribe?u=") && !!mailTo("alice@test.com")[0].headers["List-Unsubscribe"]);
ok("welcome to a customer who did not opt in has no unsubscribe link", mailTo("bob@test.com").length === 1 && !mailTo("bob@test.com")[0].html.includes("unsubscribe"));
ok("opt-in is stored (Alice yes, Bob no)", db.prepare("SELECT marketing_optin x FROM users WHERE email='alice@test.com'").get().x === 1 && db.prepare("SELECT marketing_optin x FROM users WHERE email='bob@test.com'").get().x === 0);

// --- proof received: thread message + notification + email, in hours and out of hours, de-duplicated
const png = () => { const f = new FormData(); f.append("file", new Blob([Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64")], { type: "image/png" }), "proof.png"); return f; };
setS({ work_start_hour: hNow, work_end_hour: (hNow + 1) % 24 });
const o1 = await call("POST", "/api/orders", { cookie: A.cookie, body: { items: [{ product_id: pid, quantity: 1 }], payment_method: "instapay", lang: "en" } });
const up1 = await call("POST", `/api/orders/${o1.json.order_id}/payment-proof`, { cookie: A.cookie, body: png() });
const msgs = () => db.prepare("SELECT sender,body FROM kd_order_messages WHERE order_id=?").all(o1.json.order_id);
ok("proof upload still works", up1.status === 200, JSON.stringify(up1.json));
ok("support thread gets the in-hours message with the ETA (20 min)", msgs().length === 1 && msgs()[0].sender === "admin" && msgs()[0].body.includes("within 20 minutes"), JSON.stringify(msgs()));
ok("customer gets an in-app notification", db.prepare("SELECT COUNT(*) n FROM customer_notifications WHERE order_id=? AND title LIKE 'Payment proof received'").get(o1.json.order_id).n === 1);
ok("customer gets the email", mailTo("alice@test.com", "payment proof").length === 1);
await call("POST", `/api/orders/${o1.json.order_id}/payment-proof`, { cookie: A.cookie, body: png() });
ok("re-upload within minutes does not send a second message", msgs().length === 1 && mailTo("alice@test.com", "payment proof").length === 1);
setS({ work_start_hour: (hNow + 2) % 24, work_end_hour: (hNow + 3) % 24 });
const o2 = await call("POST", "/api/orders", { cookie: B.cookie, body: { items: [{ product_id: pid, quantity: 1 }], payment_method: "instapay", lang: "en" } });
await call("POST", `/api/orders/${o2.json.order_id}/payment-proof`, { cookie: B.cookie, body: png() });
ok("outside working hours the message says first thing in the morning", db.prepare("SELECT body FROM kd_order_messages WHERE order_id=?").get(o2.json.order_id)?.body.includes("first thing in the morning"));
setS({ proof_ack_enabled: 0 });
const o3 = await call("POST", "/api/orders", { cookie: B.cookie, body: { items: [{ product_id: pid, quantity: 1 }], payment_method: "instapay", lang: "en" } });
await call("POST", `/api/orders/${o3.json.order_id}/payment-proof`, { cookie: B.cookie, body: png() });
ok("switching the message off in settings stops it", db.prepare("SELECT COUNT(*) n FROM kd_order_messages WHERE order_id=?").get(o3.json.order_id).n === 0);
setS({ proof_ack_enabled: 1 });

// --- hourly automations
setS({ email_send_from: hNow, email_send_to: (hNow + 1) % 24 });
const o4 = await call("POST", "/api/orders", { cookie: A.cookie, body: { items: [{ product_id: pid, quantity: 1 }], payment_method: "instapay", lang: "en" } });
const o5 = await call("POST", "/api/orders", { cookie: A.cookie, body: { items: [{ product_id: pid, quantity: 1 }], payment_method: "instapay", lang: "en" } });
db.prepare("UPDATE orders SET created_at=datetime('now','-7 hours'),reserve_reset_at=NULL WHERE id=?").run(o4.json.order_id);
db.prepare("UPDATE orders SET created_at=datetime('now','-20 minutes'),reserve_reset_at=NULL WHERE id=?").run(o5.json.order_id);
db.prepare("UPDATE orders SET created_at=datetime('now','-7 hours') WHERE id=?").run(o1.json.order_id); // has a proof: must not be reminded
const before = sent.length;
await tick();
const unpaid = mailTo("alice@test.com", "is waiting for you");
ok("unpaid order (7h, no proof) gets exactly one reminder", unpaid.length === 1 && unpaid[0].html.includes("about 5 more hours"), JSON.stringify(unpaid.map((m) => m.subject)));
ok("a 20-minute-old order and an order with proof get none", sent.slice(before).filter((m) => m.subject.includes("waiting")).length === 1);
await tick();
ok("a second run sends no duplicate", mailTo("alice@test.com", "is waiting for you").length === 1);

// abandoned cart (Alice's earlier test orders are made old first, so they do not count as "bought after leaving the cart")
db.prepare("UPDATE orders SET created_at=datetime('now','-30 days') WHERE user_id=?").run(A.json.user.id);
const cs = await call("POST", "/api/cart-sync", { cookie: A.cookie, body: { lang: "en", items: [{ product_id: pid, quantity: 2 }] } });
ok("cart is saved for a logged-in customer", cs.status === 200 && db.prepare("SELECT COUNT(*) n FROM kd_saved_carts").get().n === 1);
ok("guests are ignored", (await call("POST", "/api/cart-sync", { body: { items: [{ product_id: pid, quantity: 1 }] } })).status === 200 && db.prepare("SELECT COUNT(*) n FROM kd_saved_carts").get().n === 1);
await tick();
ok("a fresh cart is not emailed yet", mailTo("alice@test.com", "forget").length === 0);
db.prepare("UPDATE kd_saved_carts SET updated_at=? WHERE user_id=?").run(new Date(Date.now() - 13 * 3600000).toISOString(), A.json.user.id);
db.prepare("UPDATE users SET last_marketing_at=NULL WHERE id=?").run(A.json.user.id);
await tick();
const cart = mailTo("alice@test.com", "forget");
ok("a 13h-old cart gets one email naming the product and the code", cart.length === 1 && cart[0].html.includes("Test Card") && cart[0].html.includes("CART5") && cart[0].html.includes("/api/unsubscribe"), JSON.stringify(cart.map((m) => m.subject)));
await tick();
ok("cart reminder is sent once", mailTo("alice@test.com", "forget").length === 1);
await call("POST", "/api/cart-sync", { cookie: A.cookie, body: { lang: "en", items: [] } });
ok("an emptied cart is removed", db.prepare("SELECT COUNT(*) n FROM kd_saved_carts").get().n === 0);

// follow-up after delivery (and the one-offer-email-per-6-days limit)
db.prepare("INSERT INTO orders(order_number,user_id,subtotal,total,payment_method,payment_status,fulfillment_status,lang,updated_at,created_at) VALUES('KDV-F1',?,100,100,'instapay','paid','fulfilled','en',datetime('now','-4 days'),datetime('now','-5 days'))").run(A.json.user.id);
await tick();
ok("Alice just got an offer email, so the follow-up waits (6-day limit)", mailTo("alice@test.com", "Thanks for your order").length === 0);
db.prepare("UPDATE users SET marketing_optin=1 WHERE id=?").run(B.json.user.id);
db.prepare("INSERT INTO orders(order_number,user_id,subtotal,total,payment_method,payment_status,fulfillment_status,lang,updated_at,created_at) VALUES('KDV-F2',?,100,100,'instapay','paid','fulfilled','en',datetime('now','-4 days'),datetime('now','-5 days'))").run(B.json.user.id);
await tick();
ok("Bob gets one follow-up 3+ days after delivery", mailTo("bob@test.com", "Thanks for your order").length === 1);

// win-back
db.prepare("INSERT INTO users(name,email,password_hash,role,marketing_optin) VALUES('Cara','cara@test.com','x','customer',1)").run();
const cid = db.prepare("SELECT id FROM users WHERE email='cara@test.com'").get().id;
db.prepare("INSERT INTO orders(order_number,user_id,subtotal,total,payment_method,payment_status,fulfillment_status,lang,created_at,updated_at) VALUES('KDV-W1',?,100,100,'instapay','paid','fulfilled','ar',datetime('now','-50 days'),datetime('now','-50 days'))").run(cid);
db.prepare("INSERT INTO users(name,email,password_hash,role,marketing_optin) VALUES('Old','old@test.com','x','customer',1)").run();
db.prepare("INSERT INTO orders(order_number,user_id,subtotal,total,payment_method,payment_status,fulfillment_status,lang,created_at,updated_at) VALUES('KDV-W2',(SELECT id FROM users WHERE email='old@test.com'),100,100,'instapay','paid','fulfilled','ar',datetime('now','-300 days'),datetime('now','-300 days'))").run();
await tick();
ok("a customer whose last order was 50 days ago gets a win-back", mailTo("cara@test.com", "وحشتنا").length === 1);
ok("a customer silent for 300 days is left alone", mailTo("old@test.com").length === 0);

// master switch
setS({ email_auto_enabled: 0 });
db.prepare("UPDATE kd_saved_carts SET updated_at=updated_at").run();
const n0 = sent.length; await tick();
ok("automatic emails off = nothing is sent", sent.length === n0);
setS({ email_auto_enabled: 1 });

// --- unsubscribe
const tok = db.prepare("SELECT id,unsub_token FROM users WHERE email='alice@test.com'").get();
ok("wrong unsubscribe token changes nothing", (await call("GET", `/api/unsubscribe?u=${tok.id}&t=wrongwrongwrongwrong`)).status === 400 && db.prepare("SELECT marketing_optin x FROM users WHERE id=?").get(tok.id).x === 1);
const un = await call("GET", `/api/unsubscribe?u=${tok.id}&t=${tok.unsub_token}`);
ok("unsubscribe link switches offers off", un.status === 200 && db.prepare("SELECT marketing_optin x FROM users WHERE id=?").get(tok.id).x === 0);
ok("customer can switch offers back on from the account", (await call("POST", "/api/me/marketing", { cookie: A.cookie, body: { optin: true } })).json.optin === true);

// --- admin: write and send an email from the dashboard
const send = (body, cookie = admin.cookie) => call("POST", "/api/admin/email/send", { cookie, body });
ok("customers cannot use the send box", (await send({ to: "x@y.com", subject: "s", body: "b" }, A.cookie)).status === 403);
ok("empty subject/message rejected", (await send({ to: "x@y.com", subject: "", body: "b" })).status === 400);
ok("bad address rejected", (await send({ to: "nope", subject: "s", body: "b" })).status === 400);
ok("javascript: button link rejected", (await send({ to: "x@y.com", subject: "s", body: "b", cta_url: "javascript:alert(1)" })).status === 400);
const d1 = await send({ to: "friend@test.com, other@test.com", subject: "Hello there", body: "Line one\nLine two", cta_text: "Open store", cta_url: "/products", lang: "en" });
ok("sends to several addresses", d1.json.sent === 2 && d1.json.failed === 0, JSON.stringify(d1.json));
const dm = mailTo("friend@test.com")[0];
ok("direct email has the text, the button, and no unsubscribe link", dm.subject.startsWith("Hello there") && dm.html.includes("Line one") && dm.html.includes("https://kardivo.store/products") && !dm.html.includes("unsubscribe"));
const au = await send({ audience: "optin", offset: 0, subject: "Weekend offer", body: "10% off", lang: "en" });
const optinNow = db.prepare("SELECT COUNT(*) n FROM users WHERE role='customer' AND marketing_optin=1").get().n;
ok("offer email goes only to opted-in customers", au.json.total === optinNow && au.json.sent === optinNow && au.json.done === true, JSON.stringify([au.json, optinNow]));
ok("offer email carries the unsubscribe link", mailTo("alice@test.com", "Weekend offer")[0]?.html.includes("/api/unsubscribe"));
ok("offer email skips customers who unsubscribed", mailTo("old@test.com", "Weekend offer").length === 1 && db.prepare("SELECT COUNT(*) n FROM users WHERE marketing_optin=0 AND role='customer'").get().n >= 0);
const ov = await call("GET", "/api/admin/email/overview", { cookie: admin.cookie });
ok("overview shows setup, opted-in count, and the log", ov.json.ready === true && ov.json.optin === optinNow && ov.json.log.length > 5, JSON.stringify([ov.json.ready, ov.json.optin]));

// --- settings are clamped
await call("PUT", "/api/admin/settings", { cookie: admin.cookie, body: { proof_eta_minutes: "99999", email_cart_after_hours: "0", email_welcome_code: "bad code!*", work_start_hour: "40", email_cart_enabled: "yes" } });
const st = Object.fromEntries(db.prepare("SELECT key,value FROM settings").all().map((r) => [r.key, r.value]));
ok("settings are clamped and cleaned", st.proof_eta_minutes === "1440" && st.email_cart_after_hours === "1" && st.email_welcome_code === "BADCODE" && st.work_start_hour === "23" && st.email_cart_enabled === "0", JSON.stringify(st));
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
