# V93: the Products tab is a compact list, like the Steam Gift page

Only the Products tab (/products) changed. The home page, category pages, deals page, product page and admin are untouched.

- Top of the page: a small title with "Instant delivery" and "Verified service" badges, then a three-step strip (pick your product, order and pay, receive your order), instead of the big heading and paragraph.
- The big product cards are now small rows: a 56 px picture, the name, platform and region, the price (with the old price struck through when on sale), and an Add or Choose options button. Rows for sold-out products are dimmed. On phones the row is 48 px and the button goes under the name.
- Search, sort, categories and quick filters stay where they were, just closer together.
- 40 rows show first, and "Show more" adds 40.
- Arabic text added for the new labels. Light theme works (uses the same colour variables).

No server or database changes, wrangler.toml untouched. Service worker cache v49. npm run build already done; npm test passes.
