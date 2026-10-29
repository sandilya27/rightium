import assert from "node:assert/strict";

// Run against a production build, or set SEO_BASE_URL to the deployed origin.
const origin = process.env.SEO_BASE_URL || "http://localhost:3111";
const canonicalOrigin = "https://www.rightium.org";
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
for (const agent of ["Mozilla/5.0", "Googlebot", "Googlebot-Image"]) {
  const headers = { "User-Agent": agent };
  const response = await fetch(origin, { headers });
  assert.equal(response.status, 200);
  assert.ok(!response.headers.get("x-robots-tag")?.includes("noindex"));
  const html = await response.text();
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(m => attributes(m[0]));
  assert.equal([...html.matchAll(/<title>/g)].length, 1);
  assert.match(html.match(/<title>(.*?)<\/title>/s)?.[1] || "", /Rightium/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.equal(tags.filter(t => t.rel === "canonical").length, 1);
  assert.equal(new URL(tags.find(t => t.rel === "canonical").href).href, `${canonicalOrigin}/`);
  assert.equal(tags.find(t => t.property === "og:site_name")?.content, "Rightium");
  for (const tag of tags.filter(t => ["robots", "googlebot"].includes(t.name))) assert.ok(!tag.content.includes("noindex"));
  const icons = tags.filter(t => t.rel === "icon" && new URL(t.href, origin).pathname === "/favicon.ico");
  assert.equal(icons.length, 1, "Next.js must emit exactly one stable ICO link");
  const icoResponse = await fetch(new URL(icons[0].href, origin), { headers, redirect: "manual" });
  assert.equal(icoResponse.status, 200, `${agent}: favicon must not redirect`);
  assert.match(icoResponse.headers.get("content-type"), /^image\/(?:x-icon|vnd\.microsoft\.icon)(?:;|$)/);
  assert.ok(!icoResponse.headers.get("x-robots-tag")?.includes("noindex"));
  const ico = Buffer.from(await icoResponse.arrayBuffer());
  assert.equal(ico.readUInt16LE(2), 1);
  assert.ok(Array.from({ length: ico.readUInt16LE(4) }, (_, i) => ico[6 + i * 16]).includes(96));
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  const websites = schemas.filter(s => s["@type"] === "WebSite");
  const organizations = schemas.filter(s => [s["@type"]].flat().includes("Organization"));
  assert.equal(websites.length, 1);
  assert.equal(organizations.length, 1);
  assert.equal(websites[0].name, "Rightium");
  assert.equal(organizations[0].name, "Rightium");
  assert.equal(websites[0].publisher["@id"], organizations[0]["@id"]);
  assert.equal(new URL(websites[0].url).origin, canonicalOrigin);
  assert.equal(new URL(organizations[0].url).origin, canonicalOrigin);
  const robots = await fetch(new URL("/robots.txt", origin), { headers });
  assert.equal(robots.status, 200);
  const rules = await robots.text();
  assert.ok(!/^Disallow:\s*\/\s*$/m.test(rules));
  assert.ok(!/^Disallow:\s*\/(?:favicon|icon|apple-icon)/m.test(rules));
  assert.ok(rules.includes(`${canonicalOrigin}/sitemap.xml`));
  console.log(`PASS ${agent}: homepage, ICO, robots and brand metadata`);
}
console.log("User-agent probes verify these requests only; use Search Console to verify real Google crawler access.");
