"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { process } from "@/lib/services";
import { SectionHeading } from "@/components/ui/section";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

const images = ["/images/strategy.jpg", "/images/analysts.jpg", "/images/data.jpg"];
const outcomes = [
  ["Written scope", "Fixed fee", "Agreed deadline"],
  ["Domain-matched analyst", "Adversarial second review", "Mid-point checkpoint"],
  ["Report + raw data", "Full search log", "Free in-scope revisions"],
];

/**
 * Stacking cards. Each step is sticky at a slightly lower offset than
 * the one before, so they pile up like a deck. As a card gets covered
 * it shrinks and dims — scroll position drives it directly, so the
 * deck always matches where the reader is.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative bg-paper py-24 md:py-36">
      <div className="shell">
        <SectionHeading
          align="split"
          eyebrow="How it works"
          title="Three steps. No open-ended retainers."
          lede="You will always know what the question is, who is answering it, and when it lands."
          action={
            <ButtonLink href="/contact" variant="primary">
              Start a brief
              <ArrowRight />
            </ButtonLink>
          }
        />

        <div ref={ref} className="relative mt-16 md:mt-20">
          {process.map((step, i) => (
            <Card
              key={step.step}
              step={step}
              index={i}
              total={process.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof process)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  // Card i starts shrinking once the deck has moved past it.
  const start = index / total;
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - index) * 0.18]);

  return (
    <div
      className="sticky h-[80vh] max-h-[40rem] min-h-[34rem]"
      style={{ top: `calc(var(--nav-h) + 1.5rem + ${index * 28}px)` }}
    >
      <motion.article
        style={reduce ? undefined : { scale }}
        className="grain relative isolate grid h-[calc(100%-2rem)] origin-top overflow-hidden rounded-block bg-gradient-deep text-white shadow-[0_-20px_60px_-30px_rgba(11,6,48,0.5)] md:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="relative z-10 flex flex-col p-8 md:p-12">
          <div className="flex items-center gap-4">
            <span className="font-display text-[4.5rem] leading-none tracking-[-0.06em] text-gradient md:text-[6rem]">
              {step.step}
            </span>
            <span className="h-px flex-1 bg-white/15" />
            <span className="eyebrow text-white/45">
              Step {index + 1} of {total}
            </span>
          </div>

          <h3 className="font-display display-md mt-auto pt-8 text-balance">{step.title}</h3>
          <p className="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-[var(--deep-ink-2)] md:text-[1.0625rem]">
            {step.body}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {outcomes[index].map((o) => (
              <li
                key={o}
                className="rounded-pill border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-[0.8125rem] text-white/80"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div className="duotone relative hidden md:block">
          <Image
            src={images[index]}
            alt=""
            fill
            sizes="40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0b0630] via-transparent to-transparent" />
        </div>

        {/* Dims as later cards stack over it. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-black"
          style={{ opacity: reduce ? 0 : dim }}
        />
      </motion.article>
    </div>
  );
}
