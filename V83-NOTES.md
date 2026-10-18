# V83: a simpler admin panel with search

**Before you deploy:** `npm install` then `npm run build` (this zip already contains a fresh build). Nothing changes in the database or the worker, and every admin page and feature is still there (this zip also includes the V82 language and currency changes).

## What changed
- **Grouped menu.** The 17 tabs are now five groups: Every day (Dashboard, Needs review, Messages, Orders), Catalog (Products, Categories, Digital codes, Combine products, Back-in-stock), Marketing (Discounts, Campaigns, Emails, Reviews), People & money (Customers, Refunds & disputes), System (Settings, Audit log). The red badges still show.
- **Search everything** (bar at the top of the admin; press `/` or Ctrl/Cmd+K from anywhere). It finds pages, individual settings (type "logo" or "vodafone" and it opens Settings, unfolds the section and highlights the field), orders (by number, name, contact, item, payment reference), products, and customers. Arrow keys and Enter work. Orders and products open straight into their forms; customers open the Customers page already filtered.
- **Filter box on every long list** (Products, Customers, Digital codes, Reviews, Discounts, Audit log and so on) that hides rows as you type and says how many are shown. Orders keep their own search and status filter.
- **Settings has a "Find a setting" box** that opens matching sections and hides everything else.
- **Dashboard first screen is lighter.** The email/WhatsApp test, checkout funnel and backups moved into one folded "More tools" section at the bottom.
- **Phones:** the admin menu was a stuck 230px column on small screens (an old leftover rule). It is now a swipeable row at the top.
- Empty red badge dashes next to menu items are gone.

## Tested
Rendered in Chromium with a mocked API: grouped menu, search (settings, orders, customers), jump-to-setting, product and settings filters, mobile layout, no script errors. `npm test` still passes.

## Not tested
Against your real data and the real admin API (the search loads your orders, products and customers lists once a minute, the same lists the pages already use). The filter on Digital codes only covers the rows the page shows ("latest N of M").
