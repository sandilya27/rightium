import "server-only";
import { services } from "@/lib/services";
import { site, stats } from "@/lib/site";
import { faqs, practiceAreas, principles, reasons } from "@/lib/content";
import { serviceGuidance } from "@/lib/service-guidance";
import { getPosts, getPost } from "@/lib/posts";
import { getWorks, getWork } from "@/lib/works";

type Source = { title: string; href: string; text: string };

/** Read text nodes only; rich-text URLs, metadata and embedded instructions aren't executable. */
function textOf(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const node = value as { text?: unknown; children?: unknown; root?: unknown };
  if (typeof node.text === "string") return node.text;
  if (Array.isArray(node.children)) return node.children.map(textOf).join(" ");
  return node.root ? textOf(node.root) : "";
}

export async function chatKnowledge(query: string) {
  const sources: Source[] = [
    { title: "Rightium", href: "/", text: site.description },
    { title: "About Rightium", href: "/about", text: `${site.tagline} Based in ${site.address.short}, ${site.address.region} ${site.address.postalCode}, ${site.address.countryName}. Sectors: ${practiceAreas.join("; ")}. Principles: ${principles.map(p => `${p.title}: ${p.body}`).join(" ")}` },
    { title: "Contact the team", href: "/contact", text: `${site.email}; ${site.phone}; ${site.hours.label}. Request a quote through the contact form.` },
    { title: "All services", href: "/services", text: services.map(s => s.title).join("; ") },
    { title: "Insights", href: "/blog", text: "Research articles and guides from Rightium." },
    // Keep core company facts and FAQs in EVERY request. Ranking alone can
    // discard short factual answers, especially for misspellings and follow-ups.
    { title: "Published company statistics", href: "/", text: stats.map(s => `${s.label}: ${s.value.toLocaleString("en-IN")}${s.suffix}`).join(". ") + ". These are the website's published figures, not live counters. Typical turnaround is an overall headline; service-specific schedules and agreed deadlines take precedence." },
    { title: "How Rightium works", href: "/", text: reasons.map(r => `${r.title}: ${r.body}`).join(" ") },
    ...faqs.map(faq => ({ title: faq.q, href: "/", text: faq.a })),
  ];
  const coreCount = sources.length;
  sources.push(...services.flatMap(s => [
      { title: s.title, href: `/services/${s.slug}`, text: `${s.short} ${s.summary} Audience: ${s.audience}. Turnaround: ${s.turnaround}. Deliverables: ${s.deliverables.join("; ")}. Services: ${s.items.map(i => i.title).join("; ")}. ${(serviceGuidance[s.slug]?.questions ?? []).map(faq => `${faq.q} ${faq.a}`).join(" ")}` },
      ...s.items.map(item => ({ title: item.title, href: `/services/${s.slug}#${item.slug}`, text: item.description })),
    ]));
  // Published CMS content uses the same adapters as the site, including preview seeds.
  // A CMS outage still leaves the core service catalogue available.
  const [posts, works] = await Promise.allSettled([getPosts(), getWorks()]);
  const terms = query.toLowerCase().match(/[a-z0-9]{3,}/g) ?? [];
  const score = (text: string) => terms.reduce((n, term) => n + (text.toLowerCase().includes(term) ? 1 : 0), 0);
  if (posts.status === "fulfilled") {
    const ranked = posts.value.map(p => ({ p, rank: score(p.title + " " + p.excerpt) })).sort((a, b) => b.rank - a.rank);
    const details = await Promise.allSettled(ranked.filter(p => p.rank > 0).slice(0, 2).map(({ p }) => getPost(p.slug)));
    for (const { p } of ranked) sources.push({ title: p.title, href: `/blog/${p.slug}`, text: p.excerpt });
    for (const result of details) if (result.status === "fulfilled" && result.value) {
      const source = sources.find(s => s.href === `/blog/${result.value!.slug}`);
      if (source) source.text += " " + textOf(result.value.content).slice(0, 8000);
    }
  }
  if (works.status === "fulfilled") {
    const ranked = works.value.map(w => ({ w, rank: score(w.title + " " + w.body) })).sort((a, b) => b.rank - a.rank);
    const details = await Promise.allSettled(ranked.filter(w => w.rank > 0).slice(0, 1).map(({ w }) => getWork(w.slug)));
    for (const { w } of ranked) sources.push({ title: w.title, href: `/work/${w.slug}`, text: w.body });
    for (const result of details) if (result.status === "fulfilled" && result.value) {
      const source = sources.find(s => s.href === `/work/${result.value!.slug}`);
      if (source) source.text += " " + textOf(result.value.content).slice(0, 8000);
    }
  }
  const ranked = sources.slice(coreCount).sort((a, b) => score(b.title + " " + b.text) - score(a.title + " " + a.text));
  const selected = [...sources.slice(0, coreCount), ...ranked.slice(0, 14)];
  return { context: JSON.stringify(selected), allowed: new Set(selected.map(s => s.href)) };
}
