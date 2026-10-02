"use client";

import { process } from "@/lib/services";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section";
import { Tick } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Three steps with animated progress indicators and interactive hover states.
 */
export function Process() {
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

        <div className="mt-14 grid border-t border-line-strong md:mt-[72px] md:grid-cols-3">
          {process.map((p, i) => (
            <Reveal
              key={p.step}
              delay={i * 0.14}
              className={cn(
                "group relative pt-9 pr-8 pb-9 transition-colors duration-300 hover:bg-surface/50 md:pb-8",
                i < process.length - 1 && "border-b border-line-strong md:border-b-0 md:border-r",
              )}
            >
              {/* Top animated indicator accent on hover */}
              <span
                aria-hidden
                className="absolute top-[-1px] left-0 h-[2px] w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"
              />

              <span className="font-serif block text-[clamp(3rem,5vw,4.5rem)] leading-none tracking-[-0.03em] text-ink-heading transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                {p.step}
              </span>

              <h3 className="font-serif mt-7 text-[1.75rem] leading-[1.15] text-ink-heading">
                {p.title}
              </h3>

              <p className="mt-4 pr-4 text-[0.9375rem] leading-[1.65] text-ink-2">
                {p.body}
              </p>

              <ul className="mt-6 flex list-none flex-col gap-2 p-0">
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
