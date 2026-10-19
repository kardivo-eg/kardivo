# V85: redesigned "Smart shopping" band

Changed: public/index.html (the band markup), src/styles.css and the rebuilt public/styles.css/app.js, new public/icons/deals-art.svg, service worker cache bumped. No worker, database or wrangler.toml change. The V84 Google structured-data fixes are included.

- New illustration (coupon with %, gift card, price tag, check badge, coins), drawn as a small SVG so it needs no image host.
- The three points are now glowing cards with icons, each in one of the site's glow colours (purple, magenta, indigo), with a lift and stronger glow on hover.
- The band uses the same glow system as the hero: breathing light behind the art, soft gradient headline, grid backdrop.
- The texts are still the admin-editable ones (Settings), and the real numbers from V81 still replace 01/02/03 when available.
- Works in light mode, Arabic/RTL and on phones; animation stops for reduced-motion and on slow devices.

Deploy: npm install, npm run build (already built in this zip), then deploy as usual.

## Wording of the three points (also in V85)
The old points (clear pricing / only what is in stock / the price you see is what you pay) did not fit a code store. They now say, in English and Arabic: clear prices with no hidden fees, your code arrives in minutes, and a code that does not work is replaced or refunded. These match your FAQ and refund policy. Text you wrote yourself in Settings is never overwritten; only the old built-in wording is swapped. To change them later: Settings, "Deal point 1/2/3".
