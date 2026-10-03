"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/lib/site";
import { serviceCount, services } from "@/lib/services";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ArrowRight, ButtonLink, TextLink } from "@/components/ui/button";
import { EASE_OUT } from "@/components/motion/reveal";

/**
 * Fixed header that starts invisible.
 *
 * Every page opens on a navy hero, so at rest the bar is transparent
 * and white — it belongs to the hero rather than sitting on top of it.
 * Past 40px it resolves to near-opaque paper with a hairline, and the
 * type flips to ink. Hovering Services drops the practice index; the
 * panel closes when the pointer leaves the whole header, so moving
 * diagonally from the trigger into the list never dismisses it.
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerServices, setDrawerServices] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) {
      setDrawerServices(false);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  // Solid whenever the page has moved, a panel is open, or the mobile
  // drawer is up — in all three cases the bar is no longer over hero art.
  const solid = scrolled || menuOpen || drawerOpen;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const practiceHref = (slug: string) => `/services/${slug}`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-deep focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        onMouseLeave={() => setMenuOpen(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,color] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
          solid
            ? "bg-[rgba(255,255,255,0.96)] text-ink-heading shadow-[0_1px_0_rgba(10,31,51,0.1)] backdrop-blur-md"
            : "bg-transparent text-white",
        )}
      >
        <div
          className="shell flex items-center justify-between gap-8"
          style={{ height: "var(--nav-h)" }}
        >
          <Link href="/" aria-label={`${site.name} home`}>
            <Logo />
          </Link>

          <nav className="ml-auto hidden items-center gap-1.5 lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setMenuOpen(item.href === "/services")}
                  className={cn(
                    "group/nav relative px-3.5 py-2.5 text-[0.90625rem] font-medium transition-opacity duration-200",
                    active
                      ? "opacity-100"
                      : "opacity-[0.78] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-100",
                  )}
                >
                  {item.label}
                  <svg
                    aria-hidden
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-x-3.5 bottom-1 h-2 w-[calc(100%-1.75rem)] overflow-visible text-accent"
                  >
                    <path
                      d="M1 7 C 16 7, 18 2, 31 3 S 53 9, 66 6 S 84 2, 99 3"
                      pathLength="1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className={cn(
                        "nav-draw",
                        active && "nav-draw-active",
                      )}
                    />
                  </svg>
                </Link>
              );
            })}
          </nav>

          <ButtonLink
            href="/contact"
            size="sm"
            variant={solid ? "ink" : "outline-invert"}
            className="hidden lg:inline-flex"
          >
            Request a quote
            <ArrowRight className="size-[14px]" />
          </ButtonLink>

          <button
            type="button"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
            className={cn(
              "grid size-10 place-items-center border transition-colors duration-200 lg:hidden",
              solid ? "border-line-strong" : "border-white/40",
            )}
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full bg-current transition-transform duration-[300ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                  drawerOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full bg-current transition-transform duration-[300ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                  drawerOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>

        {/* Practice index. Rendered only on pointer-fine widths — on
            touch the drawer carries the same list. */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, transform: "translate3d(0,-6px,0)" }}
              animate={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              exit={{ opacity: 0, transform: "translate3d(0,-6px,0)" }}
              transition={{ duration: reduce ? 0 : 0.26, ease: EASE_OUT }}
              className="absolute inset-x-0 top-[var(--nav-h)] hidden border-t border-line bg-white text-ink shadow-[0_30px_60px_-30px_rgba(6,21,36,0.35)] lg:block"
            >
              <div className="shell grid grid-cols-[280px_1fr] gap-12 pt-9 pb-10">
                <div>
                  <Eyebrow>Services</Eyebrow>
                  <p className="font-serif mt-3.5 text-[1.75rem] leading-[1.15] tracking-[-0.01em]">
                    Seven practices, one standard of evidence.
                  </p>
                  <TextLink href="/services" className="mt-5.5">
                    See all {serviceCount} services
                  </TextLink>
                </div>
                <div className="grid grid-cols-2 gap-x-10">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={practiceHref(s.slug)}
                      className="grid grid-cols-[36px_1fr] gap-2 border-b border-line px-3 py-3.5 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface"
                    >
                      <span className="font-serif pt-0.5 text-[0.9375rem] text-accent">
                        {s.index}
                      </span>
                      <span>
                        <span className="block text-[0.9375rem] font-medium text-ink-heading">
                          {s.title}
                        </span>
                        <span className="mt-[3px] block text-[0.8125rem] leading-[1.5] text-ink-2">
                          {s.short}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            className="deep-field fixed inset-0 z-50 overflow-y-auto overscroll-contain pt-[var(--nav-h)] text-white lg:hidden"
            initial={{ opacity: 0, transform: "translate3d(0,-8px,0)" }}
            animate={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            exit={{ opacity: 0, transform: "translate3d(0,-8px,0)" }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
          >
            <div className="shell flex min-h-full flex-col justify-between gap-10 py-8">
              <nav className="flex flex-col">
                {nav.map((item) =>
                  item.href === "/services" ? (
                    <div key={item.href} className="border-b border-deep-line">
                      <button
                        type="button"
                        aria-expanded={drawerServices}
                        onClick={() => setDrawerServices((v) => !v)}
                        className="font-serif flex w-full items-center justify-between py-5 text-left text-[2rem] leading-none"
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-8 place-items-center border border-white/25 transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
                            drawerServices && "rotate-45",
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
                      <AnimatePresence initial={false}>
                        {drawerServices && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0 : 0.3, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            {services.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={practiceHref(s.slug)}
                                  className="flex items-baseline gap-3 py-2.5 text-[0.9375rem] text-deep-ink-2"
                                >
                                  <span className="font-serif text-accent-bright">
                                    {s.index}
                                  </span>
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                            <li className="pt-2 pb-5">
                              <TextLink href="/services" invert>
                                All {serviceCount} services
                              </TextLink>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="font-serif block border-b border-deep-line py-5 text-[2rem] leading-none"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="space-y-4">
                <ButtonLink href="/contact" size="lg" variant="accent" className="w-full">
                  Request a quote
                  <ArrowRight />
                </ButtonLink>
                <p className="text-sm text-deep-ink-2">
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow m-0">{children}</p>;
}
