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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Analytics are proxied through our own domain so ad blockers don't
  // silently drop them.
  skipTrailingSlashRedirect: true,

  // Preserve matching URLs from the WordPress site when the replacement launches.
  async redirects() {
    return [
      ...["/insights", "/insights/"].map(source => ({ source, destination: "/blog", permanent: true })),
      ...["/practice-area/intellectual-property-rights-ipr", "/practice-area/intellectual-property-rights-ipr/"].map(source => ({ source, destination: "/services", permanent: true })),
    ];
  },

  // Public production pages are indexable; previews and private endpoints are not.
  async headers() {
    const allowIndexing = process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview";
    if (allowIndexing) return ["/admin/:path*", "/next/:path*", "/ingest/:path*", "/api/:path((?!media/file/).*)"].map(source => ({
      source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
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
