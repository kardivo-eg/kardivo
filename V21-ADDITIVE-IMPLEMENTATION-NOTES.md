# Kardivo V21 additive improvements

This build adds a storefront conversion pass while preserving the existing purchase lifecycle.

## Included
- Product-led homepage feature tiles populated only from existing featured products.
- Favorites stored locally in the current browser (no schema migration, account sync, or new authentication behavior).
- Product fact panel using existing platform, region, and delivery_type fields.
- Checkout visual hierarchy: step indicator, trust/total guidance, and clearer summary. Existing order and payment handlers remain in place.
- Related-product favorites buttons and an optional bundle builder that adds selected products as separate cart items at their existing prices. This is not a discounted single-SKU bundle and does not reserve stock itself.
- Additive marketing events for product views, cart additions, favorites opens, and bundle builder opens using the existing checkout_events table and endpoint.
- A same-browser cart resume nudge. No email is sent and no server-side abandoned-cart job is introduced.

## Deliberately not represented as complete
- Cross-device/account-synced wishlist: needs an isolated persistent wishlist table and endpoints.
- Automated abandoned-cart emails: needs consent rules, durable cart records, secure resume tokens, and a scheduled sender.
- Full affiliate commissions and payouts: existing customer referrals are not the same as an affiliate ledger. This build does not alter referral accounting.
- Discounted purchasable bundles: needs a reviewed server-side bundle model and stock/pricing integration. The bundle builder here only adds separate items using existing cart behavior.
- Marketing source attribution: basic event capture is present; reliable campaign attribution and a reporting dashboard remain separate work.

## Protected files
`wrangler.toml`, `public/sw.js`, root `sw.js`, root `app.js`, root `index.html`, root `styles.css`, `schema.sql`, and existing migrations are unchanged. `worker.js` is changed only to allow additional non-purchase analytics event names through the existing endpoint. Existing order creation, payment proof, stock reservation, fulfillment, authentication, and refund logic are not intentionally modified.

## Before deployment
Run the store in staging, test Arabic RTL and English LTR, and regression-test login, variants, cart quantities, discount application, payment method selection, proof upload, order creation, order tracking, and stock reservations. Review the diff before deploying.
