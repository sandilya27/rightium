"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { EASE_OUT } from "./reveal";
import { cn } from "@/lib/utils";

/**
 * Photo that is uncovered rather than faded in: a clip-path wipes up
 * from the bottom edge while the image itself settles from 1.25x to
 * 1x, then keeps drifting with the scroll for depth.
 *
 * Always runs through the indigo duotone so mixed stock reads as one
 * shoot.
 */
export function ClipImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  soft = false,
  priority = false,
  delay = 0,
  drift = 8,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  soft?: boolean;
  priority?: boolean;
  delay?: number;
  /** % the image travels across the element's scroll range. 0 = static. */
  drift?: number;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn("duotone", soft && "duotone-soft", className)}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.15, delay, ease: EASE_OUT }}
    >
      <motion.div
        className="absolute inset-[-10%]"
        style={reduce ? undefined : { y }}
      >
        <motion.div
          className="relative size-full"
          initial={reduce ? false : { scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.6, delay, ease: EASE_OUT }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      {children}
    </motion.div>
  );
}
