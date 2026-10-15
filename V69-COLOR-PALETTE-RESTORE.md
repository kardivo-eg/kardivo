# V69 — Product artwork color palette correction

This update restores image-derived accents and changes palette ranking so that, when product artwork contains meaningful chromatic pixels, the palette is selected from those chromatic colors rather than allowing large neutral backgrounds to dominate. Near-white background pixels are ignored; dark saturated colors remain eligible. Truly monochrome artwork can still produce a neutral palette.

Updated files: `public/app.js` (deployed storefront), `app.js` (legacy/root copy), and HTML cache versions (`v69`).

Validation performed: JavaScript syntax checks and a local Chromium storefront test using a mocked API and a synthetic green/brown/gold image. The test verified accents on product cards, search, product page, recommendations, quick view, favorites, cart, saved-for-later, and campaign, with no JavaScript console/page errors. This does not validate the live production catalog or deploy the update.
