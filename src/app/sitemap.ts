import { getWorks } from "@/lib/works";
import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { workCanonicalPath } from "@/lib/seo";

/** Bump when static page copy changes materially. */
const STATIC_UPDATED = new Date("2026-09-25");

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, works] = await Promise.all([getPosts(), getWorks()]);

  const staticRoutes = ["", "/services", "/about", "/blog", "/work", "/contact", "/privacy", "/terms"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: route === "/work" ? new Date("2026-10-29") : STATIC_UPDATED,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : route === "/privacy" || route === "/terms" ? 0.3 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...works.filter(work => workCanonicalPath(work, posts).startsWith("/work/")).map((work) => ({
      url: `${site.url}/work/${work.slug}`,
      lastModified: work.updatedAt ? new Date(work.updatedAt) : STATIC_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
