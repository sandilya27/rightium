import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/posts";
import { PageHero } from "@/components/site/page-hero";
import { BlogIndex } from "@/components/blog/blog-index";
import { readingAssembly } from "@/lib/reading-assembly";
import { SubscribeBand } from "@/components/blog/subscribe-band";

export const metadata: Metadata = pageMetadata({
  title: "Patent Law Insights & Landmark Judgments",
  description:
    "Explore landmark U.S. patent judgments and their practical lessons for eligibility, obviousness, claim construction, damages and patent exhaustion.",
  path: "/blog",
});

// Purged on publish; the timer is a safety net.
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        assembly={readingAssembly(["Research", "Analysis", "IP Decisions"], "Conceptual optical assembly accompanying Rightium research and IP analysis.")}
        eyebrow="Insights"
        title={
          <>
            Notes from the <em className="accent-em">research desk.</em>
          </>
        }
        lede="Landmark patent judgments, explained through the facts, the courts’ reasoning, and their practical implications for innovators and IP teams."
      />

      <section className="bg-paper pt-16 pb-20 md:pt-20 md:pb-[120px]">
        <div className="shell">
          {posts.length > 0 ? (
            <>
              <BlogIndex posts={posts} />
            </>
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
