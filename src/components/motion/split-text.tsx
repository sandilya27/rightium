"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "./reveal";
import { cn } from "@/lib/utils";

/**
 * Word-level mask reveal for display headings.
 *
 * Each word sits inside an overflow-hidden span and slides up from
 * behind its own baseline — the words appear to be uncovered rather
 * than to fly in, which is why this reads as typography and not as a
 * template effect.
 *
 * Accessibility: the full string is exposed to screen readers via
 * aria-label and every animated fragment is aria-hidden.
 */
export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  text: string;
  className?: string;
  /** Applied to each word. Use for gradient text: background-clip:text
      does not reach into transformed children, so it has to sit on
      the moving element itself. */
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once }}
        transition={{ duration: 0.4, delay }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ transform: "translate3d(0, 105%, 0)" }}
            whileInView={{ transform: "translate3d(0, 0%, 0)" }}
            viewport={{ once, margin: "-12% 0px" }}
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease: EASE_OUT,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
