import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

/** A paragraph, or a bulleted list when given an array. */
export type LegalBlock = string | string[];
export type LegalSection = { id: string; heading: string; body: LegalBlock[] };

/**
 * Long-form legal layout: hero, a jump list of sections, then the
 * numbered sections themselves. Anchored headings let support staff
 * link someone straight to the clause they are asking about.
 */
export function LegalPage({
  title,
  path,
  updated,
  intro,
  sections,
}: {
  title: string;
  path: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
      <PageHero
        eyebrow={`Last updated ${updated}`}
        title={title}
        lede={intro}
        breadcrumb={[{ label: "Home", href: "/" }]}
      />
      <Section>
        <div className="mx-auto max-w-[68ch]">
          <Reveal>
            <nav
              aria-label="On this page"
              className="rounded-card border border-[var(--line)] bg-[var(--accent-soft)] p-6"
            >
              <p className="eyebrow text-ink-3">On this page</p>
              <ol className="mt-4 grid gap-2 text-[0.9375rem] sm:grid-cols-2">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} data-cursor="link" className="link-underline text-ink-2 hover:text-ink">
                      {i + 1}. {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <div className="mt-14 space-y-12">
            {sections.map((s, i) => (
              <Reveal key={s.id}>
                <section id={s.id} className="scroll-mt-[calc(var(--nav-h)+2rem)]">
                  <h2 className="font-display text-[1.5rem] leading-tight tracking-[-0.02em]">
                    <span className="text-ink-3">{i + 1}.</span> {s.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[1.0625rem] leading-[1.72] text-ink-2">
                    {s.body.map((block, j) =>
                      Array.isArray(block) ? (
                        <ul key={j} className="list-disc space-y-2 pl-5 marker:text-accent">
                          {block.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={j}>{block}</p>
                      ),
                    )}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
