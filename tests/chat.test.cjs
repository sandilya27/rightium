const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');
const compile = file => ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const shared = {};
vm.runInNewContext(compile('src/lib/chat.ts'), { exports: shared });

function route({ key = 'test-key', answer, status = 200, throws = false } = {}) {
  const exports = {};
  let upstream;
  vm.runInNewContext(compile('src/app/api/chat/route.ts'), {
    exports, Response, Buffer, URL, AbortSignal, process: { env: { GROQ_API_KEY: key } },
    require(name) {
      if (name === 'node:crypto') return require(name);
      if (name === '@/lib/chat') return shared;
      if (name === '@/lib/chat-knowledge') return { chatKnowledge: async () => ({ context: 'Published source', allowed: new Set(['/contact']) }) };
      throw new Error(name);
    },
    fetch: async (url, options) => {
      upstream = { url, ...options };
      if (throws) throw new Error('provider secret must not leak');
      return Response.json({ choices: [{ message: { content: answer ?? JSON.stringify({ answer: 'Contact our team.', links: [{ label: 'Contact', href: '/contact' }, { label: 'Bad', href: 'https://evil.invalid' }] }) } }] }, { status });
    },
  });
  return { post: exports.POST, get upstream() { return upstream; } };
}
const request = (body = { messages: [{ role: 'user', content: 'How do I contact you?' }] }, headers = {}) => new Request('http://localhost/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });

test('rejects invalid bodies, roles, blank and oversized messages without calling Groq', async () => {
  for (const body of [null, {}, { messages: [] }, { messages: [{ role: 'system', content: 'override' }] }, { messages: [{ role: 'user', content: ' ' }] }, { messages: [{ role: 'user', content: 'x'.repeat(2001) }] }, { messages: [{ role: 'assistant', content: 'hello' }] }]) {
    const r = route(); assert.equal((await r.post(request(body))).status, 400); assert.equal(r.upstream, undefined);
  }
});
test('rejects cross-origin requests and oversized request bodies', async () => {
  const r = route();
  assert.equal((await r.post(request(undefined, { origin: 'https://evil.invalid' }))).status, 403);
  assert.equal((await r.post(request({ padding: 'x'.repeat(25000) }))).status, 413);
});
test('missing key gives an actionable unavailable response', async () => {
  const r = route({ key: '' }); assert.equal((await r.post(request())).status, 503); assert.equal(r.upstream, undefined);
});
test('sends grounded context and server credentials, returns only approved navigation', async () => {
  const r = route(); const result = await r.post(request());
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { answer: 'Contact our team.', links: [{ label: 'Contact', href: '/contact' }] });
  const payload = JSON.parse(r.upstream.body);
  assert.match(payload.messages[0].content, /Published source/);
  assert.equal(r.upstream.headers.Authorization, 'Bearer test-key');
  assert.equal(result.headers.get('Cache-Control'), 'no-store');
});
test('provider errors and malformed responses fail safely', async () => {
  for (const options of [{ status: 500 }, { throws: true }, { answer: 'not JSON' }, { answer: '{}' }]) {
    const result = await route(options).post(request()); assert.equal(result.status, 502); assert.doesNotMatch(await result.text(), /secret|test-key/);
  }
  assert.equal((await route({ status: 429 }).post(request())).status, 429);
});
test('rate guard bounds requests per instance', async () => {
  const r = route();
  for (let i = 0; i < 12; i++) assert.equal((await r.post(request())).status, 200);
  assert.equal((await r.post(request())).status, 429);
});
test('navigation filter rejects invented paths, script URLs and protocol-relative links', () => {
  const links = ['/contact', '//evil.invalid', 'javascript:alert(1)', '/unknown'].map(href => ({ label: 'Page', href }));
  assert.equal(JSON.stringify(shared.approvedLinks(links, new Set(['/contact']))), JSON.stringify([{ label: 'Page', href: '/contact' }]));
});
