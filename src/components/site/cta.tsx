import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

/**
 * The closing banner with magnetic interaction and ambient lighting.
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
        <div className="plate plate-banner relative overflow-hidden text-white shadow-2xl">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          {/* Ambient luminous glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-accent/25 blur-3xl"
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
            <div className="flex flex-col items-start gap-4 md:justify-self-end">
              <Magnetic strength={0.25}>
                <ButtonLink href="/contact" size="lg" variant="accent">
                  Request a quote
                  <ArrowRight />
                </ButtonLink>
              </Magnetic>

              {secondary && (
                <Magnetic strength={0.2}>
                  <ButtonLink
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    size="md"
                    variant="outline-invert"
                  >
                    Call {site.phone}
                  </ButtonLink>
                </Magnetic>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
