"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { quotes } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const ROTATE_MS = 7000;

/**
 * Client voices with kinetic blur cross-fades and interactive progress timer rail.
 */
export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [paused, reduce]);

  const quote = quotes[index];

  return (
    <section
      className="relative isolate overflow-hidden bg-deep-well py-24 text-white md:py-[130px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 100% 0%, rgba(0,168,182,0.14), transparent 70%)",
        }}
      />
      <div className="shell relative grid gap-12 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] md:gap-16">
        <Reveal>
          <p className="eyebrow m-0 text-accent-bright">Client voices</p>
          <p className="mt-5.5 max-w-[28ch] text-[0.90625rem] leading-[1.65] text-deep-ink-3">
            Names withheld under engagement terms. Sectors and roles are accurate.
          </p>
          <div className="mt-10 flex flex-col gap-3.5">
            {quotes.map((q, i) => {
              const on = i === index;
              return (
                <button
                  key={q.name + q.role}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative block border-l-2 border-white/15 py-3 pl-5 text-left text-sm transition-colors duration-300",
                    on ? "text-white font-medium" : "text-white/55 hover:text-white/80",
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute -left-[2px] top-0 bottom-0 w-[2px] origin-top bg-accent-bright"
                    style={{
                      transform: `scaleY(${on ? 1 : 0})`,
                      transitionProperty: "transform",
                      transitionTimingFunction: "linear",
                      transitionDuration:
                        on && !paused && !reduce ? `${ROTATE_MS}ms` : "300ms",
                    }}
                  />
                  {q.role.split(",")[0]} · {q.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="min-h-[18.75rem]">
          <span
            aria-hidden
            className="font-serif mb-6 block text-[6rem] leading-[0.6] text-accent-bright"
          >
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(6px)", y: -10 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            >
              <blockquote className="m-0 text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.25] tracking-[-0.01em] balance font-serif">
                {quote.body}
              </blockquote>
              <p className="mt-8 text-[0.9375rem]">
                <span className="font-medium text-white">{quote.name}</span>
                <span className="text-deep-ink-3"> — {quote.role}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
