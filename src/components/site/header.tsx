"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { ServiceIcon } from "@/components/services/service-icon";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ServicesMenu } from "./services-menu";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { EASE_OUT } from "@/components/motion/reveal";

/**
 * Floating centre-nav header.
 *
 * The nav sits in its own frosted pill rather than spanning the bar —
 * that, plus the header detaching from the viewport edge on scroll, is
 * the reference template's signature and the cheapest way to stop a
 * page reading as a default layout.
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 16;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "shell flex items-center justify-between gap-6 transition-[padding] duration-[380ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
            scrolled ? "pt-3" : "pt-0",
          )}
          style={{ height: "var(--nav-h)" }}
        >
          <div
            className={cn(
              "flex w-full items-center justify-between gap-6 transition-[background-color,box-shadow,border-color,padding] duration-[380ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
              scrolled || open
                ? "rounded-pill border border-white/10 bg-[rgba(8,5,30,0.86)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_50px_-28px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150 md:px-4"
                : "rounded-pill border border-transparent px-0 py-2",
            )}
          >
            <Link href="/" aria-label={`${site.name} home`} data-cursor="link">
              <Logo invert />
            </Link>

            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {nav.map((item) => {
                const active = isActive(item.href);
                if (item.href === "/services") {
                  return (
                    <ServicesMenu
                      key={item.href}
                      active={active}
                      hovered={hovered === item.href}
                      pathname={pathname}
                      onHover={() => setHovered(item.href)}
                    />
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-cursor="link"
                    onMouseEnter={() => setHovered(item.href)}
                    className={cn(
                      "relative rounded-pill px-4 py-2 text-[0.875rem] transition-colors duration-200",
                      active ? "text-white" : "text-white/65 hover:text-white",
                    )}
                  >
                    {hovered === item.href && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 -z-10 rounded-pill bg-white/10"
                        transition={{
                          type: "spring",
                          duration: reduce ? 0 : 0.34,
                          bounce: 0.12,
                        }}
                      />
                    )}
                    <span className="relative">
                      {item.label}
                      {active && (
                        <span className="absolute -right-2 top-1/2 size-1 -translate-y-1/2 rounded-full bg-accent-bright" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink href="/contact" size="sm" variant="invert" className="hidden sm:inline-flex">
                Request a quote
                <ArrowRight />
              </ButtonLink>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.94] md:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={cn(
                      "absolute left-0 block h-[1.5px] w-full rounded-full bg-white transition-transform duration-[300ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                      open ? "top-1.5 rotate-45" : "top-0 rotate-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 block h-[1.5px] w-full rounded-full bg-white transition-transform duration-[300ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                      open ? "top-1.5 -rotate-45" : "top-3 rotate-0",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress — scroll-linked, so no spring: lag here
            would misreport position. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-accent"
          style={{ scaleX: scrollYProgress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-gradient-deep pt-[var(--nav-h)] text-white md:hidden"
            initial={{ opacity: 0, transform: "translate3d(0, -8px, 0)" }}
            animate={{ opacity: 1, transform: "translate3d(0, 0px, 0)" }}
            exit={{ opacity: 0, transform: "translate3d(0, -8px, 0)" }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            <div className="shell flex min-h-full flex-col justify-between gap-10 py-8">
              <nav className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, transform: "translate3d(0, 14px, 0)" }}
                    animate={{ opacity: 1, transform: "translate3d(0, 0px, 0)" }}
                    transition={{
                      duration: 0.42,
                      delay: reduce ? 0 : 0.04 + i * 0.05,
                      ease: EASE_OUT,
                    }}
                  >
                    {item.href === "/services" ? (
                      <div className="border-b border-[var(--deep-line)]">
                        <button
                          type="button"
                          aria-expanded={servicesOpen}
                          aria-controls="drawer-services"
                          onClick={() => setServicesOpen((v) => !v)}
                          className="font-display flex w-full items-center justify-between py-5 text-left text-[2.25rem] leading-none"
                          style={{ letterSpacing: "-0.04em" }}
                        >
                          {item.label}
                          <svg
                            viewBox="0 0 12 12"
                            aria-hidden
                            className={cn(
                              "size-5 text-white/50 transition-transform duration-[300ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                              servicesOpen && "rotate-180",
                            )}
                          >
                            <path
                              d="M3 4.5 6 7.5l3-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {servicesOpen && (
                            <motion.ul
                              id="drawer-services"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: reduce ? 0 : 0.3, ease: EASE_OUT }}
                              className="overflow-hidden"
                            >
                              {services.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    className="flex items-center gap-3 py-2.5 text-[1rem] text-[var(--deep-ink-2)]"
                                  >
                                    <ServiceIcon name={s.icon} className="size-[18px] shrink-0 text-accent-bright" />
                                    {s.title}
                                    <span className="ml-auto text-[0.75rem] text-white/40 tabular-nums">
                                      {s.items.length}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                              <li className="pt-1 pb-5">
                                <Link
                                  href="/services"
                                  className="group/btn inline-flex items-center gap-2 text-[0.9375rem] font-medium text-accent-bright"
                                >
                                  View all services
                                  <ArrowRight />
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-display block border-b border-[var(--deep-line)] py-5 text-[2.25rem] leading-none"
                        style={{ letterSpacing: "-0.04em" }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : 0.24 }}
                className="space-y-4"
              >
                <ButtonLink href="/contact" size="lg" variant="invert" className="w-full">
                  Request a quote
                  <ArrowRight />
                </ButtonLink>
                <p className="text-sm text-[var(--deep-ink-2)]">
                  <a href={`mailto:${site.email}`} className="link-underline">
                    {site.email}
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
