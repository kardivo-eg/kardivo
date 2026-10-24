# V95: a calmer, roomier admin, and a Products tab you can edit in place

Only the admin (/admin) changed. The storefront, checkout and the server (worker.js, database, wrangler.toml) are untouched.

**Before you deploy:** `npm install` then `npm run build` (this zip already has a fresh build), then `wrangler deploy`. Service worker cache is now v51.

## Look and feel
- The admin is its own app now: a left menu with small icons, a slim top bar with the search, and one wide content column. The store header, footer, bottom bar, purple glows and festive background no longer show on /admin.
- Neutral dark (and a clean light theme, switch it with "Light / dark" at the bottom of the menu). Purple is used only for the active item and main buttons.
- More air everywhere: 14 px text, taller table rows, 20-26 px panel padding, one heading style, flat panels with a thin border instead of gradients and glow. Buttons, inputs and dialogs share one size and one look.
- Dashboard: stat tiles are plain and sentence-case; the Quick actions cards lost their 01/02 numbers.
- Phones: the menu slides in from a button. All the same tabs and features as before.
- All styling is in one block at the end of `src/styles.css` ("V95 · Admin redesign"), scoped to `body.admin-route`. Colours are the `--a-*` variables at the top of it.

## Products tab (edit many, not one)
- Edit **price, category, visible and featured right in the row**. Each change saves at once; if the server refuses it, the old value comes back. In a price box, Enter saves and jumps to the next row (Escape undoes).
- Tick rows (shift-click ticks a range). When a whole page is ticked, "Select all N matching products" ticks every product that matches the current search/filter, across pages.
- A bar at the bottom applies to everything ticked: Show, Hide, Feature, Unfeature, set category, **change price by %** or **set price to an exact amount**, clean images with AI, and Delete (products that already have orders are skipped and counted).
- The long row of import/Steam/AI buttons is now one "Import & tools" menu. Same buttons, same behaviour.

## One bug fixed on the way
CSV export, the CSV template and other file downloads were being caught by the page's link handler and turned into a page change, so nothing downloaded. Links with a `download` attribute are now left alone.

## Not tested
Run against a mock backend in a real browser (dark, light, phone width; edits, bulk actions, search and every tab loading). Not run against your live Cloudflare worker and database, so try a bulk change on a few test products first. The other tabs (Orders, Customers, Settings...) got the new look through shared styles; skim them once for anything that looks off.
