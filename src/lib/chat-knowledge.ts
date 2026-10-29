import "server-only";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
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
    { title: "About Rightium", href: "/about", text: site.tagline + " Based in " + site.address.short },
    { title: "Contact the team", href: "/contact", text: `${site.email}; ${site.phone}; ${site.hours.label}. Request a quote through the contact form.` },
    { title: "All services", href: "/services", text: services.map(s => s.title).join("; ") },
    { title: "Insights", href: "/blog", text: "Research articles and guides from Rightium." },
    ...services.flatMap(s => [
      { title: s.title, href: `/services/${s.slug}`, text: `${s.summary} Deliverables: ${s.deliverables.join("; ")}` },
      ...s.items.map(item => ({ title: item.title, href: `/services/${s.slug}#${item.slug}`, text: item.description })),
    ]),
  ];
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
  const ranked = sources.slice(5).sort((a, b) => score(b.title + " " + b.text) - score(a.title + " " + a.text));
  const selected = [...sources.slice(0, 5), ...ranked.slice(0, 14)];
  return { context: JSON.stringify(selected), allowed: new Set(selected.map(s => s.href)) };
}
