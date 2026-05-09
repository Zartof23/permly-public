# SEO Phase B Design — Permly Website

**Date:** 2026-05-09
**Scope:** On-page rewrites + FAQ expansion across `index.html` and `support.html`
**Goal:** Rank for the full search funnel — awareness (frustrated users) and decision (app shoppers comparing options)
**Out of scope:** New pages, blog, comparison page (→ ZAR-8 Phase C)

---

## Keyword Targets

### Primary (decision stage)
- `android notification manager app`
- `selective notification blocker android`
- `block specific app notifications android`
- `notification profiles android`

### Long-tail (awareness stage, question-based)
- `how to mute specific app notifications android`
- `how to silence notifications from one app android`
- `android block notifications on schedule`
- `notification blocker without blocking calls android`
- `do not disturb vs notification manager android`

### Branded / comparison
- `permly app`, `permly notification manager`
- `buzzkill alternative android`, `filterbox alternative`

**Mapping:** Primary keywords → `index.html`. Question-based long-tails → `support.html` FAQ section (FAQPage schema already in place).

---

## Changes: `index.html`

### Title tag
**Before:** `Permly — Android Notification Manager | Block Apps Selectively, No Ads`
**After:** `Permly — Selective Notification Blocker for Android | No Ads, No Tracking`

Rationale: leads with the differentiating keyword phrase ("selective notification blocker") and includes "No Tracking" which is a distinct search intent from "No Ads".

### Meta description
**Before:** `Permly lets you mute specific app notifications with custom profiles — Work, Sleep, Focus, and more. No ads, no data collection, no tracking. Android 8.0+.`
**After:** `Tired of constant app notifications? Permly lets you silence specific apps with custom profiles — Work, Sleep, Focus. No ads, no data collection. Free on Android 8.0+.`

Rationale: opens with the user's pain point (awareness hook), uses "silence specific apps" (matches search phrasing), includes "Free" (decision-stage signal).

### H1
**Before:** `Permly — Notification Manager for Android`
**After:** `Block App Notifications Selectively — Without Losing Calls or DMs`

Rationale: targets the primary objection ("I don't want to silence everything") and includes action-oriented keyword phrasing. Brand name moves to the nav/logo, which is fine for SEO.

### H2 rewrites
| Section | Before | After |
|---|---|---|
| Screenshots | `See Permly in Action` | `How Permly Works: One-Tap Notification Control` |
| DND comparison | `Why Not Just Use Do Not Disturb?` | `Do Not Disturb vs Permly: What's the Difference?` |
| Competitor grid | `How Permly Compares` | `Permly vs Other Notification Apps` |

Sections "Selective Blocking — Not All-or-Nothing", "How It Works", "Built for Real Situations", and "Simple, Honest Pricing" are kept as-is — they are already clear and user-focused.

### Body copy addition
Add a short paragraph (2–3 sentences) below the H1, before the CTA buttons:

> Most notification blockers silence everything — or nothing. Permly gives you selective control: mute specific apps per profile, switch with one tap, and keep calls and important messages coming through. All on-device, no account needed.

This paragraph introduces the key differentiators naturally with keyword density for: "notification blockers", "selective control", "mute specific apps", "profile".

### JSON-LD schema
No changes in this phase. Current Play Store rating is 4.8 stars but with fewer than 20 reviews — Google does not surface the star snippet below that threshold. Add `aggregateRating` (ratingValue: 4.8, ratingCount: actual count) once reviews reach ~20+.

---

## Changes: `support.html`

### Title tag
**Before:** `Permly Support & FAQ — Notification Manager for Android`
**After:** `Permly FAQ — How to Block App Notifications on Android | Support`

Rationale: "How to Block App Notifications on Android" is the most-searched instructional query in this space. Moving it into the title tag directly captures that intent.

### Meta description
**Before:** `Get help with Permly. FAQs on notification blocking, profile setup, permissions, scheduling, and privacy. Contact support at zartofapp@gmail.com.`
**After:** `Answers to common questions about blocking app notifications on Android with Permly — profiles, scheduling, permissions, privacy, and troubleshooting.`

Rationale: more natural language matching how users search; removes the email (irrelevant in a snippet).

### New FAQ entries to add
Each FAQ answer should be 2–4 sentences — enough to be a featured snippet candidate, short enough to stay scannable.

1. **"How do I mute notifications from a specific app on Android?"**
   Target query: `how to mute specific app notifications android`
   Answer: Explain that Permly handles this — create a profile, add the app, activate. This is the highest-volume awareness query.

2. **"Can I block notifications on a schedule?"**
   Target query: `android block notifications on schedule`
   Answer: Explain scheduled profiles (Pro feature). Low-competition long-tail.

3. **"Will blocking notifications stop my calls too?"**
   Target query: `notification blocker without blocking calls android`
   Answer: Explain that Permly only blocks notifications from selected apps — calls use a separate system channel and are unaffected.

4. **"What's the difference between Permly and Do Not Disturb?"**
   Target query: `do not disturb vs notification manager android`
   Answer: DND silences everything; Permly silences only the apps you choose, per profile. Keep DND for emergencies; use Permly for everyday focus.

5. **"Does Permly work with WhatsApp, Instagram, or Gmail?"**
   Target query: `[app name] notification blocker android`
   Answer: Yes — Permly works with any app that sends Android notifications, including WhatsApp, Instagram, Gmail, and others.

6. **"Is Permly free? What do I get without paying?"**
   Target query: `permly free`, `notification manager android free`
   Answer: Free tier includes up to 3 profiles and 7-day stats. Pro unlocks unlimited profiles, scheduling, and extended stats.

7. **"How is Permly different from other notification manager apps?"**
   Target query: `permly vs buzzkill`, `notification manager app comparison`
   Answer: Key differentiators — no ads, no data collection, local-first, one-tap profile switching, privacy-first design.

---

## Changes: `sitemap.xml`

Update all `<lastmod>` dates to `2026-05-09` after both pages are updated.

---

## What is NOT changing

- Visual design, layout, color palette
- Legal pages (`privacy-policy.html`, `terms-of-service.html`)
- Redirect pages (`open.html`, `upgrade.html`)
- `404.html`
- Any asset files
- Internal link structure
- Existing FAQ questions (only adding new ones)

---

## Success criteria

- `index.html` title and description updated and passing Google Search Console coverage check
- `support.html` FAQ section has 7+ new questions with keyword-rich answers
- FAQPage JSON-LD on support.html remains valid (test with Rich Results Test)
- No broken links introduced
- Sitemap `<lastmod>` dates current
- WCAG contrast unchanged (no color changes)
