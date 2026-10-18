# V82: language and currency follow the visitor

**Before you deploy:** `npm install` then `npm run build` (this zip already contains a fresh build). No database change. wrangler.toml is untouched.

## Language
On a first visit, with no saved choice and no `?lang=` in the link, the store now follows the device language. It reads the browser's language list in order and takes the first one that is Arabic or English. Any other language (French, Turkish and so on) falls back by location, the same rule as the currency: Egypt gets Arabic, everywhere else gets English. The time zone gives an instant first guess (so there is no flash), then the real country from `/api/geo` confirms or corrects it before the page is drawn. If the country can't be read, the time-zone guess stays. The language button still works: once a visitor picks a language it is saved and always wins over the device. The same rule is in the small script at the top of `public/index.html`, so the page does not flash in the wrong direction while loading.

Search-engine bots always get Arabic, so the Arabic page that Google indexes stays Arabic and matches your hreflang tags.

## Currency (location)
New endpoint `/api/geo` returns the visitor's two-letter country from Cloudflare (nothing is stored, and it is never cached). On a first visit with no saved choice, Egypt sees EGP and every other country sees USD, using your existing USD exchange rate setting. The EGP/USD button now remembers the visitor's choice. If the country cannot be read, the store stays in EGP.

Checkout still asks for the exact amount in EGP, because the payment methods (InstaPay, Telda, Vodafone Cash) are Egyptian. USD is a display convenience only.

## Not tested
The country lookup on the real Cloudflare network (it needs a deployed Worker, local tests have no country). Test it with a VPN or a phone on mobile data abroad.
