# V92: the Products tab is fast with 1000 products

The slowness came from drawing every product at once: the admin Products tab downloaded all products (with their descriptions, SEO text and variants) and built one table row, with buttons and a price box, for each of them. The public Products page did the same with product cards.

What changed
- Admin, Products: loads 50 products at a time from the server. There is a search box (name, Arabic name, slug, platform, region, category), a filter (All, Active, Hidden, Featured, Digital codes, Manual delivery, Out of stock) and a pager (first, previous, next, last). Typing in the search waits a moment so it does not call the server on every key.
- Editing a price, hiding, deleting and the bulk bar (show, hide, feature, category, price %, AI image) work on the page you are looking at. Select all means "all on this page".
- Export CSV, Import CSV, AI fill missing and AI SEO text still work on the whole catalogue: they fetch the full list only when you press them.
- Public Products page and the home grid: show 48 cards, then a "Show more" button adds 48 more. Changing the search, category, filter or sort starts again at 48.
- Worker: GET /api/admin/products?limit=50&page=1&q=...&status=... returns { items, total, page, pages, limit }. Without ?limit the old full list is returned, so the merge tool, admin search and everything else are unchanged.

No database changes. wrangler.toml untouched. Service worker cache v48. New test tests/v91-products-params.test.mjs (already listed in package.json) and npm test passes.
After deploying run npm run build once (already done in this zip).
