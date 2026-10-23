# V90: Steam prices = cost + 10%, with the 5% cashback already covered

Steam game prices no longer use a flat +100 EGP. In Admin, Products, Import Steam games / Fill with top Steam games:
- **Profit over Steam price (%)**: default 10
- **Cashback built into the price (%)**: default 5 (the credit customers earn, as a share of the price)
- **Minimum profit per game (EGP)**: default 0 (set e.g. 30 so cheap games never earn less than that)

price = max(cost x 1.10, cost + minimum) / (1 - 0.05), rounded up. Example: cost 1000 -> 1158. The 5% cashback is 58, so you keep 1100 - 1000 = 100 = a clean 10%.
Games refresh hourly with the same formula. Existing products keep their price until their next automatic refresh (turn "keep prices updated" off per game to keep a price).
The cashback % here is only for pricing; the actual reward rate is still set in Settings, Reward points. If you change one, change the other.
No database changes. Service worker cache v47. Tests updated (npm test passes).
