import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/site/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms governing use of the ${site.name} website and the general conditions on which ${site.name} provides patent search, IP intelligence and related services.`,
  path: "/terms",
});

const host = new URL(site.url).hostname;
const office = `${site.address.short}, ${site.address.region} ${site.address.postalCode}, ${site.address.countryName}`;

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of these terms",
    body: [
      `These Terms & Conditions ("Terms") govern your use of ${host} (the "Site"), operated by ${site.legalName} ("${site.name}", "we", "us"), with its office at ${office}. By using the Site or sending us an enquiry, you agree to these Terms. If you do not agree, please do not use the Site.`,
      `If you are using the Site on behalf of a company or firm, you confirm that you are authorised to accept these Terms on its behalf.`,
    ],
  },
  {
    id: "services",
    heading: "Our services",
    body: [
      `${site.name} provides intellectual property research and support services, including patent searches, IP intelligence and landscaping, patent database strategy, drafting and prosecution support, licensing support, chemical safety intelligence and IP audits. Descriptions, turnaround times and examples on the Site are indicative and do not form an offer.`,
      `Every engagement is performed under a written proposal, statement of work or engagement letter that sets out its scope, fees, timelines and deliverables (an "Engagement Agreement"). If an Engagement Agreement conflicts with these Terms, the Engagement Agreement prevails.`,
    ],
  },
  {
    id: "no-legal-advice",
    heading: "Not legal advice",
    body: [
      `${site.name} is a research firm. Nothing on the Site, and no search report, analysis, chart or opinion we deliver, is legal advice, and no attorney–client, advocate–client or other privileged relationship is created by using the Site, contacting us or commissioning work, unless an Engagement Agreement expressly says otherwise.`,
      `Our deliverables are research products intended to support decisions made with qualified patent attorneys or agents. Decisions to file, prosecute, license, litigate, invest or launch a product remain yours and your counsel's.`,
    ],
  },
  {
    id: "search-limits",
    heading: "Nature and limits of search results",
    body: [
      `Patent and literature searching is constrained by the databases available, the quality of the source data, publication delays (patent applications are generally unpublished for 18 months after filing), language, and the scope and date cut-offs agreed for the engagement. No search can guarantee that every relevant document has been found.`,
      `Accordingly, we do not warrant that a search is exhaustive, that a patent is valid or invalid, or that a product is free from infringement. We do warrant that the work will be performed with reasonable skill and care, by qualified analysts, in line with the agreed scope.`,
    ],
  },
  {
    id: "fees",
    heading: "Quotes, fees and payment",
    body: [
      [
        "Quotes are valid for 30 days unless stated otherwise, and are based on the information in your brief. If the scope changes, we will tell you before doing work that affects the price or the date.",
        "Fees are exclusive of GST and other applicable taxes, which are charged at the prevailing rate.",
        "Unless the Engagement Agreement says otherwise, invoices are payable within 15 days of issue. We may require an advance for expedited work or for new clients.",
        "If an engagement is cancelled after work has begun, fees are payable for the work completed up to cancellation.",
      ],
    ],
  },
  {
    id: "client-obligations",
    heading: "Your responsibilities",
    body: [
      [
        "Provide accurate, complete information and the material we reasonably need to perform the work.",
        "Ensure you have the right to share any information or documents you send us.",
        "Review deliverables promptly and tell us of any concerns within the review period in the Engagement Agreement.",
      ],
    ],
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    body: [
      `We treat invention disclosures, claims, product information and other non-public material you share with us as confidential, whether or not an engagement follows, and use it only to scope or perform your work. We will sign a mutual non-disclosure agreement on request. These obligations do not apply to information that is public, already known to us, independently developed, or that we are required by law to disclose.`,
      `How we handle personal data is described in our Privacy Policy.`,
    ],
  },
  {
    id: "ip",
    heading: "Intellectual property",
    body: [
      `The Site and its content — text, graphics, logos, design and code — are owned by or licensed to ${site.name} and protected by copyright and trademark law. You may view and print pages for your own reference, but you may not copy, republish or commercially exploit Site content without our written permission.`,
      `On full payment, you receive the right to use the deliverables produced for you for your internal business and legal purposes. Unless the Engagement Agreement says otherwise, we retain ownership of our pre-existing methods, templates, tools and know-how, and may use anonymised, non-confidential learnings to improve our services.`,
    ],
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use of the Site",
    body: [
      `You agree not to:`,
      [
        "Use the Site for any unlawful purpose or in breach of these Terms.",
        "Attempt to gain unauthorised access to the Site, its servers or any connected system.",
        "Introduce malware, or scrape, overload or interfere with the Site's operation.",
        "Submit false, misleading or spam enquiries, or impersonate another person.",
      ],
    ],
  },
  {
    id: "third-party",
    heading: "Third-party links",
    body: [
      `The Site may link to third-party websites, databases or services. We do not control them and are not responsible for their content, availability or privacy practices.`,
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      `The Site is provided "as is" and "as available". To the fullest extent permitted by law, we exclude all warranties not expressly stated in these Terms or an Engagement Agreement.`,
      `To the fullest extent permitted by law, ${site.name} is not liable for any indirect, incidental, special or consequential loss, or for loss of profits, revenue, business, goodwill or data, arising from use of the Site or our services. Our total aggregate liability in connection with any engagement is limited to the fees you paid for that engagement. Nothing in these Terms limits liability that cannot be limited under applicable law.`,
    ],
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: [
      `You agree to indemnify ${site.name} against claims, losses and costs arising from your breach of these Terms, or from information or material you provided to us that you did not have the right to share.`,
    ],
  },
  {
    id: "law",
    heading: "Governing law and disputes",
    body: [
      `These Terms are governed by the laws of India. The parties will first try to resolve any dispute in good faith through discussion. Failing that, the courts at ${site.address.city}, ${site.address.region} have exclusive jurisdiction.`,
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      `We may update these Terms from time to time. The "last updated" date at the top of this page shows when they last changed. Continued use of the Site after a change means you accept the updated Terms. Changes do not affect Engagement Agreements already signed.`,
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: [
      `Questions about these Terms can be sent to:`,
      [
        `Email: ${site.email}`,
        `Phone: ${site.phone} (${site.hours.label})`,
        `Post: ${site.legalName}, ${office}`,
      ],
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms"
      updated="September 2026"
      intro={`The rules for using this site, and the general conditions on which ${site.name} takes on and delivers work.`}
      sections={sections}
    />
  );
}
