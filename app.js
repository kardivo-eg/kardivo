const $=s=>document.querySelector(s);
const money=n=>`${Number(n).toFixed(2)} EGP`;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let P=[],C=[],U=null,S={},cart=JSON.parse(localStorage.kardivo_cart_v2||'[]');

async function api(path,options={}){
  const r=await fetch(path,{...options,headers:{'content-type':'application/json',...(options.headers||{})}});
  const d=await r.json().catch(()=>({}));
  if(!r.ok) throw Error(d.error||'Request failed');
  return d;
}
function saveCart(){localStorage.kardivo_cart_v2=JSON.stringify(cart);$('#count').textContent=cart.reduce((a,x)=>a+x.q,0)}
function closeModal(){ $('#modal').innerHTML='' }
function modal(html){$('#modal').innerHTML=`<div class="modal show"><div class="box"><button class="close" onclick="closeModal()">×</button>${html}</div></div>`}
function logoFallback(){return `<span class="brand-mark" aria-hidden="true"><span class="k-line k-a"></span><span class="k-line k-b"></span><span class="k-line k-c"></span><span class="pad-cut"></span></span>`}

async function boot(){
  try{
    [P,C,S,{user:U}]=await Promise.all([api('/api/products'),api('/api/categories'),api('/api/settings/public'),api('/api/me')]);
    renderCats();render();saveCart();
  }catch(e){
    console.error(e);
    $('#products').innerHTML='<div class="empty">The shop is temporarily unavailable. The frontend is alive, but the database still needs to be initialized.</div>';
  }
}
function renderCats(){
  $('#cats').innerHTML=`<button class="chip active" onclick="render('all',this)">All</button>`+
    C.map(c=>`<button class="chip" onclick="render(${c.id},this)">${esc(c.name)}</button>`).join('');
}
function render(cat='all',btn){
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));if(btn)btn.classList.add('active');
  const list=P.filter(p=>cat==='all'||p.category_id==cat);
  $('#products').innerHTML=list.length?list.map(p=>`
    <article class="card">
      <div class="pic" ${p.image_url?`style="background-image:url('${esc(p.image_url)}')"`:''}>${p.image_url?'':logoFallback()}</div>
      <div class="body"><div class="tag">${esc(p.category_name||'Digital')}</div>
      <h3>${esc(p.name)}</h3><div class="desc">${esc(p.description)}</div>
      <div class="row"><span><b>${money(p.price)}</b>${p.old_price?`<span class="old">${money(p.old_price)}</span>`:''}</span>
      <button class="add" onclick="add(${p.id})">Add</button></div></div>
    </article>`).join(''):'<div class="empty">No products here yet.</div>';
}
function add(id){let x=cart.find(x=>x.id===id);x?x.q++:cart.push({id,q:1});saveCart();cartView(true)}
function cartView(keep=false){
  const a=cart.map(x=>({...x,p:P.find(p=>p.id===x.id)})).filter(x=>x.p);
  const total=a.reduce((s,x)=>s+x.p.price*x.q,0);
  modal(`<h2>Your cart</h2>${a.map(x=>`<div class="order"><b>${esc(x.p.name)}</b><br><span>${x.q} × ${money(x.p.price)}</span>
  <button onclick="qty(${x.id},-1)">−</button><button onclick="qty(${x.id},1)">+</button></div>`).join('')||
  '<div class="empty">Your cart is empty.</div>'}${a.length?`<div class="notice"><b>Total: ${money(total)}</b></div>
  <button class="primary" onclick="checkoutGate()">Continue to checkout</button>`:''}`);
}
function qty(id,n){let x=cart.find(x=>x.id===id);if(!x)return;x.q+=n;if(x.q<1)cart=cart.filter(y=>y.id!==id);saveCart();cartView()}
function account(){
  if(U)return U.role==='admin'?admin():orders();
  modal(`<h2>Account</h2><p class="muted">You can shop without an account. Sign in here when you want to view your orders or manage your account.</p>
  <form onsubmit="login(event)"><input id="em" type="email" placeholder="Email" required><input id="pw" type="password" placeholder="Password" required>
  <button class="primary">Log in</button></form><p>New here? <button onclick="registerForm()">Create an account</button></p>`);
}
async function login(e){e.preventDefault();try{U=(await api('/api/auth/login',{method:'POST',body:JSON.stringify({email:$('#em').value,password:$('#pw').value})})).user;account()}catch(x){alert(x.message)}}
function registerForm(){modal(`<h2>Create your account</h2><form onsubmit="register(event)"><input id="nm" placeholder="Name" required><input id="em" type="email" placeholder="Email" required><input id="pw" type="password" minlength="6" placeholder="Password" required><button class="primary">Create account</button></form>`)}
async function register(e){e.preventDefault();try{U=(await api('/api/auth/register',{method:'POST',body:JSON.stringify({name:$('#nm').value,email:$('#em').value,password:$('#pw').value})})).user;account()}catch(x){alert(x.message)}}
async function orders(){try{const a=await api('/api/orders');modal(`<h2>Your orders</h2><p>Signed in as ${esc(U.email)}</p>${a.map(o=>`<div class="order"><b>${esc(o.order_number)}</b><br>${money(o.total)} · ${esc(o.payment_status)}</div>`).join('')||'<div class="empty">No orders yet.</div>'}<button onclick="logout()">Log out</button>`)}catch(e){alert(e.message)}}
async function logout(){await api('/api/auth/logout',{method:'POST'});U=null;account()}

function checkoutGate(){
  if(!cart.length)return;
  modal(`<h2>Continue to checkout</h2><p class="muted">You do not need an account just to shop. For this purchase, choose how you want to continue.</p>
  <div class="choice-grid">
    <button class="choice" onclick="checkoutLogin()"><b>Log in</b><span>Use your existing Kardivo account.</span></button>
    <button class="choice" onclick="checkoutRegister()"><b>Create an account</b><span>Save your order to your account.</span></button>
    <button class="choice" onclick="guestCheckout()"><b>Continue as guest</b><span>Buy without creating an account.</span></button>
  </div>`);
}
function checkoutLogin(){modal(`<h2>Log in to continue</h2><form onsubmit="loginThenCheckout(event)"><input id="em" type="email" placeholder="Email" required><input id="pw" type="password" placeholder="Password" required><button class="primary">Log in & continue</button></form>`)}
async function loginThenCheckout(e){e.preventDefault();try{U=(await api('/api/auth/login',{method:'POST',body:JSON.stringify({email:$('#em').value,password:$('#pw').value})})).user;checkoutForm()}catch(x){alert(x.message)}}
function checkoutRegister(){modal(`<h2>Create an account</h2><form onsubmit="registerThenCheckout(event)"><input id="nm" placeholder="Name" required><input id="em" type="email" placeholder="Email" required><input id="pw" type="password" minlength="6" placeholder="Password" required><button class="primary">Create & continue</button></form>`)}
async function registerThenCheckout(e){e.preventDefault();try{U=(await api('/api/auth/register',{method:'POST',body:JSON.stringify({name:$('#nm').value,email:$('#em').value,password:$('#pw').value})})).user;checkoutForm()}catch(x){alert(x.message)}}
function guestCheckout(){checkoutForm(true)}
function checkoutForm(guest=false){
  modal(`<h2>Checkout</h2>${guest?`<p class="muted">Guest checkout. We only need enough information to identify this order.</p>
  <input id="gn" placeholder="Your name" required><input id="gc" placeholder="WhatsApp number or email" required>`:
  `<p class="muted">Signed in as ${esc(U.email)}. Your order will be saved to your account.</p>`}
  <select id="pm"><option value="instapay">InstaPay</option><option value="vodafone_cash">Vodafone Cash</option><option value="telda">Telda</option></select>
  <input id="dc" placeholder="Discount code (optional)">
  <button class="primary" onclick="place(${guest})">Continue to payment</button>`);
}
async function place(guest){
  try{
    const payload={items:cart.map(x=>({product_id:x.id,quantity:x.q})),payment_method:$('#pm').value,discount_code:$('#dc').value};
    if(guest){payload.guest_name=$('#gn').value.trim();payload.guest_contact=$('#gc').value.trim()}
    const d=await api('/api/orders',{method:'POST',body:JSON.stringify(payload)});
    cart=[];saveCart();
    modal(`<h2>Order ${esc(d.order_number)}</h2><div class="notice"><b>Pay exactly ${money(d.total)}</b><br>
    Method: ${esc(d.payment_method)}<br>Destination: <b>${esc(d.destination||'Not configured')}</b></div>
    <p>${esc(d.support_text)}</p>${d.whatsapp?`<a class="primary" target="_blank" rel="noopener" href="${d.whatsapp}">Open WhatsApp Support</a>`:''}`);
  }catch(x){alert(x.message)}
}

async function admin(){
  try{
    const [p,o,d,i]=await Promise.all([api('/api/admin/products'),api('/api/admin/orders'),api('/api/admin/discounts'),api('/api/admin/inventory')]);
    window.AD={p,o,d,i};modal(`<h2>Kardivo Admin</h2><div class="admin-actions">
      <button onclick="adminProducts()">Products</button><button onclick="adminOrders()">Orders</button><button onclick="adminDiscounts()">Discounts</button><button onclick="adminInventory()">Inventory</button><button onclick="adminSettings()">Settings</button></div><div id="A"></div>`);adminProducts();
  }catch(e){alert(e.message)}
}
function adminProducts(){
  A.innerHTML=`<h3>Products</h3><button class="primary" onclick="productForm()">Add product</button><table class="admin"><tr><th>Name</th><th>Price</th><th>Stock</th><th>Status</th></tr>${AD.p.map(p=>`<tr><td>${esc(p.name)}</td><td>${money(p.price)}</td><td>${p.delivery_type==='code'?p.stock:'Manual'}</td><td>${p.active?'Active':'Hidden'}</td></tr>`).join('')}</table>`;
}
function productForm(){
  A.innerHTML=`<h3>Add product</h3><form onsubmit="addProduct(event)">
  <input id="pn" placeholder="Product name" required><input id="pp" type="number" step=".01" placeholder="Price" required>
  <input id="po" type="number" step=".01" placeholder="Old price (optional)"><textarea id="pd" placeholder="Description"></textarea>
  <input id="pi" placeholder="Image URL (optional)"><select id="pc">${C.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select>
  <select id="pt"><option value="manual">Manual delivery</option><option value="code">Digital code</option></select>
  <input id="platform" placeholder="Platform (optional)"><input id="region" placeholder="Region (optional)">
  <label><input id="featured" type="checkbox"> Featured</label><button class="primary">Save product</button></form>`;
}
async function addProduct(e){e.preventDefault();await api('/api/admin/products',{method:'POST',body:JSON.stringify({name:pn.value,price:pp.value,old_price:po.value,description:pd.value,image_url:pi.value,category_id:pc.value,delivery_type:pt.value,platform:platform.value,region:region.value,featured:featured.checked})});admin()}
function adminOrders(){A.innerHTML=`<h3>Orders</h3>${AD.o.length?`<table class="admin"><tr><th>Order</th><th>Customer</th><th>Total</th><th>Payment</th></tr>${AD.o.map(o=>`<tr><td>${esc(o.order_number)}</td><td>${esc(o.user_name||o.guest_name||'Guest')}<br>${esc(o.user_email||o.guest_contact||'')}</td><td>${money(o.total)}</td><td><select onchange="upd(${o.id},this.value)"><option ${o.payment_status==='awaiting_payment'?'selected':''}>awaiting_payment</option><option ${o.payment_status==='paid'?'selected':''}>paid</option><option ${o.payment_status==='rejected'?'selected':''}>rejected</option></select></td></tr>`).join('')}</table>`:'<div class="empty">No orders yet.</div>'}`}
async function upd(id,v){await api('/api/admin/orders/'+id,{method:'PUT',body:JSON.stringify({payment_status:v,fulfillment_status:v==='paid'?'processing':'pending'})});admin()}
function adminDiscounts(){A.innerHTML=`<h3>Discounts</h3><form onsubmit="disc(event)"><input id="code" placeholder="CODE"><select id="type"><option value="percentage">%</option><option value="fixed">Fixed EGP</option></select><input id="amount" type="number" step=".01" placeholder="Amount"><input id="min" type="number" step=".01" placeholder="Minimum order (optional)"><button class="primary">Create discount</button></form>`}
async function disc(e){e.preventDefault();await api('/api/admin/discounts',{method:'POST',body:JSON.stringify({code:code.value,type:type.value,amount:amount.value,min_order:min.value})});admin()}
function adminInventory(){A.innerHTML=`<h3>Digital code inventory</h3><form onsubmit="inv(event)"><select id="prod">${AD.p.filter(p=>p.delivery_type==='code').map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select><textarea id="codes" placeholder="One code per line"></textarea><button class="primary">Add codes</button></form>`}
async function inv(e){e.preventDefault();await api('/api/admin/inventory',{method:'POST',body:JSON.stringify({product_id:prod.value,codes:codes.value})});admin()}
async function adminSettings(){const s=await api('/api/admin/settings');A.innerHTML=`<h3>Payment settings</h3><form onsubmit="settings(event)"><input id="si" placeholder="InstaPay" value="${esc(s.instapay)}"><input id="sv" placeholder="Vodafone Cash" value="${esc(s.vodafone_cash)}"><input id="st" placeholder="Telda" value="${esc(s.telda)}"><input id="sw" placeholder="WhatsApp number" value="${esc(s.whatsapp)}"><textarea id="ss">${esc(s.support_text)}</textarea><button class="primary">Save</button></form>`}
async function settings(e){e.preventDefault();await api('/api/admin/settings',{method:'PUT',body:JSON.stringify({instapay:si.value,vodafone_cash:sv.value,telda:st.value,whatsapp:sw.value,support_text:ss.value})});admin()}
$('#cart').onclick=()=>cartView();$('#account').onclick=account;boot();
