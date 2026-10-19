---
name: Rightium
description: Slate & Glacier editorial system for an evidence-led IP research firm.
colors:
  paper: "#f1f5f5"
  surface: "#e7eeee"
  surface-2: "#d9e5e5"
  ink: "#202f3d"
  ink-body: "#374f60"
  accent: "#49667c"
  accent-hover: "#354f63"
  glacier: "#a5d6ca"
  glacier-soft: "#dceee9"
  deep: "#202f3d"
  deep-lift: "#304858"
  deep-well: "#192733"
  deep-ink-2: "#d2dfe4"
  deep-ink-3: "#adc2cb"
  danger: "#b3382b"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(3.5rem, 5.3vw, 5.5rem)"
    fontWeight: 450
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2rem, 4.2vw, 3.75rem)"
    fontWeight: 450
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78125rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  none: "0"
spacing:
  gutter: "1.25rem"
  gutter-wide: "2.5rem"
components:
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    height: "50px"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
  button-ink:
    backgroundColor: "{colors.deep}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
---

# Design System: Rightium

## Overview

**Creative North Star: "The Evidence Dossier"**

Cool paper, slate ink and one glacier green. The site reads like a document the firm would hand a client: square corners, hairline rules, large Newsreader headings over calm IBM Plex Sans text. The approved homepage is the authority; every public route draws from the same tokens, so navigating never changes the identity.

**Key Characteristics:**
- One public theme, owned by `src/app/(frontend)/globals.css`; `home.css` holds homepage composition only.
- Flat fields: depth comes from paper, surface and slate tiers, not shadows or gradients.
- Glacier is rare and marks inverse emphasis; slate-blue (`accent`) marks controls on paper.

## Colors

- **Cool Paper** (#f1f5f5): page ground. **Mist Surface** (#e7eeee) and **Fog Surface** (#d9e5e5): tiered panels.
- **Slate Ink** (#202f3d): headings and inverse sections; **Body Slate** (#374f60): running text; **Ridge Blue** (#49667c): secondary ink, links, primary buttons (white text, 5.9:1).
- **Glacier** (#a5d6ca): emphasis on slate only (4.5:1+ against #202f3d); never text on paper. **Glacier Mist** (#dceee9): soft fill on paper.
- **Slate Lift** (#304858) and **Slate Well** (#192733): layers inside inverse sections.

**The Glacier-On-Slate Rule.** Glacier is a foreground color only over slate. On paper, use Ridge Blue.

## Typography

**Display:** Newsreader (variable, 450). **Body/UI:** IBM Plex Sans. Both self-hosted in `site-shell.tsx`. `.font-serif` and `.display-*` map to Newsreader; Tailwind `font-sans` is Plex.

- Display tracking -0.025em to -0.035em; labels uppercase at 0.08em; body 65 to 75ch.

## Layout

Single `.shell` container, 80rem max, gutters 1.25rem (2.5rem from 768px). Header height 64px (76px from 768px). Section rhythm clamp(4rem, 7vw, 6.5rem).

## Elevation & Depth

Flat by default. Hairline `--line` rules; shadows only for menus and sticky chrome. Photography is flattened under a 50% slate multiply (`.plate`).

## Shapes

Square. No border radius on buttons, fields, cards or panels; circles only for small icon toggles.

## Components

- **Buttons:** square, 40/50/54px heights; `accent` is the commitment action; `ink` is slate; hover moves to Ridge Blue hover.
- **Header:** paper with slate text; transparent only at the top of the homepage. **Footer and CTA:** flat slate, glacier accents, lens drawing in the closing banner.
- **Fields:** white, 1px strong line, Ridge Blue focus ring.
- **Focus:** 2px Ridge Blue outline (glacier on slate), offset 5px.

## Do's and Don'ts

### Do:
- **Do** consume semantic tokens (`bg-paper`, `text-accent`, `bg-deep`) rather than hex values.
- **Do** keep selection glacier-on-slate and the caret/scrollbar Ridge Blue.

### Don't:
- **Don't** reintroduce the earlier navy (#0a1f33) and bright teal (#00a8b6) identity; it is superseded.
- **Don't** put `accent-bright` text on light surfaces.
- **Don't** key shared styling off `body:has(.home-slate)`.
