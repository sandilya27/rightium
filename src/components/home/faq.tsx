import { faqs } from "@/lib/content";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";

/**
 * FAQ. The left column sticks while the answers scroll, so the offer to
 * just ask stays on screen for the length of the section — which is the
 * point of the section.
 */
export function FAQ() {
  return (
    <section className="bg-paper py-24 md:py-[130px]">
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="shell grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-20">
        <Reveal className="self-start md:sticky md:top-[7.5rem]">
          <p className="eyebrow m-0">Frequently asked</p>
          <h2 className="display-lg mt-5 text-ink-heading">Questions, answered.</h2>
          <p className="lede mt-5 max-w-[40ch]">
            The things clients ask before the first engagement. Anything else, send
            it over — you will get an answer, not a proposal.
          </p>
          <ButtonLink href="/contact" variant="outline" className="mt-8">
            Ask us directly
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
