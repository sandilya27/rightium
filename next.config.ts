import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// PostHog ingestion host for the project's region: us.i.posthog.com or eu.i.posthog.com.
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const posthogAssets = posthogHost.replace(".i.posthog.com", "-assets.i.posthog.com");

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts (site + Payload admin) need a routing-level 404.
    globalNotFound: true,
  },
  images: {
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/api/media/file/**" }],
  },
  // Analytics are proxied through our own domain so ad blockers don't
  // silently drop them.
  skipTrailingSlashRedirect: true,

  // Pre-launch: every response carries noindex, including images and
  // files that meta tags can't cover. Set ALLOW_INDEXING=true to lift it.
  async headers() {
    if (process.env.ALLOW_INDEXING === "true") return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: `${posthogAssets}/static/:path*` },
      { source: "/ingest/array/:path*", destination: `${posthogAssets}/array/:path*` },
      { source: "/ingest/:path*", destination: `${posthogHost}/:path*` },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
