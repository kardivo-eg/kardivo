# Kardivo V2

Version 2 keeps the existing Kardivo visual direction but adds:
- Guest-first browsing and cart
- Checkout gate with Login / Create account / Guest checkout
- Guest order contact fields
- HTML/CSS K-controller logo treatment
- Improved responsive storefront
- Admin product/category-aware product form
- Admin order support for guest orders
- D1 schema allowing guest orders

## Deployment

1. Replace the current project files with this V2.
2. Ensure `wrangler.toml` contains the real D1 ID.
3. If the D1 database is empty, run:
   `npx wrangler d1 execute kardivo-db --remote --file=schema.sql`
4. If the OLD schema has already been applied, use `migration-v2.sql` once instead.
5. Configure `ADMIN_EMAIL` and `ADMIN_PASSWORD` Worker secrets.
6. Configure payment destinations and WhatsApp from the Admin Settings screen.

This is still a starter/prototype commerce backend. Before taking real payments at scale, harden authentication, rate limits, auditing, and order fulfillment.
