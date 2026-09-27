import { PageHero } from "@/components/site/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

export function NotFoundContent() {
  return (
    <PageHero
      eyebrow="404"
      title={
        <>
          That page isn&rsquo;t in the{" "}
          <em className="accent-em-bright">index.</em>
        </>
      }
      lede="The link may be out of date, or the page may have moved. Start from the services overview, or send us the question directly."
      aside={
        <div className="flex flex-wrap gap-3.5">
          <ButtonLink href="/" size="lg" variant="accent">
            Back home
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/services" size="lg" variant="outline-invert">
            Browse services
          </ButtonLink>
        </div>
      }
    />
  );
}
