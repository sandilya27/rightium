# Phase 1 — Shared foundation

Dependency: none. Status: implemented 19 October 2026.

## Implementation prompt

Use $impeccable at `C:/Users/Admin/.agents/skills/impeccable/SKILL.md`. Read `docs/site-unification/README.md` and `route-matrix.md`. Implement phase 1 only. Preserve the approved homepage while making its visual system available throughout the public site.

1. Read AGENTS.md and installed Next.js guides relevant to layouts, CSS and local fonts. Run Impeccable context once per session. Capture current home and representative interior screenshots before changes, including header, CTA/footer and mobile menu.
2. Capture confirmed durable product facts in PRODUCT.md, resolving only material unknowns with the user per Impeccable init. Document the actual homepage identity in DESIGN.md through its document workflow. Record surface intent separately: marketing persuades, articles/legal support reading, contact supports completing an enquiry. The user's compact-model decision applies to all.
3. Read craft-floor before editing UI. Extract all homepage semantic tokens and Newsreader/Plex mappings into a shared public stylesheet or public-shell scope. Include selection, focus, borders, inverse surfaces, typography scale and spacing. Keep homepage-specific composition in home.css. Ensure global 404 receives the theme and Payload admin does not.
4. Normalize shared buttons, links, breadcrumbs, forms, cards, header/dropdown/drawer, CTA and footer to semantic tokens. Audit white text and old bright-teal literals on light surfaces. Keep intentional inverse sections readable. Avoid blanket text-color replacement.
5. Check direct loads and client navigation `/` → `/services` → `/contact` → `/`, with scroll/menu state transitions. Remove dependency on `body:has(.home-slate)` for shared identity without changing the home composition.

## Gate and handoff

Fresh home comparisons at 390/768/1440px show no unintended layout/theme change. Interior shell uses the same palette/fonts on direct load and navigation. Keyboard focus/menu contrast works. Record baseline lint warnings separately from new issues; run scoped lint, typecheck and appropriate existing checks. Run Impeccable detector once on finished changed UI. Record token ownership and screenshot paths for phase 2. No hero migration yet.

## Phase 1 record (completed 19 October 2026)

Status: implemented; gate evidence below. Not committed.

**Product/design records.** `PRODUCT.md` written (audience, proof-claim approval and WCAG AA confirmed with the user). `DESIGN.md` documents the actual Slate & Glacier tokens, Newsreader/Plex mapping and the superseded navy/teal. No `.impeccable/design.json` sidecar yet (offer in a later phase).

**Token ownership.** Shared public identity now lives in `src/app/(frontend)/globals.css` `:root` (loaded by the frontend layout and the global 404; Payload admin has its own root layout and never imports it). Moved out of `home.css`: all palette tokens, selection, caret, scrollbar, focus (glacier on slate/footer/drawer), `.font-serif` and `.display-*` to Newsreader 450, eyebrow tracking, flat `.deep-field`, `.plate` slate overlay, `.plate-banner` lens closing banner, `.plate-banner` drift animation. `home.css` keeps composition only plus one deliberate home-scoped rule: transparent resting header (`body:has(.home-slate) header[data-at-rest]`), because interior heroes are still dark until phase 2.

**Other files.** `header.tsx` (paper bar and dropdown from tokens, blur removed), `cta.tsx` (dropped `shadow-2xl`, which beat the flat banner), `page-hero.tsx` (`on-deep`, glacier pixels, slate overlay; hero not migrated), `service-item-card.tsx`, `shiny-text.tsx`, `about/page.tsx` (surface tokens), `layout.tsx`/`manifest.ts` (theme and background colours). `.eyebrow.text-accent-bright` now resolves to glacier (an unlayered rule had been beating the utility; this also fixes a 2.5:1 "Client voices" label on home).

**Evidence** (`.impeccable/phase-1/`): `before/` and `after/` full-page captures for home, services, a service, about, contact, blog, privacy and 404 at 1440/768/390 (`<route>-<width>.jpg`); `cmp-home-cta.png`, `montage-after.png`, `after/state-mega-1440.jpg`, `after/state-drawer-390.jpg`; scripts `capture.mjs`, `contrast.mjs`, `states.mjs`, `nav.mjs`, and `detect.json`.
- Home before/after pixel diff: only the animated 3D model, a lazy-loaded image and sub-pixel lens drift differ; no layout or colour change. No horizontal overflow at 390/768/1440 on any captured route.
- Direct loads of interiors use paper `#f1f5f5` and Newsreader headings. Client navigation `/ -> /services -> /contact -> /` kept the same palette and fonts, header returned to transparent at rest on home, one canvas on interiors and two on home, no render-loop accumulation seen.
- Contrast scan (text vs effective background) on 11 routes at 1440 and 390: no failures except the home label fixed above; alpha-white text on slate passes.
- `tsc --noEmit` clean. ESLint: 0 errors, 4 baseline warnings (react-hooks set-state-in-effect in `contact-form.tsx`, `hero-case-files.tsx`, `header.tsx` x2), none new.
- Impeccable detector on changed UI: 74 advisory design-system notes, no antipatterns. They are legacy literals in the old home hero block of `globals.css` (`.evidence-hero`, `.fallback-ring*`, `.optical-field*`) and the display-class clamps.

**Not done / handoff to phase 2.**
- Legacy navy/teal literals remain in the old home hero and CSS fallback rules (`globals.css` ~L595-655) and in `optical-field.tsx`, `flow-lines.tsx`, `spotlight.tsx` (used by home proof), `og.tsx`, `apple-icon.tsx`. Phase 2's reusable assembly should own or retire them; social/OG/icon artwork needs a deliberate refresh.
- Interior heroes are still the dark PixelBlast `PageHero`; blog article byline strip is still `bg-deep`. Both now render slate/glacier.
- Dev-only "1 Issue" Next overlay appears on interiors; not investigated (pre-existing).
- Keyboard focus verified by CSS review and the drawer/menu captures only; no scripted tab walk. Do one in phase 6.
