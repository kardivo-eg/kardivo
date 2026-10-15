# V67 — Product artwork color restoration

- Reworked palette sampling to preserve sampled chromatic colors, including muted/earthy colors, rather than requiring a high percentage of saturated pixels.
- Neutral black/white/gray pixels no longer displace real hues when even a small meaningful chromatic portion exists in the artwork.
- Expanded the image-proxy's HTTPS image-host allowlist for common game/product-art sources while preserving HTTPS-only fetching, redirect revalidation, image MIME checks, and the 8 MiB limit.
- Updated asset cache versions to v67.
- Verified JavaScript syntax and ran a local Chromium smoke test with mocked API responses and a synthetic green/brown/gold image. The test checked product cards, campaign, search, product page, recommendations, quick view, favorites, cart, and saved-for-later. This is not a live production deployment test.
