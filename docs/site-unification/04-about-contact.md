# Phase 4 â€” About and contact

Dependency: phases 1â€“3. Status: pending.

## Implementation prompt

Use $impeccable, read the master brief/matrix and prior evidence, and implement phase 4 only. Read relevant Next.js documentation plus craft-floor and harden references before editing. Give `/about` and `/contact` compact 3D heroes with labels verified against their actual content.

Unify About's full narrative, imagery, evidence, team content where present, section layouts and CTA with the approved identity. Preserve real claims and assets; do not add customer logos, testimonials, credentials or invented proof.

Unify Contact's hero, contact details, trust/explanatory text and form. Keep the form easy to reach after the compact hero. Preserve field names, required/optional meaning, service preselection and query parameters, API schema, spam controls and delivery behavior. Cover idle, focus, filled, invalid, submitting, success and server/network failure states; preserve entered values after recoverable errors and prevent accidental duplicate submission. Accessible labels, error association, live feedback, keyboard order and mobile inputs matter as much as visual consistency. Check every phone, email, WhatsApp and office link.

## Gate and handoff

Desktop/tablet/mobile screenshots show matched theme and clear task hierarchy. Test direct and service-preselected enquiries. Use mocks or the existing test harness for submit success/failure; do not send real client messages to production. Run existing contact tests, scoped lint/typecheck and finished-UI detector. Record behavior checked, environment limits, screenshots and outstanding issues.


## Phase 4 record — 20 October 2026

Implemented About and Contact only. No commit/push. Shared renderer, homepage, services, CMS, metadata, contact API and delivery configuration are unchanged.

**Context.** Read the master brief, route matrix, phase 1–3 records and existing evidence scripts, PRODUCT.md, DESIGN.md, installed Next.js use-client/lazy-loading/forms guides, and Impeccable harden/craft-floor before editing. The once-per-session context command interpreted `/about` as an absolute filesystem target and reported no product context there; actual project context was read directly without rerunning it. Incumbent visual authority comes from prior evidence and current rendered pages.

**Content verification and implementation.** About's labels are Research (origin narrative), Review (second analyst challenges the conclusion), Evidence (search log, reconstructable method and hero lede), and Team (existing practice leads). Contact's labels are Your Question (message), Project Scope (service, deadline and scope response), and Contact Details (name/email/phone plus contact links). Both explicitly configure the existing PageHero assembly and use paper-safe emphasis. No invented proof or additional services. About retains its full narrative, photo, sectors, counters, principles, named team and intentional portrait placeholders, plus shared CTA/footer; its remaining literal body colour now uses the shared token.

Contact gains a direct hero link to `#enquiry`, a named form section with fixed-header offset, less separation below the hero, and form-first ordering below desktop. Desktop keeps details alongside the form; tablet uses the full available width after visual review found the old split too narrow. Contact links wrap safely at 320px. Existing phone, WhatsApp, email, encoded office map and hours remain sourced from site data. Link destinations were inspected against that data: tel:+919606068707, wa.me/919606068707, mailto:contact@rightium.in, and the Rightium Bengaluru map search. No calls/messages were initiated or third-party account validity asserted.

**Form resilience.** Existing field names, optional meanings, select values, query preselection, UTM/referrer payload, honeypot, Turnstile reset and API contract remain. Required controls now expose native required semantics. Inputs are 16px with body-token placeholders. Existing associated inline errors and first-invalid focus remain. A synchronous ref plus pending button disable prevents repeated submissions, including same-tick attempts; success also blocks resubmission while the form exits. Busy/live feedback and a single accessible submit label replace duplicate hidden text announcements. Success receives focus. Recoverable server/network errors retain entered values; network failures explain retry and the retained entries. Alert styling uses shared paper/danger colours.

**Evidence:** `.impeccable/phase-4/` (ignored local evidence, same convention as prior phases).
- `verify.mjs`, `layout.json`, `about-{320,390,768,1440}.jpg`, `contact-{320,390,768,1440}.jpg`: Chromium reduced-motion full-page captures. One H1 and compact assembly on each route, models initialized, no document overflow. Desktop/mobile compositions and tablet renders inspected. `final.mjs` / `final-layout.json` and final contact captures supersede the initial contact tablet layout: tablet form now 606px wide at 768px. Hero enquiry link lands its section at about 112px below the viewport top. Focused input computed 16px with the existing slate focus treatment.
- `states.json`, `invalid-390.jpg`, `server-error-390.jpg`, `success-390.jpg`: preselected `patentability-search&intent=order` plus email query tested. Invalid required fields focus Name and send no request; pending exposes busy/disabled state; two immediate submit events issue one request; mocked 500 and rejected network request preserve the message; successful retry focuses confirmation; Send another brief resets fields. Submitted payload retains the selected service and original field names. Unicode name supported in the mocked payload.
- `direct.mjs` / `direct.json`: a direct enquiry without query parameters succeeds through a client fetch mock with empty optional service. All browser submissions intercept `/api/contact`; no real enquiry was delivered. Live Turnstile/provider delivery was not exercised (local verification is unconfigured).
- `node --test tests/contact.test.cjs`: 4/4 pass. Final `tsc --noEmit`: clean. Scoped ESLint: 0 errors, one existing set-state-in-effect warning for query preselection. `git diff --check`: clean.
- Finished-UI detector run once: 11 advisory type-ramp findings, zero non-advisory findings (`detect.json`). Existing editorial sizes retained. Subsequent visual correction only changes the Contact layout breakpoint, plus formatting/submission guard.

**Limits / phase 5 handoff.** Existing dev issue badge remains in screenshots. Physical device/Safari, actual browser zoom, assistive-technology announcement testing, a full keyboard traversal, real anti-spam challenge and provider delivery remain unverified; no production delivery attempted. Shared assembly fallback/context-loss lifecycle coverage is inherited from phase 2, not rerun here. Homepage and shared UI code are untouched; no fresh homepage pixel regression claimed. Team portraits remain the incumbent explicitly marked placeholders. Phase 5 can migrate reading and utility routes using the same explicit hero API.
