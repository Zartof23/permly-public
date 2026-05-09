# Cookie Banner Redesign — Design Spec

**Date:** 2026-05-10
**Status:** Approved

---

## Overview

Redesign the cookie consent banner from a full-width bottom bar to a compact bottom-right corner card with humorous copy and an inline customize panel. No changes to the underlying consent logic or cookie schema.

---

## Banner

**Position:** Fixed, bottom-right corner. 16–24px margin from edges. Max-width ~320px.

**Copy:**
- Title: `🍪 Cookie time (sorry)`
- Body: *"The necessary ones keep the lights on. The optional ones (Google Analytics) help us understand if anyone's actually reading this. Your choice — no pressure, no guilt trip."*

**Buttons:**
- Primary (accept all): `Sure, why not` — filled indigo (`#4F46E5`), white text
- Secondary (customize): `Picky mode` — white background, indigo border and text

**Behavior:**
- Clicking `Sure, why not` → grants GA consent, hides banner, loads GA4 (same as current `onAccept`)
- Clicking `Picky mode` → expands card inline to the customize panel (no new element, same card)

---

## Customize Panel

Triggered by `Picky mode`. The banner card content is replaced in-place (no position change, no new modal).

**Header:**
- Title: `⚙️ Cookie preferences`
- Subtitle: *"Choose what you're comfortable with."*

**Cookie rows:**

| Cookie | Description | Control |
|--------|-------------|---------|
| Necessary | "Keeps the site working. Non-negotiable." | `Always on` grey pill — not clickable |
| Analytics | "Google Analytics — helps us know if this page exists to anyone." | Toggle, **on by default** |

**Confirm button:** `I'm on a cookie diet` — full-width, filled indigo

**Behavior:**
- Confirming with analytics toggle ON → grants GA consent, loads GA4, hides banner
- Confirming with analytics toggle OFF → denies GA consent, hides banner (GA4 never loads)
- No "Back" button — the card stays in corner, user can dismiss by confirming

---

## Styling

- Card: `border-radius: 12px`, `border: 2px solid #4F46E5`, white background, `box-shadow: 0 4px 24px rgba(0,0,0,0.14)`
- Toggle ON: indigo pill with white circle right-aligned
- Toggle OFF: grey (`#E5E7EB`) pill with white circle left-aligned
- `Always on` pill: grey background (`#E5E7EB`), muted text (`#6B7280`), `border-radius: 20px`
- Font: system font stack (matches rest of site)
- Transition: panel expansion uses `max-height` CSS transition for smooth grow

**Mobile (≤480px):** card spans full width minus margin, anchored bottom-center instead of bottom-right.

---

## Accessibility

- Banner has `role="region"` and `aria-label="Cookie consent"` (already present)
- Toggle has `role="switch"` and `aria-checked` updated on click
- Necessary toggle has `aria-disabled="true"`
- Focus moves to first interactive element when panel opens

---

## Unchanged

- Cookie name (`permly_prefs`), schema (`{ version, ga_consent }`), expiry (180 days)
- `window.permlyOpenCookieSettings()` — resets consent and re-shows banner (footer "Cookie Settings" link)
- GA4 loading logic and measurement ID
- All HTML files include `assets/cookie-consent.js` — no changes needed there
