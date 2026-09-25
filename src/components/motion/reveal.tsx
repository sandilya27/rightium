"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Strong ease-out. Built-in easings are too weak to read as intentional. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

type Props = {
  children: ReactNode;
  /** Seconds. Keep stagger between siblings at 0.03–0.08. */
  delay?: number;
  /** Distance travelled, px. 0 = fade only. */
  y?: number;
  duration?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section" | "article" | "p";
};

/**
 * Scroll reveal. Fires once — re-animating on scroll-back is a tax the
 * user pays every time they look for something they already read.
 * Under reduced motion it degrades to a plain fade, not to nothing.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  duration = 0.62,
  className,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const distance = reduce ? 0 : y;

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, transform: `translate3d(0, ${distance}px, 0)` }}
      whileInView={{ opacity: 1, transform: "translate3d(0, 0px, 0)" }}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{
        opacity: { duration: reduce ? 0.3 : duration, delay, ease: EASE_OUT },
        transform: { duration, delay, ease: EASE_OUT },
      }}
    >
      {children}
    </Comp>
  );
}

/**
 * Wraps a list so children reveal in sequence without each one needing
 * its own delay prop. Children must be <RevealItem>.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const distance = reduce ? 0 : y;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, transform: `translate3d(0, ${distance}px, 0)` },
        shown: {
          opacity: 1,
          transform: "translate3d(0, 0px, 0)",
          transition: { duration: 0.6, ease: EASE_OUT },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
