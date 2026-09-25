import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, site, telHref, whatsappHref } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "./logo";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight } from "@/components/ui/button";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-gradient-deep text-white">
      <div aria-hidden className="mesh opacity-60">
        <span />
        <span />
        <span />
      </div>
      <div className="shell relative pt-20 pb-10 md:pt-28">
        {/* Oversized contact statement — the reference template's
            closing move, and the reason the footer reads as designed
            rather than as a sitemap. */}
        <Reveal>
          <div className="flex flex-col gap-8 border-b border-[var(--deep-line)] pb-14 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-[clamp(3rem,11vw,8rem)] leading-[0.86] tracking-[-0.05em]">
              Get in
              <br />
              <span className="text-gradient">touch</span>
            </h2>

            <div className="md:pb-3 md:text-right">
              <p className="text-[0.875rem] text-[var(--deep-ink-2)]">
                Send a brief, or just the question.
              </p>
              <a
                href={`mailto:${site.email}`}
                data-cursor="link"
                className="group/btn mt-3 inline-flex items-center gap-2.5 rounded-pill bg-white px-6 py-3.5 text-[0.9375rem] font-medium text-ink transition-[transform,background-color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/90"
              >
                {site.email}
                <ArrowRight />
              </a>
              <p className="mt-4 text-[0.875rem] text-[var(--deep-ink-2)]">
                <a href={telHref} className="link-underline">
                  {site.phone}
                </a>
                <span aria-hidden className="mx-2">·</span>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        <ul className="flex flex-col gap-4 border-b border-[var(--deep-line)] py-6 text-[0.9375rem] text-[var(--deep-ink-2)] md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-10">
          {[
            { icon: MapPin, label: site.address.short },
            { icon: Phone, label: site.phone, href: telHref },
            { icon: Mail, label: site.email, href: `mailto:${site.email}` },
          ].map(({ icon: Icon, label, href }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon className="size-4 shrink-0 text-[var(--accent-bright)]" strokeWidth={1.5} aria-hidden />
              {href ? (
                <a href={href} data-cursor="link" className="link-underline transition-colors duration-200 hover:text-white">
                  {label}
                </a>
              ) : (
                label
              )}
            </li>
          ))}
        </ul>

        <div className="grid gap-12 pt-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label={`${site.name} home`}>
              <Logo invert />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-[var(--deep-ink-2)]">
              {site.description}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[var(--deep-ink-2)]">
              {site.address.street}, {site.address.locality}
              <br />
              {site.address.city}, {site.address.region}, {site.address.countryName}
              <br />
              {site.hours.label}
            </p>
          </div>

          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
            <FooterLink href="/services">All services</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            {nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Elsewhere">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="link"
                  className="link-underline text-[var(--deep-ink-2)] transition-colors duration-200 hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--deep-line)] pt-8 text-xs text-[var(--deep-ink-2)] sm:flex-row sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Evidence you can defend.</p>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge. */}
      <Reveal y={60} duration={1.2}>
        <p
          aria-hidden
          className="font-display pointer-events-none -mb-[0.2em] text-center text-[clamp(4rem,17.5vw,17rem)] leading-[0.9] tracking-[-0.06em] whitespace-nowrap select-none"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {site.name}
        </p>
      </Reveal>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="eyebrow text-[var(--deep-ink-2)]">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        data-cursor="link"
        className="link-underline text-[var(--deep-ink-2)] transition-colors duration-200 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
