import type { SelectedWork, Media } from "@/payload-types";
import type { Work } from "./work";
import { cmsEnabled } from "./cms";
import { seedWork } from "@/seed/work";

async function client() {
  const [{ getPayload }, { default: config }] = await Promise.all([import("payload"), import("@payload-config")]);
  return getPayload({ config });
}

function toWork(doc: SelectedWork): Work {
  const image = doc.coverImage && typeof doc.coverImage === "object" ? doc.coverImage as Media : null;
  return {
    slug: doc.slug, title: doc.title, sector: doc.sector,
    body: doc.excerpt, metric: doc.metric, metricLabel: doc.metricLabel,
    image: image?.url || doc.fallbackImage || "/images/analysts.jpg",
    fallbackImage: doc.fallbackImage || "/images/analysts.jpg",
    imageAlt: image?.alt || "",
    content: doc.content, updatedAt: doc.updatedAt,
  };
}

function fallback(): Work[] {
  return seedWork.map(doc => ({
    slug: doc.slug, title: doc.title, sector: doc.sector,
    body: doc.excerpt, metric: doc.metric, metricLabel: doc.metricLabel,
    image: doc.fallbackImage, fallbackImage: doc.fallbackImage, imageAlt: "", content: doc.content as Work["content"],
  }));
}

export async function getWorks(): Promise<Work[]> {
  if (!cmsEnabled) return fallback().map(doc => ({ ...doc, content: null }));
  const payload = await client();
  const { docs } = await payload.find({
    collection: "selected-work", where: { _status: { equals: "published" } },
    sort: "sortOrder", depth: 1, pagination: false, limit: 200, overrideAccess: false,
    select: { slug: true, title: true, sector: true, excerpt: true, metric: true, metricLabel: true, coverImage: true, fallbackImage: true, updatedAt: true },
  });
  return docs.map(doc => ({ ...toWork(doc as SelectedWork), content: null }));
}

export async function getWork(slug: string, { draft = false } = {}): Promise<Work | undefined> {
  if (!cmsEnabled) return fallback().find(doc => doc.slug === slug);
  const payload = await client();
  const { docs } = await payload.find({
    collection: "selected-work",
    where: draft ? { slug: { equals: slug } } : { slug: { equals: slug }, _status: { equals: "published" } },
    draft, overrideAccess: draft, depth: 2, limit: 1, pagination: false,
  });
  return docs[0] ? toWork(docs[0]) : undefined;
}
