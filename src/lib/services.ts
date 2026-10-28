/**
 * Service catalogue.
 *
 * Seven categories, each with the sub-services a client can order.
 * The category is the unit that gets a page (/services/[slug]); each
 * sub-service gets an anchor on that page (/services/[slug]#[item]),
 * which is what the header mega-menu links to.
 *
 * `cta` decides the card's action: "order" for fixed-scope work a
 * client can commission straight away, "contact" for engagements that
 * need a scoping conversation first. Both land on /contact with the
 * sub-service pre-selected.
 */

export type ServiceCta = "order" | "contact";

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  cta: ServiceCta;
};

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  summary: string;
  icon: IconKey;

  /** Duotone plate used on the practice page and the home reel. */

  image: string;
  turnaround: string;
  audience: string;
  items: ServiceItem[];
  deliverables: string[];
};

export type IconKey =
  | "search"
  | "bulb"
  | "database"
  | "library"
  | "license"
  | "atom"
  | "shield";

export const services: Service[] = [
  {
    slug: "search-solutions",
    index: "01",
    title: "Patent Search Services",
    short: "Know what exists before you file, launch or litigate.",
    summary:
      "Examiner-grade searching across patent and non-patent literature in 90+ jurisdictions. Every report ships with the search strings, the databases queried and the reasoning behind each exclusion — so your attorney can defend it, not just read it.",
    icon: "search",

    image: "/images/analysts.jpg",
    turnaround: "2–5 business days",
    audience: "In-house counsel, prosecution firms, founders",
    items: [
      {
        slug: "patentability-search",
        title: "Patentability or Novelty Search",
        description:
          "A patentability or novelty search compares your invention with published patent and non-patent literature before drafting. Receive ranked prior art and feature mapping to help your attorney assess the filing options.",
        cta: "order",
      },
      {
        slug: "invalidity-search",
        title: "Invalidity or Opposition Search",
        description:
          "Patent invalidity search services identify prior art relevant to a target claim set and its critical dates. References are mapped to claim elements for counsel reviewing an opposition, IPR or litigation matter.",
        cta: "order",
      },
      {
        slug: "patent-watch",
        title: "Patent Watch",
        description:
          "Patent watch services track competitor filings and legal-status changes across the agreed patent offices. Set the competitors, technology scope and reporting frequency so alerts support your team's ongoing review.",
        cta: "order",
      },
      {
        slug: "fto-search",
        title: "Freedom to Operate (FTO) Search",
        description:
          "A freedom to operate search reviews potentially relevant patent claims and legal status in your intended markets. Share the product features, launch plans and jurisdictions so your counsel can assess potential infringement risks; a search does not guarantee clearance.",
        cta: "order",
      },
      {
        slug: "knockout-search",
        title: "Knockout Search",
        description:
          "A patent knockout search is an initial, focused prior art review for an early filing decision. It highlights close references and questions that may warrant a fuller patentability search.",
        cta: "contact",
      },
      {
        slug: "state-of-the-art-search",
        title: "State of the Art Search",
        description:
          "A state of the art patent search maps published approaches in a defined technology field. Use the research to compare technical directions and frame R&D questions before narrowing the search to a specific invention.",
        cta: "contact",
      },
    ],
    deliverables: [
      "Ranked art with claim-by-claim relevance mapping",
      "Full search log: strings, classes, databases, date ranges",
      "Attorney-ready summary with an explicit opinion",
      "Editable working file (XLSX) alongside the report",
    ],
  },
  {
    slug: "intelligence-solutions",
    index: "02",
    title: "Patent Landscaping & Competitive Intelligence",
    short: "See the whole field, not just your corner of it.",
    summary:
      "Landscapes, competitor tracking and technology scouting rendered as decisions rather than charts. We normalise assignee data, cluster by real technical problems instead of raw CPC codes, and tell you where the room to move actually is.",
    icon: "bulb",

    image: "/images/strategy.jpg",
    turnaround: "1–4 weeks",
    audience: "CTOs, strategy teams, IP portfolio managers",
    items: [
      {
        slug: "quick-lens",
        title: "Quick Lens",
        description:
          "Rapid IP and technology research that pairs AI-driven analysis with expert review for a fast, reliable read.",
        cta: "order",
      },
      {
        slug: "landscaping",
        title: "Patent Landscape Analysis",
        description:
          "Patent landscape analysis maps a technology domain by assignee, patent family, technical theme and geography. A cleaned dataset and executive findings help R&D teams assess competitive activity and areas for further investigation.",
        cta: "order",
      },
      {
        slug: "competitive-intelligence",
        title: "Patent Competitive Intelligence",
        description:
          "Patent competitive intelligence follows a rival's filing patterns, inventor activity and technology focus over time. Define the competitors and research questions to distinguish observed patent activity from strategic interpretation.",
        cta: "order",
      },
      {
        slug: "innovation-scouting",
        title: "Technology & Innovation Scouting",
        description:
          "Surface emerging technologies, partners and acquisition targets in a defined problem space.",
        cta: "order",
      },
    ],
    deliverables: [
      "Interactive dashboard plus a static executive deck",
      "Cleaned, deduplicated dataset you keep",
      "Findings with explicit strategic recommendations",
      "Quarterly refresh option",
    ],
  },
  {
    slug: "patent-database-strategy",
    index: "03",
    title: "Patent Database Strategy",
    short: "Pick the right database, and move to it without losing a thing.",
    summary:
      "Every team's database needs are different — coverage, workflow, integrations, budget. We evaluate the options against how your team actually searches, then plan and run the migration so nothing falls through between systems.",
    icon: "database",

    image: "/images/data.jpg",
    turnaround: "2–6 weeks",
    audience: "IP operations, search teams, knowledge managers",
    items: [
      {
        slug: "database-evaluation",
        title: "Patent Database Evaluation",
        description:
          "Compare databases against your technical requirements and long-term business objectives.",
        cta: "order",
      },
      {
        slug: "database-migration",
        title: "Patent Database Migration",
        description:
          "Move saved searches, alerts and collections to a new platform without disrupting day-to-day work.",
        cta: "contact",
      },
    ],
    deliverables: [
      "Weighted scoring matrix across shortlisted platforms",
      "Coverage and query-parity test results",
      "Migration plan with rollback points",
      "Team walkthrough on the new system",
    ],
  },
  {
    slug: "prep-and-prosecution",
    index: "04",
    title: "Prep & Prosecution",
    short: "Drafting and filing capacity that reads like your own team.",
    summary:
      "Technically trained drafters, paralegals and docketing specialists who work inside your templates and your deadlines. We take the volume off your associates without handing back work that needs rebuilding.",
    icon: "library",

    image: "/images/executive.jpg",
    turnaround: "3–7 business days",
    audience: "Law firms, corporate prosecution teams",
    items: [
      {
        slug: "prosecution",
        title: "Patent Prosecution Support",
        description:
          "Office action analysis, response strategy and drafted arguments for your attorney to review and sign.",
        cta: "contact",
      },
      {
        slug: "drafting",
        title: "Patent Drafting Support",
        description:
          "Patent drafting support turns invention disclosures into specifications and claim sets for attorney review. Share the technical details, known prior art and target jurisdictions so the draft fits your filing strategy.",
        cta: "order",
      },
      {
        slug: "paralegal-support",
        title: "Patent Paralegal Support",
        description:
          "Formalities, filings and correspondence handled so your IP team stays focused on substance.",
        cta: "order",
      },
      {
        slug: "docketing-support",
        title: "Patent Docketing Support",
        description:
          "Reliable deadline tracking and record-keeping across every matter and jurisdiction you hold.",
        cta: "order",
      },
    ],
    deliverables: [
      "Draft in your firm's template, tracked changes on",
      "Figures in editable source format",
      "Filing receipts and docket-ready confirmations",
      "Named point of contact across the matter",
    ],
  },
  {
    slug: "licensing",
    index: "05",
    title: "Patent Licensing Research",
    short: "Turn a dormant portfolio into a revenue line.",
    summary:
      "Evidence of use built to the standard a licensing negotiation actually demands. We find the assets worth asserting, map claims to real products, cite the public proof, and shape prosecution so future claims read on the market.",
    icon: "license",

    image: "/images/agreement.jpg",
    turnaround: "5–10 business days",
    audience: "Licensing teams, universities, IP funds, litigation funders",
    items: [
      {
        slug: "portfolio-mining",
        title: "Patent Portfolio Mining",
        description:
          "Find the high-value assets in your portfolio and rank them by licensing potential.",
        cta: "order",
      },
      {
        slug: "evidence-of-use",
        title: "Evidence of Use (EoU) Claim Charts",
        description:
          "Evidence of use claim chart services map patent claim elements to documented product features. Charts include source citations and identify evidence gaps for your counsel's review before licensing negotiations or enforcement decisions.",
        cta: "order",
      },
      {
        slug: "directed-prosecution",
        title: "Directed Prosecution",
        description:
          "Steer pending claims toward products in the market, so prosecution serves your business goals.",
        cta: "contact",
      },
    ],
    deliverables: [
      "Claim charts in your preferred template",
      "Source pack with archived citations",
      "Asset ranking and target prioritisation matrix",
      "Optional rebuttal analysis for counter-arguments",
    ],
  },
  {
    slug: "chemical-safety-intelligence",
    index: "06",
    title: "Chemical Safety Intelligence",
    short: "Toxicology and regulatory evidence, found fast and read properly.",
    summary:
      "Chemical search that combines automation with toxicologists' judgement. We screen public and regulatory databases, synthesise endpoints and hazard data, and deliver safety assessments your regulatory team can file against.",
    icon: "atom",

    image: "/images/portrait.jpg",
    turnaround: "3–10 business days",
    audience: "Regulatory affairs, product stewardship, EHS teams",
    items: [
      {
        slug: "rapid-tox-data-search",
        title: "Rapid Tox Data Search",
        description:
          "Automated chemical search checked by experts, so your team can move on the results with confidence.",
        cta: "order",
      },
      {
        slug: "literature-search",
        title: "Toxicology Literature Search",
        description:
          "Toxicology literature search services identify scientific and regulatory evidence for agreed substances and endpoints. Receive source citations, endpoint summaries and a database coverage log for your regulatory team's assessment.",
        cta: "order",
      },
      {
        slug: "chemical-safety-report",
        title: "Chemical Safety Report",
        description:
          "In-depth safety evaluations that combine data mining with toxicological and regulatory risk assessment.",
        cta: "order",
      },
    ],
    deliverables: [
      "Endpoint summary tables with source citations",
      "Database coverage log",
      "Hazard and risk narrative by a qualified toxicologist",
      "Report formatted for regulatory submission",
    ],
  },
  {
    slug: "ip-consulting-and-audit",
    index: "07",
    title: "IP Consulting & Audit",
    short: "An outside view of how your IP function really runs.",
    summary:
      "Structured audits of strategy, process and assets. We look at how IP decisions get made, how inventions move from disclosure to grant to enforcement, and which assets carry the value — then tell you plainly what to change.",
    icon: "shield",

    image: "/images/analysts.jpg",
    turnaround: "Scoped per engagement",
    audience: "General counsel, CIPOs, boards and investors",
    items: [
      {
        slug: "ip-strategy-audit",
        title: "IP Strategy Audit",
        description:
          "Review how IP is managed and governed across the organisation, and where oversight is missing.",
        cta: "contact",
      },
      {
        slug: "ip-process-audit",
        title: "IP Process Audit",
        description:
          "Assess the processes for creating, maintaining and enforcing IP, and fix the ones that leak value.",
        cta: "contact",
      },
      {
        slug: "ip-asset-audit",
        title: "IP Asset Audit",
        description:
          "Identify your most valuable IP assets and how to protect and extract value from them.",
        cta: "contact",
      },
    ],
    deliverables: [
      "Current-state assessment with evidence",
      "Prioritised recommendations with owners",
      "Asset register and valuation notes",
      "Board-ready summary deck",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Every sub-service, flattened, with its parent category attached. */
/** Total number of orderable sub-services across every practice. */
export const serviceCount = services.reduce((n, s) => n + s.items.length, 0);

export const serviceItems = services.flatMap((s) =>
  s.items.map((item) => ({ ...item, category: s })),
);

export function serviceItemHref(category: Service, item: ServiceItem) {
  return `/services/${category.slug}#${item.slug}`;
}

export function serviceCtaHref(item: ServiceItem) {
  return `/contact?service=${item.slug}${item.cta === "order" ? "&intent=order" : ""}`;
}

export const serviceCtaLabel: Record<ServiceCta, string> = {
  order: "Order now",
  contact: "Contact us",
};

export const process = [
  {
    step: "01",
    title: "Scope the question",
    body: "A 20-minute call, or a written brief. We agree the exact question, the scope, the sources and the deadline before anything starts. No open-ended retainers.",
    outcomes: ["Written scope", "Fixed fee", "Agreed deadline"],
  },
  {
    step: "02",
    title: "Research and review",
    body: "A domain-matched analyst runs the work; a second reviewer challenges it. You get a mid-point checkpoint on anything over a week, so direction changes cost hours, not weeks.",
    outcomes: ["Domain-matched analyst", "Adversarial second review", "Mid-point checkpoint"],
  },
  {
    step: "03",
    title: "Deliver with the evidence",
    body: "The report, the raw data, and the full search log — so your team can verify every conclusion or extend the work themselves. Revisions inside scope are free.",
    outcomes: ["Report + raw data", "Full search log", "Free in-scope revisions"],
  },
];

export const proofs = [
  {
    sector: "Semiconductors",
    image: "/images/analysts.jpg",
    title: "Invalidated a blocking claim set three weeks before trial",
    body: "A US fabless client faced an assertion on a packaging patent. Our invalidation search surfaced a Japanese utility model from 1998 that no prior search had reached, and the matter settled on the client's terms.",
    metric: "$4.2M",
    metricLabel: "Exposure removed",
  },
  {
    sector: "Specialty chemicals",
    image: "/images/data.jpg",
    title: "Hazard data on 40 substances ahead of a registration deadline",
    body: "A literature search across 80+ public and regulatory databases, with every endpoint reviewed by a toxicologist. The chemical safety report went into the submission unchanged, eleven days after the brief.",
    metric: "40",
    metricLabel: "Substances assessed",
  },
  {
    sector: "Clean energy",
    image: "/images/strategy.jpg",
    title: "A landscape that became the R&D roadmap",
    body: "Landscaping across 41,000 filings in grid-scale storage resolved into six under-claimed clusters. Three are now funded programmes, and the first filings in two of them have granted.",
    metric: "6",
    metricLabel: "Open clusters found",
  },
  {
    sector: "Consumer devices",
    image: "/images/agreement.jpg",
    title: "Turned a dormant portfolio into a licensing programme",
    body: "Portfolio mining ranked 600 families down to 22 worth asserting; evidence of use then charted them against 19 shipping products with archived public sources. The package opened negotiations with four manufacturers in the first quarter.",
    metric: "19",
    metricLabel: "Products charted",
  },
];
