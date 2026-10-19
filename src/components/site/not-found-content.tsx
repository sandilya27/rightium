import { readingAssembly } from "@/lib/reading-assembly";
import { PageHero } from "@/components/site/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

export function NotFoundContent() {
  return (
    <PageHero
      assembly={readingAssembly(["Home", "Services", "Contact"], "Conceptual optical assembly with site recovery destinations.")}
      eyebrow="404"
      title={
        <>
          That page isn&rsquo;t in the{" "}
          <em className="accent-em">index.</em>
        </>
      }
      lede="The link may be out of date, or the page may have moved. Start from the services overview, or send us the question directly."
      actions={
        <div className="flex flex-wrap gap-3.5">
          <ButtonLink href="/" size="lg" variant="accent">
            Back home
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/services" size="lg" variant="outline">
            Browse services
          </ButtonLink>
        <ButtonLink href="/contact" size="lg" variant="outline">Contact us</ButtonLink>
        </div>
      }
    />
  );
}
