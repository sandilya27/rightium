"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { FileSearch, Scale, ShieldCheck, Users } from "lucide-react";
import { EASE_OUT } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const reasons = [
  {
    icon: FileSearch,
    title: "The method ships with the report",
    body: "Strings, classification codes, databases, date ranges — and the queries that returned nothing. Your team can verify any conclusion or extend the work without starting over.",
    image: "/images/analysts.jpg",
    alt: "An analyst reviewing search results on a laptop",
    tag: "1,284 references screened",
  },
  {
    icon: Users,
    title: "Reviewed twice, by specialists",
    body: "A domain-matched analyst runs the work; a second reviewer is paid to attack the conclusion. Sequence searches go to biologists, claim charts to engineers who know the product.",
    image: "/images/portrait.jpg",
    alt: "A senior analyst in profile, deep in thought",
    tag: "2 analysts on every matter",
  },
  {
    icon: ShieldCheck,
    title: "Built to survive scrutiny",
    body: "Every citation is archived, every exclusion reasoned. Deliverables are structured for oppositions, IPRs, board decks and regulators — whoever checks the work next.",
    image: "/images/executive.jpg",
    alt: "An executive looking out over the city",
    tag: "90+ jurisdictions covered",
  },
  {
    icon: Scale,
    title: "Fixed scope. Fixed fee.",
    body: "Price, scope and date are agreed in writing before anything starts. Revisions inside scope are ours to absorb — no open-ended retainers, no hourly surprises.",
    image: "/images/agreement.jpg",
    alt: "Two professionals shaking hands over an agreement",
    tag: "Quote in one working day",
  },
];

/**
 * Four reasons, one sticky photo frame. As each reason crosses the
 * middle of the viewport it becomes active: its icon lights, the
 * others dim, and the photo frame wipes to its image.
 *
 * Below lg there is no sticky frame, so each reason carries its own
 * photo inline.
 */
export function Why() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = reasons[active];

  return (
    <section className="relative bg-surface py-24 md:py-36">
      <div className="shell">
        <SectionHeading
          align="split"
          eyebrow="Why teams switch"
          title="Most IP reports ask you to take their word for it."
          lede="Ours do not. That single difference is what makes the work usable under a deadline, in a filing, or in front of a judge."
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-20">
          {/* Sticky frame */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)] h-[calc(100vh-var(--nav-h)-4rem)] max-h-[44rem]">
              <div className="duotone relative size-full rounded-block shadow-[0_50px_100px_-50px_rgba(23,11,99,0.6)]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.image}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                    animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0.9, ease: EASE_OUT }}
                  >
                    <Image
                      src={current.image}
                      alt={current.alt}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep/70 via-transparent to-transparent" />

                <div className="absolute inset-x-6 bottom-6 z-[3] flex items-end justify-between gap-4">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.tag}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="rounded-pill border border-white/20 bg-white/10 px-4 py-2 text-[0.8125rem] text-white backdrop-blur-xl"
                    >
                      {current.tag}
                    </motion.span>
                  </AnimatePresence>
                  <span className="font-display text-[0.875rem] text-white/70 tabular-nums">
                    {String(active + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reasons */}
          <ol className="lg:py-[18vh]">
            {reasons.map((r, i) => (
              <Reason
                key={r.title}
                reason={r}
                index={i}
                active={active === i}
                onActive={() => setActive(i)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Reason({
  reason,
  index,
  active,
  onActive,
}: {
  reason: (typeof reasons)[number];
  index: number;
  active: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const Icon = reason.icon;

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <li
      ref={ref}
      className={cn(
        "border-t border-[var(--line)] py-10 transition-opacity duration-500 first:border-t-0 lg:py-16",
        active ? "lg:opacity-100" : "lg:opacity-35",
      )}
    >
      <div className="duotone duotone-soft relative mb-8 aspect-[16/10] overflow-hidden rounded-card lg:hidden">
        <Image src={reason.image} alt={reason.alt} fill sizes="100vw" className="object-cover" />
      </div>

      <div className="flex items-center gap-4">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-2xl border transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            active
              ? "scale-110 border-transparent bg-gradient-accent text-white shadow-[0_12px_30px_-10px_rgba(58,31,214,0.7)]"
              : "border-[var(--line-strong)] bg-white text-ink-2",
          )}
        >
          <Icon className="size-5" strokeWidth={1.8} />
        </span>
        <span className="font-mono text-[0.75rem] text-ink-3">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-display display-sm mt-6 text-balance">{reason.title}</h3>
      <p className="prose-lede mt-4 max-w-[46ch]">{reason.body}</p>
    </li>
  );
}
