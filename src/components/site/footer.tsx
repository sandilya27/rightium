import Link from "next/link";
import { services } from "@/lib/services";
import { site, telHref, whatsappHref } from "@/lib/site";
import { ArrowRight } from "@/components/ui/button";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.opening}>
          <h2>Evidence you can defend.</h2>
          <a className={styles.email} href={`mailto:${site.email}`}>
            <span>{site.email}</span><ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className={styles.directory}>
          <div className={styles.intro}>
            <p>A Bengaluru-based IP research firm.</p>
            <p>Patent search, IP intelligence, database strategy, prosecution support,
              licensing, chemical safety intelligence and IP audits for corporate IP
              teams, law firms and R&amp;D leaders.</p>
          </div>
          <nav className={styles.practices} aria-label="Footer services">
            <h3>Our practice</h3>
            <ul>
              {services.map((service) => (
                <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link></li>
              ))}
              <li><Link className={styles.allServices} href="/services">All services <ArrowRight aria-hidden="true" /></Link></li>
            </ul>
          </nav>
          <nav aria-label="Footer firm">
            <h3>Rightium</h3>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Insights</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
            <ul className={styles.socials}>
              {site.socials.map((social) => (
                <li key={social.label}><a href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className={styles.contact}>
            <h3>Find us in Bengaluru</h3>
            <address>
              {site.address.street}, {site.address.locality}<br />
              {site.address.city} {site.address.postalCode}<br />
              {site.address.region}, {site.address.countryName}
            </address>
            <div className={styles.direct}>
              <a href={telHref}>{site.phone}</a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowRight aria-hidden="true" /></a>
            </div>
            <p className={styles.hours}>{site.hours.label}</p>
          </div>
        </div>
        <div className={styles.legal}>
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link></div>
        </div>
      </div>
    </footer>
  );
}
