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
 * Scroll-scrubbed paragraph: words start dim and light up progressively
 * as the user scrolls, pacing the reading experience. Words wrapped
 * in *asterisks* illuminate with the teal accent color.
 */
export function ScrollWords({
  text,
  className,
  dim = 0.22,
}: {
  text: string;
  className?: string;
  dim?: number;
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
    <p ref={ref} className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true" className="flex flex-wrap">
        {words.map((raw, i) => {
          const accent = raw.startsWith("*");
          const word = raw.replace(/\*/g, "");
          const start = i / words.length;
          const end = Math.min(1, start + 1.2 / words.length);
          return (
            <span key={`${word}-${i}`}>
              <Word
                progress={scrollYProgress}
                range={[start, end]}
                dim={reduce ? 1 : dim}
                accent={accent}
              >
                {word}
              </Word>{" "}
            </span>
          );
        })}
      </span>
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <span aria-hidden className="relative mr-[0.28em] inline-block">
      <motion.span
        style={{ opacity, y }}
        className={cn(accent && "accent-em italic font-medium")}
      >
        {children}{" "}
      </motion.span>
    </span>
  );
}
