"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Magnetic pull toward the cursor.
 *
 * Decorative, so it gets a spring: tying the transform straight to the
 * pointer feels synthetic because it has no momentum. The spring gives
 * it weight and, more importantly, makes leaving the element settle
 * instead of snap.
 *
 * Gated to fine pointers — a touch device would fire this on tap.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const config = { stiffness: 220, damping: 18, mass: 0.6 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);
  const transform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0)`;

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ transform, display: "inline-block" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
