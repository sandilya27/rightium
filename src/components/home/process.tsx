"use client";

import { process } from "@/lib/services";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section";
import { Tick } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";

/**
 * Three steps with animated progress indicators and interactive hover states.
 */
export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 85%", "end 62%"],
  });

  return (
    <section className="bg-paper py-24 md:py-[130px]">
      <div className="shell">
        <SectionHead
          layout="split"
          eyebrow="How it works"
          title="Three steps. No open-ended retainers."
          action={
            <p className="lede m-0 max-w-[36ch]">
              You will always know what the question is, who is answering it, and
              when it lands.
            </p>
          }
        />

        <div ref={stepsRef} className="relative mt-14 grid md:mt-[72px] md:grid-cols-3">
          <div aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-line-strong md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto">
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-accent md:hidden"
              style={{ scaleY: scrollYProgress }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 hidden h-px w-full origin-left bg-accent md:block"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          {process.map((p, i) => (
            <Reveal
              key={p.step}
              delay={i * 0.14}
              className={cn(
                "group relative py-8 pl-8 pr-4 transition-colors duration-300 hover:bg-surface/60 sm:pl-10 sm:pr-8 md:min-h-[27rem] md:border-r md:px-8 md:pt-12 md:pb-8 first:md:pl-0 last:md:border-r-0 last:md:pr-0",
              )}
            >
              <span
                aria-hidden
                className="absolute top-8 left-[7px] z-[1] size-4 -translate-x-1/2 border-2 border-accent bg-paper transition-[background-color,transform] duration-300 group-hover:scale-125 group-hover:bg-accent md:top-0 md:left-0"
              />

              <span className="font-serif block text-[clamp(2.75rem,5vw,4.5rem)] leading-none tracking-[-0.03em] text-ink-heading transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-accent">
                {p.step}
              </span>

              <h3 className="font-serif mt-6 text-[1.65rem] leading-[1.15] text-ink-heading transition-colors duration-300 group-hover:text-accent md:mt-7 md:text-[1.75rem]">
                {p.title}
              </h3>

              <p className="mt-4 pr-4 text-[0.9375rem] leading-[1.65] text-ink-2">
                {p.body}
              </p>

              <ul className="mt-6 flex list-none flex-col gap-2.5 border-t border-line pt-5 p-0">
                {p.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-center gap-2.5 text-[0.84375rem] text-ink-heading"
                  >
                    <Tick className="size-[14px]" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
