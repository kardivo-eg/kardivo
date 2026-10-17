# V80: automatic emails + "write an email" box

**Before you deploy:** run `npm install` then `npm run build` (the storefront and admin screens are built from `src/app.js` into `public/app.js`). Then deploy as usual. The database updates itself on first load (schema version 20, additive only: new columns on `users` and `orders`, two new tables `kd_saved_carts` and `kd_email_log`). Nothing existing is changed or deleted.

## What was added
- **Admin > Emails** (new tab): write an email and send it to any address(es), or to everyone who opted in to offers. Edit all the automatic emails below and see the last 40 emails sent.
- **Payment proof received**: when a proof is uploaded, a message appears in the order thread (Track order), the customer gets an in-app/push notification, and an email if we have one. Different wording outside working hours. Wording, ETA minutes and working hours are editable. A re-upload within 10 minutes sends nothing.
- **Unpaid order reminder**: order with no payment proof after N hours (default 6), while the codes are still held. Sent once.
- **Welcome email** on signup, with an optional first-order code.
- **Abandoned cart** (logged-in customers who opted in): saved cart older than N hours (default 12), not bought since. Sent once per cart.
- **After-delivery follow-up** and **win-back** (opted in only).
- Automatic emails go out hourly, only inside the sending hours (default 09:00-22:00 Cairo), max 25 per run, and one offer email per customer per 6 days.
- Offer emails need consent: a checkbox at signup (unticked) and a switch on the account page. Every offer email has an unsubscribe link and List-Unsubscribe header.
- Order emails (proof received, unpaid reminder, delivered, replies) are not affected by the offers choice.

## Tests
`tests/v80-email.test.mjs` (39 checks). `npm test` runs it with the V78 and V79 tests.

## Not tested
Real sending through Resend (the tests capture the request), real inbox delivery and spam placement, and the new admin screen in a real browser.
