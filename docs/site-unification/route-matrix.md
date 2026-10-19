# Route and callout coverage

Callouts below are proposed descriptive labels, not new marketing claims. Match each to existing content before implementation. Use up to five model anchors; use fewer labels when the page has fewer meaningful concepts. Provide readable HTML equivalents. Dynamic routes get a content-derived profile with a safe editorial fallback; never derive facts from a slug alone.

| Route/template | Phase | Proposed callouts | Preserve / verify |
| --- | --- | --- | --- |
| `/` | 1–6 regression | Existing five homepage labels | Entire approved layout, full-size model, counters, case studies, insights, CTA/footer |
| `/services` | 3 | Search; Intelligence; Prosecution; Licensing; Consulting | All seven categories still visible in content; five labels are not the complete catalogue |
| `/services/search-solutions` | 3 | Patentability; Invalidity; FTO; Patent Watch; State of the Art | All six offerings, deliverables, turnaround and anchors |
| `/services/intelligence-solutions` | 3 | Quick Lens; Landscapes; Competitor Intelligence; Innovation Scouting | All four offerings and enquiry links |
| `/services/patent-database-strategy` | 3 | Database Evaluation; Database Migration | Both offerings; do not pad with invented services |
| `/services/prep-and-prosecution` | 3 | Drafting; Prosecution; Paralegal Support; Docketing | Existing four offerings and service selection |
| `/services/licensing` | 3 | Portfolio Mining; Evidence of Use; Directed Prosecution | All three offerings; preserve EoU terminology |
| `/services/chemical-safety-intelligence` | 3 | Rapid Tox Data; Literature Search; Chemical Safety Report | Existing chemical-safety content and caveats |
| `/services/ip-consulting-and-audit` | 3 | IP Strategy Audit; IP Process Audit; IP Asset Audit | All three offerings |
| `/about` | 4 | Research; Review; Evidence; Team | Verify these labels against the page; retain existing proof and images |
| `/contact` | 4 | Your Question; Project Scope; Contact Details | Accessible form, service query preselection, submission feedback, phone/email/WhatsApp |
| `/blog` | 5 | Research; Analysis; IP Decisions | Existing posts/categories, cards, subscription behavior where present |
| `/blog/[slug]` | 5 | Actual article topic + up to two real headings | CMS title/excerpt, byline, dates, reading time, TOC, rich text, related posts, preview |
| `/work/[slug]` | 5 | Actual case-study headings such as Question; Method; Evidence | Real sector, metric, metric label, image, body, TOC, draft preview |
| `/privacy` | 5 | Data Collection; Data Use; Your Rights | Verify against actual legal sections; preserve every legal paragraph/date/link |
| `/terms` | 5 | Engagement; Responsibilities; Terms | Verify against actual legal sections; preserve complete legal text |
| Route 404 and global 404 | 5 | Home; Services; Contact | Actual 404 response, noindex, working recovery links, compact assembly |

Payload `/admin`, API endpoints, preview handlers, sitemap, robots, manifest and generated images are not pages receiving 3D heroes. They remain in functional/metadata regression scope. No `/work` index exists in the audited route list; do not invent one. Enumerate actual CMS article/work slugs at validation time and record unavailable content rather than claiming it was tested.
