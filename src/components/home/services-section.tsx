"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { serviceCount, services } from "@/lib/services";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { SectionHead } from "@/components/ui/section";
import { TextLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Practice index with smooth kinetic cross-fades and interactive hover states.
 */
export function ServicesSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const current = services[active];

  useEffect(() => {
    let frame = 0;
    const updateFromScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const bounds = section.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;

        const focusLine = window.innerHeight * 0.48;
        let nearest = active;
        let nearestDistance = Number.POSITIVE_INFINITY;
        itemRefs.current.forEach((item, index) => {
          if (!item) return;
          const rect = item.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const distance = Math.abs((rect.top + rect.bottom) / 2 - focusLine);
          if (distance < nearestDistance) {
            nearest = index;
            nearestDistance = distance;
          }
        });
        setActive((value) => (value === nearest ? value : nearest));
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [active]);

  return (
    <section ref={sectionRef} id="services" className="bg-surface border-t border-line py-20 md:py-[120px]">
      <div className="shell">
        <SectionHead
          layout="split"
          eyebrow="What we do"
          title={
            <>
              Seven practices.
              <br />
              One standard of evidence.
            </>
          }
          action={<TextLink href="/services">All {serviceCount} services</TextLink>}
        />

        <div className="mt-12 grid items-start gap-12 md:mt-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16">
          <Reveal>
            <ol className="m-0 list-none border-t border-line-strong p-0">
              {services.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.slug} ref={(node) => { itemRefs.current[i] = node; }} className="relative border-b border-line-strong">
                    <Link
                      href={`/services/${s.slug}`}
                      onPointerEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={cn(
                        "group relative grid grid-cols-[2.25rem_1fr_2.5rem] items-baseline gap-4 py-6 pr-2 transition-[background-color,padding] duration-300 md:grid-cols-[3.5rem_1fr_2.5rem] md:gap-5",
                        on ? "bg-white/70 pl-4 shadow-sm" : "hover:pl-2",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-y-0 left-0 w-[2px] origin-center bg-accent transition-transform duration-300",
                          on ? "scale-y-100" : "scale-y-0",
                        )}
                      />
                      <span className="font-serif text-[0.9375rem] text-accent">
                        {s.index}
                      </span>
                      <span>
                        <span
                          className={cn(
                            "font-serif block text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.15] tracking-[-0.01em] transition-colors duration-300",
                            on ? "text-accent" : "text-ink-heading group-hover:text-accent",
                          )}
                        >
                          {s.title}
                        </span>
                        <span className="mt-2 block text-[0.90625rem] leading-[1.55] text-ink-2">
                          {s.short}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-9 shrink-0 place-items-center self-center justify-self-end rounded-full border transition-all duration-300",
                          on
                            ? "-rotate-45 border-accent bg-accent text-white scale-105"
                            : "border-line-strong text-ink-heading group-hover:border-accent group-hover:text-accent",
                        )}
                      >
                        <svg viewBox="0 0 16 16" fill="none" className="size-[14px]">
                          <path
                            d="M2.5 8h11m0 0L9.25 3.75M13.5 8l-4.25 4.25"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={0.15} className="md:sticky md:top-[6.875rem]">
            <Spotlight className="border border-line bg-white shadow-xl transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="plate aspect-[4/3]">
                    <Image
                      src={current.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(6,21,36,0.9)] to-transparent to-55%" />
                    <div className="absolute inset-x-7 bottom-6 z-[2] text-white">
                      <p className="m-0 text-xs font-semibold tracking-[0.14em] uppercase text-accent-bright">
                        Practice {current.index}
                      </p>
                      <p className="font-serif mt-2 text-[1.625rem] leading-[1.1]">
                        {current.title}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 pt-6 pb-7">
                    <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-2.5 p-0 sm:grid-cols-2">
                      {current.items.map((it) => (
                        <li
                          key={it.slug}
                          className="flex items-start gap-2.5 text-sm leading-[1.45] text-ink-heading"
                        >
                          <span
                            aria-hidden
                            className="mt-[9px] h-px w-3 shrink-0 bg-accent"
                          />
                          {it.title}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5.5 flex items-center justify-between gap-4 border-t border-line pt-4.5 text-[0.84375rem] text-ink-2">
                      <span>
                        Turnaround:{" "}
                        <span className="font-medium text-ink-heading">
                          {current.turnaround}
                        </span>
                      </span>
                      <Link
                        href={`/services/${current.slug}`}
                        className="group inline-flex items-center gap-1 font-medium text-accent hover:underline"
                      >
                        View practice
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
