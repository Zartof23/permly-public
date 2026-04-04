# Permly Public Website - Context for Claude

> **Purpose**: This repository hosts the public-facing website and documentation for Permly, an Android notification manager app.

---

## 📌 Repository Overview

**What this repository contains**:
- Marketing website (landing page)
- Legal documents (Privacy Policy, Terms of Service)
- Support resources (FAQs, contact information)
- Public documentation

**What this repository does NOT contain**:
- App source code (proprietary)
- Internal documentation
- Build scripts or development tools
- Architectural details or implementation specifics

---

## 🎯 Repository Purpose

This is a **GitHub Pages website** (served at `permly.app`) that provides:
1. **Legal compliance** - Privacy Policy and Terms of Service required by Google Play Store
2. **User support** - FAQs, troubleshooting, contact information
3. **Marketing presence** - Public-facing information about Permly
4. **Data deletion instructions** - Required for privacy compliance

---

## 📁 File Structure

```
permly-public/
├── README.md                  # Repository overview
├── CLAUDE.md                  # This file - AI context
├── CNAME                      # Custom domain: permly.app
├── sitemap.xml                # XML sitemap for search engines
├── 404.html                   # Custom 404 page
├── index.html                 # Landing page
├── privacy-policy.html        # Privacy Policy (required by Play Store)
├── terms-of-service.html      # Terms of Service (required for IAP)
├── support.html               # Support page with FAQs
├── .well-known/
│   └── assetlinks.json        # Android App Links verification (Digital Asset Links)
└── assets/                    # Images, logos, etc.
    ├── icon.png
    ├── screenshots/
    │   ├── phone/
    │   └── tablet/
    └── logo.png
```

---

## 🔄 Maintenance Guidelines

### When to Update Files

**index.html**:
- When app features change
- When updating marketing copy
- When adding screenshots or testimonials
- Before major releases

**privacy-policy.html**:
- When data collection practices change (currently: we collect nothing)
- When adding third-party services (analytics, crash reporting, etc.)
- When permissions change
- At least annually for review

**terms-of-service.html**:
- When pricing changes
- When adding new subscription tiers
- When legal requirements change
- When adding/removing features

**support.html**:
- When adding new FAQs based on user questions
- When troubleshooting steps change
- When contact information changes
- When new features are released

**sitemap.xml**:
- Update `<lastmod>` dates whenever any page content changes
- All four URLs must always be present

### Update Protocol

1. Make changes to HTML files
2. Update `sitemap.xml` `<lastmod>` dates to today
3. Test locally (open in browser)
4. Commit with clear message
5. GitHub Pages will auto-deploy to `permly.app`
6. Verify live site after deployment

---

## 🎨 Brand Guidelines

### Brand Voice
- **Metaphor**: Guardian/protector of user's attention
- **Tone**: Calm, trustworthy, empowering (NOT aggressive or negative)
- **Tagline**: "Your Focus Guardian"

### Color Palette
- **Primary**: Indigo (`#4F46E5` / `--indigo`)
- **Primary Light**: `#6366F1` / `--indigo-light`
- **Violet**: `#7C3AED` / `--violet`
- **Dark background**: `#0B0F1A` / `--dark`
- **Surface**: `#ffffff` / `--surface`
- **Surface Alt**: `#F7F8FF` / `--surface-alt`
- **Border**: `#E5E7EB` / `--border`
- **Border Indigo**: `#C7D2FE` / `--border-indigo`
- **Text Primary**: `#111827` / `--text-primary`
- **Text Secondary**: `#4B5563` / `--text-secondary`
- **Text Muted**: `#6B7280` / `--text-muted` *(minimum contrast-compliant value, do not go lighter)*
- **Accent / Success**: `#10B981` (emerald, used for save chips, checkmarks)

### Typography
- **Headings**: Inter (loaded via Google Fonts, non-blocking)
- **Body**: System default (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)

### Key Messages
- **Privacy-first**: Never read notification content
- **Selective control**: Not all-or-nothing blocking
- **Simple UX**: One-tap profile switching
- **Local-first**: All data stays on device

---

## 💰 Pricing

Current pricing tiers on the live site:

| Plan | Price | Notes |
|------|-------|-------|
| Free | $0 | Up to 3 profiles, 7-day stats |
| Pro — Monthly | $1.99/mo | Cancel anytime |
| Pro — Yearly | $14.99/yr | $1.25/mo effective · saves 37% vs monthly |
| Pro — Lifetime | $29.99 | One-time purchase |

The pricing section on `index.html` uses a **Monthly/Yearly toggle** above the Pro card. When "Yearly" is selected, the price updates to show the effective monthly rate (`$1.25/mo`) with a "billed $14.99 per year" subline. The "Save 37%" chip lives on the Yearly button in the toggle.

---

## 📝 Content Guidelines

### What to Include
- User-facing features and benefits
- Privacy commitments and policies
- Support information and FAQs
- Pricing and subscription details
- Contact information

### What NOT to Include
- Internal architecture details
- Implementation specifics
- Database schemas or technical diagrams
- Business strategy or competitive analysis
- Revenue projections or metrics
- Development roadmaps with dates
- Internal tooling or build processes

---

## 🔒 Privacy Principles

When updating content, remember:
1. **We collect ZERO data** - Emphasize this everywhere
2. **No third-party services** - No analytics, ads, or tracking
3. **Local-first** - All data stays on device
4. **Minimal permissions** - Only Notification Access (required)
5. **Transparent** - Clear about what we access and why

### Permissions Used by the App

| Permission | Purpose | Required |
|-----------|---------|---------|
| Notification Access | Intercept and block notifications from muted apps | Yes |
| Receive Boot Completed | Restart notification service after device reboot | Yes |
| Post Notifications | Show service status notification (Android 13+) | Yes (Android 13+) |
| Wake Lock | Keep notification service running reliably | Yes |

---

## 🆘 Support Information

### Contact Points
- **Email**: zartofapp@gmail.com
- **GitHub Issues**: For bug reports and feature requests
- **Support Page**: https://permly.app/support.html

### Response Guidelines
- Email support: Respond within 48 hours
- Pro users: Priority support within 24 hours
- GitHub issues: Acknowledge within 1 week

---

## 🚀 Deployment

This repository uses **GitHub Pages** with a custom domain.

- **Live URL**: `https://permly.app/`
- **Custom domain**: configured via `CNAME` file
- **Deploy**: push to `main` branch → GitHub Pages auto-deploys

---

## 📋 Checklist for Updates

Before committing changes:

- [ ] All links work (no broken links)
- [ ] Contact email is correct (zartofapp@gmail.com)
- [ ] "Last Updated" dates are current
- [ ] `sitemap.xml` `<lastmod>` dates updated to today
- [ ] No internal/sensitive information exposed
- [ ] Brand voice is consistent
- [ ] Mobile-responsive (test on phone)
- [ ] No typos or grammar errors
- [ ] Privacy policy reflects current practices
- [ ] Terms of Service reflect current pricing

---

## 🎯 Google Play Store Requirements

This website fulfills Play Store requirements:

✅ **Privacy Policy** (Required)
- URL: `https://permly.app/privacy-policy.html`
- Add this URL to Play Console → App content → Privacy Policy

✅ **Terms of Service** (Required for IAP)
- URL: `https://permly.app/terms-of-service.html`
- Reference in app and Play Store listing

✅ **Support/Contact** (Recommended)
- URL: `https://permly.app/support.html`
- Email: zartofapp@gmail.com

✅ **Data Deletion Instructions** (Required for data collection)
- Since we don't collect data, instructions in support.html explain local deletion

---

## 🛠️ Technical Notes

### HTML Structure
- Semantic HTML5
- Mobile-first responsive design
- Inline CSS for simplicity and speed (no external stylesheet)
- Minimal JavaScript (FAQ accordion, carousel drag-scroll, pricing toggle)
- Accessible (ARIA labels, `aria-expanded`, `aria-current`, semantic tags)

### SEO & Performance
- Non-blocking Google Fonts (`preload` + `media="print"` pattern)
- `fetchpriority="high"` on first carousel image (LCP)
- `<link rel="preload" as="image">` for hero icon
- Open Graph + Twitter Card meta on all pages
- Schema.org structured data: `SoftwareApplication` (index), `FAQPage` (support), `WebPage` (privacy, terms)
- `sitemap.xml` with all four URLs
- `--text-muted` is `#6B7280` — do not use `#9CA3AF` or lighter (fails WCAG AA contrast)

### Accessibility
- All hamburger buttons have `aria-expanded` toggled by JS
- Screenshot carousel has `tabindex="0"` and ArrowLeft/ArrowRight keyboard support
- Sidenav labels visible on `:focus-within`
- Footer links include `aria-current="page"` on the current page link
- Competitor comparison grid uses `role="region"` (not `role="table"`) because `display:contents` on rows breaks ARIA table semantics

---

## 📞 Important URLs

### Live Site
- **Home**: `https://permly.app/`
- **Privacy Policy**: `https://permly.app/privacy-policy.html`
- **Terms of Service**: `https://permly.app/terms-of-service.html`
- **Support**: `https://permly.app/support.html`

### Google Play Console
- **Privacy Policy**: `https://permly.app/privacy-policy.html`
- **Website**: `https://permly.app/`
- **Support Email**: zartofapp@gmail.com

### In-App Links
- Privacy Policy: Link from app settings
- Terms of Service: Link from subscription screen
- Support: Link from help/about screen

### Google Play Store Links (UTM)

All links to the Play Store must include UTM parameters for conversion tracking. Use the values below — do not invent new ones without updating this table.

**Base URL**: `https://play.google.com/store/apps/details?id=com.permly`

| Parameter | Value |
|-----------|-------|
| `utm_source` | `permly_website` |
| `utm_campaign` | `download_cta` |
| `utm_medium` | *(depends on placement — see table below)* |

**`utm_medium` values by placement**:

| Placement | `utm_medium` | Files |
|-----------|-------------|-------|
| Top navigation bar CTA ("Download" button) | `navbar` | all pages |
| Hero section primary CTA button | `hero` | `index.html` |
| Inline text link inside body content | `inline` | `support.html` |

**Full example** (navbar):
```
https://play.google.com/store/apps/details?id=com.permly&utm_source=permly_website&utm_medium=navbar&utm_campaign=download_cta
```

**When adding a new Play Store link**:
1. Pick the appropriate `utm_medium` from the table above (or add a new row if it's a new placement type)
2. Keep `utm_source` and `utm_campaign` unchanged
3. Update this table if you introduce a new `utm_medium` value

---

## 🔄 Version Control

### Commit Message Format
```
type: brief description

- Detailed change 1
- Detailed change 2
```

**Types**:
- `content:` - Content updates (copy changes, FAQs)
- `legal:` - Legal document updates (Privacy, Terms)
- `design:` - Visual/styling changes
- `fix:` - Bug fixes or corrections
- `feat:` - New pages or features
- `seo:` - SEO, meta tags, sitemap, structured data

**Examples**:
```
legal: update privacy policy last modified date

- Updated "Last Updated" date to 2026-04-03
- No content changes
```

```
content: add FAQ about profile scheduling

- Added new FAQ explaining scheduling is Pro-only
- Updated support.html
```

---

## 💡 Guidelines for AI Assistants

### When Helping with Updates

**DO**:
- Update user-facing content based on app changes
- Add new FAQs based on common user questions
- Improve clarity and readability
- Fix typos and broken links
- Ensure mobile responsiveness
- Maintain brand voice consistency
- Update `sitemap.xml` `<lastmod>` dates when content changes

**DON'T**:
- Expose internal architecture or implementation details
- Share business metrics or revenue data
- Include development roadmaps with specific dates
- Add analytics or tracking code
- Reference internal documentation
- Use technical jargon unnecessarily
- Use `#9CA3AF` or lighter for muted text (fails contrast)
- Add `role="table/row/cell"` to CSS-grid elements using `display:contents`

### Content Style
- Write in second person ("you" not "the user")
- Keep paragraphs short (2-4 sentences)
- Use bullet points for scanability
- Be concise and clear
- Avoid marketing hype or exaggeration
- Focus on benefits, not just features

---

## 🎓 Common Tasks

### Adding a New FAQ
1. Open `support.html`
2. Copy existing FAQ div structure
3. Add question as `<span class="faq-question-text">`
4. Add answer in `.faq-answer` div
5. Test toggle functionality
6. Commit with message: `content: add FAQ about [topic]`

### Updating Pricing
1. Update `terms-of-service.html` (subscription section)
2. Update `index.html`: JSON-LD offers array + `setBilling()` JS function + any hardcoded prices
3. Update `support.html` (Free vs Pro table)
4. Update `README.md` (pricing section)
5. Update this `CLAUDE.md` (Pricing table)
6. Commit with message: `content: update pricing to $X.XX`

### Changing Contact Email
1. Search and replace in all HTML files
2. Update `README.md`
3. Update this `CLAUDE.md` file
4. Commit with message: `content: update contact email`

### Updating the Sitemap
- Edit `sitemap.xml` and set all `<lastmod>` values to today's date (YYYY-MM-DD)
- Do this whenever any page content changes

---

## 📧 Contact

**Developer**: zartofapp@gmail.com

For issues with this repository (not the app):
- Open an issue in this repository
- Email with subject: "[Website] Your issue here"

---

**Remember**: This is a public repository. Never commit sensitive information, API keys, internal documentation, or proprietary code.
