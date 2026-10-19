import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

// Read-only production checks. Never submit enquiries or modify CMS records.
const origin = process.env.SEO_BASE_URL || 'http://localhost:3111';
const output = process.env.RELEASE_AUDIT_OUTPUT;
const sitemap = await fetch(`${origin}/sitemap.xml`).then(r => r.text());
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const report = { origin, routes: [], recovery: [], preview: [], assets: [], budgets: [] };
for (const route of routes) {
  const start = performance.now();
  const response = await fetch(origin + route);
  const html = await response.text();
  assert.equal(response.status, 200, route);
  assert.match(response.headers.get('x-robots-tag') || '', /noindex/, `Preview indexing gate: ${route}`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, route);
  report.routes.push({ route, status: response.status, responseMs: Math.round(performance.now() - start), cache: response.headers.get('x-nextjs-cache') });
  if (['/', '/services', '/contact'].includes(route) || route === routes.find(x => x.startsWith('/blog/'))) {
    const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => m[1]))];
    let rawBytes = 0, gzipBytes = 0;
    for (const script of scripts) {
      const result = await fetch(new URL(script.replaceAll('&amp;', '&'), origin));
      assert.equal(result.status, 200);
      const bytes = Buffer.from(await result.arrayBuffer());
      rawBytes += bytes.length; gzipBytes += gzipSync(bytes).length;
    }
    report.budgets.push({ route, initialScriptCount: scripts.length, rawBytes, gzipBytes, note: 'HTML script references only; excludes dynamic Three.js, prefetch and analytics. Gzip calculated locally, not measured transfer size.' });
  }
}
for (const route of ['/missing-phase-six', '/blog/missing-phase-six', '/work/missing-phase-six', '/services/missing-phase-six']) {
  const response = await fetch(origin + route); const html = await response.text();
  assert.equal(response.status, 404, route); assert.match(html, /noindex/); assert.match(html, /Home/);
  report.recovery.push({ route, status: response.status });
}
for (const [path, expected] of [['/next/preview?path=https://example.com', 400], ['/next/preview?path=/blog/what-a-defensible-invalidity-search-looks-like', 401]]) {
  const response = await fetch(origin + path, { redirect: 'manual' });
  assert.equal(response.status, expected, path); report.preview.push({ path, status: response.status }); await response.body?.cancel();
}
for (const path of ['/robots.txt', '/manifest.webmanifest', '/apple-icon', '/icon.svg', '/opengraph-image']) {
  const response = await fetch(origin + path); assert.equal(response.status, 200, path);
  const body = Buffer.from(await response.arrayBuffer());
  if (path === '/robots.txt') assert.match(body.toString(), /Disallow: \//);
  if (path === '/manifest.webmanifest') {
    const manifest = JSON.parse(body); assert.equal(manifest.theme_color, '#202f3d'); assert.equal(manifest.background_color, '#f1f5f5');
  }
  report.assets.push({ path, status: response.status, bytes: body.length, type: response.headers.get('content-type') });
}
if (output) await writeFile(output, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
