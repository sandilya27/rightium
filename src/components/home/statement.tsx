import { site } from "@/lib/site";
import { ScrollWords } from "@/components/motion/scroll-words";
import { ClipImage } from "@/components/motion/clip-image";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/section";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

/**
 * The manifesto. The paragraph is read out word by word as the page
 * scrolls, and two photos wipe open alongside it.
 */
export function Statement() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.34fr_1fr] lg:gap-16">
          <div>
            <Reveal y={10}>
              <Eyebrow>Why {site.name}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[30ch] text-[0.9375rem] leading-relaxed text-ink-2">
                A research partner for corporate IP teams, law firms and R&amp;D
                leaders across 30 countries.
              </p>
            </Reveal>
          </div>

          <div>
            <ScrollWords
              className="font-display text-[clamp(1.7rem,3.4vw,3.1rem)] leading-[1.14] tracking-[-0.035em] text-ink"
              text="Most search reports arrive as a list of references and a shrug. Ours arrive with the *search *log, the *raw *data and an *opinion *you *can *defend — reviewed twice, by analysts who trained in your field."
            />

            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <ButtonLink href="/about" variant="primary" size="lg">
                  How we work
                  <ArrowRight />
                </ButtonLink>
                <p className="text-[0.875rem] text-ink-3">
                  Fixed scope · fixed fee · agreed before we start
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:mt-28 md:grid-cols-12">
          <ClipImage
            src="/images/strategy.jpg"
            alt="A strategist mapping an audience on a whiteboard"
            className="h-[300px] rounded-block md:col-span-7 md:h-[440px]"
            sizes="(min-width: 768px) 58vw, 100vw"
            soft
          />
          <ClipImage
            src="/images/agreement.jpg"
            alt="Two professionals shaking hands over a signed agreement"
            className="h-[300px] rounded-block md:col-span-5 md:mt-24 md:h-[440px]"
            sizes="(min-width: 768px) 42vw, 100vw"
            delay={0.12}
            soft
          />
        </div>
      </div>
    </section>
  );
}
