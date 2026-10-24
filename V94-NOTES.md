# V94: "How it works" only in Games, and Steam genres as mini categories

Products tab only (/products). Other categories show the plain list, with no how-it-works strip and no genre row.

What shows when the Games category is selected
- The "Instant delivery" and "Verified service" badges and the three steps, now written for Steam gifts: pick your game, send your Steam friend code (or invite link) and pay, receive your gift.
- A row of genre chips under the category chips: All genres, then each genre with the number of games in it (most games first). Tapping one filters the list. Search, sort and the quick filters work together with it. Changing category clears the genre.

Where genres come from
- New column products.genres (schema 24, added automatically on first request, nothing to run by hand).
- New Steam imports and "Fill with top Steam games" save Steam's own genres (up to 4, for example "Action, RPG"). A game Steam gives no genre for gets "Other".
- Games you added before this version have no genres yet. The hourly Steam refresh now fills them in first (20 games per run, using the same Steam call it already makes for prices), so a catalogue of about 1000 games is complete after roughly two days. Pressing "Refresh Steam prices" in the admin runs one more batch of 20 each time.
- Admin, edit product: new "Genres" box (comma separated) so hand-made games, or any game you want to re-label, can have genres too.
- Genre names are shown in Arabic for the common Steam genres when the site is in Arabic.

Service worker cache v50. npm run build done, npm test passes (new tests/v94-genres.test.mjs).
