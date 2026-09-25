import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/payload/access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the image for screen readers and search engines." },
    },
  ],
  upload: {
    mimeTypes: ["image/*"],
    // Cropping and focal points need `sharp` wired into the Payload config.
    crop: false,
    focalPoint: false,
  },
};
