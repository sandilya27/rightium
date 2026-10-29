# Rightium favicon and branded search audit

Audited 29 October 2026. Scope: public production responses at https://www.rightium.org/ and this checkout. Changes are local until deployed. Existing unrelated chat-assistant changes were preserved.

## Verified production evidence before changes

| Check | Observed result |
| --- | --- |
| HTTPS www homepage | 200, `text/html; charset=utf-8`, no X-Robots-Tag exclusion; HTML robots `index, follow` |
| HTTPS apex | 308 to `https://www.rightium.org/` |
| HTTP www | 308 to HTTPS www |
| HTTP apex | 308 to HTTPS apex, then 308 to HTTPS www; following the chain with Googlebot reached 200 |
| `/favicon.ico` | 404, `text/html; charset=utf-8`; no ICO existed locally |
| Linked SVG | `/icon.svg?28ae372bfdfae904`, 200, `image/svg+xml`; square `viewBox="0 0 32 32"`, no fixed raster dimensions, `sizes="any"` |
| Linked Apple icon | `/apple-icon?f97fb5e092ca141f`, 200, `image/png`, decoded 180×180; `rel="apple-touch-icon"`, `sizes="180x180"` |
| Bare icon URLs | `/icon.svg` and `/apple-icon` also return 200; no redirects or X-Robots-Tag exclusions observed |
| Googlebot user-agent | Homepage returns 200 |
| Googlebot-Image user-agent | Both bare and exact linked icon URLs return 200 |
| `/robots.txt` | 200, `text/plain; charset=utf-8`; wildcard allows `/` and `/api/media/file/`; blocks `/api/`, `/admin`, `/next/`, `/ingest/`. Homepage and icon URLs permitted |
| Apex robots | 308 to www robots |
| Sitemap | 27 URLs, all on `www.rightium.org`; robots host and sitemap also use HTTPS www |

These are network probes using crawler user-agent strings, not requests from verified Google IP addresses. They cannot prove Googlebot is never blocked by hosting rules, rate limits or regional behavior. HTTP and HTTPS redirects are already working at the deployment layer; no duplicate application host redirect was added.

## Brand metadata and content

- Exactly one live title: `Patent Search & IP Intelligence in Bengaluru | Rightium`.
- Exactly one H1: `Ideas move the world. Evidence moves them forward.` It is a marketing heading rather than a brand/service heading. Preserved to retain existing UI and content; an H1 containing the brand is not a prerequisite for site-name eligibility.
- `og:site_name` is `Rightium`. The title, description, visible wordmark, WebSite name and Organization name consistently identify Rightium.
- One WebSite schema: name `Rightium`, URL `https://www.rightium.org`, ID `https://www.rightium.org/#website`, publisher references `#organization`.
- One Organization/ProfessionalService schema: name and legalName `Rightium`, same canonical hostname, ID `#organization`, logo `/icon.svg`. SVG remains the existing organization logo; a favicon fix does not require replacing it.
- Canonical is `https://www.rightium.org` (equivalent to its trailing-slash root); sharing URLs and schema use the same hostname. No conflicting canonical found.
- The `contact@rightium.in` email is a contact address, not a competing canonical. No unsupported social profiles or `sameAs` claims were invented.
- The public web search probe for `rightium` and `site:rightium.org Rightium` did not reliably return this site. This is not a direct Google SERP measurement, proof of deindexing, or a position baseline. No Search Console access or historical query data was available.

## Implemented change and rationale

Added `src/app/favicon.ico`, containing 16×16, 32×32, 48×48 and 96×96 PNG frames rasterized from the existing SVG brand mark. Next.js file-based metadata emits the stable `/favicon.ico` link automatically; no manual icon metadata, repeated schema, title changes, robots changes, redirect changes or visible content changes were added.

The missing conventional ICO is a concrete compatibility gap. A stable ICO with a 96px frame provides an explicit standard icon and fixes the observed 404. It does **not** establish the cause of the missing Google favicon: the linked 180px Apple icon was already a valid candidate. Google controls display and recrawl timing.

Google's [favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search) calls for a square, crawlable icon at a stable URL and recommends a size larger than 48px. Its [site-name guidance](https://developers.google.com/search/docs/appearance/site-names) emphasizes consistent naming and WebSite data, which already exist here. Neither additional keyword metadata nor duplicate entity schema addresses a verified defect.

## Validation

- `npm run test:seo`: 12 tests pass, including ICO frame decoding and canonical entity identity.
- `scripts/audit-brand.mjs` checks the rendered homepage for one title, H1, canonical, WebSite and Organization; verifies site name, publisher linkage, ICO response/MIME/96px frame, and robots under browser, Googlebot and Googlebot-Image user agents. Run against a production server: `SEO_BASE_URL=http://localhost:3111 node scripts/audit-brand.mjs` (set the variable using your shell's syntax).
- Production build: passed (63 static pages generated). The initial sandbox attempt encountered a Windows EPERM creating build output; retry outside the sandbox succeeded.
- `npm run typecheck`: passed. `npm run lint`: passed with zero errors and four existing React effect warnings in contact-form, hero-case-files and header components.
- Production HTTP check: `scripts/audit-brand.mjs` passed for browser, Googlebot and Googlebot-Image user agents on localhost:3112. Exactly one stable ICO link, 200 ICO response with correct MIME, 96px frame, indexable homepage/icon, robots permissions, and single linked brand schemas confirmed.
- Existing `scripts/audit-seo.mjs` with `SEO_EXPECT_INDEXING=true`: passed all 27 public sitemap pages, sharing images, migration redirects, private-route exclusions and 404 handling.
- Build emitted database SSL-mode deprecation and metadataBase fallback warnings. Public-page HTTP checks confirmed absolute HTTPS sharing images and canonical URLs; no changes outside this audit's scope were made to address these warnings.
- Production compilation is invoked directly with `node --max-old-space-size=6144 node_modules/next/dist/bin/next build --webpack`, avoiding the package prebuild hook, which can migrate a configured database. No database migration is needed for a favicon asset.

## Deployment and external checks

1. Deploy the asset and repeat the production audit against `https://www.rightium.org`. Confirm the new `/favicon.ico` returns 200 with an ICO MIME type, no noindex header, and appears exactly once in the homepage head. Check the icon visually at small sizes.
2. In the Vercel domain configuration, retain `www.rightium.org` as the primary HTTPS hostname. The current two-hop HTTP apex chain works; shortening it at the host is optional, not an urgent SEO fix.
3. Check hosting/firewall logs for actual Googlebot and Googlebot-Image requests and any 403/429 responses. Validate crawler identity using Google's [verification guidance](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot); user-agent text alone is insufficient.
4. Validate existing JSON-LD in Schema Markup Validator. Rich Results Test can help with supported rich-result types but does not validate Google's site-name selection.
5. Confirm any owned business/social profiles link to HTTPS www and consistently use Rightium. Add `sameAs` only after the actual profile URLs are verified. Earn relevant editorial mentions and links through genuine industry work; no automated link creation is part of this change.

## Google Search Console actions

1. Verify the `rightium.org` Domain property so all protocol/hostname variants are covered. Inspect `https://www.rightium.org/`; compare user-declared and Google-selected canonical, indexed status, last crawl, fetch results and indexing restrictions. Inspect apex only to confirm consolidation.
2. After deployment, run Test Live URL for the homepage, inspect rendered HTML for `/favicon.ico`, check loaded resources, and request homepage indexing once. Do not rely on indexing the favicon as a standalone web page. Keep the icon URL stable and allow recrawl/processing time.
3. Submit or verify `https://www.rightium.org/sitemap.xml`; review Page indexing and Crawl stats for failures. Check Manual actions and Security issues if visibility remains unexpectedly absent.
4. In Performance → Search results, filter Query to exact `rightium`, compare periods, and review impressions, clicks, CTR and average position by page, country and device. Confirm the homepage receives branded impressions and assess hostname/page splits. This provides a real baseline; public search probes do not.
5. Check the actual Google result on mobile and desktop after recrawling, accounting for location and personalization. No favicon display, site-name selection, indexing deadline or ranking improvement is guaranteed.
