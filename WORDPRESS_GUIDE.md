# SkillNest — WordPress Marketing Site Guide

## Overview
This document covers the complete WordPress site structure, content, and plugin setup
for the SkillNest marketing website hosted on Hostinger.

---

## Recommended Theme
**Astra** (free) — lightweight, fast, and highly customizable with Elementor.

Alternative: **Kadence** or **GeneratePress**

---

## Plugins to Install

| Plugin | Purpose |
|--------|---------|
| Elementor (free) | Page builder for visual layouts |
| WPForms Lite | Contact form on Contact page |
| Yoast SEO | Meta titles, descriptions, sitemap |
| W3 Total Cache | Performance / caching |
| UpdraftPlus | Automated backups |
| WP Mail SMTP | Fix WordPress email delivery |

---

## Site Pages & Content

### 1. Home Page
**Tagline:** "Learn Skills That Actually Matter"

**Sections:**
- Hero: Full-width banner with headline, subtext, and two CTAs ("Browse Courses" → /courses, "Get Started Free" → /register on your MERN app)
- Stats bar: 6+ Courses · 500+ Students · 4.8★ Rating · 100% Self-paced
- Featured Courses: 3 course cards with title, category, duration, price
- Why SkillNest: 4 feature blocks (Learn at Your Pace / Expert Instructors / Certificate / Lifetime Access)
- Testimonials: 2–3 student quotes
- Final CTA banner: "Ready to level up?" with Register button

**SEO Title:** SkillNest | Discover Short Courses & Workshops
**Meta Description:** SkillNest helps students find and enroll in short, expert-led courses and workshops. Browse 6+ courses in Design, Development, Marketing & more.

---

### 2. About Page
**Headline:** "Built for Real Learning"

**Sections:**
- Mission statement paragraph (2–3 sentences about SkillNest's purpose)
- Our Story: How SkillNest was founded, the problem it solves
- Team section: 2–3 fictional instructor cards (name, role, photo placeholder)
- Values: 3 blocks — Student-First, Quality Content, Accessible Learning

**Sample Mission Text:**
> SkillNest was built because learning shouldn't be a full-time commitment. We partner with practitioners and industry experts to deliver focused, no-fluff workshops that fit your schedule and advance your career.

**SEO Title:** About SkillNest | Our Mission & Team
**Meta Description:** Learn about SkillNest's mission to make quality skill-based education accessible to everyone. Meet our team of expert instructors.

---

### 3. Courses Page
**Headline:** "All Courses"

**Sections:**
- Intro paragraph about the catalog
- Course grid: 6 cards (manually created in WordPress matching the MERN app courses)
  - UI/UX Design Fundamentals — Design — 6 weeks — ₹999
  - Full Stack MERN — Development — 12 weeks — ₹2,499
  - Digital Marketing Mastery — Marketing — 4 weeks — ₹799
  - Data Science with Python — Data Science — 10 weeks — ₹1,999
  - Business Communication — Business — 3 weeks — ₹599
  - Mobile Photography — Photography — 2 weeks — ₹399
- Each card links to the corresponding MERN app course detail page
- CTA at bottom: "Ready to enroll? Visit our platform →" (links to MERN app)

**Note:** Use Elementor's Posts or manual columns for the grid. Each card needs: thumbnail image, title, category badge, duration, price, "Learn More" button.

**SEO Title:** All Courses | SkillNest
**Meta Description:** Browse all SkillNest courses — from UI/UX Design to Full Stack Development. Find your next skill and enroll today.

---

### 4. Contact Page
**Headline:** "Get in Touch"

**Sections:**
- Short intro: "Have a question? We'd love to hear from you."
- WPForms contact form with fields:
  - Name (required)
  - Email (required)
  - Subject (dropdown: General Enquiry / Course Question / Partnership / Other)
  - Message (required)
  - Submit button: "Send Message"
- Contact info block:
  - Email: hello@skillnest.com
  - Response time: Within 24 hours
- Optional: Google Maps embed or simple office address

**SEO Title:** Contact SkillNest | Get in Touch
**Meta Description:** Have a question about SkillNest or our courses? Contact our team and we'll get back to you within 24 hours.

---

## Navigation Menu Structure

**Primary Menu:**
- Home → /
- About → /about
- Courses → /courses
- Contact → /contact

**Header CTA Button:**
- "Launch App" → [your MERN app URL] (opens in new tab)

**Footer Menu:**
- Home · About · Courses · Contact · Privacy Policy

---

## Hostinger Setup Steps

1. **Log in** to Hostinger hPanel → Websites → Manage
2. **Install WordPress** via Auto Installer (one-click)
3. **Point domain** (or use free subdomain like `skillnest.great-site.net`)
4. **Install Astra theme** → Appearance → Themes → Add New → search "Astra"
5. **Install Elementor** → Plugins → Add New → search "Elementor"
6. **Import Astra Starter Template** (optional) for faster setup
7. **Create pages** in WordPress Admin → Pages → Add New
8. **Build each page** with Elementor drag-and-drop
9. **Set Homepage** → Settings → Reading → Static Page → Home
10. **Configure Yoast SEO** with site name and tagline

---

## Color & Font Settings (match MERN app)

In Astra Theme Customizer:
- **Primary Color:** #f97316 (orange)
- **Accent Color:** #fb923c
- **Background:** #0a0a0f
- **Text:** #e8e8f0
- **Headings Font:** Clash Display (or DM Sans as fallback)
- **Body Font:** Cabinet Grotesk (or Inter as fallback)

Add custom fonts via **Fonts Plugin** or paste @import in Appearance → Customize → Additional CSS:
```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,600&f[]=cabinet-grotesk@400,500&display=swap');

body { font-family: 'Cabinet Grotesk', sans-serif; }
h1, h2, h3 { font-family: 'Clash Display', sans-serif; }
```

---

## Linking WordPress ↔ MERN App

Add this to every "Enroll" and "Get Started" button on WordPress:
- URL: `https://[your-vercel-url].vercel.app/register`
- Open in: New Tab

Add a persistent header banner or sticky button:
```
🚀 Ready to start? → Launch the App
```
This links visitors from the marketing site to the actual platform.
