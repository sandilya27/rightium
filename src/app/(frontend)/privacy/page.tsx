import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/site/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, stores and protects personal data, and how to exercise your rights under India's Digital Personal Data Protection Act, 2023.`,
  path: "/privacy",
});

const host = new URL(site.url).hostname;
const office = `${site.address.short}, ${site.address.region} ${site.address.postalCode}, ${site.address.countryName}`;

const sections: LegalSection[] = [
  {
    id: "scope",
    heading: "Who we are and what this covers",
    body: [
      `${site.legalName} ("${site.name}", "we", "us") is an intellectual property research firm with its office at ${office}. We are the data fiduciary for personal data collected through ${host} (the "Site").`,
      `This policy explains what we collect when you visit the Site, send us an enquiry, or contact us by phone, WhatsApp or email, and what we do with it. Personal data we process while performing a signed engagement is additionally governed by the confidentiality and data-processing terms of that engagement.`,
    ],
  },
  {
    id: "what-we-collect",
    heading: "Information we collect",
    body: [
      `Information you give us directly:`,
      [
        "Contact details — your name, work email address, phone or WhatsApp number and company.",
        "Enquiry details — the service you are interested in, your deadline, and the message or brief you send.",
        "Anything you choose to share when you call, WhatsApp or email us, including attachments.",
      ],
      `Information collected automatically:`,
      [
        "Technical data such as IP address, browser type, device type, referring page and the pages you view, recorded in server and security logs.",
        "Signals used by our bot-protection provider (Cloudflare Turnstile) to distinguish people from automated traffic.",
        "Usage analytics — pages visited, links and buttons clicked, the campaign that brought you here (UTM tags), approximate location derived from your IP address, and device and browser type — collected with PostHog to understand how the Site is used.",
      ],
      `We do not use advertising trackers, we do not sell or share data with advertisers, we do not build marketing profiles, and we do not knowingly collect sensitive personal data such as financial, health or biometric information through the Site. Please do not send us such data unless an engagement specifically requires it.`,
    ],
  },
  {
    id: "how-we-use",
    heading: "How we use your information",
    body: [
      [
        "To respond to your enquiry, scope the work you have asked about and send you a quote.",
        "To perform and administer an engagement you have commissioned, including invoicing.",
        "To keep the Site secure, prevent spam and abuse, and diagnose technical problems.",
        "To comply with legal, accounting and regulatory obligations.",
      ],
      `We process personal data on the basis of your consent, which you give by submitting an enquiry or contacting us, and for the legitimate uses permitted under the Digital Personal Data Protection Act, 2023 — such as responding to a request you have made or complying with law. We do not sell your personal data, and we do not use it for purposes unrelated to the reason you gave it to us.`,
    ],
  },
  {
    id: "confidentiality",
    heading: "Confidentiality of briefs",
    body: [
      `Invention disclosures, claim sets, product details and other technical material you send in a brief are treated as confidential from the moment we receive them — whether or not an engagement follows. Access is limited to the analysts scoping or working on your matter. We are happy to sign a non-disclosure agreement before you share anything sensitive; ask at ${site.email}.`,
    ],
  },
  {
    id: "sharing",
    heading: "Who we share it with",
    body: [
      `We share personal data only with service providers who help us run the Site and our business, under contracts that require them to protect it and use it only on our instructions:`,
      [
        "Website hosting and content delivery (Vercel).",
        "Database hosting (Neon).",
        "File storage and bot protection (Cloudflare).",
        "Email delivery (Resend).",
        "Product analytics (PostHog).",
        "Professional advisers such as accountants and lawyers, where necessary.",
      ],
      `We may also disclose information where required by law, court order or a government authority, or to protect our rights, property or safety. Some of these providers process data outside India; where they do, we rely on transfers permitted under Indian law and on the provider's contractual safeguards.`,
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: [
      `The Site does not set advertising or cross-site tracking cookies. It uses:`,
      [
        "Strictly necessary cookies set by our bot-protection provider (Cloudflare Turnstile) to protect the contact form against automated abuse.",
        "First-party analytics cookies and local storage set by PostHog, which assign your browser a random identifier so we can count visits and understand which pages are useful. They are served from our own domain and are not used to track you on other websites.",
      ],
      `We honour your browser's "Do Not Track" setting: when it is switched on, analytics are not collected. You can also block or delete cookies in your browser settings; the Site will keep working.`,
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: [
      `Enquiries that do not lead to an engagement are kept for up to 24 months so that we can follow up on the conversation, then deleted. Records relating to an engagement are kept for as long as the engagement requires and afterwards for the period required by tax, accounting and other applicable laws. Security logs are kept for a short period, typically no longer than 90 days.`,
    ],
  },
  {
    id: "security",
    heading: "How we protect it",
    body: [
      `We use reasonable security practices consistent with the Information Technology Act, 2000 and the rules made under it — including encryption in transit, access controls limited to staff who need the data, and vetted service providers. No method of transmission or storage is completely secure, but if a personal data breach occurs we will notify affected individuals and the Data Protection Board of India as the law requires.`,
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: [
      `Subject to applicable law, you have the right to:`,
      [
        "Access a summary of the personal data we hold about you and how we have used it.",
        "Ask us to correct, complete or update inaccurate personal data.",
        "Ask us to erase personal data we no longer need to keep.",
        "Withdraw consent at any time — this does not affect processing already carried out.",
        "Nominate another person to exercise your rights in the event of your death or incapacity.",
        "Raise a grievance with us, and if it is not resolved, complain to the Data Protection Board of India.",
      ],
      `To exercise any of these rights, email ${site.email} with the subject line "Privacy request". We may need to verify your identity before acting, and we aim to respond within 30 days.`,
    ],
  },
  {
    id: "children",
    heading: "Children",
    body: [
      `The Site and our services are intended for businesses and professionals. We do not knowingly collect personal data from anyone under 18. If you believe a child has sent us personal data, contact us and we will delete it.`,
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      `We may update this policy from time to time. The "last updated" date at the top of this page shows when it last changed. Material changes will be highlighted on the Site.`,
    ],
  },
  {
    id: "contact",
    heading: "Grievance officer and contact",
    body: [
      `Questions, requests and complaints about this policy or about how we handle your personal data can be sent to our Grievance Officer:`,
      [
        `Email: ${site.email}`,
        `Phone: ${site.phone} (${site.hours.label})`,
        `Post: Grievance Officer, ${site.legalName}, ${office}`,
      ],
      `We will acknowledge a grievance within 48 hours and aim to resolve it within 30 days.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="September 2026"
      intro={`What ${site.name} collects when you visit this site or send us a brief, why we collect it, and the control you have over it.`}
      sections={sections}
    />
  );
}
