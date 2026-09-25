import { site } from "@/lib/site";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { Section, Eyebrow } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ArrowRight, ButtonLink } from "@/components/ui/button";

const faqs = [
  {
    title: "How fast can you turn work around?",
    description:
      "Patentability, invalidity and FTO searches land in two to five business days, and expedited work starts at 24 hours. Drafting and prosecution support run three to seven days, evidence-of-use charts five to ten, rapid tox searches and literature reviews three to ten. Landscapes, database migrations and IP audits are scoped per engagement. We commit to a date before starting, and if the date is not realistic we say so on the first call rather than missing it later.",
  },
  {
    title: "What exactly do we receive?",
    description:
      "The report, the raw working file, and the complete search log — every string, classification code, database and date range, including the queries that returned nothing. Your team can verify any conclusion or extend the work without briefing us again.",
  },
  {
    title: "Who actually does the work?",
    description:
      "A domain-matched analyst, reviewed by a second analyst whose job is to attack the first one's conclusion. A sequence search goes to someone with a molecular biology background; a chemical safety report goes to a qualified toxicologist; a claim chart goes to an engineer who knows the product category. You will know both names.",
  },
  {
    title: "What is the difference between “Order now” and “Contact us”?",
    description:
      "Order now is for fixed-scope work — a patentability search, a claim chart, a literature search — where the brief form is enough to start. Contact us is for engagements that need a conversation first, like a database migration, directed prosecution or an IP audit. Both go to the same team, and either way you get a written scope and fee before anything starts.",
  },
  {
    title: "How does pricing work?",
    description:
      "Fixed scope, fixed fee, agreed in writing before anything starts. Revisions inside that scope cost nothing — they are our problem, not yours. There are no open-ended retainers and no hourly surprises.",
  },
  {
    title: "Is our material kept confidential?",
    description:
      "Yes. Everything you send is treated as confidential, access is limited to the team on your matter, and we will sign your NDA rather than asking you to sign ours. Disclosure-sensitive searching can be run under a separate protocol on request.",
  },
  {
    title: "Can you work inside our templates and docketing system?",
    description:
      "For drafting, prosecution, docketing and claim charts, yes — we draft in your house style with tracked changes on, and deliver in the format your docket expects. Most law firm clients find our output goes straight into their workflow without reformatting.",
  },
];

export function FAQ() {
  return (
    <Section className="bg-surface">
      <JsonLd data={faqJsonLd(faqs.map((f) => ({ q: f.title, a: f.description })))} />
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start">
          <Reveal y={10}>
            <Eyebrow>FAQs</Eyebrow>
          </Reveal>
          <h2 className="font-display display-md mt-5 text-balance">
            <SplitText text="Questions, answered." />
          </h2>
          <Reveal delay={0.12}>
            <p className="prose-lede mt-5">
              The things clients ask before the first engagement. Anything else,
              send it over — you will get an answer, not a proposal.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" variant="outline">
                Ask us directly
                <ArrowRight />
              </ButtonLink>
              <a
                href={`mailto:${site.email}`}
                data-cursor="link"
                className="link-underline text-[0.875rem] text-ink-2"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </Section>
  );
}
