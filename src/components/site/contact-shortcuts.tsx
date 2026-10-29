"use client";

import { Mail, Phone } from "lucide-react";
import { site, telHref, whatsappHref } from "@/lib/site";
import { capture } from "@/lib/analytics";
import styles from "./contact-shortcuts.module.css";

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z" />
      <path d="m8.1 7.2 1.4 2.5-1 1.1a9.3 9.3 0 0 0 4.6 4.1l1-1.2 2.6 1.2c-.3 1.6-1.1 2.1-2.4 1.9-4.2-.7-7.5-4-8-7.4-.2-1.3.4-2 1.8-2.2Z" />
    </svg>
  );
}

const shortcuts = [
  { label: "WhatsApp", href: whatsappHref, channel: "whatsapp", icon: WhatsAppIcon, external: true },
  { label: "Email", href: `mailto:${site.email}`, channel: "email", icon: Mail, external: false },
  { label: "Call", href: telHref, channel: "phone", icon: Phone, external: false },
];

export function ContactShortcuts() {
  return (
    <nav className={styles.shortcuts} aria-label="Quick contact">
      {shortcuts.map(({ label, href, channel, icon: Icon, external }) => (
        <a key={channel} href={href} aria-label={label === "Call" ? `Call ${site.phone}` : `${label} Rightium`}
          target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
          onClick={() => capture("contact_click", { channel })}>
          <Icon size={21} aria-hidden="true" />
          <span className={styles.label} aria-hidden="true">{label}</span>
        </a>
      ))}
    </nav>
  );
}
