# Phase 2 — Reusable compact 3D hero

Dependency: phase 1. Status: implemented 20 October 2026; validation limits below.

## Implementation prompt

Use $impeccable, read the master brief/matrix and phase 1 evidence. Implement phase 2 only. Read installed Next.js client/lazy-loading documentation and Impeccable craft-floor, adapt and optimize references before relevant edits.

Refactor `src/components/home/invention-scene.tsx` into one shared assembly implementation with a typed default home profile and an interior compact profile. Configure label text, valid model-anchor IDs, accessible description, sizing/camera framing and motion budget. Preserve home defaults and its projected anchor behavior. Validate that two-to-five labels work without relying on array position for semantic identity. Do not fork the entire scene or scale a full-size canvas through CSS transforms.

Extend `src/components/site/page-hero.tsx` with explicit configuration rather than pathname inference. Keep server-rendered breadcrumbs, eyebrow, one H1, lede, CTA slots and optional aside. Use the approved light field and smaller assembly; remove competing PixelBlast backgrounds from migrated heroes. Plan the aside below copy or as a fact strip so model and existing facts do not compete in three squeezed columns. Integrate one representative real interior route to prove the API; remaining route profiles ship in phases 3–5.

Desktop starting target: 280–360px model stage, content-driven 420–560px hero. At 320/390px, stack readable copy/action before a compact model; HTML labels may become a short legend while preserving their anchor associations. Test long titles, no lede, no aside, two labels and five labels. Never truncate essential headings or let callouts cross text/buttons.

Keep fallback geometry visible before WebGL loads or when unavailable. Callout meaning must survive loading failure/context loss and reduced motion. Keep decorative canvas/SVG hidden from duplicate screen-reader output. Bound DPR, pause offscreen/hidden rendering, and dispose observers, listeners, geometries, materials and renderer on unmount. Keep initial HTML independent of WebGL and animation. No new CMS fields are needed solely for decorative configuration.

## Gate and handoff

Compare home before/after and compact route at 320/390/768/1440px and 200% zoom. Exercise no-WebGL, reduced motion and repeated client navigation. Confirm no label overlap, model cropping, duplicate loops or layout shift from scene startup. Record shared API and fallback decisions, screenshots, lint/typecheck results and final detector findings. Other interior routes must remain functional while awaiting migration.

## Phase 2 record — 20 October 2026

Implemented the shared assembly and `/services` proof route only. Other routes retain their existing heroes for phases 3–5. No CMS, metadata, URL or form changes. No commit/push.

**API and implementation.** `InventionScene` keeps a typed `homeAssemblyProfile`, the original home camera/materials/cycle and projected labels. `AssemblyProfile` supplies accessible description and labels keyed by `ModelAnchor` (`base`, `fins`, `lens`, `iris`, `housing`), independent of array order. Optional `cameraScale`, `motion` (`cycle`, `drift`, `static`) and `maxDpr` control framing/render budgets. `compact` selects a real 300/340px stage and a more distant camera, not a transformed canvas. Its defaults use gentle held-pose drift and DPR capped at 1.25. Home retains original responsive DPR limits.

`PageHero` accepts explicit `assembly` and `actions`. Compact mode server-renders breadcrumbs, optional eyebrow, one H1, lede/actions and an optional fact strip below copy. Desktop has two columns; below 1024px copy/actions precede the model. `/services` proves five labels verified against existing practice content; all seven practices remain in the body. Compact mode never mounts PixelBlast.

**Fallback and lifecycle.** Three.js remains dynamically imported inside the client effect. CSS geometry and reserved stage space exist in initial HTML. A persistent HTML legend carries meaning before initialization, on WebGL failure, reduced motion and context loss. Projected decorative numbers match the named anchors in the legend; canvas/SVG are hidden from assistive technology and the model has an accessible description. Home gains a screen-reader-only label list. Reduced motion renders once, waking on resize/preference changes. Hidden/offscreen scenes stop requesting frames until visibility changes. Cleanup disposes frames, observers, preference/visibility/context listeners, geometries, materials, environment and renderer.

**Files.** `invention-scene.tsx`, `page-hero.tsx`, shared `globals.css`, `/services/page.tsx`, this record and README. Pre-existing `.gitignore` changes left intact.

**Evidence:** `.impeccable/phase-2/` (local ignored evidence, matching phase 1 convention).
- `home-{320,390,768,1440}.jpg`, `services-{320,390,768,1440}.jpg`, `layout.json`, `verify.mjs`: Chromium emulated viewports with reduced motion. One H1, no document overflow at all widths; compact stage 300px / desktop 340px. Desktop/mobile renders inspected. Home composition and projected labels retained against phase 1 evidence. Some early captures caught CSS fallback before import completed; stage dimensions remain reserved.
- `edge-{320,768,1440}.jpg`, `edge.json`, `edge.mjs`: temporary fixture with long heading, two non-adjacent anchors, no lede/aside, action slot. No overflow; title expands naturally. Fixture route removed. Real route proves five labels.
- `context-loss.jpg`, `no-webgl.jpg`, `zoom-200.jpg`, `resilience.json`, `resilience.mjs`: synthetic context loss restores fallback (`data-ready=false`, fallback opacity 1); all five labels survive. Disabling WebGL before startup preserves fallback/legend with no overflow at 390px. 720x450 CSS viewport at DPR 2 exercises layout equivalent to a 1440x900 window at 200%; no overflow. This is emulation, not browser-chrome zoom.
- `navigation.json`, `navigation.mjs`: repeated hydrated home/services client navigation; recorded paths/canvas counts supersede the earlier fast-click loop in `resilience.json`, which sometimes clicked before hydration.
- Scoped ESLint and final `tsc --noEmit`: clean. `git diff --check`: clean. Detector run once: 59 advisory notes, no non-advisory findings; retained legacy hero/fallback literals and type-ramp values dominate. See `detect.json`.

**Handoff/limits.** Phase 3 can supply each service profile and adapt inverse-only copy/fact panels for the light field. No other route migrations performed. Physical iOS/Android, Safari, actual browser zoom, production Core Web Vitals and instrumented GPU allocations remain release-audit work. Mounted-canvas counts and cleanup review are not GPU profiling. Existing dev issue badge and shell reduced-motion hydration diagnostics remain; phase 1 already recorded the dev issue. Legacy home fallback palette and unrelated optical/OG artwork preserved to protect the approved homepage.


### Correction after user review

The numbered markers and default held-pose drift were rejected: the requested treatment is the homepage effect at a smaller size. Compact now defaults to the exact same 16-second exploded spin, horizontal assembly, separation and connected text-callout cycle as home. Numeric markers are removed. HTML labels remain accessible and visible during fallback; after WebGL is ready they become visually hidden, with full labels projected onto leaders as on home. Only stage dimensions/camera framing and compact label sizing differ. This supersedes the drift/numbered-legend description above.

### Background and current-navigation correction

Reused `HeroField` behind the compact hero with a semantic-token glacier glow, matching the homepage's optical rings. Home selectors/default behavior are preserved. Current desktop navigation now uses an accent-soft glacier fill, ink text and accent-hover slate underline, with `aria-current=page`. Bottom service-category rail unchanged. Chromium desktop/mobile checks show no overflow; active computed fill is rgb(220, 238, 233). Evidence: `background-1440.jpg`, `background-390.jpg`, `background.mjs`, `background-detect.json`. Typecheck clean; scoped lint has only the two previously documented header effect warnings.

### Secondary-navigation placement correction

Removed the glacier fill from the top navigation at the user's request. The service-category navigation now applies glacier-soft background and slate underline to the current section, tracks scrolling and anchor navigation, exposes aria-current=location, and brings offscreen active categories into the horizontal rail on narrow screens. Top navigation retains its existing underline only. Chromium 1440/390 checks confirmed transparent top-link background, initial Search active, Licensing active after scrolling, glacier fill rgb(220,238,233), and no document overflow. Evidence: `secondary-1440.jpg`, `secondary-390.jpg`, `secondary.mjs`, `secondary-detect.json`.
