import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero. Same midnight atmosphere as the home hero so every
 * page opens on the brand gradient; an optional photo sits on the
 * right in the indigo duotone.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumb,
  children,
  image,
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  breadcrumb?: { label: string; href: string }[];
  children?: ReactNode;
  image?: { src: string; alt: string };
  align?: "start" | "center";
  className?: string;
}) {
  const centered = align === "center" && !image;

  return (
    <section
      className={cn(
        "grain relative isolate overflow-hidden bg-deep pt-[calc(var(--nav-h)+4rem)] pb-20 text-white md:pb-28",
        className,
      )}
    >
      <div aria-hidden className="mesh">
        <span />
        <span />
        <span />
      </div>
      <div aria-hidden className="grid-lines" />

      <div
        className={cn(
          "shell relative grid items-center gap-12",
          image && "lg:grid-cols-[1.15fr_0.85fr]",
          centered && "text-center",
        )}
      >
        <div>
          {breadcrumb && (
            <Reveal y={8}>
              <nav
                aria-label="Breadcrumb"
                className={cn(
                  "mb-7 flex flex-wrap items-center gap-2 text-[0.8125rem] text-white/50",
                  centered && "justify-center",
                )}
              >
                {breadcrumb.map((c, i) => (
                  <span key={c.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    <Link href={c.href} className="link-underline hover:text-white">
                      {c.label}
                    </Link>
                  </span>
                ))}
              </nav>
            </Reveal>
          )}

          {eyebrow && (
            <Reveal y={10}>
              <span className="inline-flex items-center gap-3 rounded-pill border border-white/12 bg-white/[0.05] py-1.5 pr-4 pl-3 backdrop-blur-md">
                <span className="pulse-dot" />
                <span className="eyebrow text-white/75">{eyebrow}</span>
              </span>
            </Reveal>
          )}

          <h1
            className={cn(
              "font-display display-lg mt-7 max-w-[18ch] text-balance",
              centered && "mx-auto",
            )}
          >
            <SplitText text={title} />
          </h1>

          {lede && (
            <Reveal delay={0.14}>
              <p
                className={cn(
                  "mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-[var(--deep-ink-2)] md:text-[1.1875rem]",
                  centered && "mx-auto",
                )}
              >
                {lede}
              </p>
            </Reveal>
          )}

          {children && (
            <Reveal delay={0.2}>
              <div className={cn("mt-10 flex flex-wrap gap-3", centered && "justify-center")}>
                {children}
              </div>
            </Reveal>
          )}
        </div>

        {image && (
          <Reveal delay={0.15} y={30} className="hidden lg:block">
            <div className="duotone relative aspect-[4/5] max-h-[32rem] w-full rounded-block shadow-[0_40px_120px_-40px_rgba(58,31,214,0.7)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="36vw"
                className="object-cover"
              />
              <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep/60 to-transparent" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
