"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

/**
 * Accordion.
 *
 * The open/close uses `grid-template-rows: 0fr → 1fr` rather than an
 * animated pixel height: it interpolates to the panel's real content
 * height with no measuring pass, so there is no first-open jump and no
 * layout read per frame. The badge rotates 45° so the plus becomes a
 * cross — one glyph, two states, no icon swap.
 *
 * One panel open at a time, first one open by default: the first
 * question is the one most readers came for.
 */
export function Accordion({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <div className={cn("border-t border-line-strong", className)}>
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q} className="border-b border-line-strong">
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`${id}-panel-${i}`}
                id={`${id}-trigger-${i}`}
                onClick={() => setOpen(expanded ? null : i)}
                className="font-serif flex w-full items-center justify-between gap-6 py-6 text-left text-[1.1875rem] leading-[1.3] text-ink-heading md:text-[1.3125rem]"
              >
                {item.q}
                <span
                  aria-hidden
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                    expanded
                      ? "rotate-45 border-deep bg-deep text-white"
                      : "border-line-strong text-ink-heading",
                  )}
                >
                  <svg viewBox="0 0 12 12" className="size-3">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={`${id}-panel-${i}`}
              role="region"
              aria-labelledby={`${id}-trigger-${i}`}
              className="grid transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="m-0 pr-0 pb-6.5 text-[0.9375rem] leading-[1.7] text-ink-2 md:pr-16">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
