import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { RichText } from "@/components/blog/rich-text";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PostCard } from "@/components/blog/post-card";
import { CTA } from "@/components/site/cta";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Articles are prerendered at build and cached. Publishing in the admin
// purges the cached copy; the timer is only a safety net.
export const revalidate = 86400;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const post = await getPost(slug, { draft });
  if (!post) return {};
  return pageMetadata({
    title: post.seo.title ?? post.title,
    description: post.seo.description ?? post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    authors: [post.author.name],
    section: post.category,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const post = await getPost(slug, { draft });
  if (!post) notFound();

  const related = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {draft && (
        <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit items-center gap-4 rounded-pill bg-ink px-5 py-2.5 text-[0.8125rem] text-white shadow-lg">
          Previewing the latest draft
          <a href={`/next/exit-preview?path=/blog/${post.slug}`} className="underline underline-offset-4">
            Exit preview
          </a>
        </div>
      )}
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/blog" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[0.875rem] text-white/55">
          <span className="text-white">{post.author.name}</span>
          <span>{post.author.role}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </PageHero>

      <Section>
        <article className="mx-auto max-w-[68ch]">
          <Reveal>
            <p className="font-display text-[1.375rem] leading-[1.5] tracking-[-0.01em] text-balance md:text-[1.5rem]">
              {post.excerpt}
            </p>
          </Reveal>

          {post.coverImage && (
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element -- served from R2 via Payload */}
              <img
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                width={post.coverImage.width}
                height={post.coverImage.height}
                className="mt-12 w-full rounded-card border border-[var(--line)]"
              />
            </Reveal>
          )}

          {post.content && (
            <div className="mt-12">
              <RichText content={post.content} />
            </div>
          )}

          <div className="mt-16 border-t border-[var(--line)] pt-8">
            <Link
              href="/blog"
              data-cursor="link"
              className="link-underline text-[0.9375rem] text-ink-2 hover:text-ink"
            >
              ← All insights
            </Link>
          </div>
        </article>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-[var(--line)] bg-surface">
          <h2 className="font-display display-md">Keep reading</h2>
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.06}>
            {related.map((p) => (
              <RevealItem key={p.slug} className="h-full">
                <PostCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      <CTA />
    </>
  );
}
