# V81: five fixes from the review

**Before you deploy:** `npm install` then `npm run build` (the storefront is built from `src/app.js` into `public/app.js`; this zip already contains a fresh build). Deploy as usual. The database updates itself on first load (schema version 21, additive only: two new text columns on `products`, two new settings). Nothing existing is changed or deleted.

## 1. Support hours instead of "any time"
The home-page trust strip now reads "Chat with us in Arabic, daily 10 AM – 11 PM" (Arabic: "كلمنا بالعربي كل يوم من 10 ص لـ 11 م"). It uses the same **Working hours start / end** you already set in Admin > Emails, so there is one place to change it. If the two hours are equal it just says "Chat with us in Arabic" and promises nothing. (Your current setting is 10 to 23, so it shows 10 AM – 11 PM, not 10 PM.)

## 2. Pinch-zoom works again
The zip's viewport tag was already fine; what blocked zoom was a script ("V60 app mode") that cancelled pinch gestures. It is removed. The sideways-drift guard stays but stands aside while the page is zoomed in. Double-tap-zoom stays off on buttons via CSS. If your *live* page still shows `maximum-scale=1, user-scalable=no`, that is an older build: deploying this one replaces it.

## 3. Share image on your own domain
- New `public/icons/og-image.png` (1200x630, the controller mark from your logo as a white outline on a transparent background) is the default link-preview picture for the home page and every page without its own image.
- The default logo is now `/icons/icon-512.png`. A stored old `i.ibb.co` logo value is treated as "default" and replaced. A logo you really set in admin still wins.
- Product pages still use that product's own image. If those images are on ibb.co, move them with the product image upload.
- **Replace `public/icons/og-image.png` with your real banner any time**: same name, 1200x630.

## 4. Real numbers on the home page
The three points in the "Smart shopping" band can now show real numbers from your own data: orders delivered, typical time from payment proof to delivery (median, last 90 days), and average rating (approved reviews). A number appears **only once there is enough data behind it**: orders and delivery time need at least 10 delivered orders (and 5 timed deliveries); the rating needs 5 approved reviews. Slots without a number keep the text point. Admin > Settings > home texts: **Show real numbers** switch and **minimum delivered orders**. The old developer wording ("Stock-aware carts", "Exact payment total") is replaced by "Only what is in stock" and "The price you see is what you pay"; text you wrote yourself is never touched.

## 5. How to redeem
New "How to redeem" boxes (English + Arabic, one step per line) on every product form, with AI fill:
- shown as a numbered box on the product page;
- added to the **delivered email** (only the products in that order, in the order's language);
- filled by **Auto-fill with AI** and by the bulk AI fill (it only fills empty fields; products without steps now count as "needs AI").
Old admin pages and bulk edits that don't send the field leave existing steps alone.

## Tests
`tests/v81.test.mjs` (37 checks); `npm test` runs it with the V78, V79 and V80 tests (all pass).

## Not tested
Real Gemini output for the redeem steps (read them before saving: the AI is told to use generic steps and leave the field empty if unsure), real WhatsApp/Facebook preview fetching, and the admin form in a real browser. The home page and product page were rendered in Chromium with a mocked API (English and Arabic) with no script errors. CSV import/export does not include the redeem fields yet.
