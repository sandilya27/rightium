const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, env = {}, mocks = {}) {
  const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports, URL, Date, process: { env },
    require(name) {
      if (name in mocks) return mocks[name];
      if (name === '@/lib/site') return load('src/lib/site.ts', env);
      return require(name);
    },
  });
  return exports;
}
const seo = load('src/lib/seo.tsx');
const article = { slug: 'search-guide', title: 'Search guide', excerpt: 'A guide to research.', date: '2026-09-01T09:00:00Z', updatedAt: '2026-10-11T09:00:00Z', category: 'Practice', author: { name: 'Rightium Team', role: 'Research' }, coverImage: { url: 'https://res.cloudinary.com/example/image/upload/cover.jpg' } };

test('metadata uses a canonical URL and usable images on both sharing platforms', () => {
  const metadata = seo.pageMetadata({ title: 'Search guide', description: 'Research guide.', path: '/blog/search-guide', image: article.coverImage });
  assert.equal(metadata.alternates.canonical, 'https://rightium.in/blog/search-guide');
  assert.equal(metadata.openGraph.images[0].url, article.coverImage.url);
  assert.equal(metadata.twitter.images[0].url, article.coverImage.url);
  assert.equal(metadata.openGraph.title, 'Search guide | Rightium');
  assert.equal(seo.pageMetadata({ title: 'Contact', description: 'Contact us.', path: '/contact' }).twitter.images[0].url, 'https://rightium.in/opengraph-image');
});
test('draft metadata overrides inherited Google indexing directives', () => {
  const metadata = seo.pageMetadata({ title: 'Draft', description: 'Draft.', path: '/blog/draft', noIndex: true });
  assert.equal(metadata.robots.index, false);
  assert.equal(metadata.robots.googleBot.index, false);
});
test('article dates and author entity reflect the actual CMS record', () => {
  const data = seo.articleJsonLd(article);
  assert.equal(data.author['@type'], 'Organization');
  assert.equal(data.author.url, 'https://rightium.in/about');
  assert.equal(data.datePublished, article.date);
  assert.equal(data.dateModified, article.updatedAt);
  assert.equal(data.image, article.coverImage.url);
  assert.equal(seo.articleJsonLd({ ...article, author: { name: 'Individual Author', role: 'Researcher' } }).author['@type'], 'Person');
});
test('long CMS descriptions are shortened without modifying content', () => {
  const text = 'Research evidence and claim mapping. '.repeat(15);
  assert.ok(seo.searchDescription(text).length <= 160);
  assert.ok(seo.searchDescription('x'.repeat(200)).length <= 160);
  assert.equal(seo.searchDescription('  A short\n description.  '), 'A short description.');
});
test('robots retains the launch gate and permits local media after launch', () => {
  assert.equal(load('src/app/robots.ts').default().rules.disallow, '/');
  const robots = load('src/app/robots.ts', { ALLOW_INDEXING: 'true' }).default();
  assert.ok(robots.rules.allow.includes('/api/media/file/'));
  assert.ok(robots.rules.disallow.includes('/admin'));
  assert.equal(robots.sitemap, 'https://rightium.in/sitemap.xml');
});
test('private tools keep noindex HTTP headers when public indexing is enabled', async () => {
  const mocks = { '@payloadcms/next/withPayload': { withPayload: config => config } };
  const config = load('next.config.ts', { ALLOW_INDEXING: 'true' }, mocks).default;
  for (const header of await config.headers()) assert.equal(header.headers[0].value, 'noindex, nofollow');
  assert.ok((await config.headers()).some(header => header.source === '/admin/:path*'));
  assert.equal((await load('next.config.ts', {}, mocks).default.headers())[0].source, '/:path*');
});
test('matching WordPress URLs permanently redirect to relevant replacement pages', async () => {
  const config = load('next.config.ts', {}, { '@payloadcms/next/withPayload': { withPayload: config => config } }).default;
  const redirects = await config.redirects();
  assert.equal(redirects.find(route => route.source === '/insights/').destination, '/blog');
  assert.equal(redirects.find(route => route.source === '/practice-area/intellectual-property-rights-ipr/').destination, '/services');
  assert.ok(redirects.every(route => route.permanent));
});
test('sitemap records article edits and excludes unpublished or private routes', async () => {
  const sitemap = load('src/app/sitemap.ts', {}, {
    '@/lib/posts': { getPosts: async () => [article] },
    '@/lib/works': { getWorks: async () => [] },
    '@/lib/services': { services: [] },
  }).default;
  const entries = await sitemap();
  assert.equal(entries.find(entry => entry.url.endsWith('/blog/search-guide')).lastModified.toISOString(), article.updatedAt.replace('Z', '.000Z'));
  assert.ok(entries.every(entry => !entry.url.includes('/admin') && !entry.url.includes('/next/')));
});
test('all seven service practices have individual search metadata', () => {
  const { serviceSeo } = load('src/lib/service-seo.ts');
  const { services } = load('src/lib/services.ts');
  assert.equal(services.length, 7);
  for (const service of services) {
    assert.ok(serviceSeo[service.slug], service.slug);
    assert.ok(serviceSeo[service.slug].description.length <= 160);
  }
});
