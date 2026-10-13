# Kardivo V21 additive UI update — Cart and Favorites pages

## Changes in this update
- Fixed favorite-button overlap: favorite action is now positioned inside the product image, separate from the availability/Ready badge and sale badge.
- Added dedicated `/cart` and `/favorites` pages instead of modal/floating windows.
- Cart navigation and the header cart control now open the dedicated cart page. Cart quantities, remove buttons, subtotal, and the existing checkout entry point are retained.
- Favorites are synced to the signed-in account through `GET/PUT /api/me/favorites` and the new `kd_user_favorites` table. Guests can hold temporary local favorites until they sign in; local favorites are merged into the account on login/registration. On logout, local favorites are cleared to avoid exposing another account's saved list on a shared browser.
- Added `migration-v5-favorites.sql` for the additive favorites table. Worker auto-schema is also incremented to version 13 and creates the same table if the existing migration runner is used.

## Protected behavior
The checkout order-creation, payment proof, stock reservation, fulfillment, refund logic, authentication/session implementation, service worker, deployment configuration, root-level duplicate frontend files, base schema, and existing migrations v3/v4 are not rewritten. The only backend behavior added is account-scoped favorites persistence and the schema version bump required for its table.

## Cart persistence
The cart is now a full page, but cart storage remains the existing `kardivo_cart` browser storage. Cross-device cart syncing is a separate feature and is not implied by this UI change. Existing checkout and order behavior remain the same.

## Test before deployment
- Product cards: favorite button must not cover the Ready/stock badge or sale badge; test RTL and LTR.
- `/favorites`: signed-in user sees account-synced favorites; sign-in merges guest favorites; remove favorite updates page; logout clears local account-specific favorites.
- `/cart`: empty state, quantity increase/decrease, removal, subtotal, variant pricing, and checkout entry.
- Existing purchase regression: login, variant selection, discounts, checkout totals, payment selection, proof upload, order creation, inventory reservations, fulfillment, and order history.
- Verify `GET/PUT /api/me/favorites` rejects unauthenticated requests and cannot save inactive or nonexistent product IDs.
