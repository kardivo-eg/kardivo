# V70 — image-derived product palette reliability

## Root cause found in V69
- `public/app.js`, `kdSamplePalette(imageUrl)`: the deployed implementation set `img.crossOrigin = "anonymous"` but assigned `img.src = imageUrl` directly for remote artwork. This only permits pixel reads when the remote host grants CORS; otherwise `getImageData()` throws and the function resolves `null`.
- `kdSamplePalette` cached that unresolved result (`null`) in `kdAccentCache` indefinitely. `kdApplyProductAccents` set `data-accent-ready="1"` before awaiting the sample, while `kdAccentPalette` converted every sampling failure into `KD_ACCENT_NEUTRAL`. So one temporary/CORS failure could permanently make a colorful product appear neutral for the page lifetime.
- The V69 filter also required `sat >= .13` and `mx-mn >= 24`, then required at least 1.2% chromatic pixels among valid pixels. This could reject muted/dark color and let a neutral background dominate.
- `worker.js` already provides `/api/palette-image`, a same-origin proxy with HTTPS host allowlisting, redirect revalidation, image MIME validation and an 8 MiB response cap. V69's deployed sampler was not using it for remote images.
- `wrangler.toml` and asset references establish `public/` as the deployment source. Root-level `app.js` is an older, non-deployed copy and contains a separate cache-key typo (`kdAccentCache.has(imageUrl)` inside `kdSamplePalette(url)`). V63 itself is not included in the supplied archive, so a source-to-source V63 comparison cannot be verified.

## Changes
- Route remote HTTPS artwork through the existing constrained same-origin `/api/palette-image` endpoint; same-origin absolute URLs remain same-origin paths.
- Relax chromatic detection to retain muted/dark hues and lower the meaningful-color threshold. Neutral backgrounds are ranked separately when the artwork contains chromatic pixels.
- Handle transparency by compositing visible pixels against a neutral surface; ignore nearly transparent pixels.
- Do not synthesize accent hues when an image contains fewer than three distinct colors.
- Treat image-load/canvas-read errors as sampling failures, not monochrome palettes. Do not cache failures, and do not mark a product element ready when sampling failed; later apply passes can retry.
- Bump deployed asset references to `app.js?v=70`, `styles.css?v=70`, and service-worker shell cache to `kardivo-shell-v41`.

## Validation
- `node --check public/app.js`, `node --check worker.js`, `node --check public/sw.js`, and `node --check app.js` pass.
- `tests/palette-extraction.test.cjs` exercises the actual extractor function from `public/app.js` with synthetic fixtures for mostly white, black, gray, dark chromatic, muted colors, genuine grayscale, transparent artwork, image-load failure and canvas-read failure. These are synthetic fixtures, not production-catalog proof.
- Live storefront browser screenshots could not be captured in this execution environment: installed Chromium aborts before page startup because its GPU process is unavailable. No visual/browser verification or live deployment is claimed.
- The archive contains no V63 baseline or product catalog export. The worker source includes an approved i.ibb.co artwork URL, but this environment could not validate live product API responses or deployed proxy behavior.
