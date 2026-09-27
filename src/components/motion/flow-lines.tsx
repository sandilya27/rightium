"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's signature: a field of thin lines flowing left to right,
 * woven like a current. Drawn to a canvas rather than built from DOM
 * nodes — thirty-four animated elements would cost thirty-four layers,
 * and this is one.
 *
 * The field tilts and widens toward the pointer, which is what makes
 * it read as a surface rather than a looping GIF. Under reduced motion
 * it draws a single static frame: the composition survives, the
 * movement does not.
 */
export function FlowLines({
  count = 34,
  className,
  style,
}: {
  count?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const host = canvas.parentElement ?? canvas;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    // Current and target pointer position, normalised. The gap between
    // them is what produces the lag that reads as weight.
    let mx = 0.5;
    let my = 0.5;
    let tmx = 0.5;
    let tmy = 0.5;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(0,168,182,0)");
      grad.addColorStop(0.28, "rgba(0,168,182,0.55)");
      grad.addColorStop(0.75, "rgba(0,168,182,0.9)");
      grad.addColorStop(1, "rgba(0,168,182,0.15)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;

      const tilt = (my - 0.5) * 0.35;

      for (let i = 0; i < count; i++) {
        const f = i / (count - 1);
        const y0 = h * (0.12 + 0.76 * f);
        const amp = 22 + 48 * Math.sin(f * Math.PI) + (mx - 0.5) * 40;
        ctx.beginPath();
        ctx.globalAlpha = 0.35 + 0.65 * Math.sin(f * Math.PI);
        for (let x = -20; x <= w + 20; x += 6) {
          const nx = x / w;
          const y =
            y0 +
            Math.sin(nx * 5.2 + t * 0.55 + i * 0.21) * amp * 0.55 +
            Math.sin(nx * 2.1 - t * 0.32 + i * 0.09) * amp +
            Math.cos(nx * 9.5 + t * 0.2 + i * 0.4) * 6 +
            (nx - 0.5) * h * tilt * (0.3 + f);
          if (x < 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      t += 0.016;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tmx = (e.clientX - r.left) / r.width;
      tmy = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => {
      tmx = 0.5;
      tmy = 0.5;
    };

    resize();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    if (calm) draw();
    else loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}

/** Mask presets for the two places the field is used. */
export const flowMask = {
  /** Home hero: fades in from the left and top/bottom. */
  hero: {
    WebkitMaskImage:
      "linear-gradient(to right,transparent 0%,#000 35%,#000 100%),linear-gradient(to bottom,transparent 0%,#000 15%,#000 85%,transparent 100%)",
    WebkitMaskComposite: "source-in",
    maskImage:
      "linear-gradient(to right,transparent 0%,#000 35%,#000 100%),linear-gradient(to bottom,transparent 0%,#000 15%,#000 85%,transparent 100%)",
    maskComposite: "intersect",
  } as React.CSSProperties,
  /** Interior page heroes: a single left-to-right fade. */
  page: {
    WebkitMaskImage: "linear-gradient(to right,transparent 30%,#000 60%)",
    maskImage: "linear-gradient(to right,transparent 30%,#000 60%)",
  } as React.CSSProperties,
};
