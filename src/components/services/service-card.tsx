"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Service } from "@/lib/services";
import { ServiceIcon } from "./service-icon";
import { ArrowBadge } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Service card.
 *
 * Hover does three cheap things at once: the card lifts 4px, a soft
 * teal spotlight tracks the pointer, and the arrow badge fills and
 * rotates. Spotlight coordinates are written onto the card element
 * itself — never onto a parent, which would invalidate styles for
 * every sibling card in the grid.
 */
export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={`/services/${service.slug}`}
      data-cursor="link"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
      className={cn(
        "group/card relative isolate flex h-full flex-col overflow-hidden rounded-card",
        "border border-[var(--line)] bg-white p-7",
        "transition-[transform,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--accent-line)]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-[320ms] ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(58,31,214,0.08), transparent 70%)",
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-accent transition-[background-color,color] duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:bg-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:text-white">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
        <ArrowBadge />
      </div>

      <h3 className="font-display display-sm mt-7">{service.title}</h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
        {service.short}
      </p>

      {service.items.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {service.items.slice(0, 3).map((item) => (
            <li
              key={item.title}
              className="rounded-pill border border-[var(--line)] px-2.5 py-1 text-[0.75rem] text-ink-3"
            >
              {item.title}
            </li>
          ))}
          {service.items.length > 3 && (
            <li className="px-1 py-1 text-[0.75rem] text-ink-3">
              +{service.items.length - 3} more
            </li>
          )}
        </ul>
      )}

      <span className="mt-auto flex items-center gap-2 pt-7 text-[0.875rem] font-medium text-ink-2 transition-colors duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:text-accent">
        Learn more
      </span>
    </Link>
  );
}
