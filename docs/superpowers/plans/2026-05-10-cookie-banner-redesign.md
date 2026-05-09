# Cookie Banner Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the full-width bottom banner with a humorous bottom-right corner card that expands inline to a customize panel with a necessary (locked) + analytics (toggleable) cookie row.

**Architecture:** All changes are self-contained in `assets/cookie-consent.js`. The JS injects both CSS and HTML at runtime, so no HTML files need editing. The banner card is a single `<div>` whose inner HTML is swapped between "banner view" and "customize view" when the user clicks "Picky mode". The toggle state is tracked in a JS variable; confirming saves preferences exactly as before.

**Tech Stack:** Vanilla JS (ES5-compatible IIFE), inline CSS injected via `<style>` tag, no external dependencies.

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `assets/cookie-consent.js` | Modify | Replace all CSS in `injectBanner()` and the banner HTML markup; add `showCustomize()`, `onConfirmCustomize()` functions; add toggle click handler |

No other files need to change.

---

### Task 1: Replace banner CSS

**Files:**
- Modify: `assets/cookie-consent.js` (the `style.textContent` array inside `injectBanner()`)

- [ ] **Step 1: Open `assets/cookie-consent.js` and locate the `style.textContent` array** (lines ~108–134). Replace the entire array with the new styles:

```js
style.textContent = [
  /* Card */
  '#cookie-banner{',
    'position:fixed;bottom:20px;right:20px;z-index:9999;',
    'background:#fff;border:2px solid #4F46E5;border-radius:12px;',
    'padding:18px 20px;width:100%;max-width:320px;',
    'box-shadow:0 4px 24px rgba(0,0,0,0.14);',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
    'box-sizing:border-box;',
  '}',
  '#cookie-banner[hidden]{display:none!important;}',

  /* Title */
  '#cookie-banner .cb-title{',
    'font-size:0.92em;font-weight:700;color:#111827;margin:0 0 6px;',
  '}',

  /* Body text */
  '#cookie-banner .cb-body{',
    'font-size:0.78em;color:#4B5563;line-height:1.55;margin:0 0 14px;',
  '}',
  '#cookie-banner .cb-body a{color:#4F46E5;text-decoration:underline;}',

  /* Banner action buttons */
  '#cookie-banner .cb-actions{display:flex;gap:8px;flex-wrap:wrap;}',
  '#cookie-banner .cb-btn{',
    'padding:9px 16px;border-radius:8px;font-size:0.82em;',
    'font-weight:600;cursor:pointer;transition:opacity 0.15s;border:2px solid #4F46E5;',
    'white-space:nowrap;',
  '}',
  '#cookie-banner .cb-btn:hover{opacity:0.85;}',
  '#cookie-banner .cb-btn-primary{background:#4F46E5;color:#fff;}',
  '#cookie-banner .cb-btn-secondary{background:#fff;color:#4F46E5;}',

  /* Customize panel rows */
  '#cookie-banner .cb-subtitle{',
    'font-size:0.75em;color:#6B7280;margin:0 0 14px;',
  '}',
  '#cookie-banner .cb-row{',
    'display:flex;justify-content:space-between;align-items:center;',
    'padding:10px 0;border-top:1px solid #E5E7EB;gap:12px;',
  '}',
  '#cookie-banner .cb-row-label{font-size:0.8em;font-weight:600;color:#111827;}',
  '#cookie-banner .cb-row-desc{font-size:0.68em;color:#6B7280;margin-top:2px;}',

  /* Always-on pill */
  '#cookie-banner .cb-pill{',
    'background:#E5E7EB;border-radius:20px;padding:3px 10px;',
    'font-size:0.68em;color:#6B7280;font-weight:600;flex-shrink:0;',
  '}',

  /* Toggle */
  '#cookie-banner .cb-toggle{',
    'width:38px;height:22px;border-radius:11px;',
    'position:relative;cursor:pointer;flex-shrink:0;',
    'border:none;padding:0;transition:background 0.2s;',
    'background:#E5E7EB;',
  '}',
  '#cookie-banner .cb-toggle[aria-checked="true"]{background:#4F46E5;}',
  '#cookie-banner .cb-toggle::after{',
    'content:"";width:16px;height:16px;background:#fff;border-radius:50%;',
    'position:absolute;top:3px;left:3px;',
    'box-shadow:0 1px 3px rgba(0,0,0,0.2);transition:left 0.2s;',
  '}',
  '#cookie-banner .cb-toggle[aria-checked="true"]::after{left:19px;}',

  /* Confirm button (full-width) */
  '#cookie-banner .cb-btn-full{',
    'width:100%;margin-top:14px;padding:10px;',
    'border-radius:8px;font-size:0.82em;font-weight:600;',
    'cursor:pointer;border:none;background:#4F46E5;color:#fff;',
    'transition:opacity 0.15s;',
  '}',
  '#cookie-banner .cb-btn-full:hover{opacity:0.85;}',

  /* Mobile: full-width centered */
  '@media(max-width:480px){',
    '#cookie-banner{',
      'left:12px;right:12px;bottom:12px;max-width:none;width:auto;',
    '}',
  '}',
].join('');
```

- [ ] **Step 2: Commit**

```bash
git add assets/cookie-consent.js
git commit -m "design: replace cookie banner CSS with corner-card styles"
```

---

### Task 2: Replace banner HTML markup

**Files:**
- Modify: `assets/cookie-consent.js` (the `banner.innerHTML` string and button event listeners inside `injectBanner()`)

- [ ] **Step 1: Replace `banner.innerHTML` and its event listeners** (lines ~143–156). Replace with:

```js
banner.innerHTML =
  '<p class="cb-title">🍪 Cookie time (sorry)</p>' +
  '<p class="cb-body">' +
    'The necessary ones keep the lights on. The optional ones (Google Analytics) help us ' +
    'understand if anyone\'s actually reading this. Your choice — no pressure, no guilt trip.' +
  '</p>' +
  '<div class="cb-actions">' +
    '<button class="cb-btn cb-btn-primary" data-accept>Sure, why not</button>' +
    '<button class="cb-btn cb-btn-secondary" data-customize>Picky mode</button>' +
  '</div>';

banner.querySelector('button[data-accept]').addEventListener('click', onAccept);
banner.querySelector('button[data-customize]').addEventListener('click', showCustomize);
```

- [ ] **Step 2: Verify the old `button[data-decline]` listener binding is removed** — there is no decline button in the new markup, so no listener should reference `data-decline`.

- [ ] **Step 3: Commit**

```bash
git add assets/cookie-consent.js
git commit -m "design: update cookie banner HTML to corner-card copy and buttons"
```

---

### Task 3: Add `showCustomize()` and customize panel HTML

**Files:**
- Modify: `assets/cookie-consent.js` — add new functions between `onDecline` and `window.permlyOpenCookieSettings`

- [ ] **Step 1: Remove the `onDecline` function entirely** (it is no longer called — there is no "Decline" button). Delete:

```js
function onDecline() {
  var prefs = readPrefs();
  prefs.version = 1;
  prefs.ga_consent = 'denied';
  writePrefs(prefs);
  hideBanner();
}
```

- [ ] **Step 2: Add `showCustomize()` and `onConfirmCustomize()` in its place:**

```js
var _analyticsEnabled = true; // toggle state while customize panel is open

function showCustomize() {
  _analyticsEnabled = true; // reset to on each time panel opens
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.innerHTML =
    '<p class="cb-title">⚙️ Cookie preferences</p>' +
    '<p class="cb-subtitle">Choose what you’re comfortable with.</p>' +
    '<div class="cb-row">' +
      '<div>' +
        '<div class="cb-row-label">Necessary</div>' +
        '<div class="cb-row-desc">Keeps the site working. Non-negotiable.</div>' +
      '</div>' +
      '<span class="cb-pill" aria-disabled="true">Always on</span>' +
    '</div>' +
    '<div class="cb-row">' +
      '<div>' +
        '<div class="cb-row-label">Analytics</div>' +
        '<div class="cb-row-desc">Google Analytics — helps us know if this page exists to anyone.</div>' +
      '</div>' +
      '<button class="cb-toggle" role="switch" aria-checked="true" data-analytics-toggle ' +
        'aria-label="Analytics cookies"></button>' +
    '</div>' +
    '<button class="cb-btn-full" data-confirm>I’m on a cookie diet</button>';

  var toggle = banner.querySelector('button[data-analytics-toggle]');
  toggle.addEventListener('click', function () {
    _analyticsEnabled = !_analyticsEnabled;
    toggle.setAttribute('aria-checked', _analyticsEnabled ? 'true' : 'false');
  });

  var confirmBtn = banner.querySelector('button[data-confirm]');
  confirmBtn.addEventListener('click', onConfirmCustomize);

  // Move focus to toggle for accessibility
  toggle.focus();
}

function onConfirmCustomize() {
  var prefs = readPrefs();
  prefs.version = 1;
  prefs.ga_consent = _analyticsEnabled ? 'granted' : 'denied';
  writePrefs(prefs);
  hideBanner();
  if (_analyticsEnabled) loadGA4();
}
```

- [ ] **Step 3: Commit**

```bash
git add assets/cookie-consent.js
git commit -m "feat: add cookie customize panel with analytics toggle"
```

---

### Task 4: Update `showBanner()` focus target

**Files:**
- Modify: `assets/cookie-consent.js` — `showBanner()` function (lines ~71–77)

The current `showBanner()` looks for `button[data-accept]` to focus. That attribute still exists in the new markup, so this should still work — verify it.

- [ ] **Step 1: Read `showBanner()` and confirm it targets `button[data-accept]`:**

```js
function showBanner() {
  var el = document.getElementById('cookie-banner');
  if (!el) return;
  el.removeAttribute('hidden');
  var btn = el.querySelector('button[data-accept]');
  if (btn) btn.focus();
}
```

If the code already matches this exactly, no edit is needed.

- [ ] **Step 2: Confirm `window.permlyOpenCookieSettings` still calls `showBanner()`** — it resets `ga_consent` and calls `showBanner()`. This must show the *banner* view, not the customize panel. Since `showBanner()` only removes `hidden` (it doesn't reset innerHTML), we need to ensure the banner innerHTML is reset to the banner view when re-opening.

Replace `showBanner()` with:

```js
function showBanner() {
  var el = document.getElementById('cookie-banner');
  if (!el) return;
  // Reset to banner view in case customize panel was open
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
  el.removeAttribute('hidden');
  el.querySelector('button[data-accept]').focus();
}
```

- [ ] **Step 3: Commit**

```bash
git add assets/cookie-consent.js
git commit -m "fix: reset banner view when cookie settings reopened via footer link"
```

---

### Task 5: Manual browser testing

No automated tests exist for this codebase (plain HTML/JS site). Test the following scenarios manually by opening `index.html` in a browser (clear cookies between each scenario using DevTools → Application → Cookies → Clear).

- [ ] **Scenario 1 — First visit, accept all:**
  1. Open `index.html`. Banner appears bottom-right with title "🍪 Cookie time (sorry)".
  2. Click `Sure, why not`. Banner disappears. In DevTools → Network, confirm a request to `googletagmanager.com` was made.
  3. Reload page. Banner does not appear again. GA4 loads silently.

- [ ] **Scenario 2 — First visit, customize → analytics ON:**
  1. Clear cookies. Open `index.html`. Click `Picky mode`.
  2. Panel shows "⚙️ Cookie preferences" with Necessary (Always on pill) and Analytics (toggle in ON/indigo state).
  3. Leave toggle ON. Click `I'm on a cookie diet`. Banner disappears. GA4 loads.
  4. Reload. Banner absent, GA4 loads.

- [ ] **Scenario 3 — First visit, customize → analytics OFF:**
  1. Clear cookies. Open `index.html`. Click `Picky mode`.
  2. Click the Analytics toggle. It turns grey (OFF).
  3. Click `I'm on a cookie diet`. Banner disappears. Confirm no `googletagmanager.com` request in Network tab.
  4. Reload. Banner absent, no GA4 request.

- [ ] **Scenario 4 — Reopen via footer "Cookie Settings" link:**
  1. Complete Scenario 3 (analytics denied). Find a "Cookie Settings" link in the footer of any page and click it.
  2. Banner reappears showing the *banner* view (not the customize panel): "🍪 Cookie time (sorry)" with both buttons visible.
  3. Click `Sure, why not`. GA4 loads.

- [ ] **Scenario 5 — Mobile layout:**
  1. Open DevTools, toggle device toolbar, set width to 375px.
  2. Banner spans the full width with 12px margins, anchored to bottom-center.

- [ ] **Commit final verification note** (no code change needed, just confirm done):

```bash
git commit --allow-empty -m "test: manual cookie banner scenarios verified"
```

---

### Task 6: Update sitemap lastmod

**Files:**
- Modify: `sitemap.xml`

No page content changed, but the JS file was updated. The sitemap tracks page URLs, not assets — no sitemap update is required. Skip this task.

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by |
|-----------------|-----------|
| Bottom-right corner, 16–24px margin, max-width 320px | Task 1 CSS |
| Humorous title + body copy | Task 2 HTML |
| `Sure, why not` + `Picky mode` buttons | Task 2 HTML |
| Inline expansion (same card, no new element) | Task 3 `showCustomize()` replaces innerHTML |
| Necessary row with Always on pill | Task 3 HTML |
| Analytics row with toggle, on by default | Task 3 HTML + `_analyticsEnabled = true` |
| Toggle `role="switch"` + `aria-checked` | Task 3 HTML |
| Necessary `aria-disabled="true"` | Task 3 HTML |
| Focus moves to toggle on panel open | Task 3 `toggle.focus()` |
| `I'm on a cookie diet` confirm button | Task 3 HTML |
| Confirm with ON → GA granted + loaded | Task 3 `onConfirmCustomize` |
| Confirm with OFF → GA denied, not loaded | Task 3 `onConfirmCustomize` |
| `permlyOpenCookieSettings` resets to banner view | Task 4 `showBanner()` rewrite |
| Card border-radius, border, shadow styling | Task 1 CSS |
| Toggle ON/OFF visual states via CSS `::after` | Task 1 CSS |
| Mobile ≤480px full-width bottom-center | Task 1 CSS media query |
| Cookie schema unchanged | No changes to read/write logic |

**Placeholder scan:** No TBDs or vague steps found.

**Type consistency:** `showCustomize`, `onConfirmCustomize`, `_analyticsEnabled`, `data-accept`, `data-customize`, `data-analytics-toggle`, `data-confirm` — all consistent across tasks.
