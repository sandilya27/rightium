"use client";

import { useEffect, useRef, useState } from "react";
import type { BufferGeometry, NormalBufferAttributes } from "three";

/** A conceptual optical assembly, not a representation of a client's invention. */
export function InventionScene() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

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
      const teal = new THREE.MeshStandardMaterial({ color: 0x00a8b6, metalness: 0.72, roughness: 0.19 });
      const light = new THREE.MeshStandardMaterial({ color: 0x3cc4cf, emissive: 0x00a8b6, emissiveIntensity: 2, metalness: 0.3, roughness: 0.2 });
      const glass = new THREE.MeshPhysicalMaterial({ color: 0x158b9c, metalness: 0.35, roughness: 0.08, clearcoat: 1, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
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
      const rim = new THREE.PointLight(0x00a8b6, 24, 12);
      rim.position.set(0, 0, -3);
      scene.add(rim);

      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
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
      const pointer = { x: 0, y: 0 };
      const move = (event: PointerEvent) => {
        const box = element.getBoundingClientRect();
        pointer.x = Math.max(-0.5, Math.min(0.5, (event.clientX - box.left) / box.width - 0.5));
        pointer.y = Math.max(-0.5, Math.min(0.5, (event.clientY - box.top) / box.height - 0.5));
      };
      const leave = () => { pointer.x = 0; pointer.y = 0; };
      const interactionSurface = element.closest("section") ?? element;
      interactionSurface.addEventListener("pointermove", move as EventListener);
      interactionSurface.addEventListener("pointerleave", leave);
      let visible = true;
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      observer.observe(element);
      let frame = 0;
      let elapsed = 0;
      let last = performance.now();
      let spread = reducedMotion ? 1 : 0;
      let firstFrame = true;
      function render(now: number) {
        if (disposed) return;
        frame = requestAnimationFrame(render);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!visible || document.hidden) return;
        const animate = !reducedMotion;
        if (animate) elapsed += dt;
        const target = 1;
        spread = reducedMotion ? target : spread + (target - spread) * (1 - Math.exp(-dt * 2.4));
        layers.forEach((layer, index) => {
          layer.position.y = (index - 2) * (0.34 + spread * 0.9);
        });
        const targetY = -0.22 + elapsed * 0.12 + (animate ? pointer.x * 1.4 : 0);
        const targetX = 0.12 + (animate ? pointer.y * 0.65 : 0);
        assembly.rotation.y += (targetY - assembly.rotation.y) * (1 - Math.exp(-dt * 4));
        assembly.rotation.x += (targetX - assembly.rotation.x) * (1 - Math.exp(-dt * 4));
        const targetZ = -0.34 + (animate ? pointer.x * 0.18 : 0);
        assembly.rotation.z += (targetZ - assembly.rotation.z) * (1 - Math.exp(-dt * 4));
        assembly.position.y = animate ? Math.sin(elapsed * 0.65) * 0.055 : 0;
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
        interactionSurface.removeEventListener("pointermove", move as EventListener);
        interactionSurface.removeEventListener("pointerleave", leave);
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
      <div className="invention-stage" ref={host} role="img" aria-label="Conceptual optical invention: five precision-engineered layers suspended in an exploded assembly">
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
