"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ClipImage } from "@/components/motion/clip-image";
import { EASE_OUT, Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const quotes = [
  {
    body: "They found a 1998 Japanese utility model two prior searches had missed, and laid out exactly how they got there. Our outside counsel could verify it in an afternoon.",
    name: "Head of IP",
    role: "Semiconductor manufacturer, California",
  },
  {
    body: "Drafts come back in our template with tracked changes on, and the docket is always current. Our associates review instead of rewrite — that is the whole value.",
    name: "Partner",
    role: "IP law firm, London",
  },
  {
    body: "The first firm that has ever told us a project wasn't worth running. They were right, and it is why they get the work that is.",
    name: "Director of Innovation",
    role: "Energy storage, Munich",
  },
];

const DURATION = 7000;

/**
 * One quote at a time, auto-advancing. Each tab carries its own
 * progress bar so the rotation is visible rather than surprising, and
 * it pauses while the pointer is over the section or it is off screen.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % quotes.length), DURATION);
    return () => window.clearTimeout(t);
  }, [index, running]);

  const q = quotes[index];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-paper py-24 md:py-36"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <ClipImage
          src="/images/portrait.jpg"
          alt="A client in profile"
          className="aspect-[4/5] rounded-block"
          sizes="(min-width: 1024px) 34vw, 100vw"
        >
          <div className="absolute inset-x-5 bottom-5 z-[3] rounded-2xl border border-white/20 bg-[rgba(12,8,40,0.5)] p-4 text-white backdrop-blur-xl">
            <p className="text-[0.8125rem] leading-snug text-white/80">
              Names withheld under engagement terms. Sectors and roles are
              accurate.
            </p>
          </div>
        </ClipImage>

        <div>
          <Reveal y={10}>
            <Eyebrow>Client voices</Eyebrow>
          </Reveal>

          <svg viewBox="0 0 24 24" aria-hidden className="mt-10 size-12 text-accent" fill="currentColor">
            <path d="M9.6 5.4 7.9 8.9c2 .4 3.3 2 3.3 4 0 2.3-1.7 4-4 4s-4-1.8-4-4.2c0-1.3.4-2.6 1.1-4L7.2 3.4l2.4 2ZM20 5.4l-1.7 3.5c2 .4 3.3 2 3.3 4 0 2.3-1.7 4-4 4s-4-1.8-4-4.2c0-1.3.4-2.6 1.1-4l2.9-5.3 2.4 2Z" />
          </svg>

          <div className="relative mt-6 min-h-[15rem] md:min-h-[13rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: reduce ? 0 : 16, filter: reduce ? "none" : "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: reduce ? 0 : -10, filter: reduce ? "none" : "blur(4px)" }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] tracking-[-0.03em] text-ink text-balance">
                  {q.body}
                </blockquote>
                <figcaption className="mt-8">
                  <span className="block text-[0.9375rem] font-semibold">{q.name}</span>
                  <span className="block text-[0.875rem] text-ink-3">{q.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3" role="tablist" aria-label="Testimonials">
            {quotes.map((item, i) => (
              <button
                key={item.role}
                type="button"
                role="tab"
                aria-selected={i === index}
                data-cursor="link"
                onClick={() => setIndex(i)}
                className="group/tab text-left"
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-[var(--line-strong)]">
                  <span
                    key={`${index}-${running}`}
                    className={cn("block h-full origin-left rounded-full bg-gradient-accent")}
                    style={{
                      transform: i < index ? "scaleX(1)" : "scaleX(0)",
                      animation:
                        i === index
                          ? running
                            ? `tab-fill ${DURATION}ms linear forwards`
                            : "none"
                          : "none",
                      ...(i === index && !running ? { transform: "scaleX(1)" } : {}),
                    }}
                  />
                </span>
                <span
                  className={cn(
                    "mt-3 block text-[0.8125rem] transition-colors duration-300",
                    i === index ? "text-ink" : "text-ink-3 group-hover/tab:text-ink-2",
                  )}
                >
                  {item.role.split(",")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
