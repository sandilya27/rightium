import { getPosts } from "@/lib/posts";
import type { Post } from "@/lib/post";
import { InsightsDeck } from "@/components/home/insights-deck";
import { SectionHead } from "@/components/ui/section";
import { TextLink } from "@/components/ui/button";

export async function Insights() {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;
  const fallbackImages = ["/images/analysts.jpg", "/images/strategy.jpg", "/images/data.jpg"];

  const cards: InsightPost[] = posts.map((post, index) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readingMinutes: post.readingMinutes,
    author: { name: post.author.name },
    image: post.coverImage?.url ?? fallbackImages[index % fallbackImages.length],
  }));

  return (
    <section id="insights" aria-labelledby="insights-title" className="home-insights relative isolate scroll-mt-24 overflow-hidden border-t border-line py-20 md:py-[120px]">
      <div className="shell">
        <SectionHead
          layout="split"
          className="research-heading border-b border-line-strong pb-8 md:pb-10"
          maxWidth="max-w-none"
          title={<span id="insights-title">Notes from the research desk.</span>}
          action={<TextLink href="/blog">All insights</TextLink>}
        />

        <InsightsDeck posts={cards} />
      </div>
    </section>
  );
}

export type InsightPost = Pick<
  Post,
  "slug" | "title" | "excerpt" | "category" | "date" | "readingMinutes"
> & { author: Pick<Post["author"], "name">; image: string };
