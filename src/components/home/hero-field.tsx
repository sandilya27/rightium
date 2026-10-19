"use client";

import { useEffect, useRef } from "react";

/**
 * One continuous field behind the whole hero. The optical assembly is its
 * source: rings radiate from the lens across the copy, with periodic pulses.
 */
export function HeroField() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const section = element?.closest<HTMLElement>(".evidence-hero");
    const context = element?.getContext("2d");
    if (!element || !section || !context) return;
    const ctx = context;
    const host = section;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionPreference.matches;
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let maxR = 1;
    let spacing = 36;
    let copy = { left: 0, top: 0, right: 0, bottom: 0 };

    function measure() {
      const bounds = host.getBoundingClientRect();
      const stage = host.querySelector(".invention-stage")?.getBoundingClientRect();
      const text = host.querySelector(".evidence-hero-copy")?.getBoundingClientRect();
      const band = host.querySelector(".hero-counter-band")?.getBoundingClientRect();
      width = bounds.width;
      height = (band ? band.top : bounds.bottom) - bounds.top;
      const ratio = Math.min(window.devicePixelRatio, 2);
      element!.width = Math.round(width * ratio);
      element!.height = Math.round(height * ratio);
      element!.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      cx = stage ? stage.left + stage.width / 2 - bounds.left : width * 0.72;
      cy = stage ? stage.top + stage.height / 2 - bounds.top : height * 0.5;
      maxR = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy));
      spacing = width < 768 ? 28 : 36;
      host.style.setProperty("--field-x", `${cx}px`);
      host.style.setProperty("--field-y", `${cy}px`);
      copy = text
        ? { left: text.left - bounds.left - 32, top: text.top - bounds.top - 24, right: text.right - bounds.left + 32, bottom: text.bottom - bounds.top + 24 }
        : copy;
    }

    const PULSE_EVERY = 6.5;
    const PULSE_SPEED = 240;
    const falloff = (r: number) => Math.pow(Math.max(0, 1 - r / maxR), 1.15);

    function draw(t: number) {
      ctx.clearRect(0, 0, width, height);
      const drift = (t * 10) % spacing;
      // Fronts still inside the field: every pulse emitted in the last sweep.
      const fronts: number[] = [];
      const sweep = maxR / PULSE_SPEED;
      for (let k = Math.floor(t / PULSE_EVERY); k * PULSE_EVERY > t - sweep - 1; k--) {
        if (k >= 0) fronts.push((t - k * PULSE_EVERY) * PULSE_SPEED);
      }

      for (let r = drift + spacing * 2; r < maxR; r += spacing) {
        let pulse = 0;
        for (const front of fronts) pulse = Math.max(pulse, Math.exp(-(((r - front) / 70) ** 2)));
        const alpha = falloff(r) * (0.16 + pulse * 0.42);
        ctx.strokeStyle = `rgba(73, 102, 124, ${alpha})`;
        ctx.lineWidth = 1 + pulse * 0.75;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Quiet the field under the headline so it reads as texture, not noise.
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      const veil = ctx.createLinearGradient(copy.left, 0, copy.right, 0);
      veil.addColorStop(0, "rgba(0,0,0,.55)");
      veil.addColorStop(0.7, "rgba(0,0,0,.4)");
      veil.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = veil;
      ctx.fillRect(copy.left, copy.top, copy.right - copy.left, copy.bottom - copy.top);
      ctx.restore();
    }

    let elapsed = 2.4; // A pulse already mid-flight on the first frame.
    let last = performance.now();
    let frame = 0;
    let visible = true;

    function render(now: number) {
      frame = requestAnimationFrame(render);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden || reducedMotion) return;
      elapsed += dt;
      draw(elapsed);
    }

    const redraw = () => { measure(); draw(elapsed); };
    const resizeObserver = new ResizeObserver(redraw);
    resizeObserver.observe(host);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(host);
    const preferenceChanged = () => { reducedMotion = motionPreference.matches; draw(elapsed); };
    motionPreference.addEventListener("change", preferenceChanged);
    redraw();
    element.dataset.ready = "true";
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      motionPreference.removeEventListener("change", preferenceChanged);
    };
  }, []);

  return <canvas ref={canvas} className="hero-field" aria-hidden="true" />;
}
