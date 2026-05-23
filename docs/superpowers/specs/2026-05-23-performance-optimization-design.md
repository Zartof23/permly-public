# Performance Optimization Design — permly.app

**Date:** 2026-05-23
**Baseline Lighthouse score:** 80 (Performance), FCP 2.7s, LCP 4.3s, TBT 150ms, CLS 0.001
**Scope:** index.html, assets/cookie-consent.js, CLAUDE.md
**GTM/GA:** Out of scope — left as-is

---

## Group A — Image sizing (~62 KiB savings on mobile)

Lighthouse measured carousel images displayed at 175×389px on mobile but served at 400×889px — 2.3× oversized.

**Fix:** Add a `200w` WebP tier for all four carousel screenshots:
- `1-home-200w.webp`
- `2-profile_editing-200w.webp`
- `4-profile_active-200w.webp`
- `5-stats-200w.webp`

**User action required:** Generate these four files using an online image converter (e.g. Squoosh, Convertio) from the existing PNGs in `assets/screenshots/phone/`. Target size: 200px wide, same aspect ratio, WebP format. Drop into `assets/screenshots/phone/`.

**Code change:** Update each `<picture>` srcset in `index.html` to add the `200w` entry:
```html
srcset="assets/screenshots/phone/1-home-200w.webp?v=1 200w,
        assets/screenshots/phone/1-home-400w.webp?v=1 400w,
        assets/screenshots/phone/1-home-800w.webp?v=1 800w"
sizes="(max-width: 600px) 175px, 270px"
```

After updating, increment `?v=1` to `?v=2` on all four images to bust cache.

---

## Group B — LCP render delay + CSS/JS minification

### B1 — Direct woff2 preload

The current pattern (`preload as="style"` + `media="print"`) requires two round trips before Inter renders: fetch CSS → discover font URL → fetch font. Adding a direct `<link rel="preload" as="font">` for the Inter 400 weight woff2 eliminates the discovery step.

**Fix:** Add to `<head>` after the existing preconnect links:
```html
<link rel="preload" as="font" type="font/woff2"
  href="https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7W0Q5n-wU.woff2"
  crossorigin>
```

The exact URL must be verified by fetching the Google Fonts CSS response before implementation.

### B2 — CSS and JS minification

Inline `<style>` block is ~9.1 KB raw; Lighthouse estimates 3.5 KB savings from minification. Inline `<script>` block also benefits.

**Fix:** Use Toptal APIs to minify before committing:

**CSS:**
```
POST https://www.toptal.com/developers/cssminifier/api/raw
Content-Type: application/x-www-form-urlencoded
Body: input=<raw CSS>
```

**JS:**
```
POST https://www.toptal.com/developers/javascript-minifier/api/raw
Content-Type: application/x-www-form-urlencoded
Body: input=<raw JS>
```

Only 200 OK responses are acceptable. Replace `<style>` / `<script>` block contents with the response body.

**CLAUDE.md rule (to be added):** Any change to inline CSS or JS in any HTML file must be followed by re-minifying via these APIs before committing.

---

## Group C — Forced reflow fix (~325 ms)

Lighthouse reports 325 ms total forced reflow from JS reading geometric properties (e.g. `offsetWidth`) after DOM mutations.

**Candidates:**
- `assets/cookie-consent.js`
- Carousel drag-scroll JS in `index.html` (around line 2032)

**Fix:** Audit both files. Batch DOM reads before writes. Where reads must follow writes, defer with `requestAnimationFrame`. No behavior changes — purely execution order corrections.

**Expected impact:** Reduces TBT contribution from main-thread long tasks (currently 4 tasks flagged, two from permly.app itself).

---

## Group D — Cache TTL via Cloudflare (user action)

GitHub Pages serves assets with ~4h cache TTL. Cloudflare free tier extends this to 1 year and adds CDN edge proximity.

**User action — step by step:**
1. Sign up at cloudflare.com (free plan)
2. Add `permly.app` as a new site — Cloudflare will scan existing DNS records
3. At your domain registrar, replace the current nameservers with the two Cloudflare nameservers provided
4. In Cloudflare dashboard, confirm the `permly.app` record has the **orange cloud** (Proxied), not grey
5. Create a Cache Rule:
   - Match: `permly.app/assets/*`
   - Setting: Edge Cache TTL → 1 year
6. Optionally enable "Always Use HTTPS" and "Auto Minify" in Speed settings

**Expected impact:** Repeat visitors load ~86 KiB of assets from cache. TTFB improves from CDN edge proximity globally.

---

## Group E — Minor CSS fixes

### E1 — Contrast on `.dnd-card-badge`

The "ANDROID DND" badge label fails WCAG AA contrast. Fix: adjust foreground or background color to achieve minimum 4.5:1 ratio, staying within brand palette.

### E2 — CLS on `.testimonial-stars` and `.trust-badge`

These elements shift during font load (CLS 0.004) because no height is reserved before Inter loads.

**Fix:** Add explicit `min-height` or fixed `line-height` to `.testimonial-stars` and `.trust-badge` so layout space is reserved before the font arrives.

---

## Minification workflow (CLAUDE.md addition)

The following rule must be added to CLAUDE.md under Maintenance Guidelines:

> **Before committing any change to inline CSS or JS:**
> 1. Copy the full contents of the `<style>` block
> 2. POST to `https://www.toptal.com/developers/cssminifier/api/raw` with `input=<css>` (URL-encoded)
> 3. On 200 OK: replace the `<style>` block content with the response body
> 4. Repeat steps 1–3 for the `<script>` block using `https://www.toptal.com/developers/javascript-minifier/api/raw`
> 5. Non-200 responses are a hard stop — do not commit until resolved

---

## Files changed

| File | Change |
|------|--------|
| `index.html` | Add 200w srcset entries; add woff2 preload; minify CSS+JS; fix CLS; fix contrast |
| `assets/cookie-consent.js` | Fix forced reflow read-after-write patterns |
| `CLAUDE.md` | Add minification workflow rule; update screenshot variants note |
| `sitemap.xml` | Update `<lastmod>` to 2026-05-23 |

## Out of scope

- GTM/GA changes
- Other pages (support.html, privacy-policy.html, terms-of-service.html)
- DOM size reduction (428 elements — low ROI without structural changes)
- CSP / HSTS / COOP headers (GitHub Pages limitation — no custom response headers without a proxy)
