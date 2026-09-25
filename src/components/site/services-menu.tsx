"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { services, serviceItemHref, serviceItems } from "@/lib/services";
import { ServiceIcon } from "@/components/services/service-icon";
import { ArrowRight } from "@/components/ui/button";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Desktop "Services" mega-menu.
 *
 * Opens on hover for mouse users (with a short close delay, so a
 * diagonal pointer path to the panel doesn't dismiss it) and on click
 * for everyone else. The panel is rendered straight after the trigger
 * in DOM order, so Tab moves from the button into the links.
 *
 * Categories flow through CSS columns rather than a grid: they have
 * two to six links each, and columns pack those unequal heights without
 * leaving holes.
 */
export function ServicesMenu({
  active,
  hovered,
  pathname,
  onHover,
}: {
  active: boolean;
  hovered: boolean;
  pathname: string;
  onHover: () => void;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const closeTimer = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        scheduleClose();
      }}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        data-cursor="link"
        aria-expanded={open}
        aria-controls={panelId}
        onMouseEnter={onHover}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-[0.875rem] transition-colors duration-200",
          active || open ? "text-white" : "text-white/65 hover:text-white",
        )}
      >
        {hovered && (
          <motion.span
            layoutId="nav-hover"
            className="absolute inset-0 -z-10 rounded-pill bg-white/10"
            transition={{ type: "spring", duration: reduce ? 0 : 0.34, bounce: 0.12 }}
          />
        )}
        <span className="relative">
          Services
          {active && (
            <span className="absolute -right-2 top-1/2 size-1 -translate-y-1/2 rounded-full bg-accent-bright" />
          )}
        </span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className={cn(
            "ml-1 size-3 transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
            open && "rotate-180",
          )}
        >
          <path
            d="M3 4.5 6 7.5l3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Positioning lives on a static wrapper so the motion element
          is free to animate its own transform. */}
      <div
        className={cn(
          "absolute top-full left-1/2 w-[min(64rem,calc(100vw-2*var(--gutter)))] -translate-x-1/2 pt-3",
          !open && "pointer-events-none",
        )}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              id={panelId}
              initial={{ opacity: 0, transform: "translate3d(0, -6px, 0) scale(0.985)" }}
              animate={{ opacity: 1, transform: "translate3d(0, 0px, 0) scale(1)" }}
              exit={{ opacity: 0, transform: "translate3d(0, -4px, 0) scale(0.99)" }}
              transition={{ duration: reduce ? 0 : 0.22, ease: EASE_OUT }}
              style={{ transformOrigin: "top center" }}
              className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-white/95 shadow-[0_1px_2px_rgba(10,6,40,0.05),0_40px_80px_-40px_rgba(10,6,40,0.45)] backdrop-blur-xl"
            >
              <div className="columns-3 gap-8 p-8 lg:columns-4">
                {services.map((s) => (
                  <div key={s.slug} className="mb-7 break-inside-avoid">
                    <Link
                      href={`/services/${s.slug}`}
                      data-cursor="link"
                      onClick={() => setOpen(false)}
                      className="group/cat flex items-start gap-2.5"
                    >
                      <ServiceIcon
                        name={s.icon}
                        tinted
                        className="mt-[1px] size-[18px] shrink-0"
                      />
                      <span className="text-[0.875rem] font-medium leading-snug text-ink transition-colors duration-200 group-hover/cat:text-accent">
                        {s.title}
                      </span>
                    </Link>
                    <ul className="mt-2.5 space-y-1.5 pl-[28px]">
                      {s.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={serviceItemHref(s, item)}
                            data-cursor="link"
                            onClick={() => setOpen(false)}
                            className="block text-[0.8125rem] leading-snug text-ink-2 transition-colors duration-200 hover:text-accent"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-[var(--line)] bg-surface px-8 py-4">
                <p className="text-[0.8125rem] text-ink-3">
                  {serviceItems.length} services across {services.length} practices
                </p>
                <Link
                  href="/services"
                  data-cursor="link"
                  onClick={() => setOpen(false)}
                  className="group/btn inline-flex items-center gap-2 text-[0.8125rem] font-medium text-accent"
                >
                  View all services
                  <ArrowRight />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
