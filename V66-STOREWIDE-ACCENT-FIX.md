# V66 — Storewide product accents and campaign palette

## Fixes
- Product palette extraction samples the actual image histogram and prioritizes meaningful chromatic colors over black/white/gray; monochrome artwork may still use neutral colors.
- External artwork is sampled through `/api/palette-image`, a same-origin image endpoint restricted to approved HTTPS image hosts, image MIME types, 8 MiB responses, and revalidated redirects.
- Campaign artwork is the first palette source, then its linked product, then a featured product. Relative campaign artwork URLs are supported.
- The same product accent system is applied to catalog cards, featured/popular cards, search suggestions, favorites, quick view, product detail, recommendations, cart items, saved-for-later items, and bundle cards.
- Recently Viewed / You May Also Like tint styling is applied to the original rounded card, not a separate translucent square wrapper.
- Public asset cache keys bumped to V66.

## Verification performed
- `node --check public/app.js` passed.
- `node --check app.js` passed.
- `node --check worker.js` passed.
- Chromium visual test rendered the actual public HTML, CSS and app JavaScript with deterministic mocked API responses and a synthetic green/brown cover image. It confirmed: campaign accent palette was green/brown/yellow (`#307030`, `#604020`, `#e0c050`); all 3 catalog cards received accents; search suggestion received an accent; product page received an accent; 2 recommendation cards received accents with transparent wrapper background and 14px rounded card corners; quick view received an accent; favorites, cart, and saved-for-later items received accents; and no browser console/page errors occurred.

The test uses a local mock API and synthetic artwork; it does not claim to be a test against the production database or live deployed storefront.
