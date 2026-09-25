"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { services, serviceItems, type Service } from "@/lib/services";
import { ServiceIcon } from "@/components/services/service-icon";
import { Spotlight } from "@/components/motion/spotlight";
import { SplitText } from "@/components/motion/split-text";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";

/**
 * Services reel.
 *
 * On large screens the section pins and vertical scroll drives the
 * row of practice cards sideways. The section's height is set to the
 * track's overflow, so one pixel of scroll moves the track one pixel;
 * nothing is faster or slower than the wheel.
 *
 * Below lg (and under reduced motion) it is an ordinary grid; sideways
 * scrolling on touch fights the page.
 */
export function ServicesSection() {
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setPinned(mq.matches && !reduce);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  return (
    <section id="services" className="grain relative isolate bg-deep text-white">
      <div aria-hidden className="mesh opacity-70">
        <span />
        <span />
        <span />
      </div>
      {pinned ? <PinnedReel /> : <StackedGrid />}
    </section>
  );
}

function Intro() {
  return (
    <div>
      <Reveal y={10}>
        <Eyebrow invert>What we do</Eyebrow>
      </Reveal>
      <h2 className="font-display display-lg mt-6 text-balance">
        <SplitText text="Seven practices." />
        <br />
        <SplitText text="One standard of evidence." delay={0.12} wordClassName="text-gradient" />
      </h2>
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-[var(--deep-ink-2)]">
          Every engagement is scoped to a decision you are about to make, and
          every deliverable shows its work.
        </p>
      </Reveal>
      <Reveal delay={0.22}>
        <ButtonLink href="/services" variant="glass-dark" className="mt-8">
          All {serviceItems.length} services
          <ArrowRight />
        </ButtonLink>
      </Reveal>
    </div>
  );
}

function PinnedReel() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <div ref={outer} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max items-center gap-6 pr-[var(--gutter)] pl-[max(var(--gutter),calc((100vw-80rem)/2+var(--gutter)))]"
        >
          <div className="w-[30rem] shrink-0 pr-10">
            <Intro />
          </div>

          {services.map((s) => (
            <ServiceTile key={s.slug} service={s} />
          ))}

          <ClosingTile />
        </motion.div>

        <div className="shell mt-12 flex items-center gap-6">
          <span className="eyebrow text-white/45">Scroll</span>
          <div className="h-px flex-1 bg-white/10">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-[#8a7bff] to-[#3a1fd6]"
              style={{ scaleX: bar }}
            />
          </div>
          <span className="eyebrow text-white/45 tabular-nums">
            {String(services.length).padStart(2, "0")} practices
          </span>
        </div>
      </div>
    </div>
  );
}

function StackedGrid() {
  return (
    <div className="shell relative py-24 md:py-32">
      <Intro />
      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2" stagger={0.05}>
        {services.map((s) => (
          <RevealItem key={s.slug} className="h-full">
            <ServiceTile service={s} fluid />
          </RevealItem>
        ))}
        <RevealItem className="h-full">
          <ClosingTile fluid />
        </RevealItem>
      </RevealGroup>
    </div>
  );
}

function ServiceTile({ service, fluid = false }: { service: Service; fluid?: boolean }) {
  return (
    <Spotlight
      className={
        fluid
          ? "h-full rounded-card"
          : "h-[31rem] w-[25rem] shrink-0 rounded-card xl:w-[27rem]"
      }
    >
      <Link
        href={`/services/${service.slug}`}
        data-cursor="link"
        className="group/card relative z-10 flex h-full flex-col rounded-card border border-white/10 bg-white/[0.035] p-8 backdrop-blur-sm transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1.5 [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/25 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06]"
      >
        <div className="flex items-start justify-between">
          <span className="grid size-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#3a1fd6]/60 to-[#0b0630] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:scale-110 group-hover/card:rotate-[-6deg]">
            <ServiceIcon name={service.icon} className="size-6 text-white" />
          </span>
          <span className="font-display text-[3.25rem] leading-none tracking-[-0.05em] text-white/10 transition-colors duration-500 group-hover/card:text-white/25">
            {service.index}
          </span>
        </div>

        <h3 className="font-display mt-8 text-[1.6rem] leading-tight tracking-[-0.03em]">
          {service.title}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--deep-ink-2)]">
          {service.short}
        </p>

        <ul className="mt-6 space-y-2.5">
          {service.items.slice(0, 4).map((item) => (
            <li
              key={item.slug}
              className="flex items-center gap-3 text-[0.875rem] text-white/75"
            >
              <span className="size-1 shrink-0 rounded-full bg-accent-bright" />
              {item.title}
            </li>
          ))}
          {service.items.length > 4 && (
            <li className="pl-4 text-[0.8125rem] text-white/40">
              + {service.items.length - 4} more
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-[0.8125rem] text-white/50">{service.turnaround}</span>
          <span className="grid size-10 place-items-center rounded-full border border-white/15 transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:rotate-[-45deg] group-hover/card:border-transparent group-hover/card:bg-white group-hover/card:text-ink">
            <ArrowRight />
          </span>
        </div>
      </Link>
    </Spotlight>
  );
}

function ClosingTile({ fluid = false }: { fluid?: boolean }) {
  return (
    <Link
      href="/contact"
      data-cursor="link"
      className={
        "group/card duotone relative flex flex-col justify-end overflow-hidden rounded-card p-8 " +
        (fluid ? "min-h-[24rem]" : "h-[31rem] w-[25rem] shrink-0 xl:w-[27rem]")
      }
    >
      <Image
        src="/images/analysts.jpg"
        alt=""
        fill
        sizes="28rem"
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:scale-110"
      />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep via-deep/50 to-transparent" />
      <div className="relative z-[3]">
        <p className="font-display text-[1.75rem] leading-tight tracking-[-0.03em]">
          Not sure which one you need?
        </p>
        <p className="mt-3 text-[0.9375rem] text-[var(--deep-ink-2)]">
          Describe the decision. We&apos;ll tell you which service answers it.
        </p>
        <span className="group/btn mt-6 inline-flex items-center gap-2 rounded-pill bg-white px-5 py-3 text-[0.875rem] font-medium text-ink">
          Talk to an analyst
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
