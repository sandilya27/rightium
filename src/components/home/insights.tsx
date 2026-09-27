import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/post-card";
import { SectionHead } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";

export async function Insights() {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-surface border-t border-line py-20 md:py-[120px]">
      <div className="shell">
        <SectionHead
          layout="split"
          eyebrow="Insights"
          title="Notes from the research desk."
          action={<TextLink href="/blog">All insights</TextLink>}
        />

        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.09} className="h-full">
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
