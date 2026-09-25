import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Stats } from "@/components/home/stats";
import { CTA } from "@/components/site/cta";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: `${site.name} is a Bengaluru-based IP research firm built around one rule: every patent search, landscape and IP opinion ships with the evidence that produced it.`,
  path: "/about",
});

const principles = [
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

const team = [
  { name: "Rhea Kulkarni", role: "Head of Search Practice", detail: "EE, 14 years in prior art and litigation support" },
  { name: "Daniel Okafor", role: "Director, Intelligence & Licensing", detail: "Former in-house portfolio lead, energy sector" },
  { name: "Mei Lin Tan", role: "Head of Chemical Safety", detail: "Toxicology PhD, regulatory and literature searching" },
  { name: "Arjun Mehta", role: "Head of Prosecution Support", detail: "Registered patent agent, 2,000+ applications" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        image={{ src: "/images/executive.jpg", alt: "An executive looking out over the city" }}
        title="An IP research firm built around one rule."
        lede="Every conclusion ships with the evidence that produced it. Everything else about how we work follows from that."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <div className="space-y-6 text-[1.0625rem] leading-[1.72] text-ink-2">
              <p className="font-display text-[1.5rem] leading-[1.35] tracking-[-0.015em] text-ink text-balance md:text-[1.875rem]">
                We started because too many search reports arrive as a list of
                references and a shrug.
              </p>
              <p>
                Our founders spent years on the receiving end of that — in-house,
                under deadline, trying to work out whether a report could be
                relied on before a filing deadline or a board meeting. The
                references were usually fine. What was missing was everything
                needed to check them.
              </p>
              <p>
                So the firm was organised around the opposite default. The search
                log goes out with the report. A second analyst is paid to attack
                the first one&apos;s conclusion. Scope and price are agreed before
                anything starts, and revisions inside that scope are ours to
                absorb. None of it is complicated. It is just uncommon.
              </p>
              <p>
                Today {site.name} works with corporate IP teams, prosecution
                firms, licensing groups and R&amp;D leaders across 30 countries —
                mostly on the questions where being approximately right is not
                good enough.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-[var(--line)] bg-white p-8">
              <h2 className="eyebrow text-ink-3">Practice areas</h2>
              <ul className="mt-6 space-y-4 text-[0.9375rem]">
                {[
                  "Consumer electronics & semiconductors",
                  "Life sciences & pharmaceuticals",
                  "Clean energy & storage",
                  "Advanced materials & chemicals",
                  "Telecoms & standards",
                  "Industrial & mechanical systems",
                ].map((p) => (
                  <li
                    key={p}
                    className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-ink-2">{p}</span>
                    <span className="h-px w-6 shrink-0 bg-accent" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Stats />

      <Section>
        <SectionHeading
          eyebrow="Principles"
          title="Four rules we do not bend."
          lede="They cost us work occasionally. They are also the only reason clients stay."
        />
        <RevealGroup
          className="mt-14 grid gap-px overflow-hidden rounded-card border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2"
          stagger={0.06}
        >
          {principles.map((p, i) => (
            <RevealItem key={p.title} className="h-full">
              <div className="h-full bg-white p-8">
                <span className="font-mono text-[0.6875rem] text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-[1.25rem] leading-snug tracking-[-0.015em]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {p.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section className="border-t border-[var(--line)] bg-surface">
        <SectionHeading
          eyebrow="Practice leads"
          title="The people who sign the work."
          lede="You will know who is running your matter, and you will be able to reach them."
        />
        <RevealGroup
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
        >
          {team.map((member) => (
            <RevealItem key={member.name} className="h-full">
              <div className="group/member h-full rounded-card border border-[var(--line)] bg-white p-7 transition-[transform,border-color] duration-[320ms] ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[3px] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--accent-line)]">
                <span className="font-display grid size-14 place-items-center rounded-full border border-[var(--line)] bg-surface text-[1.1rem] text-ink transition-colors duration-300 group-hover/member:border-[var(--accent-line)] group-hover/member:bg-[var(--accent-soft)] group-hover/member:text-accent">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <h3 className="font-display mt-6 text-[1.15rem] tracking-[-0.015em]">
                  {member.name}
                </h3>
                <p className="mt-1 text-[0.875rem] text-accent">{member.role}</p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-2">
                  {member.detail}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTA />
    </>
  );
}
