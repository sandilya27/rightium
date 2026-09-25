"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

/**
 * Trailing cursor ring.
 *
 * The native cursor stays visible — replacing it costs precision and
 * breaks text selection affordances for no real gain. This is a second
 * layer that lags slightly behind, which is what produces the sense of
 * weight, and swells over anything marked `data-cursor="link"`.
 *
 * Pointer-gated: never mounts on touch, and disabled under reduced
 * motion, where a lagging element is exactly the wrong thing.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const config = { stiffness: 380, damping: 32, mass: 0.45 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);
  const scale = useSpring(1, { stiffness: 300, damping: 24 });
  const transform = useMotionTemplate`translate3d(calc(${sx}px - 50%), calc(${sy}px - 50%), 0) scale(${scale})`;

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(fine.matches && !calm.matches);

    const sync = () => setEnabled(fine.matches && !calm.matches);
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      const hit = target?.closest?.(
        '[data-cursor="link"], a, button, input, textarea, select',
      );
      const isLink = Boolean(hit);
      setActive(isLink);
      scale.set(isLink ? 2.1 : 1);
    };

    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, visible, x, y, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden md:block"
      style={{
        transform,
        opacity: visible ? 1 : 0,
        transition: "opacity 220ms cubic-bezier(0.23,1,0.32,1)",
        willChange: "transform",
        mixBlendMode: "difference",
      }}
    >
      <div
        className="size-6 rounded-full border"
        style={{
          // Difference blend: one white ring reads as dark on paper and
          // light on the indigo sections, with no per-section logic.
          borderColor: "rgba(255,255,255,0.95)",
          backgroundColor: active ? "rgba(255,255,255,0.9)" : "transparent",
          transition:
            "border-color 240ms cubic-bezier(0.23,1,0.32,1), background-color 240ms cubic-bezier(0.23,1,0.32,1)",
        }}
      />
    </motion.div>
  );
}
