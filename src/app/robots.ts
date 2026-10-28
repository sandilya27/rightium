import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Development and preview deployments must stay out of search.
  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: ["/", "/api/media/file/"], disallow: ["/api/", "/admin", "/next/", "/ingest/"] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
