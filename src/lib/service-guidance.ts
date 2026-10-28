import type { Faq } from "@/lib/content";

type Guidance = {
  questions: Faq[];
  related: { label: string; href: string }[];
  resource?: { label: string; href: string };
};

/** Each answer belongs to its service page; related links connect distinct buyer tasks. */
export const serviceGuidance: Record<string, Guidance> = {
  "search-solutions": {
    questions: [
      { q: "What is the difference between a patentability search and a freedom to operate search?", a: "A patentability search compares an invention with prior art to inform a filing decision. A freedom to operate search examines potentially relevant patent claims in intended markets to support a product-launch review. The two answer different questions; findings need to be assessed in the context of your invention or product." },
      { q: "What should a patent search brief include?", a: "Include the technical features, the decision the search should support, known references and the deadline. For invalidity work, identify the target claims and relevant dates. For FTO research, specify the product configuration and intended markets. Agree the scope and report format before research starts." },
    ],
    related: [
      { label: "Use the patent search brief template", href: "/resources/patent-search-brief.md" },
      { label: "Patent drafting support after a novelty search", href: "/services/prep-and-prosecution#drafting" },
      { label: "Patent landscape analysis for a broader technology review", href: "/services/intelligence-solutions#landscaping" },
    ],
    resource: { label: "IP India: official patent information and search access", href: "https://ipindia.gov.in/" },
  },
  "intelligence-solutions": {
    questions: [{ q: "What does a patent landscape analysis report include?", a: "A patent landscape report maps a defined technology field using patent-family, assignee, technical-theme and geographic analysis. Rightium's deliverables include a cleaned dataset, an executive deck and findings tied to the research question. The scope should state the sources, jurisdictions and period covered." }],
    related: [
      { label: "Patent watch for ongoing competitor monitoring", href: "/services/search-solutions#patent-watch" },
      { label: "Patent portfolio audits for asset review", href: "/services/ip-consulting-and-audit#ip-asset-audit" },
    ],
    resource: { label: "WIPO: guidelines for preparing patent landscape reports", href: "https://www.wipo.int/publications/en/details.jsp?id=3938" },
  },
  "patent-database-strategy": {
    questions: [{ q: "How should a team evaluate a patent database?", a: "Start with your required coverage, search workflows, integrations and budget. Compare shortlisted platforms with representative queries, coverage checks and export requirements. Rightium provides a weighted scoring matrix and query-parity results; migration planning also covers saved searches, alerts and collections." }],
    related: [
      { label: "Patent search services for research support", href: "/services/search-solutions" },
      { label: "IP process audits for workflow review", href: "/services/ip-consulting-and-audit#ip-process-audit" },
    ],
  },
  "prep-and-prosecution": {
    questions: [{ q: "What information is needed for patent drafting support?", a: "Provide an invention disclosure, technical drawings where available, known prior art and target jurisdictions. Explain which features distinguish the invention and share your firm's drafting template. Specifications and claim sets are prepared for your attorney's review." }],
    related: [
      { label: "Patentability searches before drafting", href: "/services/search-solutions#patentability-search" },
      { label: "Directed prosecution research for licensing objectives", href: "/services/licensing#directed-prosecution" },
    ],
  },
  licensing: {
    questions: [{ q: "What is an evidence of use claim chart?", a: "An evidence of use claim chart maps individual patent claim elements to documented features of a product or process. It records the supporting sources and any evidence gaps. Licensing teams and counsel use it to assess a potential licensing or enforcement matter; a chart alone does not establish infringement." }],
    related: [
      { label: "Invalidity searches for claim-focused prior art", href: "/services/search-solutions#invalidity-search" },
      { label: "Patent asset audits before portfolio prioritisation", href: "/services/ip-consulting-and-audit#ip-asset-audit" },
    ],
  },
  "chemical-safety-intelligence": {
    questions: [{ q: "What should a toxicology literature search deliver?", a: "A toxicology literature search should identify evidence for agreed substances and endpoints, record the sources searched and provide traceable citations. Rightium supplies endpoint summary tables and a database coverage log. Your regulatory team can use the evidence to assess data gaps and decide whether further evaluation is needed." }],
    related: [
      { label: "Scope a toxicology literature search", href: "/contact?service=literature-search" },
      { label: "State of the art research for technology questions", href: "/services/search-solutions#state-of-the-art-search" },
    ],
  },
  "ip-consulting-and-audit": {
    questions: [{ q: "What is the difference between an IP strategy audit and an IP asset audit?", a: "An IP strategy audit reviews how intellectual property decisions and governance support business goals. An IP asset audit examines the assets themselves and their role in the portfolio. Rightium scopes the review around the decision required and delivers prioritised recommendations with supporting evidence." }],
    related: [
      { label: "Patent portfolio mining for licensing candidates", href: "/services/licensing#portfolio-mining" },
      { label: "Patent database evaluation for research operations", href: "/services/patent-database-strategy#database-evaluation" },
    ],
  },
};
