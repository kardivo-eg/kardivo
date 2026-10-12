const state = {
  products: [],
  categories: [],
  settings: {},
  cart: loadCart(),
  user: null,
  category: "all",
  query: "",
  sort: "featured",
  discovery: "all",
  currencyView: "EGP",
  checkoutAfterAuth: false,
  admin: { tab: "dashboard", data: {} },
};
const AR = {
  Cart: "السلة",
  Store: "المتجر",
  Deals: "العروض",
  "How it works": "إزاي بتطلب؟",
  "Track order": "تتبّع الطلب",
  Account: "حسابي",
  Home: "الرئيسية",
  Search: "بحث",
  STORE: "المتجر",
  "Search...": "دوّر...",
  Featured: "المميّز",
  "QUICK FILTERS": "فلاتر سريعة",
  "All products": "كل المنتجات",
  "Available now": "متاح دلوقتي",
  "On sale": "عليه خصم",
  "Manual delivery": "تسليم يدوي",
  "Showing {0} of {1} products": "عرض {0} من {1} منتج",
  "No products match these filters.": "مفيش منتجات مطابقة للفلاتر دي.",
  Newest: "الأحدث",
  "Price: low to high": "السعر: من الأقل للأعلى",
  "Price: high to low": "السعر: من الأعلى للأقل",
  Name: "الاسم",
  "Loading the catalog...": "بنحمّل المنتجات...",
  SUPPORT: "الدعم",
  ACCOUNT: "حسابك",
  "Orders & profile": "طلباتي وحسابي",
  "WhatsApp support": "الدعم على واتساب",
  All: "الكل",
  "★ Featured": "★ المميّز",
  "No products match that search.": "مفيش منتجات بالاسم ده.",
  "No products yet.": "لسه مفيش منتجات.",
  "Sold out": "خلصت الكمية",
  "{0} left": "فاضل {0}",
  "In stock": "متوفر",
  Ready: "جاهز",
  "View {0}": "شوف {0}",
  SALE: "خصم",
  Digital: "رقمي",
  Add: "ضيف",
  "Loading product...": "بنحمّل المنتج...",
  "DIGITAL PRODUCT": "منتج رقمي",
  "{0} in stock": "متوفر منه {0}",
  "Manual delivery": "تسليم يدوي",
  "No description has been added for this product yet.":
    "لسه مفيش وصف للمنتج ده.",
  "Add to cart": "ضيف للسلة",
  "Back to store": "ارجع للمتجر",
  "Product not found": "المنتج مش موجود",
  "Product not found.": "المنتج مش موجود.",
  "This product may have been removed or the link is outdated.":
    "ممكن المنتج ده اتشال أو اللينك قديم.",
  "Sold out.": "الكمية خلصت.",
  "Maximum {0} per order.": "الحد الأقصى {0} في الطلب الواحد.",
  "{0} added to cart.": "{0} اتضاف للسلة.",
  "Your cart": "السلة بتاعتك",
  "Your cart is empty. Humanity's oldest shopping problem.":
    "السلة فاضية… أقدم مشكلة في تاريخ التسوق!",
  "{0} each": "{0} للقطعة",
  Remove: "شيل",
  Subtotal: "المجموع",
  "Continue shopping": "كمّل تسوق",
  "Continue to checkout": "كمّل للدفع",
  "Orders are paused.": "الطلبات واقفة دلوقتي.",
  Checkout: "إتمام الطلب",
  "You can check out as a guest. To keep order history, log in or create an account before placing the order.":
    "تقدر تطلب كضيف من غير حساب. ولو عايز تحتفظ بسجل طلباتك، سجّل دخول أو اعمل حساب قبل ما تأكد الطلب.",
  "Your name": "اسمك",
  "Contact (WhatsApp or phone)": "رقم للتواصل (واتساب أو موبايل)",
  "WhatsApp or phone": "رقم الواتساب أو الموبايل",
  "Discount code": "كود الخصم",
  "Optional code": "الكود (اختياري)",
  Apply: "طبّق",
  Discount: "الخصم",
  Total: "الإجمالي",
  "Payment method": "طريقة الدفع",
  Back: "رجوع",
  "Place order": "أكّد الطلب",
  "Discount applied.": "الخصم اتطبّق.",
  "Enter a code to apply.": "اكتب كود الخصم الأول.",
  "Details shown after you order": "التفاصيل هتظهرلك بعد تأكيد الطلب",
  "No payment methods are available right now. Please contact support.":
    "مفيش طرق دفع متاحة دلوقتي. كلّم الدعم لو سمحت.",
  "Choose a payment method.": "اختار طريقة الدفع.",
  "Name and contact are required.": "الاسم ورقم التواصل مطلوبين.",
  "Order placed": "الطلب اتسجّل",
  "Order <b>{0}</b> created. Save this number.":
    "طلبك رقم <b>{0}</b> اتسجّل. احتفظ بالرقم ده.",
  "Total to pay": "المطلوب دفعه",
  Payment: "الدفع",
  "Send payment to": "حوّل المبلغ على",
  'Sign in to your account to view and follow this order.':
    "سجّل دخولك لحسابك لعرض تفاصيل الطلب ومتابعته.",
  "Open WhatsApp Support": "افتح واتساب الدعم",
  Done: "تمام",
  From: "ابتداءً من",
  left: "متبقي",
  optional: "اختياري",
  "Log in": "تسجيل الدخول",
  "Create account": "إنشاء حساب",
  "Continue as guest": "كمّل كضيف",
  "Checkout and payment remain in EGP.": "إتمام الطلب والدفع بالجنيه المصري.",
  "Switch price display to USD": "عرض الأسعار بالدولار الأمريكي",
  "Switch price display to EGP": "عرض الأسعار بالجنيه المصري",
  "Simple checkout": "إتمام طلب بسهولة",
  Email: "الإيميل",
  Password: "الباسورد",
  "Welcome back, {0}.": "نورتنا تاني يا {0}.",
  "Account created.": "الحساب اتعمل بنجاح.",
  "Hi, {0}": "أهلاً يا {0}",
  "Administrator account": "حساب أدمن",
  "Customer account": "حساب عميل",
  "Order history": "طلباتك السابقة",
  "No orders yet.": "لسه مفيش طلبات.",
  "Admin dashboard": "لوحة التحكم",
  "Log out": "تسجيل الخروج",
  "Logged out.": "اتسجّل خروجك.",
  "Payment: {0} · Delivery: {1} · {2}": "الدفع: {0} · التسليم: {1} · {2}",
  "Your codes": "أكوادك",
  Copy: "نسخ",
  "Copied.": "اتنسخ.",
  "Track your order": "تتبّع طلبك",
  "Order number": "رقم الطلب",
  "Contact you used (WhatsApp / phone / account email)":
    "رقم التواصل اللي استخدمته (واتساب / موبايل / إيميل الحساب)",
  "Find order": "دوّر على الطلب",
  "Delivery message": "رسالة التسليم",
  "Payment proof": "إثبات الدفع",
  "Upload payment proof": "ارفع إثبات الدفع",
  "Upload screenshot": "ارفع سكرين شوت",
  "Choose option": "اختار الخيار",
  "Choose options": "اختار الخيارات",
  Variant: "الخيار",
  Ready: "جاهز",
  "Manual delivery": "تسليم يدوي",
  "Mark paid & deliver": "علّم مدفوع وسلّم",
  "Image upload": "رفع صورة",
  "Name (Arabic)": "الاسم بالعربي",
  "Description (Arabic)": "الوصف بالعربي",
  "Category name (Arabic)": "اسم القسم بالعربي",
  "Variants / denominations": "الخيارات / الفئات",
  "Option name": "اسم الخيار",
  "No variants": "مفيش خيارات",
  "Proof uploaded.": "إثبات الدفع اترفع.",
  "Choose a file first.": "اختار ملف الأول.",
  "Upload image": "ارفع صورة",
  "Image uploaded.": "الصورة اترفعت.",
};
const ERR_AR = {
  "Cart is empty.": "السلة فاضية.",
  "Choose an enabled payment method.": "اختار طريقة دفع متاحة.",
  "Enter a valid name, email, and password of at least 8 characters.":
    "اكتب اسم وإيميل صح وباسورد 8 حروف على الأقل.",
  "Email already exists.": "الإيميل ده مسجّل قبل كده.",
  "Enter your order number and contact.": "اكتب رقم الطلب ورقم التواصل.",
  "Guest name and contact are required.": "الاسم ورقم التواصل مطلوبين.",
  "Invalid email or password.": "الإيميل أو الباسورد غلط.",
  "Login required.": "لازم تسجّل دخول الأول.",
  "No order matches those details.": "مفيش طلب بالبيانات دي.",
  "One of the products is no longer available.":
    "واحد من المنتجات ما بقاش متاح.",
  "Order not found.": "الطلب مش موجود.",
  "Product not found.": "المنتج مش موجود.",
  "This discount code is invalid, expired, or doesn't apply to your cart.":
    "كود الخصم ده غلط أو منتهي أو مش بينطبق على السلة بتاعتك.",
  "Too many attempts. Try again later.": "محاولات كتير. جرّب تاني بعد شوية.",
  "Too many login attempts. Try again in 15 minutes.":
    "محاولات دخول كتير. جرّب تاني بعد 15 دقيقة.",
  "Bad origin.": "الطلب ده مش مسموح.",
  "Too many order attempts. Try again later.":
    "محاولات طلب كتير. جرّب تاني بعد شوية.",
  "Admin access required.": "ده للأدمن بس.",
  "Not found": "مش موجود",
};
const STATUS_AR = {
  awaiting_payment: "مستني الدفع",
  paid: "اتدفع",
  failed: "الدفع فشل",
  refunded: "اتسترجع",
  pending: "قيد الانتظار",
  processing: "بيتجهّز",
  fulfilled: "اتسلّم",
  cancelled: "اتلغى",
};
const PAY_AR = {
  instapay: "إنستاباي",
  vodafone_cash: "فودافون كاش",
  telda: "تيلدا",
  store_credit: "رصيد المتجر",
  free: "مجاني",
};
const AR_V10 = {
  "Forgot password?": "نسيت الباسورد؟",
  "Reset your password": "إعادة تعيين الباسورد",
  "Enter your account email and we'll send you a reset link.": "اكتب إيميل حسابك وهنبعتلك لينك لإعادة التعيين.",
  "Send reset link": "ابعت اللينك",
  "If that email has an account, a reset link is on its way. Check your inbox.": "لو الإيميل ده عليه حساب، لينك إعادة التعيين في طريقه ليك. بص على الإنبوكس.",
  "Choose a new password": "اختار باسورد جديد",
  "New password (8+ characters)": "الباسورد الجديد (8 حروف على الأقل)",
  "Save password": "احفظ الباسورد",
  "Password changed. Log in with your new password.": "الباسورد اتغير. سجّل دخول بالباسورد الجديد.",
  "Use store credit": "استخدم رصيد المتجر",
  "Transfer reference": "رقم مرجع التحويل",
  "Transfer reference (optional)": "رقم مرجع التحويل (اختياري)",
  "Reference number from the transfer receipt": "الرقم المكتوب في إيصال التحويل",
  "Store credit": "رصيد المتجر",
  "Automatic offer applied.": "العرض اتطبّق تلقائياً.",
  "Nothing to pay. Your order is confirmed and will be delivered shortly.": "مفيش حاجة تدفعها. طلبك اتأكد وهيتسلّم قريب.",
  "Proof received": "وصل إثبات الدفع",
  Paid: "اتدفع",
  Delivered: "اتسلّم",
  Cancelled: "اتلغى",
  "Payment failed": "الدفع فشل",
  Refunded: "اتسترجع",
  Support: "الدعم",
  You: "إنت",
  "No messages yet. Ask us anything about this order.": "لسه مفيش رسايل. اسألنا في أي حاجة عن الطلب ده.",
  "Write a message...": "اكتب رسالة...",
  Send: "ابعت",
  "Messages with support": "المراسلة مع الدعم",
  Review: "قيّم",
  "Leave a review": "اكتب تقييم",
  Rating: "التقييم",
  "How was it?": "كان عامل إزاي؟",
  Photo: "صورة",
  Cancel: "إلغاء",
  Submit: "ابعت",
  "Review submitted for approval.": "التقييم اتبعت للمراجعة.",
  "Invite friends, earn credit": "ادعو صحابك واكسب رصيد",
  "Friends get {0}% off their first order. You get {1} store credit when their order is delivered.": "صحابك ياخدوا خصم {0}% على أول طلب. وإنت بتاخد {1} رصيد في المتجر لما طلبهم يتسلّم.",
  "Copy link": "انسخ اللينك",
  "Friends who ordered": "صحابك اللي طلبوا",
  Notifications: "الإشعارات",
  "Use my code {0} for {1}% off your first order: {2}": "استخدم الكود بتاعي {0} واخد خصم {1}% على أول طلب: {2}",
  "Customer reviews": "تقييمات العملاء",
  "Sold out right now": "الكمية خلصت دلوقتي",
  "Leave your email or WhatsApp number and we'll tell you when it's back.": "سيب إيميلك أو رقم الواتساب وهنعرّفك أول ما يرجع.",
  "Email or WhatsApp number": "الإيميل أو رقم الواتساب",
  "Notify me": "عرّفني",
  "Enter an email or WhatsApp number.": "اكتب إيميل أو رقم واتساب.",
  "Done! We'll let you know when it's back.": "تمام! هنعرّفك أول ما يرجع.",
  "You may also like": "ممكن يعجبك كمان",
  "Recently viewed": "اللي شفته مؤخراً",
  "Verified customer": "عميل موثّق",
  CUSTOMERS: "العملاء",
  "What customers say": "العملاء بيقولوا إيه",
  "Install app": "ثبّت التطبيق",
};
const ERR_AR_V10 = {
  "This code is only valid on your first order.": "الكود ده شغال على أول طلب بس.",
  "You can't use your own referral code.": "مينفعش تستخدم كود الدعوة بتاعك.",
  "Your store credit balance changed. Review the total and try again.": "رصيدك اتغيّر. راجع الإجمالي وجرّب تاني.",
  "This order doesn't need a payment proof.": "الطلب ده مش محتاج إثبات دفع.",
  "This reset link is invalid or has expired. Request a new one.": "لينك إعادة التعيين غلط أو منتهي. اطلب لينك جديد.",
  "New password must be at least 8 characters.": "الباسورد الجديد لازم يكون 8 حروف على الأقل.",
  "Password reset by email isn't set up yet. Contact support.": "إعادة التعيين بالإيميل مش متفعّلة لسه. كلّم الدعم.",
  "Write a message first.": "اكتب رسالة الأول.",
  "Order verification failed.": "فشل التحقق من الطلب.",
  "Upload a JPG, PNG or WEBP photo.": "ارفع صورة JPG أو PNG أو WEBP.",
  "Photo must be 5 MB or smaller.": "الصورة لازم تكون 5 ميجا أو أقل.",
  "You can only review products you purchased and paid for.": "تقدر تقيّم المنتجات اللي اشتريتها ودفعت تمنها بس.",
  "You already reviewed this purchase.": "إنت قيّمت الشراء ده قبل كده.",
  "A verified order is required.": "لازم يكون عندك طلب موثّق.",
  "Enter an email or WhatsApp number.": "اكتب إيميل أو رقم واتساب.",
  "Upload a JPG, PNG, WEBP, or GIF image.": "ارفع صورة JPG أو PNG أو WEBP أو GIF.",
};
state.lang = (() => {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "ar") localStorage.setItem("kardivo_lang", q);
    return localStorage.getItem("kardivo_lang") === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
})();
function t(k, ...a) {
  const s = (state.lang === "ar" && !state.adminOpen && AR[k]) || k;
  return a.length ? s.replace(/\{(\d)\}/g, (_, i) => a[i] ?? "") : s;
}
function S(k) {
  const s = state.settings;
  if (k === "trust_1") {
    if (state.lang === "ar" && /اطلب كضيف/.test(String(s.trust_1_ar || ""))) return "✓ اطلب بسهولة";
    if (/guest checkout/i.test(String(s.trust_1 || ""))) return "✓ Simple checkout";
  }
  if (state.lang === "ar") {
    const a = s[k + "_ar"];
    if (a != null && String(a).trim() !== "") return a;
  }
  return s[k];
}
function tr(m) {
  if (state.lang !== "ar" || state.adminOpen) return m;
  if (ERR_AR[m]) return ERR_AR[m];
  let x;
  if ((x = /^Not enough stock for (.+)\.$/.exec(m)))
    return `مفيش كمية كفاية من ${x[1]}.`;
  if ((x = /^Choose an option for (.+)\.$/.exec(m)))
    return `اختار الخيار المطلوب لـ ${x[1]}.`;
  if ((x = /^Request failed \((\d+)\)$/.exec(m)))
    return `حصلت مشكلة في الطلب (${x[1]}).`;
  if (/failed to fetch|networkerror|load failed/i.test(m))
    return "الاتصال بالسيرفر فشل. اتأكد من النت وجرّب تاني.";
  return m;
}
const arrow = () => (state.lang === "ar" ? "↖" : "↗");
const dlv = (p) =>
  state.lang === "ar"
    ? p.delivery_type === "code"
      ? "كود رقمي"
      : "تسليم يدوي"
    : p.delivery_type;
const statusName = (x) => {
  const k = String(x || "");
  return state.lang === "ar" && STATUS_AR[k]
    ? STATUS_AR[k]
    : k.replace(/_/g, " ");
};
function translateStatic(root = document) {
  root
    .querySelectorAll("[data-i18n]")
    .forEach((el) => (el.textContent = t(el.dataset.i18n)));
  root
    .querySelectorAll("[data-i18n-ph]")
    .forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
  root
    .querySelectorAll("[data-i18n-aria]")
    .forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  root
    .querySelectorAll("[data-arrow]")
    .forEach((el) => (el.textContent = arrow()));
}
function setDir() {
  const h = document.documentElement,
    ar = state.lang === "ar";
  h.lang = state.lang;
  h.dir = ar ? "rtl" : "ltr";
  const b = $("#langBtn");
  if (b) {
    b.textContent = ar ? "EN" : "AR";
    b.title = ar ? "Switch to English" : "التبديل للعربي";
    b.setAttribute("aria-label", b.title);
  }
  updateCurrencyButton();
}
function applyLang() {
  setDir();
  translateStatic();
  if (!state.ready) return;
  applySettings();
  renderFooter();
  renderCartCount();
  if (isProductRoute())
    openProductPage(
      decodeURIComponent(location.pathname.slice(1)).replace(/\/$/, ""),
    );
  else {
    renderCategories();
    renderCategoryCards();
    renderPopularProducts();
    renderProducts();
    renderTestimonials();
  }
}
function setLang(l) {
  state.lang = l === "en" ? "en" : "ar";
  try {
    localStorage.setItem("kardivo_lang", state.lang);
  } catch {}
  try {
    const u = new URL(location.href);
    if (state.lang === "en") u.searchParams.set("lang", "en");
    else u.searchParams.delete("lang");
    history.replaceState({}, "", u.pathname + u.search + u.hash);
  } catch {}
  applyLang();
}
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const logo =
  "https://i.ibb.co/rRqtGKkw/0db84367-e795-4617-835e-5e0a2bf2ff45.jpg";
// Stock fallback artwork keeps the storefront visual even when a product has no uploaded image
// or an older third-party image URL has gone offline. These are generic gaming visuals, not product claims.
const STOCK_ART = [
  "https://images.pexels.com/photos/7776883/pexels-photo-7776883.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-7776883.jpg&fm=jpg",
  "https://images.unsplash.com/photo-1610561212775-b191f21b6998?auto=format&fit=crop&fm=jpg&q=80&w=1200",
  "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&fm=jpg&q=80&w=1200",
];
const stockArtFor = (item) => {
  const id = Math.abs(Number(item?.id) || 0);
  const label = `${item?.name || ""} ${item?.category_name || ""} ${item?.category_name_ar || ""} ${item?.platform || ""}`.toLowerCase();
  if (/gift|card|رصيد|كارت|بطاقة/.test(label)) return STOCK_ART[1];
  if (/subscription|اشتراك|plus|pass|membership/.test(label)) return STOCK_ART[2];
  return STOCK_ART[id % STOCK_ART.length];
};
const stockImg = (url, alt, fallback = STOCK_ART[0], className = "") => {
  const src = String(url || fallback).trim();
  const safeFallback = escapeHTML(fallback);
  return `<img${className ? ` class="${escapeHTML(className)}"` : ""} src="${escapeHTML(src)}" alt="${escapeHTML(alt || "")}" loading="lazy" data-stock-fallback="${safeFallback}" onerror="if(this.dataset.stockFallback&&this.src!==this.dataset.stockFallback){this.src=this.dataset.stockFallback;this.dataset.stockFallback=''}else{this.remove()}">`;
};
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("kardivo_cart") || "[]");
  } catch {
    return [];
  }
}
function saveCart() {
  try {
    localStorage.setItem("kardivo_cart", JSON.stringify(state.cart));
  } catch {}
  renderCartCount();
}
function checkoutSession() {
  try {
    let k = localStorage.getItem("kardivo_checkout_session");
    if (!k) {
      k = crypto.randomUUID();
      localStorage.setItem("kardivo_checkout_session", k);
    }
    return k;
  } catch {
    return "anon";
  }
}
function toLocalInput(v) {
  const d = new Date(v);
  if (!v || isNaN(d)) return "";
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}
function cartRowValid(i, products) {
  const p = products.find((x) => x.id === i.product_id);
  if (!p) return false;
  const vs = (p.variants || []).filter((v) => Number(v.active) !== 0);
  if (!vs.length) return !i.variant_id;
  return vs.some((v) => Number(v.id) === Number(i.variant_id));
}
function escapeHTML(v) {
  return String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}
function moneyEGP(v) {
  const c = state.lang === "ar" && !state.adminOpen ? "ج.م" : (state.settings.store_currency || "EGP");
  return `${Number(v || 0).toFixed(2)} ${c}`;
}
function money(v) {
  const amount = Number(v || 0);
  if (!state.adminOpen && state.currencyView === "USD") {
    const rate = Math.max(0.01, Number(state.settings.usd_exchange_rate) || 50);
    return `$${(amount / rate).toFixed(2)} USD`;
  }
  return moneyEGP(amount);
}
function updateCurrencyButton() {
  const b = $("#currencyBtn");
  if (!b) return;
  const toUSD = state.currencyView !== "USD";
  b.textContent = toUSD ? "USD" : "EGP";
  b.title = t(toUSD ? "Switch price display to USD" : "Switch price display to EGP");
  b.setAttribute("aria-label", b.title);
}
function toggleCurrency() {
  state.currencyView = state.currencyView === "EGP" ? "USD" : "EGP";
  updateCurrencyButton();
  // A click before API boot completes is still honored; boot will render using this state.
  if (!state.ready) return;
  if (isProductRoute()) {
    openProductPage(decodeURIComponent(location.pathname.slice(1)).replace(/\/$/, ""));
    return;
  }
  renderCategories();
  renderCategoryCards();
  renderPopularProducts();
  renderProducts();
  renderSearchSuggestions();
}
function pName(p) {
  return state.lang === "ar" && String(p?.name_ar || "").trim()
    ? p.name_ar
    : p?.name || "";
}
function pDesc(p) {
  return state.lang === "ar" && String(p?.description_ar || "").trim()
    ? p.description_ar
    : p?.description || "";
}
function cName(c) {
  return state.lang === "ar" && String(c?.name_ar || "").trim()
    ? c.name_ar
    : c?.name || "";
}
function variantStock(p, v) {
  return Number(v?.stock ?? 0);
}
function cartKey(i) {
  return `${i.product_id}:${i.variant_id || 0}`;
}
function slugifyClient(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => el.classList.remove("show"), 2800);
}
async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: "same-origin",
    ...options,
    headers: { "content-type": "application/json", ...(options.headers || {}) },
  });
  let body = {};
  try {
    body = await res.json();
  } catch {}
  if (!res.ok)
    throw new Error(tr(body.error || `Request failed (${res.status})`));
  return body;
}
async function boot() {
  homeHTML = $("main").innerHTML;
  $("#year").textContent = new Date().getFullYear();
  const qs = new URLSearchParams(location.search);
  try {
    if (qs.get("ref")) localStorage.setItem("kardivo_ref", qs.get("ref").toUpperCase().slice(0, 20));
  } catch {}
  try {
    const [products, categories, settings, me] = await Promise.all([
      api("/api/products"),
      api("/api/categories"),
      api("/api/settings/public"),
      api("/api/me"),
    ]);
    state.products = products;
    state.categories = categories;
    state.settings = settings;
    state.user = me.user;
    state.cart = state.cart.filter((i) => cartRowValid(i, products));
    saveCart();
    applySettings();
    renderCampaign();
    renderFooter();
    renderCartCount();
    await route();
    state.ready = true;
    updateCurrencyButton();
    if (location.hash === "#account") openAccount();
    if (qs.get("reset")) {
      openReset(qs.get("reset"));
      history.replaceState({}, "", location.pathname + location.hash);
    } else if (qs.get("track")) {
      // Legacy public tracking links now lead to the customer account instead.
      history.replaceState({}, "", location.pathname + "#account");
      if (state.user) openAccount();
    }
    if (state.user?.role === "admin") {
      const oid = Number(qs.get("admin_order"));
      if (oid || qs.get("admin_tab")) {
        if (qs.get("admin_tab")) state.admin.tab = qs.get("admin_tab");
        await openAdmin();
        if (oid) orderForm(oid);
      }
    }
  } catch (e) {
    console.error(e);
    toast(tr(e.message));
  }
}
function renderFooter() {
  const s = state.settings,
    w = String(s.whatsapp || "").replace(/\D/g, ""),
    parts = [];
  if (w)
    parts.push(
      `<a href="https://wa.me/${w}" target="_blank" rel="noreferrer">${t("WhatsApp support")}</a>`,
    );
  if (s.support_email)
    parts.push(
      `<a href="mailto:${escapeHTML(s.support_email)}">${escapeHTML(s.support_email)}</a>`,
    );
  $("#footerSupport").innerHTML = parts.length
    ? parts.join("<br>")
    : escapeHTML(S("support_text") || "");
  const soc = [
    ["instagram", "Instagram"],
    ["facebook", "Facebook"],
    ["tiktok", "TikTok"],
  ].filter(([k]) => /^https?:\/\//i.test(s[k] || ""));
  $("#footerSocial").innerHTML = soc
    .map(
      ([k, n]) =>
        `<a href="${escapeHTML(s[k])}" target="_blank" rel="noreferrer">${n}</a>`,
    )
    .join(" · ");
}
function categoryArtworkMap() {
  try {
    const value = state.settings.category_artwork || "{}";
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch { return {}; }
}
function renderHeroShowcase() { /* Hero intentionally uses the original logo only. */ }

function productAvailable(p) {
  if (p.delivery_type !== "code") return true;
  const active = (p.variants || []).filter(v => Number(v.active) !== 0);
  return active.length ? active.some(v => Number(v.stock || 0) > 0) : Number(p.stock || 0) > 0;
}
function productOnSale(p) {
  if (Number(p.old_price || 0) > Number(p.price || 0)) return true;
  return (p.variants || []).some(v => Number(v.active) !== 0 && Number(v.old_price || 0) > Number(v.price || 0));
}
function renderSmartFilters() {
  const el = $("#smartFilters");
  if (!el) return;
  const options = [
    ["all", t("All products")],
    ["available", t("Available now")],
    ["sale", t("On sale")],
    ["manual", t("Manual delivery")],
  ];
  el.innerHTML = options.map(([key, label]) => `<button type="button" class="smart-filter ${state.discovery === key ? "active" : ""}" data-discovery="${key}">${escapeHTML(label)}${key === "sale" ? `<span class="filter-spark">✦</span>` : ""}</button>`).join("");
  el.querySelectorAll("[data-discovery]").forEach(b => b.addEventListener("click", () => {
    state.discovery = b.dataset.discovery;
    renderSmartFilters();
    renderProducts();
  }));
}
function searchScore(p, query) {
  const normalize = value => String(value || "").toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const name = normalize(pName(p));
  const hay = normalize(`${pName(p)} ${pDesc(p)} ${p.platform || ""} ${p.region || ""} ${cName({name:p.category_name,name_ar:p.category_name_ar})}`);
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return 0;
  if (tokens.every(token => hay.includes(token))) return tokens.reduce((score, token) => score + (name.startsWith(token) ? 8 : name.includes(token) ? 5 : 2), 0);
  return -1;
}
function renderCampaign() {
  const section = $("#campaignSection");
  if (!section) return;
  const enabledValue = state.settings.campaign_enabled;
  // Missing legacy settings should not silently hide the banner; only an explicit admin "off" hides it.
  const enabled = enabledValue == null ? true : String(enabledValue) === "1";
  const fallbackTitle = state.lang === "ar" ? "عروض وأساسيات الجيمينج في مكان واحد" : "Your next gaming upgrade starts here.";
  const fallbackText = state.lang === "ar" ? "اكتشف المنتجات الرقمية والعروض المتاحة دلوقتي." : "Discover digital gaming essentials and current offers.";
  const title = String(S("campaign_title") || fallbackTitle).trim();
  const image = String(state.settings.campaign_image || "").trim();
  const link = String(state.settings.campaign_link || "/#store").trim();
  section.hidden = !enabled || !title;
  const titleEl = section.querySelector('[data-s="campaign_title"]');
  const textEl = section.querySelector('[data-s="campaign_text"]');
  const eyebrowEl = section.querySelector('[data-s="campaign_eyebrow"]');
  const ctaEl = section.querySelector('[data-s="campaign_cta"]');
  if (titleEl && !String(S("campaign_title") || "").trim()) titleEl.textContent = fallbackTitle;
  if (textEl && !String(S("campaign_text") || "").trim()) textEl.textContent = fallbackText;
  if (eyebrowEl && !String(S("campaign_eyebrow") || "").trim()) eyebrowEl.textContent = state.lang === "ar" ? "عروض كارديفو" : "THE KARDIVO DROP";
  if (ctaEl && !String(S("campaign_cta") || "").trim()) ctaEl.textContent = state.lang === "ar" ? "اكتشف المنتجات" : "Explore the store";
  const cta = $("#campaignCta");
  if (cta) cta.href = /^(https?:\/\/|\/#|\/product\/|\/)/i.test(link) ? link : "/#store";
  const art = $("#campaignArt");
  if (art) {
    const artwork = image && /^https?:\/\//i.test(image) ? image : STOCK_ART[0];
    art.style.backgroundImage = `linear-gradient(90deg,#100b1bf0 0%,#100b1b9c 45%,#100b1b20 100%),url("${artwork.replace(/["\\]/g, "")}")`;
  }
}
function renderSearchSuggestions() {
  const box = $("#searchSuggestions"), input = $("#search");
  if (!box || !input) return;
  const q = input.value.trim().toLowerCase();
  if (q.length < 2) { box.hidden = true; box.innerHTML = ""; return; }
  const matches = state.products.map(p => ({ p, score: searchScore(p, q) })).filter(x => x.score >= 0).sort((a, b) => b.score - a.score || Number(b.p.featured || 0) - Number(a.p.featured || 0)).slice(0, 5).map(x => x.p);
  box.innerHTML = matches.map((p) => `<a class="search-suggestion" href="/${encodeURIComponent(p.slug || p.id)}" data-suggestion-product="${p.id}">${stockImg(p.image_url, "", stockArtFor(p))}<span class="suggestion-copy"><b>${escapeHTML(pName(p))}</b><small>${escapeHTML(cName({name:p.category_name,name_ar:p.category_name_ar}) || (state.lang === "ar" ? "منتج رقمي" : "Digital product"))}</small></span><strong>${money(Number(p.price || 0))}</strong></a>`).join("") || `<div class="search-suggestion-empty">${state.lang === "ar" ? "مفيش نتائج مطابقة. جرّب اسم تاني." : "No matching products. Try another search."}</div>`;
  box.hidden = false;
}
function renderCategoryCards() {
  const el = $("#categoryCards");
  if (!el) return;
  const map = categoryArtworkMap();
  const categories = state.categories.filter((c) => state.products.some((p) => String(p.category_id) === String(c.id)));
  el.innerHTML = categories.map((c) => {
    const product = state.products.find((p) => String(p.category_id) === String(c.id) && p.image_url);
    const fallbackProduct = state.products.find((p) => String(p.category_id) === String(c.id));
    const art = String(map[c.id] || (product && product.image_url) || stockArtFor({ ...c, id: c.id, name: c.name, category_name: c.name }));
    const name = cName(c);
    const count = state.products.filter((p) => String(p.category_id) === String(c.id)).length;
    const subtitle = state.lang === "ar" ? `${count} منتج` : `${count} ${count === 1 ? "product" : "products"}`;
    return `<button class="category-card" type="button" data-category-card="${escapeHTML(c.id)}" aria-label="${escapeHTML(name)}"><div class="category-art">${stockImg(art, "", stockArtFor(fallbackProduct || c))}</div><div class="category-card-content"><div><h3>${escapeHTML(name)}</h3><p>${subtitle}</p></div><span class="cat-arrow" aria-hidden="true">${arrow()}</span></div></button>`;
  }).join("");
  el.querySelectorAll("[data-category-card]").forEach((b) => b.addEventListener("click", () => {
    state.category = String(b.dataset.categoryCard);
    renderCategories();
    renderProducts();
    $("#store")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  const section = $("#categoryDiscovery");
  if (section) section.hidden = categories.length === 0;
}
function renderPopularProducts() {
  const el = $("#popularProducts");
  if (!el) return;
  const chosen = state.products.filter((p) => Number(p.featured)).slice(0, 4);
  el.innerHTML = chosen.map((p) => {
    const variants = (p.variants || []).filter((v) => Number(v.active) !== 0);
    const price = variants.length ? Math.min(...variants.map((v) => Number(v.price))) : Number(p.price || 0);
    const old = Number(p.old_price || 0);
    const name = pName(p);
    const cat = cName({ name: p.category_name, name_ar: p.category_name_ar });
    const img = stockImg(p.image_url, name, stockArtFor(p));
    return `<a class="popular-product" href="/${encodeURIComponent(p.slug || p.id)}"><div class="popular-product-image">${img}</div><div class="popular-product-copy"><span class="popular-product-category">${escapeHTML(cat || (state.lang === "ar" ? "منتج رقمي" : "Digital product"))}</span><span class="popular-product-name">${escapeHTML(name)}</span><span class="popular-product-price">${money(price)}${old > price ? `<del>${money(old)}</del>` : ""}</span></div></a>`;
  }).join("");
  const section = $("#popularSection");
  if (section) section.hidden = chosen.length === 0;
}
function renderCategories() {
  const el = $("#categories");
  if (!el) return;
  el.innerHTML =
    `<button class="chip ${state.category === "all" ? "active" : ""}" data-cat="all">${t("All")}</button>` +
    (state.products.some((p) => Number(p.featured))
      ? `<button class="chip ${state.category === "featured" ? "active" : ""}" data-cat="featured">${t("★ Featured")}</button>`
      : "") +
    state.categories
      .map(
        (c) =>
          `<button class="chip ${String(state.category) === String(c.id) ? "active" : ""}" data-cat="${c.id}">${escapeHTML(cName(c))}</button>`,
      )
      .join("");
  $$(".chip").forEach(
    (b) =>
      (b.onclick = () => {
        state.category = b.dataset.cat;
        $$(".chip").forEach((x) => x.classList.toggle("active", x === b));
        renderProducts();
      }),
  );
}
function filtered() {
  let arr = [...state.products];
  if (state.discovery === "available") arr = arr.filter(productAvailable);
  else if (state.discovery === "sale") arr = arr.filter(productOnSale);
  else if (state.discovery === "manual") arr = arr.filter(p => p.delivery_type === "manual");
  if (state.category === "featured")
    arr = arr.filter((p) => Number(p.featured));
  else if (state.category !== "all")
    arr = arr.filter((p) => String(p.category_id) === String(state.category));
  const q = state.query.toLowerCase();
  if (q)
    arr = arr.map(p => ({ p, score: searchScore(p, q) })).filter(x => x.score >= 0).sort((a, b) => b.score - a.score).map(x => x.p);
  switch (state.sort) {
    case "newest":
      arr.sort((a, b) => b.id - a.id);
      break;
    case "price-low":
      arr.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      arr.sort((a, b) => b.price - a.price);
      break;
    case "name":
      arr.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      if (!q) arr.sort((a, b) => Number(b.featured || 0) - Number(a.featured || 0) || Number(b.id || 0) - Number(a.id || 0));
  }
  return arr;
}
function renderProducts() {
  const el = $("#productGrid");
  if (!el) return;
  const arr = filtered();
  const summary = $("#discoverySummary");
  if (summary) summary.textContent = t("Showing {0} of {1} products", arr.length, state.products.length);
  if (!arr.length) {
    el.innerHTML = `<div class="loading-card">${state.products.length ? (state.discovery !== "all" ? t("No products match these filters.") : t("No products match that search.")) : t("No products yet.")}</div>`;
    return;
  }
  const showStock = state.settings.show_stock !== false;
  el.innerHTML = arr
    .map((p) => {
      const variants = (p.variants || []).filter((v) => Number(v.active) !== 0),
        cheapest = variants.length
          ? variants.reduce((a, v) => (Number(v.price) < Number(a.price) ? v : a))
          : null,
        displayPrice = cheapest ? Number(cheapest.price) : Number(p.price),
        displayOld = cheapest
          ? Number(cheapest.old_price || 0)
          : Number(p.old_price || 0),
        sale = displayOld > displayPrice,
        totalStock = variants.length
          ? variants.reduce((n, v) => n + Number(v.stock || 0), 0)
          : Number(p.stock),
        soldOut = p.delivery_type === "code" && totalStock <= 0,
        badge = soldOut
          ? t("Sold out")
          : p.delivery_type === "code"
            ? showStock
              ? t("{0} left", totalStock)
              : t("In stock")
            : t("Ready"),
        href = "/" + encodeURIComponent(p.slug),
        name = pName(p),
        cat = cName({ name: p.category_name, name_ar: p.category_name_ar });
      return `<article class="product-card product-card-link"><a class="product-card-anchor" href="${href}" aria-label="${escapeHTML(t("View {0}", name))}"><div class="product-image">${stockImg(p.image_url, name, stockArtFor(p))}${sale ? `<span class="sale">${t("SALE")}</span>` : ""}<span class="stock">${badge}</span></div><div class="product-body"><div class="product-cat">${escapeHTML(cat || t("Digital"))}</div><div class="product-name" title="${escapeHTML(name)}">${escapeHTML(name)}</div><div class="product-meta">${escapeHTML([p.platform, p.region].filter(Boolean).join(" · ") || dlv(p))}</div></div></a><div class="price-row"><div class="price">${variants.length ? `${t("From")} ` : ""}${money(displayPrice)}${sale ? `<span class="old">${money(displayOld)}</span>` : ""}</div><button type="button" class="add-btn" data-add="${p.id}" ${soldOut ? "disabled" : ""}>${soldOut ? t("Sold out") : variants.length ? t("Choose options") : t("Add")}</button></div></article>`;
    })
    .join("");
  $$("[data-add]").forEach(
    (b) =>
      (b.onclick = () => {
        const p = state.products.find((x) => x.id === Number(b.dataset.add));
        if (p?.variants?.length) navigate("/" + encodeURIComponent(p.slug));
        else addToCart(Number(b.dataset.add));
      }),
  );
}
async function openProductPage(slug) {
  document.body.classList.add("product-route");
  const main = $("main");
  main.innerHTML = `<section class="product-page container"><div class="product-page-loading loading-card">${t("Loading product...")}</div></section>`;
  window.scrollTo(0, 0);
  try {
    const p = await api(`/api/products/${encodeURIComponent(slug)}`),
      variants = (p.variants || []).filter((v) => Number(v.active) !== 0),
      sn = state.settings.store_name || "Kardivo",
      name = pName(p),
      desc = pDesc(p),
      totalStock = variants.length
        ? variants.reduce((n, v) => n + Number(v.stock || 0), 0)
        : Number(p.stock),
      soldOut =
        p.delivery_type === "code" &&
        (variants.length ? totalStock <= 0 : Number(p.stock) <= 0);
    document.title = `${name} | ${sn}`;
    const first = variants[0],
      price = variants.length ? Number(first.price) : Number(p.price),
      old = variants.length
        ? Number(first.old_price || 0)
        : Number(p.old_price || 0);
    main.innerHTML = `<section class="product-page container"><div class="product-breadcrumb"><a href="/" data-home>${t("Store")}</a><span>/</span><span>${escapeHTML(name)}</span></div><div class="product-detail"><div class="product-detail-media">${stockImg(p.image_url, name, stockArtFor(p))}</div><div class="product-detail-copy"><span class="eyebrow">${escapeHTML(cName({ name: p.category_name, name_ar: p.category_name_ar }) || t("DIGITAL PRODUCT"))}</span><h1>${escapeHTML(name)}</h1><div class="product-detail-price" id="productPrice">${money(price)} ${old > price ? `<del>${money(old)}</del>` : ""}</div><div class="product-detail-meta">${[
      p.platform,
      p.region,
      p.delivery_type === "code"
        ? state.settings.show_stock !== false
          ? t("{0} in stock", totalStock)
          : soldOut
            ? t("Sold out")
            : t("In stock")
        : t("Manual delivery"),
    ]
      .filter(Boolean)
      .map((x) => `<span>${escapeHTML(x)}</span>`)
      .join(
        "",
      )}</div>${variants.length ? `<div class="field" style="margin:18px 0"><label>${t("Choose option")}</label><select id="productVariant">${variants.map((v, i) => `<option value="${v.id}" ${i === 0 ? "selected" : ""} data-price="${v.price}" data-old="${v.old_price || 0}" data-stock="${v.stock || 0}">${escapeHTML(v.name)}${p.delivery_type === "code" && state.settings.show_stock !== false ? ` — ${v.stock || 0} ${t("left")}` : ""}</option>`).join("")}</select></div>` : ""}<div class="product-description">${desc ? escapeHTML(desc).replace(/\n/g, "<br>") : t("No description has been added for this product yet.")}</div>${(p.reviews || []).length ? `<div class="admin-panel" style="margin-top:20px"><h3>${t("Customer reviews")}</h3>${p.reviews.map((r) => `<div class="line" style="padding:10px 0"><span><b>${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</b><br><small>${escapeHTML(r.user_name || "Verified customer")}</small></span><span style="max-width:55%">${escapeHTML(r.body || "")}${r.photo ? `<br><a href="${escapeHTML(r.photo)}" target="_blank" rel="noreferrer"><img class="review-photo" loading="lazy" src="${escapeHTML(r.photo)}" alt=""></a>` : ""}</span></div>`).join("")}</div>` : ""}<div class="notify-box" id="notifyBox" hidden><b>${t("Sold out right now")}</b><br><small>${t("Leave your email or WhatsApp number and we'll tell you when it's back.")}</small><div style="display:flex;gap:8px;margin-top:8px"><input id="notifyContact" placeholder="${t("Email or WhatsApp number")}" style="flex:1"><button class="btn ghost" id="notifyBtn" type="button">${t("Notify me")}</button></div></div><div class="product-detail-actions"><button class="btn primary" id="productAdd" ${soldOut ? "disabled" : ""}>${soldOut ? t("Sold out") : variants.length ? t("Add to cart") : t("Add to cart")}</button><a class="btn ghost" href="/" data-home>${t("Back to store")}</a></div></div></div></section>`;
    const updateVariant = () => {
      const sel = $("#productVariant");
      if (!sel) {
        $("#notifyBox").hidden = !soldOut;
        return;
      }
      const o = sel.selectedOptions[0],
        pr = Number(o.dataset.price),
        ol = Number(o.dataset.old);
      $("#productPrice").innerHTML =
        `${money(pr)} ${ol > pr ? `<del>${money(ol)}</del>` : ""}`;
      const st = p.delivery_type === "code" && Number(o.dataset.stock) <= 0;
      $("#productAdd").disabled = st;
      $("#notifyBox").hidden = !st;
      $("#productAdd").textContent = st ? t("Sold out") : t("Add to cart");
    };
    $("#productVariant")?.addEventListener("change", updateVariant);
    updateVariant();
    $("#notifyBtn").onclick = async () => {
      const contact = $("#notifyContact").value.trim();
      if (contact.length < 5) return toast(t("Enter an email or WhatsApp number."));
      try {
        await api("/api/stock-subscribe", {
          method: "POST",
          body: JSON.stringify({
            product_id: p.id,
            variant_id: $("#productVariant")?.value ? Number($("#productVariant").value) : null,
            contact,
            lang: state.lang,
          }),
        });
        $("#notifyBox").innerHTML = `<div class="success-text">${t("Done! We'll let you know when it's back.")}</div>`;
      } catch (e) {
        toast(e.message);
      }
    };
    renderRecommendations(p);
    $("#productAdd").onclick = () =>
      addToCart(
        p.id,
        $("#productVariant")?.value ? Number($("#productVariant").value) : null,
      );
  } catch (e) {
    document.title = t("Product not found");
    main.innerHTML = `<section class="product-page container"><div class="empty product-not-found"><span class="eyebrow">404</span><h1>${t("Product not found.")}</h1><p>${t("This product may have been removed or the link is outdated.")}</p><a class="btn primary" href="/" data-home>${t("Back to store")}</a></div></section>`;
  }
}
function recentList() {
  try {
    return JSON.parse(localStorage.getItem("kardivo_recent") || "[]");
  } catch {
    return [];
  }
}
function miniCard(p) {
  const vs = (p.variants || []).filter((v) => Number(v.active) !== 0),
    price = vs.length ? Math.min(...vs.map((v) => Number(v.price))) : Number(p.price);
  return `<a class="mini-card" href="/${encodeURIComponent(p.slug)}"><div class="mini-img">${p.image_url ? `<img src="${escapeHTML(p.image_url)}" alt="" loading="lazy">` : `<span>K</span>`}</div><b>${escapeHTML(pName(p))}</b><small>${vs.length ? t("From") + " " : ""}${money(price)}</small></a>`;
}
// "Recently viewed" comes from this browser; "You may also like" scores category and platform matches among in-stock products.
function renderRecommendations(cur) {
  const recent = recentList().filter((x) => x !== cur.slug);
  try {
    localStorage.setItem("kardivo_recent", JSON.stringify([cur.slug, ...recent].slice(0, 12)));
  } catch {}
  const bySlug = new Map(state.products.map((p) => [p.slug, p])),
    recentP = recent.map((x) => bySlug.get(x)).filter(Boolean).slice(0, 4),
    taken = new Set([cur.id, ...recentP.map((p) => p.id)]),
    inStock = (p) =>
      p.delivery_type !== "code" ||
      ((p.variants || []).length ? p.variants.some((v) => Number(v.stock) > 0) : Number(p.stock) > 0),
    like = state.products
      .filter((p) => !taken.has(p.id) && inStock(p))
      .map((p) => ({
        p,
        score:
          (cur.category_id && String(p.category_id) === String(cur.category_id) ? 2 : 0) +
          (cur.platform && p.platform === cur.platform ? 1 : 0) +
          (Number(p.featured) ? 0.5 : 0),
      }))
      .filter((x) => x.score >= 1)
      .sort((a, b) => b.score - a.score || b.p.id - a.p.id)
      .slice(0, 4)
      .map((x) => x.p),
    row = (title, list) =>
      list.length ? `<div class="rec-row"><h3>${title}</h3><div class="rec-grid">${list.map(miniCard).join("")}</div></div>` : "";
  const page = $(".product-page");
  if (page) page.insertAdjacentHTML("beforeend", row(t("You may also like"), like) + row(t("Recently viewed"), recentP));
}
async function renderTestimonials() {
  const sec = $("#testimonials");
  if (!sec) return;
  try {
    if (!state.testi) state.testi = state.settings.testimonials_enabled === false ? [] : await api("/api/testimonials");
  } catch {
    state.testi = [];
  }
  if (!state.testi.length) {
    sec.hidden = true;
    return;
  }
  sec.hidden = false;
  $("#testiGrid").innerHTML = state.testi
    .map(
      (r) =>
        `<figure class="testi"><div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>${r.body ? `<blockquote>${escapeHTML(r.body)}</blockquote>` : ""}${r.photo ? `<img class="review-photo" loading="lazy" src="${escapeHTML(r.photo)}" alt="">` : ""}<figcaption>${escapeHTML(r.user_name || t("Verified customer"))} · <a href="/${encodeURIComponent(r.slug)}">${escapeHTML(state.lang === "ar" && r.product_name_ar ? r.product_name_ar : r.product_name)}</a></figcaption></figure>`,
    )
    .join("");
}
function addToCart(id, variant_id = null) {
  const p = state.products.find((x) => x.id === id);
  if (!p) return;
  const v = (p.variants || []).find((x) => Number(x.id) === Number(variant_id));
  const max = Number(state.settings.max_qty) || 10,
    stock =
      p.delivery_type === "code"
        ? v
          ? Number(v.stock)
          : Number(p.stock)
        : max,
    cap = Math.min(max, stock),
    row = state.cart.find(
      (x) =>
        x.product_id === id &&
        Number(x.variant_id || 0) === Number(variant_id || 0),
    ),
    cur = row ? row.quantity : 0;
  if (cur >= cap) {
    toast(cap <= 0 ? t("Sold out.") : t("Maximum {0} per order.", cap));
    return;
  }
  if (row) row.quantity++;
  else
    state.cart.push({
      product_id: id,
      variant_id: variant_id || null,
      quantity: 1,
    });
  saveCart();
  toast(t("{0} added to cart.", pName(p)));
}
function cartItems() {
  return state.cart
    .map((i) => {
      const p = state.products.find((x) => x.id === i.product_id);
      return p && cartRowValid(i, state.products) ? { ...i, p } : null;
    })
    .filter(Boolean);
}
function renderCartCount() {
  $("#cartCount").textContent = state.cart.reduce((a, b) => a + b.quantity, 0);
}
function openModal(title, body, wide = false) {
  $("#modalRoot").innerHTML =
    `<div class="modal-backdrop" id="backdrop"><div class="modal ${wide ? "wide" : ""}" ${state.adminOpen ? 'dir="ltr"' : ""}><div class="modal-head"><h2>${title}</h2><button class="close" id="closeModal">×</button></div><div class="modal-body">${body}</div></div></div>`;
  $("#closeModal").onclick = closeModal;
  $("#backdrop").onclick = (e) => {
    if (e.target.id === "backdrop") closeModal();
  };
}
function closeModal() {
  state.adminOpen = false;
  $("#modalRoot").innerHTML = "";
}
function openCart() {
  const items = cartItems();
  if (!items.length) {
    openModal(
      t("Your cart"),
      `<div class="empty">${t("Your cart is empty. Humanity's oldest shopping problem.")}</div>`,
    );
    return;
  }
  const subtotal = items.reduce(
    (s, i) =>
      s +
      Number(
        i.p.variants?.find((v) => Number(v.id) === Number(i.variant_id))
          ?.price ?? i.p.price,
      ) *
        i.quantity,
    0,
  );
  openModal(
    t("Your cart"),
    `<div>${items
      .map((i) => {
        const v = i.p.variants?.find(
            (x) => Number(x.id) === Number(i.variant_id),
          ),
          label = v ? `<br><small>${escapeHTML(v.name)}</small>` : "",
          price = Number(v?.price ?? i.p.price);
        return `<div class="line"><span><b>${escapeHTML(pName(i.p))}</b>${label}<br><small>${t("{0} each", money(price))}</small></span><span><button class="mini" data-minus="${escapeHTML(cartKey(i))}">−</button> <b>${i.quantity}</b> <button class="mini" data-plus="${escapeHTML(cartKey(i))}">+</button> <button class="mini danger" data-remove="${escapeHTML(cartKey(i))}">${t("Remove")}</button></span></div>`;
      })
      .join(
        "",
      )}</div><div class="line total"><span>${t("Subtotal")}</span><span>${money(subtotal)}</span></div><div class="modal-actions"><button class="btn ghost" id="continueShopping">${t("Continue shopping")}</button><button class="btn primary" id="checkoutBtn">${t("Continue to checkout")}</button></div>`,
  );
  $$("[data-minus]").forEach(
    (b) => (b.onclick = () => changeQty(b.dataset.minus, -1)),
  );
  $$("[data-plus]").forEach(
    (b) => (b.onclick = () => changeQty(b.dataset.plus, 1)),
  );
  $$("[data-remove]").forEach(
    (b) =>
      (b.onclick = () => {
        state.cart = state.cart.filter((x) => cartKey(x) !== b.dataset.remove);
        saveCart();
        openCart();
      }),
  );
  $("#continueShopping").onclick = closeModal;
  $("#checkoutBtn").onclick = openCheckout;
}
function changeQty(key, d) {
  const row = state.cart.find((x) => cartKey(x) === key);
  if (!row) return;
  const p = state.products.find((x) => x.id === row.product_id);
  if (!p) return;
  const v = p.variants?.find((x) => Number(x.id) === Number(row.variant_id));
  const max = Number(state.settings.max_qty) || 10,
    cap =
      p.delivery_type === "code"
        ? Math.min(max, Number(v?.stock ?? p.stock))
        : max;
  if (d > 0) {
    if (row.quantity >= cap) {
      toast(cap <= 0 ? t("Sold out.") : t("Maximum {0} per order.", cap));
      return;
    }
    row.quantity++;
  } else {
    row.quantity--;
    if (row.quantity <= 0)
      state.cart = state.cart.filter((x) => cartKey(x) !== key);
  }
  saveCart();
  openCart();
}
function openCheckout() {
  const items = cartItems();
  if (!items.length) return;
  if (!state.user) {
    state.checkoutAfterAuth = true;
    openAuth();
    toast(state.lang === "ar" ? "سجّل دخولك أو اعمل حساب عشان تكمل الطلب." : "Log in or create an account to continue checkout.");
    return;
  }
  fetch("/api/checkout-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event: "checkout_started",
      session_key: checkoutSession(),
    }),
  }).catch(() => {});
  if (state.settings.orders_open === false) {
    toast(S("orders_closed_text") || t("Orders are paused."));
    return;
  }
  const subtotal = items.reduce((a, i) => {
    const v = i.p.variants?.find((x) => Number(x.id) === Number(i.variant_id));
    return a + Number(v?.price ?? i.p.price) * i.quantity;
  }, 0);
  let savedRef = "";
  try {
    savedRef = localStorage.getItem("kardivo_ref") || "";
  } catch {}
  state.co = { total: subtotal };
  openModal(
    t("Checkout"),
    `<div class="notice">${t("Checkout and payment remain in EGP.")}</div><div class="field"><label>${t("Discount code")}</label><div style="display:flex;gap:8px"><input id="discountCode" value="${escapeHTML(savedRef)}" placeholder="${t("Optional code")}" style="flex:1"><button type="button" class="btn ghost" id="applyDiscount">${t("Apply")}</button></div><small id="coNote" class="success-text"></small></div><label class="switch-row" id="creditRow" hidden><span>${t("Use store credit")} <b id="creditBal"></b></span><input class="switch" id="useCredit" type="checkbox"></label><div class="form-grid"><div class="field"><label>${t("Transfer reference")} <small>(${t("optional")})</small></label><input id="payRef" placeholder="${t("Reference number from the transfer receipt")}"></div><div class="field"><label>${t("Payment proof")} <small>(${t("optional")})</small></label><input id="checkoutProof" type="file" accept="image/*"></div></div><div class="checkout-summary"><div class="line"><span>${t("Subtotal")}</span><span id="coSubtotal">${moneyEGP(subtotal)}</span></div><div class="line"><span>${t("Discount")}</span><span id="coDiscount">${moneyEGP(0)}</span></div><div class="line" id="coCreditLine" hidden><span>${t("Store credit")}</span><span id="coCredit">${moneyEGP(0)}</span></div><div class="line total"><span>${t("Total")}</span><span id="coTotal">${moneyEGP(subtotal)}</span></div></div><div id="payWrap" style="margin-top:18px"><b>${t("Payment method")}</b><div class="payment-grid" id="payments"></div></div><div class="modal-actions"><button class="btn ghost" id="backCart">${t("Back")}</button><button class="btn primary" id="placeOrder">${t("Place order")}</button></div>`,
  );
  $("#backCart").onclick = openCart;
  renderPaymentOptions();
  $("#applyDiscount").onclick = async () => {
    if (!$("#discountCode").value.trim()) {
      toast(t("Enter a code to apply."));
      return;
    }
    await refreshTotals(true);
  };
  $("#useCredit").onchange = () => refreshTotals(false);
  refreshTotals(false);
}
// Asks the server what the cart costs: coupon, automatic bundle offers, referral codes and store credit are all decided there.
async function refreshTotals(announce, useCode = true) {
  const code = useCode ? $("#discountCode")?.value || "" : "";
  if (!$("#coTotal")) return;
  try {
    const r = await api("/api/discount/check", {
      method: "POST",
      body: JSON.stringify({
        items: state.cart,
        code,
        contact: String(state.user?.email || "").trim(),
        use_credit: !!$("#useCredit")?.checked,
      }),
    });
    state.co = { total: r.total };
    $("#coSubtotal").textContent = moneyEGP(r.subtotal);
    $("#coDiscount").textContent = r.discount ? "− " + moneyEGP(r.discount) : moneyEGP(0);
    $("#coCredit").textContent = "− " + moneyEGP(r.credit);
    $("#coCreditLine").hidden = !(r.credit > 0);
    $("#coTotal").textContent = moneyEGP(r.total);
    $("#payWrap").hidden = r.total <= 0;
    const row = $("#creditRow");
    row.hidden = !(state.user && r.credit_available > 0);
    $("#creditBal").textContent = `(${moneyEGP(r.credit_available)})`;
    $("#coNote").textContent = r.discount
      ? r.discount_source === "auto"
        ? `${t("Automatic offer applied.")} (${r.discount_code})`
        : t("Discount applied.")
      : "";
    if (announce) toast(r.discount ? t("Discount applied.") : t("Enter a code to apply."));
  } catch (e) {
    if (announce) toast(e.message);
    else if (code) $("#coNote").textContent = "";
    if (code && useCode) await refreshTotals(false, false);
  }
}
async function uploadPaymentProof(orderId, file, contact = "", ref = "") {
  if (!file) return;
  const fd = new FormData();
  fd.append("file", file);
  if (ref) fd.append("ref", ref);
  const res = await fetch(`/api/orders/${orderId}/payment-proof`, {
    method: "POST",
    credentials: "same-origin",
    headers: contact ? { "X-Order-Contact": contact } : {},
    body: fd,
  });
  let body = {};
  try {
    body = await res.json();
  } catch {}
  if (!res.ok)
    throw new Error(tr(body.error || `Request failed (${res.status})`));
  return body;
}
function renderPaymentOptions() {
  const methods = PAY.filter(([k]) => state.settings[k + "_ready"]),
    el = $("#payments");
  el.innerHTML = methods.length
    ? methods
        .map(
          ([k, n]) =>
            `<button type="button" class="pay-option" data-pay="${k}"><b>${payName(k)}</b><br><small>${t("Details shown after you order")}</small></button>`,
        )
        .join("")
    : `<div class="notice">${t("No payment methods are available right now. Please contact support.")}</div>`;
  $$("[data-pay]").forEach(
    (b) =>
      (b.onclick = () => {
        state.selectedPayment = b.dataset.pay;
        $$("[data-pay]").forEach((x) => x.classList.toggle("active", x === b));
      }),
  );
  if (methods[0]) $("[data-pay]").click();
  else state.selectedPayment = "";
}
async function placeOrder() {
  const items = state.cart.map((i) => ({
      product_id: i.product_id,
      variant_id: i.variant_id || null,
      quantity: i.quantity,
    })),
    guestName = String(state.user?.name || "").trim(),
    guestContact = String(state.user?.email || "").trim(),
    proof = $("#checkoutProof")?.files?.[0],
    payRef = $("#payRef")?.value.trim() || "",
    free = state.co && state.co.total <= 0;
  if (!free && !state.selectedPayment) {
    toast(t("Choose a payment method."));
    return;
  }
  try {
    $("#placeOrder").disabled = true;
    const r = await api("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        items,
        lang: state.lang,
        guest_name: "",
        guest_contact: "",
        discount_code: $("#discountCode").value,
        use_credit: !!$("#useCredit")?.checked,
        payment_ref: payRef,
        payment_method: free ? "" : state.selectedPayment,
      }),
    });
    try {
      localStorage.removeItem("kardivo_ref");
    } catch {}
    let proofMsg = "";
    if (proof && !r.paid)
      try {
        await uploadPaymentProof(r.order_id, proof, state.user ? "" : guestContact, payRef);
        proofMsg = t("Proof uploaded.");
      } catch (e) {
        proofMsg = e.message;
      }
    fetch("/api/checkout-events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event: "checkout_completed",
        order_id: r.order_id,
        session_key: checkoutSession(),
      }),
    }).catch(() => {});
    state.cart = [];
    saveCart();
    refreshStore().catch(() => {});
    openModal(
      t("Order placed"),
      `<div class="notice success-text">${t("Order <b>{0}</b> created. Save this number.", escapeHTML(r.order_number))}</div><div class="checkout-summary" style="margin-top:14px"><div class="line"><span>${t("Total to pay")}</span><b>${moneyEGP(r.total)}</b></div>${r.credit_used > 0 ? `<div class="line"><span>${t("Store credit")}</span><b>− ${moneyEGP(r.credit_used)}</b></div>` : ""}${
        r.paid
          ? `<div class="notice success-text" style="margin-top:10px">${t("Nothing to pay. Your order is confirmed and will be delivered shortly.")}</div>`
          : `<div class="line"><span>${t("Payment")}</span><b>${escapeHTML(payName(r.payment_method))}</b></div><div class="destination"><b>${t("Send payment to")}</b><code>${escapeHTML(r.destination)}</code></div>`
      }<p style="color:#aaa1b1;font-size:12px">${escapeHTML(r.support_text)}</p>${proofMsg ? `<p style="color:#aaa1b1;font-size:12px">${escapeHTML(proofMsg)}</p>` : ""}<p style="color:#aaa1b1;font-size:12px">${t('Sign in to your account to view and follow this order.')}</p></div><div class="modal-actions">${r.whatsapp ? `<a class="btn primary" href="${escapeHTML(r.whatsapp)}" target="_blank" rel="noreferrer">${t("Open WhatsApp Support")} ${arrow()}</a>` : ""}<button class="btn ghost" id="doneOrder">${t("Done")}</button></div>`,
    );
    $("#doneOrder").onclick = closeModal;
  } catch (e) {
    toast(e.message);
    $("#placeOrder").disabled = false;
  }
}
function openAccount() {
  if (state.user) openUserAccount();
  else openAuth();
}
function openAuth() {
  openModal(
    t("Account"),
    `<div class="auth-tabs"><button class="active" id="loginTab">${t("Log in")}</button><button id="registerTab">${t("Create account")}</button></div><div id="authForm"></div>`,
  );
  showLogin();
  $("#loginTab").onclick = showLogin;
  $("#registerTab").onclick = showRegister;
}
function showLogin() {
  $("#authForm").innerHTML =
    `<form id="loginForm"><div class="field"><label>${t("Email")}</label><input id="email" type="email" required></div><div class="field"><label>${t("Password")}</label><input id="password" type="password" required></div><button class="btn primary" type="submit">${t("Log in")}</button>${state.settings.email_ready ? ` <button class="mini" type="button" id="forgotLink" style="margin-inline-start:10px">${t("Forgot password?")}</button>` : ""}</form>`;
  authTabs("loginTab");
  $("#forgotLink")?.addEventListener("click", openForgot);
  $("#loginForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      const r = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: $("#email").value,
          password: $("#password").value,
        }),
      });
      state.user = r.user;
      toast(t("Welcome back, {0}.", r.user.name));
      closeModal();
      if (state.checkoutAfterAuth) { state.checkoutAfterAuth = false; openCheckout(); }
    } catch (err) {
      toast(err.message);
    }
  };
}
function openForgot() {
  openModal(
    t("Reset your password"),
    `<form id="forgotForm"><p style="color:#aaa1b1;font-size:13px">${t("Enter your account email and we'll send you a reset link.")}</p><div class="field"><label>${t("Email")}</label><input id="fEmail" type="email" required></div><button class="btn primary">${t("Send reset link")}</button></form>`,
  );
  $("#forgotForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await api("/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify({ email: $("#fEmail").value, lang: state.lang }),
      });
      $("#forgotForm").innerHTML = `<div class="notice success-text">${t("If that email has an account, a reset link is on its way. Check your inbox.")}</div>`;
    } catch (err) {
      toast(err.message);
    }
  };
}
function openReset(token) {
  openModal(
    t("Choose a new password"),
    `<form id="resetForm"><div class="field"><label>${t("New password (8+ characters)")}</label><input id="rPass" type="password" minlength="8" required></div><button class="btn primary">${t("Save password")}</button></form>`,
  );
  $("#resetForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await api("/api/auth/reset", {
        method: "POST",
        body: JSON.stringify({ token, password: $("#rPass").value }),
      });
      toast(t("Password changed. Log in with your new password."));
      state.user = null;
      openAuth();
    } catch (err) {
      toast(err.message);
    }
  };
}
function showRegister() {
  $("#authForm").innerHTML =
    `<form id="registerForm"><div class="field"><label>${t("Name")}</label><input id="name" required></div><div class="field"><label>${t("Email")}</label><input id="email" type="email" required></div><div class="field"><label>${t("Password")}</label><input id="password" type="password" minlength="8" required></div><button class="btn primary" type="submit">${t("Create account")}</button></form>`;
  authTabs("registerTab");
  $("#registerForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      const r = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: $("#name").value,
          email: $("#email").value,
          password: $("#password").value,
        }),
      });
      state.user = r.user;
      toast(t("Account created."));
      closeModal();
      if (state.checkoutAfterAuth) { state.checkoutAfterAuth = false; openCheckout(); }
    } catch (err) {
      toast(err.message);
    }
  };
}
function authTabs(active) {
  ["loginTab", "registerTab"].forEach((id) =>
    $("#" + id)?.classList.toggle("active", id === active),
  );
}
const TL_LABEL = {
  placed: "Order placed",
  proof_received: "Proof received",
  paid: "Paid",
  delivered: "Delivered",
  cancelled: "Cancelled",
  failed: "Payment failed",
  refunded: "Refunded",
};
function fmtTime(s) {
  if (!s) return "";
  const d = new Date(String(s).replace(" ", "T") + (/[zZ]|[+-]\d\d:?\d\d$/.test(String(s)) ? "" : "Z"));
  if (isNaN(d)) return String(s);
  return d.toLocaleString(state.lang === "ar" && !state.adminOpen ? "ar-EG" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
function timelineHTML(o) {
  return `<ol class="timeline">${(o.timeline || [])
    .map(
      (s) =>
        `<li class="${s.done ? "done" : ""} ${["cancelled", "failed", "refunded"].includes(s.kind) ? "bad" : ""}"><i></i><b>${t(TL_LABEL[s.kind] || s.kind)}</b><small>${s.at ? escapeHTML(fmtTime(s.at)) : ""}</small></li>`,
    )
    .join("")}</ol>`;
}
async function loadThread(id, contact) {
  const box = $("#thread-" + id);
  if (!box) return;
  try {
    const msgs = await api(`/api/orders/${id}/messages`, {
      headers: contact ? { "X-Order-Contact": contact } : {},
    });
    box.innerHTML =
      (msgs
        .map(
          (m) =>
            `<div class="msg ${m.sender}"><small>${m.sender === "admin" ? t("Support") : t("You")} · ${escapeHTML(fmtTime(m.created_at))}</small><div>${escapeHTML(m.body).replace(/\n/g, "<br>")}</div></div>`,
        )
        .join("") || `<div class="empty small">${t("No messages yet. Ask us anything about this order.")}</div>`) +
      `<form class="thread-form"><textarea maxlength="1000" placeholder="${t("Write a message...")}" required></textarea><button class="mini primary">${t("Send")}</button></form>`;
    box.querySelector("form").onsubmit = async (e) => {
      e.preventDefault();
      try {
        await api(`/api/orders/${id}/messages`, {
          method: "POST",
          headers: contact ? { "X-Order-Contact": contact } : {},
          body: JSON.stringify({ body: box.querySelector("textarea").value }),
        });
        loadThread(id, contact);
      } catch (err) {
        toast(err.message);
      }
    };
  } catch (e) {
    box.innerHTML = `<div class="notice danger-text">${escapeHTML(e.message)}</div>`;
  }
}
function bindOrderExtras(contact) {
  bindCopy();
  $$("[data-thread]").forEach(
    (d) => (d.ontoggle = () => d.open && loadThread(Number(d.dataset.thread), contact)),
  );
}
function reviewForm(productId, orderId) {
  openModal(
    t("Leave a review"),
    `<form id="reviewForm"><div class="field"><label>${t("Rating")}</label><select id="reviewRating"><option value="5">★★★★★</option><option value="4">★★★★☆</option><option value="3">★★★☆☆</option><option value="2">★★☆☆☆</option><option value="1">★☆☆☆☆</option></select></div><div class="field"><label>${t("Review")}</label><textarea id="reviewBody" maxlength="1000" placeholder="${t("How was it?")}"></textarea></div><div class="field"><label>${t("Photo")} <small>(${t("optional")})</small></label><input id="reviewPhoto" type="file" accept="image/jpeg,image/png,image/webp"></div><div class="modal-actions"><button type="button" class="btn ghost" id="cancelReview">${t("Cancel")}</button><button class="btn primary">${t("Submit")}</button></div></form>`,
  );
  $("#cancelReview").onclick = closeModal;
  $("#reviewForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("product_id", productId);
      fd.append("order_id", orderId);
      fd.append("rating", $("#reviewRating").value);
      fd.append("body", $("#reviewBody").value);
      const ph = $("#reviewPhoto").files[0];
      if (ph) fd.append("photo", ph);
      const res = await fetch("/api/reviews", { method: "POST", credentials: "same-origin", body: fd });
      let body = {};
      try {
        body = await res.json();
      } catch {}
      if (!res.ok) throw new Error(tr(body.error || `Request failed (${res.status})`));
      toast(t("Review submitted for approval."));
      closeModal();
    } catch (err) {
      toast(err.message);
    }
  };
}
async function openUserAccount() {
  let orders = [],
    notifications = [],
    ref = null;
  try {
    [orders, notifications, ref] = await Promise.all([
      api("/api/orders"),
      api("/api/notifications"),
      api("/api/me/referral").catch(() => null),
    ]);
  } catch (e) {
    toast(e.message);
  }
  const link = ref?.code ? `${location.origin}/?ref=${ref.code}` : "";
  const waShare = ref?.code
    ? `https://wa.me/?text=${encodeURIComponent(t("Use my code {0} for {1}% off your first order: {2}", ref.code, ref.discount_percent, link))}`
    : "";
  openModal(
    t("Hi, {0}", escapeHTML(state.user.name)),
    `<div class="notice"><b>${escapeHTML(state.user.email)}</b><br>${state.user.role === "admin" ? t("Administrator account") : t("Customer account")}</div>${
      ref?.enabled && ref.code
        ? `<div class="notice referral-box" style="margin-top:12px"><b>${t("Invite friends, earn credit")}</b><br><small>${t("Friends get {0}% off their first order. You get {1} store credit when their order is delivered.", ref.discount_percent, money(ref.reward))}</small><div class="line"><code>${escapeHTML(ref.code)}</code><span><button class="mini" data-copy="${escapeHTML(ref.code)}">${t("Copy")}</button> <button class="mini" data-copy="${escapeHTML(link)}">${t("Copy link")}</button> <a class="mini" href="${escapeHTML(waShare)}" target="_blank" rel="noreferrer">WhatsApp</a></span></div><div>${t("Store credit")}: <b>${money(ref.credit)}</b> · ${t("Friends who ordered")}: <b>${ref.invited}</b></div></div>`
        : ref && ref.credit > 0
          ? `<div class="notice" style="margin-top:12px">${t("Store credit")}: <b>${money(ref.credit)}</b></div>`
          : ""
    }${
      notifications.length
        ? `<h3 style="margin:18px 0 8px">${t("Notifications")}</h3>${notifications
            .slice(0, 8)
            .map(
              (n) =>
                `<div class="notice" style="margin-bottom:8px"><b>${escapeHTML(n.title)}</b><br><small>${escapeHTML(n.message)}</small></div>`,
            )
            .join("")}`
        : ""
    }<h3 style="margin:18px 0 8px">${t("Order history")}</h3>${orders.length ? orders.map(orderBlock).join("") : `<div class="empty">${t("No orders yet.")}</div>`}<div class="modal-actions">${state.user.role === "admin" ? `<button class="btn ghost" id="adminBtn">${t("Admin dashboard")}</button>` : ""}<button class="btn ghost" id="logoutBtn">${t("Log out")}</button></div>`,
    true,
  );
  $("#logoutBtn").onclick = async () => {
    await api("/api/auth/logout", { method: "POST" });
    state.user = null;
    closeModal();
    toast(t("Logged out."));
  };
  $("#adminBtn")?.addEventListener("click", openAdmin);
  bindOrderExtras("");
  $$("[data-upload-proof]").forEach(
    (b) =>
      (b.onclick = async () => {
        const f = $(`#proof-${b.dataset.uploadProof}`)?.files?.[0];
        if (!f) return toast(t("Choose a file first."));
        try {
          await uploadPaymentProof(Number(b.dataset.uploadProof), f, "", $(`#ref-${b.dataset.uploadProof}`)?.value.trim() || "");
          toast(t("Proof uploaded."));
          openUserAccount();
        } catch (err) {
          toast(err.message);
        }
      }),
  );
  $$("[data-review-product]").forEach(
    (b) =>
      (b.onclick = () =>
        reviewForm(
          Number(b.dataset.reviewProduct),
          Number(b.dataset.reviewOrder),
        )),
  );
}
const ADMIN_TABS = [
  ["dashboard", "Dashboard"],
  ["queue", "Needs review"],
  ["inbox", "Messages"],
  ["orders", "Orders"],
  ["products", "Products"],
  ["merge", "Combine products"],
  ["categories", "Categories"],
  ["inventory", "Digital codes"],
  ["waitlist", "Back-in-stock"],
  ["customers", "Customers"],
  ["discounts", "Discounts"],
  ["reviews", "Reviews"],
  ["refunds", "Refunds & disputes"],
  ["audit", "Audit log"],
  ["settings", "Settings"],
];
const BADGE_OF = { queue: "review_queue", inbox: "unread_messages", waitlist: "waitlist_ready" };
async function openAdmin() {
  closeModal();
  state.adminOpen = true;
  openModal(
    "Admin",
    `<div class="admin-shell"><aside class="admin-side" id="adminSide">${ADMIN_TABS.map(([k, n]) => `<button data-tab="${k}">${n}<span class="badge red" data-badge="${k}" hidden></span></button>`).join("")}</aside><section class="admin-main" id="adminMain"></section></div>`,
    true,
  );
  $$("#adminSide button").forEach(
    (b) =>
      (b.onclick = () => {
        state.admin.tab = b.dataset.tab;
        renderAdminTab();
      }),
  );
  await renderAdminTab();
  if (state.admin.tab !== "dashboard") adminBadges();
}
async function adminBadges(d) {
  try {
    d = d || (await api("/api/admin/summary"));
    for (const [tab, key] of Object.entries(BADGE_OF)) {
      const el = document.querySelector(`[data-badge="${tab}"]`);
      if (!el) continue;
      el.textContent = d[key] || "";
      el.hidden = !d[key];
    }
  } catch {}
}
async function renderAdminTab() {
  const main = $("#adminMain");
  if (!main) return;
  const tab = state.admin.tab;
  $$("#adminSide button").forEach((b) =>
    b.classList.toggle("active", b.dataset.tab === tab),
  );
  main.innerHTML = `<div class="empty">Loading...</div>`;
  const pages = {
    dashboard: adminDashboard,
    queue: adminQueue,
    inbox: adminInbox,
    orders: adminOrders,
    products: adminProducts,
    merge: adminMerge,
    categories: adminCategories,
    inventory: adminInventory,
    waitlist: adminWaitlist,
    customers: adminCustomers,
    discounts: adminDiscounts,
    reviews: adminReviews,
    refunds: adminRefunds,
    audit: adminAudit,
    settings: adminSettings,
  };
  try {
    await (pages[tab] || adminDashboard)(main);
  } catch (e) {
    main.innerHTML = `<div class="notice danger-text">${escapeHTML(e.message)}</div>`;
  }
}
const JOB_NAMES = {
  expire_reservations: "Release expired reservations",
  low_stock: "Low-stock alert",
  backup: "Database backup",
  cleanup: "Housekeeping",
};
function fmtBytes(n) {
  n = Number(n) || 0;
  return n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";
}
async function adminDashboard(main) {
  const days = state.admin.days || 30;
  const [d, r, bk] = await Promise.all([
    api("/api/admin/summary"),
    api("/api/admin/reports?days=" + days),
    api("/api/admin/backups").catch(() => ({ configured: false, backups: [] })),
  ]);
  adminBadges(d);
  const f = r.funnel,
    maxRev = Math.max(1, ...r.daily.map((x) => x.revenue));
  main.innerHTML = `<div class="admin-top"><h2>Dashboard</h2><select id="repDays">${[7, 30, 90, 365].map((n) => `<option value="${n}" ${n === r.days ? "selected" : ""}>Last ${n} days</option>`).join("")}</select></div>
  ${d.review_queue ? `<div class="notice" style="margin-bottom:12px"><b>${d.review_queue}</b> order(s) have a payment proof waiting. <button class="mini primary" id="goQueue">Review now</button></div>` : ""}
  <div class="stats"><div class="stat"><small>AWAITING PAYMENT</small><b>${d.awaiting_payment}</b></div><div class="stat"><small>ORDERS</small><b>${d.orders}</b></div><div class="stat"><small>PAID REVENUE</small><b>${money(d.paid_revenue)}</b></div><div class="stat"><small>7-DAY REVENUE</small><b>${money(d.revenue_7d)}</b></div><div class="stat"><small>30-DAY REVENUE</small><b>${money(d.revenue_30d)}</b></div><div class="stat"><small>AVG ORDER</small><b>${money(d.avg_order)}</b></div><div class="stat"><small>AVAILABLE CODES</small><b>${d.available_codes}</b></div><div class="stat"><small>CUSTOMERS</small><b>${d.customers}</b></div></div>
  <div class="admin-panel admin-quick-actions"><div class="panel-head"><div><h3>Quick actions</h3><small>Jump straight to the jobs you do most</small></div></div><div class="admin-quick-grid"><button type="button" data-admin-jump="queue"><span>01</span><b>Review payments</b><small>${d.review_queue || 0} awaiting proof review</small></button><button type="button" data-admin-jump="orders"><span>02</span><b>Find an order</b><small>Search any order and open its details</small></button><button type="button" data-admin-jump="products"><span>03</span><b>Manage products</b><small>Prices, images, stock and delivery</small></button><button type="button" data-admin-jump="merge"><span>04</span><b>Manage variations</b><small>Combine safely with preview and undo</small></button><button type="button" data-admin-jump="settings"><span>05</span><b>Storefront & campaigns</b><small>Edit bilingual homepage content</small></button></div></div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Checkout funnel · last ${r.days} days</h3></div><div class="modal-body"><div class="funnel"><div class="stat"><small>CHECKOUT STARTED</small><b>${f.started}</b></div><div class="stat"><small>CHECKOUT COMPLETED</small><b>${f.completed}</b></div><div class="stat"><small>COMPLETION RATE</small><b>${f.rate}%</b></div><div class="stat"><small>PAID ORDERS</small><b>${f.paid_orders}</b></div></div><small>Counts unique browsing sessions. "Started" = opened checkout; "completed" = placed an order.</small></div></div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Revenue · last ${r.days} days</h3></div><div class="modal-body"><div class="line"><span>Cash revenue (paid orders)</span><b>${money(r.cash_revenue)}</b></div><div class="line"><span>Discounts given</span><b>${money(r.discounts_given)}</b></div><div class="line"><span>Store credit used</span><b>${moneyEGP(r.credit_used)}</b></div><div class="line"><span>Supplier cost</span><b>${money(r.total_cost)}</b></div><div class="line"><span>Estimated profit</span><b>${money(r.profit_estimate)}</b></div>${r.costs_incomplete ? `<small>Some products have no cost recorded, so profit is overstated. Add a supplier cost when importing codes, or a cost price on manual products.</small>` : ""}<div class="bars" title="Daily revenue">${r.daily.map((x) => `<span style="height:${Math.max(4, Math.round((x.revenue / maxRev) * 100))}%" title="${escapeHTML(x.date)}: ${money(x.revenue)} (${x.orders} orders)"></span>`).join("") || `<small>No paid orders in this period.</small>`}</div></div></div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Top products & profit</h3></div><div class="table-wrap"><table class="admin-table"><thead><tr><th>Product</th><th>Units</th><th>Revenue</th><th>Cost</th><th>Profit</th></tr></thead><tbody>${r.products.map((p) => `<tr><td>${escapeHTML(p.name)}</td><td>${p.units}</td><td>${money(p.revenue)}</td><td>${p.cost == null ? "—" : money(p.cost)}</td><td>${p.profit == null ? "—" : money(p.profit)}</td></tr>`).join("") || `<tr><td colspan="5" class="empty">No sales yet.</td></tr>`}</tbody></table></div></div>
  ${d.low_stock.length ? `<div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Low stock</h3></div><div class="modal-body">${d.low_stock.map((x) => `<div class="line"><span>${escapeHTML(x.name)}${x.variant_name ? " — " + escapeHTML(x.variant_name) : ""}</span><b>${x.stock} left <small>(alert at ${x.threshold ?? "default"})</small></b></div>`).join("")}</div></div>` : ""}
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Automatic jobs</h3></div><div class="modal-body">${(d.jobs || []).map((j) => `<div class="line"><span>${escapeHTML(JOB_NAMES[j.job] || j.job)}</span><span><span class="tag ${j.ok ? "green" : "red"}">${j.ok ? "OK" : "FAILED"}</span> <small>${escapeHTML(fmtTime(j.ran_at))} ${escapeHTML(j.detail || "")}</small></span></div>`).join("") || `<small>No scheduled run recorded yet. Jobs run from the Cloudflare cron trigger in wrangler.toml.</small>`}<div class="modal-actions"><button class="btn ghost" id="cleanupReservations">Release expired reservations now</button><button class="btn ghost" id="sendLowStock">Send low-stock alert now</button></div></div></div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Database backups</h3></div><div class="modal-body">${bk.configured ? `<div class="modal-actions" style="margin:0 0 8px"><button class="btn ghost" id="runBackup">Back up now</button></div>${bk.backups.map((b) => `<div class="line"><span><code>${escapeHTML(b.key.slice(8))}</code> <small>${fmtBytes(b.size)}</small></span><a class="mini" href="/api/admin/backups/download?key=${encodeURIComponent(b.key)}">Download</a></div>`).join("") || `<small>No backups yet.</small>`}` : `<small>No R2 bucket is bound, so backups are unavailable.</small>`}</div></div>`;
  $("#repDays").onchange = (e) => {
    state.admin.days = Number(e.target.value);
    renderAdminTab();
  };
  $("#goQueue")?.addEventListener("click", () => {
    state.admin.tab = "queue";
    renderAdminTab();
  });
  $$("[data-admin-jump]").forEach(b => b.addEventListener("click", async () => {
    state.admin.tab = b.dataset.adminJump;
    await renderAdminTab();
    if (state.admin.tab === "orders") $("#oSearch")?.focus();
  }));
  const act = (id, path, msg) =>
    $(id)?.addEventListener("click", async (e) => {
      e.target.disabled = true;
      try {
        const x = await api(path, { method: "POST" });
        toast(msg(x));
        renderAdminTab();
      } catch (err) {
        toast(err.message);
        e.target.disabled = false;
      }
    });
  act("#cleanupReservations", "/api/admin/maintenance/cleanup", (x) => `Expired ${x.expired} reservation(s).`);
  act("#sendLowStock", "/api/admin/low-stock/notify", (x) => `Low-stock alert sent for ${x.count} product(s).`);
  act("#runBackup", "/api/admin/backups/run", (x) => `Backup saved (${x.rows} rows).`);
}
function waLink(contact, text) {
  let d = String(contact || "").replace(/[^\d+]/g, "");
  if (!/^\+?\d{8,15}$/.test(d)) return "";
  d = d.replace(/^\+/, "").replace(/^00/, "");
  if (/^01\d{9}$/.test(d)) d = "2" + d;
  return `https://wa.me/${d}?text=${encodeURIComponent(text || "")}`;
}
function dupWarn(o) {
  if (!o.dup_flag) return "";
  const hits = String(o.dup_flag).split(";").filter(Boolean).map((x) => {
    const [why, num] = x.split(":");
    return `${why === "proof" ? "same proof image" : why === "ref" ? "same transfer reference" : "same proof and reference"} as ${num}`;
  });
  return `<div class="warn">⚠ Possible duplicate payment: ${escapeHTML(hits.join(", "))}. <button type="button" class="mini" data-clear-dup="${o.id}">Not a duplicate</button></div>`;
}
function bindClearDup(root, after) {
  root.querySelectorAll("[data-clear-dup]").forEach(
    (b) =>
      (b.onclick = async () => {
        try {
          await api(`/api/admin/orders/${b.dataset.clearDup}/clear-dup`, { method: "POST", body: "{}" });
          after();
        } catch (e) {
          toast(e.message);
        }
      }),
  );
}
async function adminQueue(main) {
  const rows = await api("/api/admin/review-queue");
  main.innerHTML = `<div class="admin-top"><h2>Needs review</h2><span class="eyebrow">${rows.length} WAITING</span></div><div class="notice" style="margin-bottom:12px">Orders where the customer uploaded a payment proof and the order is still unpaid. Check the proof against your wallet, then deliver in one click.</div><div class="queue-grid">${rows
    .map((o) => {
      const manual = o.items.some((i) => i.delivery_type !== "code");
      return `<article class="queue-card" data-q="${o.id}"><div class="proof"><a href="/api/admin/orders/${o.id}/payment-proof" target="_blank" rel="noopener"><img loading="lazy" src="/api/admin/orders/${o.id}/payment-proof" alt="Payment proof" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'Open proof file'}))"></a></div><div class="body"><div class="line"><b>${escapeHTML(o.order_number)}</b><b>${money(o.total)}</b></div><div class="line"><span>${escapeHTML(o.user_name || o.guest_name || "Guest")}</span><small>${escapeHTML(o.user_email || o.guest_contact || "")}</small></div><div class="line"><span>${escapeHTML(payNameEN(o.payment_method))}</span><small>${o.payment_ref ? "ref " + escapeHTML(o.payment_ref) : "no reference"}</small></div>${o.items.map((i) => `<small>${escapeHTML(i.product_name)}${i.variant_name ? " — " + escapeHTML(i.variant_name) : ""} × ${i.quantity}${i.delivery_type === "code" ? " · code" : " · manual"}</small>`).join("")}${dupWarn(o)}${manual ? `<textarea data-dm="${o.id}" placeholder="Delivery message for the customer (optional) — e.g. account details"></textarea>` : ""}<div class="modal-actions" style="margin:0"><button class="mini primary" data-deliver="${o.id}">Mark paid & deliver</button><button class="mini danger" data-reject="${o.id}">Reject proof</button><button class="mini" data-open="${o.id}">Details</button></div></div></article>`;
    })
    .join("") || `<div class="empty">Nothing waiting. 🎉</div>`}</div>`;
  const refresh = () => {
    renderAdminTab();
    adminBadges();
  };
  bindClearDup(main, refresh);
  $$("[data-deliver]").forEach(
    (b) =>
      (b.onclick = async () => {
        const id = b.dataset.deliver;
        b.disabled = true;
        try {
          await api(`/api/admin/orders/${id}/mark-paid-deliver`, {
            method: "POST",
            body: JSON.stringify({ delivery_message: $(`[data-dm="${id}"]`)?.value || "" }),
          });
          toast("Paid and delivered.");
          refresh();
        } catch (e) {
          toast(e.message);
          b.disabled = false;
        }
      }),
  );
  $$("[data-reject]").forEach(
    (b) =>
      (b.onclick = async () => {
        const reason = prompt("Why is the proof rejected? (shown to the customer, optional)");
        if (reason === null) return;
        try {
          await api(`/api/admin/orders/${b.dataset.reject}/reject-proof`, { method: "POST", body: JSON.stringify({ reason }) });
          toast("Proof rejected. The customer was notified.");
          refresh();
        } catch (e) {
          toast(e.message);
        }
      }),
  );
  $$("[data-open]").forEach((b) => (b.onclick = () => orderForm(Number(b.dataset.open))));
}
async function adminInbox(main) {
  const rows = await api("/api/admin/inbox");
  main.innerHTML = `<div class="admin-top"><h2>Messages</h2><span class="eyebrow">ORDER SUPPORT THREADS</span></div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Last message</th><th>When</th><th></th></tr></thead><tbody>${rows.map((r) => `<tr><td><b>${escapeHTML(r.order_number)}</b></td><td>${escapeHTML(r.customer)}</td><td>${r.last_sender === "customer" ? "" : "<small>You: </small>"}${escapeHTML((r.last_body || "").slice(0, 90))}</td><td><small>${escapeHTML(fmtTime(r.last_at))}</small></td><td>${r.unread ? `<span class="badge red">${r.unread} new</span>` : ""} <button class="mini" data-open="${r.id}">Open</button></td></tr>`).join("") || `<tr><td colspan="5" class="empty">No messages yet.</td></tr>`}</tbody></table></div></div>`;
  $$("[data-open]").forEach((b) => (b.onclick = () => orderForm(Number(b.dataset.open))));
}
async function adminOrders(main) {
  const rows = await api("/api/admin/orders");
  main.innerHTML = `<div class="admin-top"><h2>Orders</h2><span class="eyebrow">${rows.length} TOTAL</span></div><div class="form-grid" style="margin-bottom:12px"><div class="field"><input id="oSearch" placeholder="Search order, name, contact, item, reference..."></div><div class="field"><select id="oFilter"><option value="">All statuses</option><option value="awaiting_payment">Awaiting payment</option><option value="paid">Paid</option><option value="pending">Pending delivery</option><option value="fulfilled">Fulfilled</option><option value="refunded">Refunded</option><option value="cancelled">Cancelled</option></select></div></div><div class="admin-panel" style="margin-bottom:12px"><div class="modal-body"><b>Export orders to CSV</b><div class="form-grid" style="margin-top:8px"><div class="field"><label>From</label><input id="xFrom" type="date"></div><div class="field"><label>To</label><input id="xTo" type="date"></div></div><div class="modal-actions" style="margin:0"><a class="btn ghost" id="xGo" href="#">Download CSV</a></div></div></div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Payment</th><th>Fulfillment</th><th>Created</th><th></th></tr></thead><tbody id="oBody"></tbody></table></div></div>`;
  const draw = () => {
    const q = $("#oSearch").value.toLowerCase(),
      f = $("#oFilter").value,
      list = rows.filter(
        (o) =>
          (!f || o.payment_status === f || o.fulfillment_status === f) &&
          (!q ||
            `${o.order_number} ${o.user_name || ""} ${o.guest_name || ""} ${o.user_email || ""} ${o.guest_contact || ""} ${o.item_summary || ""} ${o.payment_ref || ""}`
              .toLowerCase()
              .includes(q)),
      );
    $("#oBody").innerHTML =
      list
        .map(
          (o) =>
            `<tr><td><b>${escapeHTML(o.order_number)}</b><br><small>${escapeHTML(o.item_summary || "")}</small></td><td>${escapeHTML(o.user_name || o.guest_name || "Guest")}<br><small>${escapeHTML(o.user_email || o.guest_contact || "")}</small></td><td>${money(o.total)}${o.discount_code ? `<br><small>code ${escapeHTML(o.discount_code)}</small>` : ""}</td><td>${escapeHTML(payNameEN(o.payment_method))}<br><small>${escapeHTML(o.payment_status)}</small>${o.payment_proof_key ? ` <span class="tag green">proof</span>` : ""}${o.dup_flag ? ` <span class="tag red">duplicate?</span>` : ""}</td><td>${escapeHTML(o.fulfillment_status)}</td><td>${escapeHTML(fmtTime(o.created_at))}</td><td><button class="mini" data-order="${o.id}">Manage</button>${o.unread ? ` <span class="badge red">${o.unread}</span>` : ""}</td></tr>`,
        )
        .join("") || `<tr><td colspan="7" class="empty">No orders.</td></tr>`;
    $$("[data-order]").forEach(
      (b) => (b.onclick = () => orderForm(Number(b.dataset.order))),
    );
  };
  $("#oSearch").oninput = draw;
  $("#oFilter").onchange = draw;
  $("#xGo").onclick = (e) => {
    const p = new URLSearchParams();
    if ($("#xFrom").value) p.set("from", $("#xFrom").value);
    if ($("#xTo").value) p.set("to", $("#xTo").value);
    if ($("#oFilter").value) p.set("status", $("#oFilter").value);
    e.target.href = "/api/admin/orders/export.csv?" + p;
  };
  draw();
}
const REASON_LABEL = {
  wrong_code: "Wrong code delivered",
  code_invalid: "Code invalid / already used",
  duplicate_payment: "Duplicate payment",
  out_of_stock: "Out of stock",
  customer_changed_mind: "Customer changed mind",
  fraud: "Fraud",
  other: "Other",
  payment_not_received: "Payment not received",
  code_not_working: "Code not working",
  wrong_product: "Wrong product",
  delivery_delay: "Delivery delay",
  chargeback_or_claim: "Chargeback / claim",
};
async function orderForm(id) {
  const d = await api("/api/admin/orders/" + id),
    { order, items, codes, messages, issues } = d;
  const contact = order.user_email || order.guest_contact || "",
    name = order.user_name || order.guest_name || "Guest";
  const reasonOpts = (list) => list.map((r) => `<option value="${r}">${REASON_LABEL[r] || r}</option>`).join("");
  openModal(
    `Order ${escapeHTML(order.order_number)}`,
    `<div class="checkout-summary"><div class="line"><span>Customer</span><b>${escapeHTML(name)}</b></div><div class="line"><span>Contact</span><span>${escapeHTML(contact)}</span></div><div class="line"><span>Payment method</span><span>${escapeHTML(payNameEN(order.payment_method))}</span></div>${order.discount ? `<div class="line"><span>Discount${order.discount_code ? " (" + escapeHTML(order.discount_code) + ")" : ""}</span><span>-${money(order.discount)}</span></div>` : ""}${order.credit_used ? `<div class="line"><span>Store credit used</span><span>-${money(order.credit_used)}</span></div>` : ""}<div class="line"><b>Total</b><b>${money(order.total)}</b></div></div>
    ${timelineHTML(order)}
    ${dupWarn(order)}
    ${order.payment_proof ? `<div class="notice" style="margin-top:12px"><b>Payment proof</b><br><a href="/api/admin/orders/${id}/payment-proof" target="_blank" rel="noopener"><img src="/api/admin/orders/${id}/payment-proof" alt="" style="max-width:100%;max-height:260px;margin-top:8px;border-radius:10px" onerror="this.remove()"></a><br><a class="btn ghost" style="margin-top:8px" href="/api/admin/orders/${id}/payment-proof" target="_blank" rel="noopener">Open proof</a></div>` : ""}
    <h3 style="margin:20px 0 8px">Items</h3>${items.map((i) => `<div class="line"><span>${escapeHTML(i.product_name)}${i.variant_name ? ` — ${escapeHTML(i.variant_name)}` : ""} × ${i.quantity}</span><span>${money(i.unit_price * i.quantity)}</span></div>`).join("")}
    <form id="orderForm"><div class="form-grid"><div class="field"><label>Payment status</label><select id="oPayment">${["awaiting_payment", "paid", "failed", "refunded"].map((x) => `<option ${x === order.payment_status ? "selected" : ""}>${x}</option>`).join("")}</select></div><div class="field"><label>Fulfillment</label><select id="oFulfill">${["pending", "processing", "fulfilled", "cancelled"].map((x) => `<option ${x === order.fulfillment_status ? "selected" : ""}>${x}</option>`).join("")}</select></div></div>
    <div class="field"><label>Customer's transfer reference</label><input id="oRef" value="${escapeHTML(order.payment_ref || "")}" placeholder="Reference / transaction number"></div>
    <div id="refundBox" class="notice" hidden style="margin-bottom:12px"><b>Refund details</b><div class="form-grid" style="margin-top:8px"><div class="field"><label>Reason (required)</label><select id="rReason"><option value="">Choose…</option>${reasonOpts(d.refund_reasons)}</select></div><div class="field"><label>Amount refunded</label><input id="rAmount" type="number" step="0.01" value="${order.total}"></div></div><div class="field"><label>Note</label><input id="rNote" maxlength="500"></div></div>
    <div class="field"><label>${t("Delivery message")}</label><textarea id="oDelivery">${escapeHTML(order.delivery_message || "")}</textarea></div><div class="field"><label>Notes (internal)</label><textarea id="oNotes">${escapeHTML(order.notes || "")}</textarea></div>${codes.length ? `<div class="notice">Assigned codes: ${codes.map((c) => `<code>${escapeHTML(c.code)}</code>`).join(", ")}</div>` : ""}
    <div class="modal-actions"><button type="button" class="btn ghost" id="cancelOrder">Close</button>${order.payment_status !== "paid" || order.fulfillment_status !== "fulfilled" ? `<button type="button" class="btn primary" id="markPaidDeliver">${t("Mark paid & deliver")}</button>` : ""}<button class="btn primary">Save order</button></div></form>
    <div id="waBox"></div>
    <h3 style="margin:20px 0 8px">Support thread</h3><div class="thread" id="adminThread">${messages.map((m) => `<div class="msg ${m.sender === "customer" ? "customer" : ""}"><small>${m.sender === "customer" ? escapeHTML(name) : "You"} · ${escapeHTML(fmtTime(m.created_at))}</small>${escapeHTML(m.body)}</div>`).join("") || `<div class="empty small">No messages.</div>`}</div><form id="replyForm" class="thread-form"><textarea id="replyBody" maxlength="1000" placeholder="Reply to the customer (they also get an email if one is on file)"></textarea><button class="btn primary">Send</button></form>
    <h3 style="margin:20px 0 8px">Refunds & disputes</h3>${issues.map((l) => `<div class="line"><span><span class="tag ${l.kind === "refund" ? "red" : ""}">${escapeHTML(l.kind)}</span> ${escapeHTML(REASON_LABEL[l.reason] || l.reason)}${l.note ? ` <small>— ${escapeHTML(l.note)}</small>` : ""}</span><small>${l.amount != null ? money(l.amount) + " · " : ""}${escapeHTML(fmtTime(l.created_at))}</small></div>`).join("") || `<small>None logged.</small>`}
    <form id="disputeForm" class="form-grid" style="margin-top:10px"><div class="field"><label>Log a dispute / complaint</label><select id="dReason"><option value="">Reason…</option>${reasonOpts(d.dispute_reasons)}</select></div><div class="field"><label>Note</label><input id="dNote" maxlength="500"></div><div><button class="mini">Log dispute</button></div></form>`,
    true,
  );
  const back = () => {
    state.admin.tab = state.admin.tab || "orders";
    openAdmin();
  };
  bindClearDup($("#modalRoot"), () => orderForm(id));
  $("#cancelOrder").onclick = back;
  const syncRefund = () => ($("#refundBox").hidden = !($("#oPayment").value === "refunded" && order.payment_status !== "refunded"));
  $("#oPayment").onchange = syncRefund;
  syncRefund();
  const buildWA = () => {
    const link = waLink(order.guest_contact || "", "");
    if (!link) return ($("#waBox").innerHTML = "");
    $("#waBox").innerHTML = `<div class="notice" style="margin-top:12px"><b>WhatsApp the customer</b><div class="field" style="margin:8px 0 0"><textarea id="waText"></textarea></div><label><input type="checkbox" id="waCodes"> Include delivered codes</label><div class="modal-actions" style="margin:8px 0 0"><a class="btn ghost" id="waGo" target="_blank" rel="noopener" href="#">Open WhatsApp</a></div></div>`;
    const fill = () => {
      const msg = [
        `Hi ${name},`,
        `Your order ${order.order_number} is ${order.fulfillment_status === "fulfilled" ? "delivered ✅" : "being processed"}.`,
        $("#oDelivery").value,
        $("#waCodes").checked && codes.length ? codes.map((c) => c.code).join("\n") : "",
        `Thank you for shopping with ${state.settings.store_name || "us"}!`,
      ]
        .filter(Boolean)
        .join("\n\n");
      $("#waText").value = msg;
    };
    fill();
    $("#waCodes").onchange = fill;
    $("#waGo").onclick = (e) => (e.target.href = waLink(order.guest_contact || "", $("#waText").value));
  };
  buildWA();
  const save = async (payment, fulfill) => {
    await api("/api/admin/orders/" + id, {
      method: "PUT",
      body: JSON.stringify({
        payment_status: payment,
        fulfillment_status: fulfill,
        notes: $("#oNotes").value,
        delivery_message: $("#oDelivery").value,
        payment_ref: $("#oRef").value,
        refund_reason: $("#rReason").value,
        refund_note: $("#rNote").value,
        refund_amount: $("#rAmount").value,
      }),
    });
    toast("Order updated.");
    orderForm(id);
    adminBadges();
  };
  $("#markPaidDeliver")?.addEventListener("click", async () => {
    try {
      await save("paid", "fulfilled");
    } catch (err) {
      toast(err.message);
    }
  });
  $("#orderForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await save($("#oPayment").value, $("#oFulfill").value);
    } catch (err) {
      toast(err.message);
    }
  };
  $("#replyForm").onsubmit = async (e) => {
    e.preventDefault();
    const body = $("#replyBody").value.trim();
    if (!body) return;
    try {
      await api(`/api/admin/orders/${id}/reply`, { method: "POST", body: JSON.stringify({ body }) });
      orderForm(id);
    } catch (err) {
      toast(err.message);
    }
  };
  $("#disputeForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await api(`/api/admin/orders/${id}/dispute`, {
        method: "POST",
        body: JSON.stringify({ reason: $("#dReason").value, note: $("#dNote").value }),
      });
      toast("Dispute logged.");
      orderForm(id);
    } catch (err) {
      toast(err.message);
    }
  };
}
async function adminDiscounts(main) {
  const rows = await api("/api/admin/discounts");
  const scope = (d) =>
    [
      d.auto_apply ? "auto-applied" : "",
      d.first_order_only ? "first order only" : "",
      d.min_qty ? `buy ${d.min_qty}+` : "",
      d.product_id ? `product #${d.product_id}` : "",
      d.category_id ? `category #${d.category_id}` : "",
    ]
      .filter(Boolean)
      .join(" · ");
  main.innerHTML =
    adminHeader("Discounts", "Add discount", "addDiscount") +
    `<div class="notice" style="margin-bottom:12px">Offers can apply to one product or category, to first orders only, or automatically when the cart reaches a quantity (e.g. buy 3, get 10% off). Only the single best offer applies per order; offers never stack.</div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Code</th><th>Type</th><th>Amount</th><th>Rules</th><th>Used</th><th>Active</th><th>Expiry</th><th>Actions</th></tr></thead><tbody>${rows.map((d) => `<tr><td><b>${escapeHTML(d.code)}</b></td><td>${escapeHTML(d.type)}</td><td>${d.amount}${d.type === "percentage" ? "%" : ""}</td><td>${d.min_order ? "min " + money(d.min_order) + "<br>" : ""}<small>${escapeHTML(scope(d)) || "—"}</small></td><td>${d.used_count || 0}${d.max_uses != null ? ` / ${d.max_uses}` : ""}</td><td>${d.active ? "Yes" : "No"}</td><td>${escapeHTML(d.expires_at ? new Date(d.expires_at).toLocaleString() : "Never")}</td><td><button class="mini" data-edit-disc="${d.id}">Edit</button> <button class="mini danger" data-del-disc="${d.id}">Delete</button></td></tr>`).join("") || `<tr><td colspan="8" class="empty">No discounts.</td></tr>`}</tbody></table></div></div>`;
  $("#addDiscount").onclick = () => discountForm();
  $$("[data-edit-disc]").forEach(
    (b) =>
      (b.onclick = () =>
        discountForm(rows.find((x) => x.id == b.dataset.editDisc))),
  );
  $$("[data-del-disc]").forEach(
    (b) =>
      (b.onclick = async () => {
        if (!confirm("Delete discount?")) return;
        try {
          await api("/api/admin/discounts/" + b.dataset.delDisc, {
            method: "DELETE",
          });
          toast("Discount deleted.");
          renderAdminTab();
        } catch (e) {
          toast(e.message);
        }
      }),
  );
}
async function discountForm(d = null) {
  const prods = await api("/api/admin/products").catch(() => []);
  openModal(
    d ? "Edit discount" : "Add discount",
    `<form id="discForm"><div class="form-grid"><div class="field"><label>Code</label><input id="dCode" value="${escapeHTML(d?.code || "")}" required></div><div class="field"><label>Type</label><select id="dType"><option value="percentage" ${d?.type !== "fixed" ? "selected" : ""}>Percentage</option><option value="fixed" ${d?.type === "fixed" ? "selected" : ""}>Fixed amount</option></select></div><div class="field"><label>Amount</label><input id="dAmount" type="number" step="0.01" value="${d?.amount ?? ""}" required></div><div class="field"><label>Minimum order</label><input id="dMin" type="number" step="0.01" value="${d?.min_order ?? 0}"></div><div class="field"><label>Max uses (empty = unlimited)</label><input id="dMax" type="number" min="0" value="${d?.max_uses ?? ""}"></div><div class="field"><label>Expires at</label><input id="dExpiry" type="datetime-local" value="${toLocalInput(d?.expires_at)}"></div></div>
    <details open style="margin:8px 0"><summary><b>Rules</b></summary><div class="form-grid" style="margin-top:10px"><div class="field"><label>Only for product</label><select id="dProduct"><option value="">Any product</option>${prods.map((p) => `<option value="${p.id}" ${d?.product_id == p.id ? "selected" : ""}>${escapeHTML(p.name)}</option>`).join("")}</select></div><div class="field"><label>Only for category</label><select id="dCategory"><option value="">Any category</option>${state.categories.map((c) => `<option value="${c.id}" ${d?.category_id == c.id ? "selected" : ""}>${escapeHTML(c.name)}</option>`).join("")}</select></div><div class="field"><label>Minimum quantity in cart (0 = none)</label><input id="dMinQty" type="number" min="0" value="${d?.min_qty || 0}"></div></div><label style="display:block;margin:6px 0"><input id="dFirst" type="checkbox" ${d?.first_order_only ? "checked" : ""}> First order only</label><label style="display:block;margin:6px 0"><input id="dAuto" type="checkbox" ${d?.auto_apply ? "checked" : ""}> Apply automatically (no code needed) — for bundle offers like "buy 3, get 10% off"</label></details>
    <label><input id="dActive" type="checkbox" ${d?.active !== 0 ? "checked" : ""}> Active</label><div class="modal-actions"><button type="button" class="btn ghost" id="cancelD">Cancel</button><button class="btn primary">Save discount</button></div></form>`,
  );
  $("#cancelD").onclick = () => {
    closeModal();
    openAdmin();
  };
  $("#discForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await api("/api/admin/discounts" + (d ? "/" + d.id : ""), {
        method: d ? "PUT" : "POST",
        body: JSON.stringify({
          code: $("#dCode").value,
          type: $("#dType").value,
          amount: $("#dAmount").value,
          min_order: $("#dMin").value,
          max_uses: $("#dMax").value,
          expires_at: $("#dExpiry").value
            ? new Date($("#dExpiry").value).toISOString()
            : "",
          product_id: $("#dProduct").value,
          category_id: $("#dCategory").value,
          min_qty: $("#dMinQty").value,
          first_order_only: $("#dFirst").checked,
          auto_apply: $("#dAuto").checked,
          active: $("#dActive").checked,
        }),
      });
      toast("Discount saved.");
      state.admin.tab = "discounts";
      openAdmin();
    } catch (err) {
      toast(err.message);
    }
  };
}
async function adminInventory(main) {
  const [rows, products, batches] = await Promise.all([
    api("/api/admin/inventory"),
    api("/api/admin/products"),
    api("/api/admin/batches"),
  ]);
  const shown = rows.slice(0, 300);
  main.innerHTML = `<div class="admin-top"><h2>Digital codes</h2><div class="table-actions"><button class="btn ghost" id="importCodes">Import CSV</button><button class="btn primary" id="addCodes">Add codes</button></div></div><div class="notice">Paste codes, or import a CSV (columns: code, product, option — product/option are optional if you pick them in the form). Codes are kept server-side in D1 and can be removed while still available. Add a supplier and unit cost to see profit per product on the dashboard.</div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Supplier batches</h3></div><div class="table-wrap"><table class="admin-table"><thead><tr><th>Added</th><th>Product</th><th>Supplier</th><th>Unit cost</th><th>Qty</th><th>Left</th><th>Used</th><th>Note</th></tr></thead><tbody>${batches.map((b) => `<tr><td>${escapeHTML(fmtTime(b.created_at))}</td><td>${escapeHTML(b.product_name)}${b.variant_name ? " — " + escapeHTML(b.variant_name) : ""}</td><td>${escapeHTML(b.supplier || "—")}</td><td>${b.unit_cost == null ? "—" : money(b.unit_cost)}</td><td>${b.quantity}</td><td>${b.available}</td><td>${b.used}</td><td>${escapeHTML(b.note || "")}</td></tr>`).join("") || `<tr><td colspan="8" class="empty">No batches recorded yet.</td></tr>`}</tbody></table></div></div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Codes${rows.length > shown.length ? ` (latest ${shown.length} of ${rows.length})` : ""}</h3></div><div class="table-wrap"><table class="admin-table"><thead><tr><th>Product</th><th>Code</th><th>Status</th><th>Actions</th></tr></thead><tbody>${shown.map((r) => `<tr><td>${escapeHTML(r.product_name)}${r.variant_name ? ` — ${escapeHTML(r.variant_name)}` : ""}</td><td><code>${escapeHTML(r.code)}</code></td><td>${escapeHTML(r.status)}</td><td>${r.status === "available" ? `<button class="mini danger" data-del-code="${r.id}">Remove</button>` : "Locked"}</td></tr>`).join("") || `<tr><td colspan="4" class="empty">No digital codes.</td></tr>`}</tbody></table></div></div>`;
  $("#addCodes").onclick = () => inventoryForm(products, false);
  $("#importCodes").onclick = () => inventoryForm(products, true);
  $$("[data-del-code]").forEach(
    (b) =>
      (b.onclick = async () => {
        if (!confirm("Remove this available code?")) return;
        try {
          await api("/api/admin/inventory/" + b.dataset.delCode, {
            method: "DELETE",
          });
          toast("Code removed.");
          renderAdminTab();
        } catch (e) {
          toast(e.message);
        }
      }),
  );
}
// Small CSV reader: quotes, commas / semicolons / tabs, BOM.
function parseCSV(text) {
  text = String(text || "").replace(/^﻿/, "");
  const first = text.split(/\r?\n/, 1)[0] || "";
  const delim = [",", ";", "\t"].map((d) => [d, first.split(d).length]).sort((a, b) => b[1] - a[1])[0][0];
  const out = [];
  let row = [],
    cell = "",
    q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') (cell += '"'), i++;
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === delim) (row.push(cell), (cell = ""));
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      cell = "";
      if (row.some((x) => x.trim())) out.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x.trim())) out.push(row);
  return out;
}
function csvToCodeRows(text) {
  const grid = parseCSV(text);
  if (!grid.length) return [];
  const head = grid[0].map((x) => x.trim().toLowerCase());
  const hasHead = head.includes("code");
  const idx = (names, dflt) => {
    const i = head.findIndex((h) => names.includes(h));
    return hasHead ? i : dflt;
  };
  const ci = idx(["code"], 0),
    pi = idx(["product", "product_id", "slug"], grid[0].length > 1 ? 1 : -1),
    oi = idx(["option", "variant", "denomination"], grid[0].length > 2 ? 2 : -1);
  return grid
    .slice(hasHead ? 1 : 0)
    .map((r) => ({
      code: (r[ci] || "").trim(),
      product: pi >= 0 ? (r[pi] || "").trim() : "",
      option: oi >= 0 ? (r[oi] || "").trim() : "",
    }))
    .filter((r) => r.code);
}
function inventoryForm(products, csv = false) {
  openModal(
    csv ? "Import codes from CSV" : "Add digital codes",
    `<form id="invForm"><div class="field"><label>Product ${csv ? "(used for rows without a product column)" : ""}</label><select id="invProduct" ${csv ? "" : "required"}><option value="">Choose product</option>${products.map((p) => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join("")}</select></div><div class="field"><label>Variant / denomination</label><select id="invVariant"><option value="">Base product stock</option></select></div>${csv ? `<div class="field"><label>CSV file</label><input id="invFile" type="file" accept=".csv,.txt,text/csv,text/plain" required><small id="invInfo"></small></div>` : `<div class="field"><label>Codes, one per line</label><textarea id="invCodes" placeholder="CODE-ONE\nCODE-TWO\nCODE-THREE" required></textarea></div>`}<div class="form-grid"><div class="field"><label>Supplier (optional)</label><input id="invSupplier" maxlength="120"></div><div class="field"><label>Unit cost per code (optional)</label><input id="invCost" type="number" step="0.01" min="0"></div></div><div class="field"><label>Batch note (optional)</label><input id="invNote" maxlength="300"></div><div id="invResult"></div><div class="modal-actions"><button type="button" class="btn ghost" id="cancelInv">Cancel</button><button class="btn primary" id="invGo">${csv ? "Import" : "Add codes"}</button></div></form>`,
  );
  $("#cancelInv").onclick = () => openAdmin();
  $("#invProduct").onchange = () => {
    const p = products.find((x) => String(x.id) === $("#invProduct").value);
    $("#invVariant").innerHTML =
      `<option value="">Base product stock</option>` +
      (p?.variants || [])
        .map(
          (v) =>
            `<option value="${v.id}">${escapeHTML(v.name)} — ${money(v.price)}</option>`,
        )
        .join("");
  };
  let parsed = [];
  if (csv)
    $("#invFile").onchange = async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      parsed = csvToCodeRows(await f.text());
      $("#invInfo").textContent = `${parsed.length} code row(s) found.`;
    };
  const meta = () => ({
    product_id: $("#invProduct").value,
    variant_id: $("#invVariant").value,
    supplier: $("#invSupplier").value,
    unit_cost: $("#invCost").value,
    note: $("#invNote").value,
  });
  $("#invForm").onsubmit = async (e) => {
    e.preventDefault();
    const go = $("#invGo");
    go.disabled = true;
    try {
      if (!csv) {
        const r = await api("/api/admin/inventory", {
          method: "POST",
          body: JSON.stringify({ ...meta(), codes: $("#invCodes").value }),
        });
        toast(`${r.count} codes added${r.skipped ? `, ${r.skipped} duplicate(s) skipped` : ""}.`);
        openAdmin();
        refreshStore();
        return;
      }
      if (!parsed.length) throw new Error("The file has no codes.");
      let added = 0,
        skipped = 0,
        errCount = 0;
      const errs = [];
      for (let i = 0; i < parsed.length; i += 500) {
        $("#invInfo").textContent = `Importing ${Math.min(i + 500, parsed.length)} / ${parsed.length}...`;
        const r = await api("/api/admin/inventory/import", {
          method: "POST",
          body: JSON.stringify({ ...meta(), rows: parsed.slice(i, i + 500) }),
        });
        added += r.added;
        skipped += r.skipped;
        errCount += r.error_count;
        for (const x of r.errors) if (errs.length < 15) errs.push(`Row ${i + x.line}: ${x.message}`);
      }
      $("#invResult").innerHTML = `<div class="notice"><b>${added}</b> added · <b>${skipped}</b> duplicates skipped · <b>${errCount}</b> rows with errors${errs.length ? `<br>${errs.map(escapeHTML).join("<br>")}` : ""}</div>`;
      $("#invInfo").textContent = "";
      go.textContent = "Done";
      go.onclick = (ev) => {
        ev.preventDefault();
        state.admin.tab = "inventory";
        openAdmin();
        refreshStore();
      };
      go.disabled = false;
      return;
    } catch (err) {
      toast(err.message);
    }
    go.disabled = false;
  };
}
async function adminWaitlist(main) {
  const rows = await api("/api/admin/waitlist");
  main.innerHTML = `<div class="admin-top"><h2>Back-in-stock requests</h2><span class="eyebrow">${rows.length} OPEN</span></div><div class="notice" style="margin-bottom:12px">Customers who left an email are emailed automatically when codes are added. Phone / WhatsApp requests show as <b>ready</b> — tap WhatsApp to message them, then mark done.</div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Product</th><th>Contact</th><th>Status</th><th>Requested</th><th></th></tr></thead><tbody>${rows
    .map((r) => {
      const wa = r.is_email ? "" : waLink(r.contact, `Hi! ${r.product_name}${r.variant_name ? " — " + r.variant_name : ""} is back in stock at ${state.settings.store_name || "our store"}: ${location.origin}/product/${r.slug}`);
      return `<tr><td>${escapeHTML(r.product_name)}${r.variant_name ? " — " + escapeHTML(r.variant_name) : ""}</td><td>${escapeHTML(r.contact)}</td><td><span class="tag ${r.status === "ready" ? "green" : ""}">${escapeHTML(r.status)}</span></td><td><small>${escapeHTML(fmtTime(r.created_at))}</small></td><td>${wa ? `<a class="mini" href="${wa}" target="_blank" rel="noopener">WhatsApp</a> ` : ""}${r.status === "ready" ? `<button class="mini" data-wdone="${r.id}">Done</button> ` : ""}<button class="mini danger" data-wdel="${r.id}">Remove</button></td></tr>`;
    })
    .join("") || `<tr><td colspan="5" class="empty">No requests.</td></tr>`}</tbody></table></div></div>`;
  const run = (sel, attr, method) =>
    $$(sel).forEach(
      (b) =>
        (b.onclick = async () => {
          try {
            await api("/api/admin/waitlist/" + b.dataset[attr], { method });
            renderAdminTab();
            adminBadges();
          } catch (e) {
            toast(e.message);
          }
        }),
    );
  run("[data-wdone]", "wdone", "POST");
  run("[data-wdel]", "wdel", "DELETE");
}
async function adminReviews(main) {
  const rows = await api("/api/admin/reviews");
  main.innerHTML = `<div class="admin-top"><h2>Reviews</h2><span class="eyebrow">${rows.length} TOTAL</span></div><div class="notice" style="margin-bottom:12px">Approved reviews show on product pages. <b>Feature</b> an approved review to put it in the testimonials strip on the home page.</div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Product</th><th>Customer</th><th>Rating</th><th>Review</th><th>Status</th><th></th></tr></thead><tbody>${rows.map((r) => `<tr><td>${escapeHTML(r.product_name)}</td><td>${escapeHTML(r.user_name || "Customer")}</td><td>${"★".repeat(r.rating)}</td><td>${escapeHTML(r.body || "")}${r.has_photo ? `<br><a href="/api/admin/reviews/${r.id}/photo" target="_blank" rel="noopener"><img class="review-photo" src="/api/admin/reviews/${r.id}/photo" alt=""></a>` : ""}</td><td>${r.approved ? `<span class="tag green">approved</span>` : `<span class="tag">hidden</span>`}${r.featured ? ` <span class="tag green">featured</span>` : ""}</td><td><button class="mini" data-rev="${r.id}" data-ap="${r.approved ? 0 : 1}">${r.approved ? "Hide" : "Approve"}</button>${r.approved ? ` <button class="mini" data-feat="${r.id}" data-fv="${r.featured ? 0 : 1}">${r.featured ? "Unfeature" : "Feature"}</button>` : ""}</td></tr>`).join("") || `<tr><td colspan="6" class="empty">No reviews.</td></tr>`}</tbody></table></div></div>`;
  const put = (sel, key, val) =>
    $$(sel).forEach(
      (b) =>
        (b.onclick = async () => {
          try {
            await api("/api/admin/reviews/" + b.dataset[key], {
              method: "PUT",
              body: JSON.stringify(val(b)),
            });
            renderAdminTab();
          } catch (e) {
            toast(e.message);
          }
        }),
    );
  put("[data-rev]", "rev", (b) => ({ approved: b.dataset.ap === "1" }));
  put("[data-feat]", "feat", (b) => ({ featured: b.dataset.fv === "1" }));
}
async function adminRefunds(main) {
  const d = await api("/api/admin/refunds");
  main.innerHTML = `<div class="admin-top"><h2>Refunds & disputes</h2><span class="eyebrow">${d.log.length} LOGGED</span></div>
  <div class="admin-panel"><div class="panel-head"><h3>Products with the most problems</h3></div><div class="table-wrap"><table class="admin-table"><thead><tr><th>Product</th><th>Cases</th><th>Refunds</th><th>Most common reason</th></tr></thead><tbody>${d.problem_products.map((p) => `<tr><td>${escapeHTML(p.product_name)}</td><td>${p.cases}</td><td>${p.refunds}</td><td>${escapeHTML(REASON_LABEL[p.top_reason] || p.top_reason || "—")}</td></tr>`).join("") || `<tr><td colspan="4" class="empty">Nothing logged yet.</td></tr>`}</tbody></table></div></div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Log</h3></div><div class="table-wrap"><table class="admin-table"><thead><tr><th>When</th><th>Order</th><th>Type</th><th>Reason</th><th>Amount</th><th>Note</th><th>By</th></tr></thead><tbody>${d.log.map((l) => `<tr><td><small>${escapeHTML(fmtTime(l.created_at))}</small></td><td><button class="mini" data-open="${l.order_id}">${escapeHTML(l.order_number)}</button></td><td><span class="tag ${l.kind === "refund" ? "red" : ""}">${escapeHTML(l.kind)}</span></td><td>${escapeHTML(REASON_LABEL[l.reason] || l.reason)}</td><td>${l.amount != null ? money(l.amount) : "—"}</td><td>${escapeHTML(l.note || "")}</td><td>${escapeHTML(l.admin_name || "")}</td></tr>`).join("") || `<tr><td colspan="7" class="empty">No refunds or disputes logged.</td></tr>`}</tbody></table></div></div>`;
  $$("[data-open]").forEach((b) => (b.onclick = () => orderForm(Number(b.dataset.open))));
}
const b64uToU8 = (s) => {
  const p = "=".repeat((4 - (s.length % 4)) % 4),
    raw = atob((s + p).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
};
async function pushSub() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return null;
  const reg = await navigator.serviceWorker.getRegistration();
  return reg ? reg.pushManager.getSubscription() : null;
}
async function enablePush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window))
    throw new Error("This browser does not support push notifications. On iPhone, install the app to your home screen first.");
  if ((await Notification.requestPermission()) !== "granted")
    throw new Error("Notifications were not allowed for this site.");
  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub)
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: b64uToU8(state.settings.vapid_public_key),
    });
  await api("/api/admin/push/subscribe", { method: "POST", body: JSON.stringify({ endpoint: sub.endpoint }) });
}
async function disablePush() {
  const sub = await pushSub();
  if (!sub) return;
  await api("/api/admin/push/unsubscribe", { method: "POST", body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => {});
  await sub.unsubscribe();
}
async function opsPanelHTML() {
  const sub = await pushSub().catch(() => null);
  const st = state.settings;
  return `<div class="admin-panel" style="margin-top:14px"><div class="modal-body"><b>Notifications & email</b><div class="line"><span>Customer email (Resend / Mailgun)</span><span class="tag ${st.email_ready ? "green" : "red"}">${st.email_ready ? "configured" : "not configured"}</span></div>${st.email_ready ? "" : `<small>Set RESEND_API_KEY (or MAILGUN_API_KEY + MAILGUN_DOMAIN) and EMAIL_FROM as Worker secrets/variables to enable password reset and delivery emails.</small>`}<div class="line"><span>Admin push notifications</span><span class="tag ${st.push_ready ? "green" : "red"}">${st.push_ready ? "keys set" : "VAPID keys missing"}</span></div>${st.push_ready ? `<div class="modal-actions" style="margin:6px 0 0"><button class="btn ghost" id="pushToggle">${sub ? "Turn off on this device" : "Turn on for this device"}</button></div><small>Get a notification on this phone/computer for every new order, proof upload, customer message and duplicate-payment warning.</small>` : `<small>Generate keys with <code>node scripts/generate-vapid.mjs</code>, then set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY secrets.</small>`}</div></div>`;
}
async function bindOps() {
  $("#pushToggle")?.addEventListener("click", async (e) => {
    e.target.disabled = true;
    try {
      if (await pushSub()) await disablePush();
      else await enablePush();
      toast("Saved.");
      renderAdminTab();
    } catch (err) {
      toast(err.message);
      e.target.disabled = false;
    }
  });
}
function adminHeader(title, buttonText, id) {
  return `<div class="admin-top"><h2>${title}</h2><button class="btn primary" id="${id}">${buttonText}</button></div>`;
}
async function adminProducts(main) {
  const rows = await api("/api/admin/products");
  main.innerHTML =
    adminHeader("Products", "Add product", "addProduct") +
    `<div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Product</th><th>Price (editable)</th><th>Category</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows.map((p) => `<tr><td><b>${escapeHTML(p.name)}</b><br><small>${escapeHTML(p.platform || "")} ${escapeHTML(p.region || "")}</small></td><td><input type="number" step="0.01" min="0" value="${p.price}" data-qprice="${p.id}" style="width:96px"></td><td>${escapeHTML(p.category_name || "Uncategorized")}</td><td>${p.delivery_type === "code" ? p.stock : "Manual"}</td><td>${p.active ? "Active" : "Hidden"}${p.featured ? " · Featured" : ""}</td><td><div class="table-actions"><button class="mini" data-edit-product="${p.id}">Edit</button><button class="mini" data-toggle-product="${p.id}" data-active="${p.active ? 0 : 1}">${p.active ? "Hide" : "Show"}</button><button class="mini danger" data-delete-product="${p.id}">Delete</button></div></td></tr>`).join("") || `<tr><td colspan="6" class="empty">No products.</td></tr>`}</tbody></table></div></div>`;
  $("#addProduct").onclick = () => productForm();
  $$("[data-edit-product]").forEach(
    (b) =>
      (b.onclick = () =>
        productForm(rows.find((x) => x.id == b.dataset.editProduct))),
  );
  $$("[data-qprice]").forEach(
    (i) =>
      (i.onchange = async () => {
        const p = rows.find((x) => x.id == i.dataset.qprice);
        try {
          await api("/api/admin/products/" + p.id, {
            method: "PUT",
            body: JSON.stringify({ ...p, price: i.value }),
          });
          p.price = Number(i.value);
          toast("Price updated.");
          refreshStore();
        } catch (e) {
          toast(e.message);
          i.value = p.price;
        }
      }),
  );
  $$("[data-toggle-product]").forEach(
    (b) =>
      (b.onclick = async () => {
        try {
          await api(`/api/admin/products/${b.dataset.toggleProduct}/active`, {
            method: "POST",
            body: JSON.stringify({ active: b.dataset.active === "1" }),
          });
          renderAdminTab();
          refreshStore();
        } catch (e) {
          toast(e.message);
        }
      }),
  );
  $$("[data-delete-product]").forEach(
    (b) =>
      (b.onclick = async () => {
        if (
          !confirm(
            "Permanently delete this product and its unsold codes? (Products with past orders can only be hidden.)",
          )
        )
          return;
        try {
          await api(`/api/admin/products/${b.dataset.deleteProduct}?hard=1`, {
            method: "DELETE",
          });
          toast("Product deleted.");
          renderAdminTab();
          refreshStore();
        } catch (e) {
          toast(e.message);
        }
      }),
  );
}
function productForm(p = null) {
  const vars = p?.variants || [];
  openModal(
    p ? "Edit product" : "Add product",
    `<form id="productForm"><div class="form-grid"><div class="field"><label>Name</label><input id="pName" value="${escapeHTML(p?.name || "")}" required></div><div class="field"><label>${t("Name (Arabic)")}</label><input id="pNameAr" dir="rtl" value="${escapeHTML(p?.name_ar || "")}"></div><div class="field"><label>Slug</label><input id="pSlug" value="${escapeHTML(p?.slug || "")}"></div><div class="field"><label>Price (EGP)</label><input id="pPrice" type="number" step="0.01" value="${p?.price ?? ""}" required></div><div class="field"><label>Old price (EGP)</label><input id="pOld" type="number" step="0.01" value="${p?.old_price ?? ""}"></div><div class="field"><label>Category</label><select id="pCategory"><option value="">Uncategorized</option>${state.categories.map((c) => `<option value="${c.id}" ${p?.category_id == c.id ? "selected" : ""}>${escapeHTML(c.name)}</option>`).join("")}</select></div><div class="field"><label>Delivery</label><select id="pDelivery"><option value="manual" ${p?.delivery_type !== "code" ? "selected" : ""}>Manual</option><option value="code" ${p?.delivery_type === "code" ? "selected" : ""}>Digital code</option></select></div><div class="field"><label>Platform</label><input id="pPlatform" value="${escapeHTML(p?.platform || "")}" placeholder="PC, PlayStation..."></div><div class="field"><label>Region</label><input id="pRegion" value="${escapeHTML(p?.region || "")}" placeholder="EG, Global..."></div><div class="field"><label>Low-stock alert at (codes left, empty = default)</label><input id="pLow" type="number" min="0" value="${p?.low_stock_threshold ?? ""}"></div><div class="field"><label>Cost price (manual products, for profit)</label><input id="pCost" type="number" step="0.01" min="0" value="${p?.cost_price ?? ""}"></div></div><div class="field"><label>Image URL</label><input id="pImage" value="${escapeHTML(p?.image_url || "")}" placeholder="https://..."></div><div class="field"><label>${t("Image upload")}</label><input id="pImageFile" type="file" accept="image/*"></div><div class="form-grid"><div class="field"><label>Description</label><textarea id="pDescription">${escapeHTML(p?.description || "")}</textarea></div><div class="field"><label>${t("Description (Arabic)")}</label><textarea id="pDescriptionAr" dir="rtl">${escapeHTML(p?.description_ar || "")}</textarea></div></div><details open style="margin-top:12px"><summary><b>${t("Variants / denominations")}</b></summary><div id="variantRows" style="margin-top:10px">${vars.map((v) => `<div class="form-grid variant-row" data-variant-id="${v.id}"><input class="vName" value="${escapeHTML(v.name)}" placeholder="${t("Option name")}"><input class="vPrice" type="number" step="0.01" value="${v.price}" placeholder="Price"><input class="vOld" type="number" step="0.01" value="${v.old_price ?? ""}" placeholder="Old price"><label><input class="vActive" type="checkbox" ${v.active ? "checked" : ""}> Active</label><button type="button" class="mini danger vRemove">Remove</button></div>`).join("")}</div><button type="button" class="mini" id="addVariantRow" style="margin-top:8px">${t("Add")}</button><small style="display:block;margin-top:6px">For digital products, add codes to each option from Digital codes.</small></details><div class="form-grid" style="margin-top:12px"><label><input id="pActive" type="checkbox" ${p?.active !== 0 ? "checked" : ""}> Active</label><label><input id="pFeatured" type="checkbox" ${p?.featured ? "checked" : ""}> Featured</label></div><div class="modal-actions"><button type="button" class="btn ghost" id="cancelP">Cancel</button><button class="btn primary">Save product</button></div></form>`,
  );
  $("#cancelP").onclick = () => openAdmin();
  const nameInput = $("#pName"),
    slugInput = $("#pSlug");
  if (!p && nameInput && slugInput) {
    let slugTouched = false;
    slugInput.addEventListener("input", () => (slugTouched = true));
    nameInput.addEventListener("input", () => {
      if (!slugTouched) slugInput.value = slugifyClient(nameInput.value);
    });
    slugInput.value = slugifyClient(nameInput.value);
  }
  const addVariantRow = () => {
    const row = document.createElement("div");
    row.className = "form-grid variant-row";
    row.innerHTML = `<input class="vName" placeholder="${t("Option name")}"><input class="vPrice" type="number" step="0.01" placeholder="Price"><input class="vOld" type="number" step="0.01" placeholder="Old price"><label><input class="vActive" type="checkbox" checked> Active</label><button type="button" class="mini danger vRemove">Remove</button>`;
    $("#variantRows").appendChild(row);
  };
  $("#addVariantRow").onclick = addVariantRow;
  $("#variantRows").addEventListener("click", async (e) => {
    if (!e.target.classList.contains("vRemove")) return;
    const row = e.target.closest(".variant-row"),
      vid = row.dataset.variantId;
    if (vid) {
      if (!confirm("Remove this option? Its unsold codes go back to the base product stock."))
        return;
      try {
        await api(`/api/admin/products/${p.id}/variants/${vid}`, {
          method: "DELETE",
        });
        refreshStore();
      } catch (err) {
        toast(err.message);
        return;
      }
    }
    row.remove();
  });
  $("#productForm").onsubmit = async (e) => {
    e.preventDefault();
    const b = {
      name: $("#pName").value,
      name_ar: $("#pNameAr").value,
      slug: $("#pSlug").value,
      price: $("#pPrice").value,
      old_price: $("#pOld").value,
      category_id: $("#pCategory").value,
      delivery_type: $("#pDelivery").value,
      platform: $("#pPlatform").value,
      region: $("#pRegion").value,
      low_stock_threshold: $("#pLow").value,
      cost_price: $("#pCost").value,
      image_url: $("#pImage").value,
      description: $("#pDescription").value,
      description_ar: $("#pDescriptionAr").value,
      active: $("#pActive").checked,
      featured: $("#pFeatured").checked,
    };
    try {
      const r = await api("/api/admin/products" + (p ? "/" + p.id : ""), {
          method: p ? "PUT" : "POST",
          body: JSON.stringify(b),
        }),
        id = p?.id || r.id;
      for (const row of $$("#variantRows .variant-row")) {
        const payload = {
          name: row.querySelector(".vName").value,
          price: row.querySelector(".vPrice").value,
          old_price: row.querySelector(".vOld").value,
          active: row.querySelector(".vActive").checked,
        };
        if (!payload.name) continue;
        const vid = row.dataset.variantId;
        if (vid)
          await api(`/api/admin/products/${id}/variants/${vid}`, {
            method: "PUT",
            body: JSON.stringify(payload),
          });
        else
          await api(`/api/admin/products/${id}/variants`, {
            method: "POST",
            body: JSON.stringify(payload),
          });
      }
      const file = $("#pImageFile")?.files?.[0];
      if (file) await uploadAdminImage(id, file);
      toast("Product saved.");
      openAdmin();
      refreshStore();
    } catch (err) {
      toast(err.message);
    }
  };
}
async function uploadAdminImage(id, file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`/api/admin/products/${id}/image`, {
    method: "POST",
    credentials: "same-origin",
    body: fd,
  });
  let body = {};
  try {
    body = await res.json();
  } catch {}
  if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
  return body;
}
async function adminMerge(main) {
  const [rows, merged] = await Promise.all([
    api("/api/admin/products"),
    api("/api/admin/merged-products"),
  ]);
  const code = rows.filter((p) => p.delivery_type === "code" && p.active);
  const groups = new Map();
  for (const v of merged) {
    if (!groups.has(v.target_id)) groups.set(v.target_id, { name: v.target_name, opts: [] });
    groups.get(v.target_id).opts.push(v);
  }
  main.innerHTML = `<div class="admin-top"><h2>Combine products</h2></div>
  <div class="notice"><b>What this does:</b> turns several separate products (e.g. "PSN 10", "PSN 20", "PSN 50") into one product with options. Your codes, orders and customers are untouched: the old products are only hidden, and you can undo it any time until an option is sold.</div>
  <div class="admin-panel" style="margin-top:12px"><div class="modal-body">
    <h3 style="margin:0 0 10px">1. Where should they go?</h3>
    <label style="display:block;margin:6px 0"><input type="radio" name="mMode" value="new" checked> Create a new combined product</label>
    <label style="display:block;margin:6px 0"><input type="radio" name="mMode" value="existing"> Add to a product I already have</label>
    <div class="field" id="mNewBox" style="margin-top:10px"><label>Name of the new product</label><input id="mNewName" maxlength="120" placeholder="e.g. PlayStation Gift Card"></div>
    <div class="field" id="mExistBox" style="margin-top:10px" hidden><label>Existing product</label><select id="mTarget"><option value="">Choose product</option>${code.map((p) => `<option value="${p.id}">${escapeHTML(p.name)} — ${money(p.price)}</option>`).join("")}</select><small>Its own codes stay sellable as their own option.</small></div>
    <h3 style="margin:18px 0 10px">2. Which products become options?</h3>
    <div class="field"><input id="mFilter" placeholder="Search products..."></div>
    <div id="mList" style="max-height:340px;overflow:auto;border:1px solid #29222f;border-radius:12px"></div>
    <small>Only simple digital-code products (no options of their own) can be added. For each ticked product you can rename the option and change its price.</small>
    <div id="mPreview" style="margin-top:14px"></div>
    <div class="modal-actions"><button class="btn ghost" id="mPreviewBtn">3. Preview</button><button class="btn primary" id="mExecBtn" disabled>Combine now</button></div>
  </div></div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Already combined</h3></div><div class="modal-body">${
    [...groups.entries()]
      .map(
        ([tid, g]) =>
          `<div style="margin-bottom:16px"><div class="line"><b>${escapeHTML(g.name)}</b><button class="mini danger" data-undo-all="${tid}">Undo all</button></div><div class="table-wrap"><table class="admin-table"><thead><tr><th>Option</th><th>Price</th><th>Made from</th><th>In stock</th><th>Orders</th><th></th></tr></thead><tbody>${g.opts
            .map(
              (v) =>
                `<tr><td>${escapeHTML(v.name)}</td><td>${money(v.price)}</td><td>${escapeHTML(v.sources || "")}${v.is_self ? " <small>(its own codes)</small>" : ""}</td><td>${v.stock}</td><td>${v.orders}</td><td>${v.orders ? `<small>sold — can't undo</small>` : `<button class="mini danger" data-undo="${v.id}">Undo</button>`}</td></tr>`,
            )
            .join("")}</tbody></table></div></div>`,
      )
      .join("") || `<div class="empty small">Nothing combined yet.</div>`
  }<small>Undo brings the old product back and removes that option. It isn't available once an option has been ordered.</small></div></div>`;

  const picked = new Map(); // id -> {name, price}
  let preview = false;
  const mode = () => document.querySelector('input[name="mMode"]:checked').value;
  const targetId = () => (mode() === "existing" ? Number($("#mTarget").value) || 0 : 0);
  const reset = () => {
    preview = false;
    $("#mExecBtn").disabled = true;
    $("#mPreview").innerHTML = "";
  };
  const drawList = () => {
    const q = $("#mFilter").value.trim().toLowerCase(),
      tid = targetId();
    const list = code.filter(
      (p) => p.id !== tid && !(p.variants || []).length && (!q || p.name.toLowerCase().includes(q) || picked.has(p.id)),
    );
    $("#mList").innerHTML =
      list
        .map((p) => {
          const on = picked.get(p.id);
          return `<div class="line" style="padding:10px 12px;border-bottom:1px solid #211d27;align-items:center;flex-wrap:wrap"><label style="flex:1;min-width:180px"><input type="checkbox" data-pick="${p.id}" ${on ? "checked" : ""}> ${escapeHTML(p.name)} <small>· ${money(p.price)} · ${p.stock} in stock</small></label>${on ? `<span style="display:flex;gap:6px"><input data-oname="${p.id}" value="${escapeHTML(on.name)}" placeholder="Option name" style="width:150px"><input data-oprice="${p.id}" type="number" step="0.01" min="0" value="${on.price}" style="width:90px"></span>` : ""}</div>`;
        })
        .join("") || `<div class="empty small">No products to show.</div>`;
    $$("[data-pick]").forEach(
      (c) =>
        (c.onchange = () => {
          const id = Number(c.dataset.pick),
            p = code.find((x) => x.id === id);
          if (c.checked) picked.set(id, { name: p.name, price: p.price });
          else picked.delete(id);
          reset();
          drawList();
        }),
    );
    $$("[data-oname]").forEach((i) => (i.oninput = () => ((picked.get(Number(i.dataset.oname)).name = i.value), reset())));
    $$("[data-oprice]").forEach((i) => (i.oninput = () => ((picked.get(Number(i.dataset.oprice)).price = i.value), reset())));
  };
  $$('input[name="mMode"]').forEach(
    (r) =>
      (r.onchange = () => {
        $("#mNewBox").hidden = mode() !== "new";
        $("#mExistBox").hidden = mode() !== "existing";
        picked.delete(targetId());
        reset();
        drawList();
      }),
  );
  $("#mTarget").onchange = () => {
    picked.delete(targetId());
    reset();
    drawList();
  };
  $("#mNewName").oninput = reset;
  $("#mFilter").oninput = drawList;
  const body = () => ({
    target_id: targetId() || "",
    new_name: mode() === "new" ? $("#mNewName").value : "",
    source_ids: [...picked.keys()],
    options: Object.fromEntries([...picked.entries()].map(([id, o]) => [id, { name: o.name, price: o.price }])),
  });
  $("#mPreviewBtn").onclick = async () => {
    try {
      const p = await api("/api/admin/product-merger/preview", { method: "POST", body: JSON.stringify(body()) });
      $("#mPreview").innerHTML = `<div class="notice"><b>${p.new_target ? `New product: ${escapeHTML(p.target.name)}` : `Into: ${escapeHTML(p.target.name)}`}</b>${p.target_option ? `<div class="line"><span>${escapeHTML(p.target.name)} (its own codes)</span><span>${p.target.stock} in stock</span></div>` : ""}${p.options.map((o) => `<div class="line"><span>${escapeHTML(o.name)} — ${money(o.price)}</span><span>${o.stock} in stock</span></div>`).join("")}<div style="margin-top:8px">Total stock: <b>${p.total_stock}</b> · Past orders kept: <b>${p.historical_orders}</b><br><small>Nothing has been changed yet.</small></div></div>`;
      preview = true;
      $("#mExecBtn").disabled = false;
    } catch (e) {
      reset();
      toast(e.message);
    }
  };
  $("#mExecBtn").onclick = async () => {
    if (!preview || !confirm("Combine these products now? The old products will be hidden. You can undo it later.")) return;
    $("#mExecBtn").disabled = true;
    try {
      await api("/api/admin/product-merger/execute", { method: "POST", body: JSON.stringify(body()) });
      toast("Products combined.");
      state.admin.tab = "merge";
      await refreshStore();
      renderAdminTab();
    } catch (e) {
      toast(e.message);
      $("#mExecBtn").disabled = false;
    }
  };
  const undo = async (id) => api("/api/admin/product-merger/undo", { method: "POST", body: JSON.stringify({ variant_id: String(id) }) });
  $$("[data-undo]").forEach(
    (b) =>
      (b.onclick = async () => {
        if (!confirm("Undo this option? The old product comes back and this option is removed.")) return;
        try {
          await undo(b.dataset.undo);
          toast("Undone.");
          await refreshStore();
          renderAdminTab();
        } catch (e) {
          toast(e.message);
        }
      }),
  );
  $$("[data-undo-all]").forEach(
    (b) =>
      (b.onclick = async () => {
        const g = groups.get(Number(b.dataset.undoAll));
        if (g.opts.some((v) => v.orders)) return toast("Some options were already ordered, so they can't be undone. Undo the others one by one.");
        if (!confirm(`Undo everything combined into "${g.name}"?`)) return;
        try {
          for (const v of g.opts.filter((v) => !v.is_self)) await undo(v.id);
          for (const v of g.opts.filter((v) => v.is_self)) await undo(v.id);
          toast("Undone.");
          await refreshStore();
          renderAdminTab();
        } catch (e) {
          toast(e.message);
          renderAdminTab();
        }
      }),
  );
  drawList();
}
async function adminAudit(main) {
  const rows = await api("/api/admin/audit");
  main.innerHTML = `<div class="admin-top"><h2>Audit log</h2><span class="eyebrow">LAST 250 ACTIONS</span></div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Time</th><th>Admin</th><th>Action</th><th>Target</th><th>Details</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${escapeHTML(r.created_at)}</td><td>${escapeHTML(r.admin_name || r.admin_email || "System")}</td><td>${escapeHTML(r.action)}</td><td>${escapeHTML(`${r.target_type || ""} ${r.target_id || ""}`)}</td><td>${escapeHTML(r.details || "")}</td></tr>`).join("") || '<tr><td colspan="5" class="empty">No admin actions logged yet.</td></tr>'}</tbody></table></div></div>`;
}
async function adminCategories(main) {
  const rows = await api("/api/admin/categories");
  main.innerHTML =
    adminHeader("Categories", "Add category", "addCategory") +
    `<div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Name</th><th>Slug</th><th>Actions</th></tr></thead><tbody>${rows.map((c) => `<tr><td>${escapeHTML(c.name)}</td><td>${escapeHTML(c.slug)}</td><td><button class="mini" data-edit-cat="${c.id}">Edit</button> <button class="mini danger" data-del-cat="${c.id}">Delete</button></td></tr>`).join("")}</tbody></table></div></div>`;
  $("#addCategory").onclick = () => categoryForm();
  $$("[data-edit-cat]").forEach(
    (b) =>
      (b.onclick = () =>
        categoryForm(rows.find((x) => x.id == b.dataset.editCat))),
  );
  $$("[data-del-cat]").forEach(
    (b) =>
      (b.onclick = async () => {
        if (!confirm("Delete category? Products will become uncategorized."))
          return;
        try {
          await api("/api/admin/categories/" + b.dataset.delCat, {
            method: "DELETE",
          });
          toast("Category deleted.");
          renderAdminTab();
          refreshStore();
        } catch (e) {
          toast(e.message);
        }
      }),
  );
}
function categoryForm(c = null) {
  let artwork = {};
  try { artwork = JSON.parse(state.settings.category_artwork || "{}"); } catch {}
  const currentArt = artwork[c?.id] || "";
  openModal(
    c ? "Edit category" : "Add category",
    `<form id="catForm"><div class="field"><label>Name</label><input id="catName" value="${escapeHTML(c?.name || "")}" required></div><div class="field"><label>${t("Category name (Arabic)")}</label><input id="catNameAr" dir="rtl" value="${escapeHTML(c?.name_ar || "")}"></div><div class="field"><label>Slug</label><input id="catSlug" value="${escapeHTML(c?.slug || "")}"></div><div class="field"><label>Category artwork image URL (optional)</label><input id="catImage" type="url" placeholder="https://…" value="${escapeHTML(currentArt)}"><small>Used on the visual category card. If empty, Kardivo uses an image from one of this category’s products.</small></div><div class="modal-actions"><button type="button" class="btn ghost" id="cancelCat">Cancel</button><button class="btn primary">Save</button></div></form>`,
  );
  $("#cancelCat").onclick = () => openAdmin();
  $("#catForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = $("#catImage").value.trim();
      if (imageUrl && !/^https?:\/\//i.test(imageUrl)) throw new Error("Use a valid http(s) image URL.");
      const saved = await api("/api/admin/categories" + (c ? "/" + c.id : ""), {
        method: c ? "PUT" : "POST",
        body: JSON.stringify({
          name: $("#catName").value,
          name_ar: $("#catNameAr").value,
          slug: $("#catSlug").value,
        }),
      });
      const categoryId = c ? c.id : saved.id;
      if (categoryId) {
        if (imageUrl) artwork[categoryId] = imageUrl;
        else delete artwork[categoryId];
        await api("/api/admin/settings", { method: "PUT", body: JSON.stringify({ category_artwork: JSON.stringify(artwork) }) });
        state.settings.category_artwork = JSON.stringify(artwork);
      }
      toast("Category saved.");
      openAdmin();
      refreshStore();
    } catch (err) {
      toast(err.message);
    }
  };
}
async function adminSettings(main) {
  const s = await api("/api/admin/settings");
  const field = ([k, label, type]) =>
    type === "toggle"
      ? `<label class="switch-row" style="margin:8px 0"><span>${label}</span><input class="switch" id="s_${k}" type="checkbox" ${s[k] !== "0" ? "checked" : ""}></label>`
      : `<div class="field"><label>${label}</label>${type === "textarea" ? `<textarea id="s_${k}">${escapeHTML(s[k] || "")}</textarea>` : `<input id="s_${k}" type="${type === "color" ? "color" : type === "number" ? "number" : "text"}" ${type === "number" ? 'step="0.01"' : ""} value="${escapeHTML(s[k] || "")}">`}</div>`;
  const pay = `<details open><summary><b>Payment methods</b></summary>${PAY.map(([k, n]) => `<div class="switch-row"><div><b>${n}</b><div class="field" style="margin:7px 0 0"><input id="s_${k}" value="${escapeHTML(s[k] || "")}" placeholder="Destination / number"></div></div><input class="switch" id="s_${k}_enabled" type="checkbox" ${s[k + "_enabled"] !== "0" ? "checked" : ""}></div>`).join("")}</details>`;
  main.innerHTML = `<div class="admin-top"><h2>Settings</h2><span class="eyebrow">EVERYTHING EDITABLE</span></div><form id="settingsForm" class="admin-panel"><div class="modal-body">${pay}${SETTINGS_SCHEMA.map(([t, f]) => `<details style="margin-top:14px"><summary><b>${t}</b></summary>${f.map(field).join("")}</details>`).join("")}<div class="modal-actions"><button class="btn primary">Save settings</button></div></div></form>
  <form id="pwForm" class="admin-panel" style="margin-top:14px"><div class="modal-body"><b>Change admin password</b><div class="form-grid"><div class="field"><label>Current password</label><input id="pwCur" type="password" required></div><div class="field"><label>New password (8+ characters)</label><input id="pwNew" type="password" minlength="8" required></div></div><div class="modal-actions"><button class="btn ghost">Change password</button></div></div></form>`;
  main.insertAdjacentHTML("beforeend", await opsPanelHTML());
  bindOps();
  $$('[id^="s_"][id$="_ar"]').forEach((e) => (e.dir = "rtl"));
  $("#settingsForm").onsubmit = async (e) => {
    e.preventDefault();
    const body = {};
    for (const k of PAY.map((x) => x[0])) {
      body[k] = $("#s_" + k).value;
      body[k + "_enabled"] = $("#s_" + k + "_enabled").checked ? "1" : "0";
    }
    for (const [, f] of SETTINGS_SCHEMA)
      for (const [k, , type] of f) {
        const el = $("#s_" + k);
        body[k] = type === "toggle" ? (el.checked ? "1" : "0") : el.value;
      }
    try {
      await api("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify(body),
      });
      state.settings = await api("/api/settings/public");
      applySettings();
      renderCampaign();
      renderFooter();
      renderCategoryCards();
      renderPopularProducts();
      renderProducts();
      toast("Settings saved.");
    } catch (err) {
      toast(err.message);
    }
  };
  $("#pwForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await api("/api/admin/password", {
        method: "POST",
        body: JSON.stringify({
          current_password: $("#pwCur").value,
          new_password: $("#pwNew").value,
        }),
      });
      toast("Password changed.");
      $("#pwCur").value = "";
      $("#pwNew").value = "";
    } catch (err) {
      toast(err.message);
    }
  };
}
async function refreshStore() {
  const [p, c, s] = await Promise.all([
    api("/api/products"),
    api("/api/categories"),
    api("/api/settings/public"),
  ]);
  state.products = p;
  state.categories = c;
  state.settings = s;
  applySettings();
  renderCampaign();
  renderCategories();
  renderSmartFilters();
  renderHeroShowcase();
  renderProducts();
  renderFooter();
}
const PAY = [
  ["instapay", "InstaPay"],
  ["vodafone_cash", "Vodafone Cash"],
  ["telda", "Telda"],
];
const payNameEN = (k) => (PAY.find((x) => x[0] === k) || [k, { store_credit: "Store credit", free: "Free" }[k] || k])[1];
const payName = (k) =>
  state.lang === "ar" && PAY_AR[k] ? PAY_AR[k] : payNameEN(k);
let homeHTML = "";
const SETTINGS_SCHEMA = [
  [
    "Store identity",
    [
      ["store_name", "Store name"],
      ["logo_url", "Logo image URL"],
      ["store_currency", "Currency label (e.g. EGP)"],
      ["usd_exchange_rate", "EGP per 1 USD (display conversion rate)", "number"],
      ["accent_color", "Accent color", "color"],
      ["announcement", "Announcement bar text (empty = hidden)"],
      ["meta_title", "Browser tab title"],
      ["meta_description", "Search / sharing description", "textarea"],
    ],
  ],
  [
    "Homepage text",
    [
      ["hero_eyebrow", "Hero small label"],
      ["hero_title", "Hero headline (new line = line break)", "textarea"],
      ["hero_text", "Hero paragraph", "textarea"],
      ["hero_cta", "Main button text"],
      ["hero_cta2", "Second button text"],
      ["trust_1", "Trust point 1"],
      ["trust_2", "Trust point 2"],
      ["trust_3", "Trust point 3"],
      ["category_eyebrow", "Category section eyebrow"],
      ["category_title", "Category section title"],
      ["category_text", "Category section description", "textarea"],
      ["category_link", "Category section link text"],
      ["popular_eyebrow", "Featured products eyebrow"],
      ["popular_title", "Featured products title"],
      ["popular_text", "Featured products description", "textarea"],
      ["popular_link", "Featured products link text"],
      ["catalog_eyebrow", "Catalog small label"],
      ["catalog_title", "Catalog heading"],
      ["search_placeholder", "Search box placeholder"],
      ["deals_eyebrow", "Deals small label"],
      ["deals_title", "Deals heading"],
      ["deals_text", "Deals paragraph", "textarea"],
      ["deal_1", "Deal point 1"],
      ["deal_2", "Deal point 2"],
      ["deal_3", "Deal point 3"],
      ["how_eyebrow", "How-it-works small label"],
      ["how_title", "How-it-works heading"],
      ["step1_title", "Step 1 title"],
      ["step1_text", "Step 1 text", "textarea"],
      ["step2_title", "Step 2 title"],
      ["step2_text", "Step 2 text", "textarea"],
      ["step3_title", "Step 3 title"],
      ["step3_text", "Step 3 text", "textarea"],
    ],
  ],
  [
    "Promotional campaign",
    [
      ["campaign_enabled", "Show homepage campaign banner", "toggle"],
      ["campaign_eyebrow", "Campaign eyebrow"],
      ["campaign_title", "Campaign headline", "textarea"],
      ["campaign_text", "Campaign description", "textarea"],
      ["campaign_cta", "Campaign button text"],
      ["campaign_link", "Campaign destination (internal path or https URL)"],
      ["campaign_image", "Campaign artwork image URL (optional)"],
    ],
  ],
  [
    "Orders & stock",
    [
      ["orders_open", "Accept new orders", "toggle"],
      ["orders_closed_text", "Message shown when orders are paused"],
      ["order_prefix", "Order number prefix"],
      ["max_qty", "Max quantity per product per order", "number"],
      ["reserve_hours", "Hold stock for unpaid code orders (hours)", "number"],
      ["low_stock_threshold", "Low-stock warning at (codes left)", "number"],
      ["show_stock", "Show stock counts to customers", "toggle"],
    ],
  ],
  [
    "Support & footer",
    [
      ["whatsapp", "WhatsApp number (international format)"],
      ["support_text", "Support text", "textarea"],
      ["support_email", "Support email"],
      ["instagram", "Instagram URL"],
      ["facebook", "Facebook URL"],
      ["tiktok", "TikTok URL"],
      ["footer_tagline", "Footer tagline"],
      ["footer_credit", "Footer credit line"],
    ],
  ],
  [
    "Growth & email",
    [
      ["referral_enabled", "Referral codes (friend gets first-order discount, referrer gets store credit)", "toggle"],
      ["referral_discount_percent", "Friend's first-order discount (%)", "number"],
      ["referral_reward", "Store credit for the referrer (EGP)", "number"],
      ["email_codes", "Include the delivered codes in the delivery email", "toggle"],
      ["testimonials_enabled", "Show testimonials strip on the home page", "toggle"],
      ["backup_keep", "Keep this many database backups", "number"],
    ],
  ],
];
SETTINGS_SCHEMA.push([
  "Arabic text (النص العربي) - shown on the Arabic site. Empty field = English text is shown instead.",
  [
    "announcement",
    "meta_title",
    "meta_description",
    "orders_closed_text",
    "hero_eyebrow",
    "hero_title",
    "hero_text",
    "hero_cta",
    "hero_cta2",
    "trust_1",
    "trust_2",
    "trust_3",
    "category_eyebrow",
    "category_title",
    "category_text",
    "category_link",
    "popular_eyebrow",
    "popular_title",
    "popular_text",
    "popular_link",
    "campaign_eyebrow",
    "campaign_title",
    "campaign_text",
    "campaign_cta",
    "catalog_eyebrow",
    "catalog_title",
    "search_placeholder",
    "deals_eyebrow",
    "deals_title",
    "deals_text",
    "deal_1",
    "deal_2",
    "deal_3",
    "how_eyebrow",
    "how_title",
    "step1_title",
    "step1_text",
    "step2_title",
    "step2_text",
    "step3_title",
    "step3_text",
    "support_text",
    "footer_tagline",
    "footer_credit",
  ].map((k) => {
    const f = SETTINGS_SCHEMA.flatMap((g) => g[1]).find((x) => x[0] === k);
    return [
      k + "_ar",
      "AR - " + f[1],
      f[2] === "textarea" ? "textarea" : undefined,
    ];
  }),
]);
function mix(a, b, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)),
    x = p(a),
    y = p(b);
  return (
    "#" +
    x
      .map((v, i) =>
        Math.round(v + (y[i] - v) * t)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
const isProductRoute = () =>
  location.pathname !== "/" &&
  location.pathname !== "" &&
  location.pathname !== "/index.html";
function applySettings() {
  const s = state.settings;
  $$("[data-s]").forEach((el) => {
    const v = S(el.dataset.s);
    if (v == null || v === "") return;
    if (el.hasAttribute("data-br"))
      el.innerHTML = escapeHTML(v).replace(/\n/g, "<br>");
    else el.textContent = v;
  });
  $$("[data-store-name]").forEach(
    (el) => (el.textContent = s.store_name || "Kardivo"),
  );
  const lu = s.logo_url || logo;
  $$("[data-logo]").forEach((i) => {
    i.src = lu;
    i.alt = s.store_name || "Kardivo";
  });
  const fav = $("#favicon");
  if (fav) fav.href = lu;
  const ph = $("#search");
  if (ph && S("search_placeholder")) ph.placeholder = S("search_placeholder");
  const a = $("#announce");
  if (a) {
    a.textContent = S("announcement") || "";
    a.hidden = !S("announcement");
  }
  if (/^#[0-9a-f]{6}$/i.test(s.accent_color || "")) {
    const r = document.documentElement.style;
    r.setProperty("--purple", s.accent_color);
    r.setProperty("--purple-bright", mix(s.accent_color, "#ffffff", 0.25));
    r.setProperty("--purple-deep", mix(s.accent_color, "#000000", 0.25));
  }
  const md = $("#metaDesc");
  if (md && S("meta_description")) md.content = S("meta_description");
  if (!isProductRoute())
    document.title = `${s.store_name || "Kardivo"} | ${S("meta_title") || "Digital gaming marketplace"}`;
}
function showHome() {
  document.body.classList.remove("product-route");
  $("main").innerHTML = homeHTML;
  translateStatic();
  applySettings();
  renderCampaign();
  renderCategories();
  renderSmartFilters();
  renderHeroShowcase();
  renderCategoryCards();
  renderPopularProducts();
  renderProducts();
  $("#sort").value = state.sort;
  $("#search").value = state.query;
  renderSearchSuggestions();
  renderTestimonials();
}
async function route() {
  if (isProductRoute())
    await openProductPage(
      decodeURIComponent(location.pathname.slice(1)).replace(/\/$/, ""),
    );
  else showHome();
}
function navigate(path, scrollTo) {
  history.pushState({}, "", path);
  route().then(() => {
    if (scrollTo) setTimeout(() => $(scrollTo)?.scrollIntoView(), 30);
    else window.scrollTo(0, 0);
  });
}
function bindCopy() {
  $$("[data-copy]").forEach(
    (b) =>
      (b.onclick = () => {
        navigator.clipboard?.writeText(b.dataset.copy);
        toast(t("Copied."));
      }),
  );
}
async function adminCustomers(main) {
  const rows = await api("/api/admin/customers");
  main.innerHTML = `<div class="admin-top"><h2>Customers</h2><span class="eyebrow">${rows.length} ACCOUNTS</span></div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Orders</th><th>Paid total</th><th>Joined</th></tr></thead><tbody>${rows.map((u) => `<tr><td>${escapeHTML(u.name)}</td><td>${escapeHTML(u.email)}</td><td>${escapeHTML(u.role)}</td><td>${u.orders}</td><td>${money(u.spent)}</td><td>${escapeHTML(u.created_at)}</td></tr>`).join("")}</tbody></table></div></div>`;
}
$("#langBtn").onclick = () => setLang(state.lang === "ar" ? "en" : "ar");
$("#currencyBtn").addEventListener("click", (event) => { event.preventDefault(); toggleCurrency(); });
$("#cartBtn").onclick = openCart;
$("#accountBtn").onclick = openAccount;
$("#footerAccount").onclick = (e) => {
  e.preventDefault();
  openAccount();
};
$("#searchFocus").onclick = () => {
  if (isProductRoute()) {
    navigate("/#store", "#store");
    setTimeout(() => $("#search")?.focus(), 200);
  } else {
    $("#store")?.scrollIntoView();
    $("#search")?.focus();
  }
};
document.addEventListener("input", (e) => {
  if (e.target.id === "search") {
    state.query = e.target.value;
    renderProducts();
    renderSearchSuggestions();
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrap")) { const box = $("#searchSuggestions"); if (box) box.hidden = true; }
  const suggestion = e.target.closest("[data-suggestion-product]");
  if (suggestion) { e.preventDefault(); const p = state.products.find((x) => Number(x.id) === Number(suggestion.dataset.suggestionProduct)); if (p) navigate("/" + encodeURIComponent(p.slug || p.id)); const box = $("#searchSuggestions"); if (box) box.hidden = true; }
});
document.addEventListener("change", (e) => {
  if (e.target.id === "sort") {
    state.sort = e.target.value;
    renderProducts();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
document.addEventListener("click", (e) => {
  if (e.target.id === "placeOrder") {
    placeOrder();
    return;
  }
  const a = e.target.closest("a[href]");
  if (
    !a ||
    e.defaultPrevented ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    a.target === "_blank"
  )
    return;
  let u;
  try {
    u = new URL(a.href, location.href);
  } catch {
    return;
  }
  if (u.origin !== location.origin) return;
  if (a.hasAttribute("data-home") || (u.pathname === "/" && !u.hash)) {
    e.preventDefault();
    closeModal();
    navigate("/");
    return;
  }
  if (u.pathname === "/" && u.hash) {
    e.preventDefault();
    if (isProductRoute()) navigate("/" + u.hash, u.hash);
    else {
      history.replaceState({}, "", "/" + u.hash);
      $(u.hash)?.scrollIntoView();
    }
    return;
  }
  if (u.pathname.length > 1 && !/\.[a-z0-9]+$/i.test(u.pathname)) {
    e.preventDefault();
    closeModal();
    navigate(u.pathname);
  }
});
window.addEventListener("popstate", () => route());
if ("serviceWorker" in navigator)
  addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
let deferredInstall = null;
addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstall = e;
  const b = $("#installBtn");
  if (b) b.hidden = false;
});
$("#installBtn")?.addEventListener("click", async () => {
  if (!deferredInstall) return;
  deferredInstall.prompt();
  deferredInstall = null;
  $("#installBtn").hidden = true;
});
Object.assign(AR, AR_V10);
Object.assign(ERR_AR, ERR_AR_V10);
setDir();
translateStatic();
boot();
