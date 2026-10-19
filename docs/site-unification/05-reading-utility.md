# Phase 5 — Insights, case studies, legal and 404

Dependency: phases 1–4. Status: pending.

## Implementation prompt

Use $impeccable and implement phase 5 only. Read the master brief/matrix, prior evidence, relevant installed Next.js docs, craft-floor and the Read/Operate guidance. Every public template receives a compact model, including legal and 404, as confirmed by the user. Keep reading content prominent and motion restrained.

Migrate `/blog`, `/blog/[slug]`, `/work/[slug]`, `/privacy`, `/terms`, route not-found and global-not-found. Adapt the full page, not just the hero: cards, category displays, byline strip, TOC, article rich text, lists, quotes, tables/code where supported, images/captions, author information, related posts, subscription component where present and return links. Preserve existing article shared-title transitions and close behavior, avoiding a dark legacy byline strip stranded below the light hero.

Article/work callouts must come from actual topics or headings with a safe generic editorial profile if absent. Do not put arbitrary long CMS headings directly into SVG labels; use verified concise display labels and an accessible HTML equivalent. Handle very long titles/excerpts, no image, no headings, sparse content, and no related posts. Enumerate actual CMS slugs; preserve server data fetching, caching/revalidation, draft preview, publication access rules and missing-slug behavior.

Legal pages retain exact legal text, numbering, dates and links. Their models are the quietest compact variant; avoid treating policy headings as product promises. Both 404 entry points must independently load shared fonts/theme and the assembly fallback, retain noindex and true 404 status, and offer working recovery links. Do not create new route families or alter Payload admin.

## Gate and handoff

Verify every listed static route and representative CMS articles/work including long/sparse examples, published and authorized draft states, unknown slugs, direct global 404 and client transitions. Check TOC/hash offsets and rich-text overflow at 320px and zoom. Record screenshots at mobile/desktop plus tablet edge cases, metadata/structured-data checks, applicable existing tests, lint/typecheck and detector results. Legal copy diff must show no accidental changes.
