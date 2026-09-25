"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll-scrubbed paragraph: every word starts dim and lights up as the
 * reader scrolls past it, so the sentence is "read out" at the pace of
 * the scroll. Words wrapped in *asterisks* light up in the brand
 * gradient instead of solid ink.
 */
export function ScrollWords({
  text,
  className,
  dim = 0.14,
  invert = false,
}: {
  text: string;
  className?: string;
  dim?: number;
  invert?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  const words = text.split(" ");
  const plain = text.replace(/\*/g, "");

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)} aria-label={plain}>
      {words.map((raw, i) => {
        const accent = raw.startsWith("*");
        const word = raw.replace(/\*/g, "");
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            dim={reduce ? 1 : dim}
            accent={accent}
            invert={invert}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
  accent,
  invert,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
  accent: boolean;
  invert: boolean;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <span aria-hidden className="relative mr-[0.25em] inline-block">
      <motion.span
        style={{ opacity }}
        className={cn(
          accent && (invert ? "text-gradient" : "text-gradient-light"),
        )}
      >
        {children}
      </motion.span>
    </span>
  );
}
