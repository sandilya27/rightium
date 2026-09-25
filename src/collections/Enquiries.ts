import type { CollectionConfig } from "payload";
import { authenticated } from "@/payload/access";

/**
 * Leads from the contact form. Nobody can create these through the
 * public REST API — only the /api/contact route can, after it has
 * validated the submission and checked Turnstile.
 */
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "service", "status", "createdAt"],
    listSearchableFields: ["name", "email", "company", "phone"],
    group: "Leads",
    description: "Briefs sent through the contact form. Update the status as each lead moves.",
  },
  defaultSort: "-createdAt",
  access: {
    read: authenticated,
    create: () => false,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text" },
        { name: "company", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "service", type: "text" },
        { name: "deadline", type: "text" },
      ],
    },
    { name: "message", type: "textarea", required: true },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Quoted", value: "quoted" },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" },
        { label: "Spam", value: "spam" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "notes",
      type: "textarea",
      admin: { position: "sidebar", description: "Internal only. Never shown to the client." },
    },
    {
      name: "source",
      type: "group",
      admin: { description: "Captured automatically when the form is sent." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "page", type: "text", admin: { readOnly: true } },
            { name: "country", type: "text", admin: { readOnly: true } },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "utmSource", type: "text", admin: { readOnly: true } },
            { name: "utmMedium", type: "text", admin: { readOnly: true } },
            { name: "utmCampaign", type: "text", admin: { readOnly: true } },
          ],
        },
      ],
    },
  ],
};
