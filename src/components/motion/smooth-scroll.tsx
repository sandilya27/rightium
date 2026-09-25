"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { frame, cancelFrame } from "motion/react";

/**
 * Inertial page scroll.
 *
 * Lenis keeps native scrolling (so sticky, anchors and the scrollbar
 * all still work) and only smooths the wheel. It is driven from
 * Motion's frame loop, so every scroll-linked transform on the page
 * reads the same value in the same frame — no one-frame lag between
 * the page and the things pinned to it.
 *
 * Off for touch (native momentum is already right there) and for
 * reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (calm || !fine) return;

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const update = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // New route → start at the top without easing through the old page.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
