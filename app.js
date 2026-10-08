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
function logoFallback(){return `<img src="https://i.ibb.co/rRqtGKkw/0db84367-e795-4617-835e-5e0a2bf2ff45.jpg" alt="Kardivo" style="width:55%;height:auto;object-fit:contain">`}

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
  const icons=['🎮','🎁','⭐','⚡','🧩','💳','🕹️','🔑'];
  $('#categoryCards').innerHTML=C.map((c,i)=>`<button class="category-card" onclick="chooseCat(${c.id})"><span class="category-icon">${icons[i%icons.length]}</span><b>${esc(c.name)}</b><small>Browse products</small></button>`).join('');
  $('#activeCats').innerHTML=`<button class="chip active" onclick="chooseCat('all')">All</button>`+C.map(c=>`<button class="chip" onclick="chooseCat(${c.id})">${esc(c.name)}</button>`).join('');
}
let activeCat='all', searchTerm='', sortMode='featured';
function chooseCat(id){activeCat=id;document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));const chips=[...document.querySelectorAll('.chip')];const idx=id==='all'?0:C.findIndex(c=>c.id===id)+1;if(chips[idx])chips[idx].classList.add('active');render();document.querySelector('#shop').scrollIntoView({behavior:'smooth'})}
function render(cat=activeCat){
  activeCat=cat;
  let list=P.filter(p=>cat==='all'||p.category_id==cat);
  if(searchTerm) list=list.filter(p=>(p.name+' '+p.description+' '+(p.platform||'')+' '+(p.region||'')).toLowerCase().includes(searchTerm));
  if(sortMode==='low')list.sort((a,b)=>a.price-b.price);else if(sortMode==='high')list.sort((a,b)=>b.price-a.price);else if(sortMode==='new')list.sort((a,b)=>b.id-a.id);else list.sort((a,b)=>(b.featured-a.featured)||(b.id-a.id));
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
function checkoutForm(guest=false){const methods=[['instapay','InstaPay'],['vodafone_cash','Vodafone Cash'],['telda','Telda']].filter(([k])=>S[k]&&S[k+'_enabled']!=='0');if(!methods.length){modal('<h2>Payments unavailable</h2><p class="muted">No payment method is currently enabled. Please contact support.</p>');return}window.selectedPay=methods[0][0];modal(`<h2>Checkout</h2>${guest?`<p class="muted">Guest checkout. We only need enough information to identify this order.</p><input id="gn" placeholder="Your name" required><input id="gc" placeholder="WhatsApp number or email" required>`:`<p class="muted">Signed in as ${esc(U.email)}. Your order will be saved to your account.</p>`}<div class="payment-choices">${methods.map(([k,n],i)=>`<button type="button" class="payment-choice ${i===0?'selected':''}" onclick="selectPayment('${k}',this)"><b>${n}</b><span>Pay exact total</span></button>`).join('')}</div><div id="paymentDestination" class="notice"><b>${methods[0][1]}</b><br>${esc(S[methods[0][0]])}</div><input id="dc" placeholder="Discount code (optional)"><button class="primary wide" onclick="place(${guest})">Continue to payment</button>`)}
function selectPayment(k,el){window.selectedPay=k;document.querySelectorAll('.payment-choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');$('#paymentDestination').innerHTML=`<b>${k==='instapay'?'InstaPay':k==='vodafone_cash'?'Vodafone Cash':'Telda'}</b><br>${esc(S[k]||'Not configured')}`}

async function place(guest){
  try{
    const payload={items:cart.map(x=>({product_id:x.id,quantity:x.q})),payment_method:window.selectedPay,discount_code:$('#dc').value};
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
    const [p,o,d,i,c]=await Promise.all([api('/api/admin/products'),api('/api/admin/orders'),api('/api/admin/discounts'),api('/api/admin/inventory'),api('/api/admin/categories')]);
    window.AD={p,o,d,i,c};
    modal(`<h2>Kardivo Admin</h2><div class="admin-actions">
      <button onclick="adminProducts()">Products</button><button onclick="adminOrders()">Orders</button><button onclick="adminDiscounts()">Discounts</button><button onclick="adminInventory()">Inventory</button><button onclick="adminCategories()">Categories</button><button onclick="adminSettings()">Payments</button></div><div id="A"></div>`);
    adminProducts();
  }catch(e){alert(e.message)}
}
function adminProducts(){
  A.innerHTML=`<div class="admin-head"><h3>Products</h3><button class="primary" onclick="productForm()">Add product</button></div><table class="admin"><tr><th>Name</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr>${AD.p.map(p=>`<tr><td>${esc(p.name)}<br><small>${esc(p.category_name||'Uncategorized')}</small></td><td>${money(p.price)}${p.old_price?`<br><small>Old: ${money(p.old_price)}</small>`:''}</td><td>${p.delivery_type==='code'?p.stock:'Manual'}</td><td>${p.active?'Active':'Hidden'}</td><td><button onclick="productForm(${p.id})">Edit</button> <button onclick="toggleProduct(${p.id},${p.active?0:1})">${p.active?'Hide':'Show'}</button> <button class="danger" onclick="deleteProduct(${p.id})">Delete</button></td></tr>`).join('')}</table>`;
}
function productForm(id){
  const p=AD.p.find(x=>x.id===id)||{name:'',price:'',old_price:'',description:'',image_url:'',category_id:'',delivery_type:'manual',platform:'',region:'',active:1,featured:0};
  A.innerHTML=`<h3>${id?'Edit':'Add'} product</h3><form onsubmit="saveProduct(event,${id||0})">
  <input id="pn" placeholder="Product name" value="${esc(p.name)}" required><input id="pp" type="number" step=".01" min="0" placeholder="Price" value="${p.price}">
  <input id="po" type="number" step=".01" min="0" placeholder="Old price (optional)" value="${p.old_price??''}"><textarea id="pd" placeholder="Description">${esc(p.description||'')}</textarea>
  <input id="pi" placeholder="Product image URL" value="${esc(p.image_url||'')}"><select id="pc"><option value="">No category</option>${AD.c.map(c=>`<option value="${c.id}" ${Number(p.category_id)===Number(c.id)?'selected':''}>${esc(c.name)}</option>`).join('')}</select>
  <select id="pt"><option value="manual" ${p.delivery_type==='manual'?'selected':''}>Manual delivery</option><option value="code" ${p.delivery_type==='code'?'selected':''}>Digital code</option></select>
  <input id="platform" placeholder="Platform (optional)" value="${esc(p.platform||'')}"><input id="region" placeholder="Region (optional)" value="${esc(p.region||'')}">
  <label><input id="featured" type="checkbox" ${p.featured?'checked':''}> Featured</label><label><input id="active" type="checkbox" ${p.active?'checked':''}> Visible in store</label><button class="primary">Save product</button></form>`;
}
async function saveProduct(e,id){e.preventDefault();try{await api('/api/admin/products'+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify({name:pn.value,price:pp.value,old_price:po.value,description:pd.value,image_url:pi.value,category_id:pc.value||null,delivery_type:pt.value,platform:platform.value,region:region.value,featured:featured.checked,active:active.checked})});await refreshAdmin();await refreshStore();adminProducts();toast('Product saved')}catch(x){alert(x.message)}}
async function toggleProduct(id,active){try{const p=AD.p.find(x=>x.id===id);await api('/api/admin/products/'+id,{method:'PUT',body:JSON.stringify({...p,active:!!active})});await refreshAdmin();await refreshStore();adminProducts()}catch(x){alert(x.message)}}
async function deleteProduct(id){if(!confirm('Delete this product? It will no longer be shown in the store.'))return;try{await api('/api/admin/products/'+id,{method:'DELETE'});await refreshAdmin();await refreshStore();adminProducts();toast('Product deleted')}catch(x){alert(x.message)}}
function adminOrders(){A.innerHTML=`<h3>Orders</h3>${AD.o.length?`<table class="admin"><tr><th>Order</th><th>Customer</th><th>Total</th><th>Payment</th><th>Fulfillment</th></tr>${AD.o.map(o=>`<tr><td>${esc(o.order_number)}</td><td>${esc(o.user_name||o.guest_name||'Guest')}<br>${esc(o.user_email||o.guest_contact||'')}</td><td>${money(o.total)}</td><td><select onchange="upd(${o.id},this.value,null)"><option ${o.payment_status==='awaiting_payment'?'selected':''}>awaiting_payment</option><option ${o.payment_status==='paid'?'selected':''}>paid</option><option ${o.payment_status==='rejected'?'selected':''}>rejected</option></select></td><td><select onchange="upd(${o.id},null,this.value)"><option ${o.fulfillment_status==='pending'?'selected':''}>pending</option><option ${o.fulfillment_status==='processing'?'selected':''}>processing</option><option ${o.fulfillment_status==='completed'?'selected':''}>completed</option><option ${o.fulfillment_status==='cancelled'?'selected':''}>cancelled</option></select></td></tr>`).join('')}</table>`:'<div class="empty">No orders yet.</div>'}`}
async function upd(id,pay,ful){const o=AD.o.find(x=>x.id===id);await api('/api/admin/orders/'+id,{method:'PUT',body:JSON.stringify({payment_status:pay||o.payment_status,fulfillment_status:ful||o.fulfillment_status,notes:o.notes||''})});await refreshAdmin();adminOrders()}
function adminDiscounts(){A.innerHTML=`<div class="admin-head"><h3>Discounts</h3><button class="primary" onclick="discountForm()">Add discount</button></div>${AD.d.map(d=>`<div class="order"><span><b>${esc(d.code)}</b><br>${esc(d.type)} · ${d.amount}${d.type==='percentage'?'%':' EGP'} · min ${money(d.min_order||0)} · ${d.active?'Active':'Disabled'}</span><span><button onclick="discountForm(${d.id})">Edit</button> <button class="danger" onclick="deleteDiscount(${d.id})">Delete</button></span></div>`).join('')||'<div class="empty">No discounts.</div>'}`}
function discountForm(id){const d=AD.d.find(x=>x.id===id)||{code:'',type:'percentage',amount:'',min_order:'',active:1,expires_at:''};A.innerHTML=`<h3>${id?'Edit':'Add'} discount</h3><form onsubmit="saveDiscount(event,${id||0})"><input id="code" placeholder="CODE" value="${esc(d.code)}" required><select id="type"><option value="percentage" ${d.type==='percentage'?'selected':''}>Percentage</option><option value="fixed" ${d.type==='fixed'?'selected':''}>Fixed EGP</option></select><input id="amount" type="number" step=".01" min="0" placeholder="Amount" value="${d.amount}"><input id="min" type="number" step=".01" min="0" placeholder="Minimum order" value="${d.min_order||0}"><input id="expires" type="datetime-local" value="${d.expires_at?String(d.expires_at).slice(0,16):''}"><label><input id="dactive" type="checkbox" ${d.active?'checked':''}> Active</label><button class="primary">Save discount</button></form>`}
async function saveDiscount(e,id){e.preventDefault();try{await api('/api/admin/discounts'+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify({code:code.value,type:type.value,amount:amount.value,min_order:min.value,expires_at:expires.value||null,active:dactive.checked})});await refreshAdmin();adminDiscounts();toast('Discount saved')}catch(x){alert(x.message)}}
async function deleteDiscount(id){if(!confirm('Delete this discount?'))return;try{await api('/api/admin/discounts/'+id,{method:'DELETE'});await refreshAdmin();adminDiscounts();toast('Discount deleted')}catch(x){alert(x.message)}}
function adminInventory(){A.innerHTML=`<h3>Digital code inventory</h3><form onsubmit="inv(event)"><select id="prod">${AD.p.filter(p=>p.delivery_type==='code').map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select><textarea id="codes" placeholder="One code per line"></textarea><button class="primary">Add codes</button></form><div>${AD.i.map(i=>`<div class="order"><span><b>${esc(i.product_name)}</b><br>${esc(i.code)} · ${esc(i.status)}</span><button class="danger" onclick="deleteCode(${i.id})">Delete</button></div>`).join('')||'<div class="empty">No codes yet.</div>'}</div>`}
async function inv(e){e.preventDefault();try{await api('/api/admin/inventory',{method:'POST',body:JSON.stringify({product_id:prod.value,codes:codes.value})});await refreshAdmin();adminInventory();toast('Codes added')}catch(x){alert(x.message)}}
async function deleteCode(id){if(!confirm('Delete this code?'))return;await api('/api/admin/inventory/'+id,{method:'DELETE'}).catch(()=>{});await refreshAdmin();adminInventory()}
async function adminCategories(){A.innerHTML=`<div class="admin-head"><h3>Categories</h3><button class="primary" onclick="categoryForm()">Add category</button></div>${AD.c.map(c=>`<div class="order"><span><b>${esc(c.name)}</b><br><small>${esc(c.slug)}</small></span><span><button onclick="categoryForm(${c.id})">Edit</button> <button class="danger" onclick="deleteCategory(${c.id})">Delete</button></span></div>`).join('')||'<div class="empty">No categories.</div>'}`}
function categoryForm(id){const c=AD.c.find(x=>x.id===id)||{name:''};A.innerHTML=`<h3>${id?'Edit':'Add'} category</h3><form onsubmit="saveCategory(event,${id||0})"><input id="catName" placeholder="Category name" value="${esc(c.name)}" required><button class="primary">Save category</button></form>`}
async function saveCategory(e,id){e.preventDefault();try{await api('/api/admin/categories'+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify({name:catName.value})});await refreshAdmin();await refreshStore();adminCategories();toast('Category saved')}catch(x){alert(x.message)}}
async function deleteCategory(id){if(!confirm('Delete this category? Products will become uncategorized.'))return;try{await api('/api/admin/categories/'+id,{method:'DELETE'});await refreshAdmin();await refreshStore();adminCategories();toast('Category deleted')}catch(x){alert(x.message)}}
async function adminSettings(){const s=await api('/api/admin/settings');A.innerHTML=`<h3>Payment methods</h3><p class="muted">Only enabled and configured methods appear at checkout.</p><form onsubmit="settings(event)"><label class="checkline"><input id="ei" type="checkbox" ${s.instapay_enabled!=='0'?'checked':''}> Enable InstaPay</label><input id="si" placeholder="InstaPay destination" value="${esc(s.instapay||'')}"><label class="checkline"><input id="ev" type="checkbox" ${s.vodafone_cash_enabled!=='0'?'checked':''}> Enable Vodafone Cash</label><input id="sv" placeholder="Vodafone Cash destination" value="${esc(s.vodafone_cash||'')}"><label class="checkline"><input id="et" type="checkbox" ${s.telda_enabled!=='0'?'checked':''}> Enable Telda</label><input id="st" placeholder="Telda destination" value="${esc(s.telda||'')}"><input id="sw" placeholder="WhatsApp number" value="${esc(s.whatsapp||'')}"><textarea id="ss" placeholder="Support text">${esc(s.support_text||'')}</textarea><button class="primary">Save payment settings</button></form>`}
async function settings(e){e.preventDefault();try{await api('/api/admin/settings',{method:'PUT',body:JSON.stringify({instapay_enabled:ei.checked?'1':'0',instapay:si.value,vodafone_cash_enabled:ev.checked?'1':'0',vodafone_cash:sv.value,telda_enabled:et.checked?'1':'0',telda:st.value,whatsapp:sw.value,support_text:ss.value})});S=await api('/api/settings/public');adminSettings();toast('Settings saved')}catch(x){alert(x.message)}}
async function refreshAdmin(){const [p,o,d,i,c]=await Promise.all([api('/api/admin/products'),api('/api/admin/orders'),api('/api/admin/discounts'),api('/api/admin/inventory'),api('/api/admin/categories')]);AD={p,o,d,i,c}}
async function refreshStore(){[P,C,S]=await Promise.all([api('/api/products'),api('/api/categories'),api('/api/settings/public')]);renderCats();render()}
function searchModal(){modal(`<h2>Search Kardivo</h2><input id="modalSearch" placeholder="Search products..." autofocus value="${esc(searchTerm)}" oninput="searchTerm=this.value.trim().toLowerCase();render()">`)}
function toast(s){const x=document.createElement('div');x.className='toast';x.textContent=s;document.body.appendChild(x);setTimeout(()=>x.remove(),2200)}
$('#searchBtn2').onclick=searchModal;
$('#sort').onchange=e=>{sortMode=e.target.value;render()};
$('#cart').onclick=()=>cartView();$('#account').onclick=account;boot();
