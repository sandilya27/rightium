import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { getPost, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const alt = `${site.name} Insights`;
export const size = ogSize;
export const contentType = ogContentType;

// Generated at build, then cached; refreshed daily.
export const revalidate = 86400;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgImage({
    eyebrow: post ? `Insights · ${post.category}` : "Insights",
    title: post?.title ?? site.tagline,
  });
}
