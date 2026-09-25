"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { Eyebrow } from "@/components/ui/section";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

/**
 * Closing call to action. The panel opens out from an inset card to
 * nearly full width as it scrolls into view, with the photo behind it
 * zooming back to rest — the page "arrives" at the ask.
 */
export function CTA({
  title = "Tell us the question. We'll tell you what it takes to answer it.",
  lede = "Send a brief, or book twenty minutes. You get a scope, a price and a date — usually the same working day.",
}: {
  title?: string;
  lede?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const inset = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v * 1.2}% ${v}% ${v * 1.2}% round 36px)`);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <section ref={ref} className="bg-paper px-[var(--gutter)] py-6">
      <motion.div
        style={reduce ? { clipPath: "inset(0 round 36px)" } : { clipPath }}
        className="grain relative isolate mx-auto max-w-[88rem] overflow-hidden bg-deep text-white"
      >
        <motion.div
          aria-hidden
          className="duotone absolute inset-0"
          style={reduce ? undefined : { scale: imgScale }}
        >
          <Image src="/images/agreement.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_100%,rgba(58,31,214,0.55),transparent_70%),linear-gradient(180deg,rgba(2,1,8,0.82),rgba(11,6,48,0.72))]"
        />

        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
          <Reveal y={10}>
            <Eyebrow invert>Next step</Eyebrow>
          </Reveal>

          <h2 className="font-display display-lg mt-6 text-balance">
            <SplitText text={title} />
          </h2>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-[var(--deep-ink-2)]">
              {lede}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnetic strength={0.25}>
                <ButtonLink href="/contact" size="lg" variant="invert">
                  Request a quote
                  <ArrowRight />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={`mailto:${site.email}`} size="lg" variant="glass-dark">
                {site.email}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
