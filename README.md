# Kardivo V4

Full V4 rebuild of the Kardivo storefront and admin control center.

## Deploy
1. Replace the GitHub repository contents with this folder.
2. Commit and push.
3. Redeploy the existing Cloudflare Worker.
4. Keep the existing `ADMIN_EMAIL` and `ADMIN_PASSWORD` secrets.
5. Keep the existing D1 database. Do **not** reset or recreate it.

## Existing D1
- Name: `kardivo-db`
- ID: `3c955451-b6fe-459e-95dd-b90bad198625`

## Admin controls
- Product add/edit/hide/show/delete
- Product price and old-price editing
- Category add/edit/delete
- Discount add/edit/delete, minimum order, expiry, active toggle
- Digital code inventory add/delete
- Order payment and fulfillment status
- Payment method enable/disable and destination editing
- WhatsApp/support settings

## Logo
The old circular K/orb is removed from the HTML. Header, hero and footer use the exact canonical logo supplied by the user via its direct ImgBB image URL.

The exact image is referenced remotely because the image bytes were not available to this build runtime.
