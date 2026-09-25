/**
 * Insights data adapter.
 *
 * Everything the blog UI needs goes through `getPosts` / `getPost`.
 * With the CMS connected they read published articles from Payload
 * (Neon Postgres); before that (preview mode) they serve the built-in
 * launch set, so the site is complete either way. Components only ever
 * see the `Post` shape.
 */

import type { Author, Category, Media, Post as PayloadPost } from "@/payload-types";
import type { Post } from "@/lib/post";
import { cmsEnabled } from "@/lib/cms";
import { seedPosts, toLexical } from "@/seed/insights";

export type { Post } from "@/lib/post";
export { formatDate } from "@/lib/post";

/** Preview mode: the launch articles, shaped like CMS output. */
function seedPostsAsPosts(): Post[] {
  return seedPosts
    .map((p) => {
      const words = p.body
        .flatMap((b) => (b.type === "list" ? b.items : [b.text]))
        .join(" ")
        .split(/\s+/).length;
      return {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        date: new Date(`${p.date}T09:00:00+05:30`).toISOString(),
        readingMinutes: Math.max(1, Math.round(words / 220)),
        author: p.author,
        coverImage: null,
        seo: {},
        content: toLexical(p.body) as Post["content"],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function payloadClient() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  return getPayload({ config });
}

const populated = <T extends object>(value: number | T | null | undefined): T | null =>
  value && typeof value === "object" ? value : null;

function toPost(doc: PayloadPost): Post {
  const category = populated<Category>(doc.category);
  const author = populated<Author>(doc.author);
  const cover = populated<Media>(doc.coverImage);

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: category?.title ?? "Insights",
    date: doc.publishedAt,
    readingMinutes: doc.readingMinutes ?? 1,
    author: { name: author?.name ?? "Rightium", role: author?.role ?? "" },
    coverImage: cover?.url
      ? {
          url: cover.url,
          alt: cover.alt,
          width: cover.width ?? undefined,
          height: cover.height ?? undefined,
        }
      : null,
    seo: {
      title: doc.seo?.metaTitle || undefined,
      description: doc.seo?.metaDescription || undefined,
    },
    content: doc.content ?? null,
  };
}

/** Published articles, newest first, without their body. */
export async function getPosts(): Promise<Post[]> {
  if (!cmsEnabled) return seedPostsAsPosts().map((p) => ({ ...p, content: null }));
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
    limit: 200,
    pagination: false,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      author: true,
      coverImage: true,
      publishedAt: true,
      readingMinutes: true,
      seo: true,
    },
  });
  return docs.map((doc) => toPost(doc as PayloadPost));
}

/**
 * One article with its body. `draft: true` (preview mode, signed-in
 * editors only) returns the latest unpublished version.
 */
export async function getPost(slug: string, { draft = false } = {}): Promise<Post | undefined> {
  if (!cmsEnabled) return seedPostsAsPosts().find((p) => p.slug === slug);
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: draft ? { slug: { equals: slug } } : { slug: { equals: slug }, _status: { equals: "published" } },
    draft,
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
  });
  return docs[0] ? toPost(docs[0]) : undefined;
}
