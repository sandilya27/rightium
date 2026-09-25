"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { proofs } from "@/lib/services";
import { SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Case studies as an expanding gallery.
 *
 * Desktop: four photo panels side by side; the active one widens and
 * opens its story, the rest collapse to a vertical label. Hover, focus
 * and click all activate a panel, so it works by keyboard too.
 * Flex-grow is animated by the browser (layout, but four elements and
 * no text reflow inside collapsed panels, so it holds 60fps).
 *
 * Mobile: plain stacked cards with the story always visible.
 */
export function Proof() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="grain relative isolate overflow-hidden bg-deep py-24 text-white md:py-36">
      <div aria-hidden className="mesh opacity-50">
        <span />
        <span />
        <span />
      </div>

      <div className="shell relative">
        <SectionHeading
          align="split"
          invert
          eyebrow="Selected work"
          title="Outcomes, not adjectives."
          lede="Client names are confidential; the mechanics are not. Each started as one question with a deadline attached."
        />

        {/* Desktop gallery */}
        <Reveal delay={0.1} className="mt-16 hidden h-[36rem] gap-3 lg:flex">
          {proofs.map((p, i) => {
            const open = active === i;
            return (
              <button
                key={p.title}
                type="button"
                data-cursor="link"
                aria-expanded={open}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "duotone group/panel relative min-w-0 overflow-hidden rounded-block text-left",
                  "transition-[flex-grow] duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                  open ? "grow-[5]" : "grow",
                )}
                style={{ flexBasis: 0 }}
              >
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="60vw"
                  className={cn(
                    "object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                    open ? "scale-100" : "scale-125",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 z-[2] transition-opacity duration-700",
                    open
                      ? "bg-gradient-to-t from-deep via-deep/40 to-transparent opacity-100"
                      : "bg-deep/70",
                  )}
                />

                {/* Collapsed label */}
                <span
                  className={cn(
                    "absolute top-1/2 left-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap transition-opacity duration-300",
                    "eyebrow text-white/80",
                    open ? "opacity-0" : "opacity-100 delay-300",
                  )}
                >
                  {p.sector}
                </span>

                <AnimatePresence>
                  {open && (
                    <motion.span
                      key="story"
                      className="absolute inset-x-0 bottom-0 z-[3] grid grid-cols-[1fr_auto] items-end gap-10 p-10"
                      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.6, delay: reduce ? 0 : 0.25, ease: EASE_OUT }}
                    >
                      <span className="block min-w-[26rem]">
                        <span className="rounded-pill border border-white/20 bg-white/10 px-3 py-1 text-[0.75rem] backdrop-blur-md">
                          {p.sector}
                        </span>
                        <span className="font-display mt-5 block max-w-[22ch] text-[1.9rem] leading-[1.1] tracking-[-0.03em]">
                          {p.title}
                        </span>
                        <span className="block mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-white/70">
                          {p.body}
                        </span>
                      </span>
                      <span className="block text-right">
                        <span className="block font-display text-[4rem] leading-none tracking-[-0.05em] text-gradient">
                          {p.metric}
                        </span>
                        <span className="block mt-2 text-[0.8125rem] text-white/60">{p.metricLabel}</span>
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </Reveal>

        {/* Mobile stack */}
        <div className="mt-12 grid gap-4 lg:hidden">
          {proofs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="overflow-hidden rounded-card border border-white/10 bg-white/[0.04]">
                <div className="duotone relative aspect-[16/9]">
                  <Image src={p.image} alt="" fill sizes="100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="eyebrow text-white/55">{p.sector}</span>
                    <span className="font-display text-[1.75rem] leading-none text-gradient">
                      {p.metric}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-[1.35rem] leading-snug tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/65">{p.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
