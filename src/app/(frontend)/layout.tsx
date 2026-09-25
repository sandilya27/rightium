import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site/site-shell";
import { allowIndexing, site } from "@/lib/site";

const defaultTitle = `${site.name} — Patent Search & IP Intelligence Firm in Bengaluru`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Intellectual property services",
  formatDetection: { email: false, address: false, telephone: false },
  robots: allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": site.address.city,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0630",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell>{children}</SiteShell>;
}
