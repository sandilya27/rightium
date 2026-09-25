import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

export const alt = `${site.name} Services`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({
    eyebrow: "Services",
    title: service?.title ?? site.tagline,
  });
}
