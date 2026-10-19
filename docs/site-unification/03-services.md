# Phase 3 â€” Services index and seven category pages

Dependency: phases 1â€“2. Status: pending.

## Implementation prompt

Use $impeccable and implement phase 3 only. Read the master brief, matrix, previous evidence, installed Next.js guides relevant to touched APIs, then craft-floor before UI edits. Apply the shared compact hero to `/services` and every category in `src/lib/services.ts`, using the exact slugs and topic profiles in the matrix.

Audit each entire page: service cards/rows, overview, item lists, deliverables, turnaround/audience facts, imagery, related services, ordering/scoping links, section rhythm and final CTA. Use Newsreader for editorial hierarchy and Plex for body/UI, with the shared slate/glacier tokens. Preserve every offering and factual statement. Keep two-item categories intentionally sparse rather than inventing labels to fill five anchors.

Preserve item IDs, hash links from the mega menu, `serviceCtaHref` query strings and contact preselection. Ensure fixed-header offsets reveal anchored headings. Place existing hero asides without compressing the model or losing facts. Review long category names at tablet widths. Validate all category/offer links and keyboard/touch interactions.

## Gate and handoff

All seven pages and index have matching themes, distinct verified callouts and smaller models. Screenshot each category desktop/mobile plus representative tablet and longest title; test category anchors and an enquiry/order path for each CTA type. Run scoped lint/typecheck, applicable existing SEO checks and detector on finished changes. Record exact routes checked and any CMS/data limitations. Homepage remains approved.


## Phase 3 record — 20 October 2026

Implemented the services index and all seven category profiles. Phase 4–6 routes remain outside this change. No commit/push.

**Implementation.** `src/lib/service-assembly.ts` centralizes the exact matrix labels for the index and the seven catalogue slugs. Labels were verified against offerings in `src/lib/services.ts`; database strategy deliberately has only two. The index consumes its existing five-label profile from this module. All categories opt into the existing shared `PageHero` assembly, retaining the corrected homepage spin/callout cycle and optical-ring background. No renderer, homepage, shared hero, global theme, CMS, metadata or form changes in this phase.

The category hero's existing turnaround, jurisdiction and audience facts now form a light, semantic-token strip below its title, leaving the model its own column. Existing overview, offerings, imagery, deliverables, related practices and footer enquiry treatment remain. Offering actions stack below copy until the wide layout to avoid squeezing long names at tablet widths. Scroll margin now belongs to the actual item-ID elements, so fixed navigation reveals the heading. Every original item ID, statement and `serviceCtaHref` contract is preserved.

**Routes checked:** `/services`, `/services/search-solutions`, `/services/intelligence-solutions`, `/services/patent-database-strategy`, `/services/prep-and-prosecution`, `/services/licensing`, `/services/chemical-safety-intelligence`, `/services/ip-consulting-and-audit`.

**Evidence:** `.impeccable/phase-3/` (ignored local evidence, consistent with earlier phases).
- `before-{390,1440}.jpg`: incumbent chemical safety hero before edits.
- `<slug>-{390,1440}.jpg` and `index-{390,1440}.jpg`: full-page Chromium reduced-motion captures for all eight routes. Longest category additionally captured at 320 and 768px. `verify.mjs` / `layout.json`: one H1 and compact hero on every route, no document overflow in all 18 captures. All seven category models initialized; initial index mobile capture caught the retained geometry/HTML fallback before initialization. Some mobile full-page captures show unloaded below-fold lazy images; source assets and image configuration are unchanged.
- Rendered desktop/mobile category compositions and longest-title tablet capture inspected: facts readable on paper, callouts fit, sparse category stays sparse. Existing homepage composition is protected by no changes to its implementation or shared styles; fresh homepage pixel comparison was not repeated in this phase.
- `interactions.mjs` / `interactions.json`: all 25 item anchor targets tested above the fixed header at 390px; all seven category link destinations returned 200; every offering has a contact query link. Hydrated client clicks for database evaluation (`intent=order`) and database migration (scoping) reach contact with the correct selected service. A focused breadcrumb exposes an outline. This is scripted browser coverage, not physical touch-device testing or a complete keyboard traversal.
- `tsc --noEmit` and scoped ESLint: clean. Existing `test:seo`: 9/9 pass. `git diff --check`: clean (existing CRLF normalization notices only).
- Impeccable detector run once on final changed UI: 12 advisory type-ramp notes, no non-advisory findings. Retained editorial sizes are consistent with the incumbent service pages; no palette literals introduced.

**Handoff/limits.** Service content is local catalogue data; no CMS content was required for these routes. Existing dev issue badge persists. Actual browser zoom, physical mobile/Safari coverage, full keyboard traversal, production SEO crawl and performance/GPU profiling remain phase 6 work. Phase 4 can migrate about/contact using the same explicit hero profile API. No new claims or offerings added.
