/**
 * The article shape the blog UI renders, plus formatting helpers.
 * Client-safe: no CMS imports, so client components can use it without
 * pulling Payload into the browser bundle. Data comes from ./posts.ts.
 */

import type { Post as PayloadPost } from "@/payload-types";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingMinutes: number;
  author: { name: string; role: string };
  coverImage: { url: string; alt: string; width?: number; height?: number } | null;
  seo: { title?: string; description?: string };
  /** Lexical rich text; only loaded by `getPost`. */
  content: PayloadPost["content"] | null;
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
