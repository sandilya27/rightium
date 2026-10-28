import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { getWorks } from "@/lib/works";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const revalidate = 3600;
export const metadata: Metadata = pageMetadata({
  title: "Selected Work — Patent Judgment Studies",
  description: "Explore Rightium’s studies of landmark patent judgments, covering eligibility, obviousness, claim construction, remedies and design-patent damages.",
  path: "/work",
});

export default async function WorkIndexPage() {
  const works = await getWorks();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Selected work", path: "/work" }])} />
      <PageHero
        eyebrow="Selected work"
        crumbs={[{ label: "Home", href: "/" }, { label: "Selected work" }]}
        title={<>The judgments.<br />The reasoning.</>}
        lede="Explore the legal questions, technical context and practical lessons behind landmark patent decisions. Each study links to the full analysis."
        image={works[0] ? { url: works[0].image, alt: works[0].imageAlt } : undefined}
      />
      <section className="bg-paper py-16 md:py-24" aria-labelledby="work-index-title">
        <div className="shell">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
            <h2 id="work-index-title" className="font-serif text-3xl text-ink-heading">All selected work</h2>
            <p className="text-sm text-ink-2">{works.length} judgment {works.length === 1 ? "study" : "studies"}</p>
          </div>
          <ol className="grid list-none gap-x-10 gap-y-14 p-0 md:grid-cols-2">
            {works.map((work, index) => (
              <li key={work.slug}>
                <Link href={`/work/${work.slug}`} className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image src={work.image} alt={work.imageAlt || work.title} fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" />
                    <span className="absolute top-4 left-4 bg-paper/95 px-3 py-2 font-mono text-xs tracking-wider text-ink-heading">CASE {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4 text-xs text-accent">
                    <span>{work.sector.replace(/^Judgment study\s*·\s*/, "")}</span><span>{work.metric}</span>
                  </div>
                  <h3 className="font-serif mt-3 text-[clamp(1.6rem,2.5vw,2.25rem)] leading-tight text-ink-heading group-hover:text-accent">{work.title}</h3>
                  <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-ink-2">{work.body}</p>
                  <span className="mt-5 inline-flex items-center gap-3 border-b border-accent pb-1 text-sm font-medium text-accent">Read the study <ArrowRight className="size-4" /></span>
                </Link>
              </li>
            ))}
          </ol>
          {works.length === 0 && <p className="py-12 text-ink-2">New judgment studies will appear here when published.</p>}
        </div>
      </section>
    </>
  );
}
