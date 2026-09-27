import Link from "next/link";
import type { ReactNode } from "react";
import { FlowLines, flowMask } from "@/components/motion/flow-lines";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Interior page hero.
 *
 * Same navy field as the home hero at about two-thirds the height, with
 * the flow lines masked to fade in from the left so the headline never
 * competes with them. The entrance is a staggered cascade rather than a
 * scroll reveal: this content is above the fold on arrival, so there is
 * nothing to trigger on.
 */
export function PageHero({
  eyebrow,
  crumbs,
  title,
  lede,
  aside,
  flowCount = 26,
}: {
  eyebrow?: string;
  crumbs?: Crumb[];
  title: ReactNode;
  lede?: ReactNode;
  /** Optional right-hand fact panel (used by the practice pages). */
  aside?: ReactNode;
  flowCount?: number;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 80% at 90% 40%, var(--deep-lift) 0%, var(--deep) 55%, var(--deep-well) 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-80" style={flowMask.page}>
        <FlowLines count={flowCount} />
      </div>

      <div
        className={cn(
          "shell relative pt-[8.5rem] pb-16 md:pt-[10.625rem] md:pb-24",
          aside && "grid items-end gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-16",
        )}
      >
        <div>
          {crumbs && (
            <nav
              aria-label="Breadcrumb"
              className="rise flex flex-wrap gap-2.5 text-[0.8125rem] text-deep-ink-3"
              style={{ animationDuration: "0.8s" }}
            >
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex gap-2.5">
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </span>
              ))}
            </nav>
          )}

          {eyebrow && (
            <p
              className="eyebrow rise m-0 text-accent-bright"
              style={{ animationDuration: "0.8s" }}
            >
              {eyebrow}
            </p>
          )}

          <h1
            className={cn(
              "display-page rise max-w-[16ch] balance",
              crumbs || eyebrow ? "mt-6" : "mt-0",
            )}
            style={{ animationDuration: "0.9s", animationDelay: "0.1s" }}
          >
            {title}
          </h1>

          {lede && (
            <p
              className="rise mt-7 max-w-[60ch] text-[1.0625rem] leading-[1.6] text-deep-ink-2"
              style={{ animationDuration: "0.9s", animationDelay: "0.22s" }}
            >
              {lede}
            </p>
          )}
        </div>

        {aside && (
          <div
            className="rise"
            style={{ animationDuration: "1s", animationDelay: "0.4s" }}
          >
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
