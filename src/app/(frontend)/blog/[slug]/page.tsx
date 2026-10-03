import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { RichText, extractHeadings } from "@/components/blog/rich-text";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { PostCard } from "@/components/blog/post-card";
import { TextLink } from "@/components/ui/button";
import { initialsOf } from "@/lib/content";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SharedArticleTitle } from "@/components/blog/shared-title";
import { CloseArticle } from "@/components/blog/close-article";

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
  const headings = post.content ? extractHeadings(post.content) : [];

  return (
    <>
      {draft && (
        <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit items-center gap-4 bg-deep px-5 py-2.5 text-[0.8125rem] text-white shadow-lg">
          Previewing the latest draft
          <a
            href={`/next/exit-preview?path=/blog/${post.slug}`}
            className="underline underline-offset-4"
          >
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
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/blog" },
          { label: post.category },
        ]}
        title={<SharedArticleTitle slug={post.slug}>{post.title}</SharedArticleTitle>}
        lede={
          <span className="font-serif text-xl leading-[1.45] italic">
            {post.excerpt}
          </span>
        }
      />

      {/* The meta row lives outside PageHero's lede so the byline can sit
          on its own baseline under the standfirst. */}
      <div className="bg-deep pb-16 text-white md:pb-20">
        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-[0.84375rem] text-deep-ink-3">
          <CloseArticle />
          <div className="flex flex-wrap gap-x-8 gap-y-3">
          <span>
            <span className="font-medium text-white">{post.author.name}</span>
            {post.author.role ? ` · ${post.author.role}` : ""}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </div>

      <section className="bg-paper pt-20 pb-20 md:pt-24 md:pb-[120px]">
        <div className="shell grid gap-12 lg:grid-cols-[13.75rem_minmax(0,42.5rem)_minmax(0,1fr)] lg:gap-16">
          <aside className="self-start text-[0.84375rem] lg:sticky lg:top-[6.875rem]">
            {headings.length > 0 && (
              <>
                <p className="eyebrow m-0 text-xs">In this article</p>
                <ol className="mt-4 flex list-none flex-col gap-2.5 border-l border-line-strong p-0">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="-ml-px block border-l-2 border-transparent py-0.5 pl-3.5 text-ink-2 transition-[color,border-color] duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink-heading"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </>
            )}
            <p className="eyebrow mt-8 text-xs">All insights</p>
            <Link
              href="/blog"
              className="mt-3 block w-max border-b-[1.5px] border-accent pb-0.5 font-medium text-ink-heading"
            >
              Back to the index →
            </Link>
          </aside>

          <Reveal delay={0.1} as="article">
            {post.coverImage && (
              /* Served from R2 through Payload; next/image would re-proxy it. */
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                width={post.coverImage.width}
                height={post.coverImage.height}
                className="mb-12 w-full border border-line"
              />
            )}

            {post.content && <RichText content={post.content} />}

            <div className="mt-14 flex items-center gap-5 border-t border-line-strong pt-8">
              <span className="font-serif grid size-14 shrink-0 place-items-center rounded-full bg-deep text-lg text-white">
                {initialsOf(post.author.name)}
              </span>
              <div>
                <p className="m-0 text-[0.9375rem] font-medium text-ink-heading">
                  {post.author.name}
                </p>
                <p className="mt-1 text-sm text-ink-2">
                  {post.author.role ? `${post.author.role}, ` : ""}Rightium
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface border-t border-line py-20 md:py-24">
          <div className="shell">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="display-md m-0 text-ink-heading">More from the desk</h2>
              <TextLink href="/blog">All insights</TextLink>
            </Reveal>
            <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.09} className="h-full">
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
