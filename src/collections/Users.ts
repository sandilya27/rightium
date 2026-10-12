import { APIError, type CollectionConfig } from "payload";
import { authenticated } from "@/payload/access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Admin user", plural: "Admin users" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "updatedAt"],
    group: "Settings",
  },
  auth: {
    // Lock the account for 10 minutes after 5 failed sign-ins.
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeValidate: [({ data, operation, req }) => {
      const adminEmail = process.env.CMS_ADMIN_EMAIL?.trim().toLowerCase();
      if (operation === "create" && !req.user && adminEmail &&
          data?.email?.trim().toLowerCase() !== adminEmail) {
        throw new APIError("Use the configured administrator email to finish CMS setup.", 403);
      }
      return data;
    }],
  },
  fields: [{ name: "name", type: "text" }],
};
