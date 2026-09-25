import { PageHero } from "@/components/site/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

export function NotFoundContent() {
  return (
    <PageHero
      eyebrow="404"
      title="That page isn't in the index."
      lede="The link may be out of date, or the page may have moved. Start from the services overview, or send us the question directly."
    >
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/" size="lg" variant="invert">
          Back home
          <ArrowRight />
        </ButtonLink>
        <ButtonLink href="/services" size="lg" variant="glass-dark">
          Browse services
        </ButtonLink>
      </div>
    </PageHero>
  );
}
