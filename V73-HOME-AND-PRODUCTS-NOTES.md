# Kardivo V73 — short home page + /products page

## What changed (front-end + one worker route only)
- **New `/products` page**: search (with the existing suggestions), sort, category chips, quick filters (available / on sale / manual delivery) and the full product grid. It reuses the same product cards, favorites, quick view and add-to-cart code as before.
  - `?q=` is supported: `/products?q=steam` opens with that search, and the address bar follows what you type, so refresh and shared links keep the search.
  - Opening `/products` from the menu always starts clean (all products, no old filters).
- **New home opener** replaces the big logo + "Game night, sorted." hero: headline, a large search bar, trending chips (real trending data from `/api/trending`, falls back to featured products), "Browse all products" and "Build a bundle" buttons, and a slowly scrolling strip of product pictures (pauses on hover, off for reduced-motion).
- **The home page no longer contains the full catalog.** It now has: opener, trust strip, campaign (when active), categories, featured picks (up to 8), a "Browse all N products" button, reviews, deals, how it works.
- Header link "Store" is now **Products** (`/products`). Mobile bottom bar has a new **Products** tab. Every old `/#store` link (cart, favorites, account, campaign button, category pages) now goes to `/products`.
- Worker: `/products` serves the app shell with its own title/description/canonical and is in `sitemap.xml`.
- Arabic (Egyptian) + English strings added for everything new. Also fixed "Build a bundle" showing in English on the Arabic site.

## Not touched
Database, schema, migrations, API routes, checkout/orders/payments, auth, cart storage, service worker, `wrangler.toml`, logo.

## Notes
- Edited files: `public/index.html`, `public/app.js`, `public/styles.css`, `worker.js`. (The root-level `app.js` / `styles.css` / `index.html` copies are not served and were not changed.)
- Assets are cache-busted with `?v=73`.
- The new opener text is written in the code (EN + AR), not in the admin "Hero headline" settings, so those old hero settings no longer show on the home page.
- A product whose slug is literally `products` would be shadowed by the new page.
