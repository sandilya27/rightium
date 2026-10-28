import { InventionScene, type AssemblyProfile } from "@/components/home/invention-scene";
import { HeroField } from "@/components/home/hero-field";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
export type Crumb = { label: string; href?: string };

/** Reading pages use cover artwork; other interior pages retain their assembly. */
export function PageHero({
  eyebrow,
  crumbs,
  title,
  lede,
  aside,
  assembly,
  actions,
  image,
}: {
  eyebrow?: string;
  crumbs?: Crumb[];
  title: ReactNode;
  lede?: ReactNode;
  /** Optional right-hand fact panel (used by the practice pages). */
  aside?: ReactNode;
  assembly?: AssemblyProfile;
  image?: { url: string; alt?: string };
  actions?: ReactNode;
}) {
  return (
    <section className={`compact-page-hero bg-paper text-ink-heading${image ? " image-page-hero" : ""}`}>
      {image ? (
        <div className="image-hero-media">
          <Image src={image.url} alt={image.alt || ""} fill preload sizes="(min-width: 1024px) 68vw, 100vw" className="image-hero-photo" />
          <span aria-hidden="true" className="image-hero-soften" />
          <span aria-hidden="true" className="image-hero-tint" />
        </div>
      ) : <HeroField compact />}
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
          {!image && assembly && <InventionScene compact profile={assembly} />}
        </div>
      </div>
    </section>
  );
}
