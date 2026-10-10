const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, '../src/components/ui/pixel-blast.tsx'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
).outputText;

function harness({ reduced = false, liquid = false, autoPauseOffscreen = true } = {}) {
  const frames = new Map();
  const observers = [];
  const resources = [];
  let nextId = 1;
  let effect;
  let renders = 0;
  const events = () => ({
    listeners: new Map(),
    addEventListener(name, fn) { this.listeners.set(name, fn); },
    removeEventListener(name, fn) { if (this.listeners.get(name) === fn) this.listeners.delete(name); },
    emit(name) { this.listeners.get(name)?.(); },
  });
  const media = Object.assign(events(), { matches: reduced });
  const document = Object.assign(events(), {
    hidden: false,
    createElement() {
      return Object.assign(events(), {
        style: {}, width: 1, height: 1,
        getContext: () => ({ fillRect() {}, beginPath() {}, arc() {}, fill() {} }),
        remove() { container.children = container.children.filter(child => child !== this); },
      });
    },
  });
  const container = { clientWidth: 800, clientHeight: 600, children: [], appendChild(el) { this.children.push(el); } };
  class Resource {
    constructor() { this.disposals = 0; resources.push(this); }
    dispose() { this.disposals++; }
  }
  class Vector { set() {} }
  class Renderer extends Resource {
    constructor({ canvas }) { super(); this.domElement = canvas; }
    setPixelRatio() {} getPixelRatio() { return 1; }
    setClearAlpha() {} setClearColor() {} setSize() {}
    render() { renders++; } forceContextLoss() { this.contextLost = true; }
  }
  class Observer {
    constructor(callback) { this.callback = callback; this.disconnected = false; observers.push(this); }
    observe() {} disconnect() { this.disconnected = true; }
    intersect(value) { this.callback([{ isIntersecting: value }]); }
  }
  class Effect extends Resource {
    constructor(_name, _shader, { uniforms }) { super(); this.uniforms = uniforms; }
  }
  class EffectPass extends Resource {
    constructor(_camera, effect) { super(); this.effects = [effect]; }
    dispose() { super.dispose(); this.effects.forEach(effect => effect.dispose()); }
  }
  class Composer extends Resource {
    constructor() { super(); this.passes = []; }
    addPass(pass) { this.passes.push(pass); } setSize() {}
    render() { renders++; }
    dispose() { super.dispose(); this.passes.forEach(pass => pass.dispose()); }
  }
  const THREE = {
    WebGLRenderer: Renderer, Texture: Resource, PlaneGeometry: Resource, ShaderMaterial: Resource,
    Vector2: Vector, Color: Vector, Scene: class { add() {} }, OrthographicCamera: class {},
    Mesh: class {}, Uniform: class { constructor(value) { this.value = value; } },
  };
  const exports = {};
  vm.runInNewContext(source, {
    exports, document,
    window: { matchMedia: () => media, devicePixelRatio: 1 },
    ResizeObserver: Observer, IntersectionObserver: Observer,
    requestAnimationFrame(fn) { const id = nextId++; frames.set(id, fn); return id; },
    cancelAnimationFrame(id) { frames.delete(id); },
    require(name) {
      if (name === 'react') return { useEffect(fn) { effect = fn; }, useRef: () => ({ current: container }) };
      if (name === 'react/jsx-runtime') return { jsx() {} };
      if (name === 'three') return THREE;
      if (name === 'postprocessing') return { Effect, EffectComposer: Composer, EffectPass, RenderPass: Resource };
      throw new Error(`Unexpected module ${name}`);
    },
  });
  exports.PixelBlast({ liquid, autoPauseOffscreen });
  return {
    mount: () => effect(), frames, observers, resources, container, media, document,
    get renders() { return renders; },
    tick(timestamp) {
      const [id, fn] = frames.entries().next().value;
      frames.delete(id);
      fn(timestamp);
    },
  };
}

test('unmount cancels the latest frame and releases resources, including liquid textures', () => {
  const h = harness({ liquid: true });
  const cleanup = h.mount();
  h.observers[1].intersect(true);
  h.tick(0);
  h.tick(16);
  assert.equal(h.frames.size, 1);
  cleanup();
  assert.equal(h.frames.size, 0);
  assert.equal(h.container.children.length, 0);
  assert.ok(h.resources.every(resource => resource.disposals === 1));
  assert.ok(h.observers.every(observer => observer.disconnected));
  assert.equal(h.media.listeners.size, 0);
  assert.equal(h.document.listeners.size, 0);
  h.observers[1].intersect(true);
  assert.equal(h.frames.size, 0);
});

test('off-screen and hidden-tab transitions stop frames and resume only one loop', () => {
  const h = harness();
  const cleanup = h.mount();
  assert.equal(h.frames.size, 0);
  h.observers[1].intersect(true);
  h.tick(0);
  h.observers[1].intersect(false);
  assert.equal(h.frames.size, 0);
  h.observers[1].intersect(true);
  h.observers[1].intersect(true);
  assert.equal(h.frames.size, 1);
  h.document.hidden = true;
  h.document.emit('visibilitychange');
  assert.equal(h.frames.size, 0);
  h.document.hidden = false;
  h.document.emit('visibilitychange');
  assert.equal(h.frames.size, 1);
  cleanup();
});

test('reduced motion renders a static frame and responds to preference changes', () => {
  const h = harness({ reduced: true, autoPauseOffscreen: false });
  const cleanup = h.mount();
  assert.equal(h.renders, 1);
  assert.equal(h.frames.size, 0);
  h.media.matches = false;
  h.media.emit('change');
  assert.equal(h.frames.size, 1);
  h.tick(0);
  h.media.matches = true;
  h.media.emit('change');
  assert.equal(h.frames.size, 0);
  cleanup();
});

test('Strict Mode setup-cleanup-setup leaves exactly one canvas and animation loop', () => {
  const h = harness({ autoPauseOffscreen: false });
  h.mount()();
  const cleanup = h.mount();
  assert.equal(h.container.children.length, 1);
  assert.equal(h.frames.size, 1);
  h.tick(0);
  cleanup();
  assert.equal(h.frames.size, 0);
  assert.equal(h.container.children.length, 0);
  assert.ok(h.resources.every(resource => resource.disposals === 1));
});
