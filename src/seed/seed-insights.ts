import type { Payload, PayloadRequest } from "payload";
import { seedPosts, toLexical } from "./insights";
import { slugify } from "../payload/slug";

/**
 * Loads the launch set of Insights articles (with their authors and
 * categories) into the CMS. Called from a database migration on the
 * first deploy. Skips itself if any articles already exist, so it never
 * duplicates content.
 */
export async function seedInsights({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const existing = await payload.count({ collection: "posts", req });
  if (existing.totalDocs > 0) {
    payload.logger.info("Insights already present — seed skipped.");
    return;
  }

  // Seeding runs outside a Next.js request, so skip cache purges.
  const context = { disableRevalidate: true };

  const categoryIds = new Map<string, number>();
  for (const title of new Set(seedPosts.map((p) => p.category))) {
    const doc = await payload.create({
      collection: "categories",
      data: { title, slug: slugify(title) },
      context,
      req,
    });
    categoryIds.set(title, doc.id);
  }

  const authorIds = new Map<string, number>();
  for (const { name, role } of seedPosts.map((p) => p.author)) {
    if (authorIds.has(name)) continue;
    const doc = await payload.create({ collection: "authors", data: { name, role }, context, req });
    authorIds.set(name, doc.id);
  }

  for (const post of seedPosts) {
    await payload.create({
      collection: "posts",
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        publishedAt: new Date(`${post.date}T09:00:00+05:30`).toISOString(),
        category: categoryIds.get(post.category)!,
        author: authorIds.get(post.author.name)!,
        // The generated rich-text type is broader than what we build here.
        content: toLexical(post.body) as never,
        _status: "published",
      },
      context,
      req,
    });
  }

  payload.logger.info(`Seeded ${seedPosts.length} Insights articles.`);
}
