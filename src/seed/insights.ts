/**
 * The launch set of Insights articles, in the simple block format the
 * site used before the CMS. `toLexical` converts a body into Payload's
 * rich-text format; the seed migration inserts these on first deploy.
 * After that, articles are edited in the admin, not here.
 */

export type SeedBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingMinutes: number;
  author: { name: string; role: string };
  body: SeedBlock[];
};

export const seedPosts: SeedPost[] = [
  {
    slug: "what-a-defensible-invalidity-search-looks-like",
    title: "What a defensible invalidity search actually looks like",
    excerpt:
      "Most invalidity reports fail the same way: they hand over references without handing over the reasoning. Here is the structure that survives cross-examination.",
    category: "Litigation support",
    date: "2026-09-02",
    readingMinutes: 7,
    author: { name: "Rhea Kulkarni", role: "Head of Search Practice" },
    body: [
      {
        type: "p",
        text: "A reference is not an argument. The difference between a search report that wins a motion and one that gets quietly shelved is almost never the quality of the art — it is whether the reasoning that produced the art can be reconstructed by someone who was not in the room.",
      },
      { type: "h2", text: "Start from the claim, not the technology" },
      {
        type: "p",
        text: "Searches that begin with a technology description drift. Searches that begin with a claim element stay anchored. Break the independent claim into its elements before a single query is written, and treat each element as its own search problem with its own vocabulary, its own classification codes and its own date boundary.",
      },
      {
        type: "list",
        items: [
          "Map each claim element to the terms of art used in the relevant field in the relevant decade.",
          "Search classification-first, then keyword-first, then citation-first — the three approaches fail differently.",
          "Record every string you ran, including the ones that returned nothing.",
        ],
      },
      { type: "h2", text: "Non-patent literature is where the case usually is" },
      {
        type: "p",
        text: "Conference proceedings, standards contributions, product manuals, teardown reports and archived vendor documentation routinely predate the filings in a space by two to four years. They are also the hardest material to retrieve, which is exactly why the opposing side's search probably missed it.",
      },
      {
        type: "quote",
        text: "If you cannot show how you found it, you have not really found it.",
        cite: "Internal review standard",
      },
      { type: "h2", text: "Ship the log with the report" },
      {
        type: "p",
        text: "The search log is not an appendix. It is the part of the deliverable that lets your attorney defend the conclusion, extend the work under deadline, or hand the matter to co-counsel without starting over. Treat it as a first-class output and the rest of the report gets sharper by necessity.",
      },
    ],
  },
  {
    slug: "freedom-to-operate-is-a-process-not-a-report",
    title: "Freedom to operate is a process, not a report",
    excerpt:
      "An FTO opinion is accurate on the day it is signed and decaying from the next morning. Building the refresh into the launch plan is the whole job.",
    category: "Strategy",
    date: "2026-08-19",
    readingMinutes: 6,
    author: { name: "Daniel Okafor", role: "Director, Intelligence & Licensing" },
    body: [
      {
        type: "p",
        text: "Teams treat freedom to operate as a gate: clear it once, walk through, move on. But claims amend during prosecution, continuations publish eighteen months after their priority date, and assignments move risk between parties you have already assessed.",
      },
      { type: "h2", text: "Three decay mechanisms to plan around" },
      {
        type: "list",
        items: [
          "Pending applications that have not yet published at the time of the search.",
          "Claim amendments that broaden scope into your product during prosecution.",
          "Assignment and licensing changes that alter who is willing to assert.",
        ],
      },
      {
        type: "p",
        text: "None of these are exotic. All of them are invisible to a one-time search. The fix is boring and effective: pair the opinion with a watch on the specific families and applicants that mattered, and schedule a re-read at the points where the product actually changes.",
      },
      { type: "h2", text: "Tier the risk, then act on the tiers" },
      {
        type: "p",
        text: "A flat list of concerning patents is not usable by a launch team. Tiering by likelihood of assertion, cost of design-around and market value of the jurisdiction converts a legal document into a set of engineering and commercial decisions — which is the only form in which it will ever be acted upon.",
      },
    ],
  },
  {
    slug: "whitespace-analysis-without-the-hand-waving",
    title: "Whitespace analysis without the hand-waving",
    excerpt:
      "Empty space on a patent map is usually empty for a reason. Separating genuine opportunity from dead ground is the entire value of the exercise.",
    category: "Intelligence",
    date: "2026-07-28",
    readingMinutes: 8,
    author: { name: "Mei Lin Tan", role: "Head of Chemical Safety" },
    body: [
      {
        type: "p",
        text: "Cluster forty thousand filings, render them, and gaps appear. The temptation is to call every gap an opportunity. Most of them are regions where the technology does not work, the market does not exist, or the art lives in literature that your dataset never indexed.",
      },
      { type: "h2", text: "Three tests before calling something whitespace" },
      {
        type: "list",
        items: [
          "Feasibility: is there a physical or economic reason nobody has filed here?",
          "Coverage: is the gap an artefact of the dataset rather than the field?",
          "Defensibility: could you obtain claims here that a competitor could not design around in a quarter?",
        ],
      },
      {
        type: "p",
        text: "A gap that survives all three is worth a programme. A gap that fails any of them is worth a paragraph explaining why, which is often the more valuable output — it stops a team spending eighteen months proving the obvious.",
      },
      { type: "h2", text: "Clustering by problem beats clustering by code" },
      {
        type: "p",
        text: "CPC codes describe how an office files things, not how an industry thinks. Clustering by the problem a filing solves produces maps that engineers recognise and can argue with, and an engineer arguing with your map is the point.",
      },
    ],
  },
  {
    slug: "buying-a-portfolio-what-diligence-misses",
    title: "Buying a portfolio: what diligence usually misses",
    excerpt:
      "Ownership chains, unrecorded assignments and maintenance lapses account for more failed IP transactions than claim quality ever does.",
    category: "Due diligence",
    date: "2026-07-05",
    readingMinutes: 5,
    author: { name: "Daniel Okafor", role: "Director, Intelligence & Licensing" },
    body: [
      {
        type: "p",
        text: "Valuation work tends to concentrate on claim strength, because that is the interesting part. The transactions that go wrong usually go wrong somewhere far more mundane.",
      },
      { type: "h2", text: "The unglamorous checklist" },
      {
        type: "list",
        items: [
          "Chain of title complete and recorded in every jurisdiction, including employee assignments.",
          "Maintenance and annuity payments current, with the next three years budgeted.",
          "Encumbrances: prior licences, security interests, standards commitments, government march-in rights.",
          "Inventor disputes and co-ownership positions that constrain enforcement.",
        ],
      },
      {
        type: "p",
        text: "Run this before the claim analysis, not after. A portfolio with a broken chain of title does not need a valuation — it needs a different deal structure, and finding that out in week one rather than week nine changes what the transaction costs.",
      },
    ],
  },
  {
    slug: "rapid-tox-searches-what-fast-should-still-include",
    title: "Rapid tox searches: what \"fast\" should still include",
    excerpt:
      "Automation makes toxicology searching quick. It does not make it complete. Here is what a rapid search has to hand back before anyone relies on it.",
    category: "Chemical safety",
    date: "2026-06-16",
    readingMinutes: 6,
    author: { name: "Mei Lin Tan", role: "Head of Chemical Safety" },
    body: [
      {
        type: "p",
        text: "Automated screening can pull every record for a CAS number from dozens of databases in minutes. What it cannot do is tell you which of those records are the same study reported three times, which used a read-across substance, and which predate a guideline change that makes them unusable for registration.",
      },
      { type: "h2", text: "Coverage you can see" },
      {
        type: "p",
        text: "A rapid search should list every source it queried, including the ones that returned nothing. An empty result from a database that covers the endpoint is a finding; an empty result from one that does not is a gap, and the report should say which is which.",
      },
      {
        type: "quote",
        text: "Speed is only useful if the reviewer can tell what was not looked at.",
      },
      { type: "h2", text: "Expert eyes on every endpoint" },
      {
        type: "list",
        items: [
          "Duplicates collapsed to the primary study, with the secondary citations kept.",
          "Reliability scored per study, with the reason stated.",
          "Read-across and QSAR data flagged, never mixed in with measured values.",
          "Data gaps listed against the endpoints your regulation actually requires.",
        ],
      },
      {
        type: "p",
        text: "That review is the difference between a data dump and a result your regulatory team can file against — and it is where most of the time in a good rapid search is actually spent.",
      },
    ],
  },
  {
    slug: "how-to-brief-a-search-team",
    title: "How to brief a search team so the first draft is the last one",
    excerpt:
      "Most revision cycles are caused by ambiguity in the brief, not error in the search. Ten minutes of precision up front saves a week.",
    category: "Practice",
    date: "2026-05-30",
    readingMinutes: 4,
    author: { name: "Mei Lin Tan", role: "Head of Chemical Safety" },
    body: [
      {
        type: "p",
        text: "The single strongest predictor of a clean first delivery is whether the brief states what decision the output will be used to make. Everything else follows from that.",
      },
      { type: "h2", text: "What to include, every time" },
      {
        type: "list",
        items: [
          "The decision the report will inform — file, launch, litigate, acquire.",
          "The jurisdictions that actually matter commercially, ranked.",
          "The date boundary and why it is where it is.",
          "Known art you have already seen, so it is not rediscovered at your expense.",
          "The format the output must land in, including whose template.",
        ],
      },
      {
        type: "p",
        text: "If a brief cannot answer the first item, the search is premature. That is not a delay — it is the cheapest possible moment to discover the question is not yet formed.",
      },
    ],
  },
];

const text = (value: string) => ({
  type: "text",
  version: 1,
  text: value,
  format: 0,
  style: "",
  mode: "normal",
  detail: 0,
});

const element = (type: string, children: object[], extra: object = {}) => ({
  type,
  version: 1,
  children,
  direction: "ltr" as const,
  format: "" as const,
  indent: 0,
  ...extra,
});

export function toLexical(blocks: SeedBlock[]) {
  const children = blocks.flatMap((block) => {
    switch (block.type) {
      case "p":
        return [element("paragraph", [text(block.text)], { textFormat: 0, textStyle: "" })];
      case "h2":
        return [element("heading", [text(block.text)], { tag: "h2" })];
      case "quote":
        return [
          element("quote", [text(block.text)]),
          ...(block.cite
            ? [element("paragraph", [text(`— ${block.cite}`)], { textFormat: 0, textStyle: "" })]
            : []),
        ];
      case "list":
        return [
          element(
            "list",
            block.items.map((item, i) => element("listitem", [text(item)], { value: i + 1 })),
            { listType: "bullet", start: 1, tag: "ul" },
          ),
        ];
    }
  });

  return {
    root: {
      type: "root",
      version: 1,
      children,
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
    },
  };
}
