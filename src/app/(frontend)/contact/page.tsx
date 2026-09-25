import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, telHref, whatsappHref } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact ${site.name} in Bengaluru — call ${site.phone}, WhatsApp us or email ${site.email}. Send a brief and get a scope, a price and a date, usually the same working day.`,
  path: "/contact",
});

const details = [
  { icon: Phone, label: "Call", value: site.phone, href: telHref },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Send us the details",
    href: whatsappHref,
    external: true,
  },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    icon: MapPin,
    label: "Office",
    value: site.address.short,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${site.name}, ${site.address.short}`,
    )}`,
    external: true,
  },
  { icon: Clock, label: "Hours", value: site.hours.label },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        image={{ src: "/images/agreement.jpg", alt: "Two professionals shaking hands over an agreement" }}
        title="Send the question. Get a scope back."
        lede="No discovery sequence, no gated PDF. Tell us what you are trying to decide and we will come back with what it takes to answer it — including when it is nothing we should be doing."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
            <Reveal>
              <dl className="space-y-7">
                {details.map(({ icon: Icon, label, value, href, external }) => (
                  <div key={label} className="flex gap-4">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-[var(--line)] bg-white text-accent">
                      <Icon className="size-4" strokeWidth={1.5} aria-hidden />
                    </span>
                    <div>
                      <dt className="eyebrow text-ink-3">{label}</dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-ink">
                        {href ? (
                          <a
                            href={href}
                            data-cursor="link"
                            className="link-underline"
                            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 rounded-card border border-[var(--line)] bg-[var(--accent-soft)] p-6">
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                  <span className="font-medium text-ink">Under deadline?</span>{" "}
                  Put the date in the brief. Expedited searches start at 24 hours
                  and we will tell you immediately if it is not realistic.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
