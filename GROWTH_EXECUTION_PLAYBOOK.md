# EduGrowth Growth Execution Playbook (Phases 1-12)

## Phase 1 - Technical SEO Foundation
Status: Done in code
- Core metadata upgraded on homepage, abroad-zone, outsourcing.
- Canonicals normalized by route.
- Sitemap expanded with money pages, local pages, blog pages.
- Robots file already allows crawling and points to sitemap.

## Phase 2 - SEO Architecture Expansion
Status: Done in code
- Added country pages, city pages, outsourcing service pages, program pages.
- Added blog hub and published article routes.
- Added internal linking blocks from core pages to new clusters.

## Phase 3 - Content Cluster Launch
Status: Done in code
- 6 full SEO articles published under /blog/*.
- Blog hub updated with published list and 50+ editorial ideas.

## Phase 4 - CRO Core
Status: Done in code
- Sticky CTA added globally (consultation + WhatsApp).
- Dedicated /book-consultation conversion page with lead form.
- Outsourcing lead form + consultation section integrated.

## Phase 5 - CRO Advanced
Status: Done in code
- Exit-intent popup with lead magnet (PDF), consultation CTA, WhatsApp CTA.

## Phase 6 - Tracking and Analytics
Status: Done in code
- GA4 bootstrapped via VITE_GA4_ID in main.jsx.
- Conversion tracking utility added.
- CTA clicks and generate_lead events instrumented.

## Phase 7 - B2B Positioning
Status: Done in code
- Dedicated pages:
  - /education-outsourcing-tunisia
  - /student-recruitment-outsourcing
  - /externalisation-services-tunisie
- Messaging aligned to cost-saving, speed, multilingual conversion.

## Phase 8 - B2C Positioning
Status: Done in code
- Abroad Zone SEO and conversion messaging improved.
- Country guides + program pages launched.
- City landing pages for Tunis/Sousse/Sfax with multilingual keyword lines.

## Phase 9 - Local SEO Tunisia Domination
Status: Partly done in code + Ops actions required
Done in code:
- Local landing pages for Tunis/Sousse/Sfax.
- Local outsourcing pages for Tunis/Sousse/Sfax.
Ops required outside code:
- Optimize Google Business Profile.
- Collect and reply to reviews weekly.
- Keep NAP consistency across directories.

## Phase 10 - Structured Data
Status: Done in code
- Existing Organization + Service graph retained.
- Service + FAQ schema added on key pages.

## Phase 11 - Funnel Strategy
Status: Done in code + Ops sequence required
Done in code:
- TOFU: blog cluster + guides.
- MOFU: lead magnet popup + case study PDF.
- BOFU: consultation page + WhatsApp + forms.
Ops sequence:
1. Weekly content publication cadence.
2. Retargeting audiences from blog and outsourcing pages.
3. Sales playbook for inbound WhatsApp leads.

## Phase 12 - 90-Day Execution Cadence
Status: Ready
Week 1-2:
- Monitor indexing and fix pages with low impressions.
- Submit sitemap and request indexing for new URLs.
Week 3-6:
- Publish 3 posts/week from the blog backlog.
- Build 6 additional country/program pages.
Week 7-10:
- Launch A/B tests on hero CTA copy and popup offer.
- Improve pages with high bounce and low CTR.
Week 11-12:
- Scale internal linking and add case studies.
- Push conversion optimization from GA4 data.

## KPI Targets
- Organic clicks (FR + EN): +30% in 90 days.
- Consultation leads: +40% in 90 days.
- WhatsApp lead starts: +35% in 90 days.
- B2B lead conversion rate: +20% in 90 days.

## GA4 Key Events to Mark as Conversions
- generate_lead
- cta_click (filtered by cta_type contains consultation)
- popup_view (for funnel diagnostics only)

## Funnel URLs (Live)
- Student Ads Landing: /lp/study-abroad
- B2B Ads Landing: /lp/outsourcing
- Conversion Page: /book-consultation
- Thank You Page: /thank-you

## UTM Tracking Ready
Recommended ad URL format:
`https://edugrowth.tn/lp/outsourcing?utm_source=google&utm_medium=cpc&utm_campaign=outsourcing_tn&utm_content=ad1`

Captured parameters:
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term
- gclid
- fbclid
