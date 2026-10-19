# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Corporate IP and legal teams, law firms, and R&D leaders who need a defensible patent search, IP intelligence report, or prosecution support. They arrive evaluating a research provider and want to reach a credible enquiry (quote request, call, WhatsApp, email). Confirmed with the client's team, 19 October 2026.

## Product Purpose

Rightium is a Bengaluru-based IP research firm. The public website presents its seven service practices, explains how the firm works, publishes research insights and case studies, and converts visitors into enquiries. Success is a visitor who trusts the firm's evidence standard and sends a well-formed brief.

## Positioning

Evidence-led IP work: patent search, IP intelligence, database strategy, prosecution support, licensing research, chemical safety intelligence and IP audits, delivered with documented evidence ("Evidence you can defend.").

## Operating Context

Visitors read service scopes, deliverables and articles, compare practices, and fill in or phone through an enquiry. Contact channels: contact form, email, phone, WhatsApp; office hours Mon to Sat, 10:00 to 19:00 IST. Content is CMS-managed (Payload) with built-in launch articles in preview mode.

## Capabilities and Constraints

- Seven service practices with offerings and anchored enquiry links; insights (articles), case studies at `/work/[slug]`, about, contact, privacy and terms. There is no `/work` index.
- Hosting is zero-cost (Vercel Hobby, Neon, R2/Cloudinary); the site is in noindex preview until launch.
- CMS schemas, URLs, metadata, structured data, preview behaviour and form API contracts must be preserved.
- Existing stats and service claims in `src/lib/site.ts` and page content are approved proof (confirmed). New copy, callouts and heroes must not add outcomes, turnaround times, legal promises or capabilities beyond existing content.

## Brand Commitments

- Name: Rightium. Voice: precise, evidence-led, plain.
- The approved homepage ("Slate & Glacier") is the visual authority for the whole public site (client decision; supersedes the earlier navy/teal identity).
- A compact 3D optical model appears on every public page, including articles, case studies, legal pages and 404 (client decision; implemented in phases 2 to 5 of `docs/site-unification/`).

## Evidence on Hand

Homepage counters, seven service pages with offerings, launch articles in `src/seed/insights.ts`, photography in `public/images/`. No testimonials or customer names may be invented beyond what the pages already contain.

## Product Principles

1. Evidence before assertion: every claim traces to existing content.
2. One public identity: navigating between routes never changes the visual system.
3. Reading and enquiry come first; decoration never delays the title, the action or the legal text.
4. Preserve working contracts (URLs, CMS, forms, metadata) over visual convenience.

## Accessibility & Inclusion

WCAG 2.1 AA (confirmed; no stricter requirement). Visible focus, keyboard operation, reduced-motion support.
