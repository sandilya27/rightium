import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { StatsBand } from "@/components/site/stats-band";
import { SectionHead } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { CTA } from "@/components/site/cta";
import { initialsOf, practiceAreas, principles, team } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: `${site.name} is a Bengaluru-based IP research firm built around one rule: every patent search, landscape and IP opinion ships with the evidence that produced it.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the firm"
        title={
          <>
            An IP research firm built around{" "}
            <em className="accent-em-bright">one rule.</em>
          </>
        }
        lede="Every conclusion ships with the evidence that produced it. Everything else about how we work follows from that."
      />

      {/* The origin story, with the sector list held beside it so the
          page answers "do you know my field?" without a second scroll. */}
      <section className="bg-paper py-20 md:py-[112px]">
        <div className="shell grid items-start gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-20">
          <Reveal className="flex flex-col gap-6 text-[1.03125rem] leading-[1.75] text-[#3f4f5e]">
            <p className="font-serif m-0 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.3] tracking-[-0.01em] text-ink-heading balance">
              We started because too many search reports arrive as a list of
              references and a shrug.
            </p>
            <p className="m-0">
              Our founders spent years on the receiving end of that — in-house,
              under deadline, trying to work out whether a report could be relied
              on before a filing deadline or a board meeting. The references were
              usually fine. What was missing was everything needed to check them.
            </p>
            <p className="m-0">
              So the firm was organised around the opposite default. The search
              log goes out with the report. A second analyst is paid to attack the
              first one&rsquo;s conclusion. Scope and price are agreed before
              anything starts, and revisions inside that scope are ours to absorb.
              None of it is complicated. It is just uncommon.
            </p>
            <p className="m-0">
              Today {site.name} works with corporate IP teams, prosecution firms,
              licensing groups and R&amp;D leaders across 30 countries — mostly on
              the questions where being approximately right is not good enough.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="plate aspect-[4/3]">
              <Image
                src="/images/executive.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="border border-t-0 border-line-strong p-8">
              <h2 className="eyebrow m-0">Sectors we work in</h2>
              <ul className="mt-4.5 list-none p-0">
                {practiceAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center justify-between gap-4 border-b border-line py-3.5 text-[0.9375rem] text-ink-heading last:border-b-0"
                  >
                    {area}
                    <span aria-hidden className="h-px w-6 shrink-0 bg-accent" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsBand />

      <section className="bg-paper py-20 md:py-[120px]">
        <div className="shell">
          <SectionHead
            eyebrow="Principles"
            title="Four rules we do not bend."
            lede="They cost us work occasionally. They are also the only reason clients stay."
            maxWidth="max-w-[42.5rem]"
          />
          {/* A 1px gap over a line-coloured background: four panels
              divided by rules rather than four bordered boxes. */}
          <div className="mt-12 grid gap-px border border-line-strong bg-line-strong md:mt-16 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="bg-white p-8 md:p-10">
                <span className="font-serif text-[0.9375rem] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif mt-4.5 text-[1.75rem] leading-[1.15] text-ink-heading">
                  {p.title}
                </h3>
                <p className="mt-3.5 max-w-[48ch] text-[0.9375rem] leading-[1.65] text-ink-2">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-line py-20 md:py-[120px]">
        <div className="shell">
          <SectionHead
            eyebrow="Practice leads"
            title="The people who sign the work."
            lede="You will know who is running your matter, and you will be able to reach them."
            maxWidth="max-w-[42.5rem]"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal
                key={member.name}
                delay={i * 0.08}
                className="lift border border-line bg-white pb-7"
              >
                {/* Hatched plate until the real portraits are shot — an
                    obvious placeholder beats a stock face. */}
                <div
                  className="grid aspect-square place-items-center"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg,#e6edf1 0 6px,#f3f6f8 6px 12px)",
                  }}
                >
                  <span className="border border-line-strong bg-white px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-ink-2">
                    portrait · {initialsOf(member.name)}
                  </span>
                </div>
                <div className="px-7 pt-6">
                  <h3 className="font-serif m-0 text-[1.375rem] leading-[1.2] text-ink-heading">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-[0.84375rem] font-medium text-accent">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-[1.6] text-ink-2">
                    {member.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA note={null} secondary={false} />
    </>
  );
}
