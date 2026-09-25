"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";

type Item = { title: string; description: string };

/**
 * Accordion.
 *
 * Height is the one non-composited property worth animating — there is
 * no transform equivalent for revealing flow content. It is kept cheap
 * by animating a single wrapper and pairing it with an opacity fade,
 * and the exit is faster than the enter because closing is the system
 * responding, not the user deciding.
 */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <div className="border-t border-[var(--line)]">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.title} className="border-b border-[var(--line)]">
            <h3>
              <button
                type="button"
                data-cursor="link"
                aria-expanded={expanded}
                aria-controls={`${id}-panel-${i}`}
                id={`${id}-trigger-${i}`}
                onClick={() => setOpen(expanded ? null : i)}
                className="group/acc flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent"
              >
                <span className="font-display text-[1.2rem] leading-snug tracking-[-0.015em] md:text-[1.375rem]">
                  {item.title}
                </span>

                <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] transition-colors duration-200 group-hover/acc:border-accent">
                  <span className="absolute h-px w-3 bg-current" />
                  <span
                    className="absolute h-3 w-px bg-current transition-transform duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="panel"
                  id={`${id}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${id}-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: reduce ? 0 : 0.34, ease: EASE_OUT },
                    opacity: { duration: reduce ? 0.12 : 0.22, ease: EASE_OUT },
                  }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62ch] pb-7 text-[0.9375rem] leading-relaxed text-ink-2">
                    {item.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
