const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/app/api/contact/route.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;

function route({ cmsEnabled = true, initFails = false, saveFails = false } = {}) {
  const exports = {};
  let saved;
  vm.runInNewContext(source, {
    exports, Response,
    console: { error() {}, info() {} },
    process: { env: {} },
    require(name) {
      if (name === 'payload') return { getPayload: async () => {
        if (initFails) throw new Error('Database offline');
        return { create: async ({ data }) => {
          if (saveFails) throw new Error('Write failed');
          saved = data;
          return { id: 1 };
        } };
      } };
      if (name === '@payload-config') return { default: {} };
      if (name === '@/lib/cms') return { cmsEnabled };
      if (name === '@/lib/site') return { site: { email: 'contact@example.invalid' } };
      throw new Error(name);
    },
  });
  return { post: exports.POST, get saved() { return saved; } };
}
const valid = { name: 'CMS test', email: 'test@example.invalid', message: 'An enquiry with enough detail to validate.' };
const request = body => new Request('http://localhost/api/contact', { method: 'POST',
  headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('rejects null and array JSON with a validation response', async () => {
  const r = route();
  for (const body of [null, []]) assert.equal((await r.post(request(body))).status, 400);
});
test('stored enquiries succeed with email disabled', async () => {
  const r = route();
  assert.equal((await r.post(request(valid))).status, 200);
  assert.equal(r.saved.message, valid.message);
});
test('database initialization or write failure cannot silently lose enquiries', async () => {
  for (const options of [{ initFails: true }, { saveFails: true }]) {
    const response = await route(options).post(request(valid));
    assert.equal(response.status, 500);
    assert.equal((await response.json()).ok, false);
  }
});
test('preview mode without email cannot claim delivery', async () => {
  const response = await route({ cmsEnabled: false }).post(request(valid));
  assert.equal(response.status, 502);
});
