import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/posts";
import { PageHero } from "@/components/site/page-hero";
import { BlogIndex } from "@/components/blog/blog-index";
import { Reveal } from "@/components/motion/reveal";
import { SubscribeBand } from "@/components/blog/subscribe-band";

export const metadata: Metadata = pageMetadata({
  title: "Insights — Patent Search & IP Strategy Articles",
  description:
    "Practical articles on patent search, FTO, invalidity, landscaping, licensing, IP due diligence and chemical safety — written by the analysts doing the work.",
  path: "/blog",
});

// Purged on publish; the timer is a safety net.
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Notes from the <em className="accent-em-bright">research desk.</em>
          </>
        }
        lede="Practical method, written by the analysts doing the work. No thought leadership."
      />

      <section className="bg-paper pt-16 pb-20 md:pt-20 md:pb-[120px]">
        <div className="shell">
          {posts.length > 0 ? (
            <Reveal>
              <BlogIndex posts={posts} />
            </Reveal>
          ) : (
            <p className="mx-auto max-w-[52ch] py-10 text-center text-[1.0625rem] leading-[1.7] text-ink-2">
              New articles are on their way. In the meantime, send us the question
              you are working on — the answer is often faster than the article.
            </p>
          )}
        </div>
      </section>

      <SubscribeBand />
    </>
  );
}
