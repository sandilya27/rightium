# Rightium SEO audit — 11 October 2026

## Scope

Audited the Next.js/Payload project and inspected the public domain. `https://rightium.in` currently serves a separate WordPress website titled “RIGHTIUM – Legal Partners”; changes in this repository will reach that domain after the replacement is deployed.

## Findings and fixes

| Finding | Fix in the replacement |
| --- | --- |
| Live WordPress homepage has no meta description or H1 in its HTML | Replacement has a descriptive homepage title, concise description and one primary heading |
| Several practice metadata descriptions were slogans rather than service descriptions | Seven individual service titles and descriptions specify the actual research offering |
| CMS excerpts can exceed useful snippet length | Metadata descriptions are whitespace-normalised and shortened at a word boundary; editorial content is preserved |
| Sharing metadata did not explicitly include Twitter images | Shared helper supplies absolute image URLs, cover image details where available, and a generated brand image fallback |
| Article edits were reported as the original publication date | CMS `updatedAt` feeds article schema, Open Graph and sitemap; article pages show the update date |
| Collective author was represented as a person | Rightium Team uses Organization markup linked to the About page; individual authors remain Person entities |
| Selected works had no article or breadcrumb schema | Added Article and BreadcrumbList JSON-LD with image, sector, publisher and available modification date |
| Article draft previews could inherit indexing directives | Draft metadata explicitly disables both general and Google indexing |
| Public indexing removed every noindex HTTP header | Admin, preview and analytics endpoints retain noindex headers after launch |
| Blanket API robots exclusion blocked locally stored cover images | A specific allow rule permits `/api/media/file/` while other API paths remain excluded |
| Scroll reveal wrappers render transparent without JavaScript | A scoped noscript fallback displays their content |
| Old Insights and IP-services routes would disappear after migration | Permanent redirects map `/insights[/]` to `/blog` and `/practice-area/intellectual-property-rights-ipr[/]` to `/services` |

The explicit pre-launch indexing gate is preserved. `ALLOW_INDEXING=true` must be set on the production deployment when launching this replacement. Preview deployments should keep it unset.

## Verification

Completed: 13 regression checks (9 SEO and 4 contact checks), TypeScript, scoped source lint, and the production build. The rendered audit passed all 24 public pages using built-in content with `ALLOW_INDEXING=true` and database access disabled. The build emits a metadataBase warning; the rendered audit confirms public HTTPS sharing image URLs on every public page.

- SEO regression suite: `npm run test:seo`.
- TypeScript: `npm run typecheck`.
- Rendered-page audit: build and start a production server, then set `SEO_BASE_URL` to its origin and run `npm run seo:audit`. Set `SEO_EXPECT_INDEXING=true` for a launch-configured build.
- Production validation uses the built-in content with database access disabled; it does not run migrations against the shared CMS.

The audit checks every sitemap page for an HTTP 200, unique title, description, canonical URL, exactly one H1, Open Graph and Twitter images, and relevant JSON-LD. With launch checking enabled it also checks noindex directives and robots.txt.

## Launch actions

1. Deploy the replacement to the intended domain and enable `ALLOW_INDEXING=true` in the production environment.
2. Confirm the canonical HTTPS host and that any www hostname redirects to it through the hosting provider.
3. Submit `/sitemap.xml` in Google Search Console, inspect representative service/article/work URLs and request crawling.
4. Decide what to do with the older legal-service and legal-article URLs. Their topics do not match this replacement; preserve the content if still needed or leave removed pages as proper 404s. Avoid redirecting all unrelated pages to the homepage.
5. Replace generic LinkedIn/X links with the actual business profile URLs when those are available.
6. Review the accuracy of published client outcomes, numerical claims and testimonials before launch.

No deployment, Search Console submission or ranking claim is made by this audit. Field Core Web Vitals and search performance still need measurement on the deployed replacement.

Reference: [Google's Article structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/article).
