import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getWork, getWorks } from "@/lib/works";
import { getPosts } from "@/lib/posts";
import { RichText, extractHeadings } from "@/components/blog/rich-text";
import { PageHero } from "@/components/site/page-hero";
import { JsonLd, breadcrumbJsonLd, pageMetadata, workJsonLd, workCanonicalPath } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getWorks()).map(work => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const work = await getWork(slug, { draft });
  return work ? pageMetadata({ title: work.title, description: work.body, path: `/work/${work.slug}`, canonicalPath: workCanonicalPath(work, await getPosts()), type: "article", modifiedTime: work.updatedAt, section: work.sector, authors: ["Rightium Team"], image: { url: work.image, alt: work.imageAlt || work.title }, noIndex: draft }) : {};
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const work = await getWork(slug, { draft });
  if (!work) notFound();
  const canonicalPath = workCanonicalPath(work, await getPosts());
  const headings = work.content ? extractHeadings(work.content) : [];
  return (
    <>
      <JsonLd data={workJsonLd(work, canonicalPath)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Selected work", path: "/work" }, { name: work.title, path: `/work/${work.slug}` }])} />
      {draft && <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit gap-4 bg-deep px-5 py-3 text-sm text-white">Previewing the latest draft <a className="underline" href={`/next/exit-preview?path=/work/${slug}`}>Exit preview</a></div>}
      <PageHero image={{ url: work.image, alt: work.imageAlt || work.title }} crumbs={[{ label: "Home", href: "/" }, { label: "Selected work", href: "/work" }, { label: work.sector }]} title={work.title} lede={work.body} />
      <section className="bg-paper py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[13.75rem_minmax(0,42.5rem)] lg:gap-16">
          <aside className="self-start lg:sticky lg:top-28">
            <p className="eyebrow text-xs">{work.sector}</p>
            <p className="font-serif mt-5 text-4xl text-accent">{work.metric}</p>
            <p className="mt-2 text-sm text-ink-2">{work.metricLabel}</p>
            {headings.length > 0 && <nav aria-label="In this case study" className="mt-8"><p className="eyebrow text-xs">In this case study</p><ol className="mt-4 space-y-3 text-sm">{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`} className="text-ink-2 hover:text-accent">{heading.text}</a></li>)}</ol></nav>}
            <Link className="mt-8 inline-block border-b border-accent pb-1 text-sm" href="/work">All selected work →</Link>
          </aside>
          <article className="min-w-0">
            {work.content && <RichText content={work.content} />}
          </article>
        </div>
      </section>
    </>
  );
}

