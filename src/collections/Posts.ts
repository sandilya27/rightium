import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from "payload";
import { authenticated, publishedOrAuthenticated } from "@/payload/access";
import { revalidate } from "@/payload/revalidate";
import { slugField } from "@/payload/slug";

type LexicalNode = { text?: string; children?: LexicalNode[] };

function countWords(node: LexicalNode | undefined): number {
  if (!node) return 0;
  const own = node.text ? node.text.trim().split(/\s+/).filter(Boolean).length : 0;
  return own + (node.children ?? []).reduce((sum, child) => sum + countWords(child), 0);
}

// A cached article is tagged with its exact path, so purge that path.
// (Its share image keeps its own cache and refreshes within a day.)
const articlePaths = (...slugs: (string | null | undefined)[]) =>
  slugs.filter((slug): slug is string => Boolean(slug)).map((slug) => `/blog/${slug}`);

const listingPages = ["/", "/blog", "/sitemap.xml"];

const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  // Draft autosaves don't touch the live site; publishing or unpublishing does.
  const wasLive = previousDoc?._status === "published";
  const isLive = doc._status === "published";
  if (!wasLive && !isLive) return doc;

  revalidate(req, [...listingPages, ...articlePaths(doc.slug, previousDoc?.slug)]);
  return doc;
};

const revalidateDeletedPost: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidate(req, [...listingPages, ...articlePaths(doc?.slug)]);
  return doc;
};

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Insight", plural: "Insights" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "author", "publishedAt", "_status"],
    group: "Content",
    description: "Articles published at /blog.",
    preview: (doc) => (doc?.slug ? `/next/preview?path=/blog/${doc.slug}` : null),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: { autosave: { interval: 2000 } },
    maxPerDoc: 20,
  },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 300,
      admin: {
        description: "One or two sentences. Shown on cards, in search results and when shared.",
      },
    },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "content", type: "richText", required: true },
    {
      name: "seo",
      type: "group",
      label: "SEO overrides",
      admin: { description: "Optional. Leave blank to use the title and excerpt." },
      fields: [
        { name: "metaTitle", type: "text", maxLength: 70 },
        { name: "metaDescription", type: "textarea", maxLength: 170 },
      ],
    },
    slugField("title"),
    {
      name: "publishedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "readingMinutes",
      type: "number",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Calculated from the article length.",
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) =>
            Math.max(1, Math.round(countWords(siblingData?.content?.root) / 220)),
        ],
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDeletedPost],
  },
};
