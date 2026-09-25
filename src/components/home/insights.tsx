import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/post-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

export async function Insights() {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section>
      <SectionHeading
        align="split"
        eyebrow="Insights"
        title="Notes from the research desk."
        lede="Practical method, written by the analysts doing the work. No thought leadership."
        action={
          <ButtonLink href="/blog" variant="outline">
            All insights
            <ArrowRight />
          </ButtonLink>
        }
      />

      <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3" stagger={0.06}>
        {posts.map((post) => (
          <RevealItem key={post.slug} className="h-full">
            <PostCard post={post} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
