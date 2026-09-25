import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getService, services } from "@/lib/services";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { ServiceItemCard } from "@/components/services/service-item-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ServiceIcon } from "@/components/services/service-icon";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { CTA } from "@/components/site/cta";
import { JsonLd, breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.short,
    path: `/services/${service.slug}`,
  });
}

const heroImages = [
  { src: "/images/analysts.jpg", alt: "An analyst working through search results" },
  { src: "/images/strategy.jpg", alt: "A strategist mapping a problem on a whiteboard" },
  { src: "/images/data.jpg", alt: "Market data on a phone screen" },
  { src: "/images/executive.jpg", alt: "An executive looking out over the city" },
  { src: "/images/agreement.jpg", alt: "Two professionals shaking hands over an agreement" },
  { src: "/images/portrait.jpg", alt: "A specialist in profile" },
];

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <PageHero
        eyebrow={`Service ${service.index}`}
        title={service.title}
        lede={service.short}
        image={heroImages[(Number(service.index) - 1) % heroImages.length]}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/contact" size="lg" variant="invert">
            Request a quote
            <ArrowRight />
          </ButtonLink>
          <span className="grid size-12 place-items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md">
            <ServiceIcon name={service.icon} className="size-5 text-accent-bright" />
          </span>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="font-display text-[1.375rem] leading-[1.45] tracking-[-0.01em] text-balance md:text-[1.625rem]">
                {service.summary}
              </p>
            </Reveal>

            {service.items.length > 0 && (
              <>
                <Reveal delay={0.1} className="mt-14">
                  <h2 className="eyebrow text-ink-3">
                    {service.items.length} services in this practice
                  </h2>
                </Reveal>
                <Reveal delay={0.14} className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <ServiceItemCard key={item.slug} item={item} />
                    ))}
                  </div>
                </Reveal>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
            <Reveal delay={0.08}>
              <div className="rounded-card border border-[var(--line)] bg-white p-8">
                <h2 className="eyebrow text-ink-3">At a glance</h2>
                <dl className="mt-6 space-y-5 text-[0.9375rem]">
                  <div>
                    <dt className="text-ink-3">Typical turnaround</dt>
                    <dd className="mt-1 text-ink">{service.turnaround}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-3">Built for</dt>
                    <dd className="mt-1 text-ink">{service.audience}</dd>
                  </div>
                </dl>

                <h3 className="eyebrow mt-9 text-ink-3">You receive</h3>
                <ul className="mt-5 space-y-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                      <Check
                        className="mt-[3px] size-4 shrink-0 text-accent"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="text-ink-2">{d}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink href="/contact" className="mt-8 w-full" variant="outline">
                  Scope this engagement
                  <ArrowRight />
                </ButtonLink>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section className="border-t border-[var(--line)] bg-surface">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display display-md text-balance">
            Related services
          </h2>
          <Link
            href="/services"
            data-cursor="link"
            className="group/btn hidden shrink-0 items-center gap-2 text-[0.875rem] font-medium sm:inline-flex"
          >
            All services
            <ArrowRight />
          </Link>
        </div>

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.06}>
          {others.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                data-cursor="link"
                className="group/rel flex h-full flex-col rounded-card border border-[var(--line)] bg-white p-7 transition-[transform,border-color] duration-[320ms] ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[3px] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--accent-line)]"
              >
                <span className="font-mono text-[0.6875rem] text-ink-3">
                  {s.index}
                </span>
                <h3 className="font-display mt-4 text-[1.2rem] leading-tight tracking-[-0.015em]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                  {s.short}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTA />
    </>
  );
}
