# Landing Page Redesign — Design Spec
**Date:** 2026-05-20
**Approach:** B — Full Narrative Flow
**Goal:** Maximize conversions for mixed (cold + warm) traffic by rebuilding trust signals and restructuring the page as a story: Problem → Solution → Proof → Trust → Price.

---

## Context & Problem

The current landing page has a solid brand foundation but suffers from:

1. **Trust deficit** — the primary conversion blocker. Stars in the hero are not enough; visitors need to feel the app is real and used by real people before they download.
2. **Flat section rhythm** — every section uses the same white card treatment with identical padding and border-radius. No visual breathing room, no contrast beats.
3. **Feature-first narrative** — the page leads with product capabilities before establishing that the visitor has a problem worth solving. Cold traffic bounces before the value lands.
4. **Privacy story buried** — Permly's strongest differentiator (zero notification content read, zero data collected) is one cell in a bento grid, easy to miss.
5. **Pricing blends in** — the pricing section looks identical to every other section, robbing it of decisiveness.

---

## Design Decisions

### 1. Narrative Reorder

Sections reordered to follow: **Pain → Product → Social Proof → How It Works → Features → Privacy → Comparisons → Use Cases → Pricing**.

```
OLD ORDER                        NEW ORDER
─────────────────────────────    ─────────────────────────────
1.  Hero (dark)                  1.  Hero (dark) — pain-first
2.  Screenshots (light card)     2.  Stats Strip (dark) — NEW
3.  How It Works (light card)    3.  Screenshots (light) — redesigned
4.  Features (light card)        4.  Testimonials (dark) — NEW
5.  vs DND (light card)          5.  How It Works (light)
6.  Competitors (light card)     6.  Features (light)
7.  Use Cases (light card)       7.  Privacy Callout (dark) — NEW
8.  Pricing (light card)         8.  vs DND + Competitors (light)
9.  Footer (dark)                9.  Use Cases (light)
                                 10. Pricing (dark) — redesigned
                                 11. Footer (dark)
```

### 2. Dark/Light Alternation Rhythm

```
Dark hero → Dark stats strip → Light screenshots → Dark testimonials
→ Light how-it-works → Light features → Dark privacy callout
→ Light comparisons → Light use cases → Dark pricing → Dark footer
```

Each dark↔light transition acts as a visual reset, maintaining attention and preventing scroll fatigue.

---

## Section Specs

### Hero (dark — redesigned)

**Strategy:** Pain → Solution → Proof → Action

**New headline structure:**
```
[small eyebrow pill]  YOUR FOCUS GUARDIAN

Your phone interrupted you       ← large gradient headline
96 times today.

Permly fixes that.               ← smaller bold line

[sub-tagline — one sentence covering: selective muting,
 profiles, one-tap, on-device + no tracking]

[▶ Get It Free on Google Play]  [See How It Works]

★★★★★  4.8 on Google Play  ·  5,000+ downloads

[Google Play] [Android 8+] [Zero Data] [No Ads]   ← trust badges

↓ scroll cue
```

**Visual changes:**
- Eyebrow pill: `YOUR FOCUS GUARDIAN`, small, indigo border, `rgba(99,102,241,0.15)` bg
- Headline: two-line split. Pain line (`96 times today`) is the large gradient text. Solution line (`Permly fixes that.`) is ~60% size, bold white.
- Hero glow upgrade: dual-color bloom — primary indigo blob centered, secondary violet blob offset ~150px right. Both CSS `radial-gradient`, no images.
- Dot-grid pattern: keep unchanged.
- Social proof row: stars + "4.8 on Google Play" rendered as a clickable chip (styled `<a>`) rather than plain text.
- Trust badges: keep existing 4, no change.
- Scroll cue: keep existing bouncing arrow.

**Copy note:** "96 times" is within the documented range of average daily Android notification counts (65–96 per research). If a more conservative framing is preferred, "dozens of times" is an alternative.

---

### Stats Strip (dark — NEW)

Full-bleed dark band. No interaction. Pure CSS.

**Layout:**
```
  5,000+        4.8 ★         0 bytes        Free
  Downloads   Google Play   Data Collected   to try
```

**Specs:**
- Background: `var(--dark)`, top/bottom border `1px solid rgba(255,255,255,0.07)`
- Padding: `32px 24px`
- Stats: `font-size: 2rem`, `font-weight: 800`, `color: white`
- Labels: `font-size: 0.8rem`, `color: rgba(255,255,255,0.5)`
- Separators: `1px` vertical lines `rgba(255,255,255,0.12)` between each stat
- Mobile (≤600px): 2×2 grid, separators become horizontal rules
- No JS, no animation

---

### Screenshots (light — redesigned desktop layout)

Remove the white section-card box. Section sits on `var(--surface-alt)` directly.

**Desktop (≥900px) — fan/depth layout:**
- 4 phones displayed in a row, center-aligned
- Center phone(s): `scale(1.0)`, full opacity, stronger shadow `0 32px 80px rgba(0,0,0,0.22)`
- Outer phones: `scale(0.92)`, `opacity: 0.75`, lighter shadow
- Subtle indigo/violet radial glow behind center phone (CSS only, `pointer-events: none`)
- Phone captions below each frame, unchanged

**Mobile (≤899px):** Keep existing drag-scroll carousel. No change needed — it already works well.

**Heading:** Keep "How Permly Works: One-Tap Notification Control" — it's SEO-optimized.

---

### Testimonials (dark — NEW)

Full-bleed dark section. 3 quote cards side by side on desktop, stacked on mobile.

**Layout:**
```
  What people are saying          ← section heading, white
  Real reviews from Google Play   ← subtitle, muted

  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ ★★★★★        │ │ ★★★★★        │ │ ★★★★★        │
  │ "Quote..."   │ │ "Quote..."   │ │ "Quote..."   │
  │              │ │              │ │              │
  │ — Name       │ │ — Name       │ │ — Name       │
  │ Google Play  │ │ Google Play  │ │ Google Play  │
  └──────────────┘ └──────────────┘ └──────────────┘
```

**Card specs:**
- Background: `rgba(255,255,255,0.06)`
- Border: `1px solid rgba(255,255,255,0.12)`
- Border-radius: `16px`
- Stars: amber `#FBBF24`
- Quote text: `rgba(255,255,255,0.85)`, `font-style: italic`, `font-size: 0.95rem`
- Reviewer name: `color: #A5B4FC` (indigo-light)
- "Google Play" source: `rgba(255,255,255,0.4)`, small, with Play Store icon SVG

**Section background:** `var(--dark)` with a small `radial-gradient` indigo glow at top-center (CSS only).

**Content:** 3 real Google Play reviews to be provided by developer. Placeholder structure in HTML, easy to swap text.

---

### How It Works (light — minor updates)

Keep existing 3-step layout. Two small improvements:
- Remove the section-card box border/shadow — let it sit on surface-alt directly (consistent with new rhythm)
- Add a subtle indigo underline accent to each step number circle (already styled well, keep)

No structural changes.

---

### Features Bento (light — minor updates)

Keep the 3-column bento grid. Two changes:
- Remove the section-card box treatment — open section on surface-alt
- The 7th dark tile ("No Ads. No Data. Ever.") is **removed** — its content moves to the dedicated Privacy Callout section. The grid becomes 6 tiles in a clean 3×2 layout. No new tile needed; 6 is a complete, balanced grid.

---

### Privacy Callout (dark — NEW)

Full-bleed dark section between Features and the comparison tables.

**Layout:**
```
  [shield icon]

  We never read your notifications.     ← large, white, bold

  Permly only sees the app name —       ← body copy
  never the content. No analytics.
  No cloud. No account. Your data
  never leaves your phone.

  [No analytics] [No cloud] [No accounts] [No ads] [Local-only]
  ← pill tags (indigo-tinted, same as current bento)
```

**Specs:**
- Left-edge accent: 3px indigo-violet gradient vertical bar (like Linear's feature callouts)
- Or centered layout with shield icon above heading — decision at implementation
- Background: `var(--dark)`
- Heading: `font-size: clamp(1.6rem, 3vw, 2.2rem)`, white, bold
- Body: `rgba(255,255,255,0.65)`
- Pill tags: keep existing `.privacy-dot-tag` styles

---

### vs DND + Competitors (light — unchanged)

Keep both tables exactly as-is. Remove the individual section-card boxes — let both tables sit in a shared light section with a single heading and spacing between them, reducing visual clutter.

---

### Use Cases (light — unchanged)

Keep the 6-card grid exactly as-is. Remove section-card box.

---

### Pricing (dark — redesigned)

Pull pricing out of a white card and into a full-bleed dark section.

**Card treatment on dark background:**
- Free + Lifetime cards: `background: rgba(255,255,255,0.06)`, `border: 1px solid rgba(255,255,255,0.15)`, `color: white`
- Pro (featured) card: keep white background — it pops dramatically against the dark section
- All text colors inside dark cards: headings white, body `rgba(255,255,255,0.75)`, checkmarks use lighter indigo variant

**Toggle:** Keep the Monthly/Yearly billing switch. On dark bg, toggle pill uses `rgba(255,255,255,0.1)` background, active button white.

**Section heading + subtitle:** White text on dark.

**Bottom anchor:** Add a one-line reassurance below the cards: "No credit card needed to start. Cancel anytime." — `rgba(255,255,255,0.45)`, small.

---

## New Sections to Build

| Section | Type | Effort |
|---------|------|--------|
| Stats Strip | New HTML block + CSS | Low |
| Testimonials | New HTML section + CSS | Medium |
| Privacy Callout | New HTML section + CSS | Low |

## Sections Modified

| Section | Changes | Effort |
|---------|---------|--------|
| Hero | Copy rewrite + eyebrow + glow upgrade | Medium |
| Screenshots | Desktop fan layout CSS | Medium |
| Features Bento | Remove tile 7, open box | Low |
| vs DND + Competitors | Merge into shared section, open boxes | Low |
| Pricing | Dark bg + card color adaptations | Medium |
| All sections | Remove uniform section-card boxes | Low |

---

## Performance Constraints

- Zero new JavaScript
- Zero new fonts or icon libraries
- Zero new images (all new visuals are CSS gradients/shadows)
- Existing `<picture>` + WebP srcset pattern unchanged
- PageSpeed impact: neutral to positive (fewer redundant box-shadows)

---

## Accessibility Requirements

- All new dark sections must maintain WCAG AA contrast (`rgba(255,255,255,0.65)` minimum for body text on `var(--dark)`)
- Testimonial cards: quotes must not rely on color alone to convey meaning
- Stats strip: each stat+label pair should be wrapped in a `<dl>/<dt>/<dd>` or appropriate semantic element
- Privacy callout: shield icon is decorative (`aria-hidden="true"`)
- No changes to existing keyboard navigation or ARIA structure

---

## Out of Scope

- New screenshots or app assets
- Animation/scroll-triggered effects (JS cost not worth it for PageSpeed)
- Redesign of support, privacy-policy, or terms-of-service pages
- Any backend or tracking changes
