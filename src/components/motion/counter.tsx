"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Count-up on first view.
 *
 * Rare-tier animation (seen once per session), so it earns a longer
 * duration. Eased out so the number decelerates into its final value
 * rather than stopping dead. Reduced motion prints the value.
 */
export function Counter({
  value,
  suffix = "",
  duration = 1600,
  margin = "-15% 0px",
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  margin?: "0px" | "-15% 0px";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // cubic ease-out — matches --ease-out closely enough at this scale
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {(reduce ? value : display).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
