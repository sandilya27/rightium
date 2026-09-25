"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked parallax.
 *
 * `speed` is the fraction of the scroll distance the layer lags by.
 * Keep it small (0.06–0.2); anything larger reads as a gimmick and
 * costs legibility on tall viewports.
 *
 * The raw scroll value is passed through a stiff spring so a trackpad
 * flick settles instead of jittering, and the result is applied as a
 * full transform string so it stays on the compositor.
 */
export function Parallax({
  children,
  speed = 0.12,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const smooth = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.4 });
  const transform = useMotionTemplate`translate3d(0, ${smooth}px, 0)`;

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ transform, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
}
