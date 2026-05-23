# Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve Lighthouse Performance score on permly.app by fixing image sizing, LCP render delay, forced reflow, CLS, contrast, and adding a mandatory minification workflow.

**Architecture:** All changes are in static HTML/CSS/JS files — no build tooling. Minification is done via Toptal API calls (curl) before each commit. User performs two manual actions: generating 200w WebP images and setting up Cloudflare.

**Tech Stack:** HTML5, inline CSS, inline JS, Toptal CSS Minifier API, Toptal JS Minifier API, GitHub Pages, Cloudflare (free tier)

---

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Add 200w srcset entries; bump image cache version to v=2; add Inter woff2 preload; fix CLS on `.testimonial-stars` + `.trust-badge`; fix contrast on `.dnd-card-badge`; minify inline CSS + JS |
| `assets/cookie-consent.js` | Remove redundant innerHTML reassignment in `showBanner()`; remove redundant `style.maxHeight` write; minify |
| `CLAUDE.md` | Add minification workflow rule + curl commands |
| `sitemap.xml` | Update all `<lastmod>` to 2026-05-23 |

---

## ⚠️ User Actions Required

### Before Task 1: Generate 200w WebP images

Using an online tool (e.g. Squoosh at squoosh.app, or Convertio), generate WebP versions at **200px wide** (maintain aspect ratio) from the PNG originals in `assets/screenshots/phone/`:

| Source PNG | Output filename |
|-----------|-----------------|
| `1-home.png` | `1-home-200w.webp` |
| `2-profile_editing.png` | `2-profile_editing-200w.webp` |
| `4-profile_active.png` | `4-profile_active-200w.webp` |
| `5-stats.png` | `5-stats-200w.webp` |

Drop all four files into `assets/screenshots/phone/`. Then proceed with Task 1.

### After all tasks: Set up Cloudflare (Group D)

1. Sign up at cloudflare.com (free plan)
2. Add `permly.app` — Cloudflare scans your DNS records automatically
3. At your domain registrar, replace the current nameservers with the two Cloudflare nameservers provided
4. In the Cloudflare dashboard, confirm `permly.app` has the **orange cloud icon** (Proxied), not grey (DNS only)
5. Create a Cache Rule: match `permly.app/assets/*` → Edge Cache TTL: 1 year
6. Enable "Always Use HTTPS" under SSL/TLS → Edge Certificates

---

## Task 1: Add 200w image srcset entries

**Files:**
- Modify: `index.html` (carousel `<picture>` elements, lines ~1589–1640)

**Prerequisite:** User has placed the four `*-200w.webp` files in `assets/screenshots/phone/`.

- [ ] **Step 1: Update srcset for screenshot 1 (home)**

In `index.html`, find the first `<picture>` in the carousel and replace its `<source>` element:

```html
<!-- BEFORE -->
<source type="image/webp"
    srcset="assets/screenshots/phone/1-home-400w.webp?v=1 400w,
            assets/screenshots/phone/1-home-800w.webp?v=1 800w"
    sizes="(max-width: 600px) 175px, 270px">
<img src="assets/screenshots/phone/1-home.png?v=1" alt="Permly home screen showing notification profiles" fetchpriority="high" width="270" height="585">

<!-- AFTER -->
<source type="image/webp"
    srcset="assets/screenshots/phone/1-home-200w.webp?v=2 200w,
            assets/screenshots/phone/1-home-400w.webp?v=2 400w,
            assets/screenshots/phone/1-home-800w.webp?v=2 800w"
    sizes="(max-width: 600px) 175px, 270px">
<img src="assets/screenshots/phone/1-home.png?v=2" alt="Permly home screen showing notification profiles" fetchpriority="high" width="270" height="585">
```

- [ ] **Step 2: Update srcset for screenshot 2 (profile editing)**

```html
<!-- BEFORE -->
<source type="image/webp"
    srcset="assets/screenshots/phone/2-profile_editing-400w.webp?v=1 400w,
            assets/screenshots/phone/2-profile_editing-800w.webp?v=1 800w"
    sizes="(max-width: 600px) 175px, 270px">
<img src="assets/screenshots/phone/2-profile_editing.png?v=1" alt="Permly profile editing screen — select apps to mute" loading="lazy" width="270" height="585">

<!-- AFTER -->
<source type="image/webp"
    srcset="assets/screenshots/phone/2-profile_editing-200w.webp?v=2 200w,
            assets/screenshots/phone/2-profile_editing-400w.webp?v=2 400w,
            assets/screenshots/phone/2-profile_editing-800w.webp?v=2 800w"
    sizes="(max-width: 600px) 175px, 270px">
<img src="assets/screenshots/phone/2-profile_editing.png?v=2" alt="Permly profile editing screen — select apps to mute" loading="lazy" width="270" height="585">
```

- [ ] **Step 3: Update srcset for screenshot 3 (profile active)**

```html
<!-- BEFORE -->
<source type="image/webp"
    srcset="assets/screenshots/phone/4-profile_active-400w.webp?v=1 400w,
            assets/screenshots/phone/4-profile_active-800w.webp?v=1 800w"
    sizes="(max-width: 600px) 175px, 270px">
<img src="assets/screenshots/phone/4-profile_active.png?v=1" alt="Permly active profile screen — profile is running" loading="lazy" width="270" height="585">

<!-- AFTER -->
<source type="image/webp"
    srcset="assets/screenshots/phone/4-profile_active-200w.webp?v=2 200w,
            assets/screenshots/phone/4-profile_active-400w.webp?v=2 400w,
            assets/screenshots/phone/4-profile_active-800w.webp?v=2 800w"
    sizes="(max-width: 600px) 175px, 270px">
<img src="assets/screenshots/phone/4-profile_active.png?v=2" alt="Permly active profile screen — profile is running" loading="lazy" width="270" height="585">
```

- [ ] **Step 4: Update srcset for screenshot 4 (stats)**

```html
<!-- BEFORE -->
<source type="image/webp"
    srcset="assets/screenshots/phone/5-stats-400w.webp?v=1 400w,
            assets/screenshots/phone/5-stats-800w.webp?v=1 800w"
    sizes="(max-width: 600px) 175px, 270px">
<img src="assets/screenshots/phone/5-stats.png?v=1" alt="Permly distraction statistics screen showing blocked notifications" loading="lazy" width="270" height="585">

<!-- AFTER -->
<source type="image/webp"
    srcset="assets/screenshots/phone/5-stats-200w.webp?v=2 200w,
            assets/screenshots/phone/5-stats-400w.webp?v=2 400w,
            assets/screenshots/phone/5-stats-800w.webp?v=2 800w"
    sizes="(max-width: 600px) 175px, 270px">
<img src="assets/screenshots/phone/5-stats.png?v=2" alt="Permly distraction statistics screen showing blocked notifications" loading="lazy" width="270" height="585">
```

- [ ] **Step 5: Verify in browser**

Open `index.html` locally in Chrome. Open DevTools → Network tab → filter by `webp`. Resize browser to under 600px wide and reload. Confirm the requests show `*-200w.webp` files loading (not `*-400w.webp`). Resize to over 600px and confirm `*-400w.webp` or `*-800w.webp` loads.

- [ ] **Step 6: Commit** (hold — commit together with Task 2 below)

---

## Task 2: Add Inter woff2 preload

**Files:**
- Modify: `index.html` (`<head>`, after the `<link rel="preconnect">` lines ~27–28)

- [ ] **Step 1: Fetch the current Inter woff2 URL**

Run this curl command to get the Google Fonts CSS and extract the Latin woff2 URL for Inter Regular (400):

```bash
curl -s -A "Mozilla/5.0" "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" | grep -o 'https://fonts.gstatic.com[^)]*\.woff2' | head -1
```

Copy the URL from the output. It will look like:
`https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7W0Q5n-wU.woff2`

- [ ] **Step 2: Add the preload link to `<head>`**

After line 28 (`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`), add:

```html
<link rel="preload" as="font" type="font/woff2"
      href="PASTE_URL_FROM_STEP_1_HERE"
      crossorigin>
```

Replace `PASTE_URL_FROM_STEP_1_HERE` with the actual URL from Step 1.

- [ ] **Step 3: Verify**

Open `index.html` in Chrome DevTools → Network tab → filter by `font`. Reload. Confirm the `.woff2` file shows **Priority: Highest** and loads early (before the Fonts CSS response).

- [ ] **Step 4: Commit Tasks 1 + 2**

```bash
git add index.html assets/screenshots/phone/
git commit -m "fix: add 200w image srcset tier and Inter woff2 preload for LCP

- Add 200w WebP srcset entry for all four carousel screenshots
- Bump image cache version to v=2
- Add direct woff2 preload to eliminate font discovery round trip"
```

---

## Task 3: Fix forced reflow in cookie-consent.js

**Files:**
- Modify: `assets/cookie-consent.js`

**Background:** `injectBanner()` builds and appends the banner with its initial HTML. `showBanner()` then immediately overwrites that same HTML via `innerHTML` assignment — a redundant DOM mutation that invalidates styles and triggers a forced layout recalculation. Additionally, `el.style.maxHeight = '200px'` in `showBanner()` is redundant since the CSS already sets `max-height: 200px`.

- [ ] **Step 1: Remove redundant innerHTML and maxHeight write from `showBanner()`**

Find the `showBanner()` function (line ~69) and replace it:

```js
// BEFORE
function showBanner() {
    var el = document.getElementById('cookie-banner');
    if (!el) return;
    el.innerHTML =
      '<p class="cb-title">🍪 Cookie time (sorry)</p>' +
      '<p class="cb-body">' +
        'The necessary ones keep the lights on. The optional ones (Google Analytics) help us ' +
        'understand if anyone\'s actually reading this. Your choice — no pressure, no guilt trip.' +
      '</p>' +
      '<div class="cb-actions">' +
        '<button class="cb-btn cb-btn-primary" data-accept>Sure, why not</button>' +
        '<button class="cb-btn cb-btn-secondary" data-customize>Picky mode</button>' +
      '</div>';
    el.querySelector('button[data-accept]').addEventListener('click', onAccept);
    el.querySelector('button[data-customize]').addEventListener('click', showCustomize);
    el.style.maxHeight = '200px';
    el.removeAttribute('hidden');
    requestAnimationFrame(function () { el.querySelector('button[data-accept]').focus(); });
  }
```

```js
// AFTER
function showBanner() {
    var el = document.getElementById('cookie-banner');
    if (!el) return;
    el.removeAttribute('hidden');
    requestAnimationFrame(function () { el.querySelector('button[data-accept]').focus(); });
  }
```

The innerHTML and event listeners are already set by `injectBanner()` — no need to repeat them. The `max-height: 200px` is already in CSS.

- [ ] **Step 2: Verify cookie banner still works**

Open `index.html` in a private/incognito browser window (no stored cookie). Confirm:
- Cookie banner appears at bottom right
- "Sure, why not" button works (banner hides, no JS errors in console)
- "Picky mode" button opens the customize panel
- "Cookie Settings" link in footer re-opens the banner

- [ ] **Step 3: Minify cookie-consent.js via Toptal API**

```bash
curl -X POST https://www.toptal.com/developers/javascript-minifier/api/raw \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "input@assets/cookie-consent.js" \
  -o assets/cookie-consent.min.js \
  -w "%{http_code}"
```

Confirm the command prints `200`. If not, do not proceed — investigate the error.

Verify the output file is non-empty and looks like minified JS:
```bash
head -c 200 assets/cookie-consent.min.js
```

Replace the original file with the minified version:
```bash
mv assets/cookie-consent.min.js assets/cookie-consent.js
```

- [ ] **Step 4: Re-verify cookie banner after minification**

Repeat Step 2 in a fresh incognito window to confirm the minified version still works correctly.

- [ ] **Step 5: Commit**

```bash
git add assets/cookie-consent.js
git commit -m "fix: remove forced reflow in cookie-consent.js and minify

- Remove redundant innerHTML reassignment in showBanner() — injectBanner() already sets this
- Remove redundant style.maxHeight write — already set in CSS
- Minify via Toptal JS minifier"
```

---

## Task 4: Fix CLS — reserve layout space before font loads

**Files:**
- Modify: `index.html` (inline `<style>` block)

**Background:** `.testimonial-stars` and `.trust-badge` shift slightly (CLS 0.004) when Inter loads because their height isn't reserved. Adding a fixed `line-height` pins the space.

- [ ] **Step 1: Add `line-height` to `.testimonial-stars`**

Find `.testimonial-stars` in the `<style>` block (~line 1201):

```css
/* BEFORE */
.testimonial-stars {
    color: #FBBF24;
    font-size: 0.95rem;
    letter-spacing: 2px;
}
```

```css
/* AFTER */
.testimonial-stars {
    color: #FBBF24;
    font-size: 0.95rem;
    letter-spacing: 2px;
    line-height: 1.4;
    min-height: 1.4em;
}
```

- [ ] **Step 2: Add `min-height` to `.trust-badge`**

Find `.trust-badge` in the `<style>` block (~line 404):

```css
/* BEFORE */
.trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    ...
    font-size: 0.82rem;
    font-weight: 500;
}
```

```css
/* AFTER */
.trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    ...
    font-size: 0.82rem;
    font-weight: 500;
    min-height: 2rem;
}
```

- [ ] **Step 3: Verify visually**

Open `index.html` locally. Confirm the trust badges in the hero section and testimonial stars look identical to before — no visual change, just reserved space.

---

## Task 5: Fix contrast on `.dnd-card-badge`

**Files:**
- Modify: `index.html` (inline `<style>` block)

**Background:** `.dnd-card-problem .dnd-card-badge` uses `color: #6B7280` on `background: #E5E7EB`, giving a contrast ratio of ~3.55:1. WCAG AA requires 4.5:1 for text at this size (0.7rem bold = ~11px, below the 18.67px bold threshold). Changing to `#4B5563` (brand text-secondary) gives 5.48:1.

- [ ] **Step 1: Update the badge color**

Find `.dnd-card-problem .dnd-card-badge` (~line 720):

```css
/* BEFORE */
.dnd-card-problem .dnd-card-badge {
    background: #E5E7EB;
    color: #6B7280;
}
```

```css
/* AFTER */
.dnd-card-problem .dnd-card-badge {
    background: #E5E7EB;
    color: #4B5563;
}
```

- [ ] **Step 2: Verify visually**

Open `index.html` locally and find the "Android DND vs Permly" comparison section. The "ANDROID DND" badge should appear slightly darker than before — still gray, but more legible.

Verify contrast with: https://webaim.org/resources/contrastchecker/?fcolor=4B5563&bcolor=E5E7EB
Expected result: ratio ~5.48:1, WCAG AA pass ✓

---

## Task 6: Minify inline CSS and JS in index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Extract inline CSS to a temp file**

Copy everything between `<style>` and `</style>` in `index.html` into a temp file `_temp.css`.

Using bash:
```bash
# Extract CSS (adjust line numbers if needed — verify with: grep -n '<style>' index.html)
sed -n '/^    <style>/,/^    <\/style>/{ /^    <style>/d; /^    <\/style>/d; p }' index.html > _temp.css
wc -c _temp.css
```

Confirm the file is non-empty (should be ~9 KB).

- [ ] **Step 2: Minify CSS via Toptal API**

```bash
curl -X POST https://www.toptal.com/developers/cssminifier/api/raw \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "input@_temp.css" \
  -o _temp.min.css \
  -w "%{http_code}"
```

Confirm output is `200`. If not, stop — do not proceed.

Verify non-empty:
```bash
wc -c _temp.min.css
```

Expected: ~5–6 KB (down from ~9 KB).

- [ ] **Step 3: Replace the `<style>` block in index.html**

Open `index.html` and replace everything between `<style>` and `</style>` (keeping the tags themselves) with the contents of `_temp.min.css`. The result should look like:

```html
<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}...entire minified CSS on one line...</style>
```

- [ ] **Step 4: Extract inline JS to a temp file**

Copy everything between the main `<script>` and `</script>` at the bottom of `index.html` (the block starting with `// Pricing toggle`) into `_temp.js`.

```bash
# Verify the script block boundaries
grep -n '<script>' index.html
grep -n '</script>' index.html
```

Copy line range manually into `_temp.js`.

- [ ] **Step 5: Minify JS via Toptal API**

```bash
curl -X POST https://www.toptal.com/developers/javascript-minifier/api/raw \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "input@_temp.js" \
  -o _temp.min.js \
  -w "%{http_code}"
```

Confirm output is `200`. If not, stop.

- [ ] **Step 6: Replace the `<script>` block in index.html**

Replace everything between `<script>` and `</script>` (keeping the tags) with the contents of `_temp.min.js`.

- [ ] **Step 7: Clean up temp files**

```bash
rm _temp.css _temp.min.css _temp.js _temp.min.js
```

- [ ] **Step 8: Smoke test the full page**

Open `index.html` in Chrome locally. Test:
- Pricing toggle (Monthly/Yearly) changes the Pro card price
- Screenshot carousel scrolls with mouse drag and arrow keys
- Mobile nav hamburger opens/closes (resize to <768px)
- Cookie banner appears in incognito window
- No JS errors in DevTools Console

- [ ] **Step 9: Commit Tasks 4 + 5 + 6**

```bash
git add index.html
git commit -m "fix: CLS, contrast, and minify CSS+JS in index.html

- Add line-height/min-height to testimonial-stars and trust-badge to prevent CLS on font load
- Fix WCAG AA contrast on .dnd-card-problem .dnd-card-badge (#6B7280 → #4B5563, 3.55:1 → 5.48:1)
- Minify inline CSS (~9KB → ~5.5KB) and JS via Toptal API"
```

---

## Task 7: Update CLAUDE.md with minification workflow

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add minification rule under Maintenance Guidelines**

In `CLAUDE.md`, find the `### When to Update Files` section and add a new subsection after it:

```markdown
### Minification Workflow (Required Before Every Commit)

Any change to inline CSS or JS in any HTML file must be minified via the Toptal APIs before committing. Only 200 OK responses are acceptable — non-200 is a hard stop.

**Minify CSS** (replace contents of `<style>` block):
```bash
curl -X POST https://www.toptal.com/developers/cssminifier/api/raw \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "input@_temp.css" \
  -o _temp.min.css \
  -w "%{http_code}"
# Confirm 200, then paste _temp.min.css content between <style> and </style>
```

**Minify JS** (replace contents of `<script>` block):
```bash
curl -X POST https://www.toptal.com/developers/javascript-minifier/api/raw \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "input@_temp.js" \
  -o _temp.min.js \
  -w "%{http_code}"
# Confirm 200, then paste _temp.min.js content between <script> and </script>
```

**Also applies to** `assets/cookie-consent.js` when modified.
```

- [ ] **Step 2: Update the screenshot variants note under Technical Notes**

Find this line under `### SEO & Performance`:
```
- Carousel screenshots use `<picture>` with WebP `srcset` (400w/800w) + PNG fallback; `sizes="(max-width: 600px) 175px, 270px"`
```

Replace with:
```
- Carousel screenshots use `<picture>` with WebP `srcset` (200w/400w/800w) + PNG fallback; `sizes="(max-width: 600px) 175px, 270px"`
- When adding new screenshots: generate `-200w.webp`, `-400w.webp`, and `-800w.webp` variants
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add mandatory CSS/JS minification workflow to CLAUDE.md"
```

---

## Task 8: Update sitemap.xml

**Files:**
- Modify: `sitemap.xml`

- [ ] **Step 1: Update all lastmod dates**

Open `sitemap.xml` and set every `<lastmod>` value to `2026-05-23`.

- [ ] **Step 2: Commit**

```bash
git add sitemap.xml
git commit -m "seo: update sitemap lastmod to 2026-05-23"
```

---

## Verification

- [ ] **Run Lighthouse on the deployed site** after GitHub Pages deploys (usually 1–2 min after push). Target: LCP < 3.5s, FCP < 2.0s, Performance score > 85.
- [ ] **Check Lighthouse Accessibility audit** — "ANDROID DND" badge contrast should now pass.
- [ ] **Check Lighthouse Opportunities** — "Improve image loading" savings should be significantly reduced.
