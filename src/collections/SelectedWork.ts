import type { CollectionConfig } from "payload";
import { authenticated, publishedOrAuthenticated } from "@/payload/access";
import { revalidate } from "@/payload/revalidate";
import { slugField } from "@/payload/slug";

export const SelectedWork: CollectionConfig = {
  slug: "selected-work",
  labels: { singular: "Case study", plural: "Selected Work" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "sector", "sortOrder", "_status"],
    description: "Homepage cards and full case studies at /work.",
    preview: (doc) => doc?.slug ? `/next/preview?path=/work/${doc.slug}` : null,
  },
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 20 },
  defaultSort: "sortOrder",
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    { name: "sector", type: "text", required: true },
    { name: "excerpt", type: "textarea", required: true, maxLength: 600, admin: { description: "Short description shown in the card preview." } },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "fallbackImage", type: "select", options: ["/images/analysts.jpg", "/images/data.jpg", "/images/strategy.jpg", "/images/agreement.jpg"], defaultValue: "/images/analysts.jpg", admin: { description: "Used until a cover image is uploaded." } },
    { name: "metric", type: "text", required: true },
    { name: "metricLabel", type: "text", required: true },
    { name: "content", type: "richText", required: true, admin: { description: "Full case study: add headings, paragraphs, lists and images, just like an Insight." } },
    { name: "sortOrder", type: "number", required: true, defaultValue: 0, admin: { position: "sidebar", description: "Lower numbers appear first on the homepage." } },
  ],
  hooks: {
    afterChange: [({ doc, previousDoc, req }) => {
      if (doc._status === "published" || previousDoc?._status === "published") {
        revalidate(req, ["/", "/work", "/sitemap.xml", ...[doc.slug, previousDoc?.slug].filter(Boolean).map(slug => `/work/${slug}`)]);
      }
      return doc;
    }],
    afterDelete: [({ doc, req }) => {
      revalidate(req, ["/", "/work", "/sitemap.xml", `/work/${doc.slug}`]);
      return doc;
    }],
  },
};
