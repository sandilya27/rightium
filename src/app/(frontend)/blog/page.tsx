import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/posts";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { BlogIndex } from "@/components/blog/blog-index";
import { CTA } from "@/components/site/cta";

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
        title="Notes from the research desk."
        lede="Method, not thought leadership. Written by the people who run the searches, review them and defend the conclusions."
      />

      <Section>
        {posts.length > 0 ? (
          <BlogIndex posts={posts} />
        ) : (
          <p className="mx-auto max-w-[52ch] py-10 text-center text-[1.0625rem] leading-relaxed text-ink-2">
            New articles are on their way. In the meantime, send us the question you are
            working on — the answer is often faster than the article.
          </p>
        )}
      </Section>

      <CTA
        title="Have a question these notes don't answer?"
        lede="Send it over. If it is quick, you will get an answer rather than a proposal."
      />
    </>
  );
}
