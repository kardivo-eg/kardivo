# Kardivo V4

A complete rebuild of the Kardivo storefront and admin application for Cloudflare Workers + D1.

## What V4 includes
- Guest-first storefront and cart. Login is optional until checkout.
- Customer accounts with order history and logout.
- Admin dashboard with real product, category, inventory, discount, order, and payment-settings management.
- Product search, category filters, sorting, featured products, stock badges, sale pricing, and cart persistence.
- Manual payment flow for InstaPay, Vodafone Cash, and Telda. Only enabled methods are shown, and checkout reveals only the selected destination.
- WhatsApp support link generated from the saved support number.
- Exact Kardivo K-in-controller logo URL used directly. No fake circular K/orb replacement.
- Existing D1 schema is retained and V4 is non-destructive.

## Deploy
1. Keep the existing D1 database ID in `wrangler.toml`.
2. Keep your existing `ADMIN_EMAIL` and `ADMIN_PASSWORD` Worker secrets.
3. Deploy with `wrangler deploy`.
4. The admin account is created automatically if it does not already exist.

## Important
The product image field is still URL-based. V4 does not pretend a local PNG upload exists when it doesn't. A real upload pipeline needs R2 or another storage backend.


## Cloudflare D1 binding
This package intentionally does NOT declare a `[[d1_databases]]` block in `wrangler.toml`. The existing Cloudflare Worker already has the production binding `DB -> kardivo-db`. Keep that dashboard binding enabled. Do not create or migrate a new database from this package.

The Worker code expects `env.DB` to exist. After deployment, verify the Worker binding still shows `DB` mapped to `kardivo-db` in Cloudflare.
