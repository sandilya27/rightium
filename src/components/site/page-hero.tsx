import { InventionScene, type AssemblyProfile } from "@/components/home/invention-scene";
import { HeroField } from "@/components/home/hero-field";
import Link from "next/link";
import type { ReactNode } from "react";
import { PixelBlast } from "@/components/ui/pixel-blast";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/** Server-rendered hero copy; an explicit assembly opts into the compact light field.
 * Legacy heroes remain available until their scheduled route migration. */
export function PageHero({
  eyebrow,
  crumbs,
  title,
  lede,
  aside,
  assembly,
  actions,
}: {
  eyebrow?: string;
  crumbs?: Crumb[];
  title: ReactNode;
  lede?: ReactNode;
  /** Optional right-hand fact panel (used by the practice pages). */
  aside?: ReactNode;
  assembly?: AssemblyProfile;
  actions?: ReactNode;
}) {
  if (assembly) return (
    <section className="compact-page-hero bg-paper text-ink-heading">
      <HeroField compact />
      <div className="shell relative">
        {crumbs && <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-accent">
          {crumbs.map((crumb, index) => <span key={crumb.label}>
            {index > 0 && <span aria-hidden="true" className="mr-2">/</span>}
            {crumb.href ? <Link href={crumb.href} className="underline underline-offset-4">{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
          </span>)}
        </nav>}
        <div className="compact-hero-grid">
          <div className="compact-hero-copy min-w-0">
            {eyebrow && <p className="eyebrow text-accent">{eyebrow}</p>}
            <h1 className="display-page balance compact-hero-title">{title}</h1>
            {lede && <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-ink-2">{lede}</p>}
            {actions && <div className="mt-7 flex flex-wrap gap-4">{actions}</div>}
            {aside && <div className="mt-8 border-t border-line pt-6">{aside}</div>}
          </div>
          <InventionScene compact profile={assembly} />
        </div>
      </div>
    </section>
  );
  return (
    <section className="on-deep relative isolate overflow-hidden bg-deep text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-65">
        <PixelBlast
          color="#a5d6ca"
          variant="square"
          pixelSize={3}
          patternScale={2.6}
          patternDensity={1.05}
          enableRipples={false}
          speed={0.28}
          edgeFade={0.3}
          transparent
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 68% at 50% 38%, rgba(25,39,51,0.48) 0%, rgba(25,39,51,0.82) 72%, rgba(25,39,51,0.96) 100%)",
        }}
      />

      <div
        className={cn(
          "shell relative pt-[calc(var(--nav-h)+3.5rem)] pb-14 sm:pt-[calc(var(--nav-h)+4.25rem)] md:pt-[10.625rem] md:pb-24",
          aside && "grid items-end gap-9 sm:gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16",
        )}
      >
        <div>
          {crumbs && (
            <nav
              aria-label="Breadcrumb"
              className="rise flex flex-wrap gap-2 text-[0.75rem] text-deep-ink-3 sm:gap-2.5 sm:text-[0.8125rem]"
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
              "display-page rise max-w-[16ch] balance text-[clamp(2.25rem,8.5vw,4.75rem)] md:text-[clamp(2.35rem,5.2vw,4.75rem)]",
              crumbs || eyebrow ? "mt-5 sm:mt-6" : "mt-0",
            )}
            style={{ animationDuration: "0.9s", animationDelay: "0.1s" }}
          >
            {title}
          </h1>

          {lede && (
            <p
              className="rise mt-5 max-w-[60ch] text-[0.98rem] leading-[1.65] text-deep-ink-2 sm:mt-7 sm:text-[1.0625rem]"
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
