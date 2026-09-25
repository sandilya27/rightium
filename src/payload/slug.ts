import type { FieldHook, TextField } from "payload";

export const slugify = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

/** Fills the slug from `sourceField` when left blank, and normalises hand-typed ones. */
const formatSlug =
  (sourceField: string): FieldHook =>
  ({ value, data }) => {
    if (typeof value === "string" && value.trim()) return slugify(value);
    const source = data?.[sourceField];
    return typeof source === "string" ? slugify(source) : value;
  };

export function slugField(sourceField = "title"): TextField {
  return {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: `Used in the URL. Leave blank to generate it from the ${sourceField}.`,
    },
    hooks: { beforeValidate: [formatSlug(sourceField)] },
  };
}
