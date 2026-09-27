import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { serviceCount, services } from "@/lib/services";
import { PageHero } from "@/components/site/page-hero";
import { ServiceItemCard } from "@/components/services/service-item-card";
import { Reveal } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
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
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title={
          <>
            Comprehensive IP solutions,{" "}
            <em className="accent-em-bright">tailored for every need.</em>
          </>
        }
        lede={`${services.length} practices, ${serviceCount} services, one method: agree the question, run it twice, hand back the evidence. Order fixed-scope work directly, or talk to us about the rest.`}
      />

      {/* Practice rail. Twenty-five services is a long page, so it docks
          under the header and stays there for the whole scroll. */}
      <div className="sticky top-[var(--nav-h)] z-20 border-b border-line bg-[rgba(255,255,255,0.96)] backdrop-blur-md">
        <nav
          aria-label="Service categories"
          className="shell flex gap-1 overflow-x-auto [scrollbar-width:none]"
        >
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="inline-flex shrink-0 items-center gap-2.5 border-b-2 border-transparent px-3.5 py-[18px] text-[0.84375rem] font-medium text-ink-heading transition-[border-color,color] duration-[250ms] [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent"
            >
              <span className="font-serif text-accent">{s.index}</span>
              {s.title}
            </a>
          ))}
        </nav>
      </div>

      <section className="bg-paper pt-20 pb-10 md:pt-24">
        <div className="shell flex flex-col gap-20 md:gap-28">
          {services.map((s) => (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="grid scroll-mt-[9.375rem] gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-16"
            >
              <Reveal className="self-start md:sticky md:top-[10rem]">
                <span className="font-serif text-[0.9375rem] text-accent">
                  Practice {s.index}
                </span>
                <h2
                  id={`${s.slug}-title`}
                  className="font-serif mt-4 text-[clamp(1.9rem,3vw,2.75rem)] leading-[1.08] tracking-[-0.015em] text-ink-heading"
                >
                  {s.title}
                </h2>
                <p className="mt-4.5 max-w-[36ch] text-[0.96875rem] leading-[1.6] text-ink-2">
                  {s.short}
                </p>
                <dl className="mt-7 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-[0.84375rem]">
                  <dt className="text-ink-2">Turnaround</dt>
                  <dd className="m-0 text-ink-heading">{s.turnaround}</dd>
                  <dt className="text-ink-2">Built for</dt>
                  <dd className="m-0 text-ink-heading">{s.audience}</dd>
                </dl>
                <TextLink href={`/services/${s.slug}`} className="mt-7">
                  About this practice
                </TextLink>
              </Reveal>

              <div className="grid gap-5 sm:grid-cols-2">
                {s.items.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.07} className="h-full">
                    <ServiceItemCard item={item} className="h-full" />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <CTA
        eyebrow="Not sure which one you need?"
        title="Describe the decision you are trying to make."
        note="We will tell you which service answers it — or tell you that none of them do."
        image="/images/analysts.jpg"
        secondary={false}
      />
    </>
  );
}
