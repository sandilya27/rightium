import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/payload/access";
import { revalidate } from "@/payload/revalidate";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "updatedAt"],
    group: "Content",
    description: "People credited on Insights articles.",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "text",
      required: true,
      admin: { description: "e.g. Head of Search Practice" },
    },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "bio", type: "textarea" },
  ],
  hooks: {
    afterChange: [({ req }) => revalidate(req, ["/"], ["/blog"])],
    afterDelete: [({ req }) => revalidate(req, ["/"], ["/blog"])],
  },
};
