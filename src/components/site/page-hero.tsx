import { InventionScene, type AssemblyProfile } from "@/components/home/invention-scene";
import { HeroField } from "@/components/home/hero-field";
import Link from "next/link";
import type { ReactNode } from "react";
export type Crumb = { label: string; href?: string };

/** Server-rendered hero copy; an explicit assembly opts into the compact light field.
 * Every public route supplies its topic-specific compact profile. */
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
  assembly: AssemblyProfile;
  actions?: ReactNode;
}) {
  return (
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
}
