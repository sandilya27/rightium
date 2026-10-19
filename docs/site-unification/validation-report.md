# Phase 6 validation report

20 October 2026. Phase 6 hardening implemented; **release gate remains open** for the specific checks listed below. No redesign, deployment, commit, push, indexing change, database migration or CMS write was performed.

## Scope and changes

Read PRODUCT.md, DESIGN.md, all five phase records (including corrections and invalid-capture notices), the master brief and route matrix. Ran Impeccable context once and read audit, adapt, optimize, polish and craft-floor. Read installed Next.js production, lazy-loading and generated-image guidance.

- Header: Services opens with ArrowDown, exposes expanded/control relationships, closes on Escape and when focus leaves the header, and restores focus on Escape. The existing Services link still navigates normally. Mobile navigation contains Tab/Shift+Tab, makes main/footer inert, restores their previous inert state on close, restores the toggle on Escape, and closes when resized into desktop. Toggle target increased from 40 to 44px. Existing appearance retained.
- Removed PageHero's retired dark PixelBlast branch and made its assembly profile required. Every caller already supplies a compact profile. This removes unused Three.js/postprocessing dependencies from initial interior scripts; PixelBlast implementation/tests remain available. No change to compact composition or the homepage renderer.
- Contact confirmation reserves the measured outgoing form height. It keeps success focus and the existing reset/retry contracts while preventing the large delayed page contraction after submission.
- Social cards, Apple icon and SVG favicon now use the approved slate/glacier colors. Removed the superseded navy/teal gradients; dimensions, titles, destinations and metadata contracts remain unchanged.
- Added repeatable, read-only `scripts/audit-release.mjs` and local-only `scripts/release-harness.mjs`. The harness injects lab observers and mocked contact responses through a loopback proxy; every non-GET/HEAD request is blocked from reaching the app. It is not part of the deployed application.

## Route coverage

Production sitemap and SEO crawl contain **24 public pages**. All return 200 and pass the existing crawler's checks for unique titles, descriptions, canonical URLs, one H1, shared metadata/JSON-LD, sharing-image availability and appropriate article/work schemas. Initial mobile DOM sweep checked the 14 static/service routes; final production detail sweep checked all ten detail routes and three missing routes. Explicit profiles match the route matrix; content-derived labels come from actual published records. One main landmark, paper background and no horizontal overflow were observed in the static/service sweep.

| Family | Routes checked |
| --- | --- |
| Static | `/`, `/services`, `/about`, `/contact`, `/blog`, `/privacy`, `/terms` |
| Services | `/services/search-solutions`, `/services/intelligence-solutions`, `/services/patent-database-strategy`, `/services/prep-and-prosecution`, `/services/licensing`, `/services/chemical-safety-intelligence`, `/services/ip-consulting-and-audit` |
| Articles | `/blog/what-a-defensible-invalidity-search-looks-like`, `/blog/freedom-to-operate-is-a-process-not-a-report`, `/blog/whitespace-analysis-without-the-hand-waving`, `/blog/buying-a-portfolio-what-diligence-misses`, `/blog/rapid-tox-searches-what-fast-should-still-include`, `/blog/how-to-brief-a-search-team` |
| Work | `/work/invalidated-a-blocking-claim-set-three-weeks-before-trial`, `/work/hazard-data-on-40-substances-ahead-of-a-registration-deadline`, `/work/a-landscape-that-became-the-r-and-d-roadmap`, `/work/turned-a-dormant-portfolio-into-a-licensing-programme` |
| Missing | `/missing-phase-six`, `/blog/missing-phase-six`, `/work/missing-phase-six`, `/services/missing-phase-six` return HTTP 404 and noindex recovery HTML |

The configured CMS was readable during production generation. Six articles and four works were generated. No `/work` index was introduced. Early zero-H1 samples for streamed blog/work 404s in `layout.json` are superseded by settled `final-details.json` (13/13 pass).

## Responsive and visual evidence

Evidence is local and ignored, under `.impeccable/phase-6/`, consistent with prior phases.

- Full-page PNGs at 320 and 390: home, services, chemical-safety category, about, contact, blog, representative article/work, privacy, terms and global 404. At 768 these same representative compositions were captured; contact, blog, article/work and legal checks also have `captures-768.json`.
- `responsive-final.json`: 28 final production checks, seven representative routes at 320/390/768/1440; one H1 and no document overflow throughout. Newsreader resolves as the display font, weight 450.
- `zoom-equivalent.json`: home/services/contact/article/privacy pass at 720×450 CSS pixels, equivalent reflow space to a 1440×900 window at 200%. **This is not browser-chrome zoom.**
- Displayed and inspected full-page contact/article mobile and chemical-safety tablet views, plus the wide home/services/article/contact views. Paper, slate controls/inverse footer, title-first mobile order and smaller interior models remain consistent. Existing factual text and legal sources have no changes.
- `home-final-1440.png`, `services-final-1440.png`, `article-final-1440.png`, `contact-final-1440.png` are settled viewport captures. Desktop full-page calls repeatedly failed, so do not count absent 1440 full-page files as evidence. Some early screenshots show fallback/pre-paint frames; settled final captures supersede them.
- Compared the phase 1 home capture and current full-page narrow/viewport wide captures by inspection. No homepage CSS, content, components or renderer changed in this phase. There is **no exact pixel-diff claim**: animation phases, scrollbar width, viewport engine and earlier baseline paint differ. Fresh matched-engine full-page desktop comparison remains open.

## Accessibility and complete paths

**Browser interaction checks (Chromium in-app browser):**

- Desktop Services ArrowDown moves focus to the practice panel; Escape returns to Services and collapses it. Mobile Shift+Tab from Close wraps to the final email link; Escape returns to Open menu and clears background inertness. Main and footer both expose `inert` while open. `keyboard.json`, `drawer-final-390.png`.
- Skip link reaches `#main`; its target was not reported as the active element by the browser bridge. A complete sequential skip-link/tab-order and assistive-technology check is still required; do not infer a full keyboard certification from this sample.
- Two rounds of client navigation home → services → contact → blog preserve paper background and one main; no canvas-count growth observed. A blog-card click reaches the article. Home case-file modal → See complete details reaches the actual work URL, with one H1 and no remaining modal. Counts sampled during lazy initialization (often one 2D canvas) are not GPU allocation proof. `navigation-final.json`.
- Safe contact harness: selected patentability service survives query preselection, mocked 500 displays the actual retry error and retains the message, successful retry focuses “Brief received”, and exactly two requests were intercepted. Measured outgoing/confirmation heights both 1100.67px. `contact-final.json`, `contact-success-final-390.png`. Earlier immediate/stale reads in `contact-harness.json` are superseded. Phase 4's invalid-field, network-error and duplicate-submit evidence is inherited; API unit tests rerun here. No real message was sent.
- All local hash destinations in the initial static/service and detail DOM sweeps exist. Phase 3's all-25-offering offset/query checks and phase 5's legal TOC offset checks remain inherited evidence; they were not all reclicked here.

**Mechanical/source checks:**

- Semantic token contrast calculations: body on paper 7.80:1; accent on paper 5.50:1; white on accent 6.04:1; glacier on slate 8.51:1; danger on paper 5.44:1. This is token math, not a fresh every-element rendered contrast scan. Prior phase 1 effective-background scan remains inherited.
- Decorative callout SVG/canvas hidden from duplicate announcements, meaningful image description and HTML label list retained. Form labels/native required fields and existing error association retained. No claim of screen-reader announcement testing.
- Final Impeccable detector run once on the six changed UI/image source files: **9 advisory font-size inventory mismatches, zero non-advisory findings**. Existing type sizes retained; no unrelated DESIGN.md/sidecar drift repair.

## Progressive enhancement and lifecycle

The local harness disabled WebGL before app initialization: CSS geometry, five readable HTML labels and server-rendered title remained, with `data-ready=false`, fallback opacity 1 and no overflow. Synthetic `webglcontextlost` restores fallback and labels; this is event simulation, not a hardware driver failure. `no-webgl-390.png`, `context-loss-390.png`.

Reading page draw count settles after its static frame (210 draw calls in the sampled page); render startup can be seen in fallback-to-model captures without losing the heading. Source review confirms bounded DPR, reduced-motion/static single-frame behavior, IntersectionObserver/visibility suspension and cleanup of frames, observers, listeners, geometry/material/environment and renderer. Phase 2's no-WebGL/reduced-motion/navigation lifecycle evidence remains inherited. Offscreen and hidden-tab suspension were **not independently instrumented to completion here**, and no GPU heap profiling was performed. Existing four PixelBlast lifecycle tests passed, but those tests do not exercise InventionScene.

## Performance results and limits

Production build, local loopback proxy, Chromium in-app browser, 1440×900 emulated viewport, normal motion; no standardized CPU/network throttle. PerformanceObserver inserted before hydration. Samples include proxy and browser-tool overhead. They are single local lab observations, not field Core Web Vitals or mobile performance certification.

| Page | LCP | Initial-load CLS |
| --- | ---: | ---: |
| Home | 3332ms | 0.002032 |
| Services | 2096ms | 0.008766 |
| Representative article | 2100ms | 0.000051 |
| Contact | 2088ms | 0.000051 |

`performance.json` contains the raw observations. Home exceeds the 2500ms target in this sample; **performance release gate remains open**. Phase 1 has no equivalent recorded LCP/CLS samples, so a same-condition phase 1 comparison cannot be claimed. No field INP is available. Event Timing samples during automation were multi-second and heavily confounded by tool/paint scheduling; they are not evidence that INP ≤200ms. A controlled interaction trace remains required.

The complete mocked mobile contact flow's cumulative CLS fell from 0.5988 before the height fix to 0.01853 afterward (including error/confirmation changes). This is a flow comparison, not initial-load CLS.

Read-only HTTP script inventory before/after, same production setup:

| Page | Before gzip bytes | After gzip bytes | Reduction |
| --- | ---: | ---: | ---: |
| Services | 563272 | 358342 | 204930 |
| Contact | 559938 | 355059 | 204879 |
| Article | 559079 | 354149 | 204930 |
| Home | 370514 | 370517 | effectively unchanged |

These are gzip calculations over HTML-referenced scripts, excluding dynamic scene imports, prefetch and analytics. They are not actual compressed network transfer totals. Raw script bytes are in `http-before.json` and `http.json`. No arbitrary score-driven visual changes were made.

## Production, CMS and SEO checks

Inspected `scripts/migrate.mjs` first: npm prebuild migrates whenever DATABASE_URI exists. Used **direct Next compilation**, bypassing that hook. CMS adapter has `push:false`; no schema operation was requested. Initial sandbox compilation failed with EPERM under `.next/types`; the authorized elevated compilation succeeded. No credentials were printed.

| Command/check | Result |
| --- | --- |
| `node node_modules/next/dist/bin/next build --webpack` | Pass; all 48 generated outputs complete, configured CMS read |
| `npm run lint` | 0 errors, 4 existing effect-state warnings (contact, hero-case-files, header ×2) |
| `npm run typecheck` | Pass |
| `node --test tests/*.test.cjs` | 17/17 pass: contact 4, SEO 9, PixelBlast 4 |
| `node scripts/audit-seo.mjs` with local production origin | 24/24 pass, including sharing images |
| `node scripts/audit-release.mjs` | 24 pages, 4 true 404s, preview rejection, robots/manifest/icons/OG pass |
| `node --check` on both new scripts | Pass |
| `git diff --check` | Pass; existing CRLF normalization notices only |

Public responses retain noindex. Robots disallows crawling. Manifest uses slate theme/paper ground. Invalid preview destination returns 400 and an unauthenticated valid article preview returns 401. Authenticated drafts were not accessed. Production outputs show existing revalidation periods (home/blog/sitemap 1h, articles 1d, work 1h); publication/access hooks were reviewed, **not exercised by changing real CMS content**. Existing SEO tests cover sitemap publication filtering and edit timestamps. MetadataBase/SSL-alias/no-email-adapter warnings remain environment/baseline observations, not hidden failures. Public canonical/sharing checks passed despite the root metadata warning.

## Remaining release checks

1. Controlled repeatable performance/interaction profiling, including the home 3.33s LCP sample, slow-device/network conditions and valid INP evidence. A same-condition baseline must first be established; none exists from phase 1.
2. Authenticated authorized draft preview, publish/unpublish/cache invalidation and missing/sparse/long CMS fixtures in an isolated content environment. No production records should be edited merely for this audit.
3. Physical iOS/Android, Safari/Firefox, actual browser zoom, screen-reader and complete keyboard traversal; real anti-spam/provider delivery through an approved test destination. No such hardware/session was available here.
4. Matched-engine full-page desktop homepage comparison and broader desktop full-page capture, plus instrumented hidden/offscreen/reduced-motion lifecycle and GPU allocation checks. Browser-tool screenshot failures and inherited evidence are explicitly distinguished above.
5. Existing content placeholders remain: About team portraits and generic LinkedIn/X destinations. No invented portraits, profiles or proof were supplied.

The implemented hardening and available local checks are complete. These residual checks prevent claiming an unconditional all-experience release pass. Phases 1–5 retain their recorded status and limitations; phase 6 is not marked release-approved.
