import assert from "node:assert/strict";
import path from "node:path";
import { getPayload } from "payload";
import config from "../payload.config";
import { seedPosts, toLexical, type SeedBlock } from "../seed/insights";
import { seedWork } from "../seed/work";
import { slugify } from "../payload/slug";

// Repeatable content update: match by name/slug and keep unrelated CMS entries.
const payload = await getPayload({ config });
const context = { disableRevalidate: true };
const images = [
  { filename: "analysts.jpg", alt: "Analysts collaborating on research and evidence review" },
  { filename: "strategy.jpg", alt: "A team discussing research findings and strategic priorities" },
  { filename: "data.jpg", alt: "Data analysis supporting a structured research report" },
  { filename: "agreement.jpg", alt: "Business professionals reviewing an agreement" },
  { filename: "portrait.jpg", alt: "Specialist reviewing technical research" },
  { filename: "executive.jpg", alt: "Professional planning a research engagement" },
];
const workBodies: SeedBlock[][] = [
  [
    { type: "h2", text: "The brief" },
    { type: "p", text: "The engagement focused on a semiconductor packaging claim set with an approaching trial deadline. The research needed to connect potentially relevant prior art to specific claim elements, while giving the legal team a clear record of where each reference came from." },
    { type: "h2", text: "The research approach" },
    { type: "p", text: "The starting point was a claim breakdown and a vocabulary map for the packaging technology. Classification, keyword and citation searches were combined with a review of overseas patent literature, including Japanese utility models. Candidate references were checked against the relevant date boundary and mapped to the claim language." },
    { type: "h2", text: "What the team delivered" },
    { type: "list", items: ["A ranked reference set with claim-element mapping.", "Source documents and bibliographic details for attorney review.", "A search log recording queries, coverage and exclusions.", "A concise explanation of the strongest reference and remaining questions."] },
  ],
  [
    { type: "h2", text: "The brief" },
    { type: "p", text: "A specialty chemicals engagement required a consistent evidence pack for 40 substances ahead of a registration deadline. The practical challenge was to make a large collection of literature usable by the regulatory team, with the underlying studies traceable." },
    { type: "h2", text: "The research approach" },
    { type: "p", text: "Substance identities and synonyms were established before searching. Records from public and regulatory sources were grouped by substance and endpoint, duplicate reports were reconciled, and the evidence was reviewed by a toxicologist. Measured data, modelled data and read-across were kept distinguishable in the report." },
    { type: "h2", text: "What the team delivered" },
    { type: "list", items: ["An endpoint evidence table for each substance.", "A source register linking conclusions to the underlying records.", "Study review notes and explicit evidence gaps.", "A consolidated chemical safety report for the regulatory team's review."] },
  ],
  [
    { type: "h2", text: "The brief" },
    { type: "p", text: "A clean energy research team needed to understand the patent landscape in grid-scale storage and translate it into research priorities. A filing-volume chart alone would not answer which technical problems were crowded and which deserved closer investigation." },
    { type: "h2", text: "The research approach" },
    { type: "p", text: "The landscape was organised around technical problems rather than raw filing counts. Patent families were grouped, assignee names were normalised, and representative documents were reviewed within each cluster. Candidate gaps were compared with technical feasibility and the wider literature before being presented as opportunities for further work." },
    { type: "h2", text: "What the team delivered" },
    { type: "list", items: ["A cleaned patent dataset with documented inclusion criteria.", "A problem-based map of the technology and key applicants.", "A shortlist of clusters for technical and commercial assessment.", "A roadmap discussion pack connecting the findings to research decisions."] },
  ],
  [
    { type: "h2", text: "The brief" },
    { type: "p", text: "A consumer devices portfolio needed a practical licensing shortlist. The team had to move from a broad inventory of patent families to evidence that a licensing reviewer could examine, challenge and use in discussions." },
    { type: "h2", text: "The research approach" },
    { type: "p", text: "Portfolio mining combined technical relevance with asset status and the availability of public product evidence. Shortlisted claims were mapped element by element against product documentation. Sources were archived, and unsupported elements were recorded as gaps rather than filled with assumptions." },
    { type: "h2", text: "What the team delivered" },
    { type: "list", items: ["A ranked asset shortlist and product research matrix.", "Claim charts with citations for each supported element.", "An archived source pack for independent review.", "A list of evidence gaps and questions for the licensing team."] },
  ],
];

try {
  const foundAuthors = await payload.find({ collection: "authors", where: { name: { equals: "Rightium Team" } }, limit: 1 });
  const authorData = {
    name: "Rightium Team", role: "IP Research & Intelligence",
    bio: "The Rightium Team writes about patent research, technology intelligence, portfolio review and chemical safety evidence. Our articles share practical approaches to scoping research, documenting sources and turning findings into useful decisions.",
  };
  const author = foundAuthors.docs[0]
    ? await payload.update({ collection: "authors", id: foundAuthors.docs[0].id, data: authorData, context })
    : await payload.create({ collection: "authors", data: authorData, context });

  const mediaIds = new Map<string, number>();
  for (const image of images) {
    const found = await payload.find({ collection: "media", where: { filename: { equals: image.filename } }, limit: 1 });
    const media = found.docs[0] ?? await payload.create({ collection: "media", data: { alt: image.alt }, filePath: path.resolve("public/images", image.filename), context });
    mediaIds.set(image.filename, media.id);
  }

  for (const [index, post] of seedPosts.entries()) {
    const foundCategory = await payload.find({ collection: "categories", where: { title: { equals: post.category } }, limit: 1 });
    const category = foundCategory.docs[0] ?? await payload.create({ collection: "categories", data: { title: post.category, slug: slugify(post.category) }, context });
    const found = await payload.find({ collection: "posts", where: { slug: { equals: post.slug } }, limit: 1 });
    const data = { title: post.title, slug: post.slug, excerpt: post.excerpt, category: category.id, author: author.id,
      coverImage: mediaIds.get(images[index].filename)!, content: toLexical(post.body),
      publishedAt: found.docs[0]?.publishedAt ?? new Date("2026-10-11T09:00:00+05:30").toISOString(), _status: "published" as const };
    if (found.docs[0]) await payload.update({ collection: "posts", id: found.docs[0].id, data, context });
    else await payload.create({ collection: "posts", data, context });
    console.log(`Published Insight: ${post.category} — ${post.title}`);
  }

  for (const [index, work] of seedWork.entries()) {
    const found = await payload.find({ collection: "selected-work", where: { slug: { equals: work.slug } }, limit: 1 });
    const data = { ...work, fallbackImage: work.fallbackImage as "/images/analysts.jpg", coverImage: mediaIds.get(path.basename(work.fallbackImage))!,
      content: toLexical([...workBodies[index], { type: "h2", text: "The recorded outcome" }, { type: "p", text: work.excerpt }]), _status: "published" as const };
    if (found.docs[0]) await payload.update({ collection: "selected-work", id: found.docs[0].id, data, context });
    else await payload.create({ collection: "selected-work", data, context });
    console.log(`Published selected work: ${work.title}`);
  }

  for (const post of seedPosts) {
    const result = await payload.find({ collection: "posts", overrideAccess: false, where: { slug: { equals: post.slug } }, depth: 1 });
    const doc = result.docs[0];
    assert.ok(doc && doc._status === "published" && doc.content.root.children.length);
    assert.equal(typeof doc.author === "object" && doc.author.name, "Rightium Team");
    assert.ok(typeof doc.coverImage === "object" && doc.coverImage?.url, "Published articles need a cover image URL");
  }
  for (const work of seedWork) {
    const result = await payload.find({ collection: "selected-work", overrideAccess: false, where: { slug: { equals: work.slug } }, depth: 1 });
    assert.ok(result.docs[0]?.content.root.children.length);
    assert.ok(typeof result.docs[0]?.coverImage === "object" && result.docs[0].coverImage?.url);
  }
  console.log("Verified: Rightium Team, six illustrated articles and four illustrated selected works are published.");
} finally { await payload.destroy(); }
