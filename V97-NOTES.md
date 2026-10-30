# V97: AI assistant window in the admin

A new admin tab, "AI assistant" (second item under "Every day"). You type what you want in your own words, in Arabic or English, and it does it through the store's own admin functions.

**Before you deploy:** nothing to configure. It uses the Gemini key you already set in Settings > AI auto-fill. `public/app.js` and `public/styles.css` are already built (minified) and the service worker cache is v53, so just run `wrangler deploy`. The one new database table (`kd_agent_actions`) is created automatically on the first request (schema version 25). `wrangler.toml` is untouched.

## What you can say
- "Change the price of Elden Ring to 850" / "put Hades on sale at 250 and show the old price"
- "Make everything in Games 10% cheaper" (bulk)
- "Find pictures for Hades" -> a picker appears, you click one and it becomes the product picture
- "Run a 3-day campaign for Hades" / "...with 15% off" -> it writes the English and Arabic banner, creates the discount code first when you asked for a discount, links the product, sets the dates
- "Hide X", "feature Y", "rewrite the description of Z", "turn the campaign off", "how did we sell this week?"

## How it stays safe
- Anything that changes something becomes a **card** (what changes, old -> new). Nothing happens until you press **Apply**. "Apply all" runs several cards in order (discount first, then campaign).
- Every applied card has **Undo** (prices, visibility, pictures, text, discount codes, campaigns).
- Optional switch "Apply small changes automatically": a price within 30%, show/hide, featured, a picture, text. Discounts, campaigns and bulk price changes always wait for you, and so does anything below cost price.
- It always looks the product up first. If two products match it asks you which one. Products with variants make it ask which variant.
- A Steam auto-priced game: the card warns that setting your own price switches auto-pricing off for that game (otherwise the hourly Steam refresh would change it back). Undo switches it back on. Bulk changes skip Steam auto games and variant products and say so.
- Every applied action and every undo is in the Audit log. 150 assistant messages per hour.
- It never invents a discount: if you did not give one, the campaign is made without a code and it offers to add one.

## Pictures
Steam games: Steam's own store art (only when the Steam name is the same game, so "Elden Ring Nightreign" never gets "Elden Ring" art). Anything else: the official picture of the publisher or brand page found with Google search. Links that are not real pictures are dropped. A chosen picture is copied into your R2 bucket (if one is bound), so it does not depend on another site; the old picture is kept for Undo.

## Files
- `worker.js`: assistant block before `api()` (tools, planning, applying, undoing, chat loop), routes `/api/admin/agent*`, table `kd_agent_actions`.
- `src/app.js`: the tab (`adminAssistant`), menu entry, icon, search hints. `src/styles.css`: block "V97" at the end (dark and light, phones).
- `tests/v97-agent.test.mjs`: 54 checks, added to `npm test`.

## Tested
All 10 test suites pass (`npm test`). The chat window code was also run in a simulated browser against the real worker with 20 clicks-and-checks (send, Apply, Undo, picture pick, Apply all, reload, clear). Gemini is mocked in every test: **not run against the real Gemini or your live site**, and the look of the chat (colours, spacing) has not been checked in a real browser. If Gemini answers that your model does not support tools, pick `gemini-2.5-flash` in Settings > AI auto-fill.
