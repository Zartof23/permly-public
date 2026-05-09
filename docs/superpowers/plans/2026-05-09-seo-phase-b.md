# SEO Phase B Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve organic search ranking for Permly across the full search funnel by rewriting on-page SEO elements on `index.html` and `support.html`, and expanding the FAQ with 7 new keyword-targeted questions.

**Architecture:** Three self-contained edits — `index.html` (title, meta, H1, H2s, body copy), `support.html` (title, meta, new FAQs in both HTML and JSON-LD), `sitemap.xml` (lastmod dates). No new files, no structural changes, no visual changes.

**Tech Stack:** Static HTML. No build tools. Validate JSON-LD with Google Rich Results Test. Manual browser review for visual regression.

---

## File Map

| File | What changes |
|---|---|
| `index.html` | `<title>`, `<meta name="description">`, H1 text, 3× H2 texts, new `<p>` intro paragraph after H1 |
| `support.html` | `<title>`, `<meta name="description">`, 7× new `.faq-item` blocks, 7× new `@type:Question` entries in FAQPage JSON-LD |
| `sitemap.xml` | All `<lastmod>` dates → `2026-05-09` |

---

## Task 1: Update `index.html` title and meta description

**Files:**
- Modify: `index.html` lines 7–8

- [ ] **Step 1: Edit title tag**

In `index.html`, find:
```html
<title>Permly — Android Notification Manager | Block Apps Selectively, No Ads</title>
```
Replace with:
```html
<title>Permly — Selective Notification Blocker for Android | No Ads, No Tracking</title>
```

- [ ] **Step 2: Edit meta description**

Find:
```html
<meta name="description" content="Permly lets you mute specific app notifications with custom profiles — Work, Sleep, Focus, and more. No ads, no data collection, no tracking. Android 8.0+.">
```
Replace with:
```html
<meta name="description" content="Tired of constant app notifications? Permly lets you silence specific apps with custom profiles — Work, Sleep, Focus. No ads, no data collection. Free on Android 8.0+.">
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "seo: update index.html title and meta description"
```

---

## Task 2: Update `index.html` H1, add intro paragraph, rewrite 3 H2s

**Files:**
- Modify: `index.html` lines ~970–972, ~1015, ~1132, ~1156

- [ ] **Step 1: Rewrite H1**

Find:
```html
<h1>Permly — Notification Manager for Android</h1>
```
Replace with:
```html
<h1>Block App Notifications Selectively — Without Losing Calls or DMs</h1>
```

- [ ] **Step 2: Add intro paragraph after H1**

Find:
```html
<p class="tagline">Take Back Your Focus</p>
<p class="sub-tagline">The privacy-first notification blocker for Android. Mute distracting apps per profile — no ads, no tracking, no notification reading.</p>
```
Replace with:
```html
<p class="tagline">Take Back Your Focus</p>
<p class="sub-tagline">Most notification blockers silence everything — or nothing. Permly gives you selective control: mute specific apps per profile, switch with one tap, and keep calls and important messages coming through. All on-device, no account needed.</p>
```

- [ ] **Step 3: Rewrite screenshots section H2**

Find:
```html
<h2 id="screenshots-heading">See Permly in Action</h2>
```
Replace with:
```html
<h2 id="screenshots-heading">How Permly Works: One-Tap Notification Control</h2>
```

- [ ] **Step 4: Rewrite DND comparison H2**

Find:
```html
<h2 id="comparison-heading">Why Not Just Use Do Not Disturb?</h2>
```
Replace with:
```html
<h2 id="comparison-heading">Do Not Disturb vs Permly: What's the Difference?</h2>
```

- [ ] **Step 5: Rewrite competitor grid H2**

Find:
```html
<h2 id="competitors-heading">How Permly Compares</h2>
```
Replace with:
```html
<h2 id="competitors-heading">Permly vs Other Notification Apps</h2>
```

- [ ] **Step 6: Open index.html in a browser and verify visually**

Check:
- H1 renders correctly and doesn't overflow on mobile
- The `sub-tagline` paragraph reads naturally
- No layout shifts in the hero or section headings
- Sidenav links still work (they use `aria-labelledby` IDs which haven't changed)

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "seo: rewrite H1, sub-tagline, and 3 section H2s on index.html"
```

---

## Task 3: Update `support.html` title and meta description

**Files:**
- Modify: `support.html` lines 6–7

- [ ] **Step 1: Edit title tag**

Find:
```html
<title>Permly Support & FAQ — Notification Manager for Android</title>
```
Replace with:
```html
<title>Permly FAQ — How to Block App Notifications on Android | Support</title>
```

- [ ] **Step 2: Edit meta description**

Find:
```html
<meta name="description" content="Get help with Permly. FAQs on notification blocking, profile setup, permissions, scheduling, and privacy. Contact support at zartofapp@gmail.com.">
```
Replace with:
```html
<meta name="description" content="Answers to common questions about blocking app notifications on Android with Permly — profiles, scheduling, permissions, privacy, and troubleshooting.">
```

- [ ] **Step 3: Commit**

```bash
git add support.html
git commit -m "seo: update support.html title and meta description"
```

---

## Task 4: Add 7 new FAQ items to `support.html` HTML

**Files:**
- Modify: `support.html` — insert after the last existing `.faq-item` before the closing `</section>` of the FAQ section (around line 550)

The existing last FAQ item ends around line 550. Insert the following 7 blocks directly after it.

- [ ] **Step 1: Locate the insertion point**

In `support.html`, find the end of the last existing `.faq-item` in the FAQ section. The block to find is:

```html
                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        <span class="faq-question-text">Which Android versions are supported?</span>
```

The closing `</div>` of that item is your insertion point — add the new items after it.

- [ ] **Step 2: Insert the 7 new FAQ items**

After the closing `</div>` of the "Which Android versions are supported?" faq-item, insert:

```html
                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        <span class="faq-question-text">How do I mute notifications from a specific app on Android?</span>
                        <svg class="faq-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p>Permly is built exactly for this. Create a profile (e.g., "Work" or "Focus"), add the specific app you want to silence, and activate the profile with one tap. The app's notifications will be blocked while all your other apps continue normally.</p>
                        <p>You can add as many apps as you like to each profile, and switch between profiles instantly from the Permly home screen or the Quick Settings tile.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        <span class="faq-question-text">Can I block notifications on a schedule?</span>
                        <svg class="faq-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p>Yes — profile scheduling is a <strong>Pro feature</strong>. You can set a start and end time (and days of the week) for any profile, and Permly will activate and deactivate it automatically. For example, enable your Work profile every weekday from 9 AM to 5 PM without touching it manually.</p>
                        <p>You can also override the schedule at any time by toggling a profile on or off manually.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        <span class="faq-question-text">Will blocking notifications stop my calls too?</span>
                        <svg class="faq-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p><strong>No.</strong> Permly only blocks the notification alerts from the apps you choose. Phone calls come through a separate system channel that Permly does not touch — you will always receive calls regardless of which profile is active.</p>
                        <p>This is a key difference from Do Not Disturb, which can suppress calls entirely.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        <span class="faq-question-text">What's the difference between Permly and Do Not Disturb?</span>
                        <svg class="faq-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p>Do Not Disturb silences everything at once — calls, messages, all apps — and requires you to manage a complex exceptions list to let anything through. Permly takes the opposite approach: your phone stays normal, and you only mute the specific apps you choose per profile.</p>
                        <p>Use Do Not Disturb for emergencies or full-focus blocks. Use Permly for everyday situations where you want to silence distracting apps (like social media) without cutting off important ones (like messages from family).</p>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        <span class="faq-question-text">Does Permly work with WhatsApp, Instagram, or Gmail?</span>
                        <svg class="faq-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p>Yes. Permly works with any app that sends Android notifications — including WhatsApp, Instagram, Gmail, YouTube, TikTok, Twitter/X, Slack, and others. If it shows up in your notification shade, Permly can mute it selectively.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        <span class="faq-question-text">Is Permly free? What do I get without paying?</span>
                        <svg class="faq-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p>Permly is free to download with no ads and no time limit. The free tier includes up to 3 profiles and 7 days of notification statistics — enough for most users.</p>
                        <p><strong>Permly Pro</strong> unlocks unlimited profiles, automatic profile scheduling, and full statistics history. Pro is available as a monthly ($1.99/mo), yearly ($14.99/yr), or lifetime ($29.99) purchase. See the <a href="/#pricing">pricing section</a> for details.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        <span class="faq-question-text">How is Permly different from other notification manager apps?</span>
                        <svg class="faq-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p>Most notification apps show you a filtered inbox or add complexity on top of what you already have. Permly's approach is simpler: block the noise at the source, per profile, with one tap.</p>
                        <ul>
                            <li><strong>No ads.</strong> Ever. No ad network, no sponsored content.</li>
                            <li><strong>No data collection.</strong> Permly never reads notification content or sends anything off your device.</li>
                            <li><strong>Local-first.</strong> No account required, no cloud sync, no server dependency.</li>
                            <li><strong>One-tap switching.</strong> Switch profiles instantly from the home screen or Quick Settings tile.</li>
                        </ul>
                    </div>
                </div>
```

- [ ] **Step 3: Open support.html in a browser and verify**

Check:
- All 7 new FAQ items expand and collapse correctly
- Text reads naturally on mobile
- No layout issues or broken borders between items

- [ ] **Step 4: Commit**

```bash
git add support.html
git commit -m "seo: add 7 keyword-targeted FAQ items to support.html"
```

---

## Task 5: Add 7 new questions to FAQPage JSON-LD in `support.html`

**Files:**
- Modify: `support.html` lines 35–39 (the `mainEntity` array in the JSON-LD block)

- [ ] **Step 1: Expand the mainEntity array**

Find the closing of the existing `mainEntity` array:
```json
        {"@type":"Question","name":"Can I schedule profiles to activate automatically?","acceptedAnswer":{"@type":"Answer","text":"Yes! Profile scheduling is a Pro feature that lets you set start and end times for each profile so it activates automatically — for example, enabling your Work profile every weekday from 9 AM to 5 PM."}}
      ]
```

Replace with:
```json
        {"@type":"Question","name":"Can I schedule profiles to activate automatically?","acceptedAnswer":{"@type":"Answer","text":"Yes! Profile scheduling is a Pro feature that lets you set start and end times for each profile so it activates automatically — for example, enabling your Work profile every weekday from 9 AM to 5 PM."}},
        {"@type":"Question","name":"How do I mute notifications from a specific app on Android?","acceptedAnswer":{"@type":"Answer","text":"Permly is built exactly for this. Create a profile (e.g., Work or Focus), add the specific app you want to silence, and activate the profile with one tap. The app's notifications will be blocked while all your other apps continue normally. You can add as many apps as you like to each profile."}},
        {"@type":"Question","name":"Can I block notifications on a schedule?","acceptedAnswer":{"@type":"Answer","text":"Yes — profile scheduling is a Pro feature. You can set a start and end time (and days of the week) for any profile, and Permly will activate and deactivate it automatically. You can also override the schedule at any time by toggling a profile manually."}},
        {"@type":"Question","name":"Will blocking notifications stop my calls too?","acceptedAnswer":{"@type":"Answer","text":"No. Permly only blocks the notification alerts from the apps you choose. Phone calls come through a separate system channel that Permly does not touch — you will always receive calls regardless of which profile is active."}},
        {"@type":"Question","name":"What's the difference between Permly and Do Not Disturb?","acceptedAnswer":{"@type":"Answer","text":"Do Not Disturb silences everything at once. Permly takes the opposite approach: your phone stays normal, and you only mute the specific apps you choose per profile. Use Do Not Disturb for full-focus emergencies. Use Permly for everyday situations where you want to silence distracting apps without cutting off important ones."}},
        {"@type":"Question","name":"Does Permly work with WhatsApp, Instagram, or Gmail?","acceptedAnswer":{"@type":"Answer","text":"Yes. Permly works with any app that sends Android notifications — including WhatsApp, Instagram, Gmail, YouTube, TikTok, Twitter/X, Slack, and others. If it shows up in your notification shade, Permly can mute it selectively."}},
        {"@type":"Question","name":"Is Permly free? What do I get without paying?","acceptedAnswer":{"@type":"Answer","text":"Permly is free to download with no ads and no time limit. The free tier includes up to 3 profiles and 7 days of notification statistics. Permly Pro unlocks unlimited profiles, automatic profile scheduling, and full statistics history. Pro is available monthly ($1.99/mo), yearly ($14.99/yr), or as a one-time lifetime purchase ($29.99)."}},
        {"@type":"Question","name":"How is Permly different from other notification manager apps?","acceptedAnswer":{"@type":"Answer","text":"Permly blocks noise at the source, per profile, with one tap — no ads, no data collection, no account required. All data stays on your device. One-tap profile switching from the home screen or Quick Settings tile."}}
      ]
```

- [ ] **Step 2: Validate the JSON-LD**

Open the Google Rich Results Test at `https://search.google.com/test/rich-results`, enter `https://permly.app/support` (after deploy) or paste the raw HTML. Confirm the FAQPage type is detected and all questions appear with no errors.

Alternatively, paste the JSON-LD block into `https://validator.schema.org/` to check for syntax errors before deploying.

- [ ] **Step 3: Commit**

```bash
git add support.html
git commit -m "seo: add 7 new questions to FAQPage JSON-LD in support.html"
```

---

## Task 6: Update sitemap.xml lastmod dates

**Files:**
- Modify: `sitemap.xml`

- [ ] **Step 1: Update all lastmod dates**

In `sitemap.xml`, find every occurrence of a `<lastmod>` date and replace with `2026-05-09`. There should be 4 entries (home, support, privacy-policy, terms-of-service).

Example — replace:
```xml
<lastmod>2025-XX-XX</lastmod>
```
With:
```xml
<lastmod>2026-05-09</lastmod>
```

Do this for all 4 `<lastmod>` entries.

- [ ] **Step 2: Commit**

```bash
git add sitemap.xml
git commit -m "seo: update sitemap lastmod dates to 2026-05-09"
```

---

## Task 7: Final verification before push

- [ ] **Step 1: Open index.html in browser — verify visually**

Check: H1 readable, sub-tagline paragraph flows well, H2 section headings all correct, no broken layout.

- [ ] **Step 2: Open support.html in browser — verify FAQ accordion**

Check: all 7 new FAQ items open/close correctly, no broken styling, mobile layout intact.

- [ ] **Step 3: Check all internal links still work**

Verify `/#pricing`, `/support`, `/privacy-policy`, `/terms-of-service` links in the new FAQ answers resolve correctly.

- [ ] **Step 4: Push to main**

```bash
git push origin main
```

GitHub Pages will auto-deploy to `permly.app` within ~2 minutes.

- [ ] **Step 5: Verify live site**

Visit `https://permly.app` and `https://permly.app/support` and confirm changes are live.

- [ ] **Step 6: Submit to Google Search Console**

In Google Search Console → URL Inspection → enter `https://permly.app` → Request Indexing. Repeat for `https://permly.app/support`.
