/**
 * Structured data (schema.org JSON-LD) helpers.
 *
 * Every builder reads from `site`, so correcting an address or phone
 * number there updates what search engines see as well.
 */

import type { Metadata } from "next";
import { site } from "@/lib/site";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Keep search snippets concise without cutting a word in half. */
export function searchDescription(value: string): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= 160) return clean;
  const cut = clean.slice(0, 157);
  const boundary = cut.lastIndexOf(" ");
  return `${boundary > 0 ? cut.slice(0, boundary) : cut}…`;
}

/**
 * Per-page metadata with a canonical URL and matching Open Graph /
 * Twitter tags. Next.js does not copy a page's `title` into og:title,
 * so without this every shared link would show the homepage title.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  noIndex?: boolean;
}): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  const snippet = searchDescription(description);
  const shareImage = image ?? { url: "/opengraph-image", alt: `${site.name} — IP research and intelligence`, width: 1200, height: 630 };
  const images = [{ ...shareImage, url: absoluteUrl(shareImage.url) }];
  return {
    title: path === "/" ? { absolute: title } : title,
    description: snippet,
    alternates: { canonical: absoluteUrl(path) },
    ...(noIndex && { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } }),
    ...(authors && { authors: authors.map(name => ({ name })) }),
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description: snippet,
      images,
      ...(type === "article" && { publishedTime, modifiedTime, authors, section }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: snippet, images },
  };
}

const ORG_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

export const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${site.address.street}, ${site.address.locality}`,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

/** The business itself: an IP research firm with a Bengaluru office. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: postalAddress,
    areaServed: "Worldwide",
    priceRange: "₹₹₹",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone,
        email: site.email,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: site.keywords,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: site.url,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: {
  slug: string;
  title: string;
  summary: string;
  items: { title: string; description: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.title,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.title, description: item.description },
      })),
    },
  };
}

export function articleJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  category: string;
  author: { name: string; role: string };
  coverImage?: { url: string } | null;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(post.coverImage?.url ?? "/opengraph-image"),
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    articleSection: post.category,
    inLanguage: "en-IN",
    author: post.author.name === "Rightium Team" || post.author.name === site.name
      ? { "@type": "Organization", name: post.author.name, url: absoluteUrl("/about"), parentOrganization: { "@id": ORG_ID } }
      : { "@type": "Person", name: post.author.name, jobTitle: post.author.role, worksFor: { "@id": ORG_ID } },
    publisher: { "@id": ORG_ID },
  };
}

export function workJsonLd(work: { slug: string; title: string; body: string; sector: string; image: string; updatedAt?: string }) {
  const url = absoluteUrl(`/work/${work.slug}`);
  return {
    "@context": "https://schema.org", "@type": "Article", "@id": `${url}#article`,
    headline: work.title, description: work.body, url, mainEntityOfPage: url,
    image: absoluteUrl(work.image), articleSection: work.sector, inLanguage: "en-IN",
    ...(work.updatedAt && { dateModified: work.updatedAt }),
    author: { "@id": ORG_ID }, publisher: { "@id": ORG_ID },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Renders one JSON-LD block. `<` is escaped so copy can never close the tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
