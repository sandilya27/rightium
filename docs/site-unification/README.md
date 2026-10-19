# Rightium: six-phase site unification

Created 19 October 2026. Status: planning complete; implementation not started.

## Confirmed brief

The approved homepage is the visual authority. Extend its Slate & Glacier palette, Newsreader display typography, IBM Plex Sans body/UI typography, materials, spacing, and optical assembly to every public page. Preserve the homepage composition and behavior. The user confirmed compact 3D on **every public page**, including articles, case studies, legal pages, and 404. Each receives relevant callouts. Implement the six phases sequentially, with reviewable evidence at each gate.

This folder is a planning packet, not an implementation or a replacement for PRODUCT.md / DESIGN.md. Impeccable context was run; neither document currently exists. Phase 1 captures confirmed context before UI work. No application code is changed by this packet.

## Run order

| Phase | Prompt | Outcome | Status |
| --- | --- | --- | --- |
| 1 | [Foundation](01-foundation.md) | Homepage baseline, product/design records, shared tokens and fonts | Implemented (uncommitted) |
| 2 | [Compact hero](02-compact-hero.md) | Reusable smaller optical assembly and accessible callouts | Implemented; evidence/limits in phase record |
| 3 | [Services](03-services.md) | Services index and all seven service pages | Implemented; evidence/limits in phase record |
| 4 | [About and contact](04-about-contact.md) | Company narrative and complete enquiry flow | Pending |
| 5 | [Reading and utility pages](05-reading-utility.md) | Insights, articles, work, legal pages, both 404 paths | Pending |
| 6 | [Release audit](06-release-audit.md) | Whole-site visual, functional, accessibility, performance and SEO checks | Pending |

Start a phase by copying its prompt into chat. Read this file, the route matrix, and prior phase evidence first. Finish only that phase; record files changed, screenshots, checks, unresolved issues, and the next handoff in that phase document. Do not mark a gate passed without evidence. Commit/push only when requested; commits must have no co-author trailer.

## What the audit established

- `src/app/(frontend)/home.css` scopes the approved tokens to `body:has(.home-slate)`; `page.tsx` imports it only for home. Global defaults remain the former navy/teal identity. Navigation currently changes the visual system.
- Homepage paper is `#f1f5f5`, surfaces `#e7eeee` / `#d9e5e5`, heading ink `#202f3d`, body ink `#374f60`, secondary ink/accent `#49667c`, hover `#354f63`, glacier `#a5d6ca`, soft glacier `#dceee9`, deep `#202f3d`, deep lift `#304858`, deep well `#192733`. Capture the complete token set from the actual CSS in phase 1.
- `src/components/site/site-shell.tsx` already loads local Newsreader and IBM Plex Sans. `globals.css` maps serif to Plex; home overrides it to Newsreader. Fix the shared semantic mapping, not just individual headings.
- `src/components/site/page-hero.tsx` uses the older dark PixelBlast hero. It already serves most public templates and accepts breadcrumbs, title, lede, eyebrow, and an aside. Keep that information when adding the model.
- `src/components/home/invention-scene.tsx` has five fixed callouts and an imperative Three.js renderer, projected SVG labels, a CSS fallback, reduced-motion handling and disposal. Reuse this assembly rather than copying its renderer into each route.
- Home `header[data-at-rest]` is transparent over a light field. Preserve the recent dark-text contrast fix across routes, scroll states, menu states, and navigation. Footer theme and CTA treatments also need consistent shared styling.
- Article bylines have a separate dark strip; changing only PageHero would leave a visible mismatch. Global 404 imports its own styles and renders outside normal layouts.
- Existing `.impeccable/review` captures include a footer view; filenames alone do not establish a current full-page baseline. Capture fresh rendered baselines before implementation.

## Shared acceptance contract

- Homepage remains visually equivalent at 390, 768, and 1440px; check 320px overflow and 200% zoom across public templates.
- Compact model on every interior hero; desktop target approximately 280–360px stage height within a content-driven 420–560px hero, smaller than home. These are starting constraints, not clipping limits. Long CMS titles and legal headings must expand naturally.
- On mobile, title and main action come first, then a smaller assembly with readable HTML callouts. Do not shrink labels to fit, remove the model, or force a full-screen hero. At narrow widths a static rendition of the same model is acceptable progressive enhancement.
- Topic-specific callouts explain the page; no invented outcomes, turnaround times, legal promises or service capabilities. Labels proposed in the matrix require verification against actual content.
- One shared public theme; avoid route-dependent body selectors, duplicated palette literals, or leaking public styles into Payload admin.
- Preserve URLs, existing claims, CMS schemas/content, metadata, structured data, preview behavior, form API contracts, and service query/anchor links.
- Accessibility: WCAG AA contrast (4.5:1 normal text, 3:1 large text and relevant UI), visible focus, keyboard navigation, touch targets, sensible landmarks/headings, no duplicate announcement of decorative SVG/canvas labels.
- Performance: server-rendered text, progressive enhancement, bounded device pixel ratio, pause offscreen/hidden rendering, reduced-motion support, context-loss fallback, and cleanup on route changes. No multiple active render loops left after navigation.
- UI phases use Impeccable: load the applicable reference and craft-floor immediately before editing; inspect rendered results in batches; run the manual detector once on the finished changed UI and resolve findings. Documentation-only phases do not need the detector.

## Impeccable and framework workflow

Skill: [Impeccable](C:/Users/Admin/.agents/skills/impeccable/SKILL.md). In each new implementation session read it and run its launcher context once from the project. Follow its resolved directives. Read `reference/document.md` to record the approved incumbent identity; use `extract`, `adapt`, `harden`, `optimize`, `audit`, and `polish` references where relevant. This is an extension of an approved identity, not a new visual-world competition. Capture product facts with the user where material gaps remain; never fabricate missing product truth. Do not silently change Impeccable workflow settings.

Read AGENTS.md and the relevant installed Next.js 16.3.6 documentation under `node_modules/next/dist/docs/` before application changes. Honor server/client boundaries and the project's current APIs.
