# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `index.html` as a narrative-driven, trust-first landing page using the Full Narrative Flow approach — Pain → Product → Proof → Features → Privacy → Compare → Price.

**Architecture:** All changes are confined to `index.html` (inline CSS + HTML). No new files except placeholder testimonial content. Sections are reordered and three new full-bleed dark sections are added (Stats Strip, Testimonials, Privacy Callout). Pricing moves to a dark background. All section-card boxes are opened up (removed border/shadow wrapping) to allow the new dark/light rhythm to breathe.

**Tech Stack:** Pure HTML5, inline CSS, vanilla JS. No build tools, no dependencies. Deployed via GitHub Pages.

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `index.html` | Modify | All tasks below — CSS additions, HTML restructure, copy changes |
| `sitemap.xml` | Modify | Update `<lastmod>` for index to today |

---

### Task 1: Add new CSS classes (prep — no visible change)

Add all new CSS rules to the `<style>` block in `index.html`. This task is prep only — no HTML structure changes yet. Having the CSS ready before touching HTML means each later task is just adding markup.

**Files:**
- Modify: `index.html` — `<style>` block (add after the existing `/* ─── MOBILE STICKY CTA ─── */` block, before `</style>`)

- [ ] **Step 1: Add the new CSS rules**

Open `index.html`. Find the line `/* ─── MOBILE STICKY CTA ─── */` section near the end of the `<style>` block. Add the following block immediately after the closing `}` of `#mobile-sticky-cta.is-visible`:

```css
        /* ─── STATS STRIP ─── */
        .stats-strip {
            background: var(--dark);
            border-top: 1px solid rgba(255,255,255,0.07);
            border-bottom: 1px solid rgba(255,255,255,0.07);
            padding: 32px 24px;
        }
        .stats-strip-inner {
            max-width: 800px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
        }
        .stat-item {
            text-align: center;
            position: relative;
        }
        .stat-item + .stat-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 10%;
            height: 80%;
            width: 1px;
            background: rgba(255,255,255,0.12);
        }
        .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: white;
            line-height: 1.1;
            letter-spacing: -0.03em;
        }
        .stat-label {
            font-size: 0.78rem;
            color: rgba(255,255,255,0.5);
            margin-top: 4px;
        }
        @media (max-width: 600px) {
            .stats-strip-inner {
                grid-template-columns: repeat(2, 1fr);
                gap: 24px 0;
            }
            .stat-item + .stat-item::before { display: none; }
            .stat-item:nth-child(2n)::before { display: none; }
        }

        /* ─── TESTIMONIALS ─── */
        .testimonials-section {
            background: var(--dark);
            position: relative;
            overflow: hidden;
            padding: 72px 24px;
        }
        .testimonials-section::after {
            content: '';
            position: absolute;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            width: 600px;
            height: 400px;
            background: radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%);
            pointer-events: none;
        }
        .testimonials-inner {
            max-width: 1040px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        .testimonials-heading {
            text-align: center;
            font-size: 1.7rem;
            font-weight: 800;
            color: white;
            letter-spacing: -0.025em;
            margin-bottom: 8px;
        }
        .testimonials-subtitle {
            text-align: center;
            color: rgba(255,255,255,0.45);
            font-size: 0.9rem;
            margin-bottom: 40px;
        }
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
        }
        @media (max-width: 700px) {
            .testimonials-grid { grid-template-columns: 1fr; }
        }
        .testimonial-card {
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 16px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }
        .testimonial-stars {
            color: #FBBF24;
            font-size: 0.95rem;
            letter-spacing: 2px;
        }
        .testimonial-quote {
            font-size: 0.95rem;
            color: rgba(255,255,255,0.85);
            font-style: italic;
            line-height: 1.65;
            flex: 1;
        }
        .testimonial-footer {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .testimonial-name {
            font-size: 0.82rem;
            font-weight: 600;
            color: #A5B4FC;
        }
        .testimonial-source {
            font-size: 0.75rem;
            color: rgba(255,255,255,0.35);
            display: flex;
            align-items: center;
            gap: 4px;
            margin-left: auto;
        }
        .testimonial-source svg {
            width: 12px;
            height: 12px;
            fill: rgba(255,255,255,0.3);
        }

        /* ─── PRIVACY CALLOUT ─── */
        .privacy-callout {
            background: var(--dark);
            padding: 64px 24px;
            position: relative;
            overflow: hidden;
        }
        .privacy-callout-inner {
            max-width: 680px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        .privacy-callout-icon {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, rgba(79,70,229,0.3), rgba(124,58,237,0.3));
            border: 1px solid rgba(99,102,241,0.4);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
        }
        .privacy-callout-icon svg {
            width: 28px;
            height: 28px;
            fill: #A5B4FC;
        }
        .privacy-callout h2 {
            font-size: clamp(1.6rem, 3vw, 2.2rem);
            font-weight: 800;
            color: white;
            letter-spacing: -0.025em;
            margin-bottom: 16px;
        }
        .privacy-callout p {
            font-size: 1rem;
            color: rgba(255,255,255,0.65);
            line-height: 1.7;
            margin-bottom: 28px;
        }

        /* ─── OPEN SECTIONS (no card box) ─── */
        .open-section {
            padding: 56px 0;
        }
        .open-section h2 {
            font-size: 1.7rem;
            font-weight: 800;
            color: var(--text-primary);
            text-align: center;
            margin-bottom: 10px;
            letter-spacing: -0.025em;
        }
        .open-section h2 .accent {
            background: linear-gradient(135deg, var(--indigo), var(--violet));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .open-section .section-subtitle {
            margin-bottom: 36px;
        }

        /* ─── HERO EYEBROW ─── */
        .hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            background: rgba(99,102,241,0.15);
            border: 1px solid rgba(99,102,241,0.35);
            border-radius: 999px;
            padding: 5px 14px;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #A5B4FC;
            margin-bottom: 24px;
        }

        /* ─── SCREENSHOTS — DESKTOP FAN ─── */
        @media (min-width: 900px) {
            .screenshot-carousel {
                justify-content: center;
                overflow-x: visible;
                padding: 24px 40px 32px;
            }
            .phone-frame:nth-child(2),
            .phone-frame:nth-child(3) {
                transform: scale(1.0);
            }
            .phone-frame:nth-child(1),
            .phone-frame:nth-child(4) {
                transform: scale(0.92);
                opacity: 0.72;
            }
            .phone-frame:nth-child(1) .phone-shell,
            .phone-frame:nth-child(4) .phone-shell {
                box-shadow: 0 12px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08);
            }
            .phone-frame:nth-child(2) .phone-shell,
            .phone-frame:nth-child(3) .phone-shell {
                box-shadow: 0 32px 80px rgba(0,0,0,0.22), 0 6px 16px rgba(79,70,229,0.15);
            }
        }
        .screenshot-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -60%);
            width: 500px;
            height: 300px;
            background: radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
        }
        @media (max-width: 899px) {
            .screenshot-glow { display: none; }
        }

        /* ─── DARK PRICING ─── */
        .pricing-dark {
            background: var(--dark);
            padding: 72px 24px;
            position: relative;
            overflow: hidden;
        }
        .pricing-dark::before {
            content: '';
            position: absolute;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            width: 800px;
            height: 400px;
            background: radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%);
            pointer-events: none;
        }
        .pricing-dark-inner {
            max-width: 1040px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        .pricing-dark h2 {
            text-align: center;
            font-size: 1.7rem;
            font-weight: 800;
            color: white;
            letter-spacing: -0.025em;
            margin-bottom: 10px;
        }
        .pricing-dark .section-subtitle {
            color: rgba(255,255,255,0.5);
        }
        .pricing-card-dark {
            background: rgba(255,255,255,0.06);
            border: 1.5px solid rgba(255,255,255,0.14);
        }
        .pricing-card-dark .plan-name { color: rgba(165,180,252,0.9); }
        .pricing-card-dark .plan-price { color: white; }
        .pricing-card-dark .plan-period { color: rgba(255,255,255,0.45); }
        .pricing-card-dark .plan-subperiod { color: rgba(255,255,255,0.35); }
        .pricing-card-dark ul li { color: rgba(255,255,255,0.7); border-bottom-color: rgba(255,255,255,0.07); }
        .pricing-card-dark ul li::before {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='8' fill='%236366F1' fill-opacity='.2'/%3E%3Cpath d='M4.5 8L7 10.5L11.5 5.5' stroke='%23A5B4FC' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        }
        .pricing-dark .billing-switch {
            background: rgba(255,255,255,0.1);
        }
        .pricing-dark .billing-btn {
            color: rgba(255,255,255,0.7);
        }
        .pricing-dark .billing-btn.active {
            background: white;
            color: var(--indigo);
        }
        .pricing-dark .billing-btn.active .billing-save-chip {
            background: #065f46;
            color: white;
        }
        .pricing-dark .billing-btn:not(.active) .billing-save-chip {
            background: #047857;
        }
        .pricing-dark-footnote {
            text-align: center;
            font-size: 0.8rem;
            color: rgba(255,255,255,0.35);
            margin-top: 24px;
        }
        .featured-lifetime-dark {
            background: rgba(99,102,241,0.12) !important;
            border-color: rgba(99,102,241,0.4) !important;
        }
        .featured-lifetime-dark .best-value-badge {
            background: linear-gradient(135deg, var(--indigo), var(--violet));
        }
```

- [ ] **Step 2: Verify no CSS errors**

Open `index.html` in a browser (double-click or `File > Open`). The page should look identical to before — no visible changes yet, since no HTML has been touched.

Check browser DevTools console: zero CSS errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "design: add CSS for new landing page sections (stats, testimonials, privacy callout, dark pricing)"
```

---

### Task 2: Hero — eyebrow pill + pain-first headline + dual glow

**Files:**
- Modify: `index.html` — hero section HTML + hero CSS (`/* ─── HERO ─── */`)

- [ ] **Step 1: Upgrade the hero glow CSS**

Find the `.hero::after` rule in the `<style>` block. Replace it:

```css
        .hero::after {
            content: '';
            position: absolute;
            top: -160px;
            left: 50%;
            transform: translateX(-50%);
            width: 700px;
            height: 700px;
            background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(124,58,237,0.12) 40%, transparent 70%);
            pointer-events: none;
        }
        .hero-glow-secondary {
            position: absolute;
            top: -80px;
            left: calc(50% + 140px);
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 65%);
            pointer-events: none;
        }
```

- [ ] **Step 2: Add the secondary glow div inside `.hero`**

Find the opening `<div class="hero">` tag. Add the secondary glow element as the first child inside it, before `<div class="hero-inner">`:

```html
    <div class="hero">
        <div class="hero-glow-secondary" aria-hidden="true"></div>
        <div class="hero-inner">
```

- [ ] **Step 3: Add eyebrow pill before the tagline**

Find the line:
```html
            <p class="tagline">Take Back Your Focus</p>
```

Replace it with:
```html
            <div class="hero-eyebrow" aria-hidden="true">✦ Your Focus Guardian</div>
```

- [ ] **Step 4: Rewrite the hero headline and tagline**

Find and replace this block (the `<p class="tagline">` is already gone — replace `<h1>` through `<p class="sub-tagline">`):

```html
            <h1>How to Block Notifications on Android with Permly</h1>
            <p class="sub-tagline">Permly gives you selective control: mute specific apps per profile, switch with one tap, and keep calls and important messages coming through. All on-device, no account needed.</p>
```

Replace with:

```html
            <h1>Your phone interrupted you<br><span style="font-size:0.62em;font-weight:700;background:white;-webkit-background-clip:text;-webkit-text-fill-color:white;background-clip:text;">Permly fixes that.</span></h1>
            <p class="sub-tagline">Selectively mute any app, per situation. Work. Sleep. Focus. One tap to switch — all on-device, no account, no tracking.</p>
```

Wait — the h1 gradient applies to all text via `-webkit-text-fill-color: transparent`. The "Permly fixes that." line needs a different treatment so it's white/bold without the gradient. Use a `<span>` with explicit white styling that overrides the gradient:

```html
            <h1>Your phone interrupted you<br><span class="hero-h1-solution">Permly fixes that.</span></h1>
            <p class="sub-tagline">Selectively mute any app, per situation. Work. Sleep. Focus. One tap to switch — all on-device, no account, no tracking.</p>
```

And add this CSS rule to the hero section in `<style>`:

```css
        .hero-h1-solution {
            font-size: 0.62em;
            font-weight: 700;
            -webkit-text-fill-color: rgba(255,255,255,0.75);
            background: none;
            display: block;
            margin-top: 8px;
            letter-spacing: -0.01em;
        }
```

- [ ] **Step 5: Verify hero in browser**

Open `index.html` in browser. Hero should show:
- Small `✦ YOUR FOCUS GUARDIAN` pill above the headline
- Large gradient headline "Your phone interrupted you"
- Smaller white line "Permly fixes that." below it
- Two glow blobs visible (second one offset to the right)
- Everything else (buttons, stars, badges) unchanged

Check mobile (resize browser to 375px width): headline should wrap cleanly, eyebrow pill should fit.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "design: hero — pain-first headline, eyebrow pill, dual-glow upgrade"
```

---

### Task 3: Add Stats Strip after the hero

**Files:**
- Modify: `index.html` — add new HTML block between `</div><!-- end hero -->` and `<div class="page-body">`

- [ ] **Step 1: Insert stats strip HTML**

Find this comment line:
```html
    <div class="page-body">
```

Insert the following block immediately before it:

```html
    <!-- Stats Strip -->
    <div class="stats-strip" aria-label="App statistics">
        <dl class="stats-strip-inner">
            <div class="stat-item">
                <dt class="stat-value">5,000+</dt>
                <dd class="stat-label">Downloads</dd>
            </div>
            <div class="stat-item">
                <dt class="stat-value">4.8 ★</dt>
                <dd class="stat-label">Google Play rating</dd>
            </div>
            <div class="stat-item">
                <dt class="stat-value">0 bytes</dt>
                <dd class="stat-label">Data collected</dd>
            </div>
            <div class="stat-item">
                <dt class="stat-value">Free</dt>
                <dd class="stat-label">to try, always</dd>
            </div>
        </dl>
    </div>
```

- [ ] **Step 2: Verify in browser**

The stats strip should appear as a dark band directly below the hero with 4 stats in a row. On mobile (≤600px) it should reflow to 2×2.

DevTools: zero console errors. Zero layout overflow.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "design: add stats strip (downloads, rating, data collected, free)"
```

---

### Task 4: Screenshots — open box + desktop fan layout

**Files:**
- Modify: `index.html` — screenshots section HTML

- [ ] **Step 1: Remove section-card class, add open-section + position:relative**

Find:
```html
            <section class="section-card screenshot-section" id="screenshots" aria-labelledby="screenshots-heading">
```

Replace with:
```html
            <section class="open-section screenshot-section" id="screenshots" aria-labelledby="screenshots-heading" style="position:relative;overflow:hidden;">
```

- [ ] **Step 2: Add the glow element behind the carousel**

Find:
```html
                <div class="screenshot-carousel">
```

Insert immediately before it:
```html
                <div class="screenshot-glow" aria-hidden="true"></div>
```

- [ ] **Step 3: Add container div to scope carousel z-index**

Wrap the carousel in a `position:relative; z-index:1` div so it renders above the glow:

```html
                <div style="position:relative;z-index:1;">
                <div class="screenshot-carousel">
                    ... (existing phone frames, unchanged)
                </div>
                </div>
```

- [ ] **Step 4: Update the section heading style**

Find inside the section:
```html
                <h2 id="screenshots-heading">How Permly Works: One-Tap Notification Control</h2>
                <p class="section-subtitle">Simple, clean, and focused — just like your notifications should be.</p>
```

Replace with (add `open-section` heading context — the h2 and subtitle get the open-section styles from Task 1 CSS):
```html
                <h2 id="screenshots-heading">How Permly Works: One-Tap Notification Control</h2>
                <p class="section-subtitle">Simple, clean, and focused — just like your notifications should be.</p>
```

No change needed here — the `open-section` CSS handles the heading. The text is SEO-important, keep it.

- [ ] **Step 5: Verify in browser at desktop (≥900px)**

On desktop: the 2 center phones should be full-size with stronger shadows; the 2 outer phones should be slightly smaller and faded. A subtle purple glow should be visible behind the phones.

On mobile (≤899px): identical to before — drag-scroll carousel, no fan effect.

No horizontal overflow (check DevTools > overflow inspector).

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "design: screenshots — open box, desktop fan depth layout, glow"
```

---

### Task 5: Add Testimonials section

**Files:**
- Modify: `index.html` — add new section after screenshots

- [ ] **Step 1: Insert testimonials section**

Find the opening of the "How It Works" section comment:
```html
            <!-- How It Works -->
```

Insert the following block immediately before it. Replace the three `QUOTE`, `REVIEWER_NAME` placeholders with the actual Play Store review text before committing (ask the developer for the 3 quotes now):

```html
            <!-- Testimonials -->
            <section class="testimonials-section" aria-labelledby="testimonials-heading">
                <div class="testimonials-inner">
                    <h2 class="testimonials-heading" id="testimonials-heading">What people are saying</h2>
                    <p class="testimonials-subtitle">Real reviews from Google Play</p>
                    <div class="testimonials-grid">
                        <div class="testimonial-card">
                            <div class="testimonial-stars" aria-label="5 stars">★★★★★</div>
                            <p class="testimonial-quote">"QUOTE_ONE"</p>
                            <div class="testimonial-footer">
                                <span class="testimonial-name">REVIEWER_NAME_ONE</span>
                                <span class="testimonial-source">
                                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                                    Google Play
                                </span>
                            </div>
                        </div>
                        <div class="testimonial-card">
                            <div class="testimonial-stars" aria-label="5 stars">★★★★★</div>
                            <p class="testimonial-quote">"QUOTE_TWO"</p>
                            <div class="testimonial-footer">
                                <span class="testimonial-name">REVIEWER_NAME_TWO</span>
                                <span class="testimonial-source">
                                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                                    Google Play
                                </span>
                            </div>
                        </div>
                        <div class="testimonial-card">
                            <div class="testimonial-stars" aria-label="5 stars">★★★★★</div>
                            <p class="testimonial-quote">"QUOTE_THREE"</p>
                            <div class="testimonial-footer">
                                <span class="testimonial-name">REVIEWER_NAME_THREE</span>
                                <span class="testimonial-source">
                                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                                    Google Play
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
```

- [ ] **Step 2: Fill in the real quotes**

Replace `QUOTE_ONE`, `QUOTE_TWO`, `QUOTE_THREE`, `REVIEWER_NAME_ONE`, `REVIEWER_NAME_TWO`, `REVIEWER_NAME_THREE` with the actual text from the developer's 3 Google Play reviews. Keep each quote concise — if a review is longer than ~80 words, trim to the most impactful sentence or two while preserving meaning.

- [ ] **Step 3: Verify in browser**

Dark section with 3 glass cards. Stars amber, quotes italic white, reviewer names indigo-light, Google Play source badge visible. On mobile (≤700px): stacked single column.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "design: add testimonials section (3 Google Play reviews)"
```

---

### Task 6: How It Works — open the card box

**Files:**
- Modify: `index.html` — How It Works section

- [ ] **Step 1: Replace section-card class with open-section**

Find:
```html
            <section class="section-card" id="howitworks" aria-labelledby="howitworks-heading">
```

Replace with:
```html
            <section class="open-section" id="howitworks" aria-labelledby="howitworks-heading">
```

- [ ] **Step 2: Verify in browser**

The How It Works section should now sit on the `surface-alt` background with no white card box, no border, no shadow. The 3 steps and the connecting line should look the same.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "design: how-it-works — remove card box, open section"
```

---

### Task 7: Features Bento — remove dark tile, open box, 3×2 grid

**Files:**
- Modify: `index.html` — Features section

- [ ] **Step 1: Replace section-card with open-section**

Find:
```html
            <section class="section-card" id="features" aria-labelledby="features-heading">
```

Replace with:
```html
            <section class="open-section" id="features" aria-labelledby="features-heading">
```

- [ ] **Step 2: Remove the 7th dark tile**

Find and delete the entire 7th bento tile (the dark one — "No Ads. No Data. Ever."):

```html
                    <!-- 7: Wide, dark — Privacy callout -->
                    <div class="feature-bento">
                        <div class="feature-bento-title">No Ads. No Data. Ever.</div>
                        <div class="feature-bento-text">Permly never reads your notification content — only the app name. All data stays on your device. No analytics, no cloud, no accounts, no tracking. Your attention is not our product.</div>
                        <div class="privacy-dots">
                            <span class="privacy-dot-tag">No analytics</span>
                            <span class="privacy-dot-tag">No cloud</span>
                            <span class="privacy-dot-tag">No accounts</span>
                            <span class="privacy-dot-tag">No ads</span>
                            <span class="privacy-dot-tag">Local-only</span>
                        </div>
                    </div>
```

- [ ] **Step 3: Update grid CSS for 3×2 (6 tiles)**

The existing CSS has `.feature-bento:nth-child(7)` rules. With the 7th tile removed, also remove the `nth-child(7)` and its `span 2` rule from the CSS. Find and remove:

```css
        .feature-bento:nth-child(7) {
            grid-column: span 2;
            background: var(--dark);
            border-color: transparent;
            color: white;
        }
        .feature-bento:nth-child(7) .feature-bento-title {
            color: white;
            font-size: 1.05rem;
        }
        .feature-bento:nth-child(7) .feature-bento-text { color: rgba(255,255,255,0.6); }
```

Also in the mobile override, remove the reference to nth-child(7):

Find:
```css
        @media (max-width: 700px) {
            .feature-bento-grid { grid-template-columns: 1fr; }
            .feature-bento:nth-child(1), .feature-bento:nth-child(7) { grid-column: span 1; }
        }
```

Replace with:
```css
        @media (max-width: 700px) {
            .feature-bento-grid { grid-template-columns: 1fr; }
            .feature-bento:nth-child(1) { grid-column: span 1; }
        }
```

- [ ] **Step 4: Verify in browser**

Features section: 6 tiles in a clean 3×2 grid. First tile spans 2 columns (wide). No dark tile. No card box. Sits on surface-alt.

Mobile: all tiles single column.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "design: features bento — remove dark tile 7, open box, clean 3x2 grid"
```

---

### Task 8: Add Privacy Callout section

**Files:**
- Modify: `index.html` — add new section between Features and the comparison sections

- [ ] **Step 1: Insert privacy callout HTML**

Find the comment:
```html
            <!-- vs Do Not Disturb -->
```

Insert the following block immediately before it:

```html
            <!-- Privacy Callout -->
            <section class="privacy-callout" aria-labelledby="privacy-callout-heading">
                <div class="privacy-callout-inner">
                    <div class="privacy-callout-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                    </div>
                    <h2 id="privacy-callout-heading">We never read your notifications.</h2>
                    <p>Permly only sees the app name — never the content. No analytics. No cloud. No account. Your data never leaves your phone.</p>
                    <div class="privacy-dots" style="justify-content:center;">
                        <span class="privacy-dot-tag">No analytics</span>
                        <span class="privacy-dot-tag">No cloud</span>
                        <span class="privacy-dot-tag">No accounts</span>
                        <span class="privacy-dot-tag">No ads</span>
                        <span class="privacy-dot-tag">Local-only</span>
                    </div>
                </div>
            </section>
```

- [ ] **Step 2: Verify in browser**

Dark section with shield icon, bold white heading, body copy in muted white, pill tags in indigo-tinted style. Section appears between Features and the DND comparison.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "design: add privacy callout section (extracted from bento, own dark section)"
```

---

### Task 9: Comparison sections — open boxes + merge into shared wrapper

**Files:**
- Modify: `index.html` — vs DND and Competitors sections

- [ ] **Step 1: Open the vs DND section**

Find:
```html
            <section class="section-card" id="comparison" aria-labelledby="comparison-heading">
```

Replace with:
```html
            <section class="open-section" id="comparison" aria-labelledby="comparison-heading">
```

- [ ] **Step 2: Open the Competitors section**

Find:
```html
            <section class="section-card" id="competitors" aria-labelledby="competitors-heading">
```

Replace with:
```html
            <section class="open-section" id="competitors" aria-labelledby="competitors-heading">
```

- [ ] **Step 3: Reduce vertical padding between the two sections**

The two open sections will stack with their full 56px top/bottom padding. Add a style override to tighten the gap between them. After the `vs DND` closing `</section>` tag, add:

No change needed — the `open-section` padding is symmetric and the spacing will look fine. Verify in browser first.

- [ ] **Step 4: Verify in browser**

Both comparison tables sit on `surface-alt` with no card box. The DND table and the competitor grid have normal spacing between them but no redundant outer borders. The compare-scroll horizontal scrolling container still works on mobile.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "design: comparison sections — open card boxes"
```

---

### Task 10: Use Cases — open the card box

**Files:**
- Modify: `index.html` — Use Cases section

- [ ] **Step 1: Replace section-card with open-section**

Find:
```html
            <section class="section-card" id="usecases" aria-labelledby="usecases-heading">
```

Replace with:
```html
            <section class="open-section" id="usecases" aria-labelledby="usecases-heading">
```

- [ ] **Step 2: Verify in browser**

Use cases 6-card grid sits on `surface-alt`, no outer card box. Cards themselves keep their own border and hover effects.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "design: use-cases — remove card box, open section"
```

---

### Task 11: Pricing — dark background + glass cards + dark billing toggle

**Files:**
- Modify: `index.html` — Pricing section HTML + update JS `setBilling()` to be dark-aware

- [ ] **Step 1: Replace the pricing section wrapper**

Find:
```html
            <section class="section-card" id="pricing" aria-labelledby="pricing-heading">
```

Replace with:
```html
            </div>
        </div>
        </div><!-- close page-body .container -->
        </div><!-- close page-body -->

        <section class="pricing-dark" id="pricing" aria-labelledby="pricing-heading">
        <div class="pricing-dark-inner">
```

And find the closing `</section>` tag for pricing (right before `</div>` closing `.container`):

The current structure ends with:
```html
            </section>

        </div>
    </div>
```

Replace the pricing section closing and the container closings:
```html
        </div><!-- close pricing-dark-inner -->
        </section><!-- close pricing-dark -->

        <div class="page-body">
        <div class="container">
```

Wait — this restructuring is tricky because pricing is currently inside `.page-body > .container`. The cleanest approach is to close `.container` and `.page-body` before pricing, insert the dark pricing section at the top level, then reopen `.page-body > .container` if anything follows (nothing does — footer is next).

Actually, looking at the HTML structure: pricing is the **last section** inside `.page-body > .container`. After its closing `</section>` comes `</div></div>` (closing container + page-body), then `</main>`, then `<footer>`.

So the full replacement is:

Find this block at the end of `.page-body > .container` (the last `</section>` + the two closing divs + `</main>`):

```html
            </section>

        </div>
    </div>

    </main>
```

Replace with:

```html
        </div>
    </div>

    </main>
```

But ALSO change the opening of the pricing section. Find:
```html
            <!-- Pricing -->
            <section class="section-card" id="pricing" aria-labelledby="pricing-heading">
                <h2 id="pricing-heading">Simple, Honest Pricing</h2>
                <p class="section-subtitle">No ads in any tier. No dark patterns. No pressure.</p>
```

Replace with:
```html
        </div>
    </div>
    </div><!-- close page-body -->
    </main>

    <!-- Pricing (dark section, outside page-body) -->
    <section class="pricing-dark" id="pricing" aria-labelledby="pricing-heading">
        <div class="pricing-dark-inner">
            <h2 id="pricing-heading">Simple, Honest Pricing</h2>
            <p class="section-subtitle">No ads in any tier. No dark patterns. No pressure.</p>
```

And replace the section's closing tag + the old container/page-body/main closings:

Find (end of pricing section, before footer):
```html
                </div>
            </section>

        </div>
    </div>

    </main>
```

Replace with:
```html
                </div>
                <p class="pricing-dark-footnote">No credit card needed to start. Cancel anytime.</p>
            </div>
    </section>
```

Then the `<footer>` directly follows the `</section>`.

- [ ] **Step 2: Add dark card classes to Free and Lifetime pricing cards**

Find:
```html
                    <div class="pricing-card">
                        <div class="plan-name">Free</div>
```

Replace the opening tag with:
```html
                    <div class="pricing-card pricing-card-dark">
                        <div class="plan-name">Free</div>
```

Find:
```html
                    <div class="pricing-card featured-lifetime">
```

Replace with:
```html
                    <div class="pricing-card featured-lifetime featured-lifetime-dark">
```

The featured Pro card (`.pricing-card.featured-monthly`) keeps its white background — no change.

- [ ] **Step 3: Add dark class to pricing section's billing switch**

The billing switch `<div class="billing-switch">` is inside the pricing section. Since it's now inside `.pricing-dark`, the CSS selector `.pricing-dark .billing-switch` from Task 1 CSS will automatically style it correctly. No HTML change needed.

- [ ] **Step 4: Verify the `<main>` tag is closed correctly**

After the edit, verify the HTML structure is:
```
<main>
  <nav sidenav>
  <div hero>
  <div stats-strip>
  <div page-body>
    <div container>
      screenshots, testimonials, howitworks, features, privacy-callout, comparison, competitors, usecases
    </div>
  </div>
</main>

<section pricing-dark>

<footer>
```

Wait — `<main>` must wrap all main content including pricing for semantics. Let me revise: keep pricing inside `<main>` but outside `.page-body`.

The correct structure:
```html
</main>  ← moves to AFTER pricing section closes
```

Actually the cleanest approach: move `</main>` to after the pricing `</section>`. So:

```html
    <!-- Pricing (dark section, outside page-body but inside main) -->
    <section class="pricing-dark" id="pricing" aria-labelledby="pricing-heading">
        <div class="pricing-dark-inner">
            ...
        </div>
    </section>

    </main>

    <footer>
```

- [ ] **Step 5: Verify in browser**

Pricing section: dark background. Free and Lifetime cards have glass/dark treatment. Pro card is white, popping against the dark. Billing toggle works (click Yearly — price updates). "No credit card needed" footnote at bottom.

Mobile: pricing cards stack, no overflow.

DevTools: `<main>` correctly wraps all content above footer. Zero console errors.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "design: pricing — dark section, glass cards, billing toggle on dark"
```

---

### Task 12: Update sidenav + sitemap

**Files:**
- Modify: `index.html` — sidenav aside
- Modify: `sitemap.xml`

- [ ] **Step 1: Add new sidenav items for Testimonials and Privacy Callout**

The sidenav currently has: Screenshots, How It Works, Features, vs DND, Compare, Use Cases, Pricing.

With the new narrative order, update it to match. Find the `<aside class="sidenav">` block and replace its contents:

```html
    <aside class="sidenav" aria-label="Jump to section">
        <div class="sidenav-item">
            <a href="#screenshots" class="sidenav-label">Screenshots</a>
            <div class="sidenav-dot" aria-hidden="true"></div>
        </div>
        <div class="sidenav-item">
            <a href="#testimonials" class="sidenav-label">Reviews</a>
            <div class="sidenav-dot" aria-hidden="true"></div>
        </div>
        <div class="sidenav-item">
            <a href="#howitworks" class="sidenav-label">How It Works</a>
            <div class="sidenav-dot" aria-hidden="true"></div>
        </div>
        <div class="sidenav-item">
            <a href="#features" class="sidenav-label">Features</a>
            <div class="sidenav-dot" aria-hidden="true"></div>
        </div>
        <div class="sidenav-item">
            <a href="#comparison" class="sidenav-label">vs DND</a>
            <div class="sidenav-dot" aria-hidden="true"></div>
        </div>
        <div class="sidenav-item">
            <a href="#usecases" class="sidenav-label">Use Cases</a>
            <div class="sidenav-dot" aria-hidden="true"></div>
        </div>
        <div class="sidenav-item">
            <a href="#pricing" class="sidenav-label">Pricing</a>
            <div class="sidenav-dot" aria-hidden="true"></div>
        </div>
    </aside>
```

Note: the testimonials section needs `id="testimonials"` — add it in Task 5 HTML (it already has `aria-labelledby="testimonials-heading"` but verify the `id` is on the `<section>` tag). The privacy callout doesn't need a sidenav entry — it's a bridge, not a destination.

- [ ] **Step 2: Update sitemap.xml lastmod for index**

Open `sitemap.xml`. Find the `<url>` entry for `https://permly.app/`. Update its `<lastmod>`:

```xml
<lastmod>2026-05-20</lastmod>
```

- [ ] **Step 3: Final browser review — full page scroll**

Open `index.html` in browser, full page scroll from top to bottom:

1. Hero: eyebrow pill visible, pain headline, dual glow ✓
2. Stats strip: 4 stats in dark band ✓
3. Screenshots: fan effect on desktop, no card box ✓
4. Testimonials: dark section, 3 glass cards with real quotes ✓
5. How It Works: open, no card box ✓
6. Features: 3×2 bento, no dark tile, no card box ✓
7. Privacy Callout: dark section, shield icon, pill tags ✓
8. vs DND: open, table intact ✓
9. Competitors: open, table intact ✓
10. Use Cases: open, 6 cards intact ✓
11. Pricing: dark section, glass Free/Lifetime cards, white Pro card ✓
12. Footer: unchanged ✓

Mobile (375px): repeat scroll, check no overflow, no broken layouts.

Sidenav (desktop): hover shows labels, dots align with sections.

- [ ] **Step 4: Commit**

```bash
git add index.html sitemap.xml
git commit -m "design: update sidenav for new section order, sitemap lastmod"
```

---

### Task 13: Final polish + CLAUDE.md sitemap note

**Files:**
- Modify: `index.html` — any visual inconsistencies found in full review

- [ ] **Step 1: Check dark section spacing consistency**

The page now has 5 dark sections (hero, stats strip, testimonials, privacy callout, pricing). Check that transitions between dark→light and light→dark don't create unintended gaps or double-borders.

Specifically:
- Stats strip top/bottom border should cleanly separate it from the hero above and the light screenshots section below
- The `page-body` background is `surface-alt` (#F7F8FF). The open sections inside it sit on this background naturally.
- Testimonials and Privacy Callout are dark sections inside the `page-body` container — verify they bleed to full width. If `.page-body > .container` constrains them, they need to be moved outside `.container` (but inside `.page-body`).

If testimonials or privacy callout appear constrained to the container width: move those sections outside the `.container` div but keep them inside `.page-body`. Their inner content uses their own max-width containers (`testimonials-inner` at 1040px, `privacy-callout-inner` at 680px).

- [ ] **Step 2: Verify WCAG contrast on all new dark text**

Check in DevTools (Accessibility panel) or manually:

| Element | Color | Background | Requirement |
|---------|-------|------------|-------------|
| `.testimonial-quote` | `rgba(255,255,255,0.85)` | `var(--dark)` #0B0F1A | AA ✓ |
| `.testimonial-name` | `#A5B4FC` | `rgba(255,255,255,0.06)` on dark | AA ✓ |
| `.stat-label` | `rgba(255,255,255,0.5)` | `var(--dark)` | Large text only — stat labels are 0.78rem so must be ≥4.5:1. `rgba(255,255,255,0.5)` = approx #808080 on #0B0F1A ≈ 4.7:1. ✓ |
| `.privacy-callout p` | `rgba(255,255,255,0.65)` | `var(--dark)` | ≈ 6.2:1 ✓ |
| `.pricing-card-dark ul li` | `rgba(255,255,255,0.7)` | dark card | ✓ |

If `.stat-label` fails contrast at 0.78rem (small text needs 4.5:1), bump to `rgba(255,255,255,0.6)`.

- [ ] **Step 3: Commit final polish**

```bash
git add index.html
git commit -m "design: final polish — dark section bleed, contrast check"
```

---

## Self-Review Against Spec

**Spec coverage check:**

| Spec requirement | Covered by task |
|-----------------|----------------|
| Hero: eyebrow pill | Task 2 ✓ |
| Hero: pain-first headline "96 times" | Task 2 ✓ |
| Hero: dual-color glow | Task 2 ✓ |
| Stats Strip: 4 stats, dark, pure CSS | Task 3 ✓ |
| Screenshots: open box, desktop fan | Task 4 ✓ |
| Screenshots: keep mobile carousel | Task 4 ✓ (no mobile change) |
| Testimonials: 3 glass cards, dark | Task 5 ✓ |
| How It Works: remove card box | Task 6 ✓ |
| Features Bento: remove tile 7, 3×2 | Task 7 ✓ |
| Privacy Callout: own dark section | Task 8 ✓ |
| Comparisons: open boxes | Task 9 ✓ |
| Use Cases: remove card box | Task 10 ✓ |
| Pricing: dark bg, glass cards | Task 11 ✓ |
| Pricing: "no credit card" footnote | Task 11 ✓ |
| Section narrative order | Tasks 5, 8, 9, 10, 11 (reordering happens naturally as sections are inserted/moved) ✓ |
| Sidenav updated | Task 12 ✓ |
| Sitemap lastmod updated | Task 12 ✓ |
| Zero new JS | All tasks ✓ |
| Zero new fonts/images | All tasks ✓ |
| WCAG AA contrast | Task 13 ✓ |

**No gaps found.**
