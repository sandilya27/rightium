# Phase 2 — Reusable compact 3D hero

Dependency: phase 1. Status: pending.

## Implementation prompt

Use $impeccable, read the master brief/matrix and phase 1 evidence. Implement phase 2 only. Read installed Next.js client/lazy-loading documentation and Impeccable craft-floor, adapt and optimize references before relevant edits.

Refactor `src/components/home/invention-scene.tsx` into one shared assembly implementation with a typed default home profile and an interior compact profile. Configure label text, valid model-anchor IDs, accessible description, sizing/camera framing and motion budget. Preserve home defaults and its projected anchor behavior. Validate that two-to-five labels work without relying on array position for semantic identity. Do not fork the entire scene or scale a full-size canvas through CSS transforms.

Extend `src/components/site/page-hero.tsx` with explicit configuration rather than pathname inference. Keep server-rendered breadcrumbs, eyebrow, one H1, lede, CTA slots and optional aside. Use the approved light field and smaller assembly; remove competing PixelBlast backgrounds from migrated heroes. Plan the aside below copy or as a fact strip so model and existing facts do not compete in three squeezed columns. Integrate one representative real interior route to prove the API; remaining route profiles ship in phases 3–5.

Desktop starting target: 280–360px model stage, content-driven 420–560px hero. At 320/390px, stack readable copy/action before a compact model; HTML labels may become a short legend while preserving their anchor associations. Test long titles, no lede, no aside, two labels and five labels. Never truncate essential headings or let callouts cross text/buttons.

Keep fallback geometry visible before WebGL loads or when unavailable. Callout meaning must survive loading failure/context loss and reduced motion. Keep decorative canvas/SVG hidden from duplicate screen-reader output. Bound DPR, pause offscreen/hidden rendering, and dispose observers, listeners, geometries, materials and renderer on unmount. Keep initial HTML independent of WebGL and animation. No new CMS fields are needed solely for decorative configuration.

## Gate and handoff

Compare home before/after and compact route at 320/390/768/1440px and 200% zoom. Exercise no-WebGL, reduced motion and repeated client navigation. Confirm no label overlap, model cropping, duplicate loops or layout shift from scene startup. Record shared API and fallback decisions, screenshots, lint/typecheck results and final detector findings. Other interior routes must remain functional while awaiting migration.
