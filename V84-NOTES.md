# V84: Google Search Console product warnings

Only worker.js changed (the product page structured data). No database change, wrangler.toml untouched. Deploy as usual.

## Fixed
- hasMerchantReturnPolicy: added to every offer. It states a 1-day full refund or replacement window, matching the policy text on the site. Country is set by MARKET_COUNTRY (EG) near the top of the structured-data helpers.
- shippingDetails: added to every offer as free, zero-day handling and transit (digital delivery), for the same country.
- category: now a Google product category (Software, Software > Video Game Software, or Gift Cards & Certificates) chosen from the product and category names, instead of your own category name.
- brand: the product's Platform field if filled in (PlayStation, Steam...), otherwise the store name. mpn added from the slug. Digital codes have no GTIN, so that part of the warning is optional and can stay.
- review: up to 5 real, admin-approved reviews are now listed next to aggregateRating.

## Not faked on purpose
aggregateRating and review only appear for products that have approved reviews. Google forbids invented ratings, so products with no approved reviews will keep that warning until a customer review is approved. It is only an "improve appearance" warning, not an error.

## After deploying
In Search Console open the product snippets / merchant listings report and click Validate fix. Google recrawls over days to weeks.
