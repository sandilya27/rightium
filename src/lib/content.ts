/**
 * Editorial copy that belongs to a section rather than to the service
 * catalogue: the reasons band, client voices, the FAQ, and the About
 * page's principles, leads and sector list.
 *
 * It lives here rather than inside the components so the same strings
 * can feed structured data (FAQPage) and the contact form's context.
 */

export type Reason = {
  title: string;
  body: string;
  /** Proof point, set small under the body. */
  tag: string;
  image: string;
};

export const reasons: Reason[] = [
  {
    title: "The method ships with the report",
    body: "Strings, classification codes, databases, date ranges — and the queries that returned nothing. Your team can verify any conclusion or extend the work without starting over.",
    tag: "1,284 references screened",
    image: "/images/analysts.jpg",
  },
  {
    title: "Reviewed twice, by specialists",
    body: "A domain-matched analyst runs the work; a second reviewer is paid to attack the conclusion. Sequence searches go to biologists, claim charts to engineers who know the product.",
    tag: "2 analysts on every matter",
    image: "/images/portrait.jpg",
  },
  {
    title: "Built to survive scrutiny",
    body: "Every citation is archived, every exclusion reasoned. Deliverables are structured for oppositions, IPRs, board decks and regulators — whoever checks the work next.",
    tag: "90+ jurisdictions covered",
    image: "/images/executive.jpg",
  },
  {
    title: "Fixed scope. Fixed fee.",
    body: "Price, scope and date are agreed in writing before anything starts. Revisions inside scope are ours to absorb — no open-ended retainers, no hourly surprises.",
    tag: "Quote in one working day",
    image: "/images/agreement.jpg",
  },
];

export type Quote = { body: string; name: string; role: string };

export const quotes: Quote[] = [
  {
    body: "They found a 1998 Japanese utility model two prior searches had missed, and laid out exactly how they got there. Our outside counsel could verify it in an afternoon.",
    name: "Head of IP",
    role: "Semiconductor manufacturer, California",
  },
  {
    body: "Drafts come back in our template with tracked changes on, and the docket is always current. Our associates review instead of rewrite — that is the whole value.",
    name: "Partner",
    role: "IP law firm, London",
  },
  {
    body: "The first firm that has ever told us a project wasn't worth running. They were right, and it is why they get the work that is.",
    name: "Director of Innovation",
    role: "Energy storage, Munich",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How fast can you turn work around?",
    a: "Patentability, invalidity and FTO searches land in two to five business days, and expedited work starts at 24 hours. Drafting and prosecution support run three to seven days, evidence-of-use charts five to ten, rapid tox searches and literature reviews three to ten. Landscapes, database migrations and IP audits are scoped per engagement. We commit to a date before starting, and if the date is not realistic we say so on the first call rather than missing it later.",
  },
  {
    q: "What exactly do we receive?",
    a: "The report, the raw working file, and the complete search log — every string, classification code, database and date range, including the queries that returned nothing. Your team can verify any conclusion or extend the work without briefing us again.",
  },
  {
    q: "Who actually does the work?",
    a: "A domain-matched analyst, reviewed by a second analyst whose job is to attack the first one's conclusion. A sequence search goes to someone with a molecular biology background; a chemical safety report goes to a qualified toxicologist; a claim chart goes to an engineer who knows the product category. You will know both names.",
  },
  {
    q: "What is the difference between “Order now” and “Contact us”?",
    a: "Order now is for fixed-scope work — a patentability search, a claim chart, a literature search — where the brief form is enough to start. Contact us is for engagements that need a conversation first, like a database migration, directed prosecution or an IP audit. Both go to the same team, and either way you get a written scope and fee before anything starts.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed scope, fixed fee, agreed in writing before anything starts. Revisions inside that scope cost nothing — they are our problem, not yours. There are no open-ended retainers and no hourly surprises.",
  },
  {
    q: "Is our material kept confidential?",
    a: "Yes. Everything you send is treated as confidential, access is limited to the team on your matter, and we will sign your NDA rather than asking you to sign ours. Disclosure-sensitive searching can be run under a separate protocol on request.",
  },
  {
    q: "Can you work inside our templates and docketing system?",
    a: "For drafting, prosecution, docketing and claim charts, yes — we draft in your house style with tracked changes on, and deliver in the format your docket expects. Most law firm clients find our output goes straight into their workflow without reformatting.",
  },
];

export const principles = [
  {
    title: "Show the work",
    body: "A conclusion without its method is an opinion. Every report we send can be reconstructed by someone who was not in the room.",
  },
  {
    title: "Say what we think",
    body: "Clients pay for a position, not a list. Where the evidence supports a call, we make it — and where it does not, we say that too.",
  },
  {
    title: "Match the reviewer to the field",
    body: "Generalists miss the vocabulary that matters. Searchers, drafters and toxicologists work inside the domains they trained in.",
  },
  {
    title: "Decline the wrong work",
    body: "If a project will not change the decision, we will say so before invoicing for it. It costs us a project and keeps the relationship.",
  },
];

export const team = [
  {
    name: "Rhea Kulkarni",
    role: "Head of Search Practice",
    detail: "EE, 14 years in prior art and litigation support",
  },
  {
    name: "Daniel Okafor",
    role: "Director, Intelligence & Licensing",
    detail: "Former in-house portfolio lead, energy sector",
  },
  {
    name: "Mei Lin Tan",
    role: "Head of Chemical Safety",
    detail: "Toxicology PhD, regulatory and literature searching",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Prosecution Support",
    detail: "Registered patent agent, 2,000+ applications",
  },
];

export const practiceAreas = [
  "Consumer electronics & semiconductors",
  "Life sciences & pharmaceuticals",
  "Clean energy & storage",
  "Advanced materials & chemicals",
  "Telecoms & standards",
  "Industrial & mechanical systems",
];

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}
