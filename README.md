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
