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
