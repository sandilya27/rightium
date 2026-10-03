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
    <section className="relative isolate overflow-hidden border-t border-line bg-surface py-20 md:py-[120px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(45rem 28rem at 92% 62%, rgba(0,168,182,0.08), transparent 72%)",
        }}
      />
      <div className="shell">
        <SectionHead
          layout="split"
          eyebrow="Insights"
          title="Notes from the research desk."
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
