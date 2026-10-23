# V88: import Steam games, Steam price as cost, automatic prices

Admin, Products, **Import Steam games**. Paste Steam store links or app numbers (up to 15 at a time, one per line). For each game the store creates a Steam gift product with:
- name, short description, cover image and up to 8 screenshots, all taken from Steam's public store data;
- **cost** = the Steam price (shown in the cost price field, so your profit reports work). Steam prices Egypt in USD, so it is converted with your existing "USD exchange rate" setting;
- **selling price** = cost + markup, rounded up to a whole pound. The markup defaults to 100 EGP and is changed in the same window.

Prices keep themselves up to date: every hour the 20 games that were checked longest ago are re-read from Steam, and any whose price changed get a new cost and selling price. "Refresh prices now" in the import window does the same on demand (press again for the next 20). One switch turns automatic prices off for the whole store, and each game's edit form has its own "Update this price from Steam automatically" box, so a price you set by hand stays put when that box is off. Games with variants (editions) are not re-priced automatically, because their price lives on each variant.

Notes
- The price used is what Steam shows right now, so a game on sale is imported at the sale price and moves back up when the sale ends.
- Free games and games with no Steam price are skipped. Games already imported are not added twice.
- The Egypt store region is used (setting `steam_private_cc`, default eg). The three Steam settings contain "private" in their names, so shoppers never receive them.
- Arabic name and description are not filled by the import. Use the existing "AI fill missing" button for those.
- Cost is the Steam price, not what your supplier charges you. If your supplier is dearer or cheaper than Steam for some games, change that game's price by hand and untick its automatic option.
- New columns: products.steam_app_id, steam_auto, steam_price_at (schema 23, added automatically). wrangler.toml untouched. Service worker cache v45.
- Tests: tests/v88-steam.test.mjs (22 checks, Steam mocked), part of npm test. The real Steam web address and its replies were not reached from my workspace, so do one real import of a single game first and check the numbers.

Deploy: npm install, npm run build (already built in this zip), then deploy as usual.
