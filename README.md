# Kardivo V16 — Admin-only order search

- Removed the public Track order controls from the storefront header and footer.
- Public order-number lookup now requires an authenticated admin role.
- Added a Find an order shortcut to the admin dashboard, opening the existing searchable Orders tab.
- Legacy tracking URLs redirect to the customer account; delivery/support emails link to account access instead.
- No database schema or migration changes; no customer/order/inventory records were modified.

Validation performed: JavaScript syntax checks and ZIP integrity. Live Cloudflare/browser behavior still requires staging verification.

# Kardivo V15 — Currency, imagery and campaign correction

- Fixed the currency control to use the exact same button class and font styling as the EN/AR control. Currency preference is remembered, and product prices refresh when switching. Order totals and payment instructions remain EGP.
- Campaign banner is visible by default unless an administrator explicitly disables it. Added a real gaming image fallback when no campaign artwork URL is configured.
- Added generic, web-sourced gaming artwork fallbacks for products/categories/search suggestions when product images are missing or old image URLs fail. Existing product image URLs are still preferred; no product database records are changed. These generic images are visual fallbacks and are not represented as official product cover art.
- Bumped the service-worker cache version so deployed browsers request the updated frontend.
- No database schema or migration changes.

Image references: Pexels gaming-controller photo (Pavel Danilyuk, Pexels) and Unsplash gaming-controller photos (Taylor R / Javier Martínez). Unsplash images are available under the Unsplash License; see https://unsplash.com/license.

Validation: JavaScript syntax and archive integrity checks are run for this package. A real Cloudflare/D1/R2 deployment and browser checkout still require staging verification.

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
