const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, env = {}, globals = {}, mocks = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    exports, process: { env }, ...globals,
    require(name) { return name in mocks ? mocks[name] : require(name); },
  });
  return exports;
}

test('Google tag stays off development and preview and uses the provided property in production', () => {
  const component = (env) => load('src/components/site/google-analytics.tsx', env).GoogleAnalytics();
  assert.equal(component({ NODE_ENV: 'development' }), null);
  assert.equal(component({ NODE_ENV: 'production', VERCEL_ENV: 'preview' }), null);
  assert.equal(component({ NODE_ENV: 'production', NEXT_PUBLIC_GA_MEASUREMENT_ID: 'invalid' }), null);
  const script = component({ NODE_ENV: 'production' }).props.children;
  const run = (dnt) => {
    const scripts = [];
    const window = {};
    vm.runInNewContext(script, {
      window, navigator: { doNotTrack: dnt },
      document: { createElement: () => ({}), head: { appendChild: (element) => scripts.push(element) } },
    });
    return { window, scripts };
  };
  assert.equal(run('1').scripts.length, 0);
  const enabled = run('0');
  assert.equal(enabled.scripts.length, 1);
  assert.equal(enabled.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-WZKBE4WHF9');
  assert.equal(enabled.window.dataLayer[1][1], 'G-WZKBE4WHF9');
  assert.equal(enabled.window.dataLayer[1][2].allow_google_signals, false);
});

test('GA lead tracking works without PostHog and excludes enquiry properties', () => {
  const calls = [];
  const browser = { gtag: (...args) => calls.push(args) };
  const navigator = { doNotTrack: '0' };
  const { capture } = load('src/lib/analytics.ts', {}, { window: browser, navigator }, {
    'posthog-js': { __loaded: false },
  });
  capture('enquiry_submitted', { email: 'private@example.com', message: 'private brief' });
  assert.equal(calls.length, 1);
  assert.equal(calls[0][1], 'generate_lead');
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0][2])), { form_name: 'contact' });
  capture('unapproved_event', { message: 'private brief' });
  assert.equal(calls.length, 1);
  navigator.doNotTrack = '1';
  capture('enquiry_submitted');
  assert.equal(calls.length, 1);
});
