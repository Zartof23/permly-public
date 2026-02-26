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

This is a **GitHub Pages website** that provides:
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
├── index.html                 # Landing page
├── privacy-policy.html        # Privacy Policy (required by Play Store)
├── terms-of-service.html      # Terms of Service (required for IAP)
├── support.html               # Support page with FAQs
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

### Update Protocol

1. Make changes to HTML files
2. Test locally (open in browser)
3. Commit with clear message
4. GitHub Pages will auto-deploy
5. Verify live site after deployment

---

## 🎨 Brand Guidelines

### Brand Voice
- **Metaphor**: Guardian/protector of user's attention
- **Tone**: Calm, trustworthy, empowering (NOT aggressive or negative)
- **Tagline**: "Your Focus Guardian"

### Color Palette
- **Primary**: Indigo (#4F46E5 / indigo-600)
- **Primary hover**: Dark Indigo (#4338CA / indigo-700)
- **Accent**: Brand Emerald (#10B981, success states)
- **Background**: Soft gradient — Blue-50 (#EEF2FF) → Indigo-50 (#E0E7FF) → Purple-50 (#FAF5FF)

### Typography
- **Headings**: Inter or system sans-serif
- **Body**: System default (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)

### Key Messages
- **Privacy-first**: Never read notification content
- **Selective control**: Not all-or-nothing blocking
- **Simple UX**: One-tap profile switching
- **Local-first**: All data stays on device

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

---

## 🆘 Support Information

### Contact Points
- **Email**: zartofapp@gmail.com
- **GitHub Issues**: For bug reports and feature requests
- **Support Page**: https://Zartof23.github.io/permly-public/support.html

### Response Guidelines
- Email support: Respond within 48 hours
- Pro users: Priority support within 24 hours
- GitHub issues: Acknowledge within 1 week

---

## 🚀 Deployment

This repository uses **GitHub Pages** for hosting.

### How to Deploy
1. Push changes to `main` branch
2. GitHub Pages auto-deploys
3. Site available at: `https://Zartof23.github.io/permly-public/`

### Custom Domain (Optional)
If you set up a custom domain:
1. Add CNAME file with domain name
2. Configure DNS records at domain registrar
3. Enable HTTPS in GitHub Pages settings

---

## 📋 Checklist for Updates

Before committing changes:

- [ ] All links work (no broken links)
- [ ] Contact email is correct (zartofapp@gmail.com)
- [ ] "Last Updated" dates are current
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
- URL: `https://Zartof23.github.io/permly-public/privacy-policy.html`
- Add this URL to Play Console → App content → Privacy Policy

✅ **Terms of Service** (Required for IAP)
- URL: `https://Zartof23.github.io/permly-public/terms-of-service.html`
- Reference in app and Play Store listing

✅ **Support/Contact** (Recommended)
- URL: `https://Zartof23.github.io/permly-public/support.html`
- Email: zartofapp@gmail.com

✅ **Data Deletion Instructions** (Required for data collection)
- Since we don't collect data, instructions in support.html explain local deletion

---

## 🛠️ Technical Notes

### HTML Structure
- Semantic HTML5
- Mobile-first responsive design
- No JavaScript dependencies (except minimal FAQ toggles)
- Inline CSS for simplicity and speed
- Accessible (ARIA labels, semantic tags)

### SEO Optimization
- Meta descriptions on all pages
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for images
- Structured data (future enhancement)

### Performance
- Minimal external resources
- Inline styles (no external CSS)
- SVG icons (no icon fonts)
- Optimized images (when added)

---

## 📞 Important URLs

Once deployed, these URLs must be added to:

### Google Play Console
- **Privacy Policy**: `https://Zartof23.github.io/permly-public/privacy-policy.html`
- **Website**: `https://Zartof23.github.io/permly-public/`
- **Support Email**: zartofapp@gmail.com

### In-App Links (if needed)
- Privacy Policy: Link from app settings
- Terms of Service: Link from subscription screen
- Support: Link from help/about screen

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

**Examples**:
```
legal: update privacy policy last modified date

- Updated "Last Updated" date to 2026-02-07
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

**DON'T**:
- Expose internal architecture or implementation details
- Share business metrics or revenue data
- Include development roadmaps with specific dates
- Add analytics or tracking code
- Reference internal documentation
- Use technical jargon unnecessarily

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
3. Add question as H3
4. Add answer in `.faq-answer` div
5. Test toggle functionality
6. Commit with message: `content: add FAQ about [topic]`

### Updating Pricing
1. Update `terms-of-service.html` (subscription section)
2. Update `index.html` (pricing mentions)
3. Update `support.html` (Free vs Pro table)
4. Update `README.md` (pricing section)
5. Commit with message: `content: update pricing to $X.XX`

### Changing Contact Email
1. Search and replace in all HTML files
2. Update README.md
3. Update this CLAUDE.md file
4. Commit with message: `content: update contact email`

---

## 📧 Contact

**Developer**: zartofapp@gmail.com

For issues with this repository (not the app):
- Open an issue in this repository
- Email with subject: "[Website] Your issue here"

---

**Remember**: This is a public repository. Never commit sensitive information, API keys, internal documentation, or proprietary code.
