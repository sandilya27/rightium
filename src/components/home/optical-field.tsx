"use client";

import { useEffect, useRef } from "react";

/** Optical wavefronts give the invention a shared environment, rather than a flat backdrop. */
export function OpticalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest("section");
    const context = canvas?.getContext("2d");
    if (!canvas || !section || !context) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let visible = true;
    let frame = 0;
    let time = 0;
    let last = 0;
    const target = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      const cx = width * 0.77 + pointer.x * 38;
      const cy = height * 0.4 + pointer.y * 28;
      const radius = Math.max(width * 0.43, height * 0.49);
      const glow = context.createRadialGradient(cx, cy, 0, cx, cy, radius);
      glow.addColorStop(0, "rgba(0,168,182,0.27)");
      glow.addColorStop(0.48, "rgba(0,168,182,0.09)");
      glow.addColorStop(1, "rgba(0,168,182,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      // A second, shallow wavefront carries the optical surface behind the header.
      const headerLight = context.createRadialGradient(width * 0.32, 0, 0, width * 0.32, 0, width * 0.58);
      headerLight.addColorStop(0, "rgba(0,168,182,0.2)");
      headerLight.addColorStop(0.6, "rgba(0,168,182,0.06)");
      headerLight.addColorStop(1, "rgba(0,168,182,0)");
      context.fillStyle = headerLight;
      context.fillRect(0, 0, width, height);
      for (let i = 0; i < 22; i++) {
        const drift = Math.sin(time * 0.18 + i * 0.1) * 9;
        const offset = i * 7;
        context.beginPath();
        context.moveTo(-width * 0.08, -55 + offset);
        context.bezierCurveTo(
          width * 0.18, 150 + offset * 0.28 + drift + pointer.y * 12,
          width * 0.44 + pointer.x * 24, -95 + offset * 0.3,
          width * 1.1, -100 + offset,
        );
        const headerInk = context.createLinearGradient(0, 0, width, 0);
        headerInk.addColorStop(0, "rgba(60,196,207,0.04)");
        headerInk.addColorStop(0.23, `rgba(60,196,207,${0.14 + Math.sin(i * 0.4 + time * 0.2) * 0.05})`);
        headerInk.addColorStop(0.6, "rgba(60,196,207,0.08)");
        headerInk.addColorStop(1, "rgba(60,196,207,0)");
        context.strokeStyle = headerInk;
        context.lineWidth = 0.75;
        context.stroke();
      }
      // Bent wavefronts: a continuous optical surface crossing behind the object.
      const count = width < 600 ? 34 : 58;
      for (let i = 0; i < count; i++) {
        const position = i / count;
        const offset = (position - 0.5) * height * 1.18;
        const wave = Math.sin(position * 5 + time * 0.24) * height * 0.07;
        context.beginPath();
        context.moveTo(-width * 0.12, height * 0.93 + offset * 0.3);
        context.bezierCurveTo(
          width * 0.34 + pointer.x * 20, height * 1.12 + offset * 0.8,
          width * 0.51 + pointer.x * 50, height * 0.12 + offset + wave,
          width * 1.15, height * 0.24 + offset * 0.6 + pointer.y * 30,
        );
        const highlight = Math.pow(Math.max(0, Math.sin(position * 12 - time * 0.3)), 10);
        const ink = context.createLinearGradient(0, height, width, 0);
        ink.addColorStop(0, "rgba(60,196,207,0)");
        ink.addColorStop(0.36, `rgba(0,168,182,${0.08 + highlight * 0.14})`);
        ink.addColorStop(0.7, `rgba(60,196,207,${0.16 + highlight * 0.29})`);
        ink.addColorStop(1, "rgba(60,196,207,0)");
        context.strokeStyle = ink;
        context.lineWidth = highlight > 0.7 ? 1.3 : 0.65;
        context.stroke();
      }
      // Widely spaced elliptical wavefronts imply depth around the lens assembly.
      context.save();
      context.translate(cx, cy);
      context.rotate(-0.42 + pointer.x * 0.035);
      for (let i = 0; i < 7; i++) {
        const radiusX = width * (0.16 + i * 0.055);
        context.beginPath();
        context.ellipse(0, 0, radiusX, radiusX * 0.67, 0, 0, Math.PI * 2);
        context.strokeStyle = `rgba(60,196,207,${0.13 - i * 0.013})`;
        context.lineWidth = 0.7;
        context.stroke();
      }
      context.restore();
    }

    const resize = () => {
      width = section.clientWidth;
      height = section.clientHeight;
      const ratio = Math.min(devicePixelRatio, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    const move = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = (event.clientX - rect.left) / width - 0.5;
      target.y = (event.clientY - rect.top) / height - 0.5;
    };
    const leave = () => { target.x = 0; target.y = 0; };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(section);
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden || preference.matches || now - last < 33) return;
      const dt = Math.min((now - (last || now)) / 1000, 0.1);
      last = now;
      time += dt;
      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;
      draw();
    }
    const preferenceChanged = () => { pointer.x = 0; pointer.y = 0; draw(); };
    preference.addEventListener("change", preferenceChanged);
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      preference.removeEventListener("change", preferenceChanged);
    };
  }, []);

  return <div className="optical-field" aria-hidden="true"><canvas ref={canvasRef} /><div className="optical-field-veil" /></div>;
}
