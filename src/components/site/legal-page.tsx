import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

/** A paragraph, or a bulleted list when given an array. */
export type LegalBlock = string | string[];
export type LegalSection = { id: string; heading: string; body: LegalBlock[] };

/**
 * Long-form legal layout: hero, a sticky contents rail, then the
 * numbered sections. Anchored headings let support staff link someone
 * straight to the clause they are asking about.
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
        flowCount={18}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        eyebrow={`Last updated ${updated}`}
        title={title}
        lede={intro}
      />

      <section className="bg-paper pt-20 pb-20 md:pt-24 md:pb-[120px]">
        <div className="shell grid gap-12 lg:grid-cols-[15rem_minmax(0,45rem)] lg:gap-20">
          <nav
            aria-label="On this page"
            className="self-start text-[0.84375rem] lg:sticky lg:top-[6.875rem]"
          >
            <p className="eyebrow m-0 text-xs">On this page</p>
            <ol className="mt-4 flex list-none flex-col gap-2.5 border-l border-line-strong p-0">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l-2 border-transparent py-0.5 pl-3.5 text-ink-2 transition-[color,border-color] duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink-heading"
                  >
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-12">
            {sections.map((s, i) => (
              <Reveal key={s.id}>
                <section
                  id={s.id}
                  className="scroll-mt-[calc(var(--nav-h)+2rem)] border-t border-line-strong pt-7"
                >
                  <h2 className="font-serif m-0 text-[1.625rem] leading-[1.2] text-ink-heading">
                    <span className="text-accent">{i + 1}.</span> {s.heading}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4 text-[1.03125rem] leading-[1.75] text-ink-body">
                    {s.body.map((block, j) =>
                      Array.isArray(block) ? (
                        <ul key={j} className="m-0 flex list-none flex-col gap-2.5 p-0">
                          {block.map((item) => (
                            <li key={item} className="flex gap-3.5">
                              <span
                                aria-hidden
                                className="mt-[15px] h-px w-3.5 shrink-0 bg-accent"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={j} className="m-0">
                          {block}
                        </p>
                      ),
                    )}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
