# Phase 5 â€” Insights, case studies, legal and 404

Dependency: phases 1â€“4. Status: implemented 20 October 2026; validation limits below.

## Implementation prompt

Use $impeccable and implement phase 5 only. Read the master brief/matrix, prior evidence, relevant installed Next.js docs, craft-floor and the Read/Operate guidance. Every public template receives a compact model, including legal and 404, as confirmed by the user. Keep reading content prominent and motion restrained.

Migrate `/blog`, `/blog/[slug]`, `/work/[slug]`, `/privacy`, `/terms`, route not-found and global-not-found. Adapt the full page, not just the hero: cards, category displays, byline strip, TOC, article rich text, lists, quotes, tables/code where supported, images/captions, author information, related posts, subscription component where present and return links. Preserve existing article shared-title transitions and close behavior, avoiding a dark legacy byline strip stranded below the light hero.

Article/work callouts must come from actual topics or headings with a safe generic editorial profile if absent. Do not put arbitrary long CMS headings directly into SVG labels; use verified concise display labels and an accessible HTML equivalent. Handle very long titles/excerpts, no image, no headings, sparse content, and no related posts. Enumerate actual CMS slugs; preserve server data fetching, caching/revalidation, draft preview, publication access rules and missing-slug behavior.

Legal pages retain exact legal text, numbering, dates and links. Their models are the quietest compact variant; avoid treating policy headings as product promises. Both 404 entry points must independently load shared fonts/theme and the assembly fallback, retain noindex and true 404 status, and offer working recovery links. Do not create new route families or alter Payload admin.

## Gate and handoff

Verify every listed static route and representative CMS articles/work including long/sparse examples, published and authorized draft states, unknown slugs, direct global 404 and client transitions. Check TOC/hash offsets and rich-text overflow at 320px and zoom. Record screenshots at mobile/desktop plus tablet edge cases, metadata/structured-data checks, applicable existing tests, lint/typecheck and detector results. Legal copy diff must show no accidental changes.


## Phase 5 record — 20 October 2026

Implemented reading and utility templates only. No commit/push. Homepage, shared renderer/hero, service/contact pages, Payload admin, CMS schemas/data adapters, revalidation, preview handlers, metadata and structured-data generation remain unchanged.

**Direction and context.** Read the master brief/matrix and phase 1–4 records/evidence scripts, PRODUCT.md, DESIGN.md, installed Next.js page and not-found guides, and Impeccable new-work, craft-floor, mode-read and Operate/Read guidance. This extends the approved Slate & Glacier world. Reading mode prioritizes the document title, excerpt, contents and calm prose column. Models use the existing compact assembly with a static pose and DPR 1; legal and recovery screens share this quiet treatment. No design-system drift repair performed.

**Implementation.** `src/lib/reading-assembly.ts` supplies static profiles. Article/work labels use the actual category/sector and up to two complete short source headings (30 characters / five words maximum); overlong headings are omitted, never truncated into a new assertion. If no concise source exists, a generic Article/Case study and Contents profile is used. No CMS fields added. `/blog` uses Research, Analysis and IP Decisions; privacy uses Data Collection, Data Use and Your Rights; terms uses Engagement, Responsibilities and Terms, verified against the existing sections. Both not-found entry points inherit the shared recovery component with Home, Services and Contact labels and working recovery links; global-not-found already independently imports shared styles and SiteShell fonts.

Article byline and close control now use paper/surface-safe ink. Shared title layout IDs and close/history behavior remain. Article and legal body entrances are removed. Filters use pressed buttons rather than incomplete tab semantics and update without a stagger. Empty featured-post access is guarded. Rich text retains existing converters, links, images, captions, quotes and lists, with bounded prose measure, wrapping, and local code/table overflow. Work retains metrics, imagery, contents and return navigation; absent images are guarded. Subscription retains its GET-to-contact contract with narrow-width wrapping and a 16px email field. Legal page source files are unchanged: paragraphs, numbering, dates and links have zero source diff.

**Routes and evidence.** `.impeccable/phase-5/` contains ignored local evidence. The running preview exposed six articles and four works (CMS-backed content, including article images and work headings beyond the seed fallback). Available paths checked:
- `/blog/what-a-defensible-invalidity-search-looks-like`
- `/blog/freedom-to-operate-is-a-process-not-a-report`
- `/blog/whitespace-analysis-without-the-hand-waving`
- `/blog/buying-a-portfolio-what-diligence-misses`
- `/blog/rapid-tox-searches-what-fast-should-still-include`
- `/blog/how-to-brief-a-search-team`
- `/work/invalidated-a-blocking-claim-set-three-weeks-before-trial`
- `/work/hazard-data-on-40-substances-ahead-of-a-registration-deadline`
- `/work/a-landscape-that-became-the-r-and-d-roadmap`
- `/work/turned-a-dormant-portfolio-into-a-licensing-programme`

All ten detail routes plus blog/privacy/terms checked at 390px; representative article/work, index/legal/global and route-level 404 additionally at 320/768/1440px. DOM checks show one H1, compact assembly and no horizontal document overflow; article/legal/work TOC destinations exist. The first two 390px unknown-slug DOM samples were taken before streamed content settled (zero H1); later 320/768/1440 samples supersede them. A legal TOC click placed its heading about 96px below the viewport top. Direct HTTP checks: `/missing-phase-five`, `/blog/missing-phase-five`, `/work/missing-phase-five` all return **404**, contain noindex and recovery content.

**Capture validity.** The initial shell CDP launcher failed at Chrome startup. Browser verification used the app browser. Its early `tab.screenshot` captures caught blank pre-paint frames, so they are invalid visual evidence. Valid, displayed and inspected captures supersede them: `blog-current-1440.png`, `blog-390.png`, `privacy-valid-1440.png`, `article-valid-1440.png`, `article-body-valid-1440.png`, `work-valid-1440.png`, `work-valid-390.png`, `terms-valid-320.png`, and `missing-phase-five-1440.png`. These show initialized static geometry, light byline, body/TOC/quote/list treatment, legal text and mobile title-first order. Do not use the other early PNGs or the unexecuted shell verify script as proof of completed visual checks.

**Checks and review.** TypeScript passes. Scoped ESLint passes with zero warnings/errors. Existing SEO tests: 9/9 pass. `git diff --check` clean. Finished-UI detector run once: 12 advisory typography documentation mismatches, zero non-advisory findings. Independent Impeccable finish reviewer: initial recapture, then **ship phase 5** after validated captures; no material visual defect found within reviewed scope. Independent documenter confirms ordinary extension; PRODUCT.md/DESIGN.md preserved. Pre-existing drift (type inventory, radial-field wording, absent design sidecar) reported without repair.

**Limits / phase 6 handoff.** No authenticated unpublished draft was opened or edited; preview/access code preserved, but authorized draft rendering is unverified. Missing-image/no-headings/long-label cases are covered by source guards, not a comprehensive synthetic CMS fixture set. No production build, physical-device/Safari, actual browser-chrome zoom, full keyboard/assistive-technology traversal, GPU profiling or fresh homepage pixel regression claimed. Shared context-loss/offscreen/reduced-motion lifecycle evidence remains inherited from phase 2. Existing dev issue badge remains. Subscription delivery is still the incumbent contact-prefill flow, not a newsletter backend. Phase 6 remains pending.
