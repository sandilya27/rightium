"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";

/**
 * Route transition.
 *
 * `template.tsx` remounts on every navigation, so this runs as an enter
 * animation only — no exit, which keeps navigation instant rather than
 * holding the user on the old page while something plays out.
 *
 * Short and small on purpose: a page change is seen dozens of times in
 * a session, so it gets a 380ms fade and 10px of travel, not a wipe.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        transform: reduce ? "none" : "translate3d(0, 10px, 0)",
      }}
      animate={{ opacity: 1, transform: "translate3d(0, 0px, 0)" }}
      transition={{ duration: reduce ? 0.2 : 0.38, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
