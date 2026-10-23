# V86: Steam gift products

A new product option, "Gift product". You sell a game as a Steam gift and send it yourself, the way Gamzio does: the buyer gives their Steam friend code or quick-invite link at checkout, you add them on Steam and send the gift by hand.

How to make one: Admin, Products, add or edit a product, set **Gift product** to "Steam gift". Then add your normal name, price, image and description. For different editions or regions, use the existing Variants box (for example "Standard - EG", "Standard - Global"). Gift products are always manual delivery, so no codes or stock are needed.

What the buyer sees
- Product page: a "How the gift works" box with the three steps and where to find the friend code in Steam.
- Cart: a small "Steam gift" tag. Quantity is always 1 (Steam cannot gift the same game twice to one account).
- Checkout, step 1: a required field "Steam friend code or invite link" under the product. It remembers the last one used on that device. The next button will not continue until it looks valid.
- English and Arabic.

What is accepted: a friend code (numbers only, 6 to 12 digits), a https://s.team/p/... quick-invite link, or a https://steamcommunity.com/(user|profiles|id)/... profile link. The server checks this again, so it cannot be skipped.

What you see: the friend code or link on the order (Orders, Manage), on the Needs review card, and in the Discord order alert, with Copy and Open buttons. After you send the gift, use Mark paid & deliver and write the delivery message as usual.

"Other gift" type: same idea but you choose what to ask for (for example an Epic account email), in English and Arabic.

Technical: schema version 22 (new columns products.gift_type, gift_label, gift_label_ar and order_items.gift_target, added automatically on first request). wrangler.toml untouched. Tests: tests/v86-gift.test.mjs, included in npm test. Service worker cache v44. Deploy: npm install, npm run build (already built in this zip), then deploy as usual.

Not included: picking any game from Steam by search and auto-filling name, image and screenshots (Gamzio does this). Here you fill the product in yourself, or with the existing AI auto-fill.
