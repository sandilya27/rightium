import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getService, serviceCtaHref, serviceCtaLabel, services } from "@/lib/services";
import { serviceAssemblies } from "@/lib/service-assembly";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink, Tick, TextLink } from "@/components/ui/button";
import { JsonLd, breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { serviceSeo } from "@/lib/service-seo";
import { serviceGuidance } from "@/lib/service-guidance";

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
    title: serviceSeo[service.slug]?.title ?? service.title,
    description: serviceSeo[service.slug]?.description ?? service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const guidance = serviceGuidance[service.slug];

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
        assembly={serviceAssemblies[service.slug]}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        eyebrow={`Practice ${service.index}`}
        title={service.title}
        aside={
          // The three facts a buyer checks before reading anything else.
          <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-5">
            <div className="min-w-0">
              <dt className="m-0 text-xs tracking-[0.12em] uppercase text-accent">
                Typical turnaround
              </dt>
              <dd className="font-serif m-0 mt-2.5 text-[1.375rem] leading-[1.1]">
                {service.turnaround}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="m-0 text-xs tracking-[0.12em] uppercase text-accent">
                Jurisdictions
              </dt>
              <dd className="font-serif m-0 mt-2.5 text-[1.375rem] leading-[1.1]">
                90+
              </dd>
            </div>
            <div className="col-span-2 min-w-0">
              <dt className="m-0 text-xs tracking-[0.12em] uppercase text-accent">
                Built for
              </dt>
              <dd className="m-0 mt-2.5 text-[0.9375rem] leading-[1.5] text-ink-2">
                {service.audience}
              </dd>
            </div>
          </dl>
        }
      />

      {/* The italic standfirst under the hero carries the practice's
          positioning; the summary then does the explaining. */}
      <section className="bg-paper py-20 md:py-[112px]">
        <div className="shell grid items-start gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-20">
          <div>
            <Reveal>
              <p className="font-serif m-0 text-[clamp(1.35rem,2vw,1.75rem)] leading-[1.4] italic text-accent">
                {service.short}
              </p>
              <p className="font-serif mt-6 text-[clamp(1.5rem,2.3vw,2.1rem)] leading-[1.35] tracking-[-0.01em] text-ink-heading text-pretty">
                {service.summary}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="services"
                className="eyebrow mt-16 scroll-mt-[calc(var(--nav-h)+2rem)]"
              >
                {service.items.length} services in this practice
              </h2>
            </Reveal>

            <div className="mt-6 border-t border-line-strong">
              {service.items.map((item, i) => {
                const ordered = item.cta === "order";
                return (
                  <Reveal
                    key={item.slug}
                    delay={i * 0.06}
                    as="article"
                    className="grid scroll-mt-[calc(var(--nav-h)+2rem)] grid-cols-1 items-start gap-5 border-b border-line-strong py-7 xl:grid-cols-[3rem_minmax(0,1fr)_auto]"
                  >
                    <span className="font-serif pt-1.5 text-[0.9375rem] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div id={item.slug} className="scroll-mt-[calc(var(--nav-h)+2rem)]">
                      <h3 className="font-serif m-0 text-2xl leading-[1.2] text-ink-heading">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-[56ch] text-[0.90625rem] leading-[1.6] text-ink-2">
                        {item.description}
                      </p>
                    </div>
                    <Link
                      href={serviceCtaHref(item)}
                      className={cn(
                        "inline-flex h-10 items-center justify-center border border-deep px-[18px] text-[0.84375rem] font-medium whitespace-nowrap transition-colors duration-[250ms]",
                        ordered ? "bg-deep text-white" : "bg-transparent text-deep",
                        "[@media(hover:hover)_and_(pointer:fine)]:hover:border-accent",
                        "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent",
                        "[@media(hover:hover)_and_(pointer:fine)]:hover:text-white",
                      )}
                    >
                      {serviceCtaLabel[item.cta]}
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.12} className="md:sticky md:top-[6.875rem]">
            <div className="plate aspect-[16/10]">
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(min-width: 768px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="border border-t-0 border-line-strong p-8">
              <h2 className="eyebrow m-0">You receive</h2>
              <ul className="mt-5 flex list-none flex-col gap-3.5 p-0">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex gap-3 text-[0.9375rem] leading-[1.55] text-ink-heading"
                  >
                    <Tick className="mt-[3px]" />
                    {d}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/contact" variant="ink" className="mt-7 w-full">
                Scope this engagement
                <ArrowRight className="size-[14px]" />
              </ButtonLink>
              <p className="mt-4 text-[0.8125rem] leading-[1.55] text-ink-2">
                Fixed scope, fixed fee, agreed in writing before anything starts.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {guidance && (
        <section className="bg-paper border-t border-line py-20 md:py-24">
          <div className="shell max-w-5xl">
            <h2 className="display-md m-0 text-ink-heading">Before you brief us</h2>
            <div className="mt-10 space-y-8">
              {guidance.questions.map(({ q, a }) => (
                <div key={q}>
                  <h3 className="font-serif text-2xl leading-snug text-ink-heading">{q}</h3>
                  <p className="mt-3 max-w-[75ch] leading-relaxed text-ink-2">{a}</p>
                </div>
              ))}
            </div>
            <h3 className="eyebrow mt-12">Plan the next step</h3>
            <ul className="mt-4 space-y-3">
              {guidance.related.map((link) => (
                <li key={link.href}><TextLink href={link.href}>{link.label}</TextLink></li>
              ))}
            </ul>
            {guidance.resource && (
              <p className="mt-8 text-sm text-ink-2">
                Further reading: <a className="underline underline-offset-4" href={guidance.resource.href}>{guidance.resource.label}</a>
              </p>
            )}
          </div>
        </section>
      )}

      <section className="bg-surface border-t border-line py-20 md:py-24">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md m-0 text-ink-heading">Related practices</h2>
            <TextLink href="/services">All services</TextLink>
          </Reveal>

          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.09} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="lift flex h-full min-h-[13.75rem] flex-col border border-line bg-white p-8"
                >
                  <span className="font-serif text-[0.9375rem] text-accent">
                    {s.index}
                  </span>
                  <h3 className="font-serif mt-4 text-2xl leading-[1.2] text-ink-heading">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[0.90625rem] leading-[1.6] text-ink-2">
                    {s.short}
                  </p>
                  <span className="mt-auto pt-6 text-[0.84375rem] font-medium text-ink-heading">
                    View practice →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
