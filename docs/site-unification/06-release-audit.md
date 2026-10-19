# Phase 6 — Whole-site hardening and release review

Dependency: phases 1–5. Status: hardening implemented 20 October 2026; release gate open for documented validation limits.

## Implementation prompt

Use $impeccable, read all phase evidence and the route matrix, and implement phase 6 only. Use audit, adapt, optimize and polish references as appropriate and craft-floor before any UI fixes. Close documented gaps and verify the complete experience; do not begin another visual redesign.

1. Enumerate all public static routes, seven service categories and current published CMS slugs. Test every route for successful render and correct compact profile; review representative distinct layouts at 320/390/768/1440px and 200% zoom. Capture home baseline comparisons and full-page images, not just isolated heroes.
2. Check hierarchy, font loading/weights, slate/glacier colors, inverse sections, callout readability, title wrapping, hero scale, spacing, imagery, cards, CTA/footer and all header/menu states. Test direct loads plus client navigation among home, services, contact, articles, case studies and missing URLs. Check theme flashes and fixed-header anchor offsets.
3. Keyboard-test skip link, dropdown/drawer, focus visibility/order, Escape and focus restoration where applicable, forms and TOCs. Check contrast, accessible names, landmarks, one H1, touch targets, zoom, reduced motion and screen-reader treatment of callouts. Document automated results and manual checks separately.
4. Inspect WebGL disabled/context-loss fallback, slow scene loading, offscreen/hidden-tab suspension and repeated navigation cleanup. Measure actual initial JS, LCP, CLS and interaction responsiveness on representative home/interior/read/contact pages. Compare phase 1 baseline under the same conditions; target LCP ≤2.5s, CLS ≤0.1 and INP ≤200ms where valid measurement is available. Label lab proxies honestly; do not claim field INP from a single lab run. Fix material regressions, not arbitrary scores.
5. Verify enquiry success/failure with a safe harness, service parameters, anchors, recovery links, preview access, publication/caching behavior, missing CMS data, SEO titles/descriptions/canonicals, breadcrumbs/JSON-LD, generated social images, robots, sitemap and noindex rules. Review manifest/themeColor for consistency without changing indexing/deployment settings unasked.
6. Run project lint, typecheck, existing contact/SEO/PixelBlast tests when applicable and production build using a configured safe environment. Inspect `prebuild` migration behavior before invoking build: do not migrate a production database as a side effect of visual validation. Report unavailable credentials/data honestly. Resolve new failures and distinguish pre-existing warnings. Run the final Impeccable detector once after the final UI changes.

## Completion gate

Write `docs/site-unification/validation-report.md` with route coverage, screenshots, accessibility checks, actual performance results, commands/results, residual limitations and homepage comparison. Update each phase status only when its gate passed. No unverified claim of all-page success. If all gates pass, summarize the completed work and any material limitations. Leave deployment/push for explicit user instruction; any requested commit must omit co-author trailers.

## Phase 6 record — 20 October 2026

Implemented keyboard navigation/focus containment, removed retired hero dependencies, stabilized contact confirmation height, and aligned generated sharing/icon colors. No redesign or homepage composition change. Added read-only release checks and a loopback QA harness. Production build (migration hook bypassed), typecheck, lint (four baseline warnings), 17 tests and 24-page production SEO crawl pass. Interior initial script payload reduced by about 205 KB gzip. Final detector: nine advisory typography notes, zero non-advisory findings.

See [validation-report.md](validation-report.md) for exact routes, screenshots, measured performance and superseded/stale captures. Single local home LCP sample is 3332ms; no valid field INP or same-condition phase 1 performance baseline exists. Authenticated content-state, hardware/assistive-technology, full desktop capture and instrumented lifecycle checks remain open. Therefore this phase is **implemented with verification limits, not release-approved**. No commit/push/deployment/indexing changes or database migrations.
