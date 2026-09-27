import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";

const terms = ["Fixed scope", "Fixed fee", "Agreed before we start"];

/**
 * The manifesto. One long serif sentence at display size, set against a
 * narrow left column of terms — the asymmetry is what makes it read as
 * a statement rather than as body copy that happens to be large.
 */
export function Statement() {
  return (
    <section className="bg-paper pt-24 pb-20 md:pt-[140px] md:pb-[120px]">
      <div className="shell grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] md:gap-16">
        <Reveal>
          <Eyebrow>Why Rightium</Eyebrow>
          <p className="mt-5.5 max-w-[30ch] text-[0.96875rem] leading-[1.65] text-ink-2">
            A research partner for corporate IP teams, law firms and R&amp;D
            leaders across 30 countries.
          </p>
          <ul className="mt-9 flex list-none flex-col gap-3 p-0">
            {terms.map((t) => (
              <li
                key={t}
                className="flex items-center gap-3 text-[0.84375rem] text-ink-heading"
              >
                <span aria-hidden className="h-px w-[18px] bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="font-serif m-0 text-[clamp(1.9rem,3.3vw,3.1rem)] leading-[1.2] tracking-[-0.015em] text-ink-heading text-pretty">
            Most search reports arrive as a list of references and a shrug. Ours
            arrive with{" "}
            <em className="accent-em">
              the search log, the raw data and an opinion you can defend
            </em>{" "}
            — reviewed twice, by analysts who trained in your field.
          </p>
          <ButtonLink href="/about" variant="ink" className="mt-10">
            How we work
            <ArrowRight className="size-[14px]" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
