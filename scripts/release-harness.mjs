import http from 'node:http';

// Local-only, disposable QA proxy. No POST can reach the application.
const upstream = process.env.RELEASE_UPSTREAM || 'http://127.0.0.1:3111';
function instrument() {
  const state = { lcp: null, cls: 0, events: [], draws: 0, requests: 0, outcome: 'failure' };
  const params = new URLSearchParams(location.search);
  const observe = (type, callback, extra = {}) => {
    try { new PerformanceObserver(list => list.getEntries().forEach(callback)).observe({ type, buffered: true, ...extra }); } catch { /* Unsupported browser metric. */ }
  };
  observe('largest-contentful-paint', entry => { state.lcp = entry.startTime; });
  observe('layout-shift', entry => { if (!entry.hadRecentInput) state.cls += entry.value; });
  observe('event', entry => { if (entry.interactionId) state.events.push({ name: entry.name, duration: entry.duration }); }, { durationThreshold: 16 });
  if (params.has('qa-no-webgl')) {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      if (kind === 'webgl' || kind === 'webgl2' || kind === 'experimental-webgl') return null;
      return original.call(this, kind, ...args);
    };
  }
  for (const Constructor of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
    if (!Constructor) continue;
    const original = Constructor.prototype.drawElements;
    Constructor.prototype.drawElements = function (...args) { state.draws++; return original.apply(this, args); };
  }
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, options) => {
    const path = typeof input === 'string' ? input : input.url;
    if (path === '/api/contact' || path?.endsWith('/api/contact')) {
      state.requests++;
      await new Promise(resolve => setTimeout(resolve, 300));
      return new Response(JSON.stringify(state.outcome === 'success' ? { ok: true } : { error: 'QA harness: delivery failed. Please retry.' }), { status: state.outcome === 'success' ? 200 : 500, headers: { 'content-type': 'application/json' } });
    }
    return originalFetch(input, options);
  };
  document.addEventListener('DOMContentLoaded', () => {
    const panel = document.createElement('aside');
    panel.id = 'release-qa'; panel.setAttribute('aria-label', 'Local QA harness');
    panel.style.cssText = 'position:fixed;bottom:0;right:0;z-index:9999;background:white;color:black;padding:4px;font:12px sans-serif';
    for (const outcome of ['failure', 'success']) {
      const button = document.createElement('button'); button.textContent = `QA ${outcome}`;
      button.onclick = () => { state.outcome = outcome; }; panel.append(button);
    }
    const loss = document.createElement('button'); loss.textContent = 'QA lose WebGL';
    loss.onclick = () => document.querySelectorAll('canvas').forEach(canvas => canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true })));
    panel.append(loss);
    const metrics = document.createElement('output'); metrics.id = 'release-metrics'; metrics.hidden = true; panel.append(metrics); document.body.append(panel);
    setInterval(() => { metrics.textContent = JSON.stringify({ ...state, canvas: document.querySelectorAll('canvas').length, hidden: document.hidden }); }, 250);
  });
}
const injected = `<script>(${instrument.toString()})()</script>`;
http.createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405); response.end('QA proxy blocks mutations'); return; }
  try {
    const result = await fetch(new URL(request.url, upstream), { redirect: 'manual' });
    const headers = Object.fromEntries(result.headers);
    for (const key of ['content-length', 'content-encoding', 'transfer-encoding', 'connection']) delete headers[key];
    headers['cache-control'] = 'no-store';
    const bytes = Buffer.from(await result.arrayBuffer());
    response.writeHead(result.status, headers);
    response.end(headers['content-type']?.includes('text/html') ? bytes.toString().replace('<head>', '<head>' + injected) : bytes);
  } catch { response.writeHead(502); response.end('QA upstream unavailable'); }
}).listen(3112, '127.0.0.1', () => console.log('Read-only QA harness: http://127.0.0.1:3112'));
