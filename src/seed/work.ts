import { proofs } from "../lib/services";
import { slugify } from "../payload/slug";
import { toLexical } from "./insights";

export const seedWork = proofs.map((proof, sortOrder) => ({
  title: proof.title,
  slug: slugify(proof.title),
  sector: proof.sector,
  excerpt: proof.body,
  fallbackImage: proof.image,
  metric: proof.metric,
  metricLabel: proof.metricLabel,
  sortOrder,
  content: toLexical([
    { type: "h2", text: "The engagement" },
    { type: "p", text: proof.body },
    { type: "h2", text: "The outcome" },
    { type: "p", text: `${proof.metricLabel}: ${proof.metric}.` },
  ]),
}));

