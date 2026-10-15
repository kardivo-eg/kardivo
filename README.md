# Kardivo V62 — Per-product accent colours

- **What it does**: every product picture is read once in the browser and three colours are taken from it (the dominant colour plus two others). Black, white, grey and anything close to them are ignored, so a logo on a white or black background still gives its real colours. A picture with only one colour family gets two neighbouring hues so there are always three. A picture with no real colour (pure greyscale) keeps the normal purple look.
- **Where it shows**: product grids, search results and category pages, featured picks, favorites, recommendations ("You may also like", "Recently viewed"), cart items, saved-for-later, "complete your bundle", the bundle builder, the search dropdown, quick view, the added-to-cart toast, category cards, the hero tiles, the promotional campaign banner (from its own picture) and the product page. On the product page the whole page background and glow take the colours too, and go back to normal when you leave.
- **How**: new block "V62 PRODUCT TINT" at the end of `public/app.js` and `public/styles.css`. It sets `--kd-a`, `--kd-b`, `--kd-c` and `data-kd-tint` on whatever element shows the product; the CSS paints only from those variables. Pictures are sampled when they are near the screen, three at a time, and the result is cached per picture URL in `localStorage` (`kd_tint_v1`, up to 600 entries), so a repeat visit tints on first paint. Light theme, Arabic (RTL) and phones are covered. Browsers without `color-mix()` simply keep the old look.
- **Worker**: new `GET /api/tint-image?u=<https url>`. Pictures on another website usually forbid reading their pixels, so the browser asks this route to relay them. It only relays https pictures the store already uses (a product cover or gallery image, or the campaign image), images only, 6 MB max, so it is not an open proxy. Pictures uploaded to the store (`/media/product/...`) never need it.
- No schema or migration changes. `sw.js` cache v39, `app.js?v=55`, `styles.css?v=48`. Only `public/` and `worker.js` were changed.
- Tested in headless Chromium against a mock catalogue (white, black and grey backgrounds, transparent PNG, greyscale, single-colour, and a picture on another origin without CORS), dark and light, English and Arabic, desktop and phone width. Not tested: the real Worker/D1 relay route (syntax-checked only; the mock stood in for it), real Safari/iOS.
- Admin screens are not tinted (storefront only).

---

# Kardivo V61 — "Feel" upgrades, hero lights removed

- **Removed**: the V59 string of lights over the hero (code and CSS). The sparkles on the hero picture, the category ticker, the glow and the particles are untouched.
- **Page transitions** (View Transitions API): home, product, cart, category, favorites and confirmation cross-fade; header, tab bar and toast stay put. Tapping a product card makes its picture grow into the product page (the product page shows the card picture instantly while the details load). Browsers without the API, and people who ask for reduced motion, get the old behaviour. Account/admin routes are left as before. The browser Back button is not animated on purpose (it avoids a double animation with iOS swipe-back).
- **Haptics and sound**: a short vibration on add-to-cart, favourite and order placed; an optional soft tone (off by default). Two small toggles in the footer (Haptics / Sound), saved in `localStorage` (`kardivo_fx`). Android/Chrome uses `navigator.vibrate`. iOS Safari has no vibrate API, so a hidden `<input type="checkbox" switch>` is toggled for a light tick (iOS 17.4+, best effort, untested on a real iPhone).
- **Order-placed celebration**: purple/gold confetti and sparkles plus an animated check on the confirmation screen, once per order (a refresh does not replay it). Off for reduced motion and data-saver.
- **Swipe gestures (touch only)**: swipe a cart item left or right to remove it (with an **Undo** toast); drag-down handle on bottom sheets (drag the handle or the title bar). Product photos already swipe (scroll-snap) and are unchanged.
- **Skeletons**: popular products, category page and favorites while loading; the cart's "complete your bundle" box (only if the answer takes over 350 ms, so it never flickers); the account orders list; card, cart and saved-item pictures now fade in over a shimmer.
- New code is the "V61 FEEL LAYER" block at the end of `public/app.js` and `public/styles.css`. Small hooks were added to `navigate`, `route`, `addToCart`, `toggleFavorite`, `renderCartPage`, `renderOrderConfirmed`, `openModal`, `showBootSkeleton`, `loadCartBundles`.
- No server, schema or API changes. `sw.js` cache v38, `app.js?v=54`, `styles.css?v=47`.
- Tested in headless Chromium against a mocked API (44 checks: transitions used, no leftover transition names, vibrate calls, toggle, confetti paints and cleans up, no replay, reduced motion, boot skeletons, touch swipe short/long/vertical, undo, sheet drag small/large, no JS errors). Not tested: real iPhone/Android hardware (haptics, sound, swipe feel), Safari, real Cloudflare.
- Note: the files in the project root (`app.js`, `styles.css`, `index.html`, `sw.js`) are older copies; the live site serves `public/` (see `wrangler.toml`), and only `public/` was changed.

---

# Kardivo V57 — Flash-sale countdown + richer WhatsApp sharing

- **Flash-sale countdown (display only)**: Admin > Settings > "Flash-sale countdown". Set "Sale ends at" (your local time), a label (Arabic version in the Arabic section), and whether to show it on the homepage campaign banner and on product pages. A product page shows the timer only when the selected option has an old (crossed-out) price, and it follows the option picker. Empty date = no countdown. **Prices never change when the sale ends**: the timer just disappears, so remove the old prices yourself afterwards (Bulk edit > price % helps).
- **Reliable clock**: the server sends its own time with the public settings and the timer counts against that, so a customer's phone with the wrong date or timezone still sees the right remaining time. The server also stops sending a sale once it has ended, and a timer on screen hides itself the second it reaches zero. A single 1-second timer drives every countdown on the page and stops when none is visible.
- **WhatsApp share**: product pages (which already had a Share button) now have a **WhatsApp** button next to it that opens WhatsApp directly, and both buttons send a better message: product name, price ("Price from" the lowest option when there are options; the old price too when discounted), and the link. English pages share the `?lang=en` link, Arabic pages the plain link. The Share button still opens the phone's share sheet when available and falls back to WhatsApp. The link preview image/title/description come from the existing `og:` tags (no new image generation).
- Phone layout: Add to cart full width, Share and WhatsApp side by side, Back to store below. Styles cover the light theme, Arabic (RTL) and reduced motion.
- No schema or migration changes: five new settings (`sale_ends_at`, `sale_label`, `sale_label_ar`, `sale_on_banner`, `sale_on_products`) come from the built-in defaults. `sw.js` cache v36, `app.js?v=50`, `styles.css?v=43`.
- Tested: in headless Chromium against a mocked API (server-clock skew, ticking, variant switching, toggles, expiry while on the page, share text in English and Arabic, native share vs `wa.me` fallback) and the real `worker.js` against a SQLite-backed D1 shim (public filtering of an ended sale, date validation, nothing half-saved on a bad date, non-admin blocked). Not tested: real Cloudflare, real WhatsApp, iOS Safari. Verify on staging: set a sale ending in 5 minutes, watch it on a phone and let it expire.
- Not included: per-product sale dates (one store-wide end date for now) and the countdown on product cards in the grid.

---

# Kardivo V56 — AI SEO text + AI image cleanup

- **AI SEO text**: product form > "Search / SEO text" > "✨ Write SEO text". Gemini writes the meta title (about 60 chars), meta description (about 155) and search keywords in Arabic and English from the product's name, category, platform, region and descriptions (no web search, only the facts you entered; it is told never to invent prices, discounts or guarantees). It fills only empty fields unless "Replace existing" is ticked, and nothing is saved until you press Save product. Admin > Products > **✨ AI SEO text** does the same for every product missing a meta title/description, one at a time, saving only empty fields (`POST /api/admin/ai/seo` with `product_id` + `save`).
- **Product pages now use the SEO fields**: `<title>`, `<meta name="description">`, `og:title/og:description`, JSON-LD description and a new `<meta name="keywords">` (the tab title too). Arabic pages use the Arabic fields and English pages the English ones; empty fields fall back to the old behaviour (product name + description). The store name is appended to the title only when the result stays under about 65 characters.
- **AI image cleanup**: product form > "✨ Clean up with AI" sends the uploaded file (or the Image URL) to a Gemini image model and shows a **preview**; "Use this image" puts it in the upload field and it is stored on Save. Select products in the list and press **✨ Clean images** for a bulk run (saved immediately, no preview, one at a time, original kept). The first cleanup remembers the original in `products.image_original`; "Restore original image" in the edit form (or `POST /api/admin/products/:id/restore-image`) puts it back. The prompt tells the model to keep logos and text exactly as they are and to remove screenshot clutter. Settings > AI auto-fill has two new fields: image model (default `gemini-2.5-flash-image`; change it if Google retires it) and the cover background description, so every cover matches. Image calls are limited to 60 per admin per hour (text AI keeps its 300).
- **Schema version 17**: adds nullable columns `meta_title`, `meta_description`, `meta_title_ar`, `meta_description_ar`, `seo_keywords`, `seo_keywords_ar`, `image_original` to `products` (runs automatically on the first request). Saving a product from an older cached admin page keeps the stored SEO fields. `image_original` is never sent to the storefront.
- `sw.js` cache v35, `app.js?v=49`. CSV export/import does not include the SEO columns yet.
- Not covered: a real Worker/D1/Gemini run. The Gemini calls were run against a mocked API (SEO parsing and length limits, image result, retry without `imageConfig`, refusal text, 429) and the SQL against SQLite. Verify on staging with your real key: (1) cleanup on 3 or 4 products with text-heavy art, since image models can still change small text, (2) view-source on a product page for the new title/description, (3) that your key and billing allow the image model.

---

# Kardivo V54 — Product CSV import/export, scroll fix, Gemini auto-fill

- **Export / Import CSV** on Admin > Products (plus a template download). Export includes every product (hidden too) with options as `Name:Price[:OldPrice] | Name2:Price2`. Import shows a preview (new / updated / skipped) before anything is written, matches products by `id`, then `slug`, then the name, and never erases existing data with a blank cell. Unknown categories are created. Existing options are matched by name and repriced; options missing from the file are left alone. New endpoint: `POST /api/admin/products/import` (chunks of at most 60 rows; each chunk is one D1 batch).
- **Scroll position kept**: saving, cancelling, hiding or deleting a product no longer jumps the admin page to the top.
- **AI auto-fill (Gemini)**: "Auto-fill with AI" button in the product form. It uses the typed name, the image (uploaded file or Image URL) and Google Search grounding to fill the Arabic name, both descriptions, platform, region and category. By default it only fills empty fields; "Replace existing text" overwrites. Nothing is saved until you press Save. Configure in Admin > Settings > AI auto-fill: API key, model (default `gemini-3.8-flash`, change it if Google retires it), optional extra instructions. The key is stored in the `settings` table, never returned to the browser, and removed from `/api/settings/public` and `/api/admin/settings`. A `GEMINI_API_KEY` Worker secret (`wrangler secret put GEMINI_API_KEY`) takes priority over the saved key. Limited to 300 AI requests per admin per hour.
- **AI fill missing** (Admin > Products): fills every product that lacks an Arabic name or a description, one at a time, empty fields only (never names or prices). Can be stopped; waits and retries once on a Gemini rate limit.
- **Dashboard revenue chart**: SVG bars per day (per week above 90 days), empty days included, 7-day average line, axis labels and hover details.
- **Bulk edit** (Admin > Products): tick products, then set category, show/hide, feature/unfeature or change price (and old price) by a percentage. Options (variants) are not repriced.
- **AI draft reply** (order > Support thread > "✨ Draft"): Gemini reads the order facts and recent messages and drafts a reply in the customer's language. It never sends anything; you edit and press Send. Endpoint `POST /api/admin/ai/reply`.
- No schema changes. `sw.js` cache v34, `app.js?v=48`.
- Not covered: a real Worker/D1/Gemini run. Import logic was run against SQLite and the Gemini call against a mocked API. Verify on staging with your real key and a few products first.

---

# Kardivo V50 — Balance, rewards, and checkout hardening

## Changes in this build
- Product cards and product detail pages preview estimated reward points and their proportional EGP value using the configured loyalty rules. Variant changes refresh the preview.
- The customer account reward panel now includes available points, redemption value, lifetime points earned, points redeemed, and recent balance-ledger activity.
- Points redemption can be limited by an admin-configurable percentage of the remaining order total (`loyalty_max_redeem_percent`, default 50%). The existing server-side points and store-credit calculation remains authoritative, and promo codes can be used in the same order as both.
- All coupon, referral, automatic, and bundle discounts are capped server-side at 5% of cart subtotal. The admin Discounts page calls out the cap.
- Fixed loyalty point arithmetic to preserve fractional EGP order totals instead of truncating each order to an integer.
- Bumped the public asset versions and service-worker shell cache so clients fetch the updated UI.
- No products, customers, orders, inventory, or payment records are deleted or rewritten by this update. The existing additive migration path remains in place.

## Deployment verification
- Run `node --check worker.js` and `node --check public/app.js`.
- Deploy to staging first. Verify a coupon discount never exceeds 5% of subtotal, and verify checkout allows coupon + store credit + points together while respecting the configured points redemption cap.
- Place and fulfil a paid test order, confirm the account shows earned points and ledger history, then cancel/refund a separate test order to validate the existing order/refund lifecycle.

---


- Customers earn points on delivered, paid orders (default 1 point per EGP of the cash total, store credit used excluded) and spend them at checkout (default 10 points = 1 EGP) with a "Use reward points" switch next to "Use store credit". Whole blocks only, capped by what is left to pay. The account popup shows the balance and what it is worth. EN/AR.
- When an order is placed, the points used are converted to store credit and spent through the normal credit path, so a cancelled or refunded order gets the value back as store credit (not points). The order shows it as "Store credit". Each conversion is written to `kd_credit_ledger` (reason `points_redeem`) and tracked in `users.points_redeemed` (added automatically).
- Points are computed from orders, so refunded or cancelled orders drop out automatically. If an order is refunded after its points were spent, the credit stays.
- Admin > Settings > Growth: `loyalty_enabled` (on by default), points per EGP, points per reward, credit per reward. Defaults are a 10% return, so check them against your margins.
- Not covered: a real Worker/D1 run. `sw.js` cache v31, `?v=41`. Verify on staging: deliver an order, then check out with the points switch on, and cancel that order to see the credit come back.

---

# Kardivo V40 — Checkout polish: remembered choices, live coupons, copy buttons, proof compression, confirmation page

- **Remembered on this device**: the last payment method used and an optional phone / WhatsApp number are saved in the browser (per signed-in account, key `kardivo_checkout_prefs:<user id>`) and pre-selected next time. The phone number is NOT sent to the server or stored on the order; it only prefills the field and is added to the prefilled WhatsApp "send proof" message.
- **Live coupon feedback**: the code is checked about 0.65 s after typing stops (one request per code, stale answers are ignored). A valid code shows "Code applied. You save X" and updates the total; a bad code shows the reason under the field and the total goes back to the price without it. The Worker now tells apart *expired*, *usage limit reached* and *minimum order not met* (all three used to say "invalid, expired, or doesn't apply"). Unknown codes and codes that don't fit the cart keep the old message. Arabic included.
- **Copy buttons**: next to the checkout total, and on the confirmation page for the order number, exact total and payment number. Totals copy as a plain number (`900` or `900.50`, no currency or separators). Works on plain-HTTP/in-app browsers through a fallback, and only says "Copied" if it worked. Delivery codes keep the old behaviour (the value is not echoed in the toast).
- **Payment proof**: phone screenshots over 400 KB are redrawn as JPEG (longest side 2000 px, quality 0.82) in the browser before upload; GIFs are left alone; HEIC is converted where the browser can decode it. A thumbnail shows the file name and "Reduced from 7.2 MB to 885 KB" with a remove button. Applies to checkout and to the proof upload in the account popup. The 8 MB server limit is unchanged.
- **Order confirmation page** `/order-confirmed` (replaces the "Order placed" popup; kept in `sessionStorage`, so a refresh keeps it; `noindex`): order number, exact amount and where to pay, estimated wait, next steps, a WhatsApp button prefilled with the order number (amount, method and phone too when no proof has been uploaded yet), and a "Track order" button to /account.
- **New setting** `order_eta` (+ `order_eta_ar`) in Admin > Settings > Support & footer: the estimated wait shown on the confirmation page. When empty it shows the existing "Usually delivered in 5–15 min after payment confirmed."
- Also fixed: the "Store credit − 0.00" row (and credit switch) showed in the checkout summary even when hidden.
- No schema or migration changes. `sw.js` cache v30; `?v=40` on app.js and styles.css. Root-level legacy copies were left alone as before.
- Not covered by tests here: a real Cloudflare Worker with D1/R2. The frontend was exercised in Chromium against a mocked API (EN/AR, phone viewport, secure and non-secure context) and `evalDiscount` was run directly. Verify on staging: place an order with a coupon, with and without a proof, then open /order-confirmed after a refresh.
- Rate limit note: `/api/discount/check` allows 60 requests per IP per 15 minutes. Live checking adds about one request per code typed, which is fine for single users but worth watching for customers behind shared mobile IPs.

---

# Kardivo V39 — Quick view, savings badges, trending search, cart bundles, save for later, reorder

- **Quick view**: eye button on every product card opens a small dialog with price, options (denominations), stock and Add to cart, without leaving the grid.
- **Savings badge**: cards with an old price show "Save 15%" (or "Save 50 EGP" when the amount reads bigger) plus a "You save X" line. Arabic included.
- **Search chips**: under the search box before typing: recent searches (with Clear) and **Trending now**, built from real views, cart adds and sales of the last days. Falls back to featured products/categories until there is activity.
- **Cart bundle suggestions**: "Add X, your discount becomes Y". Each suggestion is tested against the same engine that prices the order. The cart also shows the automatic discount and an estimated total.
- **Automatic bundles (no rule to create)**: a cart with 2+ different products gets a discount automatically: half of the maximum with 2 products, the full maximum with 3+. Capped by BOTH Settings > Growth: maximum % (default 10) and maximum amount (default 100 EGP), and never below a product's cost price when one is recorded. An automatic offer you create yourself still wins if it gives more. Switch off or change in Admin > Settings > Growth & email.
- **Save for later**: moves a cart item to favorites; a "Saved for later" strip under the cart brings it back.
- **Reorder**: button in Account > order history; puts the items back in the cart using current stock and options.
- Schema version 15 adds one nullable column (`checkout_events.product_id`) and four settings; no existing data is touched.

---

# Kardivo V35 — Customer order push + "Message us about this order"

- Customers can turn on **order notifications** on /account. They get a push when payment is confirmed, the order is in progress, delivered, cancelled, refunded, when a payment proof must be re-sent, and when support replies. Texts follow the order's language and never include codes or amounts. Needs the existing VAPID keys (`node scripts/generate-vapid.mjs`).
- Customer subscriptions live in their own table (`kd_customer_push`), separate from the admin ones, so admin alerts never reach customers. Schema version 14 creates the tables automatically on first request.
- **Message us about this order**: a WhatsApp link with the order number prefilled, in the order history on /account and in the account popup. It uses the "WhatsApp number" setting and is hidden when that is empty.
- Restored `orderBlock()` in `public/app.js`; the account popup referenced it but it only existed in the old root `app.js`.
- Automatic WhatsApp status messages are NOT included: that needs the WhatsApp Business Cloud API (Meta account, approved message templates, an access-token secret).

---

# Kardivo V14 — Hero, Checkout & Currency Correction

- Removed the floating product cards from the hero; the original logo asset remains intact and fully opaque.
- Kept the editable promotional campaign directly after the complete hero (logo, headline, and copy), with a clearer purple titanium-glass treatment.
- Removed the guest checkout path and the separate “Continue as guest” account tab. Checkout now asks the customer to log in or create an account, then returns them to checkout automatically. Existing historical guest orders remain unchanged.
- Added a USD/EGP display toggle beside EN/AR. EGP is the default on every page load. The USD equivalent uses the admin-editable “EGP per 1 USD” setting (default 50); change it to match the rate you want to display. This is display-only: checkout totals, payment instructions, and order records remain in EGP.
- No schema or migration changes; existing database records are not touched by these UI changes.

## Validation

Syntax and static checks are run for this package. A real browser session, deployed Cloudflare Worker, D1, R2, and live checkout still require staging verification.

---

# Kardivo V13 — Storefront & Admin Upgrade

## What is materially new in V13
- **Cinematic, product-led hero:** the homepage now features up to three real products from the existing catalog in floating glass tiles. No hardcoded product IDs or placeholder `Test` product are used; cards are rendered from the live products API and link to the actual product pages.
- **New product discovery controls:** filter the catalog to available products, products with an actual old-price discount, or manual-delivery products. A live result count explains how many products match.
- **Relevance-ranked search:** multi-word searches score product-name matches above description/category matches, while the chosen explicit sort order remains respected. Suggestions use the same match logic.
- **Admin quick actions:** dashboard shortcuts jump to payment review, product management, variation management, and storefront/campaign settings. Existing review queue, safe variation preview/undo, audit trail, delivery messaging, proof uploads, stock jobs, and rate limiting are retained.
- **Updated service-worker cache version** so returning installations can fetch the new CSS and JavaScript instead of staying on the old cached shell.
- **No schema or migration changes:** `schema.sql` and `migration-v4.sql` are unchanged; this build does not delete, rewrite, or re-key existing products, customers, orders, inventory, or settings.

## Checks performed
- JavaScript syntax check for `public/app.js` and `worker.js`.
- Static checks for new discovery controls, hero rendering, admin jump actions, and service-worker cache version.
- Compared schema and migration files against V12 and verified ZIP integrity.
- Not tested against a live Cloudflare deployment, real D1/R2, or browser checkout; deploy to staging and verify product listing, Arabic/English switching, product links, and admin actions before production.

---

# Kardivo V12

## V12 phase additions (on top of V11)
- Editable homepage campaign banner: show/hide, English and Egyptian Arabic eyebrow/headline/description/button text, destination link, and optional artwork URL, all managed from Admin → Settings.
- Search suggestions show matching existing products with artwork, category, and current price while typing. Existing search/filter/sort behavior remains in place.
- Existing variation manager, review queue, customer delivery messages, payment-proof uploads, audit log, rate limits, and reservation cleanup were retained rather than reimplemented.
- No schema.sql edits or destructive data migrations were introduced in this phase. Campaign settings are additive key/value settings seeded with `INSERT OR IGNORE` by the existing settings bootstrap.

## Verification performed
- `node --check public/app.js`
- `node --check worker.js`
- ZIP integrity and file inventory checked after packaging.

These checks do not replace a live Cloudflare Worker/D1/R2 deployment test. Test the new campaign in both languages and verify checkout and admin actions in staging before deploying to production.

---

# Kardivo V10

Everything is additive: existing orders, products, codes and settings are untouched. New tables/columns are created automatically on the first request (versioned, so it costs almost nothing afterwards).

## What's new
**Admin**
- **Needs review** tab: unpaid orders with an uploaded proof, proof shown inline, one-click *Mark paid & deliver* (codes are assigned automatically; for manual products type the delivery message first), *Reject proof* (customer is told to re-send), duplicate warnings. Badge counts show on the tabs.
- **Dashboard**: checkout funnel (started vs completed, from `checkout_events`), revenue chart, top products with revenue / cost / profit, low-stock list, automatic-job status, backups.
- **Orders**: CSV export (date/status filters), status timeline (placed / proof received / paid / delivered with times), support thread with the customer, WhatsApp button with a pre-filled delivery message (optionally with codes), refund with required reason code, dispute log, **Refunds & disputes** tab showing which products cause the most problems.
- **Digital codes**: CSV import (columns `code,product,option`; product may be id, slug or exact name), supplier and unit cost per batch, per-product low-stock threshold and cost price on the product form.
- **Discounts**: percentage or fixed, limited to one product or category, first-order-only, minimum quantity, and automatic offers (e.g. buy 3, get 10% off). Only the single best offer applies; offers never stack.
- **Back-in-stock** list, review **Feature** toggle (testimonials strip), review photos.
- **Settings > Growth & email**: referral program, email-codes toggle, testimonials toggle, backup retention.

**Customers**
- Password reset by email, delivery email, back-in-stock email.
- "Notify me when back in stock", recently viewed and "you may also like" rows, testimonials strip, review photos.
- Referral codes: a friend gets a first-order discount, the referrer gets store credit after the friend's order is delivered. Store credit can be spent at checkout.
- Order timeline and a support thread per order on the Track order page.
- Installable app (PWA).

**Operations**
- Cron (hourly): releases expired reservations, low-stock alert; daily at 03:00 UTC: database backup to R2 (gzip SQL dump, rotated).
- Admin push notification on new order, proof upload, customer message, duplicate payment.
- Duplicate-payment detection: same proof image (SHA-256) or same transfer reference.
- Arabic-first SEO: Arabic titles/descriptions in link previews, sitemap with `hreflang` alternates, `?lang=en` for English, canonical URLs.

- **Combine products** was rebuilt: tick the products, name each option and set its price, preview, combine into a new product or an existing one, and undo per option or all at once (not once an option has been ordered).

## Deploy
1. Keep your own `[[d1_databases]]` block (binding `DB`) and any R2 binding. `wrangler.toml` here now has `run_worker_first = ["/*", "!/styles.css", ...]`, which fixes `/sitemap.xml`, `/robots.txt`, `/media/*` and product link previews being served the SPA page, and a `[triggers]` cron.
2. `wrangler deploy`
3. Optional secrets (features simply stay off without them):
   - Email: `wrangler secret put RESEND_API_KEY` (or `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `MAILGUN_REGION`) and set `EMAIL_FROM` in `[vars]`.
   - Push: `node scripts/generate-vapid.mjs`, then `wrangler secret put VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY`, set `VAPID_SUBJECT`. Open Admin > Settings on your phone and press *Turn on for this device* (on iPhone, install the app to the home screen first).
4. Backups need an R2 bucket binding. To restore: download a backup from Dashboard > Database backups, `gunzip` it, and run it with `wrangler d1 execute <db> --file backup.sql` against an empty database.

## Security note
`/media/product/` used to serve any R2 key. It now serves only `products/` images, so payment proofs and backups can't be fetched through it.

## Limits worth knowing
- First-order checks are weaker for guests (matched by contact details).
- Duplicate detection only catches identical files or identical references, not re-screenshots.
- Revenue figures are before order-level discounts; profit is an estimate and needs costs entered.
- On the free D1 plan, keep an eye on query limits: the dashboard runs about 20 queries per load.
- Push notifications carry no text (the service worker fetches the latest alert), by design.

# Kardivo V9.1

## V9.1 fixes (on top of V9 safe tools)
- **Checkout was broken:** `calcDiscount` was called when placing an order and when applying a code, but never defined, so every order and every discount check crashed with a 500. It now exists: it checks the code is active, not expired, under its max uses, and that the cart meets the minimum order, and never discounts more than the subtotal.
- Order creation is atomic (the order and its items are written in one batch), and a discount use is claimed with a single conditional update, so `max_uses` can't be exceeded and a failed order can no longer decrement someone else's usage count.
- A product that has options can no longer be bought without choosing one (this was a price bypass), and codes can't be added to it without choosing an option.
- Product merger: the target product's own codes get their own option, so they stay sellable. Option stock is now counted the same way on the storefront and at checkout, so nothing is double-counted. Preview runs the same checks as Execute.
- Deleting an option returns its unsold codes to the base stock instead of orphaning them. Options created by the merger can only be removed with Undo.
- Orders that already have a payment proof are not auto-cancelled by the reservation timer.
- Admin: "View proof" now appears on orders with a proof, codes can be added to options (the option picker never filled in), the codes table shows the option, discount expiry uses your own time zone, discounts validate on edit (no 150%), blank prices are rejected instead of becoming 0.00, and options can be removed from the product form.
- Storefront: products whose options have no old price no longer show "SALE" and an Infinity price. Cart rows whose option was removed are dropped instead of blocking checkout. The checkout analytics session is now stable. The admin panel stays English whatever the site language is.
- Low-stock Discord alerts no longer say "New order", and aren't sent when nothing is low. Rate limits no longer count invalid carts as orders, and old rate-limit rows are cleaned up.
- `wrangler.toml` and `schema.sql` are unchanged. Note: for `/sitemap.xml`, `/robots.txt`, `/media/*` (uploaded images) and product link previews to reach the Worker, `run_worker_first` must include them (see the deploy notes).

# Kardivo V7

Cloudflare Workers + D1 storefront with an admin panel. Everything you'd normally edit in code is now editable from **Account → Admin dashboard → Settings**.

## What changed in V7 (Arabic + English)
- **Arabic is the default.** The site opens in Egyptian Arabic, right-to-left. An **EN / AR** button in the header (also visible on phones) switches language; the choice is remembered in the browser.
- Everything customers see is translated: store, product pages, cart, checkout, order confirmation, login/register, order history, tracking, error messages, and the WhatsApp message pre-filled for support.
- **Arabic homepage text is editable**: Admin -> Settings -> "Arabic text". Each field is pre-filled with the Egyptian Arabic default. Empty field = the English text is shown instead.
- Product names, descriptions and category names are shown exactly as you type them (they are not auto-translated).
- The admin panel itself stays English / left-to-right on purpose.
- Fix: on phones the product grid, hero and footer were laid out in desktop columns (a later CSS rule overrode the mobile ones). Phone layouts now follow the breakpoints the stylesheet already declared.
- Added a "Track order" link in the footer (the header button is hidden on phones).
- Deploy as before: `wrangler deploy`. The new Arabic settings are added to the database automatically on the first request.

## Discord new-order alerts
Every new order posts to a Discord channel and pings you (order number, total, payment method, customer, items, discount code).
1. Discord: Channel settings -> Integrations -> Webhooks -> New Webhook -> copy the URL.
2. Store it as a secret, never in code: `wrangler secret put DISCORD_WEBHOOK_URL`
3. `DISCORD_USER_ID` (who gets pinged) is already set under `[vars]` in `wrangler.toml`.
4. `wrangler deploy`. With no secret set, alerts are simply off.
Only that one user can be pinged, whatever a customer types. A Discord outage never blocks an order.

## Deploy
1. Copy your existing `[[d1_databases]]` block into `wrangler.toml` (binding must be `DB`). Keep your `ADMIN_EMAIL` / `ADMIN_PASSWORD` secrets.
2. `wrangler deploy`
3. No manual SQL needed. On first request the Worker adds the few new columns/tables it needs and fills in default settings. Existing data is untouched.

## Editable from the admin panel
- Products (add, edit, hide/show, delete, **inline price editing**), categories, digital codes, discounts (with max uses and expiry)
- Orders (search/filter, payment + delivery status, notes) and a customers list
- Settings: store name, logo URL, currency label, accent color, announcement bar, all homepage text (hero, catalog, deals, how-it-works), footer, social links, support contact, payment destinations and on/off switches, pause orders, order-number prefix, max quantity, how long unpaid code orders hold stock, low-stock warning, show/hide stock counts, admin password change

## What changed in V5
- Product pages: added the missing `ASSETS` binding and `run_worker_first = ["/api/*"]`, a Worker fallback to `index.html`, and real in-app routing (no full reloads, back button works, nav links work from product pages).
- Product cards rebuilt so the price row sits outside the link block and can't be clipped or hidden.
- Stock is reserved when an order is placed, released on cancel/fail/refund or after the hold time, and a code order can't be marked paid without enough codes.
- Customers see their codes in order history once an order is paid and fulfilled; guests can use **Track order** (order number + contact).
- Discount codes: Apply button with live totals, clear error for invalid codes, usage limits.
- Security: salted PBKDF2 passwords (old passwords upgrade automatically on next login), login/register/lookup rate limiting, Origin check, admin notes no longer leak to customers, settings keys whitelisted.

## Still not included
- Image upload (images are URLs). Needs R2 or similar.
- Notifications (email/WhatsApp when an order arrives). Needs an email provider or WhatsApp API.


## V7.1 additions
- Customer-visible delivery messages on orders for manual products.
- Payment-proof image upload at checkout and Track order; proofs are stored in R2 and visible to admins.
- Admin **Mark paid & deliver** action and Discord alerts include a direct admin-order URL.
- Per-IP order throttling to reduce stock-hoarding/bot reservations.
- Discount usage is released when an order is cancelled or auto-expired.
- Product variants/denominations with variant-specific prices and digital-code stock pools.
- Optional Arabic product names/descriptions and Arabic category names, falling back to English.
- Product image upload through R2, plus per-product social preview metadata.
- Dynamic `sitemap.xml` and `robots.txt`.

These changes use additive D1 migrations only (`ALTER TABLE` for new nullable/defaulted columns and a new `product_variants` table). Existing products, codes, orders, discounts, and users are preserved. R2 uploads use the first available binding among `R2`, `MEDIA`, `PAYMENT_PROOFS`, or `PRODUCT_ASSETS`.

## New admin safety & operations tools

The current Worker adds these capabilities without requiring a destructive database reset:

- Product merger: preview first, then explicitly combine existing digital-code products into variants. Existing inventory rows and historical orders are preserved; source products are hidden rather than deleted.
- Order lifecycle protection and manual expired-reservation cleanup.
- Admin audit log for important administrative actions.
- Revenue/average-order/cancellation dashboard metrics.
- Low-stock Discord alerts from the admin dashboard.
- Customer in-account order status notifications.
- Verified-purchase product reviews with admin moderation.
- Lightweight checkout conversion events for future analytics.

The Worker creates only additive compatibility tables/columns at runtime. It does not replace the existing D1 schema or delete existing customer/order/inventory data automatically.

## V9 safe admin tools
- Built on the V7.1 working catalog/admin behavior; normal product listing and existing order flows are preserved.
- **Combine products into variants** is an explicit admin tool. Preview is read-only. Execute does not delete or rewrite existing inventory codes or historical orders; it creates variant/source mappings and hides the selected source products. Undo is available until the generated variant has been used by a new order.
- Operations dashboard adds revenue metrics, manual expired-reservation cleanup, and manual low-stock Discord alerts. No cleanup job runs automatically from the dashboard.
- Admin audit log records important admin actions.
- Verified customer reviews with admin approval.
- Customer in-account notifications for payment/fulfilment status changes.
- Checkout started/completed events for conversion measurement.

### Data-safety guarantee
No DROP/TRUNCATE/reset/mass migration is included. Existing `schema.sql` and `wrangler.toml` remain unchanged. The Worker only creates additive support tables (`variant_sources`, `audit_logs`, `checkout_events`, `product_reviews`, `customer_notifications`) when they do not exist. Existing products, inventory codes, orders, customers, discounts and settings are not automatically modified.

## V37 notes: discovery and SEO
- Category landing pages live at `/c/<category-slug>` (server-rendered title, description, canonical, hreflang, BreadcrumbList and ItemList JSON-LD). They are in `sitemap.xml`, and the home category cards link to them.
- Product JSON-LD now has AggregateOffer for multi-variant products, itemCondition, seller, category, a BreadcrumbList, and an AggregateRating built only from approved reviews.
- `/cart`, `/favorites` and `/admin` are `noindex` and disallowed in robots.txt.
- Search folds Arabic spelling variants, matches Arabic and English names, tolerates small typos, and shows recent and popular searches (popular = featured products and the biggest categories, not analytics).
- "Recently viewed" and "You may also like" also appear on the home page once the visitor has opened a product.

## V38 notes: accessibility
- Light theme: every text colour now meets 4.5:1 (greys, greens and ambers darkened), the brand purple is darker in light mode so white text on buttons/badges passes, and the focus ring is darker.
- `.sale` badge, red count badge and add-to-cart hover use purples/reds that keep white text above 4.5:1 in both themes.
- Live regions: `#toast` is `role="status"`, and a hidden `#a11yLive` announces cart count and quantity changes. Focus stays on the quantity button after a change.
- Modals are `role="dialog"` with a labelled close button, focus moved in and restored, and Tab trapped inside.
- Hearts have a 44px hit area; quantity buttons, add buttons, chips and close buttons are at least 44px on touch screens. Star ratings read as "N out of 5 stars".

## Product image gallery
- Each product has its cover (`image_url`) plus up to 8 extra images (`products.gallery`, a JSON list added automatically by the schema migration, version 18; existing data is untouched).
- Admin > product form > "Gallery images": add links or upload several files, reorder, remove. Uploads are stored in R2 when you press Save product (`POST /api/admin/products/:id/image?gallery=1` returns the URL without changing the cover).
- Saves validate links: http(s) URLs or our own `/media/product/...` URLs, with the key URL-decoded first, so both `products%2F1%2Fid.png` and `products/1/id.png` are accepted. An admin page that doesn't send `gallery` leaves the existing gallery alone; `gallery: []` clears it.
- Storefront: swipeable gallery on phones (dots), thumbnails and arrows on desktop, tap/click opens a zoom viewer (pinch, double-tap, wheel, drag to pan, swipe or arrow keys). Product JSON-LD lists the cover plus gallery images for Google.


## V59 festival layer

Visual only (no order, price, payment or API code touched). CSS is the last block of `public/styles.css` ("V59 FESTIVAL LAYER"); JS is the last block of `public/app.js`.

- **Backdrop**: three slow purple/fuchsia/indigo glow blobs, a soft cursor glow (mouse only), a sparse particle canvas and a gradient scroll-progress bar.
- **Hero**: breathing glow plus a slowly rotating light ring behind the frame, a shimmering headline, twinkling stars, a string of festival lights, and a ticker of your category names under the trust strip (built from real categories, so it follows Arabic/English).
- **Category cards**: one accent colour each, slow glow, cursor spotlight, travelling gradient rim and soft 3D tilt on hover.
- **Featured picks**: own particle stage and breathing glow, cards float and carry a slowly circling rim.
- **Everywhere**: header light line, twinkling eyebrows, scroll reveal, button shimmer, card/step/deal hover glow, footer gradient line, dialog and toast glow. Works in dark and light themes and in RTL.
- **Accessibility/performance**: `prefers-reduced-motion` and Data Saver turn off canvases, cursor glow, tilt and reveal; canvases pause when off-screen or the tab is hidden and use fewer particles on phones and low-end devices.
- **Tuning**: glow strength is `--fest-glow` (1 dark, .55 light); colours are `--fest-a/b/c`; particle counts are the `dens`/`max` values in `decorate()`. To remove everything, delete the two V59 blocks.
- Asset versions bumped to `styles.css?v=45` and `app.js?v=52` so browsers fetch the new files.

## V60 app mode (mobile)

- `index.html` viewport is locked (`maximum-scale=1, user-scalable=no, viewport-fit=cover`). iOS Safari ignores that for pinch, so `app.js` also cancels `gesturestart` and two-finger `touchmove` (not inside the photo lightbox, which keeps its own pinch zoom). Double-tap zoom is off via `touch-action:manipulation`.
- No sideways scrolling: `overflow-x` is clipped on `html`/`body`, `overscroll-behavior-x:none`, and a scroll guard snaps back if anything drifts. Pull-to-refresh and edge bounce chaining are off (`overscroll-behavior-y:contain`).
- Safe areas: notch/home-indicator padding for the header, progress bar, bottom tab bar and dialogs.
- Phones (<=700px): dialogs are bottom sheets, category and filter chips are single-row swipe lists, 44px touch targets, 16px inputs (no focus zoom), full-width hero buttons, press feedback on touch, no text selection or long-press callout on UI chrome (inputs and delivered codes stay selectable).
- To allow zoom again, restore the old viewport meta and delete the V60 blocks in `styles.css` and `app.js`.
- Asset versions: `styles.css?v=46`, `app.js?v=53`.
