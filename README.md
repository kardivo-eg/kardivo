# Kardivo V5

Cloudflare Workers + D1 storefront with an admin panel. Everything you'd normally edit in code is now editable from **Account → Admin dashboard → Settings**.

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
