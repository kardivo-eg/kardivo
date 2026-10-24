# V96: Products tab remade with colour and glow (storefront /products and admin)

Only the storefront /products page and the admin Products tab changed. Storefront, checkout, worker.js and the database are untouched.

**Before you deploy:** run `npm install` then `npm run build` (this zip has `public/app.js` and `public/styles.css` copied from `src/` WITHOUT minifying, because the build tool could not be installed offline; the site works as is, `npm run build` just shrinks them), then `wrangler deploy`. Service worker cache is now v52.

## What it looks like now
- Every product row is a glowing card tinted with colours read from that product's own picture (the same palette reader the storefront cards use). Pictures with no readable colour get a purple / pink / cyan glow. Hidden products fade to grey.
- Bigger thumbnails with a coloured ring, a gradient bar on the left edge of each row, a lift and brighter glow on hover, and a strong outline when a row is ticked.
- Each category gets its own hue (dropdown colour). Price sits in a tinted box. Stock is a glowing pill (green / amber / red, cyan for manual). Visible is a green glowing switch, Featured is a glowing gold star.
- The status dropdown became colour chips (All, Visible, Hidden, Featured, Digital codes, Manual, Out of stock). Same filters, one click.
- Gradient title and "Add product" button, soft colour glows behind the header, glass bulk bar with a gradient counter.
- Works in the light theme and on phones (rows become cards, chips scroll sideways).

## What did not change
Inline editing, Enter to save price and jump down, shift-click range ticking, select all matching, the bulk bar actions, Import & tools menu, paging.

## Files
- `src/app.js`: Products tab markup (wrapper, chips, row classes), chip click handler, and one line adding `.pg-row` to the product tint list.
- `src/styles.css`: new block "V96 · Products tab, colour and glow" at the end, scoped to `.pg-products`.
- `public/*`, `public/sw.js`: copies / cache bump.

## Tested
Chromium against a mocked backend: dark, light and 390px phone, chip filters, price edit, star toggle, row ticking and the bulk bar, no console errors. Not run against your live Cloudflare worker.

## Storefront /products page (added)
- Gradient title with a glowing product-count pill, soft colour glows behind the header.
- Every product row is a glowing card tinted from its picture (same palette reader as the storefront cards; `.pp-row` was added to its list). With no readable colour, the row uses its category's hue, so nothing is grey. Left colour bar, ring and glow on the thumbnail, lift on hover.
- Category tag on each row, "Save ..." badge under the picture of sale items, gold glow on "Only N left", price in the product's colour (rose on sale), gradient Add button in the row's colours, sold-out rows go grey.
- Category chips and Steam genre chips each have their own hue (same hue per category as in the admin); the active chip is a glowing gradient. Quick filters, "How it works" steps, badges, search and sort box all got colour and glow.
- Light theme, Arabic/RTL (logical properties), phones and reduced motion handled. No new text strings, so no new translations.
- `src/app.js`: row markup (category tag, sale badge, hue), chip hues, count pill, tint list, and a stray extra `</div>` in the page header removed.
- Tested in Chromium against a mock backend (dark, light, phone, Games with genres): no console errors. Not tested against your live site.
