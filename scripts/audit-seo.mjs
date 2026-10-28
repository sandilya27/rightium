import assert from "node:assert/strict";

// Run against a production server: SEO_BASE_URL=http://localhost:3111 npm run seo:audit.
// Canonicals always point to the public domain, even when auditing locally.
const origin = process.env.SEO_BASE_URL || "http://localhost:3111";
const canonicalOrigin = "https://www.rightium.org";
const requireIndexing = process.env.SEO_EXPECT_INDEXING === "true";
const sitemap = await fetch(new URL("/sitemap.xml", origin));
assert.equal(sitemap.status, 200, "Sitemap must be accessible");
const sitemapText = await sitemap.text();
const urls = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.length >= 20, "Sitemap should include static pages, services, articles and work");
const titles = new Set();
const sharingImages = new Set();
const workLinks = new Set();
for (const canonical of urls) {
  assert.equal(new URL(canonical).origin, canonicalOrigin);
  const route = new URL(canonical).pathname;
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  if (route === "/") {
    for (const match of html.matchAll(/href="(\/work\/[^"?#]+)"/g)) workLinks.add(match[1]);
    assert.ok(html.includes('href="/work"'), "Homepage must link to the complete Selected Work catalogue");
    assert.ok(workLinks.size <= 4, "Homepage must retain at most four featured studies");
  }
  if (route === "/work") {
    for (const match of html.matchAll(/href="(\/work\/[^"?#]+)"/g)) workLinks.add(match[1]);
  }
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(match => {
    const attrs = {};
    for (const attribute of match[0].matchAll(/([\w:-]+)=["']([^"']*)["']/g)) attrs[attribute[1]] = attribute[2];
    return attrs;
  });
  const meta = name => tags.find(tag => tag.name === name || tag.property === name)?.content;
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${route}`);
  titles.add(title);
  assert.ok(meta("description"), `Description: ${route}`);
  assert.ok(meta("description").length <= 160, `Description length: ${route}`);
  const canonicalTag = tags.find(tag => tag.rel === "canonical")?.href;
  assert.ok(canonicalTag, `Canonical present: ${route}`);
  assert.equal(new URL(canonicalTag).href, new URL(canonical).href, `Canonical: ${route}`);
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `One H1: ${route}`);
  assert.ok(meta("og:image") && meta("twitter:image"), `Sharing images: ${route}`);
  for (const key of ["og:image", "twitter:image"]) {
    const imageUrl = new URL(meta(key));
    assert.equal(imageUrl.protocol, "https:", `Absolute HTTPS sharing image: ${route}`);
    assert.ok(imageUrl.hostname !== "localhost", `Public sharing image: ${route}`);
    sharingImages.add(imageUrl.href.replaceAll("&amp;", "&"));
  }
  if (requireIndexing) {
    assert.ok(!response.headers.get("x-robots-tag")?.includes("noindex"), `HTTP indexable: ${route}`);
    assert.ok(!meta("robots")?.includes("noindex"), `HTML indexable: ${route}`);
  }
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert.ok(schemas.some(schema => schema["@type"] === "WebSite"), `Website schema: ${route}`);
  if (route.startsWith("/blog/")) assert.ok(schemas.some(schema => schema["@type"] === "BlogPosting"), `Article schema: ${route}`);
  if (route.startsWith("/work/")) assert.ok(schemas.some(schema => schema["@type"] === "Article"), `Work schema: ${route}`);
  console.log(`PASS ${route}`);
}
assert.ok(workLinks.size > 0, "Selected Work detail links must exist in server-rendered homepage HTML");
for (const path of workLinks) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `Work detail accessible: ${path}`);
  const html = await response.text();
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)]
    .map(match => Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attr => [attr[1], attr[2]])))
    .find(tag => tag.rel === "canonical")?.href;
  assert.ok(urls.includes(canonical), `Work canonical is an indexable sitemap URL: ${path}`);
  const sectionNumbers = [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/gs)]
    .map(match => match[1].replace(/<[^>]+>/g, '').match(/^(\d+)\.\s/))
    .filter(Boolean).map(match => Number(match[1]));
  sectionNumbers.forEach((number, index) => assert.equal(number, index + 1, `Consecutive study sections: ${path}`));
}
for (const image of sharingImages) {
  const url = new URL(image);
  const target = url.origin === canonicalOrigin ? new URL(`${url.pathname}${url.search}`, origin) : url;
  const response = await fetch(target);
  assert.equal(response.status, 200, `Sharing image accessible: ${url.pathname}`);
  assert.ok(response.headers.get("content-type")?.startsWith("image/"), `Sharing image content type: ${url.pathname}`);
  await response.body?.cancel();
}
for (const [source, destination] of [["/insights/", "/blog"], ["/practice-area/intellectual-property-rights-ipr/", "/services"]]) {
  const response = await fetch(new URL(source, origin), { redirect: "manual" });
  assert.equal(response.status, 308, `Permanent migration redirect: ${source}`);
  assert.equal(new URL(response.headers.get("location"), origin).pathname, destination);
}
const missing = await fetch(new URL("/seo-audit-missing-page", origin));
assert.equal(missing.status, 404, "Missing pages must return a real 404");
assert.match(await missing.text(), /name="robots" content="[^"]*noindex/, "Missing pages must not be indexed");
const robots = await fetch(new URL("/robots.txt", origin));
assert.equal(robots.status, 200);
if (requireIndexing) {
  const text = await robots.text();
  assert.ok(!/^Disallow: \/\s*$/m.test(text), "Production robots must permit public pages");
  assert.ok(text.includes(`${canonicalOrigin}/sitemap.xml`));
}
if (requireIndexing) {
  const api = await fetch(new URL("/api/posts?limit=1&depth=0", origin));
  assert.ok(api.headers.get("x-robots-tag")?.includes("noindex"), "API JSON must retain noindex after launch");
  const publicImage = await fetch(new URL("/icon.svg", origin));
  assert.ok(!publicImage.headers.get("x-robots-tag")?.includes("noindex"), "Public image assets must remain indexable");
}
console.log(`SEO audit passed for ${urls.length} public pages.`);
