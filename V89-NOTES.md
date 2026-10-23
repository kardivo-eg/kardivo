# V89: one button to fill the store with the top Steam games (no duplicates)

Admin, Products, **🔥 Fill with top Steam games**. Pick Top 100 / 250 / 500 / 750 / 1000 and press **Fill the store**. Keep the window open until it finishes (a progress bar and counts are shown; Stop and Close are safe, press the button again later to continue).

- The list is Steam's best-selling games (games only: no DLC, bundles, soundtracks or software), most popular first.
- Each game is created exactly like the V88 import: Steam name, cover, screenshots, cost = Steam price, price = cost + markup, Steam gift product, automatic price updates.
- Free games and games with no Steam price are skipped.

## Anti-dupe
A game is NOT added when the store already has it, in either of these ways:
1. a product with the same Steam app number (any product made by the Steam import), or
2. any product, **including hand-made ones with no Steam link and hidden ones**, whose name is the same game.

Names are compared after ignoring capitals, accents, ™ ® ©, punctuation, "the", roman/arabic numerals (V = 5), and edition/platform words (edition, deluxe, standard, ultimate, gold, GOTY / game of the year, complete, premium, digital, steam, gift, key, PC, global, egypt, mena, worldwide, account, card, code). So all of these are one game: "Fallout 4", "Fallout 4 - Steam Gift (PC)", "Fallout 4: Game of the Year Edition". A Steam title with a subtitle (for example "The Elder Scrolls V: Skyrim Special Edition") also matches a hand-made product called just "Skyrim Special Edition".

Only the SAME game is skipped. With Fallout 4 in your store, Fallout, Fallout 3, Fallout: New Vegas and Fallout 76 are still added. Hades II is added when only Hades is owned.

Games already in the store are skipped before asking Steam about them. Games added earlier in the same run count too, so one run never adds the same game twice, and running the button again adds nothing new.

## Notes
- Steam answers only about 200 game lookups per 5 minutes. When it says slow down (HTTP 429) the window waits 70 seconds and carries on by itself, so Top 1000 takes a while. Nothing is lost.
- The paste-links "Import Steam games" window is unchanged: it adds exactly what you paste, on purpose, with no name check.
- Edition products that Steam sells under a different name than your hand-made product (for example "Skyrim" vs "Elder Scrolls V: Skyrim") are matched only when the shorter name is the part after the colon. If a differently-named hand-made copy slips through, delete the new one or rename yours.
- No new database columns. Service worker cache v46. New endpoints: POST /api/admin/steam/top and /api/admin/steam/fill (admin only).
- Tests: tests/v89-top.test.mjs (22 checks, Steam mocked), part of npm test. As with V88, Steam's real top-list page was not reachable from my workspace: press the button once with Top 100 first and check the result.
