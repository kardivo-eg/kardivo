// V78 security tests. Run from the project folder with: node --no-warnings tests/v78-security.test.mjs  (Node 22 or newer).
// It runs the real worker.js against an in-memory SQLite database that imitates D1, so nothing touches your live store.
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const WORKER_PATH = path.join(HERE, "../worker.js");
const SCHEMA_PATH = path.join(HERE, "../schema.sql");
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
const src = fs.readFileSync(WORKER_PATH,"utf8");
const mod = await import("data:text/javascript;base64,"+Buffer.from(src).toString("base64"));
const db = new DatabaseSync(":memory:"); db.exec(fs.readFileSync(SCHEMA_PATH,"utf8"));
const norm = (v)=> v===undefined?null:(typeof v==="boolean"?(v?1:0):v);
function stmt(sql){ let binds=[]; const o={
  bind(...a){ binds=a.map(norm); return o; },
  async first(){ const r=db.prepare(sql).get(...binds); return r?{...r}:null; },
  async all(){ return { results: db.prepare(sql).all(...binds).map(r=>({...r})) }; },
  async run(){ const r=db.prepare(sql).run(...binds); return { meta:{ changes:Number(r.changes), last_row_id:Number(r.lastInsertRowid) }, success:true }; },
  _run(){ return o.run(); } }; return o; }
const DB = { prepare:stmt, async batch(list){ const out=[]; db.exec("BEGIN"); try{ for(const s of list) out.push(await s.run()); db.exec("COMMIT"); }catch(e){ db.exec("ROLLBACK"); throw e;} return out; }, async exec(s){ db.exec(s); } };
const store = new Map();
const R2 = { async put(k,v){ store.set(k,v); }, async get(k){ return store.has(k)?{body:"x",httpMetadata:{}}:null; }, async delete(k){ store.delete(k); } };
const env = { DB, R2, ADMIN_EMAIL:"admin@test.com", ADMIN_PASSWORD:"adminpass123", ASSETS:{ fetch: async()=>new Response("<html></html>",{headers:{"content-type":"text/html"}}) } };
const ctx = { waitUntil(p){ Promise.resolve(p).catch(()=>{}); } };
let ipN = 0;
async function call(method, path, { body, cookie, headers={}, ip } = {}) {
  const h = { "cf-connecting-ip": ip || "9.9.9."+(++ipN), ...headers };
  if (cookie) h.cookie = cookie;
  let b; if (body instanceof FormData) b = body; else if (body) { b = JSON.stringify(body); h["content-type"]="application/json"; }
  const r = await mod.default.fetch(new Request("https://kardivo.store"+path,{method,headers:h,body:b}), env, ctx);
  const txt = await r.text(); let j; try{ j=JSON.parse(txt);}catch{ j=txt; }
  return { status:r.status, json:j, cookie:(r.headers.get("set-cookie")||"").split(";")[0] };
}
let pass=0, fail=0; const ok=(name,c,extra="")=>{ (c?pass++:fail++); console.log((c?"PASS":"FAIL")+" - "+name+(c?"":" "+extra)); };

await call("GET","/api/health");
// settings: enable instapay with a destination
db.exec("INSERT OR REPLACE INTO settings(key,value) VALUES('instapay','kard@instapay')");
const admin = await call("POST","/api/auth/login",{body:{email:"admin@test.com",password:"adminpass123"}});
ok("admin login", admin.status===200, JSON.stringify(admin.json));
const A = await call("POST","/api/auth/register",{body:{name:"Alice A",email:"alice@test.com",password:"password123"}});
const B = await call("POST","/api/auth/register",{body:{name:"Bobby B",email:"bob@test.com",password:"password123"}});
ok("register A,B", A.status===201 && B.status===201, JSON.stringify([A.json,B.json]));
const bad = await call("POST","/api/auth/register",{body:{name:"Bad",email:"nope@",password:"password123"}});
ok("register rejects bad email", bad.status===400);
// product with stock
const cat = db.prepare("SELECT id FROM categories LIMIT 1").get();
const pr = db.prepare("INSERT INTO products(name,slug,price,delivery_type,active,category_id) VALUES('Test Card','test-card',100,'code',1,?)").run(cat?.id ?? null);
const pid = Number(pr.lastInsertRowid);
for (let i=0;i<12;i++) db.prepare("INSERT INTO inventory(product_id,code,status) VALUES(?,?,'available')").run(pid,"CODE"+i);
const items=[{product_id:pid,quantity:1}];
const o1 = await call("POST","/api/orders",{cookie:A.cookie,body:{items,payment_method:"instapay"}});
ok("member A places order", o1.status===201, JSON.stringify(o1.json));
const oid = o1.json.order_id;
const fd = ()=>{ const f=new FormData(); f.set("file", new Blob([new Uint8Array([1,2,3])],{type:"image/png"}), "p.png"); return f; };
// the bug: B (logged in) uploads to A's order with no contact header
const hit = await call("POST",`/api/orders/${oid}/payment-proof`,{cookie:B.cookie,body:fd()});
ok("FIX1: other logged-in user can NOT upload proof to A's order", hit.status===403, JSON.stringify(hit));
const own = await call("POST",`/api/orders/${oid}/payment-proof`,{cookie:A.cookie,body:fd()});
ok("owner can upload proof", own.status===200, JSON.stringify(own));
// guest contact flow
const g = await call("POST","/api/orders",{body:{items,payment_method:"instapay",guest_name:"Guest G",guest_contact:"guest@test.com"}});
ok("guest places order", g.status===201, JSON.stringify(g.json));
const gBad = await call("POST",`/api/orders/${g.json.order_id}/payment-proof`,{body:fd()});
ok("guest without contact header rejected", gBad.status===403);
const gOk = await call("POST",`/api/orders/${g.json.order_id}/payment-proof`,{body:fd(),headers:{"X-Order-Contact":"GUEST@test.com"}});
ok("guest with right contact accepted", gOk.status===200, JSON.stringify(gOk));
const gMem = await call("POST",`/api/orders/${g.json.order_id}/payment-proof`,{cookie:B.cookie,body:fd()});
ok("logged-in stranger rejected on guest order", gMem.status===403);
// open-order cap (B is at 0 open; A has 1)
let last; for (let i=0;i<4;i++) last = await call("POST","/api/orders",{cookie:B.cookie,body:{items,payment_method:"instapay"}});
ok("FIX2: 4th unpaid order is refused", last.status===429, JSON.stringify(last));
// reopen cancelled order
const cancel = await call("PUT",`/api/admin/orders/${oid}`,{cookie:admin.cookie,body:{fulfillment_status:"cancelled"}});
ok("admin can cancel", cancel.status===200, JSON.stringify(cancel));
const reopen = await call("PUT",`/api/admin/orders/${oid}`,{cookie:admin.cookie,body:{payment_status:"paid",fulfillment_status:"fulfilled"}});
ok("FIX3: cancelled order can't be reopened", reopen.status===409, JSON.stringify(reopen));
const note = await call("PUT",`/api/admin/orders/${oid}`,{cookie:admin.cookie,body:{notes:"hello"}});
ok("cancelled order notes still editable", note.status===200, JSON.stringify(note));
// normal flow: paid + delivered
const g2ok = await call("POST",`/api/admin/orders/${g.json.order_id}/mark-paid-deliver`,{cookie:admin.cookie,body:{}});
ok("normal mark-paid-deliver works", g2ok.status===200, JSON.stringify(g2ok));
// malformed carts
const m1 = await call("POST","/api/orders",{body:{items:[null],payment_method:"instapay",guest_name:"x y",guest_contact:"m@test.com"}});
const m2 = await call("POST","/api/discount/check",{body:{items:[{product_id:"abc"}]}});
ok("FIX: null/NaN cart items give 400, not 500", m1.status===400 && m2.status===400, JSON.stringify([m1.status,m2.status]));
// 500 doesn't leak text
// settings
const pub = await call("GET","/api/settings/public");
ok("public settings hide secrets", pub.status===200 && !("gemini_api_key" in pub.json) && !("instapay" in pub.json));
// login: wrong password, unknown email
const w = await call("POST","/api/auth/login",{body:{email:"alice@test.com",password:"wrong"}});
const u = await call("POST","/api/auth/login",{body:{email:"ghost@test.com",password:"wrong"}});
ok("wrong password / unknown email both 401", w.status===401 && u.status===401);
// login throttle by email across IPs
let s429=0; for (let i=0;i<25;i++){ const r=await call("POST","/api/auth/login",{body:{email:"alice@test.com",password:"nope"}}); if(r.status===429) s429++; }
ok("FIX7: guessing one email from many IPs gets throttled", s429>0, "429s="+s429);
// hash upgrade and new-hash login
const h = db.prepare("SELECT password_hash FROM users WHERE email='bob@test.com'").get().password_hash;
ok("new hashes use 100000 rounds", h.startsWith("pbkdf2$100000$"), h.slice(0,20));
console.log(`\n${pass} passed, ${fail} failed`);
