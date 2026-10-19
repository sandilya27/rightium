"use client";

import { useEffect, useRef, useState } from "react";
import type { BufferGeometry, NormalBufferAttributes } from "three";

/** A conceptual optical assembly, not a representation of a client's invention. */
export function InventionScene() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const callouts = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function initialize() {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      if (disposed || !element) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return; // The CSS assembly remains visible without WebGL.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setClearColor(0x0a1f33, 0);
      renderer.domElement.setAttribute("aria-hidden", "true");
      element.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
      camera.position.set(6, 4.6, 8.4);
      camera.lookAt(0, 0, 0);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = pmrem.fromScene(room, 0.04);
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();

      const silver = new THREE.MeshStandardMaterial({ color: 0xa6bac3, metalness: 0.96, roughness: 0.23 });
      const dark = new THREE.MeshStandardMaterial({ color: 0x142d3d, metalness: 0.87, roughness: 0.29 });
      const teal = new THREE.MeshStandardMaterial({ color: 0x49667c, metalness: 0.72, roughness: 0.19 });
      const light = new THREE.MeshStandardMaterial({ color: 0xa5d6ca, emissive: 0x49667c, emissiveIntensity: 2, metalness: 0.3, roughness: 0.2 });
      const glass = new THREE.MeshPhysicalMaterial({ color: 0x1f9a74, emissive: 0x0f6b50, emissiveIntensity: 0.6, envMapIntensity: 0.2, metalness: 0.1, roughness: 0.15, clearcoat: 0.4, toneMapped: false, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
      const materials = [silver, dark, teal, light, glass];
      const assembly = new THREE.Group();
      assembly.rotation.set(0.12, -0.22, -0.34);
      scene.add(assembly);
      const layers: InstanceType<typeof THREE.Group>[] = [];
      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
      function mesh(geometry: BufferGeometry<NormalBufferAttributes>, material: InstanceType<typeof THREE.Material>, parent: InstanceType<typeof THREE.Group>) {
        geometries.push(geometry);
        const part = new THREE.Mesh(geometry, material);
        parent.add(part);
        return part;
      }
      function ring(outer: number, inner: number, height: number, material: InstanceType<typeof THREE.Material>, parent: InstanceType<typeof THREE.Group>, y = 0) {
        const bevel = 0.035;
        const profile = [
          [inner, -height / 2 + bevel], [inner + bevel, -height / 2],
          [outer - bevel, -height / 2], [outer, -height / 2 + bevel],
          [outer, height / 2 - bevel], [outer - bevel, height / 2],
          [inner + bevel, height / 2], [inner, height / 2 - bevel],
          [inner, -height / 2 + bevel],
        ].map(([x, z]) => new THREE.Vector2(x, z));
        const part = mesh(new THREE.LatheGeometry(profile, 96), material, parent);
        part.position.y = y;
        return part;
      }
      for (let i = 0; i < 5; i++) {
        const group = new THREE.Group();
        layers.push(group);
        assembly.add(group);
      }
      // Precision-machined upper housing with recessed fasteners.
      ring(1.66, 1.09, 0.28, silver, layers[4]);
      ring(1.67, 1.57, 0.055, dark, layers[4], -0.1);
      ring(1.15, 1.08, 0.08, light, layers[4], 0.14);
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4;
        const screw = mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.025, 6), dark, layers[4]);
        screw.position.set(Math.cos(a) * 1.4, 0.15, Math.sin(a) * 1.4);
      }
      // A radial iris: each overlapping blade is separately modelled.
      ring(1.48, 1.29, 0.1, dark, layers[3]);
      ring(1.5, 1.46, 0.045, teal, layers[3], 0.065);
      for (let i = 0; i < 18; i++) {
        const a = i * Math.PI / 9;
        const blade = mesh(new THREE.BoxGeometry(0.72, 0.035, 0.23), silver, layers[3]);
        blade.position.set(Math.cos(a) * 0.95, 0, Math.sin(a) * 0.95);
        blade.rotation.y = -a + 0.48;
      }
      // Suspended optical element.
      const lens = mesh(new THREE.SphereGeometry(1.08, 64, 32), glass, layers[2]);
      lens.scale.y = 0.14;
      ring(1.13, 1.06, 0.12, teal, layers[2]);
      ring(1.15, 1.1, 0.04, light, layers[2], -0.07);
      // Finned heat sink and base housing.
      ring(1.51, 0.93, 0.26, dark, layers[1]);
      for (let i = 0; i < 56; i++) {
        const a = i * Math.PI * 2 / 56;
        const fin = mesh(new THREE.BoxGeometry(0.26, 0.28, 0.035), silver, layers[1]);
        fin.position.set(Math.cos(a) * 1.48, 0, Math.sin(a) * 1.48);
        fin.rotation.y = -a;
      }
      ring(1.68, 0.85, 0.3, silver, layers[0]);
      ring(1.7, 1.62, 0.06, teal, layers[0], 0.16);
      ring(1.63, 1.49, 0.05, dark, layers[0], -0.16);
      const fill = new THREE.DirectionalLight(0x8ce5ef, 5);
      fill.position.set(-4, 3, -2);
      scene.add(fill);
      const key = new THREE.DirectionalLight(0xffffff, 4);
      key.position.set(3, 6, 5);
      scene.add(key);
      const rim = new THREE.PointLight(0xa5d6ca, 24, 12);
      rim.position.set(0, 0, -3);
      scene.add(rim);

      let labelLeft = 40;
      let labelRight = 900;
      const resize = () => {
        const { width, height, left, right } = element.getBoundingClientRect();
        // The oversized stage extends past the hero. Keep annotations inside
        // its intersection with the viewport, rather than the canvas bounds.
        labelLeft = Math.max(32, (24 - left) / Math.max(width, 1) * 1000);
        labelRight = Math.min(968, (Math.min(right, document.documentElement.clientWidth) - 24 - left) / Math.max(width, 1) * 1000);
        renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(element);
      resize();
      const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
      let reducedMotion = motionPreference.matches;
      const preferenceChanged = () => { reducedMotion = motionPreference.matches; };
      motionPreference.addEventListener("change", preferenceChanged);
      const anchor = new THREE.Vector3();
      const calloutNodes = callouts.current?.querySelectorAll<SVGGElement>("g[data-layer]");
      let visible = true;
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      observer.observe(element);
      let frame = 0;
      let elapsed = 0;
      let last = performance.now();
      let firstFrame = true;
      const ease = (value: number) => {
        const t = Math.max(0, Math.min(1, value));
        return t * t * t * (t * (t * 6 - 15) + 10);
      };
      function render(now: number) {
        if (disposed) return;
        frame = requestAnimationFrame(render);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!visible || document.hidden) return;
        const animate = !reducedMotion;
        if (animate) elapsed += dt;
        // Exploded spin → horizontal assembly → upright separation → annotation hold.
        // Whole turns reset to the same pose, so the clock wraps without a jump.
        const phase = elapsed % 16;
        const spin = ease((phase - 0.4) / 1.7) * Math.PI * 2;
        const horizontal = ease((phase - 2.3) / 2) * (1 - ease((phase - 6) / 2));
        layers.forEach((layer, index) => {
          const delay = Math.abs(index - 2) * 0.14;
          const spread = reducedMotion ? 1
            : 1 - ease((phase - 2.4 - delay) / 1.6)
              * (1 - ease((phase - 7 - delay) / 1.8));
          layer.position.y = (index - 2) * (0.34 + spread * 0.9);
          layer.rotation.y = (index - 2) * spread * 0.12;
        });
        assembly.rotation.set(0.12, -0.22 + (reducedMotion ? 0 : spin), reducedMotion ? -0.12 : -0.12 - horizontal * Math.PI / 2);
        assembly.position.y = 0;
        assembly.updateMatrixWorld(true);
        calloutNodes?.forEach((node) => {
          const index = Number(node.dataset.layer);
          const opacity = reducedMotion ? 1
            : ease((phase - 9.2 - (4 - index) * 0.14) / 0.5) * (1 - ease((phase - 15) / 0.6));
          node.style.opacity = String(opacity);
          // Project the actual layer rim so leaders remain attached on resize.
          anchor.set(index % 2 ? -1.25 : 1.25, 0, 0);
          layers[index].localToWorld(anchor);
          anchor.project(camera);
          const x = (anchor.x + 1) * 500;
          const y = (1 - anchor.y) * 500;
          const left = index % 2 === 1;
          const endX = left ? labelLeft : labelRight;
          const elbowX = left ? endX + 70 : endX - 70;
          node.querySelector("polyline")?.setAttribute("points", `${x},${y} ${elbowX},${y} ${endX},${y}`);
          node.querySelector("circle")?.setAttribute("cx", String(x));
          node.querySelector("circle")?.setAttribute("cy", String(y));
          const text = node.querySelector("text");
          text?.setAttribute("x", String(endX));
          text?.setAttribute("y", String(y - 14));
          text?.setAttribute("text-anchor", left ? "start" : "end");
        });
        renderer.render(scene, camera);
        if (firstFrame) { firstFrame = false; setReady(true); }
      }
      frame = requestAnimationFrame(render);
      const lost = (event: Event) => { event.preventDefault(); setReady(false); cancelAnimationFrame(frame); };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resizeObserver.disconnect();
        motionPreference.removeEventListener("change", preferenceChanged);
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
        environment.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }
    initialize().catch(() => { /* Progressive enhancement: retain the static assembly. */ });
    return () => { disposed = true; cleanup?.(); };
  }, []);

  return (
    <div className="invention" data-ready={ready}>
      <div className="invention-stage" ref={host} role="img" aria-label="Conceptual assembly representing Rightium's patent search, IP intelligence, prosecution, licensing and IP consulting services">
        <svg ref={callouts} className="invention-callouts" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          {["IP Consulting", "Licensing", "Patent Prosecution", "IP Intelligence", "Patent Search"].map((label, index) => (
            <g key={label} data-layer={index} opacity="0">
              <polyline fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <circle r="4" fill="currentColor" />
              <text fill="currentColor">{label}</text>
            </g>
          ))}
        </svg>
        <div className="invention-fallback" aria-hidden="true">
          <div className="fallback-assembly">
            <div className="fallback-ring fallback-ring-top" />
            <div className="fallback-ring fallback-ring-iris" />
            <div className="fallback-ring fallback-ring-lens" />
            <div className="fallback-ring fallback-ring-fins" />
            <div className="fallback-ring fallback-ring-base" />
          </div>
        </div>
      </div>
    </div>
  );
}
