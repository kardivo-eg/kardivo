# Kardivo V62 — Per-product accent glow

- Extracts a representative dominant colour from each product image in the browser and caches it per image URL.
- Uses the same product ID marker across catalogue cards, featured products, favorites, search suggestions, quick view, product detail, recommendations/recently viewed, cart, saved-for-later, and cart bundle recommendations.
- Adds subtle colour-tinted surfaces, borders, and glow while retaining existing layout and controls.
- Updates the live `public/` assets only; this project serves `public/` according to README.
- Bumps frontend asset query versions and service-worker shell cache to refresh deployed assets.
- No API, database schema, checkout, payment, or inventory logic changed.
- Cross-origin product images must permit CORS for pixel sampling; if sampling is blocked or the image is unavailable, a safe purple fallback is used.
