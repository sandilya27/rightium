import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

/**
 * The closing banner: a full-bleed navy plate that stops short of the
 * footer, so the page ends on an ask rather than on a link index. The
 * photograph is pushed to 32% and washed left-to-right, which lets
 * display type sit on flat navy while the right edge still carries an
 * image.
 *
 * `note` replaces the body copy on pages where the ask needs a
 * different second line; `secondary` is dropped on the interior pages
 * where one button is enough.
 */
export function CTA({
  eyebrow = "Next step",
  title = (
    <>Tell us the question. We&rsquo;ll tell you what it takes to answer it.</>
  ),
  note = "Send a brief, or book twenty minutes. You get a scope, a price and a date — usually the same working day.",
  image = "/images/agreement.jpg",
  secondary = true,
}: {
  eyebrow?: string;
  title?: ReactNode;
  note?: ReactNode;
  image?: string;
  secondary?: boolean;
}) {
  return (
    <section className="bg-paper px-[var(--gutter)] pt-20 pb-10 md:pt-24">
      <Reveal variant="scale" className="mx-auto max-w-[80rem]">
        <div className="plate plate-banner text-white">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div className="relative z-[2] grid items-end gap-10 px-8 py-16 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] md:gap-12 md:px-20 md:py-24">
            <div>
              <p className="eyebrow m-0 text-accent-bright">{eyebrow}</p>
              <h2 className="font-serif mt-5 text-[clamp(2rem,4vw,3.6rem)] leading-[1.05] tracking-[-0.02em] balance">
                {title}
              </h2>
              {note && (
                <p className="mt-5 max-w-[52ch] text-[0.96875rem] leading-[1.6] text-deep-ink-2">
                  {note}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3 md:justify-self-end">
              <ButtonLink href="/contact" size="lg" variant="accent">
                Request a quote
                <ArrowRight />
              </ButtonLink>
              {secondary && (
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex h-[54px] items-center border border-white/45 px-7 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-[250ms] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white [@media(hover:hover)_and_(pointer:fine)]:hover:text-deep"
                >
                  {site.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
