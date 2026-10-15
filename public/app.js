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
  favorites: loadFavorites(),
  admin: { tab: "dashboard", data: {} },
};
const AR = {
  WhatsApp: "واتساب",
  Close: "إغلاق",
  "Zoom image": "تكبير الصورة",
  "Previous image": "الصورة السابقة",
  "Next image": "الصورة التالية",
  "Image {0} of {1}": "صورة {0} من {1}",
  "Zoom in": "تكبير",
  "Zoom out": "تصغير",
  "Show image {0}": "عرض الصورة {0}",
  "{0} out of 5 stars": "{0} من 5 نجوم",
  "{0} removed from cart.": "{0} اتشال من السلة.",
  "Popular searches": "الأكتر بحثاً",
  "Recent searches": "بحثك الأخير",
  "Category not found": "القسم ده مش موجود",
  "You're offline. Your cart is saved, and checkout works again when you're back.": "مفيش نت دلوقتي. السلة متسيّفة، وتقدر تكمّل الطلب أول ما النت يرجع.",
  "Back online": "النت رجع",
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
  "Only {0} left": "باقي {0} فقط",
  "View cart": "عرض السلة",
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
  "Usually delivered in 5–15 min after payment confirmed.": "بيوصلك عادةً في 5–15 دقيقة بعد ما الدفع يتأكد.",
  "Share": "شارك",
  "Message us about this order": "كلّمنا بخصوص الطلب ده",
  "Help": "مساعدة",
  "Order notifications": "إشعارات الطلب",
  "Get a notification on this device when your order is paid or delivered.": "هنبعتلك إشعار على الجهاز ده لما دفع طلبك يتأكد أو يتسلّم.",
  "Order updates are on for this device.": "إشعارات الطلب شغّالة على الجهاز ده.",
  "Notifications are blocked for this site in your browser settings.": "الإشعارات متقفلة للموقع ده من إعدادات المتصفح.",
  "Turn on": "فعّل",
  "Turn off": "أوقف",
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
  "Reward points": "نقاط المكافآت",
  "You can redeem {0} points for {1} store credit.": "تقدر تستبدل {0} نقطة بـ {1} رصيد في المتجر.",
  "You're {0} away from {1} store credit.": "فاضلك {0} وتاخد {1} رصيد في المتجر.",
  "Use reward points": "استخدم نقاط المكافآت",
  "Worth {0} at checkout.": "قيمتها {0} عند الدفع.",
  "Earn {0} point for every 1 EGP on delivered orders.": "بتكسب {0} نقطة على كل 1 جنيه في الطلبات اللي بتتسلّم.",
  "Points redeemed. Credit added to your account.": "تم الاستبدال. الرصيد اتضاف لحسابك.",
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
  "Favorites": "المفضلة",
  "Your favorites": "منتجاتي المفضلة",
  "Your cart": "سلة التسوق",
  "Continue shopping": "مواصلة التسوق",
  "Remove": "حذف",
  "You must sign in to sync favorites across devices.": "سجّل الدخول لحفظ المفضلة في حسابك ومزامنتها بين أجهزتك.",
  "Sign in to save your favorites to your account.": "سجّل الدخول لحفظ المنتجات المفضلة في حسابك.",
  "Back to store": "العودة للمتجر",
  "Browse products": "تصفح المنتجات",
  "Your cart is empty. Humanity's oldest shopping problem.": "سلتك فارغة حاليًا.",
  "Your saved products": "المنتجات المحفوظة",
  "Saved to your account": "تم الحفظ في حسابك",
  "Favorite": "المفضلة",
  "Cart": "السلة",
  "Save": "احفظ",
  "Saved": "محفوظ",
  "Remove from favorites": "إزالة من المفضلة",
  "Your saved products": "المنتجات المحفوظة",
  "No saved products yet.": "لسه مفيش منتجات محفوظة.",
  "Build a bundle": "كوّن باقتك",
  "Pick products to add together. Each item will be added separately at its current price.": "اختار المنتجات اللي عايز تضيفها مع بعض. كل منتج هيتضاف لوحده بسعره الحالي.",
  "Add selected items": "أضف المنتجات المختارة",
  "What to know": "معلومات مهمة",
  "Platform": "المنصة",
  "Region": "المنطقة",
  "Delivery": "طريقة التسليم",
  "Digital delivery details": "تفاصيل التسليم الرقمي",
  "Review your order": "راجع طلبك",
  "Secure total": "الإجمالي النهائي",
  "Your total is confirmed by the store before the order is placed.": "المتجر بيأكد الإجمالي قبل تسجيل الطلب.",
  "Payment is reviewed manually when required.": "قد تتم مراجعة الدفع يدويًا عند الحاجة.",
  "Resume your cart": "كمّل سلتك",
  "You have items waiting in your cart.": "في منتجات لسه موجودة في سلتك.",
};
function loadFavorites() {
  try { const v = JSON.parse(localStorage.getItem("kardivo_favorites") || "[]"); return Array.isArray(v) ? v.map(Number).filter(Number.isFinite) : []; }
  catch { return []; }
}
function saveFavorites() { try { localStorage.setItem("kardivo_favorites", JSON.stringify(state.favorites || [])); } catch {} }
function isFavorite(id) { return (state.favorites || []).includes(Number(id)); }
async function syncFavoritesWithAccount(mergeLocal = true) {
  if (!state.user) return false;
  try {
    const result = await api("/api/me/favorites");
    const remote = Array.isArray(result.ids) ? result.ids.map(Number).filter(Number.isFinite) : [];
    const ids = [...new Set(mergeLocal ? [...remote, ...(state.favorites || [])] : remote)].slice(0, 200);
    if (mergeLocal && ids.length !== remote.length || mergeLocal && ids.some(id => !remote.includes(id))) {
      await api("/api/me/favorites", { method: "PUT", body: JSON.stringify({ ids }) });
    }
    state.favorites = ids; saveFavorites(); return true;
  } catch (e) { console.warn("Favorites account sync unavailable", e); return false; }
}
function trackMarketingEvent(event, extra = {}) {
  const allowed = new Set(["product_viewed", "cart_added", "favorites_opened", "bundle_builder_opened"]);
  if (!allowed.has(event)) return;
  const payload = { event, session_key: checkoutSession(), ...extra };
  fetch("/api/checkout-events", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
}
let favSaveChain = Promise.resolve();
async function toggleFavorite(id) {
  id = Number(id);
  if (!id) return;
  const had = isFavorite(id);
  window.kdFx?.fav(!had);
  state.favorites = had ? state.favorites.filter(x => x !== id) : [...state.favorites, id];
  saveFavorites();
  if (state.user) {
    // Serialize saves so rapid taps can't land out of order and overwrite newer state with older.
    favSaveChain = favSaveChain.then(() => api("/api/me/favorites", { method: "PUT", body: JSON.stringify({ ids: state.favorites }) })).catch(e => { toast(e.message || t("Could not sync favorites.")); });
    await favSaveChain;
  }
  if (location.pathname.replace(/\/$/, "") === "/favorites") renderFavoritesPage();
  else { renderProducts(); renderPopularProducts(); }
  toast(had ? t("Remove from favorites") : state.user ? t("Saved to your account") : t("Saved"));
}
function favoriteButton(p, cls = "favorite-toggle") {
  const saved = isFavorite(p.id);
  return `<button type="button" class="${cls} ${saved ? "is-saved" : ""}" data-favorite="${Number(p.id)}" aria-label="${escapeHTML(t(saved ? "Remove from favorites" : "Save"))}" title="${escapeHTML(t(saved ? "Remove from favorites" : "Save"))}">${saved ? "♥" : "♡"}</button>`;
}
function bindFavoriteButtons(scope = document) {
  scope.querySelectorAll("[data-favorite]").forEach(b => { if (b.dataset.boundFavorite) return; b.dataset.boundFavorite = "1"; b.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(b.dataset.favorite); }); });
}
function renderFavoritesPage() {
  document.body.classList.remove("product-route"); document.body.classList.add("account-route");
  const products = state.favorites.map(id => state.products.find(p => Number(p.id) === Number(id))).filter(Boolean);
  const guestNote = !state.user ? `<div class="notice favorite-account-note"><b>${t("Sign in to save your favorites to your account.")}</b><p>${t("You must sign in to sync favorites across devices.")}</p><button class="btn primary" id="favoritesLogin">${t("Log in")}</button></div>` : `<div class="notice favorite-account-note">${t("Saved to your account")}</div>`;
  $("main").innerHTML = `<section class="collection-page container"><div class="collection-hero"><div><span class="eyebrow">KARDIVO · ${t("Favorites")}</span><h1>${t("Your favorites")}</h1><p>${t("Your saved products")}</p></div><a class="btn ghost" href="/#store" data-collection-store>${t("Browse products")}</a></div>${guestNote}<div class="collection-grid">${products.length ? products.map(p => `<article class="collection-product" ${kdAccentMarkup(p)}>${favoriteButton(p)}<a class="collection-product-link" href="/${encodeURIComponent(p.slug || p.id)}"><div class="collection-product-image">${stockImg(p.image_url,pName(p),stockArtFor(p))}</div><div class="collection-product-info"><b>${escapeHTML(pName(p))}</b><small>${escapeHTML([p.platform,p.region].filter(Boolean).join(" · ") || dlv(p))}</small><strong>${money(Number(p.price || 0))}</strong></div></a><button class="btn ghost collection-add" type="button" data-fav-add="${Number(p.id)}">${t("Add to cart")}</button></article>`).join("") : `${emptyState("favorites")}`}</div></section>`;
  $("#favoritesLogin")?.addEventListener("click", openAuth);
  $("[data-collection-store]")?.addEventListener("click",e=>{e.preventDefault();navigate("/#store","#store")});
  $$('[data-fav-add]').forEach(b=>b.addEventListener('click',()=>{addToCart(Number(b.dataset.favAdd));toast(t("Added to cart."));}));
  bindFavoriteButtons($("main"));
}
function openBundleBuilder() {
  trackMarketingEvent("bundle_builder_opened");
  const products = state.products.filter(p => productAvailable(p) && !(p.variants || []).some(v => Number(v.active) !== 0)).slice(0, 12);
  openModal(t("Build a bundle"), `<p class="checkout-helper">${t("Pick products to add together. Each item will be added separately at its current price.")}</p><div class="bundle-picker">${products.map(p => `<label class="bundle-option"><input type="checkbox" value="${Number(p.id)}"><span>${stockImg(p.image_url, pName(p), stockArtFor(p))}</span><span class="bundle-option-copy"><b>${escapeHTML(pName(p))}</b><small>${money(Number(p.price || 0))}</small></span></label>`).join("")}</div><div class="modal-actions"><button class="btn primary" id="addBundleItems">${t("Add selected items")}</button></div>`);
  $("#addBundleItems").onclick = () => {
    const ids = $$(".bundle-option input:checked").map(x => Number(x.value));
    if (!ids.length) { toast(state.lang === "ar" ? "اختار منتج واحد على الأقل." : "Choose at least one product."); return; }
    ids.forEach(id => { const p = state.products.find(x => Number(x.id) === id); if (p) addToCart(id); });
    closeModal(); openCart();
  };
}
function renderAbandonedCartNudge() {
  const el = $("#cartResumeNudge");
  if (!el) return;
  const hasItems = Array.isArray(state.cart) && state.cart.length > 0;
  el.hidden = !hasItems;
  if (hasItems) el.innerHTML = `<div><b>${t("Resume your cart")}</b><span>${t("You have items waiting in your cart.")}</span></div><button class="btn primary" type="button" id="resumeCartBtn">${t("Your cart")}</button>`;
  $("#resumeCartBtn")?.addEventListener("click", openCart);
}
state.lang = (() => {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "ar") localStorage.setItem("kardivo_lang", q);
    return localStorage.getItem("kardivo_lang") === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
})();
Object.assign(AR, {
  "Save {0}%": "وفّر {0}%",
  "Save {0}": "وفّر {0}",
  "You save {0}": "بتوفّر {0}",
  "Quick view": "نظرة سريعة",
  "Quick view of {0}": "نظرة سريعة على {0}",
  "Full details": "التفاصيل كاملة",
  "Option": "الخيار",
  "Trending now": "الأكثر رواجاً دلوقتي",
  "Clear": "مسح",
  "Save for later": "احفظه لبعدين",
  "{0} moved to favorites.": "{0} اتنقل للمفضلة.",
  "Saved for later": "محفوظ لبعدين",
  "Move to cart": "رجّعه للسلة",
  "Complete your bundle": "كمّل الباقة",
  "Automatic discount, no code needed.": "خصم أوتوماتيك، من غير كود.",
  "Add {0}": "ضيف {0}",
  "Add one more {0}": "ضيف واحد كمان من {0}",
  "Your discount becomes {0} ({1}% off)": "خصمك هيبقى {0} (خصم {1}%)",
  "Bundle discount": "خصم الباقة",
  "Automatic offer": "عرض أوتوماتيك",
  "Estimated total": "الإجمالي التقديري",
  "Bundle discount applied automatically.": "اتطبّق خصم الباقة أوتوماتيك.",
  "Reorder": "اطلب تاني",
  "Added {0} item(s) to your cart.": "اتضاف {0} منتج للسلة.",
  "Added {0} item(s). {1} no longer available.": "اتضاف {0} منتج. {1} مش متاح دلوقتي.",
  "Those items are not available right now.": "المنتجات دي مش متاحة دلوقتي.",
  "Out of stock": "خلص من المخزون",
});
// "Save 15%" or "Save 50 EGP": a percentage for small prices, an amount when the amount reads bigger.
function savingInfo(price, old) {
  price = Number(price || 0);
  old = Number(old || 0);
  if (!(old > price)) return null;
  const amount = old - price;
  return { amount, pct: Math.max(1, Math.round((amount / old) * 100)) };
}
function moneyShort(v) {
  return money(v).replace(/\.00(?=\s|$)/, "");
}
function saveBadgeText(price, old) {
  const s = savingInfo(price, old);
  if (!s) return "";
  return s.amount >= 50 && s.pct < 20 ? t("Save {0}", moneyShort(s.amount)) : t("Save {0}%", s.pct);
}
// ---- V40 checkout polish: remembered payment/phone, live coupon feedback, copy buttons, proof compression, confirmation page ----
Object.assign(AR, {
  "Phone / WhatsApp number": "رقم الموبايل / واتساب",
  "Remembered on this device": "متسيّف على الجهاز ده",
  "Checking code…": "بنتأكد من الكود…",
  "Code applied. You save {0}.": "الكود اتطبّق. وفّرت {0}.",
  "It is better than your code, so it was used.": "ده أحسن من الكود بتاعك فاتطبّق بداله.",
  "Copy exact total": "انسخ المبلغ بالظبط",
  "Copy number": "انسخ الرقم",
  "Copy order number": "انسخ رقم الطلب",
  "Could not copy. Select the text and copy it manually.": "معرفناش ننسخ. حدد النص وانسخه بإيدك.",
  "Preparing photo…": "بنجهّز الصورة…",
  "Reduced from {0} to {1}": "اتصغّرت من {0} لـ {1}",
  "Remove photo": "شيل الصورة",
  "Could not read this image. It will be sent as is.": "معرفناش نقرا الصورة دي. هتتبعت زي ما هي.",
  "Image is too large (max 8 MB).": "الصورة كبيرة (الحد الأقصى 8 ميجا).",
  "Order received": "الطلب وصلنا",
  "Your order is confirmed": "طلبك اتأكد",
  "Estimated wait": "الوقت المتوقع",
  "What happens next": "إيه اللي هيحصل بعد كده",
  "Send exactly {0} to the number above.": "حوّل {0} بالظبط للرقم اللي فوق.",
  "Send the transfer screenshot and your order number on WhatsApp, or upload it from Track order.": "ابعت سكرين شوت التحويل ورقم الطلب على واتساب، أو ارفعه من تتبّع الطلب.",
  "Your transfer screenshot was received.": "سكرين شوت التحويل وصلنا.",
  "We check the payment and deliver. Follow it any time under Track order.": "بنراجع الدفع ونسلّمك. تقدر تتابع الطلب في أي وقت من تتبّع الطلب.",
  "We check your order and deliver it shortly.": "بنراجع الطلب ونسلّمه في أقرب وقت.",
  "Follow it any time under Track order.": "تقدر تتابعه في أي وقت من تتبّع الطلب.",
  "Send proof on WhatsApp": "ابعت الإثبات على واتساب",
});
Object.assign(ERR_AR, {
  "This discount code has expired.": "كود الخصم ده خلص صلاحيته.",
  "This discount code has reached its usage limit.": "كود الخصم ده اتستخدم للحد الأقصى.",
});
// Plain number for a transfer app: "1250" or "1250.50", no currency symbol or thousands separator.
function copyAmount(v) {
  const n = Math.round((Number(v) || 0) * 100) / 100;
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}
async function copyText(text) {
  const s = String(text ?? "");
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(s); return true; }
  } catch {}
  try {
    const ta = document.createElement("textarea");
    ta.value = s;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, s.length);
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch { return false; }
}
// show=true repeats the copied value in the toast (used for amounts and payment numbers, never for delivery codes).
function copyBtn(value, label, text, show = false) {
  return `<button type="button" class="mini copy-btn" data-copy="${escapeHTML(String(value))}" ${show ? "data-copy-show" : ""} aria-label="${escapeHTML(label || t("Copy"))}">${escapeHTML(text || t("Copy"))}</button>`;
}
// Remembered per signed-in account on this device only (never sent anywhere).
function prefsKey() { return "kardivo_checkout_prefs:" + (state.user?.id || "anon"); }
function loadPrefs() {
  try { const v = JSON.parse(localStorage.getItem(prefsKey()) || "{}"); return v && typeof v === "object" ? v : {}; } catch { return {}; }
}
function savePrefs(p) {
  try {
    const cur = loadPrefs();
    for (const [k, v] of Object.entries(p)) if (v) cur[k] = v;
    localStorage.setItem(prefsKey(), JSON.stringify(cur));
  } catch {}
}
const cleanPhone = (v) => String(v || "").replace(/[^\d+\s-]/g, "").trim().slice(0, 20);
function setCouponNote(kind, text) {
  const el = $("#coNote");
  if (!el) return;
  el.textContent = text || "";
  el.className = "coupon-note" + (kind ? " " + kind : "");
  $("#discountCode")?.setAttribute("aria-invalid", kind === "err" ? "true" : "false");
}
let couponTimer = 0, totalsSeq = 0;
function scheduleCouponCheck() {
  clearTimeout(couponTimer);
  const code = ($("#discountCode")?.value || "").trim();
  if (!code) { refreshTotals(false); return; }
  if (code.length < 3) { setCouponNote("", ""); return; }
  setCouponNote("busy", t("Checking code…"));
  couponTimer = setTimeout(() => refreshTotals(false), 650);
}
// Payment-proof screenshots: shrink big phone screenshots in the browser, show a thumbnail, keep the server's 8 MB limit.
const PROOF_MAX_EDGE = 2000, PROOF_SKIP_BYTES = 400 * 1024, PROOF_MAX_BYTES = 8 * 1024 * 1024;
const fmtProofSize = (n) => (n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB");
async function decodeImage(file) {
  if (window.createImageBitmap) { try { return await createImageBitmap(file); } catch {} }
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  } finally { URL.revokeObjectURL(url); }
}
async function compressProof(file) {
  const heic = /heic|heif/i.test(file?.type || "");
  if (!file || !(/^image\/(jpeg|png|webp)$/i.test(file.type) || heic)) return file;
  if (!heic && file.size <= PROOF_SKIP_BYTES) return file;
  const img = await decodeImage(file);
  const w0 = img.naturalWidth || img.width, h0 = img.naturalHeight || img.height;
  if (!w0 || !h0) return file;
  const k = Math.min(1, PROOF_MAX_EDGE / Math.max(w0, h0)), w = Math.round(w0 * k), h = Math.round(h0 * k);
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d");
  g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); g.drawImage(img, 0, 0, w, h);
  img.close?.();
  const blob = await new Promise((res) => c.toBlob(res, "image/jpeg", 0.82));
  if (!blob || (blob.size >= file.size && !heic)) return file;
  return new File([blob], (file.name || "proof").replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
}
function bindProofPicker(input, preview) {
  if (!input || !preview) return;
  let thumb = "";
  const clear = () => {
    if (thumb) URL.revokeObjectURL(thumb);
    thumb = ""; preview.hidden = true; preview.innerHTML = ""; input._proof = null; input._proofPending = null;
  };
  input.addEventListener("change", () => {
    const f = input.files?.[0];
    clear();
    if (!f) return;
    preview.hidden = false;
    preview.innerHTML = `<span class="proof-note">${escapeHTML(t("Preparing photo…"))}</span>`;
    const job = (async () => {
      try { return { out: await compressProof(f), failed: false }; } catch { return { out: f, failed: true }; }
    })();
    input._proofPending = job.then((r) => r.out);
    job.then(({ out, failed }) => {
      if (input.files?.[0] !== f) return;
      input._proof = out;
      if (out.size > PROOF_MAX_BYTES) { toast(t("Image is too large (max 8 MB).")); input.value = ""; clear(); return; }
      thumb = URL.createObjectURL(out);
      const note = failed ? t("Could not read this image. It will be sent as is.") : out !== f ? t("Reduced from {0} to {1}", fmtProofSize(f.size), fmtProofSize(out.size)) : fmtProofSize(f.size);
      preview.innerHTML = `<img src="${thumb}" alt=""><span class="proof-note"><b>${escapeHTML(out.name || "")}</b><small>${escapeHTML(note)}</small></span><button type="button" class="mini" data-proof-clear>${escapeHTML(t("Remove photo"))}</button>`;
      preview.querySelector("[data-proof-clear]").onclick = () => { input.value = ""; clear(); };
    });
  });
}
async function proofFor(input) {
  if (!input) return null;
  if (input._proofPending) { try { await input._proofPending; } catch {} }
  return input._proof || input.files?.[0] || null;
}
const LAST_ORDER_KEY = "kardivo_last_order";
function readLastOrder() {
  try { const v = JSON.parse(sessionStorage.getItem(LAST_ORDER_KEY) || "null"); return v && v.order_number ? v : null; } catch { return null; }
}
function proofWaLink(o) {
  const d = String(state.settings.whatsapp || "").replace(/\D/g, "");
  if (!d || !o?.order_number) return "";
  const ar = state.lang === "ar";
  const lines = ar
    ? [`أهلاً، أنا حوّلت فلوس طلب رقم ${o.order_number}`, `المبلغ: ${copyAmount(o.total)} ج.م`, `طريقة الدفع: ${payName(o.payment_method)}`]
    : [`Hi, I paid order ${o.order_number}`, `Amount: ${copyAmount(o.total)} EGP`, `Payment method: ${payName(o.payment_method)}`];
  if (o.phone) lines.push((ar ? "رقم الموبايل: " : "My number: ") + o.phone);
  lines.push(ar ? "السكرين شوت مرفق." : "Screenshot attached.");
  return `https://wa.me/${d}?text=${encodeURIComponent(lines.join("\n"))}`;
}
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
  if ((x = /^This code needs an order of at least (.+) EGP\.$/.exec(m)))
    return `الكود ده محتاج طلب بـ ${x[1]} جنيه على الأقل.`;
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
  updateThemeButton();
}
function applyLang() {
  setDir();
  translateStatic();
  if (!state.ready) return;
  applySettings();
  renderFooter();
  renderCartCount();
  const routePath = location.pathname.replace(/\/$/, "") || "/";
  if (routePath === "/account") renderAccountPage();
  else if (routePath === "/admin") renderAdminPage();
  else if (routePath === "/favorites") renderFavoritesPage();
  else if (routePath === "/cart") renderCartPage();
  else if (routePath === "/order-confirmed") renderOrderConfirmed();
  else if (isProductRoute())
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
  $$ = (s, root = document) => [...root.querySelectorAll(s)];
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
// Responsive product art. Flip IMG_RESIZE to true once Cloudflare Image Resizing is enabled for
// kardivo.store (Dashboard > Images > Transformations). Until then images load exactly as before.
const IMG_RESIZE = false;
const IMG_WIDTHS = [240, 400, 640, 960];
const resizable = (src) => IMG_RESIZE && /^\/media\/product\//.test(src);
const resizedUrl = (src, w) => `/cdn-cgi/image/width=${w},quality=75,format=auto${src}`;
const stockImg = (url, alt, fallback = STOCK_ART[0], className = "", sizes = "(max-width:700px) 50vw, 320px") => {
  const src = String(url || fallback).trim();
  const safeFallback = escapeHTML(fallback);
  const rs = resizable(src)
    ? ` srcset="${IMG_WIDTHS.map((w) => `${escapeHTML(resizedUrl(src, w))} ${w}w`).join(", ")}" sizes="${escapeHTML(sizes)}"`
    : "";
  return `<img${className ? ` class="${escapeHTML(className)}"` : ""} src="${escapeHTML(src)}"${rs} alt="${escapeHTML(alt || "")}" loading="lazy" decoding="async" data-stock-fallback="${safeFallback}" onerror="this.removeAttribute('srcset');if(this.dataset.stockFallback&&this.src!==this.dataset.stockFallback){this.src=this.dataset.stockFallback;this.dataset.stockFallback=''}else{this.remove()}">`;
};

// ---- Product image gallery (swipe on phones, thumbnails + zoom lightbox) ----
const productImageList = (p) => {
  const list = Array.isArray(p.images) && p.images.length ? p.images : [p.image_url, ...(Array.isArray(p.gallery) ? p.gallery : [])];
  return [...new Set(list.map((u) => String(u || "").trim()).filter(Boolean))];
};
function productGalleryHTML(p, name) {
  const imgs = productImageList(p);
  if (!imgs.length) return `<div class="product-detail-media">${stockImg("", name, stockArtFor(p))}</div>`;
  const many = imgs.length > 1;
  return `<div class="product-detail-media pgal" data-pgal role="region" aria-roledescription="carousel" aria-label="${escapeHTML(name)}"><div class="pgal-track" tabindex="0">${imgs.map((u, i) => `<button type="button" class="pgal-slide" data-pgal-open="${i}" aria-label="${escapeHTML(t("Zoom image"))}${many ? " " + escapeHTML(t("Image {0} of {1}", i + 1, imgs.length)) : ""}"><img src="${escapeHTML(u)}" alt="${escapeHTML(many ? `${name} (${i + 1}/${imgs.length})` : name)}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" draggable="false" onerror="if(this.dataset.f!=='1'){this.dataset.f='1';this.src='${escapeHTML(stockArtFor(p))}'}else{this.remove()}"></button>`).join("")}</div><span class="pgal-zoom" aria-hidden="true">⤢</span>${many ? `<button type="button" class="pgal-nav prev" data-pgal-step="-1" aria-label="${escapeHTML(t("Previous image"))}">‹</button><button type="button" class="pgal-nav next" data-pgal-step="1" aria-label="${escapeHTML(t("Next image"))}">›</button><div class="pgal-dots">${imgs.map((_, i) => `<button type="button" data-pgal-go="${i}" aria-label="${escapeHTML(t("Show image {0}", i + 1))}" ${i === 0 ? 'aria-current="true"' : ""}></button>`).join("")}</div><div class="pgal-thumbs">${imgs.map((u, i) => `<button type="button" data-pgal-go="${i}" aria-label="${escapeHTML(t("Show image {0}", i + 1))}" ${i === 0 ? 'aria-current="true"' : ""}><img src="${escapeHTML(u)}" alt="" loading="lazy" draggable="false"></button>`).join("")}</div>` : ""}</div>`;
}
function initProductGallery(p) {
  const root = document.querySelector("[data-pgal]");
  if (!root) return;
  const imgs = productImageList(p),
    track = root.querySelector(".pgal-track"),
    slides = [...track.children];
  let cur = 0;
  const mark = (i) => {
    cur = i;
    root.querySelectorAll("[data-pgal-go]").forEach((b) => (Number(b.dataset.pgalGo) === i ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current")));
    root.querySelector(".pgal-nav.prev")?.toggleAttribute("disabled", i <= 0);
    root.querySelector(".pgal-nav.next")?.toggleAttribute("disabled", i >= imgs.length - 1);
  };
  const go = (i) => {
    i = Math.max(0, Math.min(imgs.length - 1, i));
    // scrollIntoView keeps working in RTL, where scrollLeft is negative
    slides[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    mark(i);
  };
  let raf = 0;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const w = track.clientWidth || 1,
        i = Math.max(0, Math.min(imgs.length - 1, Math.round(Math.abs(track.scrollLeft) / w)));
      if (i !== cur) mark(i);
    });
  }, { passive: true });
  mark(0);
  root.addEventListener("click", (e) => {
    const step = e.target.closest("[data-pgal-step]"),
      to = e.target.closest("[data-pgal-go]"),
      open = e.target.closest("[data-pgal-open]");
    if (step) go(cur + Number(step.dataset.pgalStep));
    else if (to) go(Number(to.dataset.pgalGo));
    else if (open) openZoomLightbox(imgs, Number(open.dataset.pgalOpen), (i) => go(i));
  });
  track.addEventListener("keydown", (e) => {
    const rtl = document.documentElement.dir === "rtl";
    if (e.key === "ArrowRight") go(cur + (rtl ? -1 : 1));
    else if (e.key === "ArrowLeft") go(cur + (rtl ? 1 : -1));
  });
}
function openZoomLightbox(imgs, start, onChange) {
  if (document.querySelector(".zlb")) return;
  let i = start, scale = 1, tx = 0, ty = 0;
  const MAX = 5, last = document.activeElement;
  const el = document.createElement("div");
  el.className = "zlb";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  const many = imgs.length > 1;
  el.innerHTML = `<div class="zlb-stage"><img class="zlb-img" alt="" draggable="false"></div>${many ? `<span class="zlb-count"></span><button type="button" class="zlb-btn zlb-prev" aria-label="${escapeHTML(t("Previous image"))}">‹</button><button type="button" class="zlb-btn zlb-next" aria-label="${escapeHTML(t("Next image"))}">›</button>` : ""}<button type="button" class="zlb-btn zlb-close" aria-label="${escapeHTML(t("Close"))}">✕</button><div class="zlb-tools"><button type="button" class="zlb-btn" data-z="out" aria-label="${escapeHTML(t("Zoom out"))}">−</button><button type="button" class="zlb-btn" data-z="in" aria-label="${escapeHTML(t("Zoom in"))}">+</button></div>`;
  document.body.appendChild(el);
  document.body.classList.add("zlb-open");
  const stage = el.querySelector(".zlb-stage"), img = el.querySelector(".zlb-img");
  const clamp = () => {
    const r = stage.getBoundingClientRect(), w = img.clientWidth * scale, h = img.clientHeight * scale;
    const mx = Math.max(0, (w - r.width) / 2), my = Math.max(0, (h - r.height) / 2);
    tx = Math.max(-mx, Math.min(mx, tx));
    ty = Math.max(-my, Math.min(my, ty));
  };
  const draw = (anim) => {
    if (scale <= 1) { tx = 0; ty = 0; } else clamp();
    img.style.transition = anim ? "transform .2s ease" : "none";
    img.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    stage.classList.toggle("zoomed", scale > 1);
  };
  const show = (n) => {
    i = (n + imgs.length) % imgs.length;
    scale = 1; tx = 0; ty = 0;
    img.src = imgs[i];
    draw(false);
    const c = el.querySelector(".zlb-count");
    if (c) c.textContent = `${i + 1} / ${imgs.length}`;
    onChange && onChange(i);
  };
  const zoomAt = (ns, cx, cy, anim = true) => {
    ns = Math.max(1, Math.min(MAX, ns));
    const r = stage.getBoundingClientRect(), ox = cx - (r.left + r.width / 2), oy = cy - (r.top + r.height / 2), k = ns / scale;
    tx = ox - (ox - tx) * k; ty = oy - (oy - ty) * k; scale = ns;
    draw(anim);
  };
  const close = () => {
    document.removeEventListener("keydown", onKey, true);
    el.remove();
    document.body.classList.remove("zlb-open");
    try { last && last.focus && last.focus(); } catch {}
  };
  const onKey = (e) => {
    if (e.key === "Escape") { e.stopPropagation(); close(); }
    else if (many && (e.key === "ArrowRight" || e.key === "ArrowLeft")) show(i + ((e.key === "ArrowRight") === (document.documentElement.dir !== "rtl") ? 1 : -1));
    else if (e.key === "+" || e.key === "=") { const r = stage.getBoundingClientRect(); zoomAt(scale * 1.5, r.left + r.width / 2, r.top + r.height / 2); }
    else if (e.key === "-") { const r = stage.getBoundingClientRect(); zoomAt(scale / 1.5, r.left + r.width / 2, r.top + r.height / 2); }
  };
  document.addEventListener("keydown", onKey, true);
  el.querySelector(".zlb-close").onclick = close;
  el.querySelector(".zlb-prev")?.addEventListener("click", () => show(i - 1));
  el.querySelector(".zlb-next")?.addEventListener("click", () => show(i + 1));
  el.querySelector(".zlb-tools").addEventListener("click", (e) => {
    const b = e.target.closest("[data-z]");
    if (!b) return;
    const r = stage.getBoundingClientRect();
    zoomAt(b.dataset.z === "in" ? scale * 1.6 : scale / 1.6, r.left + r.width / 2, r.top + r.height / 2);
  });
  stage.addEventListener("wheel", (e) => { e.preventDefault(); zoomAt(scale * (e.deltaY < 0 ? 1.2 : 1 / 1.2), e.clientX, e.clientY, false); }, { passive: false });
  // pointer gestures: drag to pan when zoomed, swipe to change image when not, pinch with two fingers, double tap/click to toggle
  const pts = new Map();
  let startDist = 0, startScale = 1, sx = 0, sy = 0, stx = 0, sty = 0, moved = 0, lastTap = 0, swipeDx = 0;
  stage.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".zlb-btn")) return;
    stage.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) { sx = e.clientX; sy = e.clientY; stx = tx; sty = ty; moved = 0; swipeDx = 0; stage.classList.add("panning"); }
    if (pts.size === 2) { const [a, b] = [...pts.values()]; startDist = Math.hypot(a.x - b.x, a.y - b.y) || 1; startScale = scale; }
  });
  stage.addEventListener("pointermove", (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      zoomAt(startScale * (Math.hypot(a.x - b.x, a.y - b.y) / startDist), (a.x + b.x) / 2, (a.y + b.y) / 2, false);
      moved = 99;
    } else if (pts.size === 1) {
      const dx = e.clientX - sx, dy = e.clientY - sy;
      moved = Math.max(moved, Math.hypot(dx, dy));
      if (scale > 1) { tx = stx + dx; ty = sty + dy; draw(false); } else swipeDx = dx;
    }
  });
  const end = (e) => {
    if (!pts.has(e.pointerId)) return;
    const wasPinch = pts.size === 2;
    pts.delete(e.pointerId);
    stage.classList.remove("panning");
    if (pts.size === 1) { const [p0] = [...pts.values()]; sx = p0.x; sy = p0.y; stx = tx; sty = ty; }
    if (pts.size || wasPinch) { if (scale < 1.05) { scale = 1; draw(true); } return; }
    if (scale <= 1 && many && Math.abs(swipeDx) > 60 && moved > 60) { show(i + (swipeDx < 0 ? 1 : -1) * (document.documentElement.dir === "rtl" ? -1 : 1)); return; }
    if (moved < 8) {
      const now = Date.now();
      if (now - lastTap < 320) { lastTap = 0; scale > 1 ? ((scale = 1), draw(true)) : zoomAt(2.5, e.clientX, e.clientY); }
      else lastTap = now;
    }
  };
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", end);
  stage.addEventListener("dblclick", (e) => e.preventDefault());
  show(i);
  el.querySelector(".zlb-close").focus();
}
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
const THEME_KEY = "kardivo_theme";
function currentTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function updateThemeButton() {
  const b = $("#themeBtn");
  if (!b) return;
  const toLight = currentTheme() === "dark";
  b.title = t(toLight ? "Switch to light theme" : "Switch to dark theme");
  b.setAttribute("aria-label", b.title);
}
function setTheme(mode) {
  const light = mode === "light";
  if (light) document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem(THEME_KEY, light ? "light" : "dark");
  } catch {}
  let m = document.querySelector('meta[name="theme-color"]');
  if (!m) {
    m = document.createElement("meta");
    m.name = "theme-color";
    document.head.appendChild(m);
  }
  m.content = light ? "#f1f0f7" : "#08070d";
  updateThemeButton();
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
  // The countdown uses the server's clock, so a phone with the wrong time still shows the right remaining time.
  if (path === "/api/settings/public" && body && body.server_time) state.timeOffset = Number(body.server_time) - Date.now();
  return body;
}
const skProductHTML = (seed = "") => `<section class="product-page container sk-page" aria-busy="true" aria-label="${escapeHTML(t("Loading product..."))}"><div class="sk sk-line w40" style="margin:0 0 18px"></div><div class="product-detail">${seed ? `<div class="sk-seed"><img src="${escapeHTML(seed)}" alt="" draggable="false"></div>` : `<div class="sk sk-hero-img"></div>`}<div class="sk-stack"><div class="sk sk-line w40"></div><div class="sk sk-title"></div><div class="sk sk-line w80"></div><div class="sk sk-line w60"></div><div class="sk sk-block"></div><div class="sk sk-btn"></div></div></div></section>`;
const skCartHTML = () => `<section class="collection-page container cart-page sk-page" aria-busy="true"><div class="sk sk-title" style="width:min(260px,60%);margin-bottom:22px"></div>${Array.from({ length: 3 }, () => `<div class="sk-cart-row"><div class="sk sk-thumb"></div><div class="sk-stack"><div class="sk sk-line w80"></div><div class="sk sk-line w40"></div></div></div>`).join("")}<div class="sk sk-btn" style="margin-top:20px"></div></section>`;
const skGridHTML = () => Array.from({ length: 8 }, () => `<div class="product-card skeleton-card" aria-hidden="true"><div class="sk sk-img"></div><div class="sk sk-line w40"></div><div class="sk sk-line w80"></div><div class="sk sk-line w60"></div></div>`).join("");
function showBootSkeleton() {
  const path = location.pathname.replace(/\/$/, "") || "/";
  const m = $("main");
  if (path === "/cart") { document.body.classList.add("account-route"); m.innerHTML = skCartHTML(); return; }
  if (path.startsWith("/c/")) { m.innerHTML = skCategoryHTML(); return; }
  if (path === "/favorites") { document.body.classList.add("account-route"); m.innerHTML = skCategoryHTML(true); return; }
  if (isProductRoute()) { document.body.classList.add("product-route"); m.innerHTML = skProductHTML(); return; }
  const g = $("#productGrid");
  if (g) g.innerHTML = skGridHTML();
  const pp = $("#popularProducts");
  if (pp && !pp.children.length) pp.innerHTML = skPopularHTML();
}
// Offline banner. The cart lives in localStorage, and the last good catalog is kept as a snapshot
// so /cart still renders when the network is gone.
const SNAP_KEY = "kardivo_snapshot";
function saveSnapshot(products, categories, settings) {
  try { localStorage.setItem(SNAP_KEY, JSON.stringify({ products, categories, settings })); } catch {}
}
function readSnapshot() {
  try { const s = JSON.parse(localStorage.getItem(SNAP_KEY) || "null"); return s && Array.isArray(s.products) ? s : null; } catch { return null; }
}
function setOffline(off) {
  let bar = $("#offlineBar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "offlineBar";
    bar.className = "offline-bar";
    bar.setAttribute("role", "status");
    bar.setAttribute("aria-live", "polite");
    document.body.prepend(bar);
  }
  if (off) {
    bar.dataset.state = "off";
    bar.textContent = t("You're offline. Your cart is saved, and checkout works again when you're back.");
    bar.hidden = false;
    document.body.classList.add("is-offline");
  } else if (!bar.hidden) {
    bar.dataset.state = "on";
    bar.textContent = t("Back online");
    document.body.classList.remove("is-offline");
    setTimeout(() => { if (bar.dataset.state === "on") bar.hidden = true; }, 2200);
  }
}
addEventListener("offline", () => setOffline(true));
addEventListener("online", () => setOffline(false));
async function boot() {
  homeHTML = $("main").innerHTML;
  showBootSkeleton();
  $("#year").textContent = new Date().getFullYear();
  const qs = new URLSearchParams(location.search);
  try {
    if (qs.get("ref")) localStorage.setItem("kardivo_ref", qs.get("ref").toUpperCase().slice(0, 20));
  } catch {}
  try {
    let products, categories, settings, me;
    try {
      [products, categories, settings, me] = await Promise.all([
        api("/api/products"),
        api("/api/categories"),
        api("/api/settings/public"),
        api("/api/me"),
      ]);
      saveSnapshot(products, categories, settings);
    } catch (err) {
      const snap = readSnapshot();
      // Only a network failure (fetch throws TypeError) or a known-offline browser falls back.
      if (!snap || !(err instanceof TypeError || navigator.onLine === false)) throw err;
      ({ products, categories, settings } = snap);
      me = { user: null };
      setOffline(true);
    }
    state.products = products;
    state.categories = categories;
    state.settings = settings;
    state.user = me.user;
    if (state.user) await syncFavoritesWithAccount(true);
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
function renderHeroShowcase() {
  const visual = $(".hero-visual");
  if (!visual || !state.products?.length) return;
  const picks = state.products.filter(p => Number(p.featured) && productAvailable(p)).slice(0, 3);
  if (!picks.length) return;
  visual.classList.add("hero-visual-products");
  visual.querySelector(".hero-product-stack")?.remove();
  visual.insertAdjacentHTML("beforeend", `<div class="hero-product-stack" aria-label="Featured products">${picks.map((p,i) => `<a class="hero-product-tile hero-product-tile-${i+1}" ${kdAccentMarkup(p)} href="/${encodeURIComponent(p.slug || p.id)}"><span class="hero-product-art">${stockImg(p.image_url, pName(p), stockArtFor(p))}</span><span class="hero-product-tile-copy"><small>${escapeHTML(cName({name:p.category_name,name_ar:p.category_name_ar}) || t("Featured"))}</small><b>${escapeHTML(pName(p))}</b><strong>${money(Number(p.price || 0))}</strong></span></a>`).join("")}</div>`);
}

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
// Search folds Arabic spelling variants (أإآ→ا, ى→ي, ة→ه, tashkeel and tatweel removed, Arabic digits→0-9),
// matches both the Arabic and English names, and forgives small typos in names, categories and platforms.
const searchFold = (value) =>
  String(value || "")
    .toLocaleLowerCase()
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .normalize("NFD")
    .replace(/[\u0300-\u036f\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/ٱ/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
function editWithin(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, k) => k);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let low = i;
    for (let k = 1; k <= b.length; k++) {
      cur[k] = Math.min(prev[k] + 1, cur[k - 1] + 1, prev[k - 1] + (a[i - 1] === b[k - 1] ? 0 : 1));
      if (cur[k] < low) low = cur[k];
    }
    if (low > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}
const SEARCH_CACHE = new WeakMap();
function searchIndex(p) {
  const hit = SEARCH_CACHE.get(p);
  if (hit && hit.lang === state.lang) return hit;
  const cat = cName({ name: p.category_name, name_ar: p.category_name_ar });
  const name = searchFold(`${pName(p)} ${p.name || ""} ${p.name_ar || ""}`);
  const core = searchFold(`${name} ${p.platform || ""} ${cat} ${p.category_name || ""}`);
  const idx = {
    lang: state.lang,
    name,
    hay: searchFold(`${core} ${pDesc(p)} ${p.region || ""}`),
    words: [...new Set(core.split(" ").filter((w) => w.length > 1))],
  };
  SEARCH_CACHE.set(p, idx);
  return idx;
}
function searchScore(p, query) {
  const tokens = searchFold(query).split(" ").filter(Boolean);
  if (!tokens.length) return 0;
  const { name, hay, words } = searchIndex(p);
  let score = 0;
  for (const token of tokens) {
    if (hay.includes(token)) {
      score += name.startsWith(token) ? 8 : name.includes(token) ? 5 : 2;
      continue;
    }
    const max = token.length >= 7 ? 2 : token.length >= 4 ? 1 : 0;
    if (!max) return -1;
    const close = words.some((w) => editWithin(token, w, max) <= max || (w.length > token.length && editWithin(token, w.slice(0, token.length), max) <= max));
    if (!close) return -1;
    score += 1;
  }
  return score;
}
// Popular and recent searches shown when the box is focused and empty.
const RECENT_SEARCH_KEY = "kardivo_recent_searches";
function recentSearches() {
  try { const v = JSON.parse(localStorage.getItem(RECENT_SEARCH_KEY) || "[]"); return Array.isArray(v) ? v.slice(0, 5) : []; } catch { return []; }
}
function saveRecentSearch(term) {
  term = String(term || "").trim();
  if (term.length < 2) return;
  try { localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify([term, ...recentSearches().filter((x) => x !== term)].slice(0, 5))); } catch {}
}
// Trending comes from real activity (views, cart adds, sales over the last days). Until there is any, fall back to featured products and big categories.
async function loadTrending() {
  if (state.trendingLoaded) return;
  state.trendingLoaded = true;
  try {
    const r = await api("/api/trending");
    state.trending = Array.isArray(r.ids) ? r.ids.map(Number) : [];
    const box = $("#searchSuggestions");
    if (box && !box.hidden && !$("#search")?.value) renderPopularSearches(box);
  } catch { state.trending = []; }
}
function popularSearchTerms() {
  const hot = (state.trending || []).map((id) => state.products.find((p) => Number(p.id) === id)).filter(Boolean).slice(0, 6).map((p) => pName(p));
  if (hot.length >= 3) return hot;
  const featured = state.products.filter((p) => Number(p.featured)).slice(0, 4).map((p) => pName(p));
  const counts = new Map();
  state.products.forEach((p) => { if (p.category_id) counts.set(p.category_id, (counts.get(p.category_id) || 0) + 1); });
  const cats = state.categories.filter((c) => counts.has(c.id)).sort((x, y) => counts.get(y.id) - counts.get(x.id)).slice(0, 3).map(cName);
  return [...new Set([...hot, ...featured, ...cats])].slice(0, 6);
}
function renderPopularSearches(box) {
  const chip = (x) => `<button type="button" class="search-chip" data-search-term="${escapeHTML(x)}">${escapeHTML(x)}</button>`;
  const recent = recentSearches(), popular = popularSearchTerms();
  const block = (title, list, extra = "") => (list.length ? `<div class="search-chip-group"><small>${title}${extra}</small><div>${list.map(chip).join("")}</div></div>` : "");
  const clear = `<button type="button" class="search-chip-clear" data-clear-recent>${escapeHTML(t("Clear"))}</button>`;
  const html = block(t("Recent searches"), recent, clear) + block(state.trending?.length ? t("Trending now") : t("Popular searches"), popular.filter((x) => !recent.includes(x)));
  box.innerHTML = html;
  box.hidden = !html;
}
// ---- Flash-sale countdown (display only: it never changes any price) ----
const saleEndMs = () => {
  const e = Date.parse(String(state.settings.sale_ends_at || ""));
  return isNaN(e) ? 0 : e;
};
const saleLeftMs = () => (saleEndMs() ? saleEndMs() - (Date.now() + (state.timeOffset || 0)) : 0);
const saleActive = () => saleLeftMs() > 0;
function saleClockText(ms) {
  const sec = Math.max(0, Math.floor(ms / 1000)),
    d = Math.floor(sec / 86400),
    p2 = (n) => String(n).padStart(2, "0");
  return `${d ? d + (state.lang === "ar" ? " يوم " : "d ") : ""}${p2(Math.floor((sec % 86400) / 3600))}:${p2(Math.floor((sec % 3600) / 60))}:${p2(sec % 60)}`;
}
const saleLabelText = () => String(S("sale_label") || "").trim() || (state.lang === "ar" ? "العرض بينتهي بعد" : "Sale ends in");
const saleBlockHTML = (id, hidden) =>
  `<div class="sale-timer" ${id ? `id="${id}"` : ""} data-sale ${hidden ? "hidden" : ""} role="timer"><span class="sale-dot" aria-hidden="true"></span><span class="sale-label">${escapeHTML(saleLabelText())}</span><bdi dir="ltr" class="sale-clock" data-sale-timer>${saleClockText(saleLeftMs())}</bdi></div>`;
let saleTick = null;
// One shared 1-second timer. It stops by itself when no countdown is on screen, and hides every countdown the moment the sale ends.
function ensureSaleTicker() {
  if (saleTick) return;
  const tick = () => {
    const shown = $$("[data-sale-timer]").filter((e) => !e.closest("[data-sale]")?.hidden);
    if (!shown.length) { clearInterval(saleTick); saleTick = null; return; }
    const left = saleLeftMs();
    if (left <= 0) {
      state.settings.sale_ends_at = "";
      $$("[data-sale]").forEach((e) => (e.hidden = true));
      clearInterval(saleTick);
      saleTick = null;
      return;
    }
    const txt = saleClockText(left);
    shown.forEach((e) => (e.textContent = txt));
  };
  saleTick = setInterval(tick, 1000);
}
// ---- Share a product (WhatsApp first: that is where customers share links) ----
function productShareData(p, name, variants) {
  const ar = state.lang === "ar",
    cur = ar ? "ج.م" : state.settings.store_currency || "EGP",
    fmt = (v) => `${Number(Number(v).toFixed(2))} ${cur}`,
    from = variants.length > 1 && new Set(variants.map((v) => Number(v.price))).size > 1,
    price = variants.length ? Math.min(...variants.map((v) => Number(v.price))) : Number(p.price),
    old = variants.length ? 0 : Number(p.old_price || 0),
    was = old > price ? (ar ? ` (بدل ${fmt(old)})` : ` (was ${fmt(old)})`) : "",
    u = new URL(location.href);
  u.hash = "";
  if (ar) u.searchParams.delete("lang");
  else u.searchParams.set("lang", "en");
  const label = ar ? (from ? "السعر يبدأ من" : "السعر") : from ? "Price from" : "Price";
  return { title: name, text: `${name}\n${label}: ${fmt(price)}${was}`, url: u.href };
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
  const sale = $("#campaignSale");
  if (sale) {
    sale.hidden = !(saleActive() && String(state.settings.sale_on_banner) !== "0");
    sale.querySelector(".sale-label").textContent = saleLabelText();
    sale.querySelector("[data-sale-timer]").textContent = saleClockText(saleLeftMs());
    if (!sale.hidden) ensureSaleTicker();
  }
  const art = $("#campaignArt");
  if (art) {
    const artwork = image && (/^https?:\/\//i.test(image) || image.startsWith("/")) ? image : STOCK_ART[0];
    art.style.backgroundImage = `linear-gradient(90deg,color-mix(in srgb,var(--product-accent,#827b91) 35%,transparent) 0%,color-mix(in srgb,var(--product-accent-2,#a39aae) 24%,transparent) 45%,color-mix(in srgb,var(--product-accent-3,#5b536b) 22%,transparent) 100%),url("${artwork.replace(/["\\]/g, "")}")`;
  }
  // The campaign is a first-class storefront surface: derive its glow from its own artwork,
  // or from the linked/featured product when no custom campaign artwork is supplied.
  kdApplyCampaignAccent(image, link);
}
function renderSearchSuggestions() {
  const box = $("#searchSuggestions"), input = $("#search");
  if (!box || !input) return;
  const q = input.value.trim().toLowerCase();
  if (!q && document.activeElement === input) { renderPopularSearches(box); return; }
  if (q.length < 2) { box.hidden = true; box.innerHTML = ""; return; }
  const matches = state.products.map(p => ({ p, score: searchScore(p, q) })).filter(x => x.score >= 0).sort((a, b) => b.score - a.score || Number(b.p.featured || 0) - Number(a.p.featured || 0)).slice(0, 5).map(x => x.p);
  box.innerHTML = matches.map((p) => `<a class="search-suggestion" ${kdAccentMarkup(p)} href="/${encodeURIComponent(p.slug || p.id)}" data-suggestion-product="${p.id}">${stockImg(p.image_url, "", stockArtFor(p))}<span class="suggestion-copy"><b>${escapeHTML(pName(p))}</b><small>${escapeHTML(cName({name:p.category_name,name_ar:p.category_name_ar}) || (state.lang === "ar" ? "منتج رقمي" : "Digital product"))}</small></span><strong>${money(Number(p.price || 0))}</strong></a>`).join("") || `<div class="search-suggestion-empty">${state.lang === "ar" ? "مفيش نتائج مطابقة. جرّب اسم تاني." : "No matching products. Try another search."}</div>`;
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
    return `<a class="category-card" href="/c/${encodeURIComponent(c.slug)}" data-category-card="${escapeHTML(c.id)}" aria-label="${escapeHTML(name)}"><div class="category-art">${stockImg(art, "", stockArtFor(fallbackProduct || c))}</div><div class="category-card-content"><div><h3>${escapeHTML(name)}</h3><p>${subtitle}</p></div><span class="cat-arrow" aria-hidden="true">${arrow()}</span></div></a>`;
  }).join("");
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
    return `<article class="popular-product-wrap" ${kdAccentMarkup(p)}>${favoriteButton(p)}<a class="popular-product" href="/${encodeURIComponent(p.slug || p.id)}"><div class="popular-product-image">${img}</div><div class="popular-product-copy"><span class="popular-product-category">${escapeHTML(cat || (state.lang === "ar" ? "منتج رقمي" : "Digital product"))}</span><span class="popular-product-name">${escapeHTML(name)}</span><span class="popular-product-price">${money(price)}${old > price ? `<del>${money(old)}</del>` : ""}</span></div></a></article>`;
  }).join("");
  bindFavoriteButtons(el);
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
const EYE_ICON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
function quickViewButton(p) {
  const label = t("Quick view of {0}", pName(p));
  return `<button type="button" class="quick-view-btn" data-quick="${Number(p.id)}" aria-label="${escapeHTML(label)}" title="${escapeHTML(t("Quick view"))}">${EYE_ICON}</button>`;
}
// A small dialog with price, options and Add to cart, so shoppers don't leave the grid (saves a page load on phones).
function openQuickView(id) {
  const p = state.products.find((x) => Number(x.id) === Number(id));
  if (!p) return;
  const variants = (p.variants || []).filter((v) => Number(v.active) !== 0),
    isCode = p.delivery_type === "code",
    showStock = state.settings.show_stock !== false,
    stockOf = (v) => (isCode ? Number(v ? v.stock : p.stock) || 0 : Infinity),
    name = pName(p),
    desc = String(pDesc(p) || "").trim(),
    short = desc.length > 180 ? desc.slice(0, 177).trimEnd() + "…" : desc,
    startV = variants.find((v) => stockOf(v) > 0) || variants[0] || null,
    href = "/" + encodeURIComponent(p.slug || p.id),
    cat = cName({ name: p.category_name, name_ar: p.category_name_ar });
  const priceBlock = (price, old) => {
    const s = savingInfo(price, old);
    return `<strong class="qv-now">${money(price)}</strong>${s ? `<span class="old">${money(old)}</span><span class="qv-save">${escapeHTML(saveBadgeText(price, old))}</span>` : ""}`;
  };
  const cur = () => {
    const sel = $("#qvVariant");
    return sel ? variants.find((v) => Number(v.id) === Number(sel.value)) || null : null;
  };
  const body = `<div class="qv" ${kdAccentMarkup(p)}><div class="qv-media">${stockImg(p.image_url, name, stockArtFor(p))}</div><div class="qv-info">${cat ? `<span class="product-cat">${escapeHTML(cat)}</span>` : ""}<div class="qv-meta">${escapeHTML([p.platform, p.region].filter(Boolean).join(" · ") || dlv(p))}</div><div class="qv-price" id="qvPrice"></div>${variants.length ? `<div class="field qv-field"><label for="qvVariant">${t("Choose option")}</label><select id="qvVariant">${variants.map((v) => `<option value="${v.id}" ${startV && Number(startV.id) === Number(v.id) ? "selected" : ""} ${stockOf(v) <= 0 ? "disabled" : ""}>${escapeHTML(v.name)} — ${money(Number(v.price))}${isCode && showStock ? ` · ${stockOf(v) > 0 ? t("{0} left", stockOf(v)) : t("Sold out")}` : ""}</option>`).join("")}</select></div>` : ""}<p class="qv-stock" id="qvStock" aria-live="polite"></p>${short ? `<p class="qv-desc">${escapeHTML(short)}</p>` : ""}<div class="qv-actions"><button type="button" class="btn primary" id="qvAdd">${t("Add to cart")}</button><a class="btn ghost" id="qvMore" href="${href}">${t("Full details")}</a></div></div></div>`;
  openModal(escapeHTML(name), body);
  const refresh = () => {
    const v = cur(),
      price = Number(v ? v.price : p.price),
      old = Number(v ? v.old_price || 0 : p.old_price || 0),
      left = stockOf(v),
      out = left <= 0;
    $("#qvPrice").innerHTML = priceBlock(price, old);
    $("#qvStock").textContent = out ? t("Sold out") : isCode && showStock && left <= 5 ? t("Only {0} left", left) : "";
    const add = $("#qvAdd");
    add.disabled = out;
    add.textContent = out ? t("Sold out") : t("Add to cart");
  };
  refresh();
  $("#qvVariant")?.addEventListener("change", refresh);
  $("#qvAdd").onclick = () => {
    const v = cur();
    closeModal();
    addToCart(Number(p.id), v ? Number(v.id) : null);
  };
  $("#qvMore").onclick = (e) => { e.preventDefault(); closeModal(); navigate(href); };
  $("#qvAdd").focus({ preventScroll: true });
}
function rewardPreview(price) {
  const enabled = state.settings.loyalty_enabled !== false && String(state.settings.loyalty_enabled ?? "1") !== "0";
  const ppe = Math.max(1, Math.floor(Number(state.settings.loyalty_points_per_egp) || 1));
  const step = Math.max(1, Math.floor(Number(state.settings.loyalty_redeem_points) || 10));
  const reward = Math.max(0, Number(state.settings.loyalty_redeem_egp) || 0);
  if (!enabled || reward <= 0 || !(Number(price) > 0)) return "";
  const pts = Math.floor(Number(price) * ppe);
  const egp = (pts / step) * reward;
  return `<small class="reward-preview">${t("Earn {0} points", pts.toLocaleString())}${egp > 0 ? ` · ${t("worth {0}", moneyEGP(egp))}` : ""}</small>`;
}


// V63 — image-reactive, multi-colour product lighting.
// Cache the full palette by image URL so cards, quick view, cart and product pages stay in sync.
const kdAccentCache = new Map();
const KD_ACCENT_NEUTRAL = { primary: "#827b91", secondary: "#a39aae", tertiary: "#5b536b" };
function kdAccentMarkup(p) { return `data-product-accent="${Number(p?.id)||0}"`; }
function kdAccentImages(p) {
  return [...new Set([p?.image_url, ...(Array.isArray(p?.images) ? p.images : []), ...(Array.isArray(p?.gallery) ? p.gallery : [])].map(v => String(v || "").trim()).filter(v => /^https?:\/\//i.test(v) || v.startsWith("/")))];
}
function kdHex(rgb) { return "#" + rgb.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2,"0")).join(""); }
function kdRgbDistance(a,b) { return Math.sqrt((a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2); }
function kdSamplePalette(imageUrl) {
  if (kdAccentCache.has(imageUrl)) return kdAccentCache.get(imageUrl);
  const task = new Promise(resolve => {
    const img = new Image();
    if (!imageUrl.startsWith("/")) img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", {willReadFrequently:true});
        if (!ctx) throw new Error("Canvas unavailable");
        canvas.width = canvas.height = 72;
        ctx.drawImage(img, 0, 0, 72, 72);
        const px = ctx.getImageData(0, 0, 72, 72).data;
        const bins = new Map(); let valid = 0, chromaticPixels = 0;
        for (let i=0; i<px.length; i+=4) {
          if (px[i+3] < 150) continue;
          const rgb=[px[i],px[i+1],px[i+2]], mx=Math.max(...rgb), mn=Math.min(...rgb);
          if (mx < 12) continue;
          const sat = mx ? (mx-mn)/mx : 0;
          // Ignore near-white background pixels, but keep dark saturated artwork.
          if (mx > 247 && mn > 226 && sat < .14) continue;
          valid++;
          if (sat >= .13 && mx-mn >= 24) chromaticPixels++;
          // Fine quantization preserves more of the artwork's actual hues.
          const q=rgb.map(v=>Math.min(255,Math.round(v/12)*12)), key=q.join(",");
          const b=bins.get(key)||{rgb:q,count:0,satSum:0};
          b.count++; b.satSum+=sat; bins.set(key,b);
        }
        if (!valid || !bins.size) throw new Error("No usable pixels");
        const all=[...bins.values()].map(b=>({...b,sat:b.satSum/b.count}));
        // If the image contains real color, rank chromatic bins separately so a gray
        // background cannot outvote the colored product art. Monochrome art stays neutral.
        const useColor = chromaticPixels / valid >= .012;
        const candidates = useColor ? all.filter(b=>b.sat >= .13 && Math.max(...b.rgb)-Math.min(...b.rgb) >= 24) : all;
        const ranked=candidates.map(b=>({...b,score:b.count*(.45+b.sat*4.2)*(b.sat>=.13?1.35:1)})).sort((a,b)=>b.score-a.score);
        const chosen=[];
        for (const c of ranked) {
          if (!chosen.length || chosen.every(x=>kdRgbDistance(x.rgb,c.rgb)>42)) chosen.push(c);
          if (chosen.length===3) break;
        }
        if (!chosen.length) throw new Error("No palette candidates");
        const a=chosen[0].rgb;
        const b=chosen[1]?.rgb || (useColor ? a.map(v=>v*.76+Math.max(...a)*.24) : a.map(v=>v*.72+255*.28));
        const c=chosen[2]?.rgb || (useColor ? a.map(v=>v*.68) : a.map(v=>v*.55));
        resolve({primary:kdHex(a),secondary:kdHex(b),tertiary:kdHex(c)});
      } catch { resolve(null); }
    };
    img.onerror=()=>resolve(null);
    img.src=imageUrl;
  });
  kdAccentCache.set(imageUrl,task);
  return task;
}
async function kdAccentPalette(p) {
  const urls=kdAccentImages(p);
  for(const url of urls){ const palette=await kdSamplePalette(url); if(palette) return palette; }
  // Neutral fallback is deliberate: a blocked external image must not turn every product purple.
  return KD_ACCENT_NEUTRAL;
}
async function kdApplyProductAccents(root=document) {
  const nodes=root.querySelectorAll ? root.querySelectorAll("[data-product-accent]") : [];
  for(const el of nodes){
    if(el.dataset.accentReady==="1") continue;
    const p=(state.products||[]).find(x=>Number(x.id)===Number(el.dataset.productAccent));
    if(!p) continue;
    el.dataset.accentReady="1";
    const palette=await kdAccentPalette(p);
    if(!el.isConnected) continue;
    el.style.setProperty("--product-accent",palette.primary);
    el.style.setProperty("--product-accent-2",palette.secondary);
    el.style.setProperty("--product-accent-3",palette.tertiary);
    el.style.setProperty("--product-accent-soft",`color-mix(in srgb, ${palette.primary} 12%, var(--surface, #17141f))`);
    el.style.setProperty("--product-accent-glow",`color-mix(in srgb, ${palette.primary} 52%, transparent)`);
    el.classList.add("has-product-accent");
  }
}
async function kdApplyCampaignAccent(imageUrl="", campaignLink="") {
  const card=document.querySelector("#campaignSection .campaign-card");if(!card)return;
  let palette=null;
  // The campaign's own artwork is the most direct source of its accent. A linked product
  // is second, followed by a featured product. Parse paths safely for absolute and relative links.
  if(imageUrl && (/^https:\/\//i.test(imageUrl)||String(imageUrl).startsWith("/"))) palette=await kdSamplePalette(imageUrl);
  let path="";
  try{path=new URL(String(campaignLink||""),location.origin).pathname.replace(/^\//,"").replace(/^product\//,"");}catch{}
  let linked=null;
  try{const decoded=decodeURIComponent(path);linked=(state.products||[]).find(p=>decoded&&(String(p.id)===decoded||String(p.slug||"")===decoded));}catch{}
  if(!palette&&linked)palette=await kdAccentPalette(linked);
  if(!palette){const featured=(state.products||[]).find(p=>Number(p.featured)===1)||(state.products||[])[0];if(featured)palette=await kdAccentPalette(featured);}
  if(!palette)palette=KD_ACCENT_NEUTRAL;
  if(!card.isConnected)return;
  for(const [k,v]of [["--product-accent",palette.primary],["--product-accent-2",palette.secondary],["--product-accent-3",palette.tertiary]])card.style.setProperty(k,v);
  card.style.setProperty("--product-accent-glow",`color-mix(in srgb, ${palette.primary} 48%, transparent)`);
  card.classList.add("campaign-has-product-accent");
}
if(typeof document!=="undefined"){
  const kdAccentStart=()=>{
    if(!document.body) return;
    let queued=false;
    const observer=new MutationObserver(records=>{
      if(!records.some(r=>r.addedNodes&&r.addedNodes.length)||queued) return;
      queued=true; requestAnimationFrame(()=>{queued=false;kdApplyProductAccents(document);});
    });
    observer.observe(document.body,{childList:true,subtree:true});
    kdApplyProductAccents(document);
  };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",kdAccentStart,{once:true});
  else kdAccentStart();
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
      return `<article class="product-card product-card-link" ${kdAccentMarkup(p)}><div class="product-image">${stockImg(p.image_url, name, stockArtFor(p))}<a class="product-image-link" href="${href}" aria-label="${escapeHTML(t("View {0}", name))}"></a>${favoriteButton(p)}${quickViewButton(p)}${sale ? `<span class="sale">${escapeHTML(saveBadgeText(displayPrice, displayOld))}</span>` : ""}<span class="stock${!soldOut && p.delivery_type === "code" && showStock && totalStock > 0 && totalStock <= 5 ? " low" : ""}">${!soldOut && p.delivery_type === "code" && showStock && totalStock > 0 && totalStock <= 5 ? t("Only {0} left", totalStock) : badge}</span></div><a class="product-card-anchor" href="${href}" aria-label="${escapeHTML(t("View {0}", name))}"><div class="product-body"><div class="product-cat">${escapeHTML(cat || t("Digital"))}</div><div class="product-name" title="${escapeHTML(name)}">${escapeHTML(name)}</div><div class="product-meta">${escapeHTML([p.platform, p.region].filter(Boolean).join(" · ") || dlv(p))}</div></div></a><div class="price-row"><div class="price">${variants.length ? `${t("From")} ` : ""}${money(displayPrice)}${sale ? `<span class="old">${money(displayOld)}</span><small class="save-line">${escapeHTML(t("You save {0}", moneyShort(displayOld - displayPrice)))}</small>` : ""}${rewardPreview(displayPrice)}</div><button type="button" class="add-btn" data-add="${p.id}" ${soldOut ? "disabled" : ""}>${soldOut ? t("Sold out") : variants.length ? t("Choose options") : t("Add")}</button></div></article>`;
    })
    .join("");
  bindFavoriteButtons(el);
  $$("[data-quick]", el).forEach((b) => (b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); openQuickView(b.dataset.quick); }));
  $$ ("[data-add]").forEach(
    (b) =>
      (b.onclick = () => {
        const p = state.products.find((x) => x.id === Number(b.dataset.add));
        if (p?.variants?.length) navigate("/" + encodeURIComponent(p.slug));
        else addToCart(Number(b.dataset.add));
      }),
  );
}
let stickyAtcObs = null;
function crumbCat(p) {
  const c = state.categories.find((x) => Number(x.id) === Number(p.category_id));
  return c && c.slug ? `<a href="/c/${encodeURIComponent(c.slug)}">${escapeHTML(cName(c))}</a><span>/</span>` : "";
}
async function openProductPage(slug) {
  stickyAtcObs?.disconnect();
  stickyAtcObs = null;
  document.body.classList.add("product-route");
  const main = $("main");
  { const sp = state.products.find((x) => x.slug === slug); main.innerHTML = skProductHTML(sp && sp.image_url ? sp.image_url : ""); }
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
    document.title = String((state.lang === "ar" ? p.meta_title_ar : p.meta_title) || "").trim() || `${name} | ${sn}`;
    trackMarketingEvent("product_viewed", { product_id: Number(p.id) });
    const first = variants[0],
      price = variants.length ? Number(first.price) : Number(p.price),
      old = variants.length
        ? Number(first.old_price || 0)
        : Number(p.old_price || 0);
    main.innerHTML = `<section class="product-page container" ${kdAccentMarkup(p)}><div class="product-breadcrumb"><a href="/" data-home>${t("Store")}</a><span>/</span>${crumbCat(p)}<span>${escapeHTML(name)}</span></div><div class="product-detail">${productGalleryHTML(p, name)}<div class="product-detail-copy"><span class="eyebrow">${escapeHTML(cName({ name: p.category_name, name_ar: p.category_name_ar }) || t("DIGITAL PRODUCT"))}</span><h1>${escapeHTML(name)}</h1><div class="product-detail-price" id="productPrice">${money(price)} ${old > price ? `<del>${money(old)}</del>` : ""}${rewardPreview(price)}</div>${saleActive() && String(state.settings.sale_on_products) !== "0" ? saleBlockHTML("productSale", !(old > price)) : ""}<div class="product-detail-meta">${[
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
      )}</div><div class="product-facts"><h3>${t("What to know")}</h3><dl>${p.platform ? `<div><dt>${t("Platform")}</dt><dd>${escapeHTML(p.platform)}</dd></div>` : ""}${p.region ? `<div><dt>${t("Region")}</dt><dd>${escapeHTML(p.region)}</dd></div>` : ""}<div><dt>${t("Delivery")}</dt><dd>${escapeHTML(p.delivery_type === "code" ? (state.lang === "ar" ? "كود رقمي" : "Digital code") : t("Manual delivery"))}</dd></div></dl><p>${t("Digital delivery details")}</p></div>${variants.length ? `<div class="field" style="margin:18px 0"><label>${t("Choose option")}</label><select id="productVariant">${variants.map((v, i) => `<option value="${v.id}" ${i === 0 ? "selected" : ""} data-price="${v.price}" data-old="${v.old_price || 0}" data-stock="${v.stock || 0}">${escapeHTML(v.name)}${p.delivery_type === "code" && state.settings.show_stock !== false ? ` — ${v.stock || 0} ${t("left")}` : ""}</option>`).join("")}</select></div>` : ""}<div class="product-description">${desc ? escapeHTML(desc).replace(/\n/g, "<br>") : t("No description has been added for this product yet.")}</div>${(p.reviews || []).length ? `<div class="admin-panel" style="margin-top:20px"><h3>${t("Customer reviews")}</h3>${p.reviews.map((r) => `<div class="line" style="padding:10px 0"><span><b>${starsHTML(r.rating)}</b><br><small>${escapeHTML(r.user_name || "Verified customer")}</small></span><span style="max-width:55%">${escapeHTML(r.body || "")}${r.photo ? `<br><a href="${escapeHTML(r.photo)}" target="_blank" rel="noreferrer"><img class="review-photo" loading="lazy" src="${escapeHTML(r.photo)}" alt=""></a>` : ""}</span></div>`).join("")}</div>` : ""}<div class="notify-box" id="notifyBox" hidden><b>${t("Sold out right now")}</b><br><small>${t("Leave your email or WhatsApp number and we'll tell you when it's back.")}</small><div style="display:flex;gap:8px;margin-top:8px"><input id="notifyContact" placeholder="${t("Email or WhatsApp number")}" style="flex:1"><button class="btn ghost" id="notifyBtn" type="button">${t("Notify me")}</button></div></div><div class="product-detail-actions"><button class="btn primary" id="productAdd" ${soldOut ? "disabled" : ""}>${soldOut ? t("Sold out") : variants.length ? t("Add to cart") : t("Add to cart")}</button><button class="btn ghost share-btn" id="productShare" type="button"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3"/></svg><span>${t("Share")}</span></button><button class="btn ghost share-btn wa-btn" id="productWhatsApp" type="button"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.5A8.4 8.4 0 1 1 21 11.5z"/></svg><span>${t("WhatsApp")}</span></button><a class="btn ghost" href="/" data-home>${t("Back to store")}</a></div><p class="delivery-promise" id="deliveryPromise" ${soldOut ? "hidden" : ""}><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span>${t("Usually delivered in 5–15 min after payment confirmed.")}</span></p></div></div></section>`;
    initProductGallery(p);
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
        `${money(pr)} ${ol > pr ? `<del>${money(ol)}</del>` : ""}${rewardPreview(pr)}`;
      const saleEl = $("#productSale");
      if (saleEl) {
        saleEl.hidden = !(saleActive() && ol > pr);
        if (!saleEl.hidden) ensureSaleTicker();
      }
      const st = p.delivery_type === "code" && Number(o.dataset.stock) <= 0;
      $("#productAdd").disabled = st;
      $("#notifyBox").hidden = !st;
      $("#deliveryPromise").hidden = st;
      $("#productAdd").textContent = st ? t("Sold out") : t("Add to cart");
    };
    $("#productVariant")?.addEventListener("change", updateVariant);
    updateVariant();
    if ($("#productSale") && !$("#productSale").hidden) ensureSaleTicker();
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
    const shareNow = (viaWhatsApp) => async () => {
      const d = productShareData(p, name, variants),
        wa = () => window.open(`https://wa.me/?text=${encodeURIComponent(`${d.text}\n${d.url}`)}`, "_blank", "noopener");
      // WhatsApp button goes straight to WhatsApp. The generic Share button uses the phone's share sheet when there is one.
      if (viaWhatsApp || !navigator.share) return wa();
      try {
        await navigator.share({ title: d.title, text: d.text, url: d.url });
      } catch (e) {
        if (e?.name !== "AbortError") wa();
      }
    };
    $("#productShare").onclick = shareNow(false);
    $("#productWhatsApp").onclick = shareNow(true);
    // Sticky add-to-cart bar (phones; CSS hides it on wider screens). Shows whenever the main
    // button is out of view and mirrors its label, disabled state and the current price.
    const mainAdd = $("#productAdd"),
      stickyBar = document.createElement("div");
    stickyBar.className = "sticky-atc";
    stickyBar.innerHTML = `<div class="sticky-atc-price" id="stickyPrice"></div><button class="btn primary" id="stickyAdd" type="button"></button>`;
    $(".product-page").appendChild(stickyBar);
    const stickyAdd = $("#stickyAdd"),
      syncSticky = () => {
        $("#stickyPrice").textContent = ($("#productPrice")?.firstChild?.textContent || "").trim();
        stickyAdd.textContent = mainAdd.textContent;
        stickyAdd.disabled = mainAdd.disabled;
      };
    stickyAdd.onclick = () => mainAdd.click();
    $("#productVariant")?.addEventListener("change", syncSticky);
    syncSticky();
    if ("IntersectionObserver" in window) {
      // -70px bottom margin: a button hidden behind the tab bar counts as out of view.
      stickyAtcObs = new IntersectionObserver(
        ([e]) => stickyBar.classList.toggle("show", !e.isIntersecting),
        { rootMargin: "0px 0px -70px 0px" },
      );
      stickyAtcObs.observe(mainAdd);
    }
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
  return `<div class="mini-card-wrap" ${kdAccentMarkup(p)}>${favoriteButton(p)}<a class="mini-card" href="/${encodeURIComponent(p.slug)}"><div class="mini-img">${p.image_url ? `<img src="${escapeHTML(p.image_url)}" alt="" loading="lazy">` : `<span>K</span>`}</div><b>${escapeHTML(pName(p))}</b><small>${vs.length ? t("From") + " " : ""}${money(price)}</small></a></div>`;
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
  if (page) { page.insertAdjacentHTML("beforeend", row(t("You may also like"), like) + row(t("Recently viewed"), recentP)); bindFavoriteButtons(page); }
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
        `<figure class="testi"><div class="stars">${starsHTML(r.rating)}</div>${r.body ? `<blockquote>${escapeHTML(r.body)}</blockquote>` : ""}${r.photo ? `<img class="review-photo" loading="lazy" src="${escapeHTML(r.photo)}" alt="">` : ""}<figcaption>${escapeHTML(r.user_name || t("Verified customer"))} · <a href="/${encodeURIComponent(r.slug)}">${escapeHTML(state.lang === "ar" && r.product_name_ar ? r.product_name_ar : r.product_name)}</a></figcaption></figure>`,
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
  window.kdFx?.tap();
  trackMarketingEvent("cart_added", { product_id: Number(p.id) });
  renderAbandonedCartNudge();
  cartToast(p);
}
function cartToast(p) {
  const el = $("#toast");
  const img = p.image_url ? `<img class="toast-thumb" src="${escapeHTML(p.image_url)}" alt="" onerror="this.remove()">` : "";
  el.innerHTML = `<span class="toast-rich">${img}<span class="toast-msg">${escapeHTML(t("{0} added to cart.", pName(p)))}</span><button type="button" class="toast-link" id="toastCartLink">${escapeHTML(t("View cart"))}</button></span>`;
  $("#toastCartLink").onclick = () => { el.classList.remove("show"); navigate("/cart"); };
  el.classList.add("show");
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => el.classList.remove("show"), 4000);
  const cb = [$("#cartBtn"), $("#tabCart")].find((e) => e && e.offsetParent);
  if (cb) { cb.classList.remove("bump"); void cb.offsetWidth; cb.classList.add("bump"); }
}
function cartItems() {
  return state.cart
    .map((i) => {
      const p = state.products.find((x) => x.id === i.product_id);
      return p && cartRowValid(i, state.products) ? { ...i, p } : null;
    })
    .filter(Boolean);
}
function emptyState(kind, compact) {
  const art = {
    cart: '<svg viewBox="0 0 160 140" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" focusable="false"><ellipse cx="80" cy="128" rx="40" ry="6" fill="currentColor" fill-opacity=".12" stroke="none"/><path d="M44 54h72l-5 66a6 6 0 0 1-6 5.5H55a6 6 0 0 1-6-5.5z" fill="currentColor" fill-opacity=".1"/><path d="M62 54V46a18 18 0 0 1 36 0v8"/><circle cx="70" cy="82" r="2.2" fill="currentColor" stroke="none"/><circle cx="90" cy="82" r="2.2" fill="currentColor" stroke="none"/><path d="M70 96c4 5 16 5 20 0"/><path d="M130 28v14M123 35h14"/><path d="M24 68v10M19 73h10" opacity=".7"/><circle cx="132" cy="86" r="3" fill="currentColor" fill-opacity=".5" stroke="none"/><circle cx="30" cy="38" r="2.5" fill="currentColor" fill-opacity=".4" stroke="none"/></svg>',
    favorites: '<svg viewBox="0 0 160 140" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" focusable="false"><ellipse cx="80" cy="128" rx="40" ry="6" fill="currentColor" fill-opacity=".12" stroke="none"/><path d="M80 118S36 92 36 60a24 24 0 0 1 44-13 24 24 0 0 1 44 13c0 32-44 58-44 58z" fill="currentColor" fill-opacity=".1"/><path d="M58 64a12 12 0 0 1 9-10" opacity=".6"/><path d="M130 28v14M123 35h14"/><path d="M24 68v10M19 73h10" opacity=".7"/><circle cx="132" cy="86" r="3" fill="currentColor" fill-opacity=".5" stroke="none"/><circle cx="30" cy="38" r="2.5" fill="currentColor" fill-opacity=".4" stroke="none"/></svg>',
    orders: '<svg viewBox="0 0 160 140" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" focusable="false"><ellipse cx="80" cy="132" rx="40" ry="6" fill="currentColor" fill-opacity=".12" stroke="none"/><path d="M36 56 80 34l44 22v48l-44 22-44-22z" fill="currentColor" fill-opacity=".1"/><path d="M36 56l44 22 44-22M80 78v48"/><path d="M58 45l44 22v13" opacity=".7"/><path d="M130 28v14M123 35h14"/><path d="M24 68v10M19 73h10" opacity=".7"/><circle cx="132" cy="86" r="3" fill="currentColor" fill-opacity=".5" stroke="none"/><circle cx="30" cy="38" r="2.5" fill="currentColor" fill-opacity=".4" stroke="none"/></svg>',
  }[kind];
  const copy = {
    cart: ["Your cart is empty. Humanity's oldest shopping problem.", "Pick a product and it will show up here, ready for checkout."],
    favorites: ["No saved products yet.", "Tap the heart on any product to keep it here for later."],
    orders: ["No orders yet.", "Your orders and delivery updates will show up here after your first purchase."],
  }[kind];
  const second = kind === "cart" ? `<button class="btn ghost" type="button" data-tab="/favorites">${t("See your favorites")}</button>` : "";
  return `<div class="empty collection-empty es${compact ? " es-compact" : ""}" role="status"><div class="es-art" aria-hidden="true">${art}</div><h2>${t(copy[0])}</h2><p>${t(copy[1])}</p><div class="es-actions"><button class="btn primary" type="button" data-go-store>${t("Browse products")}</button>${second}</div></div>`;
}
let lastAnnounced = "";
function announce(msg) {
  const el = $("#a11yLive");
  if (!el || !msg) return;
  // Re-set on the next tick so a repeated message is still read.
  el.textContent = "";
  clearTimeout(window.__announce);
  window.__announce = setTimeout(() => { el.textContent = msg; }, 350);
}
const starsHTML = (n) => `<span role="img" aria-label="${escapeHTML(t("{0} out of 5 stars", n))}"><span aria-hidden="true">${"★".repeat(n)}${"☆".repeat(5 - n)}</span></span>`;
let lastCartN = null;
function renderCartCount() {
  const n = state.cart.reduce((a, b) => a + b.quantity, 0);
  if (lastCartN !== null && n !== lastCartN && state.ready) announce(`${t("Cart")}: ${n}`);
  lastCartN = n;
  $("#cartCount").textContent = n;
  const tb = $("#tabCartCount");
  if (tb) { tb.textContent = n > 99 ? "99+" : n; tb.hidden = n < 1; }
}
function openModal(title, body, wide = false) {
  if (!$("#modalRoot").innerHTML) state.modalOpener = document.activeElement;
  $("#modalRoot").innerHTML =
    `<div class="modal-backdrop" id="backdrop"><div class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="modalTitle" ${state.adminOpen ? 'dir="ltr"' : ""}><div class="sheet-grip" aria-hidden="true"></div><div class="modal-head"><h2 id="modalTitle">${title}</h2><button type="button" class="close" id="closeModal" aria-label="${escapeHTML(t("Close"))}">×</button></div><div class="modal-body">${body}</div></div></div>`;
  $("#closeModal").onclick = closeModal;
  $("#closeModal").focus({ preventScroll: true });
  kdSheetInit($("#backdrop"));
  $("#backdrop").onclick = (e) => {
    if (e.target.id === "backdrop") closeModal();
  };
}
function closeModal() {
  const was = !!$("#modalRoot").innerHTML;
  state.adminOpen = false;
  $("#modalRoot").innerHTML = "";
  const o = state.modalOpener;
  state.modalOpener = null;
  if (was && o && document.contains(o) && typeof o.focus === "function") o.focus({ preventScroll: true });
}
document.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const modal = $("#modalRoot .modal");
  if (!modal) return;
  const f = [...modal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter((x) => x.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
function openCart() { navigate("/cart"); }
function renderCartPage() {
  document.body.classList.remove("product-route"); document.body.classList.add("account-route");
  const items = cartItems();
  const subtotal = items.reduce((sum, i) => sum + Number(i.p.variants?.find(v => Number(v.id) === Number(i.variant_id))?.price ?? i.p.price) * i.quantity, 0);
  $("main").innerHTML = `<section class="collection-page container cart-page"><div class="collection-hero"><div><span class="eyebrow">KARDIVO · ${t("Cart")}</span><h1>${t("Your cart")}</h1><p>${items.length} ${state.lang === "ar" ? "منتج في سلتك" : "items in your cart"}</p></div><a class="btn ghost" href="/#store" data-collection-store>${t("Continue shopping")}</a></div>${items.length ? `<div class="cart-page-layout"><div class="cart-page-items">${items.map(i=>{const v=i.p.variants?.find(x=>Number(x.id)===Number(i.variant_id));const price=Number(v?.price ?? i.p.price);return `<article class="cart-page-item" ${kdAccentMarkup(i.p)}><div class="cart-page-image">${stockImg(i.p.image_url,pName(i.p),stockArtFor(i.p))}</div><div class="cart-page-item-info"><b>${escapeHTML(pName(i.p))}</b>${v?`<small>${escapeHTML(v.name)}</small>`:""}<small>${money(price)} ${t("each")}</small><div class="cart-quantity"><button type="button" class="mini" data-minus="${escapeHTML(cartKey(i))}" aria-label="Decrease quantity">−</button><b>${i.quantity}</b><button type="button" class="mini" data-plus="${escapeHTML(cartKey(i))}" aria-label="Increase quantity">+</button><button type="button" class="mini" data-save-later="${escapeHTML(cartKey(i))}">${t("Save for later")}</button><button type="button" class="mini danger" data-remove="${escapeHTML(cartKey(i))}">${t("Remove")}</button></div></div><strong class="cart-line-total">${money(price*i.quantity)}</strong></article>`}).join("")}<div id="cartBundles" class="cart-bundles" hidden></div>${savedForLaterHTML()}</div><aside class="cart-page-summary"><span class="eyebrow">${t("Order summary")}</span><h2>${t("Subtotal")}</h2><div class="line"><span>${t("Subtotal")}</span><b>${money(subtotal)}</b></div><div class="line cart-auto" id="cartAuto" hidden><span id="cartAutoLabel"></span><b id="cartAutoAmt"></b></div><div class="line cart-est" id="cartEst" hidden><span>${t("Estimated total")}</span><b id="cartEstAmt"></b></div><p>${t("Shipping and final discounts are confirmed at checkout.")}</p><button class="btn primary cart-checkout" id="checkoutBtn">${t("Continue to checkout")}</button><a class="btn ghost cart-back" href="/#store" data-collection-store>${t("Continue shopping")}</a></aside></div>` : `${emptyState("cart")}`}</section>`;
  $("[data-collection-store]")?.addEventListener("click",e=>{e.preventDefault();navigate("/#store","#store")});
  $$('[data-minus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.minus,-1));
  $$('[data-plus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.plus,1));
  $$('[data-remove]').forEach(b=>b.onclick=()=>{const gone=state.cart.find(x=>cartKey(x)===b.dataset.remove);const gp=gone&&state.products.find(x=>x.id===gone.product_id);state.cart=state.cart.filter(x=>cartKey(x)!==b.dataset.remove);saveCart();renderCartPage();if(gp)announce(t("{0} removed from cart.",pName(gp)));const h1=$(".cart-page h1");if(h1){h1.setAttribute("tabindex","-1");h1.focus({preventScroll:true});}});
  $("#checkoutBtn")?.addEventListener("click",openCheckout);
  $$("[data-save-later]").forEach((b) => (b.onclick = () => saveForLater(b.dataset.saveLater)));
  $$("[data-unsave]").forEach((b) => (b.onclick = () => { addToCart(Number(b.dataset.unsave)); renderCartPage(); }));
  if (items.length) loadCartBundles();
  kdEnhanceCartSwipe();
}
// Items parked with "Save for later" are simply the customer's favorites that are not in the cart right now.
function savedForLaterHTML() {
  const inCart = new Set(state.cart.map((x) => x.product_id));
  const list = (state.favorites || []).map((id) => state.products.find((p) => Number(p.id) === Number(id))).filter((p) => p && !inCart.has(p.id)).slice(0, 4);
  if (!list.length) return "";
  return `<section class="saved-later" aria-labelledby="savedLaterH"><h2 id="savedLaterH">${t("Saved for later")}</h2>${list.map((p) => { const soldOut = p.delivery_type === "code" && !(p.variants?.length ? p.variants.some((v) => Number(v.stock) > 0) : Number(p.stock) > 0); return `<div class="saved-later-item" ${kdAccentMarkup(p)}><span class="saved-later-img">${stockImg(p.image_url, pName(p), stockArtFor(p))}</span><span class="saved-later-name"><b>${escapeHTML(pName(p))}</b><small>${p.variants?.length ? t("From") + " " : ""}${money(Math.min(...(p.variants?.length ? p.variants.map((v) => Number(v.price)) : [Number(p.price)])))}</small></span><button type="button" class="mini" data-unsave="${Number(p.id)}" ${soldOut || p.variants?.length ? "disabled" : ""}>${soldOut ? t("Out of stock") : t("Move to cart")}</button></div>`; }).join("")}</section>`;
}
function saveForLater(key) {
  const row = state.cart.find((x) => cartKey(x) === key);
  if (!row) return;
  const p = state.products.find((x) => x.id === row.product_id);
  state.cart = state.cart.filter((x) => cartKey(x) !== key);
  saveCart();
  if (p && !isFavorite(p.id)) toggleFavorite(p.id);
  renderCartPage();
  const msg = t("{0} moved to favorites.", p ? pName(p) : "");
  toast(msg);
  announce(msg);
  $(".cart-page h1")?.setAttribute("tabindex", "-1");
  $(".cart-page h1")?.focus({ preventScroll: true });
}
// "Add X and your automatic discount becomes Y": every suggestion is checked on the server with the same engine that prices the order.
let bundleReqId = 0;
async function loadCartBundles() {
  const my = ++bundleReqId;
  // V61: only show a skeleton when the answer is slow, so a quick reply never flickers.
  const skT = setTimeout(() => { const b = $("#cartBundles"); if (b && my === bundleReqId && b.hidden) { b.hidden = false; b.dataset.sk = "1"; b.innerHTML = skBundleHTML(); } }, 350);
  let r;
  try {
    r = await api("/api/bundle-suggestions", { method: "POST", body: JSON.stringify({ items: state.cart }) });
  } catch { clearTimeout(skT); const b = $("#cartBundles"); if (b && b.dataset.sk) { b.hidden = true; b.innerHTML = ""; delete b.dataset.sk; } return; }
  clearTimeout(skT);
  { const b = $("#cartBundles"); if (b) delete b.dataset.sk; }
  if (my !== bundleReqId || !$("#cartBundles")) return;
  const subtotal = Number(r.subtotal || 0), disc = Number(r.discount || 0);
  const auto = $("#cartAuto"), est = $("#cartEst");
  if (auto && est) {
    auto.hidden = est.hidden = !(disc > 0);
    if (disc > 0) {
      $("#cartAutoLabel").textContent = r.source === "auto_bundle" ? t("Bundle discount") : t("Automatic offer");
      $("#cartAutoAmt").textContent = "− " + money(disc);
      $("#cartEstAmt").textContent = money(Math.max(0, subtotal - disc));
    }
  }
  const cards = (r.suggestions || []).map((s) => {
    const p = state.products.find((x) => Number(x.id) === Number(s.product_id));
    if (!p) return "";
    const v = p.variants?.find((x) => Number(x.id) === Number(s.variant_id));
    const title = s.kind === "more" ? t("Add one more {0}", pName(p)) : t("Add {0}", pName(p));
    return `<div class="bundle-card" ${kdAccentMarkup(p)}><span class="bundle-img">${stockImg(p.image_url, pName(p), stockArtFor(p))}</span><span class="bundle-copy"><b>${escapeHTML(title)}${v ? ` <small>(${escapeHTML(v.name)})</small>` : ""}</b><small>${escapeHTML(t("Your discount becomes {0} ({1}% off)", moneyShort(s.new_discount), s.percent))}</small></span><button type="button" class="btn primary bundle-add" data-bundle-add="${Number(s.product_id)}:${Number(s.variant_id || 0)}">${t("Add")} · ${moneyShort(s.price)}</button></div>`;
  }).filter(Boolean);
  const box = $("#cartBundles");
  box.hidden = !cards.length;
  box.innerHTML = cards.length ? `<h2>${t("Complete your bundle")}</h2><p class="bundle-sub">${t("Automatic discount, no code needed.")}</p>${cards.join("")}` : "";
  $$("[data-bundle-add]", box).forEach((b) => (b.onclick = () => {
    const [pid, vid] = b.dataset.bundleAdd.split(":").map(Number);
    addToCart(pid, vid || null);
    renderCartPage();
  }));
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
  renderCartPage();
  const left = state.cart.find((x) => cartKey(x) === key);
  const name = pName(p);
  if (left) {
    announce(`${name}: ${left.quantity}`);
    const sel = d > 0 ? "plus" : "minus";
    [...document.querySelectorAll(`[data-${sel}]`)].find((b) => b.dataset[sel] === key)?.focus({ preventScroll: true });
  } else {
    announce(t("{0} removed from cart.", name));
    $(".cart-page h1")?.setAttribute("tabindex", "-1");
    $(".cart-page h1")?.focus({ preventScroll: true });
  }
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
    `<div class="checkout-stepper"><span class="checkout-step active"><i>1</i><b>${t("Review your order")}</b></span><span class="checkout-step"><i>2</i><b>${t("Payment method")}</b></span><span class="checkout-step"><i>3</i><b>${t("Place order")}</b></span></div><div class="checkout-trust"><span>✓ ${t("Your total is confirmed by the store before the order is placed.")}</span><span>✓ ${t("Payment is reviewed manually when required.")}</span></div><div class="notice">${t("Checkout and payment remain in EGP.")}</div><div class="field"><label>${t("Discount code")}</label><div style="display:flex;gap:8px"><input id="discountCode" value="${escapeHTML(savedRef)}" placeholder="${t("Optional code")}" style="flex:1"><button type="button" class="btn ghost" id="applyDiscount">${t("Apply")}</button></div><small id="coNote" class="coupon-note" role="status" aria-live="polite"></small></div><label class="switch-row" id="creditRow" hidden><span>${t("Use store credit")} <b id="creditBal"></b></span><input class="switch" id="useCredit" type="checkbox"></label><label class="switch-row" id="pointsRow" hidden><span>${t("Use reward points")} <b id="pointsBal"></b></span><input class="switch" id="usePoints" type="checkbox"></label><div class="field"><label>${t("Phone / WhatsApp number")} <small>(${t("optional")})</small></label><input id="coPhone" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" value="${escapeHTML(loadPrefs().phone || "")}"><small class="muted-note">${t("Remembered on this device")}</small></div><div class="form-grid"><div class="field"><label>${t("Transfer reference")} <small>(${t("optional")})</small></label><input id="payRef" placeholder="${t("Reference number from the transfer receipt")}"></div><div class="field"><label>${t("Payment proof")} <small>(${t("optional")})</small></label><input id="checkoutProof" type="file" accept="image/*"><div class="proof-preview" id="checkoutProofPreview" hidden></div></div></div><div class="checkout-summary"><div class="checkout-summary-title">${t("Review your order")}</div><div class="line"><span>${t("Subtotal")}</span><span id="coSubtotal">${moneyEGP(subtotal)}</span></div><div class="line"><span>${t("Discount")}</span><span id="coDiscount">${moneyEGP(0)}</span></div><div class="line" id="coCreditLine" hidden><span>${t("Store credit")}</span><span id="coCredit">${moneyEGP(0)}</span></div><div class="line" id="coPointsLine" hidden><span>${t("Reward points")}</span><span id="coPoints">${moneyEGP(0)}</span></div><div class="line total"><span>${t("Total")}</span><span><span id="coTotal">${moneyEGP(subtotal)}</span> ${copyBtn(copyAmount(subtotal), t("Copy exact total"), t("Copy"), true).replace("<button ", '<button id="coCopyTotal" ')}</span></div></div><div id="payWrap" style="margin-top:18px"><b>${t("Payment method")}</b><div class="payment-grid" id="payments"></div></div><div class="modal-actions"><button class="btn ghost" id="backCart">${t("Back")}</button><button class="btn primary" id="placeOrder">${t("Place order")}</button></div>`,
  );
  $("#backCart").onclick = openCart;
  renderPaymentOptions();
  bindCopy();
  bindProofPicker($("#checkoutProof"), $("#checkoutProofPreview"));
  $("#discountCode").addEventListener("input", scheduleCouponCheck);
  $("#applyDiscount").onclick = async () => {
    clearTimeout(couponTimer);
    if (!$("#discountCode").value.trim()) {
      toast(t("Enter a code to apply."));
      return;
    }
    await refreshTotals(true);
  };
  $("#useCredit").onchange = () => refreshTotals(false);
  $("#usePoints").onchange = () => refreshTotals(false);
  refreshTotals(false);
}
// Asks the server what the cart costs: coupon, automatic bundle offers, referral codes and store credit are all decided there.
async function refreshTotals(announce, useCode = true, keepNote = false) {
  const code = useCode ? ($("#discountCode")?.value || "").trim() : "";
  if (!$("#coTotal")) return;
  const seq = ++totalsSeq;
  try {
    const r = await api("/api/discount/check", {
      method: "POST",
      body: JSON.stringify({
        items: state.cart,
        code,
        contact: String(state.user?.email || "").trim(),
        use_credit: !!$("#useCredit")?.checked,
        use_points: !!$("#usePoints")?.checked,
      }),
    });
    if (seq !== totalsSeq || !$("#coTotal")) return;
    state.co = { total: r.total };
    $("#coSubtotal").textContent = moneyEGP(r.subtotal);
    $("#coDiscount").textContent = r.discount ? "− " + moneyEGP(r.discount) : moneyEGP(0);
    $("#coCredit").textContent = "− " + moneyEGP(r.credit);
    $("#coCreditLine").hidden = !(r.credit > 0);
    $("#coPoints").textContent = "− " + moneyEGP(r.points || 0);
    $("#coPointsLine").hidden = !(r.points > 0);
    $("#pointsRow").hidden = !(state.user && r.points_available_egp > 0);
    $("#pointsBal").textContent = `(${moneyEGP(r.points_available_egp || 0)})`;
    $("#coTotal").textContent = moneyEGP(r.total);
    $("#coCopyTotal")?.setAttribute("data-copy", copyAmount(r.total));
    $("#payWrap").hidden = r.total <= 0;
    const row = $("#creditRow");
    row.hidden = !(state.user && r.credit_available > 0);
    $("#creditBal").textContent = `(${moneyEGP(r.credit_available)})`;
    if (!keepNote) {
      const own = r.discount_source === "coupon" || r.discount_source === "referral";
      if (r.discount && own) setCouponNote("ok", t("Code applied. You save {0}.", moneyEGP(r.discount)));
      else if (r.discount) {
        const base = r.discount_source === "auto" ? `${t("Automatic offer applied.")} (${r.discount_code})` : r.discount_source === "auto_bundle" ? t("Bundle discount applied automatically.") : t("Discount applied.");
        setCouponNote("ok", code ? `${base} ${t("It is better than your code, so it was used.")}` : base);
      } else setCouponNote("", "");
    }
    if (announce) toast(r.discount ? t("Discount applied.") : t("Enter a code to apply."));
  } catch (e) {
    if (seq !== totalsSeq) return;
    if (code && useCode) {
      // Show the real reason under the field, and keep the totals honest by pricing the cart without the bad code.
      await refreshTotals(false, false, true);
      if (($("#discountCode")?.value || "").trim() === code) setCouponNote("err", e.message);
    }
    if (announce) toast(e.message);
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
            `<button type="button" class="pay-option" data-pay="${k}"><span class="pay-option-head">${payLogo(k)}<b>${payName(k)}</b></span><small>${t("Details shown after you order")}</small></button>`,
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
  if (methods[0]) {
    const want = loadPrefs().pay;
    (methods.some(([k]) => k === want) ? $(`[data-pay="${want}"]`) : $("[data-pay]")).click();
  }
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
    proof = await proofFor($("#checkoutProof")),
    phone = cleanPhone($("#coPhone")?.value),
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
        use_points: !!$("#usePoints")?.checked,
        payment_ref: payRef,
        payment_method: free ? "" : state.selectedPayment,
      }),
    });
    try {
      localStorage.removeItem("kardivo_ref");
    } catch {}
    savePrefs({ pay: free ? "" : state.selectedPayment, phone });
    let proofMsg = "", proofOk = false;
    if (proof && !r.paid)
      try {
        await uploadPaymentProof(r.order_id, proof, state.user ? "" : guestContact, payRef);
        proofMsg = t("Proof uploaded.");
        proofOk = true;
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
    try {
      sessionStorage.setItem(
        LAST_ORDER_KEY,
        JSON.stringify({
          order_number: r.order_number,
          total: r.total,
          credit_used: r.credit_used,
          paid: !!r.paid,
          payment_method: r.payment_method,
          destination: r.destination || "",
          support_text: r.support_text || "",
          proof_ok: proofOk,
          proof_err: proof && !proofOk && !r.paid ? proofMsg : "",
          phone,
        }),
      );
    } catch {}
    closeModal();
    navigate("/order-confirmed");
  } catch (e) {
    toast(e.message);
    $("#placeOrder").disabled = false;
  }
}
function renderOrderConfirmed() {
  const o = readLastOrder();
  if (!o) { navigate("/account"); return; }
  document.body.classList.remove("product-route");
  document.body.classList.add("account-route");
  const eta = S("order_eta") || t("Usually delivered in 5–15 min after payment confirmed.");
  const steps = o.paid
    ? [t("We check your order and deliver it shortly."), t("Follow it any time under Track order.")]
    : [
        t("Send exactly {0} to the number above.", moneyEGP(o.total)),
        o.proof_ok ? t("Your transfer screenshot was received.") : t("Send the transfer screenshot and your order number on WhatsApp, or upload it from Track order."),
        t("We check the payment and deliver. Follow it any time under Track order."),
      ];
  const wa = !o.paid && !o.proof_ok ? proofWaLink(o) : orderWaLink(o.order_number);
  const waLabel = !o.paid && !o.proof_ok ? t("Send proof on WhatsApp") : t("Message us about this order");
  $("main").innerHTML = `<section class="collection-page container order-done"><div class="collection-hero"><div><div class="od-check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l8 8 14-16"/></svg></div><span class="eyebrow">KARDIVO · ${t("Order received")}</span><h1>${o.paid ? t("Your order is confirmed") : t("Order received")}</h1><p>${t("Order <b>{0}</b> created. Save this number.", escapeHTML(o.order_number))} ${copyBtn(o.order_number, t("Copy order number"), t("Copy"), true)}</p></div></div>
<div class="order-done-grid"><article class="account-page-card"><span class="eyebrow">${t("Payment")}</span>
<div class="line"><span>${t("Total to pay")}</span><span><b>${moneyEGP(o.total)}</b>${o.paid ? "" : " " + copyBtn(copyAmount(o.total), t("Copy exact total"), t("Copy"), true)}</span></div>
${o.credit_used > 0 ? `<div class="line"><span>${t("Store credit")}</span><b>− ${moneyEGP(o.credit_used)}</b></div>` : ""}
${o.paid ? `<div class="notice success-text">${t("Nothing to pay. Your order is confirmed and will be delivered shortly.")}</div>` : `<div class="line"><span>${t("Payment")}</span><b>${escapeHTML(payName(o.payment_method))}</b></div><div class="destination"><b>${t("Send payment to")}</b><code>${escapeHTML(o.destination)}</code>${o.destination ? " " + copyBtn(o.destination, t("Copy number"), t("Copy"), true) : ""}</div>`}
${o.support_text ? `<p class="muted-note">${escapeHTML(o.support_text)}</p>` : ""}${o.proof_err ? `<p class="muted-note">${escapeHTML(o.proof_err)}</p>` : ""}</article>
<article class="account-page-card"><span class="eyebrow">${t("Estimated wait")}</span><p class="order-eta">${escapeHTML(eta)}</p><span class="eyebrow">${t("What happens next")}</span><ol class="order-steps">${steps.map((x) => `<li>${escapeHTML(x)}</li>`).join("")}</ol></article></div>
<div class="modal-actions order-done-actions">${wa ? `<a class="btn primary" href="${escapeHTML(wa)}" target="_blank" rel="noreferrer">${waLabel} ${arrow()}</a>` : ""}<button type="button" class="btn ${wa ? "ghost" : "primary"}" id="trackOrderBtn">${t("Track order")} ${arrow()}</button><a class="btn ghost" href="/#store" data-collection-store>${t("Continue shopping")}</a></div></section>`;
  bindCopy();
  $("#trackOrderBtn").onclick = () => navigate("/account");
  document.title = `${t("Order received")} | Kardivo`;
  celebrateOrder(o);
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
      await syncFavoritesWithAccount(true);
      if (location.pathname.replace(/\/$/, "") === "/favorites") renderFavoritesPage();
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
    `<form id="forgotForm"><p style="color:var(--muted);font-size:13px">${t("Enter your account email and we'll send you a reset link.")}</p><div class="field"><label>${t("Email")}</label><input id="fEmail" type="email" required></div><button class="btn primary">${t("Send reset link")}</button></form>`,
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
      await syncFavoritesWithAccount(true);
      if (location.pathname.replace(/\/$/, "") === "/favorites") renderFavoritesPage();
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
// One-tap WhatsApp to support with the order number already in the message. Empty when no support number is set.
function orderWaLink(num) {
  const d = String(state.settings.whatsapp || "").replace(/\D/g, "");
  if (!d || !num) return "";
  const text = state.lang === "ar" ? `أهلاً، عندي سؤال بخصوص طلبي رقم ${num}` : `Hi, I have a question about my order ${num}.`;
  return `https://wa.me/${d}?text=${encodeURIComponent(text)}`;
}
function orderWaButton(num, cls = "btn ghost order-wa") {
  const href = orderWaLink(num);
  return href ? `<a class="${cls}" href="${escapeHTML(href)}" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg><span>${t("Message us about this order")}</span></a>` : "";
}
function reorderButton(o, compact = false) {
  const list = (o.items || []).filter((i) => i.product_id).map((i) => [Number(i.product_id), Number(i.variant_id || 0), Number(i.quantity) || 1, String(i.product_name || "")]);
  if (!list.length || o.fulfillment_status === "cancelled") return "";
  const btn = `<button type="button" class="${compact ? "mini" : "btn ghost"} reorder-btn" data-reorder="${escapeHTML(JSON.stringify(list))}">↻ ${t("Reorder")}</button>`;
  return compact ? btn : `<div class="reorder-row">${btn}</div>`;
}
// One tap puts a past order's items back in the cart, respecting current stock and the per-order limit.
function reorderItems(list) {
  const max = Number(state.settings.max_qty) || 10;
  let added = 0;
  const missing = [];
  for (const [pid, vid, qty, name] of list) {
    const p = state.products.find((x) => Number(x.id) === pid);
    if (!p) { missing.push(name); continue; }
    const vs = (p.variants || []).filter((v) => Number(v.active) !== 0);
    const v = vid ? vs.find((x) => Number(x.id) === vid) : null;
    if ((vid && !v) || (!vid && vs.length)) { missing.push(name); continue; }
    const stock = p.delivery_type === "code" ? Number(v ? v.stock : p.stock) || 0 : max;
    const row = state.cart.find((x) => x.product_id === p.id && Number(x.variant_id || 0) === Number(v?.id || 0));
    const want = Math.min(qty, Math.min(max, stock) - (row ? row.quantity : 0));
    if (want <= 0) { missing.push(name); continue; }
    if (row) row.quantity += want;
    else state.cart.push({ product_id: p.id, variant_id: v ? Number(v.id) : null, quantity: want });
    added++;
  }
  saveCart();
  if (!added) { toast(t("Those items are not available right now.")); return; }
  toast(missing.length ? t("Added {0} item(s). {1} no longer available.", added, missing.length) : t("Added {0} item(s) to your cart.", added));
  closeModal();
  navigate("/cart");
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-reorder]");
  if (!b) return;
  try { reorderItems(JSON.parse(b.dataset.reorder)); } catch {}
});
function orderBlock(o) {
  const st = (x) => escapeHTML(statusName(x));
  const proof =
    !o.payment_proof &&
    o.payment_status === "awaiting_payment" &&
    o.fulfillment_status !== "cancelled"
    ? `<div class="field" style="margin-top:10px"><label>${t("Payment proof")}</label><input id="proof-${o.id}" type="file" accept="image/*"><div class="proof-preview" id="proofprev-${o.id}" hidden></div><input id="ref-${o.id}" placeholder="${t("Transfer reference (optional)")}" style="margin-top:6px"><button type="button" class="mini" data-upload-proof="${o.id}" style="margin-top:6px">${t("Upload screenshot")}</button></div>`
    : "";
  return `<div class="notice" style="margin-bottom:10px"><div class="line"><b>${escapeHTML(o.order_number)}</b><span>${money(o.total)}</span></div><small>${escapeHTML(o.item_summary || "")}</small><br><small>${t("Payment: {0} · Delivery: {1} · {2}", st(o.payment_status), st(o.fulfillment_status), escapeHTML(fmtTime(o.created_at)))}</small>${timelineHTML(o)}${o.delivery_message ? `<div class="notice success-text" style="margin-top:10px"><b>${t("Delivery message")}</b><br>${escapeHTML(o.delivery_message).replace(/\n/g, "<br>")}</div>` : ""}${(o.codes || []).length ? `<div style="margin-top:10px"><b>${t("Your codes")}</b>${o.codes.map((c) => `<div class="line"><span>${escapeHTML(c.product_name)}${c.variant_name ? ` — ${escapeHTML(c.variant_name)}` : ""}<br><code>${escapeHTML(c.code)}</code></span><span><button class="mini" data-copy="${escapeHTML(c.code)}">${t("Copy")}</button>${state.user ? ` <button class="mini" data-review-product="${c.product_id}" data-review-order="${o.id}">${t("Review")}</button>` : ""}</span></div>`).join("")}</div>` : ""}${proof}${reorderButton(o)}<details class="thread-box" data-thread="${o.id}"><summary>${t("Messages with support")}</summary><div class="thread-body" id="thread-${o.id}"></div></details>${orderWaButton(o.order_number)}</div>`;
}
function loyaltyCard(ref) {
  const L = ref?.loyalty;
  if (!L) return "";
  return `<div class="notice loyalty-box" style="margin-top:12px"><div class="line"><b>${t("Kardivo Balance · Reward points")}</b><b>${Number(L.points || 0).toLocaleString()}</b></div><div class="line"><small>${t("Available redemption value")}</small><b>${money(L.redeemable_egp)}</b></div><div class="line"><small>${t("Lifetime points earned")}</small><b>${Number(L.lifetime_earned || 0).toLocaleString()}</b></div><div class="line"><small>${t("Points redeemed")}</small><b>${Number(L.points_redeemed || 0).toLocaleString()}</b></div><small class="muted-note">${t("Earn {0} point for every 1 EGP on delivered orders.", L.ppe)}</small>${(ref?.ledger || []).length ? `<div class="reward-history"><b>${t("Recent balance transactions")}</b>${ref.ledger.slice(0, 5).map((x) => `<div class="line"><span>${escapeHTML(String(x.reason || "Balance update").replaceAll("_", " "))}<br><small>${escapeHTML(fmtTime(x.created_at))}</small></span><b>${Number(x.amount) > 0 ? "+" : ""}${money(x.amount)}</b></div>`).join("")}</div>` : ""}</div>`;
}
async function openUserAccount() {
  // Keep the admin account entry independent of customer-only account data.
  // If any customer account endpoint is slow or rejects for admins, the header
  // account button must still open and expose the dashboard.
  if (state.user?.role === "admin") {
    const adminUser = state.user;
    openModal(
      t("Hi, {0}", escapeHTML(adminUser.name || adminUser.email || "Admin")),
      `<div class="notice"><b>${escapeHTML(adminUser.email || "")}</b><br>${t("Administrator account")}</div><div class="modal-actions"><button class="btn primary" id="adminBtn">${t("Admin dashboard")}</button><button class="btn ghost" id="logoutBtn">${t("Log out")}</button></div>`,
      true,
    );
    $("#adminBtn")?.addEventListener("click", () => { closeModal(); openAdmin(); });
    $("#logoutBtn")?.addEventListener("click", async () => {
      try { await api("/api/auth/logout", { method: "POST" }); }
      catch (e) { toast(e.message); return; }
      state.user = null;
      state.favorites = [];
      saveFavorites();
      closeModal();
      toast(t("Logged out."));
    });
    return;
  }
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
    `<div class="notice"><b>${escapeHTML(state.user.email)}</b><br>${state.user.role === "admin" ? t("Administrator account") : t("Customer account")}</div>${loyaltyCard(ref)}${
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
    }<h3 style="margin:18px 0 8px">${t("Order history")}</h3>${orders.length ? orders.map(orderBlock).join("") : `${emptyState("orders", true)}`}<div class="modal-actions">${state.user.role === "admin" ? `<button class="btn ghost" id="adminBtn">${t("Admin dashboard")}</button>` : ""}<button class="btn ghost" id="logoutBtn">${t("Log out")}</button></div>`,
    true,
  );
  $("#logoutBtn").onclick = async () => {
    await api("/api/auth/logout", { method: "POST" });
    state.user = null;
    state.favorites = [];
    saveFavorites();
    closeModal();
    toast(t("Logged out."));
  };
  $("#adminBtn")?.addEventListener("click", openAdmin);
  bindOrderExtras("");
  $$("input[id^='proof-'][type='file']").forEach((inp) => bindProofPicker(inp, $("#proofprev-" + inp.id.slice(6))));
  $$("[data-upload-proof]").forEach(
    (b) =>
      (b.onclick = async () => {
        const f = await proofFor($(`#proof-${b.dataset.uploadProof}`));
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
  if (!state.user || state.user.role !== "admin") { toast("Administrator access required."); return; }
  history.pushState({}, "", "/admin");
  await route();
  window.scrollTo(0, 0);
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
    b.classList.toggle("active", b.dataset.adminTab === tab),
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
// Revenue chart: one bar per day (per week for long ranges), empty days included, with a 7-day average line and hover details.
function revenueChartHTML(daily, days) {
  if (!daily.length) return `<small>No paid orders in this period.</small>`;
  const map = new Map(daily.map((x) => [x.date, x]));
  const end = new Date(), pts = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end.getTime() - i * 864e5), key = d.toISOString().slice(0, 10), x = map.get(key);
    pts.push({ date: key, revenue: x ? x.revenue : 0, orders: x ? x.orders : 0 });
  }
  let bars = pts, weekly = false;
  if (days > 90) {
    weekly = true; bars = [];
    for (let i = 0; i < pts.length; i += 7) {
      const g = pts.slice(i, i + 7);
      bars.push({ date: g[0].date + " – " + g[g.length - 1].date, label: g[0].date, revenue: g.reduce((a, b) => a + b.revenue, 0), orders: g.reduce((a, b) => a + b.orders, 0) });
    }
  }
  const W = 640, H = 210, L = 46, R = 8, T = 10, B = 24, n = bars.length, bw = (W - L - R) / n;
  const maxV = Math.max(1, ...bars.map((b) => b.revenue)),
    step = Math.pow(10, Math.floor(Math.log10(maxV))) * ([1, 2, 2.5, 5, 10].find((m) => (Math.pow(10, Math.floor(Math.log10(maxV))) * m * 4) >= maxV) || 10),
    top = step * 4, y = (v) => T + (H - T - B) * (1 - v / top);
  const compact = (v) => (v >= 1e6 ? (v / 1e6).toFixed(1).replace(/\.0$/, "") + "M" : v >= 1e3 ? (v / 1e3).toFixed(1).replace(/\.0$/, "") + "k" : String(Math.round(v)));
  const grid = [0, 1, 2, 3, 4].map((i) => `<line x1="${L}" x2="${W - R}" y1="${y(step * i)}" y2="${y(step * i)}" stroke="currentColor" stroke-opacity=".1"/><text x="${L - 6}" y="${y(step * i) + 3}" text-anchor="end" font-size="9" fill="currentColor" fill-opacity=".6">${compact(step * i)}</text>`).join("");
  const rects = bars.map((b, i) => `<g><rect x="${L + i * bw}" y="${T}" width="${bw}" height="${H - T - B}" fill="transparent"/><rect x="${(L + i * bw + bw * 0.12).toFixed(1)}" y="${y(b.revenue).toFixed(1)}" width="${Math.max(1, bw * 0.76).toFixed(1)}" height="${Math.max(b.revenue ? 2 : 0, H - B - y(b.revenue)).toFixed(1)}" rx="2" fill="var(--purple)" fill-opacity="${b.revenue ? 0.9 : 0}"/><title>${escapeHTML(b.date)}: ${money(b.revenue)} (${b.orders} order${b.orders === 1 ? "" : "s"})</title></g>`).join("");
  let line = "";
  if (!weekly && n >= 7) {
    const avg = bars.map((_, i) => bars.slice(Math.max(0, i - 6), i + 1).reduce((a, b) => a + b.revenue, 0) / Math.min(7, i + 1));
    line = `<polyline fill="none" stroke="var(--success)" stroke-width="2" stroke-linejoin="round" points="${avg.map((v, i) => `${(L + i * bw + bw / 2).toFixed(1)},${y(v).toFixed(1)}`).join(" ")}"/>`;
  }
  const every = Math.max(1, Math.ceil(n / 7)),
    ticks = bars.map((b, i) => (i % every === 0 ? `<text x="${(L + i * bw + bw / 2).toFixed(1)}" y="${H - 7}" text-anchor="middle" font-size="9" fill="currentColor" fill-opacity=".6">${escapeHTML((b.label || b.date).slice(5))}</text>` : "")).join("");
  const total = bars.reduce((a, b) => a + b.revenue, 0), orders = bars.reduce((a, b) => a + b.orders, 0), best = bars.reduce((a, b) => (b.revenue > a.revenue ? b : a), bars[0]);
  return `<div dir="ltr" style="margin-top:14px"><div style="display:flex;flex-wrap:wrap;gap:14px;font-size:12px;color:var(--muted);margin-bottom:6px"><span>${orders} paid orders</span><span>Avg per day ${money(total / days)}</span><span>Best ${weekly ? "week" : "day"}: ${escapeHTML((best.label || best.date).slice(0, 10))} (${money(best.revenue)})</span>${line ? `<span style="color:var(--success)">━ 7-day average</span>` : ""}</div><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Revenue per ${weekly ? "week" : "day"}" style="width:100%;height:auto;color:var(--text);display:block">${grid}${rects}${line}${ticks}</svg></div>`;
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
  <div class="admin-panel" style="margin-bottom:12px"><div class="panel-head"><h3>Email &amp; WhatsApp check</h3></div><div class="modal-body"><small>Sends a real test email and shows exactly what the provider answers.</small><div class="modal-actions" style="margin:8px 0"><input id="emailTestTo" type="email" placeholder="you@example.com" style="flex:1;min-width:180px"><button class="btn ghost" id="emailTestBtn">Send test email</button><button class="btn ghost" id="waTestBtn">Send WhatsApp alert test</button></div><pre id="emailTestOut" style="white-space:pre-wrap;font-size:12px;margin:0"></pre></div></div>
  <div class="admin-panel admin-quick-actions"><div class="panel-head"><div><h3>Quick actions</h3><small>Jump straight to the jobs you do most</small></div></div><div class="admin-quick-grid"><button type="button" data-admin-jump="queue"><span>01</span><b>Review payments</b><small>${d.review_queue || 0} awaiting proof review</small></button><button type="button" data-admin-jump="orders"><span>02</span><b>Find an order</b><small>Search any order and open its details</small></button><button type="button" data-admin-jump="products"><span>03</span><b>Manage products</b><small>Prices, images, stock and delivery</small></button><button type="button" data-admin-jump="merge"><span>04</span><b>Manage variations</b><small>Combine safely with preview and undo</small></button><button type="button" data-admin-jump="settings"><span>05</span><b>Storefront & campaigns</b><small>Edit bilingual homepage content</small></button></div></div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Checkout funnel · last ${r.days} days</h3></div><div class="modal-body"><div class="funnel"><div class="stat"><small>CHECKOUT STARTED</small><b>${f.started}</b></div><div class="stat"><small>CHECKOUT COMPLETED</small><b>${f.completed}</b></div><div class="stat"><small>COMPLETION RATE</small><b>${f.rate}%</b></div><div class="stat"><small>PAID ORDERS</small><b>${f.paid_orders}</b></div></div><small>Counts unique browsing sessions. "Started" = opened checkout; "completed" = placed an order.</small></div></div>
  <div class="admin-panel" style="margin-top:12px"><div class="panel-head"><h3>Revenue · last ${r.days} days</h3></div><div class="modal-body"><div class="line"><span>Cash revenue (paid orders)</span><b>${money(r.cash_revenue)}</b></div><div class="line"><span>Discounts given</span><b>${money(r.discounts_given)}</b></div><div class="line"><span>Store credit used</span><b>${moneyEGP(r.credit_used)}</b></div><div class="line"><span>Supplier cost</span><b>${money(r.total_cost)}</b></div><div class="line"><span>Estimated profit</span><b>${money(r.profit_estimate)}</b></div>${r.costs_incomplete ? `<small>Some products have no cost recorded, so profit is overstated. Add a supplier cost when importing codes, or a cost price on manual products.</small>` : ""}${revenueChartHTML(r.daily, r.days)}</div></div>
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
  $("#waTestBtn")?.addEventListener("click", async (e) => {
    const out = $("#emailTestOut"), btn = e.currentTarget;
    btn.disabled = true;
    out.textContent = "Sending WhatsApp test...";
    try {
      const r = await api("/api/admin/whatsapp-test", { method: "POST", body: "{}" });
      out.textContent = r.error ? `WhatsApp: ${r.error}` : `WhatsApp: ${r.ok ? "REQUEST ACCEPTED" : "FAILED"} (HTTP ${r.status})\n${r.detail || ""}\nCheck your phone.`;
    } catch (err) {
      out.textContent = "Request failed: " + err.message;
    } finally {
      btn.disabled = false;
    }
  });
  $("#emailTestBtn")?.addEventListener("click", async (e) => {
    const out = $("#emailTestOut"), btn = e.currentTarget;
    btn.disabled = true;
    out.textContent = "Sending...";
    try {
      const r = await api("/api/admin/email-test", { method: "POST", body: JSON.stringify({ to: $("#emailTestTo").value }) });
      const c = r.config || {};
      out.textContent =
        `Sender (EMAIL_FROM): ${c.email_from ? c.email_from_value : "NOT SET"}\n` +
        `Provider: ${c.provider}  (Resend key: ${c.resend_key ? "yes" : "no"})\n` +
        (r.error ? `Result: ${r.error}` : `Result: ${r.ok ? "SENT" : "FAILED"} (HTTP ${r.status})\n${r.detail || ""}`);
    } catch (err) {
      out.textContent = "Request failed: " + err.message;
    } finally {
      btn.disabled = false;
    }
  });
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
    <h3 style="margin:20px 0 8px">Support thread</h3><div class="thread" id="adminThread">${messages.map((m) => `<div class="msg ${m.sender === "customer" ? "customer" : ""}"><small>${m.sender === "customer" ? escapeHTML(name) : "You"} · ${escapeHTML(fmtTime(m.created_at))}</small>${escapeHTML(m.body)}</div>`).join("") || `<div class="empty small">No messages.</div>`}</div><form id="replyForm" class="thread-form"><textarea id="replyBody" maxlength="1000" placeholder="Reply to the customer (they also get an email if one is on file)"></textarea><div style="display:flex;flex-direction:column;gap:6px"><button class="btn primary">Send</button><button type="button" class="btn ghost" id="aiReply" title="Draft a reply with Gemini">✨ Draft</button></div></form>
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
  $("#aiReply").onclick = async (e) => {
    const b = e.currentTarget, box = $("#replyBody");
    b.disabled = true;
    b.textContent = "Thinking…";
    try {
      const r = await api("/api/admin/ai/reply", { method: "POST", body: JSON.stringify({ order_id: id }) });
      box.value = r.draft;
      box.focus();
      toast("Draft ready. Read it and edit before sending.");
    } catch (err) {
      toast(err.message);
    }
    b.disabled = false;
    b.textContent = "✨ Draft";
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
    `<div class="notice" style="margin-bottom:12px">Offers can apply to one product or category, to first orders only, or automatically when the cart reaches a quantity. Only the single best offer applies per order; offers never stack. The server enforces a hard maximum discount of 5% of the cart subtotal.</div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Code</th><th>Type</th><th>Amount</th><th>Rules</th><th>Used</th><th>Active</th><th>Expiry</th><th>Actions</th></tr></thead><tbody>${rows.map((d) => `<tr><td><b>${escapeHTML(d.code)}</b></td><td>${escapeHTML(d.type)}</td><td>${d.amount}${d.type === "percentage" ? "%" : ""}</td><td>${d.min_order ? "min " + money(d.min_order) + "<br>" : ""}<small>${escapeHTML(scope(d)) || "—"}</small></td><td>${d.used_count || 0}${d.max_uses != null ? ` / ${d.max_uses}` : ""}</td><td>${d.active ? "Yes" : "No"}</td><td>${escapeHTML(d.expires_at ? new Date(d.expires_at).toLocaleString() : "Never")}</td><td><button class="mini" data-edit-disc="${d.id}">Edit</button> <button class="mini danger" data-del-disc="${d.id}">Delete</button></td></tr>`).join("") || `<tr><td colspan="8" class="empty">No discounts.</td></tr>`}</tbody></table></div></div>`;
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
// Customer order-update push (separate subscription list on the server from the admin one).
const ORDER_PUSH_KEY = "kd_order_push";
const orderPushFlag = (v) => {
  try {
    if (v === undefined) return localStorage.getItem(ORDER_PUSH_KEY);
    if (v) localStorage.setItem(ORDER_PUSH_KEY, v);
    else localStorage.removeItem(ORDER_PUSH_KEY);
  } catch {}
  return null;
};
async function orderPushOn() {
  try {
    return Notification.permission === "granted" && !!(await pushSub()) && orderPushFlag() === String(state.user?.id);
  } catch {
    return false;
  }
}
async function enableOrderPush() {
  await enablePushPermissionAndSub((endpoint) => api("/api/me/push/subscribe", { method: "POST", body: JSON.stringify({ endpoint }) }));
  orderPushFlag(String(state.user.id));
}
async function disableOrderPush() {
  const sub = await pushSub();
  if (sub) await api("/api/me/push/unsubscribe", { method: "POST", body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => {});
  orderPushFlag(null);
  // The browser has one subscription per site; an admin may still be using it for store alerts.
  if (sub && state.user?.role !== "admin") await sub.unsubscribe();
}
async function enablePushPermissionAndSub(register) {
  if (!("serviceWorker" in navigator) || !("PushManager" in window))
    throw new Error("This browser does not support push notifications. On iPhone, install the app to your home screen first.");
  if ((await Notification.requestPermission()) !== "granted") throw new Error("Notifications were not allowed for this site.");
  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64uToU8(state.settings.vapid_public_key) });
  await register(sub.endpoint);
}
async function renderOrderPushBox() {
  const box = $("#orderPushBox");
  if (!box || !state.user || !state.settings.push_ready || !state.settings.vapid_public_key) return;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  const blocked = Notification.permission === "denied",
    on = !blocked && (await orderPushOn());
  box.innerHTML = `<div class="notice order-push"><div><b>${t("Order notifications")}</b><br><small>${blocked ? t("Notifications are blocked for this site in your browser settings.") : on ? t("Order updates are on for this device.") : t("Get a notification on this device when your order is paid or delivered.")}</small></div>${blocked ? "" : `<button type="button" class="btn ${on ? "ghost" : "primary"}" id="orderPushBtn">${on ? t("Turn off") : t("Turn on")}</button>`}</div>`;
  $("#orderPushBtn")?.addEventListener("click", async (e) => {
    e.currentTarget.disabled = true;
    try {
      if (on) await disableOrderPush();
      else await enableOrderPush();
    } catch (err) {
      toast(tr(err.message));
    }
    renderOrderPushBox();
  });
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
    `<div class="prod-tools" style="display:flex;flex-wrap:wrap;gap:8px;margin:0 0 12px"><button class="btn ghost" id="pExport" type="button">Export CSV</button><button class="btn ghost" id="pImport" type="button">Import CSV</button><button class="btn ghost" id="pTemplate" type="button">Download template</button><button class="btn ghost" id="pAiBulk" type="button">✨ AI fill missing</button><button class="btn ghost" id="pAiSeo" type="button">✨ AI SEO text</button></div><div id="bulkBar" class="notice" hidden style="position:sticky;top:8px;z-index:5;margin-bottom:10px;display:none;flex-wrap:wrap;gap:8px;align-items:center"></div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th style="width:28px"><input type="checkbox" id="bulkAll" aria-label="Select all"></th><th>Product</th><th>Price (editable)</th><th>Category</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows.map((p) => `<tr><td><input type="checkbox" class="bulkSel" value="${p.id}" aria-label="Select ${escapeHTML(p.name)}"></td><td><b>${escapeHTML(p.name)}</b><br><small>${escapeHTML(p.platform || "")} ${escapeHTML(p.region || "")}</small></td><td><input type="number" step="0.01" min="0" value="${p.price}" data-qprice="${p.id}" style="width:96px"></td><td>${escapeHTML(p.category_name || "Uncategorized")}</td><td>${p.delivery_type === "code" ? p.stock : "Manual"}</td><td>${p.active ? "Active" : "Hidden"}${p.featured ? " · Featured" : ""}</td><td><div class="table-actions"><button class="mini" data-edit-product="${p.id}">Edit</button><button class="mini" data-toggle-product="${p.id}" data-active="${p.active ? 0 : 1}">${p.active ? "Hide" : "Show"}</button><button class="mini danger" data-delete-product="${p.id}">Delete</button></div></td></tr>`).join("") || `<tr><td colspan="7" class="empty">No products.</td></tr>`}</tbody></table></div></div>`;
  $("#addProduct").onclick = () => productForm();
  $("#pExport").onclick = () => exportProductsCSV(rows);
  $("#pTemplate").onclick = downloadProductTemplate;
  $("#pImport").onclick = () => productImportModal(rows);
  $("#pAiBulk").onclick = () => aiBulkModal(rows);
  $("#pAiSeo").onclick = () => aiSeoBulk(rows);
  bindBulkEdit(rows);
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
          adminRerender();
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
          adminRerender();
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
    `<form id="productForm"><div class="notice" id="aiBox" style="margin-bottom:12px"><div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between"><div style="flex:1;min-width:200px"><b>✨ AI auto-fill</b><br><small id="aiStatus">Type the name (add an image if you have one), then Gemini fills the Arabic name, both descriptions, platform, region and category. Review before saving.</small></div><div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start"><button type="button" class="btn ghost" id="aiFill">Auto-fill with AI</button><label style="font-size:12px"><input type="checkbox" id="aiOverwrite"> Replace existing text</label></div></div></div><div class="form-grid"><div class="field"><label>Name</label><input id="pName" value="${escapeHTML(p?.name || "")}" required></div><div class="field"><label>${t("Name (Arabic)")}</label><input id="pNameAr" dir="rtl" value="${escapeHTML(p?.name_ar || "")}"></div><div class="field"><label>Slug</label><input id="pSlug" value="${escapeHTML(p?.slug || "")}"></div><div class="field"><label>Price (EGP)</label><input id="pPrice" type="number" step="0.01" value="${p?.price ?? ""}" required></div><div class="field"><label>Old price (EGP)</label><input id="pOld" type="number" step="0.01" value="${p?.old_price ?? ""}"></div><div class="field"><label>Category</label><select id="pCategory"><option value="">Uncategorized</option>${state.categories.map((c) => `<option value="${c.id}" ${p?.category_id == c.id ? "selected" : ""}>${escapeHTML(c.name)}</option>`).join("")}</select></div><div class="field"><label>Delivery</label><select id="pDelivery"><option value="manual" ${p?.delivery_type !== "code" ? "selected" : ""}>Manual</option><option value="code" ${p?.delivery_type === "code" ? "selected" : ""}>Digital code</option></select></div><div class="field"><label>Platform</label><input id="pPlatform" value="${escapeHTML(p?.platform || "")}" placeholder="PC, PlayStation..."></div><div class="field"><label>Region</label><input id="pRegion" value="${escapeHTML(p?.region || "")}" placeholder="EG, Global..."></div><div class="field"><label>Low-stock alert at (codes left, empty = default)</label><input id="pLow" type="number" min="0" value="${p?.low_stock_threshold ?? ""}"></div><div class="field"><label>Cost price (manual products, for profit)</label><input id="pCost" type="number" step="0.01" min="0" value="${p?.cost_price ?? ""}"></div></div><div class="field"><label>Image URL</label><input id="pImage" value="${escapeHTML(p?.image_url || "")}" placeholder="https://..."></div><div class="field"><label>${t("Image upload")}</label><input id="pImageFile" type="file" accept="image/*"></div><div class="field" id="galBox"><label>Gallery images <small>(extra photos shown after the cover, up to 8)</small></label><div class="gal-admin" id="galList"></div><div style="display:flex;flex-wrap:wrap;gap:8px"><input id="galUrl" placeholder="https://... image link" style="flex:1;min-width:180px"><button type="button" class="btn ghost" id="galAddUrl">Add link</button><button type="button" class="btn ghost" id="galAddFile">Upload images</button><input id="galFiles" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple hidden></div><small id="galNote" style="display:block;margin-top:6px"></small></div><div class="notice" id="imgAiBox" style="margin-bottom:12px"><div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between"><div style="flex:1;min-width:200px"><b>✨ Clean up image</b><br><small id="imgAiStatus">Turns a messy screenshot into a clean cover on your standard background. You see the result first and nothing changes until you press Save product.</small></div><div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start"><button type="button" class="btn ghost" id="imgAiGo">Clean up with AI</button>${p?.image_original ? `<button type="button" class="btn ghost" id="imgRestore">Restore original image</button>` : ""}</div></div><div id="imgAiPreview" style="margin-top:10px" hidden></div></div><div class="form-grid"><div class="field"><label>Description</label><textarea id="pDescription">${escapeHTML(p?.description || "")}</textarea></div><div class="field"><label>${t("Description (Arabic)")}</label><textarea id="pDescriptionAr" dir="rtl">${escapeHTML(p?.description_ar || "")}</textarea></div></div><details style="margin-top:12px" ${p?.meta_title || p?.meta_description || p?.seo_keywords ? "open" : ""}><summary><b>Search / SEO text</b></summary><div class="notice" style="margin:10px 0"><div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between"><div style="flex:1;min-width:200px"><small id="seoStatus">Written for Google: a title (about 60 characters), a description (about 155) and search keywords, in Arabic and English. Empty fields fall back to the product name and description.</small></div><div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start"><button type="button" class="btn ghost" id="seoGo">✨ Write SEO text</button><label style="font-size:12px"><input type="checkbox" id="seoOver"> Replace existing</label></div></div></div><div class="form-grid"><div class="field"><label>Meta title <small id="cMt"></small></label><input id="pMetaTitle" maxlength="70" value="${escapeHTML(p?.meta_title || "")}"></div><div class="field"><label>Meta title (Arabic) <small id="cMtA"></small></label><input id="pMetaTitleAr" dir="rtl" maxlength="70" value="${escapeHTML(p?.meta_title_ar || "")}"></div><div class="field"><label>Meta description <small id="cMd"></small></label><textarea id="pMetaDesc" maxlength="170">${escapeHTML(p?.meta_description || "")}</textarea></div><div class="field"><label>Meta description (Arabic) <small id="cMdA"></small></label><textarea id="pMetaDescAr" dir="rtl" maxlength="170">${escapeHTML(p?.meta_description_ar || "")}</textarea></div><div class="field"><label>Search keywords</label><input id="pKeywords" maxlength="220" value="${escapeHTML(p?.seo_keywords || "")}" placeholder="comma, separated"></div><div class="field"><label>Search keywords (Arabic)</label><input id="pKeywordsAr" dir="rtl" maxlength="220" value="${escapeHTML(p?.seo_keywords_ar || "")}" placeholder="كلمة، كلمة"></div></div></details><details open style="margin-top:12px"><summary><b>${t("Variants / denominations")}</b></summary><div id="variantRows" style="margin-top:10px">${vars.map((v) => `<div class="form-grid variant-row" data-variant-id="${v.id}"><input class="vName" value="${escapeHTML(v.name)}" placeholder="${t("Option name")}"><input class="vPrice" type="number" step="0.01" value="${v.price}" placeholder="Price"><input class="vOld" type="number" step="0.01" value="${v.old_price ?? ""}" placeholder="Old price"><label><input class="vActive" type="checkbox" ${v.active ? "checked" : ""}> Active</label><button type="button" class="mini danger vRemove">Remove</button></div>`).join("")}</div><button type="button" class="mini" id="addVariantRow" style="margin-top:8px">${t("Add")}</button><small style="display:block;margin-top:6px">For digital products, add codes to each option from Digital codes.</small></details><div class="form-grid" style="margin-top:12px"><label><input id="pActive" type="checkbox" ${p?.active !== 0 ? "checked" : ""}> Active</label><label><input id="pFeatured" type="checkbox" ${p?.featured ? "checked" : ""}> Featured</label></div><div class="modal-actions"><button type="button" class="btn ghost" id="cancelP">Cancel</button><button class="btn primary">Save product</button></div></form>`,
  );
  $("#cancelP").onclick = () => { closeModal(); state.adminOpen = true; };
  $("#aiFill").onclick = () => aiFillProductForm();
  $("#seoGo").onclick = () => aiSeoProductForm();
  $("#imgAiGo").onclick = () => aiImageProductForm(p);
  $("#imgRestore")?.addEventListener("click", async () => {
    if (!confirm("Put the original image back for this product?")) return;
    try {
      const r = await api(`/api/admin/products/${p.id}/restore-image`, { method: "POST" });
      $("#pImage").value = r.image_url;
      $("#imgRestore").remove();
      $("#imgAiStatus").textContent = "Original image restored.";
      refreshStore();
    } catch (e) {
      toast(e.message);
    }
  });
  $("#pImageFile").addEventListener("change", () => delete $("#pImageFile").dataset.ai);
  // Gallery editor: items are { url } (already stored or an external link) or { file, preview } (uploaded when the product is saved).
  const GAL_MAX = 8;
  const gal = (p?.gallery || []).map((url) => ({ url }));
  const drawGal = () => {
    $("#galList").innerHTML = gal.map((g, i) => `<div class="gal-item" data-i="${i}"><img src="${escapeHTML(g.url || g.preview)}" alt=""><div class="gal-bar"><button type="button" data-gal="left" ${i === 0 ? "disabled" : ""} aria-label="Move earlier">←</button><button type="button" data-gal="right" ${i === gal.length - 1 ? "disabled" : ""} aria-label="Move later">→</button><button type="button" data-gal="del" aria-label="Remove">✕</button></div></div>`).join("");
    $("#galNote").textContent = `${gal.length}/${GAL_MAX} extra images${gal.some((g) => g.file) ? ". New uploads are stored when you press Save product." : ""}`;
  };
  $("#galList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-gal]");
    if (!b) return;
    const i = Number(b.closest(".gal-item").dataset.i), act = b.dataset.gal;
    if (act === "del") { const [r] = gal.splice(i, 1); if (r?.preview) URL.revokeObjectURL(r.preview); }
    else { const j = act === "left" ? i - 1 : i + 1; if (j >= 0 && j < gal.length) [gal[i], gal[j]] = [gal[j], gal[i]]; }
    drawGal();
  });
  $("#galAddUrl").onclick = () => {
    const u = $("#galUrl").value.trim();
    if (!u) return;
    if (!/^https?:\/\//i.test(u) && !/^\/media\/product\//.test(u)) return toast("Use a full https:// image link.");
    if (gal.length >= GAL_MAX) return toast(`Up to ${GAL_MAX} extra images.`);
    gal.push({ url: u });
    $("#galUrl").value = "";
    drawGal();
  };
  $("#galAddFile").onclick = () => $("#galFiles").click();
  $("#galFiles").addEventListener("change", () => {
    for (const f of [...$("#galFiles").files]) {
      if (gal.length >= GAL_MAX) { toast(`Up to ${GAL_MAX} extra images.`); break; }
      if (!/^image\/(jpeg|png|webp|gif)$/i.test(f.type)) { toast(`${f.name}: use a JPG, PNG, WEBP or GIF.`); continue; }
      if (f.size > 8 * 1024 * 1024) { toast(`${f.name} is over 8 MB.`); continue; }
      gal.push({ file: f, preview: URL.createObjectURL(f) });
    }
    $("#galFiles").value = "";
    drawGal();
  });
  drawGal();
  for (const [inp, out, max] of [["#pMetaTitle", "#cMt", 60], ["#pMetaTitleAr", "#cMtA", 60], ["#pMetaDesc", "#cMd", 155], ["#pMetaDescAr", "#cMdA", 155]]) {
    const draw = () => { const n = $(inp).value.length; $(out).textContent = `(${n}/${max})`; $(out).style.color = n > max ? "#c0392b" : ""; };
    $(inp).addEventListener("input", draw);
    draw();
  }
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
      meta_title: $("#pMetaTitle").value,
      meta_title_ar: $("#pMetaTitleAr").value,
      meta_description: $("#pMetaDesc").value,
      meta_description_ar: $("#pMetaDescAr").value,
      seo_keywords: $("#pKeywords").value,
      seo_keywords_ar: $("#pKeywordsAr").value,
      active: $("#pActive").checked,
      featured: $("#pFeatured").checked,
      gallery: gal.filter((g) => g.url).map((g) => g.url),
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
      if (file) await uploadAdminImage(id, file, $("#pImageFile").dataset.ai === "1");
      if (gal.some((g) => g.file)) {
        for (const g of gal) if (g.file) { g.url = (await uploadAdminImage(id, g.file, false, true)).image_url; }
        await api(`/api/admin/products/${id}/gallery`, { method: "PUT", body: JSON.stringify({ gallery: gal.map((g) => g.url) }) });
      }
      gal.forEach((g) => g.preview && URL.revokeObjectURL(g.preview));
      toast("Product saved.");
      closeModal();
      state.adminOpen = true;
      await adminRerender();
      refreshStore();
    } catch (err) {
      toast(err.message);
    }
  };
}
// Re-draw the current admin tab without jumping to the top: keep the page height while it reloads, then restore the scroll position.
async function adminRerender() {
  const main = $("#adminMain");
  if (!main) return openAdmin();
  const y = window.scrollY;
  main.style.minHeight = main.offsetHeight + "px";
  try {
    await renderAdminTab();
  } finally {
    main.style.minHeight = "";
    window.scrollTo(0, y);
  }
}
function closeAdminModal() {
  closeModal();
  state.adminOpen = true;
}
// ---- Products: CSV export / import ----
const PRODUCT_CSV_COLS = ["id", "slug", "name", "name_ar", "description", "description_ar", "price", "old_price", "category", "platform", "region", "delivery_type", "active", "featured", "low_stock_threshold", "cost_price", "image_url", "options"];
const PRODUCT_CSV_ALIASES = {
  product: "name", title: "name", english_name: "name", arabic_name: "name_ar", name_arabic: "name_ar",
  desc: "description", english_description: "description", arabic_description: "description_ar", description_arabic: "description_ar",
  oldprice: "old_price", compare_price: "old_price", image: "image_url", img: "image_url", photo: "image_url",
  category_name: "category", delivery: "delivery_type", cost: "cost_price", low_stock: "low_stock_threshold",
  variants: "options", option: "options", denominations: "options",
};
function csvEsc(v) {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s) && !/^-?\d+(\.\d+)?$/.test(s)) s = "'" + s; // stops spreadsheet formulas; removed again on import
  return /[",;\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function downloadTextFile(name, text) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" }));
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
const optionsText = (vars) => (vars || []).map((v) => `${v.name}:${v.price}${v.old_price != null && v.old_price !== "" ? ":" + v.old_price : ""}`).join(" | ");
function exportProductsCSV(rows) {
  const line = (p) => [p.id, p.slug, p.name, p.name_ar, p.description, p.description_ar, p.price, p.old_price, p.category_name, p.platform, p.region, p.delivery_type, p.active ? 1 : 0, p.featured ? 1 : 0, p.low_stock_threshold, p.cost_price, p.image_url, optionsText(p.variants)].map(csvEsc).join(",");
  downloadTextFile(`kardivo-products-${new Date().toISOString().slice(0, 10)}.csv`, [PRODUCT_CSV_COLS.join(",")].concat(rows.map(line)).join("\r\n"));
  toast(`Exported ${rows.length} products.`);
}
function downloadProductTemplate() {
  const ex = [
    ["", "", "PlayStation Plus Essential 1 Month", "بلايستيشن بلس إسنشيال شهر", "Monthly PlayStation Plus subscription code.", "كود اشتراك بلايستيشن بلس لمدة شهر.", 450, 500, "Subscriptions", "PlayStation", "Global", "code", 1, 0, "", "", "https://example.com/psplus.jpg", ""],
    ["", "", "PSN Gift Card", "", "", "", 500, "", "Gift Cards", "PlayStation", "US", "code", 1, 1, "", "", "", "10 USD:520 | 25 USD:1280:1350 | 50 USD:2550"],
  ];
  downloadTextFile("kardivo-products-template.csv", [PRODUCT_CSV_COLS.join(",")].concat(ex.map((r) => r.map(csvEsc).join(","))).join("\r\n"));
}
function csvToProductRecords(text) {
  const grid = parseCSV(text);
  if (grid.length < 2) return { records: [], cols: [], ignored: [] };
  const keys = grid[0].map((h) => {
    const k = h.trim().toLowerCase().replace(/[\s-]+/g, "_");
    return PRODUCT_CSV_COLS.includes(k) ? k : PRODUCT_CSV_ALIASES[k] || "";
  });
  const ignored = grid[0].filter((h, i) => h.trim() && !keys[i]);
  const records = grid.slice(1).map((r, n) => {
    const o = { _line: n + 2 };
    keys.forEach((k, i) => {
      if (k && o[k] === undefined) o[k] = String(r[i] ?? "").trim().replace(/^'(?=[=+\-@])/, "");
    });
    return o;
  });
  return { records: records.filter((o) => Object.keys(o).some((k) => k !== "_line" && o[k])), cols: [...new Set(keys.filter(Boolean))], ignored };
}
function productImportModal(existing) {
  openModal(
    "Import products from CSV",
    `<div id="impBody"><p style="margin:0 0 8px">Use a file exported from here (or the template). Products are matched by <b>id</b>, then <b>slug</b>, then the name; matches are updated, everything else is added. <b>Blank cells never erase existing data.</b></p><div class="field"><label>CSV file</label><input id="impFile" type="file" accept=".csv,.txt,text/csv,text/plain"></div><div id="impPreview"></div><div class="modal-actions"><button type="button" class="btn ghost" id="impCancel">Cancel</button><button type="button" class="btn primary" id="impGo" disabled>Import</button></div></div>`,
    true,
  );
  $("#impCancel").onclick = closeAdminModal;
  let records = [];
  const slugs = new Map(existing.map((p) => [p.slug, p])),
    ids = new Map(existing.map((p) => [String(p.id), p]));
  const matchOf = (r) => ids.get(String(r.id || "")) || slugs.get(slugifyClient(r.slug || "")) || (!r.slug && r.name ? slugs.get(slugifyClient(r.name)) : null);
  $("#impFile").onchange = async (e) => {
    const f = e.target.files?.[0],
      box = $("#impPreview"),
      go = $("#impGo");
    go.disabled = true;
    records = [];
    if (!f) return (box.innerHTML = "");
    let parsed;
    try {
      parsed = csvToProductRecords(await f.text());
    } catch {
      return (box.innerHTML = `<div class="notice danger-text">Could not read that file.</div>`);
    }
    records = parsed.records;
    if (!records.length || !parsed.cols.includes("name") && !parsed.cols.includes("id") && !parsed.cols.includes("slug"))
      return (box.innerHTML = `<div class="notice danger-text">No products found. The first row must be column titles (at least <code>name</code> and <code>price</code>). Download the template to see the format.</div>`);
    const upd = records.filter(matchOf).length,
      add = records.length - upd,
      miss = records.filter((r) => !matchOf(r) && (!r.name || !r.price)).length;
    box.innerHTML = `<div class="notice" style="margin:10px 0"><b>${records.length}</b> rows: <b>${add}</b> new, <b>${upd}</b> updated${miss ? `, <b class="danger-text">${miss}</b> new rows are missing a name or price and will be skipped` : ""}.<br><small>Columns used: ${parsed.cols.map(escapeHTML).join(", ")}.${parsed.ignored.length ? ` Ignored: ${parsed.ignored.map(escapeHTML).join(", ")}.` : ""}</small></div><div class="table-wrap"><table class="admin-table"><thead><tr><th>Row</th><th>Name</th><th>Price</th><th>Category</th><th>Action</th></tr></thead><tbody>${records.slice(0, 8).map((r) => `<tr><td>${r._line}</td><td>${escapeHTML(r.name || matchOf(r)?.name || "")}</td><td>${escapeHTML(r.price || "")}</td><td>${escapeHTML(r.category || "")}</td><td>${matchOf(r) ? "Update" : "New"}</td></tr>`).join("")}</tbody></table></div>${records.length > 8 ? `<small>…and ${records.length - 8} more rows.</small>` : ""}`;
    go.disabled = false;
  };
  $("#impGo").onclick = async () => {
    const go = $("#impGo"),
      box = $("#impPreview");
    go.disabled = true;
    $("#impFile").disabled = true;
    const chunks = [];
    let cur = [],
      weight = 0;
    for (const r of records) {
      const w = 1 + (r.options ? r.options.split("|").length : 0);
      if (cur.length && (cur.length >= 20 || weight + w > 25)) (chunks.push(cur), (cur = []), (weight = 0));
      cur.push(r);
      weight += w;
    }
    if (cur.length) chunks.push(cur);
    const all = [];
    let done = 0,
      stopped = "";
    for (const ch of chunks) {
      box.innerHTML = `<div class="notice" style="margin:10px 0">Importing… ${done} of ${records.length}</div>`;
      try {
        const r = await api("/api/admin/products/import", { method: "POST", body: JSON.stringify({ rows: ch }) });
        all.push(...r.results);
      } catch (err) {
        stopped = `${err.message} Rows ${ch[0]._line} to ${records[records.length - 1]._line} were not imported.`;
        break;
      }
      done += ch.length;
    }
    const made = all.filter((r) => r.status === "created").length,
      upd = all.filter((r) => r.status === "updated").length,
      errs = all.filter((r) => r.status === "error");
    box.innerHTML = `<div class="notice" style="margin:10px 0"><b>${made}</b> added, <b>${upd}</b> updated${errs.length ? `, <b class="danger-text">${errs.length}</b> skipped` : ""}.${stopped ? `<br><span class="danger-text">${escapeHTML(stopped)}</span>` : ""}</div>${errs.length ? `<div class="table-wrap"><table class="admin-table"><thead><tr><th>Row</th><th>Name</th><th>Problem</th></tr></thead><tbody>${errs.map((r) => `<tr><td>${r.line}</td><td>${escapeHTML(r.name || "")}</td><td>${escapeHTML(r.error)}</td></tr>`).join("")}</tbody></table></div>` : ""}`;
    go.textContent = "Done";
    go.disabled = false;
    $("#impCancel").hidden = true;
    go.onclick = async () => {
      closeAdminModal();
      await adminRerender();
    };
    refreshStore();
  };
}
// ---- Products: select several and change them together ----
function bindBulkEdit(rows) {
  const bar = $("#bulkBar"), boxes = () => $$(".bulkSel"), picked = () => boxes().filter((b) => b.checked).map((b) => Number(b.value));
  const draw = () => {
    const ids = picked();
    $("#bulkAll").checked = ids.length > 0 && ids.length === boxes().length;
    if (!ids.length) { bar.hidden = true; bar.style.display = "none"; return; }
    bar.hidden = false; bar.style.display = "flex";
    bar.innerHTML = `<b>${ids.length} selected</b><select id="bkCat"><option value="">Set category…</option>${state.categories.map((c) => `<option value="${c.id}">${escapeHTML(c.name)}</option>`).join("")}</select><button type="button" class="mini" data-bk="show">Show</button><button type="button" class="mini" data-bk="hide">Hide</button><button type="button" class="mini" data-bk="feature">Feature</button><button type="button" class="mini" data-bk="unfeature">Unfeature</button><button type="button" class="mini" data-bk="aiimg">✨ Clean images</button><span style="display:inline-flex;gap:4px;align-items:center">Price <input id="bkPct" type="number" step="0.1" placeholder="±%" style="width:70px"><button type="button" class="mini" data-bk="pct">Apply %</button></span><button type="button" class="mini" data-bk="clear">Clear</button>`;
  };
  $("#bulkAll").onchange = (e) => { boxes().forEach((b) => (b.checked = e.target.checked)); draw(); };
  $("#adminMain").onchange = (e) => {
    if (e.target.classList.contains("bulkSel")) draw();
    if (e.target.id === "bkCat" && e.target.value) run("cat", e.target.value);
  };
  $("#adminMain").onclick = (e) => { const b = e.target.closest("[data-bk]"); if (b) run(b.dataset.bk); };
  async function run(kind, val) {
    const ids = picked();
    if (!ids.length) return;
    if (kind === "clear") { boxes().forEach((b) => (b.checked = false)); return draw(); }
    if (kind === "aiimg") return aiImageBulk(ids, rows);
    let pct = 0;
    if (kind === "pct") {
      pct = Number($("#bkPct").value);
      if (!pct || pct < -90 || pct > 500) return toast("Enter a percentage between -90 and 500.");
      if (!confirm(`Change the price of ${ids.length} products by ${pct > 0 ? "+" : ""}${pct}%? Options (variants) are not changed.`)) return;
    } else if (!confirm(`Apply to ${ids.length} selected products?`)) { draw(); return; }
    let ok = 0, bad = 0;
    for (const id of ids) {
      const p = rows.find((x) => x.id === id), body = { ...p };
      if (kind === "show") body.active = true;
      else if (kind === "hide") body.active = false;
      else if (kind === "feature") body.featured = true;
      else if (kind === "unfeature") body.featured = false;
      else if (kind === "cat") body.category_id = Number(val);
      else if (kind === "pct") body.price = Math.max(0, Math.round(p.price * (1 + pct / 100) * 100) / 100);
      if (kind === "pct" && p.old_price != null && p.old_price !== "") body.old_price = Math.max(0, Math.round(p.old_price * (1 + pct / 100) * 100) / 100);
      try { await api("/api/admin/products/" + id, { method: "PUT", body: JSON.stringify(body) }); ok++; } catch { bad++; }
    }
    toast(`${ok} products updated${bad ? `, ${bad} failed` : ""}.`);
    await adminRerender();
    refreshStore();
  }
}
// ---- Bulk AI fill: every product missing its Arabic name or a description ----
const aiMissing = (p) => !String(p.name_ar || "").trim() || !String(p.description || "").trim() || !String(p.description_ar || "").trim();
function aiBulkModal(rows) {
  const todo = rows.filter(aiMissing);
  openModal(
    "AI fill missing product text",
    `<div id="bulkBody"><p style="margin:0 0 8px"><b>${todo.length}</b> of ${rows.length} products are missing an Arabic name, a description or an Arabic description.</p><p style="margin:0 0 8px">For each one Gemini looks the product up and fills <b>only the empty fields</b> (Arabic name, descriptions, platform, region, category). Text you already wrote is never touched, and names and prices are never changed. It runs one product at a time, so keep this window open. Review a few results afterwards: AI can be wrong about niche products.</p><div id="bulkProg" class="notice" ${todo.length ? "hidden" : ""} style="margin:10px 0"></div><div id="bulkLog" style="max-height:220px;overflow:auto;font-size:13px"></div><div class="modal-actions"><button type="button" class="btn ghost" id="bulkCancel">Close</button><button type="button" class="btn primary" id="bulkGo" ${todo.length ? "" : "disabled"}>Fill ${todo.length} products</button></div></div>`,
    true,
  );
  let stop = false,
    running = false;
  $("#bulkCancel").onclick = async () => {
    stop = true;
    closeAdminModal();
    if (running || $("#bulkGo")?.dataset.ran) await adminRerender();
  };
  $("#bulkGo").onclick = async () => {
    const go = $("#bulkGo"),
      prog = $("#bulkProg"),
      log = $("#bulkLog");
    if (running) {
      stop = true;
      go.disabled = true;
      go.textContent = "Stopping…";
      return;
    }
    running = true;
    go.dataset.ran = "1";
    go.textContent = "Stop";
    prog.hidden = false;
    const cats = state.categories.map((c) => c.name),
      add = (msg, bad) => log.insertAdjacentHTML("beforeend", `<div class="${bad ? "danger-text" : ""}">${escapeHTML(msg)}</div>`);
    let ok = 0,
      fail = 0,
      i = 0,
      fatal = "";
    for (const p of todo) {
      if (stop) break;
      prog.textContent = `Working… ${i} of ${todo.length} done (${ok} filled, ${fail} failed)`;
      i++;
      let r = null;
      for (let attempt = 0; attempt < 2 && !r; attempt++) {
        try {
          r = await api("/api/admin/ai/product", {
            method: "POST",
            body: JSON.stringify({ name: p.name, name_ar: p.name_ar, description: p.description, platform: p.platform, region: p.region, category: p.category_name || "", image_url: p.image_url || "", categories: cats }),
          });
        } catch (e) {
          if (/rate limit|too many/i.test(e.message) && attempt === 0) {
            prog.textContent = "Gemini rate limit reached. Waiting 40 seconds, then continuing…";
            await new Promise((res) => setTimeout(res, 40000));
          } else if (/api key|Add your Gemini/i.test(e.message)) {
            fatal = e.message;
            break;
          } else {
            add(`${p.name}: ${e.message}`, true);
            break;
          }
        }
      }
      if (fatal) break;
      if (!r) {
        fail++;
        continue;
      }
      const f = r.fields,
        body = { ...p },
        got = [];
      const fillIf = (k, v, label) => {
        if (v && !String(p[k] || "").trim()) (body[k] = v, got.push(label));
      };
      fillIf("name_ar", f.name_ar, "Arabic name");
      fillIf("description", f.description, "description");
      fillIf("description_ar", f.description_ar, "Arabic description");
      fillIf("platform", f.platform, "platform");
      fillIf("region", f.region, "region");
      if (f.category && !p.category_id) {
        const c = state.categories.find((x) => x.name.toLowerCase() === f.category.toLowerCase());
        if (c) (body.category_id = c.id, got.push("category"));
      }
      if (!got.length) {
        add(`${p.name}: nothing new to fill`);
        continue;
      }
      try {
        await api("/api/admin/products/" + p.id, { method: "PUT", body: JSON.stringify(body) });
        Object.assign(p, body);
        ok++;
        add(`${p.name}: ${got.join(", ")}${r.searched ? "" : " (no web search, check it)"}`);
      } catch (e) {
        fail++;
        add(`${p.name}: could not save (${e.message})`, true);
      }
      await new Promise((res) => setTimeout(res, 800));
    }
    running = false;
    prog.innerHTML = `${fatal ? `<span class="danger-text">${escapeHTML(fatal)}</span><br>` : ""}${stop && !fatal ? "Stopped. " : fatal ? "" : "Finished. "}<b>${ok}</b> products filled${fail ? `, <b class="danger-text">${fail}</b> failed` : ""}.`;
    go.hidden = true;
    $("#bulkCancel").textContent = "Done";
    refreshStore();
  };
}
// ---- Product form: Gemini auto-fill ----
async function aiImagePayload(file) {
  try {
    const img = await decodeImage(file),
      w0 = img.naturalWidth || img.width,
      h0 = img.naturalHeight || img.height,
      k = Math.min(1, 1024 / Math.max(w0, h0)),
      c = document.createElement("canvas");
    c.width = Math.round(w0 * k);
    c.height = Math.round(h0 * k);
    const g = c.getContext("2d");
    g.fillStyle = "#fff";
    g.fillRect(0, 0, c.width, c.height);
    g.drawImage(img, 0, 0, c.width, c.height);
    img.close?.();
    return { image_data: c.toDataURL("image/jpeg", 0.8).split(",")[1], image_mime: "image/jpeg" };
  } catch {
    return {};
  }
}
async function aiFillProductForm() {
  const btn = $("#aiFill"),
    st = $("#aiStatus"),
    over = $("#aiOverwrite").checked,
    v = (sel) => $(sel).value.trim(),
    file = $("#pImageFile")?.files?.[0],
    catSel = $("#pCategory");
  if (!v("#pName") && !v("#pImage") && !file) {
    st.textContent = "Type a product name or add an image first.";
    return;
  }
  const payload = {
    name: v("#pName"),
    image_url: v("#pImage"),
    categories: state.categories.map((c) => c.name),
    ...(over ? {} : { name_ar: v("#pNameAr"), description: v("#pDescription"), platform: v("#pPlatform"), region: v("#pRegion"), category: catSel.value ? catSel.selectedOptions[0].textContent.trim() : "" }),
  };
  btn.disabled = true;
  st.textContent = "Asking Gemini… this usually takes 10 to 30 seconds.";
  try {
    if (file) Object.assign(payload, await aiImagePayload(file));
    const r = await api("/api/admin/ai/product", { method: "POST", body: JSON.stringify(payload) }),
      f = r.fields,
      filled = [];
    const put = (sel, val, label, force) => {
      const el = $(sel);
      if (!el || !val || (el.value.trim() && !(over && !force))) return;
      el.value = val;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      filled.push(label);
    };
    put("#pName", f.name, "name", true);
    put("#pNameAr", f.name_ar, "Arabic name");
    put("#pDescription", f.description, "description");
    put("#pDescriptionAr", f.description_ar, "Arabic description");
    put("#pPlatform", f.platform, "platform");
    put("#pRegion", f.region, "region");
    if (f.category && (!catSel.value || over)) {
      const o = [...catSel.options].find((x) => x.textContent.trim().toLowerCase() === f.category.toLowerCase());
      if (o && catSel.value !== o.value) {
        catSel.value = o.value;
        filled.push("category");
      }
    }
    const src = (r.sources || []).filter((s) => /^https?:\/\//.test(s.uri)).map((s) => `<a href="${escapeHTML(s.uri)}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.title || "source")}</a>`).join(", ");
    st.innerHTML = `${filled.length ? `Filled: ${filled.join(", ")}. Check it, then press Save.` : "Nothing to fill: those fields already have text. Tick “Replace existing text” to overwrite."} ${r.searched ? "Checked against Google Search." : "<b>Google Search was not available, so this comes from the model alone. Double-check it.</b>"}${r.image_used ? "" : " (No image was used.)"}${src ? `<br>Sources: ${src}` : ""}`;
  } catch (e) {
    st.textContent = e.message;
  } finally {
    btn.disabled = false;
  }
}
// ---- AI SEO text + image cleanup ----
const b64ToFile = (b64, mime, name) => {
  const bin = atob(b64), u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return new File([u8], name, { type: mime });
};
async function aiSeoProductForm() {
  const btn = $("#seoGo"), st = $("#seoStatus"), over = $("#seoOver").checked, v = (sel) => $(sel).value.trim(), catSel = $("#pCategory");
  if (!v("#pName")) { st.textContent = "Type the product name first."; return; }
  btn.disabled = true;
  st.textContent = "Asking Gemini…";
  try {
    const r = await api("/api/admin/ai/seo", {
        method: "POST",
        body: JSON.stringify({ name: v("#pName"), name_ar: v("#pNameAr"), description: v("#pDescription"), description_ar: v("#pDescriptionAr"), platform: v("#pPlatform"), region: v("#pRegion"), category: catSel.value ? catSel.selectedOptions[0].textContent.trim() : "" }),
      }),
      map = { meta_title: "#pMetaTitle", meta_title_ar: "#pMetaTitleAr", meta_description: "#pMetaDesc", meta_description_ar: "#pMetaDescAr", seo_keywords: "#pKeywords", seo_keywords_ar: "#pKeywordsAr" };
    let n = 0;
    for (const [k, sel] of Object.entries(map)) {
      const el = $(sel);
      if (!el || !r.fields[k] || (el.value.trim() && !over)) continue;
      el.value = r.fields[k];
      el.dispatchEvent(new Event("input", { bubbles: true }));
      n++;
    }
    st.textContent = n ? `Filled ${n} field${n > 1 ? "s" : ""}. Read them, then press Save product.` : "Nothing to fill: those fields already have text. Tick “Replace existing” to overwrite.";
  } catch (e) {
    st.textContent = e.message;
  } finally {
    btn.disabled = false;
  }
}
async function aiImageProductForm(p) {
  const btn = $("#imgAiGo"), st = $("#imgAiStatus"), box = $("#imgAiPreview"), file = $("#pImageFile")?.files?.[0], url = $("#pImage").value.trim();
  if (!file && !url) { st.textContent = "Add an image first: upload a file or fill the Image URL."; return; }
  btn.disabled = true;
  box.hidden = true;
  st.textContent = "Cleaning up the image… this usually takes 15 to 60 seconds.";
  try {
    const payload = { name: $("#pName").value.trim() };
    if (file) Object.assign(payload, await aiImagePayload(file));
    if (!payload.image_data) payload.image_url = url;
    if (!payload.image_data && !payload.image_url) throw new Error("That image could not be read. Try a JPG or PNG.");
    const r = await api("/api/admin/ai/image", { method: "POST", body: JSON.stringify(payload) }),
      src = `data:${r.mime};base64,${r.image_data}`;
    box.hidden = false;
    box.innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start"><img alt="AI cover preview" src="${src}" style="width:200px;max-width:100%;border-radius:10px;border:1px solid var(--line,#ddd)"><div style="display:flex;flex-direction:column;gap:6px"><button type="button" class="btn primary" id="imgUse">Use this image</button><button type="button" class="btn ghost" id="imgAgain">Try again</button><button type="button" class="btn ghost" id="imgDiscard">Discard</button><small>Check that the logo and text are exactly right before using it.</small></div></div>`;
    st.textContent = "Done. Compare it with your original, then choose.";
    $("#imgUse").onclick = () => {
      const f = b64ToFile(r.image_data, r.mime, `cover.${r.mime.includes("jpeg") ? "jpg" : r.mime.split("/")[1]}`),
        dt = new DataTransfer(),
        inp = $("#pImageFile");
      dt.items.add(f);
      inp.files = dt.files;
      inp.dataset.ai = "1";
      box.hidden = true;
      st.textContent = "Image selected. It is saved when you press Save product" + (p?.image_original || !p ? "." : "; the old one is kept so you can restore it.");
    };
    $("#imgAgain").onclick = () => aiImageProductForm(p);
    $("#imgDiscard").onclick = () => { box.hidden = true; st.textContent = "Discarded. Nothing was changed."; };
  } catch (e) {
    st.textContent = e.message;
  } finally {
    btn.disabled = false;
  }
}
// One-at-a-time runner for the bulk AI tools: stop button, rate-limit wait + retry, per-item log.
function aiBulkRunner({ title, intro, items, verb, call, describe }) {
  openModal(
    title,
    `<div id="abBody"><p style="margin:0 0 8px">${intro}</p><div id="abProg" class="notice" ${items.length ? "hidden" : ""} style="margin:10px 0"></div><div id="abLog" style="max-height:220px;overflow:auto;font-size:13px"></div><div class="modal-actions"><button type="button" class="btn ghost" id="abClose">Close</button><button type="button" class="btn primary" id="abGo" ${items.length ? "" : "disabled"}>${verb} ${items.length} product${items.length === 1 ? "" : "s"}</button></div></div>`,
    true,
  );
  let stop = false, running = false;
  $("#abClose").onclick = async () => {
    stop = true;
    closeAdminModal();
    if (running || $("#abGo")?.dataset.ran) await adminRerender();
  };
  $("#abGo").onclick = async () => {
    const go = $("#abGo"), prog = $("#abProg"), log = $("#abLog");
    if (running) { stop = true; go.disabled = true; go.textContent = "Stopping…"; return; }
    running = true;
    go.dataset.ran = "1";
    go.textContent = "Stop";
    prog.hidden = false;
    const add = (msg, bad) => log.insertAdjacentHTML("beforeend", `<div class="${bad ? "danger-text" : ""}">${escapeHTML(msg)}</div>`);
    let ok = 0, fail = 0, i = 0, fatal = "";
    for (const p of items) {
      if (stop) break;
      prog.textContent = `Working… ${i} of ${items.length} done (${ok} ok, ${fail} failed)`;
      i++;
      let r = null;
      for (let attempt = 0; attempt < 2 && !r; attempt++) {
        try {
          r = await call(p);
        } catch (e) {
          if (/rate limit/i.test(e.message) && attempt === 0) {
            prog.textContent = "Gemini rate limit reached. Waiting 40 seconds, then continuing…";
            await new Promise((res) => setTimeout(res, 40000));
          } else if (/api key|Add your Gemini|Too many AI|R2 storage/i.test(e.message)) {
            fatal = e.message;
            break;
          } else {
            add(`${p.name}: ${e.message}`, true);
            break;
          }
        }
      }
      if (fatal) break;
      if (!r) { fail++; continue; }
      ok++;
      add(`${p.name}: ${describe(r)}`);
      await new Promise((res) => setTimeout(res, 600));
    }
    running = false;
    prog.innerHTML = `${fatal ? `<span class="danger-text">${escapeHTML(fatal)}</span><br>` : ""}${stop && !fatal ? "Stopped. " : fatal ? "" : "Finished. "}<b>${ok}</b> done${fail ? `, <b class="danger-text">${fail}</b> failed` : ""}.`;
    go.hidden = true;
    $("#abClose").textContent = "Done";
    refreshStore();
  };
}
const seoMissing = (p) => !String(p.meta_title || "").trim() || !String(p.meta_description || "").trim() || !String(p.meta_title_ar || "").trim() || !String(p.meta_description_ar || "").trim();
function aiSeoBulk(rows) {
  const todo = rows.filter((p) => p.name && seoMissing(p));
  aiBulkRunner({
    title: "AI SEO text",
    intro: `<b>${todo.length}</b> of ${rows.length} products are missing a meta title or description in Arabic or English. For each one Gemini writes the meta title, meta description and search keywords in both languages from the product's name, category and description, and saves <b>only the empty fields</b>. Anything you wrote yourself is kept. Keep this window open; review a few results afterwards.`,
    items: todo,
    verb: "Write SEO text for",
    call: (p) => api("/api/admin/ai/seo", { method: "POST", body: JSON.stringify({ product_id: p.id, save: true }) }),
    describe: (r) => (r.saved?.length ? `${r.saved.length} fields saved` : "nothing new to save"),
  });
}
function aiImageBulk(ids, rows) {
  const picked = ids.map((id) => rows.find((x) => x.id === id)).filter(Boolean),
    todo = picked.filter((p) => String(p.image_url || "").trim()),
    skipped = picked.length - todo.length;
  aiBulkRunner({
    title: "Clean up product images",
    intro: `Gemini redraws each selected product's cover on your standard background${skipped ? ` (${skipped} selected product${skipped === 1 ? " has" : "s have"} no image and will be skipped)` : ""}. <b>These are saved straight away</b> with no preview. The original is kept for each product, and you can restore it from the product's edit form (“Restore original image”). Image generation is billed per picture and slow (about 20 to 60 seconds each), and the limit is 60 per hour. Check the text and logos on a few results afterwards.`,
    items: todo,
    verb: "Clean images of",
    call: (p) => api("/api/admin/ai/image", { method: "POST", body: JSON.stringify({ product_id: p.id, save: true }) }),
    describe: () => "new cover saved (original kept)",
  });
}
// ---- Settings: Gemini key ----
async function aiSettingsPanel(main) {
  let c;
  try {
    c = await api("/api/admin/ai");
  } catch {
    return;
  }
  const form = document.createElement("form");
  form.className = "admin-panel";
  form.id = "aiForm";
  form.style.marginTop = "14px";
  form.innerHTML = `<div class="modal-body"><b>AI auto-fill (Gemini)</b> <span class="tag ${c.configured ? "green" : "red"}">${c.configured ? "key set " + escapeHTML(c.key_hint) : "no key"}</span><small style="display:block;margin:6px 0 10px">Adds an “Auto-fill with AI” button to the product form. Get a key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">aistudio.google.com/apikey</a>. The key stays on the server and is never sent back to this page.${c.source === "secret" ? " It is currently read from the GEMINI_API_KEY Worker secret, which takes priority over a key saved here." : ""}</small><div class="form-grid"><div class="field"><label>Gemini API key</label><input id="aiKey" type="password" autocomplete="off" placeholder="${c.configured ? "Saved. Paste a new key to replace it" : "Paste your API key"}"></div><div class="field"><label>Model</label><input id="aiModel" value="${escapeHTML(c.model)}" placeholder="${escapeHTML(c.default_model)}"></div></div><div class="form-grid"><div class="field"><label>Image model (for “Clean up image”)</label><input id="aiImgModel" value="${escapeHTML(c.image_model || "")}" placeholder="${escapeHTML(c.default_image_model || "")}"></div><div class="field"><label>Cover background</label><input id="aiImgBg" value="${escapeHTML(c.image_bg || "")}" placeholder="${escapeHTML(c.default_image_bg || "")}"></div></div><small style="display:block;margin:-4px 0 10px">Image cleanup needs a Gemini image model (the Nano Banana family) and usually a billed API key. Describe the background once and every cover uses it, so the catalog looks uniform.</small><div class="field"><label>Extra instructions (optional)</label><textarea id="aiInstr" placeholder="e.g. Write Arabic descriptions in a friendly Egyptian tone. Always mention instant delivery.">${escapeHTML(c.instructions)}</textarea></div><div class="modal-actions">${c.source === "saved" ? `<button type="button" class="btn ghost" id="aiRemove">Remove saved key</button>` : ""}<button class="btn primary">Save AI settings</button></div></div>`;
  main.appendChild(form);
  const save = async (extra, msg) => {
    try {
      await api("/api/admin/ai", { method: "PUT", body: JSON.stringify({ model: $("#aiModel").value, instructions: $("#aiInstr").value, image_model: $("#aiImgModel").value, image_bg: $("#aiImgBg").value, ...extra }) });
      toast(msg);
      form.remove();
      await aiSettingsPanel(main);
    } catch (err) {
      toast(err.message);
    }
  };
  form.onsubmit = (e) => {
    e.preventDefault();
    save({ api_key: $("#aiKey").value }, "AI settings saved.");
  };
  $("#aiRemove")?.addEventListener("click", () => {
    if (confirm("Remove the saved Gemini key? AI auto-fill will stop working until you add one.")) save({ clear_key: true }, "Key removed.");
  });
}
async function uploadAdminImage(id, file, ai = false, gallery = false) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`/api/admin/products/${id}/image${ai ? "?ai=1" : gallery ? "?gallery=1" : ""}`, {
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
    <div id="mList" style="max-height:340px;overflow:auto;border:1px solid var(--line);border-radius:12px"></div>
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
          return `<div class="line" style="padding:10px 12px;border-bottom:1px solid var(--line);align-items:center;flex-wrap:wrap"><label style="flex:1;min-width:180px"><input type="checkbox" data-pick="${p.id}" ${on ? "checked" : ""}> ${escapeHTML(p.name)} <small>· ${money(p.price)} · ${p.stock} in stock</small></label>${on ? `<span style="display:flex;gap:6px"><input data-oname="${p.id}" value="${escapeHTML(on.name)}" placeholder="Option name" style="width:150px"><input data-oprice="${p.id}" type="number" step="0.01" min="0" value="${on.price}" style="width:90px"></span>` : ""}</div>`;
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
// Stored as UTC ISO; the datetime-local input wants the admin's local wall-clock time.
function isoToLocalInput(iso) {
  const d = new Date(iso || "");
  if (!iso || isNaN(d)) return "";
  const p2 = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}T${p2(d.getHours())}:${p2(d.getMinutes())}`;
}
async function adminSettings(main) {
  const s = await api("/api/admin/settings");
  const field = ([k, label, type]) =>
    type === "toggle"
      ? `<label class="switch-row" style="margin:8px 0"><span>${label}</span><input class="switch" id="s_${k}" type="checkbox" ${s[k] !== "0" ? "checked" : ""}></label>`
      : `<div class="field"><label>${label}</label>${type === "textarea" ? `<textarea id="s_${k}">${escapeHTML(s[k] || "")}</textarea>` : `<input id="s_${k}" type="${type === "color" ? "color" : type === "number" ? "number" : type === "datetime" ? "datetime-local" : "text"}" ${type === "number" ? 'step="0.01"' : ""} value="${type === "datetime" ? isoToLocalInput(s[k]) : escapeHTML(s[k] || "")}">`}</div>`;
  const pay = `<details open><summary><b>Payment methods</b></summary>${PAY.map(([k, n]) => `<div class="switch-row"><div><b>${n}</b><div class="field" style="margin:7px 0 0"><input id="s_${k}" value="${escapeHTML(s[k] || "")}" placeholder="Destination / number"></div></div><input class="switch" id="s_${k}_enabled" type="checkbox" ${s[k + "_enabled"] !== "0" ? "checked" : ""}></div>`).join("")}</details>`;
  main.innerHTML = `<div class="admin-top"><h2>Settings</h2><span class="eyebrow">EVERYTHING EDITABLE</span></div><form id="settingsForm" class="admin-panel"><div class="modal-body">${pay}${SETTINGS_SCHEMA.map(([t, f]) => `<details style="margin-top:14px"><summary><b>${t}</b></summary>${f.map(field).join("")}</details>`).join("")}<div class="modal-actions"><button class="btn primary">Save settings</button></div></div></form>
  <form id="pwForm" class="admin-panel" style="margin-top:14px"><div class="modal-body"><b>Change admin password</b><div class="form-grid"><div class="field"><label>Current password</label><input id="pwCur" type="password" required></div><div class="field"><label>New password (8+ characters)</label><input id="pwNew" type="password" minlength="8" required></div></div><div class="modal-actions"><button class="btn ghost">Change password</button></div></div></form>`;
  main.insertAdjacentHTML("beforeend", await opsPanelHTML());
  bindOps();
  await aiSettingsPanel(main);
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
        body[k] = type === "toggle" ? (el.checked ? "1" : "0") : type === "datetime" ? (el.value ? new Date(el.value).toISOString() : "") : el.value;
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
  renderAbandonedCartNudge();
  renderFooter();
}
const PAY = [
  ["instapay", "InstaPay"],
  ["vodafone_cash", "Vodafone Cash"],
  ["telda", "Telda"],
];
const payNameEN = (k) => (PAY.find((x) => x[0] === k) || [k, { store_credit: "Store credit", free: "Free" }[k] || k])[1];
// Small brand marks live in /icons/pay/<key>.svg; methods without a file (store credit, free) show text only.
const PAY_LOGOS = new Set(["vodafone_cash", "instapay", "telda"]);
const payLogo = (k) => PAY_LOGOS.has(k) ? `<img class="pay-logo" src="/icons/pay/${k}.svg" alt="" width="36" height="24" loading="lazy" decoding="async">` : "";
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
    "Flash-sale countdown",
    [
      ["sale_ends_at", "Sale ends at (your local time; empty = no countdown). Display only: prices do NOT change when it ends, so edit the old prices yourself afterwards.", "datetime"],
      ["sale_label", "Countdown label"],
      ["sale_on_banner", "Show the countdown on the homepage campaign banner", "toggle"],
      ["sale_on_products", "Show the countdown on product pages that have an old (crossed-out) price", "toggle"],
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
      ["order_eta", "Estimated wait shown after checkout"],
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
      ["loyalty_enabled", "Reward points (earned on delivered, paid orders; redeemed for store credit)", "toggle"],
      ["loyalty_points_per_egp", "Points earned per 1 EGP paid", "number"],
      ["loyalty_redeem_points", "Points needed per reward", "number"],
      ["loyalty_redeem_egp", "Store credit per reward (EGP)", "number"],
      ["loyalty_max_redeem_percent", "Maximum points redemption (% of remaining order total)", "number"],
      ["email_codes", "Include the delivered codes in the delivery email", "toggle"],
      ["testimonials_enabled", "Show testimonials strip on the home page", "toggle"],
      ["auto_bundle_enabled", "Automatic bundle discount (cart with several different products, no code)", "toggle"],
      ["auto_bundle_max_percent", "Bundle discount: maximum percentage (%)", "number"],
      ["auto_bundle_max_egp", "Bundle discount: maximum amount (EGP per order)", "number"],
      ["auto_bundle_min_products", "Bundle discount: different products needed to start (2 or more)", "number"],
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
    "sale_label",
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
    "order_eta",
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
  // The built-in logo is now HTML/CSS/SVG. Only swap in an image if an admin set a custom logo URL
  // (the API returns the old default JPG when none is set, so that value counts as "not custom").
  const lu = s.logo_url && s.logo_url !== logo ? s.logo_url : "";
  $$("[data-logo]").forEach((el) => {
    if (lu) {
      if (!el.dataset.cssLogo) el.dataset.cssLogo = el.innerHTML;
      el.classList.add("k-logo-custom");
      el.innerHTML = `<img src="${escapeHTML(lu)}" alt="${escapeHTML(s.store_name || "Kardivo")}">`;
    } else if (el.dataset.cssLogo) {
      el.classList.remove("k-logo-custom");
      el.innerHTML = el.dataset.cssLogo;
    }
  });
  const fav = $("#favicon");
  if (fav) fav.href = lu || "/icons/logo-mark.svg";
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
function initHeroParticles() {
  const c = document.querySelector(".hero-particles");
  if (!c || c.dataset.on) return;
  c.dataset.on = "1";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData) return;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  const few = innerWidth < 700 || (navigator.hardwareConcurrency || 4) <= 2;
  const count = few ? 16 : 32;
  let w = 1, h = 1, ps = [], color = "196,168,255", running = false, visible = true, last = 0, frame = 0;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5), r = c.getBoundingClientRect();
    w = Math.max(1, r.width); h = Math.max(1, r.height);
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const seed = () => { ps = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, r: rnd(0.9, 2.6), vy: rnd(0.08, 0.26), vx: rnd(-0.05, 0.05), a: rnd(0.45, 0.95), t: rnd(0, 6.28), s: rnd(0.01, 0.03) })); };
  let io, ro;
  const onVis = () => { if (!document.hidden) start(); };
  const stop = () => { io?.disconnect(); ro?.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  function tick(now) {
    if (!c.isConnected) { running = false; stop(); return; }
    if (!visible || document.hidden) { running = false; return; }
    requestAnimationFrame(tick);
    if (now - last < 33) return;
    last = now;
    if (frame++ % 90 === 0) color = getComputedStyle(c).getPropertyValue("--particle").trim() || color;
    ctx.clearRect(0, 0, w, h);
    for (const p of ps) {
      p.y -= p.vy; p.x += p.vx; p.t += p.s;
      if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
      if (p.x < -4) p.x = w + 4; else if (p.x > w + 4) p.x = -4;
      ctx.fillStyle = `rgba(${color},${(p.a * (0.55 + 0.45 * Math.sin(p.t))).toFixed(3)})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
    }
  }
  function start() { if (running || !c.isConnected) return; running = true; requestAnimationFrame(tick); }
  size(); seed();
  io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
  io.observe(c);
  ro = new ResizeObserver(size);
  ro.observe(c);
  document.addEventListener("visibilitychange", onVis);
  start();
}
function renderCategoryPage(slug) {
  document.body.classList.remove("product-route", "account-route");
  const main = $("main");
  const c = state.categories.find((x) => x.slug === slug);
  if (!c) {
    main.innerHTML = `<section class="collection-page container"><div class="collection-hero"><div><h1>${t("Category not found")}</h1></div><a class="btn ghost" href="/" data-home>${t("Back to store")}</a></div></section>`;
    return;
  }
  if (!state.catSaved) state.catSaved = { category: state.category, query: state.query, discovery: state.discovery };
  state.category = String(c.id); state.query = ""; state.discovery = "all";
  const n = state.products.filter((p) => String(p.category_id) === String(c.id)).length;
  main.innerHTML = `<section class="collection-page container category-page"><nav class="product-breadcrumb" aria-label="Breadcrumb"><a href="/" data-home>${t("Store")}</a><span>/</span><span>${escapeHTML(cName(c))}</span></nav><div class="collection-hero"><div><span class="eyebrow">KARDIVO</span><h1>${escapeHTML(cName(c))}</h1><p>${n} ${state.lang === "ar" ? "منتج" : n === 1 ? "product" : "products"}</p></div><a class="btn ghost" href="/#store" data-collection-store>${t("All products")}</a></div><div id="productGrid" class="product-grid"></div></section>`;
  document.title = `${cName(c)} | ${state.settings.store_name || "Kardivo"}`;
  renderProducts();
}
function renderHomeRecs() {
  $("#homeRecs")?.remove();
  const store = $("#store");
  if (!store) return;
  const bySlug = new Map(state.products.map((p) => [p.slug, p])),
    recent = recentList().map((x) => bySlug.get(x)).filter(Boolean);
  if (!recent.length) return;
  const cur = recent[0],
    shown = recent.slice(0, 4),
    taken = new Set([...recent.slice(0, 4).map((p) => p.id)]),
    inStock = (p) => p.delivery_type !== "code" || ((p.variants || []).length ? p.variants.some((v) => Number(v.stock) > 0) : Number(p.stock) > 0),
    like = state.products
      .filter((p) => !taken.has(p.id) && inStock(p))
      .map((p) => ({ p, score: (cur.category_id && String(p.category_id) === String(cur.category_id) ? 2 : 0) + (cur.platform && p.platform === cur.platform ? 1 : 0) + (Number(p.featured) ? 0.5 : 0) }))
      .filter((x) => x.score >= 1)
      .sort((x, y) => y.score - x.score || y.p.id - x.p.id)
      .slice(0, 4)
      .map((x) => x.p),
    row = (title, list) => (list.length ? `<div class="rec-row"><h3>${title}</h3><div class="rec-grid">${list.map(miniCard).join("")}</div></div>` : "");
  store.insertAdjacentHTML("beforebegin", `<section id="homeRecs" class="container home-recs">${row(t("Recently viewed"), shown)}${row(t("You may also like"), like)}</section>`);
  bindFavoriteButtons($("#homeRecs"));
}
function showHome() {
  document.body.classList.remove("product-route");
  if (state.catSaved) { Object.assign(state, state.catSaved); state.catSaved = null; }
  $("main").innerHTML = homeHTML;
  translateStatic();
  applySettings();
  renderCampaign();
  renderCategories();
  renderSmartFilters();
  renderHeroShowcase();
  initHeroParticles();
  renderCategoryCards();
  renderPopularProducts();
  renderHomeRecs();
  renderProducts();
  $("#sort").value = state.sort;
  $("#search").value = state.query;
  renderSearchSuggestions();
  renderTestimonials();
}
async function renderAccountPage() {
  document.body.classList.remove("product-route", "admin-route");
  document.body.classList.add("account-route");
  const user = state.user;
  const ar = state.lang === "ar";
  if (!user) {
    const title = ar ? "حسابك في كارديفو" : "Your Kardivo account";
    const intro = ar ? "سجّل دخولك لمتابعة طلباتك ومشترياتك." : "Sign in to view your orders and manage your purchases.";
    $("main").innerHTML = `<section class="account-page container"><div class="account-page-hero"><span class="account-page-mark" aria-hidden="true">◎</span><div><span class="eyebrow">${title}</span><h1>${intro}</h1></div></div><section class="account-page-grid"><article class="account-page-card"><h2>${ar ? "تسجيل الدخول أو إنشاء حساب" : "Sign in or create an account"}</h2><p>${intro}</p><button class="btn primary" id="accountHubAction">${ar ? "متابعة" : "Continue"}</button></article><article class="account-page-card"><h2>${ar ? "تصفّح المتجر" : "Explore the store"}</h2><p>${ar ? "تقدر تتصفح المنتجات حتى من غير حساب." : "You can browse products even without an account."}</p><a class="btn ghost" href="/#store" data-account-store>${ar ? "ارجع للمتجر ↖" : "Back to the store ↗"}</a></article></section></section>`;
    $("#accountHubAction")?.addEventListener("click", openAccount);
    $("[data-account-store]")?.addEventListener("click", (e) => { e.preventDefault(); navigate("/#store", "#store"); });
    return;
  }
  $("main").innerHTML = `<section class="account-page container"><div class="account-page-hero"><span class="account-page-mark" aria-hidden="true">◎</span><div><span class="eyebrow">${ar ? "حسابك في كارديفو" : "YOUR KARDIVO ACCOUNT"}</span><h1>${ar ? `أهلاً ${escapeHTML(user.name || "")}` : `Welcome back, ${escapeHTML(user.name || user.email || "Customer")}.`}</h1><p>${ar ? "إدارة حسابك ومتابعة طلباتك من هنا." : "Manage your account and keep track of your orders here."}</p></div></div><section class="account-page-grid"><article class="account-page-card"><span class="eyebrow">${ar ? "بيانات الحساب" : "ACCOUNT DETAILS"}</span><h2>${escapeHTML(user.name || (ar ? "عميل كارديفو" : "Kardivo customer"))}</h2><p>${escapeHTML(user.email || "")}</p><p>${ar ? "نوع الحساب" : "Account type"}: <b>${user.role === "admin" ? (ar ? "مدير" : "Administrator") : (ar ? "عميل" : "Customer")}</b></p><div class="modal-actions"><button class="btn primary" id="accountDetailsBtn">${ar ? "تفاصيل الحساب والطلبات" : "Account details & orders"}</button>${user.role === "admin" ? `<button class="btn ghost" id="accountAdminBtn">${ar ? "لوحة تحكم المدير" : "Admin dashboard"}</button>` : ""}<button class="btn ghost" id="accountLogoutBtn">${ar ? "تسجيل الخروج" : "Log out"}</button></div></article><article class="account-page-card"><span class="eyebrow">${ar ? "استكشف المتجر" : "KEEP EXPLORING"}</span><h2>${ar ? "كل المنتجات الرقمية في مكان واحد." : "Digital goods, minus the nonsense."}</h2><p>${ar ? "اختار اللي محتاجه وضيفه للسلة." : "Browse the catalog and add products to your cart."}</p><a class="btn ghost" href="/#store" data-account-store>${ar ? "ارجع للمتجر ↖" : "Back to the store ↗"}</a></article></section><section class="account-page-card" style="margin-top:16px"><span class="eyebrow">${ar ? "طلباتك" : "YOUR ORDERS"}</span><h2>${ar ? "سجل الطلبات" : "Order history"}</h2><div id="orderPushBox"></div><div id="accountOrders"><div class="empty">${ar ? "جارٍ تحميل الطلبات…" : "Loading orders…"}</div></div></section></section>`;
  renderOrderPushBox();
  $("#accountDetailsBtn")?.addEventListener("click", openAccount);
  $("#accountAdminBtn")?.addEventListener("click", openAdmin);
  $("#accountLogoutBtn")?.addEventListener("click", async () => {
    try { await api("/api/auth/logout", { method: "POST" }); state.user = null; state.favorites = []; saveFavorites(); toast(ar ? "تم تسجيل الخروج." : "Logged out."); await navigate("/account"); }
    catch (e) { toast(e.message); }
  });
  $("[data-account-store]")?.addEventListener("click", (e) => { e.preventDefault(); navigate("/#store", "#store"); });
  { const sk = $("#accountOrders"); if (sk) sk.innerHTML = skRowsHTML(); }
  try {
    const orders = await api("/api/orders");
    const target = $("#accountOrders");
    if (target) target.innerHTML = orders.length ? `<div class="table-wrap"><table class="admin-table"><thead><tr><th>${ar ? "رقم الطلب" : "Order"}</th><th>${ar ? "الحالة" : "Status"}</th><th>${ar ? "الإجمالي" : "Total"}</th><th>${ar ? "التاريخ" : "Date"}</th><th><span class="sr-only">${t("Reorder")}</span></th>${state.settings.whatsapp ? `<th>${t("Help")}</th>` : ""}</tr></thead><tbody>${orders.map(o => `<tr><td><b>${escapeHTML(o.order_number || `#${o.id}`)}</b>${o.item_summary ? `<br><small>${escapeHTML(o.item_summary)}</small>` : ""}</td><td>${escapeHTML(o.status || o.fulfillment_status || "—")}</td><td>${money(o.total || 0)}</td><td>${escapeHTML(o.created_at || "—")}</td><td>${reorderButton(o, true)}</td>${state.settings.whatsapp ? `<td>${orderWaButton(o.order_number || `#${o.id}`, "mini order-wa")}</td>` : ""}</tr>`).join("")}</tbody></table></div>` : `${emptyState("orders", true)}`;
  } catch (e) { const target = $("#accountOrders"); if (target) target.innerHTML = `<div class="notice">${escapeHTML(e.message || (ar ? "تعذّر تحميل الطلبات." : "Could not load orders."))}</div>`; }
}
function renderAdminPage() {
  document.body.classList.remove("product-route", "account-route");
  document.body.classList.add("admin-route");
  if (!state.user || state.user.role !== "admin") {
    $("main").innerHTML = `<section class="account-page container"><div class="account-page-card"><h1>Admin access required</h1><p>Please sign in with an administrator account to open the dashboard.</p><button class="btn primary" id="adminPageLogin">Sign in</button><a class="btn ghost" href="/" data-admin-store>Back to store</a></div></section>`;
    $("#adminPageLogin")?.addEventListener("click", openAccount);
    return;
  }
  state.adminOpen = true;
  $("main").innerHTML = `<section class="admin-page container"><div class="admin-page-head"><div><span class="eyebrow">KARDIVO MANAGEMENT</span><h1>Admin dashboard</h1></div><div class="modal-actions" style="margin:0"><a class="btn ghost" href="/account" id="adminAccountLink">Account</a><a class="btn ghost" href="/" id="adminStoreLink">Back to store</a></div></div><div class="admin-shell"><aside class="admin-side" id="adminSide">${ADMIN_TABS.map(([k, n]) => `<button data-admin-tab="${k}">${n}<span class="badge red" data-badge="${k}" hidden></span></button>`).join("")}</aside><section class="admin-main" id="adminMain"></section></div></section>`;
  $$("#adminSide button").forEach(b => b.onclick = () => { state.admin.tab = b.dataset.adminTab; renderAdminTab(); });
  renderAdminTab().then(() => { if (state.admin.tab !== "dashboard") adminBadges(); });
}
async function route() {
  const path = location.pathname.replace(/\/$/, "") || "/";
  { const m = $("main"); if (m) { m.classList.remove("page-enter"); void m.offsetWidth; if (!document.documentElement.classList.contains("vt-active")) m.classList.add("page-enter"); } }
  [["/account", "#accountBtn"], ["/cart", "#cartBtn"], ["/favorites", "#wishlistBtn"]].forEach(([p, selector]) => {
    const el = $(selector); if (el) { const active = path === p; el.classList.toggle("is-active", active); if (active) el.setAttribute("aria-current", "page"); else el.removeAttribute("aria-current"); }
  });
  $$("[data-tab]").forEach((el) => {
    const tp = el.dataset.tab;
    const active = tp === "/" ? !["/account", "/cart", "/favorites", "/admin", "/order-confirmed"].includes(path) : path === tp;
    el.classList.toggle("is-active", active);
    if (active) el.setAttribute("aria-current", "page"); else el.removeAttribute("aria-current");
  });
  if (path === "/account") await renderAccountPage();
  else if (path === "/admin") renderAdminPage();
  else if (path === "/favorites") { if (state.user) { document.body.classList.add("account-route"); $("main").innerHTML = skCategoryHTML(true); await syncFavoritesWithAccount(false); } renderFavoritesPage(); }
  else if (path === "/cart") renderCartPage();
  else if (path === "/order-confirmed") renderOrderConfirmed();
  else if (path.startsWith("/c/")) renderCategoryPage(decodeURIComponent(path.slice(3)));
  else if (isProductRoute())
    await openProductPage(
      decodeURIComponent(location.pathname.slice(1)).replace(/\/$/, ""),
    );
  else showHome();
}
function navigate(path, scrollTo) {
  const go = () => { history.pushState({}, "", path); return route(); };
  // V61: View Transitions where the browser has them (cross-fade, product picture grows into its page).
  if (kdTransition(path, go, scrollTo)) return;
  go().then(() => {
    if (scrollTo) setTimeout(() => $(scrollTo)?.scrollIntoView(), 30);
    else window.scrollTo(0, 0);
  });
}
function bindCopy() {
  $$("[data-copy]").forEach(
    (b) =>
      (b.onclick = async () => {
        const ok = await copyText(b.dataset.copy);
        toast(ok ? (b.hasAttribute("data-copy-show") ? `${t("Copied.")} ${b.dataset.copy}` : t("Copied.")) : t("Could not copy. Select the text and copy it manually."));
      }),
  );
}
async function adminCustomers(main) {
  const rows = await api("/api/admin/customers");
  main.innerHTML = `<div class="admin-top"><h2>Customers</h2><span class="eyebrow">${rows.length} ACCOUNTS</span></div><div class="admin-panel"><div class="table-wrap"><table class="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Orders</th><th>Paid total</th><th>Joined</th></tr></thead><tbody>${rows.map((u) => `<tr><td>${escapeHTML(u.name)}</td><td>${escapeHTML(u.email)}</td><td>${escapeHTML(u.role)}</td><td>${u.orders}</td><td>${money(u.spent)}</td><td>${escapeHTML(u.created_at)}</td></tr>`).join("")}</tbody></table></div></div>`;
}
$("#langBtn").onclick = () => setLang(state.lang === "ar" ? "en" : "ar");
$("#currencyBtn").addEventListener("click", (event) => { event.preventDefault(); toggleCurrency(); });
$("#themeBtn")?.addEventListener("click", (event) => {
  event.preventDefault();
  setTheme(currentTheme() === "dark" ? "light" : "dark");
});
$("#cartBtn").onclick = () => navigate("/cart");
$("#accountBtn").onclick = () => navigate("/account");
$("#footerAccount").onclick = (e) => {
  e.preventDefault();
  navigate("/account");
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
document.addEventListener("focusin", (e) => { if (e.target.id === "search") { loadTrending(); renderSearchSuggestions(); } });
document.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.id === "search") { saveRecentSearch(e.target.value); const box = $("#searchSuggestions"); if (box) box.hidden = true; } });
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-clear-recent]")) {
    try { localStorage.removeItem(RECENT_SEARCH_KEY); } catch {}
    const box = $("#searchSuggestions");
    if (box) renderPopularSearches(box);
    $("#search")?.focus();
    return;
  }
  const chipEl = e.target.closest("[data-search-term]");
  if (chipEl) {
    const term = chipEl.dataset.searchTerm, input = $("#search");
    if (input) { input.value = term; state.query = term; saveRecentSearch(term); renderProducts(); renderSearchSuggestions(); $("#productGrid")?.scrollIntoView({ behavior: "smooth", block: "start" }); const box = $("#searchSuggestions"); if (box) box.hidden = true; }
    return;
  }
  if (!e.target.closest(".search-wrap")) { const box = $("#searchSuggestions"); if (box) box.hidden = true; }
  const suggestion = e.target.closest("[data-suggestion-product]");
  if (suggestion) { e.preventDefault(); saveRecentSearch($("#search")?.value); const p = state.products.find((x) => Number(x.id) === Number(suggestion.dataset.suggestionProduct)); if (p) navigate("/" + encodeURIComponent(p.slug || p.id)); const box = $("#searchSuggestions"); if (box) box.hidden = true; }
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
const AR_TRUST = {
  "Instant delivery": "تسليم فوري",
  "Codes sent right after payment is confirmed": "الكود بيوصلك أول ما الدفع يتأكد",
  "Secure payment": "دفع آمن",
  "Every order is checked by a real person": "كل طلب بيتراجع بإيد حد حقيقي",
  "Arabic support": "دعم بالعربي",
  "Chat with us in Arabic, any time": "كلمنا بالعربي في أي وقت",
  "Egyptian payment methods": "وسائل دفع مصرية",
  "Vodafone Cash · InstaPay · Telda": "فودافون كاش · إنستاباي · تيلدا",
  "Why shop with us": "ليه تشتري من كاردفو",
  "Quick navigation": "التنقل السريع",
  "Pick a product and it will show up here, ready for checkout.": "اختار منتج وهيظهر هنا جاهز للدفع.",
  "Tap the heart on any product to keep it here for later.": "دوس على القلب في أي منتج وهيتحفظ هنا لوقت تاني.",
  "Your orders and delivery updates will show up here after your first purchase.": "طلباتك وتحديثات التسليم هتظهر هنا بعد أول طلب ليك.",
  "See your favorites": "شوف المفضلة",
  "Browse products": "تصفح المنتجات",
  "No saved products yet.": "مفيش منتجات محفوظة لسه.",
  "No orders yet.": "مفيش طلبات لسه.",
  "Favorites": "المفضلة",
  "Home": "الرئيسية",
  "Switch to light theme": "التبديل للوضع الفاتح",
  "Switch to dark theme": "التبديل للوضع الداكن",
};
Object.assign(AR, AR_TRUST);
Object.assign(AR, AR_V10);
Object.assign(ERR_AR, ERR_AR_V10);
setDir();
translateStatic();
boot();


// V21 additive growth enhancements: all are isolated from order creation and payment processing.
document.addEventListener("click", (event) => {
  if (event.target.closest("#wishlistBtn")) { navigate("/favorites"); return; }
  if (event.target.closest("[data-go-store]")) { closeModal(); navigate("/#store", "#store"); return; }
  const tabBtn = event.target.closest('[data-tab^="/"]');
  if (tabBtn) {
    closeModal();
    const tp = tabBtn.dataset.tab;
    if (location.pathname.replace(/\/$/, "") === (tp === "/" ? "" : tp)) window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate(tp);
    return;
  }
  if (event.target.closest("#bundleBuilderBtn")) { openBundleBuilder(); return; }
});
window.addEventListener("DOMContentLoaded", () => { renderAbandonedCartNudge(); });


// V59 festival layer: glow, particles, category ticker, card spotlight, scroll reveal. (The V59 string of lights over the hero was removed in V61.)
// Purely visual. It never touches orders, prices, payments or API calls, and any failure just leaves the plain site.
(() => {
  if (window.__kardivoFest) return;
  window.__kardivoFest = true;
  const doc = document, root = doc.documentElement;
  const mq = (q) => { try { return matchMedia(q).matches; } catch { return false; } };
  const reduce = mq("(prefers-reduced-motion: reduce)");
  const saver = !!(navigator.connection && navigator.connection.saveData);
  const still = reduce || saver; // no canvas, cursor glow or tilt
  const fine = mq("(hover: hover) and (pointer: fine)");
  const weak = innerWidth < 700 || (navigator.hardwareConcurrency || 4) <= 2;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const CARD_SEL = ".category-card,.popular-product";
  const REVEAL = ".category-card,.popular-product-wrap,.section-head,.steps article,.deal-band,.campaign-card,.ts-item,.fest-marquee";

  // ---------- page-wide backdrop ----------
  const bg = doc.createElement("div");
  bg.className = "fest-bg";
  bg.setAttribute("aria-hidden", "true");
  bg.innerHTML = '<i class="fest-blob fb1"></i><i class="fest-blob fb2"></i><i class="fest-blob fb3"></i>' +
    (fine && !still ? '<i class="fest-cursor"></i>' : "") + (still ? "" : '<canvas class="fest-canvas"></canvas>');
  doc.body.prepend(bg);
  const prog = doc.createElement("div");
  prog.className = "fest-progress";
  prog.setAttribute("aria-hidden", "true");
  doc.body.append(prog);

  // ---------- particles: one shared loop for every canvas ----------
  const PAL = { dark: [[196, 168, 255], [232, 121, 249], [129, 140, 248], [253, 224, 71]], light: [[109, 63, 232], [168, 40, 200], [79, 70, 229], [176, 110, 0]] };
  const PICK = [0, 0, 0, 0, 0, 1, 1, 2, 2, 3];
  const engines = new Set();
  let raf = 0, last = 0;
  function spawn(e, anywhere) {
    const big = Math.random() < e.star;
    return { x: Math.random() * e.w, y: anywhere ? Math.random() * e.h : e.h + 10, r: big ? rnd(1.4, 2.6) : rnd(0.7, 2), star: big, vx: rnd(-0.07, 0.07), vy: rnd(0.05, 0.2), a: rnd(0.4, 0.95), t: rnd(0, 6.28), s: rnd(0.015, 0.04), c: PICK[(Math.random() * PICK.length) | 0] };
  }
  function addEngine(c, opts) {
    if (c.__fe) return;
    const ctx = c.getContext && c.getContext("2d");
    if (!ctx) return;
    const e = (c.__fe = { c, ctx, w: 1, h: 1, ps: [], visible: false, dens: opts.dens, max: opts.max, star: opts.star });
    e.size = () => {
      const w = c.clientWidth, h = c.clientHeight;
      if (w < 2 || h < 2) { e.w = 1; e.h = 1; e.ps = []; return; }
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      e.w = w; e.h = h;
      const n = Math.round(Math.max(5, Math.min(e.max, (w * h) / e.dens)) * (weak ? 0.5 : 1));
      e.ps = Array.from({ length: n }, () => spawn(e, true));
    };
    e.io = new IntersectionObserver(([en]) => { e.visible = en.isIntersecting; if (e.visible) kick(); });
    e.ro = new ResizeObserver(() => { e.size(); kick(); });
    e.io.observe(c); e.ro.observe(c);
    engines.add(e);
    e.size();
  }
  function draw(e, k) {
    const { ctx, w, h } = e, light = root.dataset.theme === "light", pal = PAL[light ? "light" : "dark"], gain = light ? 0.8 : 1;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = light ? "source-over" : "lighter";
    for (const p of e.ps) {
      p.y -= p.vy * k; p.x += p.vx * k; p.t += p.s * k;
      if (p.y < -12) Object.assign(p, spawn(e, false));
      if (p.x < -12) p.x = w + 12; else if (p.x > w + 12) p.x = -12;
      const al = p.a * (0.25 + 0.75 * (0.5 + 0.5 * Math.sin(p.t))) * gain, col = pal[p.c];
      if (al < 0.03) continue;
      const rgb = col[0] + "," + col[1] + "," + col[2];
      if (p.star || p.r > 1.6) { ctx.fillStyle = "rgba(" + rgb + "," + (al * 0.16).toFixed(3) + ")"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.4, 0, 6.283); ctx.fill(); }
      ctx.fillStyle = "rgba(" + rgb + "," + al.toFixed(3) + ")";
      ctx.beginPath();
      if (p.star) {
        const R = p.r * 2.8, q = R * 0.2;
        ctx.moveTo(p.x, p.y - R); ctx.quadraticCurveTo(p.x + q, p.y - q, p.x + R, p.y); ctx.quadraticCurveTo(p.x + q, p.y + q, p.x, p.y + R);
        ctx.quadraticCurveTo(p.x - q, p.y + q, p.x - R, p.y); ctx.quadraticCurveTo(p.x - q, p.y - q, p.x, p.y - R);
      } else ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fill();
    }
  }
  function loop(now) {
    raf = 0;
    if (doc.hidden) return;
    let live = false;
    for (const e of engines) {
      if (!e.c.isConnected) { e.io.disconnect(); e.ro.disconnect(); engines.delete(e); continue; }
      if (e.visible) live = true;
    }
    if (!live) return;
    raf = requestAnimationFrame(loop);
    if (now - last < 33) return;
    const k = Math.min((now - last) / 33, 3);
    last = now;
    for (const e of engines) if (e.visible && e.ps.length) draw(e, k);
  }
  function kick() { if (!raf && !doc.hidden && engines.size) raf = requestAnimationFrame(loop); }
  doc.addEventListener("visibilitychange", kick);
  const globalCanvas = bg.querySelector(".fest-canvas");
  if (globalCanvas) addEngine(globalCanvas, { dens: 52000, max: 34, star: 0.12 });

  // ---------- pointer: cursor glow, card spotlight and tilt ----------
  if (fine && !still) {
    const cursor = bg.querySelector(".fest-cursor");
    let px = 0, py = 0, cx = 0, cy = 0, pending = false, target = null;
    const frame = () => {
      pending = false;
      cx += (px - cx) * 0.2; cy += (py - cy) * 0.2;
      if (cursor) cursor.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
      const card = target && target.closest ? target.closest(CARD_SEL) : null;
      if (card) {
        const r = card.getBoundingClientRect(), x = px - r.left, y = py - r.top;
        card.style.setProperty("--mx", x.toFixed(0) + "px");
        card.style.setProperty("--my", y.toFixed(0) + "px");
        card.style.setProperty("--fest-ry", (((x / r.width) - 0.5) * 7).toFixed(2) + "deg");
        card.style.setProperty("--fest-rx", ((0.5 - (y / r.height)) * 7).toFixed(2) + "deg");
      }
      if (Math.abs(px - cx) > 0.5 || Math.abs(py - cy) > 0.5) { pending = true; requestAnimationFrame(frame); }
    };
    doc.addEventListener("pointermove", (ev) => {
      if (ev.pointerType && ev.pointerType !== "mouse") return;
      if (!bg.classList.contains("has-pointer")) { cx = ev.clientX; cy = ev.clientY; bg.classList.add("has-pointer"); }
      px = ev.clientX; py = ev.clientY; target = ev.target;
      if (!pending) { pending = true; requestAnimationFrame(frame); }
    }, { passive: true });
    doc.addEventListener("pointerout", (ev) => {
      const card = ev.target.closest && ev.target.closest(CARD_SEL);
      if (card && !card.contains(ev.relatedTarget)) { card.style.removeProperty("--fest-rx"); card.style.removeProperty("--fest-ry"); }
    }, { passive: true });
  }

  // ---------- scroll progress ----------
  let sp = 0;
  const onScroll = () => {
    if (sp) return;
    sp = requestAnimationFrame(() => {
      sp = 0;
      const h = root.scrollHeight - innerHeight;
      prog.style.transform = "scaleX(" + (h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0).toFixed(4) + ")";
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });

  // ---------- scroll reveal ----------
  let rio = null;
  if (!still && "IntersectionObserver" in window) {
    rio = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("fest-in"); rio.unobserve(en.target); } }), { rootMargin: "0px 0px -5% 0px", threshold: 0.06 });
    root.classList.add("fest-ready");
  }
  function reveal() {
    if (!rio) return;
    doc.querySelectorAll(REVEAL).forEach((el) => {
      if (el.__fr) return;
      el.__fr = 1;
      const i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--fi", Math.min(i, 8));
      rio.observe(el);
    });
  }

  // ---------- hero pieces ----------
  const star = (pos, s, c, t, d) => '<svg class="fest-spark" style="' + pos + ";--s:" + s + "px;--c:" + c + ";--t:" + t + "s;--d:" + d + 's" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c1 8 4 11 12 12-8 1-11 4-12 12-1-8-4-11-12-12 8-1 11-4 12-12z"/></svg>';
  const SPARKS = star("top:2%;left:-1%", 22, "196,168,255", 4.2, "0s") + star("top:20%;right:-2%", 14, "244,114,182", 3.6, "-1.4s") + star("bottom:14%;left:3%", 16, "253,224,71", 5, "-2.6s") + star("bottom:4%;right:12%", 20, "232,121,249", 4.6, "-0.8s") + star("top:-3%;right:34%", 12, "129,140,248", 3.9, "-3.1s");

  function marqueeNames() {
    try {
      return state.categories.filter((c) => state.products.some((p) => String(p.category_id) === String(c.id))).map((c) => cName(c)).filter(Boolean);
    } catch { return []; }
  }
  function syncMarquee(hero) {
    const names = marqueeNames(), sig = names.join("|") + "|" + root.lang;
    let m = doc.querySelector(".fest-marquee");
    if (names.length < 2) { if (m) m.remove(); return; }
    if (m && m.dataset.sig === sig) return;
    let list = names.slice();
    while (list.length < 10) list = list.concat(names);
    const esc = typeof escapeHTML === "function" ? escapeHTML : (s) => String(s).replace(/[&<>"']/g, "");
    const set = '<div class="fest-set">' + list.map((n) => "<span>" + esc(n) + "</span><b>\u2726</b>").join("") + "</div>";
    if (!m) {
      m = doc.createElement("div");
      m.className = "fest-marquee";
      m.setAttribute("aria-hidden", "true");
      const anchor = doc.querySelector(".trust-strip") || hero;
      anchor.after(m);
    }
    m.dataset.sig = sig;
    m.innerHTML = '<div class="fest-track">' + set + set + "</div>";
  }

  // ---------- keep everything attached as the app re-renders ----------
  function decorate() {
    doc.querySelectorAll(CARD_SEL).forEach((el) => {
      if (el.dataset.fd) return;
      el.dataset.fd = "1";
      el.insertAdjacentHTML("beforeend", '<i class="fest-spot" aria-hidden="true"></i><i class="fest-rim" aria-hidden="true"></i>');
    });
    const hero = doc.querySelector("section.hero");
    if (hero) {
      const vis = hero.querySelector(".hero-visual");
      if (vis && !vis.querySelector(".fest-spark")) vis.insertAdjacentHTML("beforeend", SPARKS);
      syncMarquee(hero);
    }
    if (!still) {
      [["#popularSection", { dens: 8000, max: 50, star: 0.26 }], ["#categoryDiscovery", { dens: 15000, max: 26, star: 0.18 }]].forEach(([sel, o]) => {
        const sec = doc.querySelector(sel);
        if (!sec || sec.querySelector(".fest-section-canvas")) return;
        const c = doc.createElement("canvas");
        c.className = "fest-section-canvas";
        c.setAttribute("aria-hidden", "true");
        sec.prepend(c);
        addEngine(c, o);
      });
    }
    reveal();
  }
  let timer = 0;
  const schedule = () => { if (timer) return; timer = setTimeout(() => { timer = 0; try { decorate(); } catch (e) { /* visual only */ } }, 80); };
  new MutationObserver((muts) => {
    for (const m of muts) for (const n of m.addedNodes) if (n.nodeType === 1) { schedule(); return; }
  }).observe(doc.body, { childList: true, subtree: true });
  try { decorate(); } catch (e) { root.classList.remove("fest-ready"); }
  onScroll();
  kick();
})();


// V60 app mode: stop pinch zoom and double-tap zoom (iOS Safari ignores user-scalable=no) and any sideways page drift.
(() => {
  if (window.__kardivoApp) return;
  window.__kardivoApp = true;
  const inLightbox = (t) => !!(t && t.closest && t.closest(".zlb"));
  ["gesturestart", "gesturechange", "gestureend"].forEach((n) =>
    document.addEventListener(n, (e) => { if (!inLightbox(e.target)) e.preventDefault(); }, { passive: false }));
  document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 1 && !inLightbox(e.target)) e.preventDefault();
  }, { passive: false });
  // belt and braces: if anything ever pushes the page sideways, snap back
  addEventListener("scroll", () => { if (scrollX) scrollTo(0, scrollY); }, { passive: true });
})();


// ======================================================================
// V61 FEEL LAYER: page transitions, haptics + sound, order celebration,
// swipe gestures and extra skeletons.
// UX only. It never touches prices, orders, payments or API calls, and each
// piece falls back to the previous behaviour when the browser can't do it.
// ======================================================================
Object.entries({
  "Undo": "\u062a\u0631\u0627\u062c\u0639",
  "Haptics": "\u0627\u0644\u0627\u0647\u062a\u0632\u0627\u0632",
  "Sound": "\u0627\u0644\u0635\u0648\u062a",
  "On": "\u064a\u0639\u0645\u0644",
  "Off": "\u0645\u062a\u0648\u0642\u0641",
  "Drag down to close": "\u0627\u0633\u062d\u0628 \u0644\u0623\u0633\u0641\u0644 \u0644\u0644\u0625\u063a\u0644\u0627\u0642",
  "Loading...": "\u062c\u0627\u0631\u064d \u0627\u0644\u062a\u062d\u0645\u064a\u0644...",
}).forEach(([k, v]) => { if (!(k in AR)) AR[k] = v; });

const kdReduced = () => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { return false; } };

// ---------- 1. page transitions (View Transitions API) ----------
// A product card's picture grows into the product page; every other route change is a short cross-fade.
let vtTap = null;
document.addEventListener("click", (e) => {
  if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest && e.target.closest("a[href]");
  const card = a && a.closest(".product-card, .popular-product-wrap");
  const img = card && card.querySelector(".product-image img, .popular-product-image img");
  if (!img) return;
  try { vtTap = { img, path: new URL(a.href, location.origin).pathname, t: Date.now() }; } catch { vtTap = null; }
}, true);
function kdTransition(path, update, scrollTo) {
  const doc = document, rt = doc.documentElement;
  if (!doc.startViewTransition || kdReduced()) return false;
  const norm = (p) => { try { return decodeURIComponent(String(p).split(/[?#]/)[0]).replace(/\/$/, "") || "/"; } catch { return "/"; } };
  const cur = norm(location.pathname), dest = norm(path);
  if (dest === cur || cur === "/admin" || dest === "/admin" || dest === "/account") return false;
  const tap = vtTap; vtTap = null;
  const hero = tap && Date.now() - tap.t < 2000 && tap.img.isConnected && norm(tap.path) === dest ? tap.img : null;
  rt.classList.add("vt-active");
  if (hero) hero.style.viewTransitionName = "product-hero";
  let vt;
  try {
    vt = doc.startViewTransition(async () => {
      const p = update();
      // Wait for the first render only (skeleton or page), never for the network.
      await Promise.race([p.catch((err) => console.error(err)), new Promise((r) => setTimeout(r, 70))]);
      if (hero) {
        hero.style.viewTransitionName = "";
        const tgt = doc.querySelector("main .sk-seed img, main .pgal-slide img");
        if (tgt) tgt.style.viewTransitionName = "product-hero";
      }
      if (scrollTo) $(scrollTo)?.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
  } catch { rt.classList.remove("vt-active"); if (hero) hero.style.viewTransitionName = ""; return false; }
  const done = () => {
    rt.classList.remove("vt-active");
    doc.querySelectorAll("[style*='view-transition-name']").forEach((el) => { el.style.viewTransitionName = ""; });
  };
  vt.finished.then(done, done);
  return true;
}

// ---------- 2. haptics and sound ----------
// Android/Chrome: navigator.vibrate. iOS Safari has no vibrate API, so a hidden <input type=checkbox switch> gives
// a light tick when toggled inside a tap (iOS 17.4+, best effort). Sound is a tiny WebAudio blip, off by default.
window.kdFx = (() => {
  const KEY = "kardivo_fx";
  const prefs = { haptics: true, sound: false };
  try { Object.assign(prefs, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch {} };
  let sw = null, ac = null;
  const iosTick = () => {
    try {
      if (!sw) {
        sw = document.createElement("label");
        sw.setAttribute("aria-hidden", "true");
        sw.style.cssText = "position:fixed;left:-99px;top:0;width:1px;height:1px;opacity:0;pointer-events:none";
        sw.innerHTML = '<input type="checkbox" switch tabindex="-1">';
        document.body.append(sw);
      }
      sw.click();
    } catch {}
  };
  const buzz = (pattern) => {
    if (!prefs.haptics) return;
    try { if (typeof navigator.vibrate === "function") { navigator.vibrate(pattern); return; } } catch {}
    iosTick();
  };
  const tone = (freqs, dur = 0.09, vol = 0.045) => {
    if (!prefs.sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === "suspended") ac.resume();
      const t0 = ac.currentTime;
      freqs.forEach((f, i) => {
        const o = ac.createOscillator(), g = ac.createGain(), s = t0 + i * 0.075;
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, s);
        g.gain.exponentialRampToValueAtTime(vol, s + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, s + dur);
        o.connect(g); g.connect(ac.destination);
        o.start(s); o.stop(s + dur + 0.03);
      });
    } catch {}
  };
  return {
    prefs,
    set(k, v) { prefs[k] = !!v; save(); },
    tap() { buzz(12); tone([880], 0.06); },
    fav(on) { buzz(on ? [10, 40, 18] : 8); tone(on ? [660, 990] : [520], 0.08); },
    success() { buzz([16, 50, 16, 50, 34]); tone([523, 659, 784, 1047], 0.14); },
    warn() { buzz([30, 40, 30]); },
  };
})();
// Two tiny toggles in the footer so sound can be turned on (and haptics off).
(() => {
  const host = document.querySelector(".footer-bottom");
  if (!host) return;
  const box = document.createElement("span");
  box.className = "fx-toggles";
  host.append(box);
  const label = (k, name) => `${t(name)}: ${t(window.kdFx.prefs[k] ? "On" : "Off")}`;
  const paint = () => {
    box.innerHTML = [["haptics", "Haptics"], ["sound", "Sound"]].map(([k, n]) => `<button type="button" class="fx-btn" data-fx="${k}" aria-pressed="${window.kdFx.prefs[k]}">${escapeHTML(label(k, n))}</button>`).join("");
  };
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-fx]");
    if (!b) return;
    const k = b.dataset.fx;
    window.kdFx.set(k, !window.kdFx.prefs[k]);
    paint();
    if (window.kdFx.prefs[k]) window.kdFx.tap();
  });
  paint();
  new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();

// ---------- 3. order-placed celebration ----------
function celebrateOrder(o) {
  try {
    const key = "kd_celebrated_" + o.order_number;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {}
  window.kdFx?.success();
  if (kdReduced() || (navigator.connection && navigator.connection.saveData)) return;
  const c = document.createElement("canvas");
  c.className = "kd-confetti";
  c.setAttribute("aria-hidden", "true");
  document.body.append(c);
  const ctx = c.getContext("2d");
  if (!ctx) { c.remove(); return; }
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let W = 0, H = 0;
  const size = () => { W = innerWidth; H = innerHeight; c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  size();
  const COLORS = ["#8b5cf6", "#a78bfa", "#c4a8ff", "#d946ef", "#e879f9", "#6366f1", "#818cf8", "#fde047"];
  const weak = innerWidth < 700 || (navigator.hardwareConcurrency || 4) <= 2;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const h1 = document.querySelector(".order-done h1");
  const r = h1 ? h1.getBoundingClientRect() : null;
  const ox = r ? r.left + Math.min(r.width, 360) / 2 : W / 2, oy = r ? r.top + r.height / 2 : H * 0.3;
  const ps = [];
  const burst = (n, x, y, spread, power) => {
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + rnd(-spread, spread), v = rnd(power * 0.45, power);
      ps.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: rnd(6, 11), h: rnd(4, 7), rot: rnd(0, 6.28), vr: rnd(-0.3, 0.3), col: COLORS[(Math.random() * COLORS.length) | 0], star: Math.random() < 0.22, life: 0, max: rnd(1900, 2900) });
    }
  };
  const N = weak ? 55 : 95;
  burst(N, ox, oy, 1.15, 15);
  setTimeout(() => { burst(Math.round(N * 0.45), W * 0.12, H * 0.8, 0.5, 21); burst(Math.round(N * 0.45), W * 0.88, H * 0.8, 0.5, 21); }, 260);
  let last = performance.now(), raf = 0;
  const step = (now) => {
    const dt = Math.min((now - last) / 16.67, 3); last = now;
    ctx.clearRect(0, 0, W, H);
    let alive = 0;
    for (const p of ps) {
      p.life += dt * 16.67;
      if (p.life > p.max || p.y > H + 30) continue;
      alive++;
      p.vy += 0.34 * dt; p.vx *= 0.985; p.vy *= 0.985;
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      const fade = Math.min(1, (p.max - p.life) / 500);
      ctx.save();
      ctx.globalAlpha = Math.max(0, fade);
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.col;
      if (p.star) {
        const R = p.w * 0.7, q = R * 0.22;
        ctx.beginPath();
        ctx.moveTo(0, -R); ctx.quadraticCurveTo(q, -q, R, 0); ctx.quadraticCurveTo(q, q, 0, R); ctx.quadraticCurveTo(-q, q, -R, 0); ctx.quadraticCurveTo(-q, -q, 0, -R);
        ctx.fill();
      } else {
        ctx.scale(1, Math.abs(Math.cos(p.rot * 1.7)) * 0.8 + 0.2);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    }
    if (alive && !document.hidden) raf = requestAnimationFrame(step);
    else { cancelAnimationFrame(raf); c.remove(); removeEventListener("resize", size); }
  };
  addEventListener("resize", size, { passive: true });
  raf = requestAnimationFrame(step);
  setTimeout(() => { if (c.isConnected) { cancelAnimationFrame(raf); c.remove(); } }, 6000);
}

// ---------- 4a. swipe a cart item to remove it (touch only) ----------
function kdUndoToast(row, idx, name) {
  const el = $("#toast");
  if (!el) return;
  el.innerHTML = `<span class="toast-rich"><span class="toast-msg">${escapeHTML(t("{0} removed from cart.", name))}</span><button type="button" class="toast-link" id="toastUndo">${escapeHTML(t("Undo"))}</button></span>`;
  $("#toastUndo").onclick = () => {
    el.classList.remove("show");
    if (!state.cart.some((x) => cartKey(x) === cartKey(row))) state.cart.splice(Math.min(idx, state.cart.length), 0, row);
    saveCart();
    if ((location.pathname.replace(/\/$/, "") || "/") === "/cart") renderCartPage();
    window.kdFx?.tap();
  };
  el.classList.add("show");
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => el.classList.remove("show"), 5000);
}
function kdEnhanceCartSwipe() {
  const list = document.querySelector(".cart-page-items");
  const touch = "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0;
  if (!list || !touch || list.dataset.swipe) return;
  list.dataset.swipe = "1";
  const trash = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5"/></svg>';
  list.querySelectorAll(".cart-page-item").forEach((item) => {
    const row = document.createElement("div");
    row.className = "swipe-row";
    row.innerHTML = `<div class="swipe-bg" aria-hidden="true"><span>${trash} ${escapeHTML(t("Remove"))}</span><span>${escapeHTML(t("Remove"))} ${trash}</span></div>`;
    item.before(row);
    row.append(item);
    let id = null, sx = 0, sy = 0, dx = 0, lock = "", t0 = 0, dragged = false;
    const reset = () => { item.style.transition = "transform .25s cubic-bezier(.2,.8,.2,1)"; item.style.transform = ""; row.classList.remove("is-dragging"); row.style.removeProperty("--swp"); };
    item.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" || id !== null) return;
      id = e.pointerId; sx = e.clientX; sy = e.clientY; dx = 0; lock = ""; t0 = performance.now(); dragged = false;
      item.style.transition = "none";
    });
    item.addEventListener("pointermove", (e) => {
      if (e.pointerId !== id) return;
      const mx = e.clientX - sx, my = e.clientY - sy;
      if (!lock) {
        if (Math.abs(mx) < 9 && Math.abs(my) < 9) return;
        lock = Math.abs(mx) > Math.abs(my) * 1.2 ? "x" : "y";
        if (lock === "x") { try { item.setPointerCapture(id); } catch {} row.classList.add("is-dragging"); }
      }
      if (lock !== "x") return;
      dragged = true;
      const w = item.offsetWidth || 300;
      dx = Math.sign(mx) * Math.min(Math.abs(mx), w * 0.9);
      item.style.transform = `translateX(${dx}px)`;
      row.style.setProperty("--swp", Math.min(1, Math.abs(dx) / (w * 0.3)).toFixed(2));
    });
    const end = (e) => {
      if (e.pointerId !== id) return;
      id = null;
      if (lock !== "x") return;
      const w = item.offsetWidth || 300, v = Math.abs(dx) / Math.max(1, performance.now() - t0);
      if (Math.abs(dx) > w * 0.38 || (v > 0.6 && Math.abs(dx) > 70)) {
        window.kdFx?.warn();
        const key = item.querySelector("[data-remove]")?.dataset.remove;
        const gone = state.cart.find((x) => cartKey(x) === key);
        const idx = gone ? state.cart.indexOf(gone) : -1;
        const p = gone && state.products.find((x) => x.id === gone.product_id);
        item.style.transition = "transform .18s ease-in";
        item.style.transform = `translateX(${Math.sign(dx) * (w + 40)}px)`;
        row.style.transition = "height .2s ease, margin .2s ease, opacity .2s ease";
        row.style.height = row.offsetHeight + "px";
        setTimeout(() => {
          row.style.height = "0px"; row.style.marginBottom = "-12px"; row.style.opacity = "0";
          setTimeout(() => {
            dragged = false; // let the programmatic press through the click guard below
            item.querySelector("[data-remove]")?.click();
            if (gone && idx >= 0) kdUndoToast(gone, idx, p ? pName(p) : "");
          }, 200);
        }, 170);
      } else reset();
    };
    item.addEventListener("pointerup", end);
    item.addEventListener("pointercancel", (e) => { if (e.pointerId === id) { id = null; reset(); } });
    // a swipe that started on a button must not also press it
    item.addEventListener("click", (e) => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } }, true);
  });
}

// ---------- 4b. drag-down handle on bottom sheets (phones) ----------
function kdSheetInit(backdrop) {
  const modal = backdrop && backdrop.querySelector(".modal");
  if (!modal) return;
  const grip = modal.querySelector(".sheet-grip"), head = modal.querySelector(".modal-head");
  if (grip) grip.title = t("Drag down to close");
  let id = null, sy = 0, dy = 0, t0 = 0, handle = null;
  const sheetMode = () => { try { return matchMedia("(max-width:700px)").matches; } catch { return false; } };
  const down = (e) => {
    if (!sheetMode() || id !== null || e.button || e.target.closest("button,a,input,select,textarea")) return;
    id = e.pointerId; sy = e.clientY; dy = 0; t0 = performance.now(); handle = e.currentTarget;
    try { handle.setPointerCapture(id); } catch {}
    modal.style.animation = "none"; modal.style.transition = "none";
  };
  const move = (e) => {
    if (e.pointerId !== id) return;
    dy = Math.max(0, e.clientY - sy);
    modal.style.transform = `translateY(${dy}px)`;
    backdrop.style.opacity = String(Math.max(0.15, 1 - dy / (modal.offsetHeight * 0.9)));
  };
  const up = (e) => {
    if (e.pointerId !== id) return;
    id = null;
    const v = dy / Math.max(1, performance.now() - t0);
    modal.style.transition = "transform .22s cubic-bezier(.2,.8,.2,1)";
    backdrop.style.transition = "opacity .22s ease";
    if (dy > 110 || (v > 0.55 && dy > 40)) {
      modal.style.transform = "translateY(105%)"; backdrop.style.opacity = "0";
      setTimeout(closeModal, 200);
    } else { modal.style.transform = ""; backdrop.style.opacity = ""; }
  };
  [grip, head].forEach((h) => { if (!h) return; h.addEventListener("pointerdown", down); h.addEventListener("pointermove", move); h.addEventListener("pointerup", up); h.addEventListener("pointercancel", up); });
}

// ---------- 5. skeletons ----------
function skCategoryHTML(fav) {
  return `<section class="collection-page container category-page sk-page" aria-busy="true" aria-label="${escapeHTML(t("Loading..."))}"><div class="sk sk-line w40" style="margin:0 0 16px;width:min(220px,50%)"></div><div class="sk sk-title" style="width:min(300px,70%);margin:6px 0 10px"></div><div class="sk sk-line w40" style="margin:0 0 26px;width:min(140px,40%)"></div><div class="product-grid">${skGridHTML()}</div></section>`;
}
function skPopularHTML() {
  return Array.from({ length: 4 }, () => `<div class="sk-pop-card" aria-hidden="true"><div class="sk sk-pop-img"></div><div class="sk sk-line w40"></div><div class="sk sk-line w80"></div><div class="sk sk-line w60"></div></div>`).join("");
}
function skBundleHTML() {
  return `<div class="sk-bundle" aria-hidden="true">${Array.from({ length: 2 }, () => `<div class="sk-cart-row"><div class="sk sk-thumb"></div><div class="sk-stack"><div class="sk sk-line w80"></div><div class="sk sk-line w40"></div></div></div>`).join("")}</div>`;
}
function skRowsHTML() {
  return `<div class="sk-rows" aria-busy="true" aria-label="${escapeHTML(t("Loading..."))}">${Array.from({ length: 3 }, () => `<div class="sk sk-row"></div>`).join("")}</div>`;
}
// Pictures fade in over a shimmer instead of popping in. The class is only added once this script is running,
// and a 5 second failsafe makes sure a picture is never left hidden.
(() => {
  const IMG = [".product-image", ".popular-product-image", ".cart-page-image", ".saved-later-img", ".bundle-img"].map((s) => s + " img").join(",");
  const mark = (img) => img.classList.add("img-loaded");
  const scan = (root) => {
    const list = root.matches && root.matches(IMG) ? [root] : [];
    if (root.querySelectorAll) root.querySelectorAll(IMG).forEach((i) => list.push(i));
    list.forEach((img) => {
      if (img.classList.contains("img-loaded") || img.__kdw) return;
      img.__kdw = 1;
      if (img.complete) mark(img); else setTimeout(() => mark(img), 5000);
    });
  };
  document.addEventListener("load", (e) => { if (e.target && e.target.tagName === "IMG") mark(e.target); }, true);
  document.addEventListener("error", (e) => { if (e.target && e.target.tagName === "IMG") mark(e.target); }, true);
  new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1) scan(n); }).observe(document.body, { childList: true, subtree: true });
  scan(document.body);
  document.documentElement.classList.add("kd-imgfx");
})();
