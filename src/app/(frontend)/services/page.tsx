import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { services, serviceItems } from "@/lib/services";
import { PageHero } from "@/components/site/page-hero";
import { ServiceIcon } from "@/components/services/service-icon";
import { ServiceItemCard } from "@/components/services/service-item-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { ArrowRight } from "@/components/ui/button";
import { CTA } from "@/components/site/cta";

export const metadata: Metadata = pageMetadata({
  title: "Patent Search & IP Services",
  description:
    "Patentability, invalidity and FTO searches, patent landscaping, competitive intelligence, patent database strategy, drafting and prosecution support, licensing, chemical safety intelligence and IP audits.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        image={{ src: "/images/analysts.jpg", alt: "An analyst working through search results" }}
        title="Comprehensive IP solutions, tailored for every need."
        lede={`${services.length} practices, ${serviceItems.length} services, one method: agree the question, run it twice, hand back the evidence. Order fixed-scope work directly, or talk to us about the rest.`}
      />

      <Section>
        {/* Category jump links — 25 services is a long page, so give
            the visitor a way to skip straight to their section. */}
        <Reveal>
          <nav
            aria-label="Service categories"
            className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
          >
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                data-cursor="link"
                className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-[var(--line)] bg-white py-2 pr-4 pl-3 text-[0.8125rem] text-ink-2 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--accent-line)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink"
              >
                <ServiceIcon name={s.icon} tinted className="size-4" />
                {s.title}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-24">
          {services.map((s) => (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="scroll-mt-[calc(var(--nav-h)+2rem)]"
            >
              <Reveal>
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-2xl border border-[var(--line)] bg-white">
                        <ServiceIcon name={s.icon} tinted className="size-5" />
                      </span>
                      <h2
                        id={`${s.slug}-title`}
                        className="font-display display-sm"
                      >
                        {s.title}
                      </h2>
                    </div>
                    <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
                      {s.short}
                    </p>
                  </div>
                  <Link
                    href={`/services/${s.slug}`}
                    data-cursor="link"
                    className="group/btn inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-medium text-accent"
                  >
                    About this practice
                    <ArrowRight />
                  </Link>
                </div>
              </Reveal>

              <RevealGroup
                className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.05}
              >
                {s.items.map((item) => (
                  <RevealItem key={item.slug} className="h-full">
                    <ServiceItemCard item={item} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </section>
          ))}
        </div>
      </Section>

      <CTA
        title="Not sure which one you need?"
        lede="Describe the decision you are trying to make. We will tell you which service answers it — or tell you that none of them do."
      />
    </>
  );
}
