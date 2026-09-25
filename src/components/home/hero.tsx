"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Check } from "lucide-react";
import { clients, stats } from "@/lib/site";
import { SplitText } from "@/components/motion/split-text";
import { EASE_OUT } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Marquee } from "@/components/motion/marquee";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

/**
 * Home hero.
 *
 * Full-bleed midnight gradient with a drifting mesh, a photo collage on
 * the right and three glass "evidence" chips that float over it.
 *
 * Three layers of motion, each with its own trigger:
 *   1. Load  — headline words rise, photos wipe open, chips pop in.
 *   2. Mouse — the collage leans away from the pointer (springed, so
 *              it has weight), chips lean further for depth.
 *   3. Scroll — copy lifts and fades, collage sinks and shrinks, so
 *              leaving the hero feels like moving through it.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Pointer parallax — normalised to -0.5..0.5 across the section.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 90, damping: 20, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const backX = useTransform(sx, (v) => v * -24);
  const backY = useTransform(sy, (v) => v * -18);
  const frontX = useTransform(sx, (v) => v * 36);
  const frontY = useTransform(sy, (v) => v * 28);

  // Scroll-out.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduce ? 0 : delay, ease: EASE_OUT },
  });

  const pop = (delay: number) => ({
    initial: { opacity: 0, scale: reduce ? 1 : 0.85, y: reduce ? 0 : 14 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      type: "spring" as const,
      duration: reduce ? 0.2 : 0.9,
      bounce: 0.28,
      delay: reduce ? 0 : delay,
    },
  });

  const wipe = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0% round 28px)" },
    animate: reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0% round 28px)" },
    transition: { duration: 1.3, delay: reduce ? 0 : delay, ease: EASE_OUT },
  });

  return (
    <section
      ref={ref}
      className="grain relative isolate overflow-hidden bg-deep text-white"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {/* Atmosphere */}
      <div aria-hidden className="mesh">
        <span />
        <span />
        <span />
      </div>
      <div aria-hidden className="grid-lines" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-deep"
      />

      <div className="shell relative grid min-h-[100svh] items-center gap-14 pt-[calc(var(--nav-h)+3rem)] pb-40 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-44">
        {/* Copy */}
        <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          <motion.div
            {...rise(0.05)}
            className="inline-flex items-center gap-3 rounded-pill border border-white/12 bg-white/[0.05] py-1.5 pr-4 pl-3 backdrop-blur-md"
          >
            <span className="pulse-dot" />
            <span className="eyebrow text-white/75">
              Patent &amp; IP intelligence · 90+ jurisdictions
            </span>
          </motion.div>

          <h1 className="font-display display-2xl mt-8">
            <SplitText text="The evidence" delay={0.1} />
            <br />
            <SplitText text="behind every" delay={0.2} />
            <br />
            {/* Not SplitText: background-clip:text is lost on
                transformed children, so the gradient line moves as one. */}
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
            >
              <motion.span
                className="text-shimmer inline-block"
                initial={{ y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.95, delay: reduce ? 0 : 0.36, ease: EASE_OUT }}
              >
                IP decision.
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...rise(0.6)}
            className="mt-8 max-w-[50ch] text-[1.0625rem] leading-relaxed text-[var(--deep-ink-2)] md:text-[1.1875rem]"
          >
            Examiner-grade search, landscapes, prosecution and licensing
            support for teams whose conclusions have to survive scrutiny —
            delivered with the method, the data and a clear opinion attached.
          </motion.p>

          <motion.div {...rise(0.72)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.22}>
              <ButtonLink href="/contact" size="lg" variant="invert">
                Request a quote
                <ArrowRight />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/services" size="lg" variant="glass-dark">
              Explore services
            </ButtonLink>
          </motion.div>

          <motion.div {...rise(0.86)} className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["/images/portrait.jpg", "/images/executive.jpg", "/images/analysts.jpg"].map(
                (src) => (
                  <span
                    key={src}
                    className="duotone relative size-10 rounded-full ring-2 ring-deep"
                  >
                    <Image src={src} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                ),
              )}
            </div>
            <p className="text-[0.875rem] leading-snug text-[var(--deep-ink-2)]">
              <span className="font-semibold text-white">
                {stats[1].value}
                {stats[1].suffix} IP teams
              </span>{" "}
              trust our research
              <br />
              {stats[2].value}
              {stats[2].suffix} come back for more
            </p>
          </motion.div>
        </motion.div>

        {/* Collage */}
        <motion.div
          className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] lg:max-w-none"
          style={reduce ? undefined : { y: artY, scale: artScale }}
        >
          <motion.div className="absolute inset-0" style={{ x: backX, y: backY }}>
            <motion.div
              {...wipe(0.25)}
              className="duotone absolute top-0 right-0 h-[82%] w-[80%] rounded-[28px] shadow-[0_40px_120px_-40px_rgba(58,31,214,0.7)]"
            >
              <Image
                src="/images/executive.jpg"
                alt="An executive looking out over a city skyline"
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 80vw"
                className="object-cover object-[50%_30%]"
              />
              <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              {...wipe(0.5)}
              className="duotone absolute bottom-0 left-0 h-[44%] w-[54%] rounded-[28px] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            >
              <Image
                src="/images/analysts.jpg"
                alt="An analyst working through search results on a laptop"
                fill
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Evidence chips — front layer, lean further than the photos. */}
          <motion.div className="absolute inset-0" style={{ x: frontX, y: frontY }}>
            <motion.div {...pop(1.05)} className="absolute top-[9%] -left-2 sm:-left-8">
              <div className="float-slow rounded-2xl border border-white/15 bg-[rgba(12,8,40,0.55)] p-4 pr-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-gradient-accent">
                    <Check className="size-4" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-[0.8125rem] font-semibold">Dispositive art found</p>
                    <p className="font-mono text-[0.6875rem] text-white/55">
                      JP H10-215334 · 1998
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...pop(1.25)} className="absolute right-[-4%] bottom-[16%]">
              <div className="float-slower w-52 rounded-2xl border border-white/15 bg-[rgba(12,8,40,0.55)] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-white/60">Filing velocity</p>
                  <p className="text-[0.75rem] font-semibold text-accent-bright">+38%</p>
                </div>
                <div className="mt-3 flex h-14 items-end gap-1.5">
                  {[34, 48, 40, 62, 55, 78, 70, 96].map((h, i) => (
                    <motion.span
                      key={i}
                      className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-[#3a1fd6] to-[#a99dff]"
                      style={{ height: `${h}%` }}
                      initial={{ scaleY: reduce ? 1 : 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: reduce ? 0 : 1.45 + i * 0.06,
                        ease: EASE_OUT,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...pop(1.4)} className="absolute top-[44%] right-[-2%] hidden sm:block">
              <div className="float-slow rounded-pill border border-white/15 bg-white/10 px-4 py-2 text-[0.8125rem] backdrop-blur-xl">
                <span className="font-semibold">{stats[3].value}{stats[3].suffix}</span>{" "}
                <span className="text-white/65">typical turnaround</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Client strip */}
      <motion.div
        {...rise(1.1)}
        className="absolute inset-x-0 bottom-0 border-t border-white/[0.08] bg-deep/40 py-6 backdrop-blur-sm"
      >
        <div className="shell flex items-center gap-8">
          <p className="eyebrow hidden shrink-0 text-white/45 md:block">
            Trusted by teams at
          </p>
          <Marquee duration={36} className="min-w-0 flex-1">
            {clients.map((c) => (
              <span
                key={c}
                className="font-display mx-8 text-[1.125rem] whitespace-nowrap text-white/45 transition-colors duration-300 hover:text-white"
              >
                {c}
              </span>
            ))}
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
}
