import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Pre-launch: keep every crawler out (see ALLOW_INDEXING in src/lib/site.ts).
  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/next/"] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
