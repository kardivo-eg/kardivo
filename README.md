# Kardivo V3

Expanded storefront build based on the working Kardivo V2 Cloudflare Worker + D1 setup.

## Deploy
Replace the GitHub repository contents with this folder, commit/push, then redeploy the existing Cloudflare Worker.

Keep the existing `wrangler.toml` D1 binding and the existing `ADMIN_EMAIL` / `ADMIN_PASSWORD` Worker secrets.

## Database
You do **not** need to reset or recreate the D1 database.

V3 adds three optional settings:
- `instapay_enabled`
- `vodafone_cash_enabled`
- `telda_enabled`

The site works with the existing V2 settings even if those keys are absent. To make the settings explicit in D1, run `migration-v3.sql` once in the D1 Console. It is safe to run because it uses `INSERT OR IGNORE`.

## What changed
- Larger marketplace-style homepage
- Proper category section and category filters
- Featured product grid and sorting
- Deals section
- Search modal
- Better product cards/product flow
- Guest-first checkout flow preserved
- Payment method selection shows only enabled methods
- Admin payment toggles
- Admin category creation
- Existing orders, discounts and digital inventory preserved
- Canonical Kardivo logo reference used instead of the old generated K mark

## Logo
The canonical logo is the exact image supplied by the user. The public page references the supplied ImgBB image URL directly because the runtime used to build this ZIP could not download the image bytes into the repository. If you later place the exact image in `public/kardivo-logo.jpg`, change the three image references in `public/index.html` to `/kardivo-logo.jpg`.
