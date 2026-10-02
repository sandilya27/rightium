"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface BlurRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  highlightClass?: string;
  highlightWord?: string;
}

/**
 * Word-by-word blur-in text reveal inspired by high-end Framer/Linear interfaces.
 * Under reduced motion, it renders immediately without blur or delay.
 */
export function BlurReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  highlightWord,
  highlightClass = "accent-em-bright",
}: BlurRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => {
        const isHighlight =
          highlightWord &&
          word.toLowerCase().includes(highlightWord.toLowerCase());

        return (
          <motion.span
            key={i}
            variants={{
              hidden: {
                opacity: 0,
                filter: "blur(10px)",
                y: 12,
              },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                },
              },
            }}
            className={cn("inline-block mr-[0.26em]", isHighlight && highlightClass)}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
