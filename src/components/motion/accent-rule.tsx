"use client";

import { motion, useReducedMotion } from "motion/react";

export function AccentRule() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className="absolute -top-px left-0 h-[2px] w-full origin-left bg-accent-bright"
      initial={{ transform: reduce ? "scaleX(1)" : "scaleX(0)" }}
      whileInView={{ transform: "scaleX(1)" }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
    />
  );
}
