/**
 * Single source of truth for brand + nav.
 * Swap the values here and the whole site reskins.
 */

export const site = {
  name: "Rightium",
  legalName: "Rightium",
  tagline: "IP intelligence, delivered with evidence.",
  description:
    "Rightium is a Bengaluru-based IP research firm offering patent search, IP intelligence, patent database strategy, prosecution support, licensing, chemical safety intelligence and IP audits for corporate IP teams, law firms and R&D leaders.",
  url: "https://rightium.in",
  locale: "en_IN",
  email: "contact@rightium.in",
  phone: "+91 9606068707",
  /** Digits only, country code first — used for wa.me links. */
  whatsapp: "919606068707",
  address: {
    street: "C.B.I Main Road",
    locality: "Ganganagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560032",
    country: "IN",
    countryName: "India",
    /** One-line form used across the UI. */
    short: "C.B.I Main Road, Ganganagar, Bengaluru",
  },
  hours: {
    label: "Mon – Sat, 10:00 – 19:00 IST",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
  keywords: [
    "patent search India",
    "patent search Bengaluru",
    "patentability search",
    "novelty search",
    "invalidity search",
    "freedom to operate search",
    "FTO search",
    "patent landscaping",
    "patent analytics",
    "IP intelligence",
    "competitive intelligence",
    "patent drafting",
    "patent prosecution support",
    "patent licensing",
    "evidence of use charts",
    "IP due diligence",
    "IP audit",
    "chemical safety intelligence",
    "toxicology literature search",
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
  ],
} as const;

/**
 * Search engines are kept out until launch: set ALLOW_INDEXING=true in
 * the production environment (and redeploy) when the site goes public.
 */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";

export const telHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;
export const whatsappHref = `https://wa.me/${site.whatsapp}`;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = [
  { value: 12000, suffix: "+", label: "Projects delivered" },
  { value: 480, suffix: "+", label: "Clients served worldwide" },
  { value: 96, suffix: "%", label: "Repeat engagement rate" },
  { value: 48, suffix: "h", label: "Typical turnaround" },
] as const;

export const clients = [
  "Northwind Labs",
  "Kestrel Bio",
  "Halden Materials",
  "Arcadia IP",
  "Meridian Legal",
  "Volta Energy",
  "Tessera Devices",
  "Orion Pharma",
] as const;
