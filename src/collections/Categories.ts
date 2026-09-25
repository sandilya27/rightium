import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/payload/access";
import { revalidate } from "@/payload/revalidate";
import { slugField } from "@/payload/slug";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Category", plural: "Categories" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
    group: "Content",
    description: "Filters shown on the Insights page.",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [{ name: "title", type: "text", required: true }, slugField("title")],
  hooks: {
    afterChange: [({ req }) => revalidate(req, ["/"], ["/blog"])],
    afterDelete: [({ req }) => revalidate(req, ["/"], ["/blog"])],
  },
};
