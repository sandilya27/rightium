import Link from "next/link";
import { services } from "@/lib/services";
import { site, telHref, whatsappHref } from "@/lib/site";
import { ArrowRight } from "@/components/ui/button";
import { Logo } from "./logo";

const firmLinks = [
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const elsewhereLinks = [
  ...site.socials,
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/**
 * Footer as a second close: the ask is set at display size across the
 * top, and only below the rule does it become an index. A four-column
 * link block on its own reads as the end of a site; the ask makes it
 * read as the end of an argument.
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-deep-well text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 100% 100%, rgba(0,168,182,0.18), transparent 70%)",
        }}
      />
      <div className="shell relative pt-20 pb-10 md:pt-24">
        <div className="grid items-end gap-12 border-b border-deep-line pb-14 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <p className="eyebrow m-0 text-accent-bright">Start a conversation</p>
            <h2 className="font-serif mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.015em]">
              Send the question.
              <br />
              <em className="accent-em-bright">We&rsquo;ll send back a scope.</em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3.5 md:justify-self-end">
            <a
              href={`mailto:${site.email}`}
              className="group/btn inline-flex h-[52px] items-center gap-3 bg-white px-6 text-[0.9375rem] font-medium text-deep transition-colors duration-[250ms] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent-soft"
            >
              {site.email}
              <ArrowRight className="size-[14px]" />
            </a>
            <p className="m-0 text-sm text-deep-ink-2">
              <a href={telHref}>{site.phone}</a>
              {" · "}
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              {" · "}
              {site.hours.label}
            </p>
          </div>
        </div>

        <div className="grid gap-12 pt-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-[21.25rem]">
            <Link href="/" aria-label={`${site.name} home`}>
              <Logo />
            </Link>
            <p className="mt-4.5 text-sm leading-[1.65] text-deep-ink-2">
              A Bengaluru-based IP research firm. Patent search, IP intelligence,
              database strategy, prosecution support, licensing, chemical safety
              intelligence and IP audits for corporate IP teams, law firms and
              R&amp;D leaders.
            </p>
            <p className="mt-4.5 text-sm leading-[1.65] text-deep-ink-2">
              {site.address.street}, {site.address.locality}
              <br />
              {site.address.city} {site.address.postalCode}, {site.address.region},{" "}
              {site.address.countryName}
            </p>
          </div>

          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
            <li>
              <Link href="/services" className="text-accent-bright">
                All services
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Firm">
            {firmLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            {elsewhereLinks.map((l) => (
              <FooterLink key={l.href} href={l.href} external={l.href.startsWith("http")}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-deep-line pt-6 text-[0.78125rem] text-deep-ink-3">
          <p className="m-0">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-serif m-0 text-[0.9375rem] italic text-deep-ink-2">
            Evidence you can defend.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="m-0 text-xs font-semibold tracking-[0.14em] uppercase text-deep-ink-3">
        {title}
      </h3>
      <ul className="mt-5 flex list-none flex-col gap-2.5 p-0 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "text-white/80 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent-bright";
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  );
}
