import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site, telHref, whatsappHref } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact ${site.name} in Bengaluru — call ${site.phone}, WhatsApp us or email ${site.email}. Send a brief and get a scope, a price and a date, usually the same working day.`,
  path: "/contact",
});

const details: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}[] = [
  { label: "Call", value: site.phone, href: telHref },
  {
    label: "WhatsApp",
    value: "Send us the details",
    href: whatsappHref,
    external: true,
  },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    label: "Office",
    value: `${site.address.short} ${site.address.postalCode}`,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${site.name}, ${site.address.short}`,
    )}`,
    external: true,
  },
  { label: "Hours", value: site.hours.label },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Send the question.{" "}
            <em className="accent-em-bright">Get a scope back.</em>
          </>
        }
        lede="No discovery sequence, no gated PDF. Tell us what you are trying to decide and we will come back with what it takes to answer it — including when it is nothing we should be doing."
      />

      <section className="bg-paper pt-20 pb-20 md:pt-24 md:pb-[120px]">
        <div className="shell grid items-start gap-12 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-20">
          {/* Contact details as a definition list on rules — the same
              register as the deliverables tables elsewhere, so the page
              reads as part of the firm's documentation, not a widget. */}
          <Reveal className="md:sticky md:top-[6.875rem]">
            <dl className="m-0 flex flex-col border-t border-line-strong">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="grid grid-cols-[6.875rem_1fr] gap-4 border-b border-line-strong py-4.5"
                >
                  <dt className="pt-[3px] text-xs font-semibold tracking-[0.14em] uppercase text-accent">
                    {d.label}
                  </dt>
                  <dd className="m-0 text-[0.96875rem] leading-[1.5] text-ink-heading">
                    {d.href ? (
                      <a
                        href={d.href}
                        className="border-b border-transparent transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent"
                        {...(d.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 bg-deep px-8 py-7 text-white">
              <p className="font-serif m-0 text-[1.375rem] leading-[1.25]">
                Under deadline?
              </p>
              <p className="mt-3 text-[0.90625rem] leading-[1.6] text-deep-ink-2">
                Put the date in the brief. Expedited searches start at 24 hours and
                we will tell you immediately if it is not realistic.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
