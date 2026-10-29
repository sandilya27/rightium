"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircleMore, Phone, X } from "lucide-react";
import { site, telHref, whatsappHref } from "@/lib/site";
import { capture } from "@/lib/analytics";
import styles from "./contact-shortcuts.module.css";

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" d="M12 2a10 10 0 0 0-8.65 15L2 22l5.13-1.34A10 10 0 1 0 12 2Z" />
      <path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.23-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.18-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.19.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.28.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.7.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

const shortcuts = [
  { label: "WhatsApp", href: whatsappHref, channel: "whatsapp", icon: WhatsAppIcon, external: true },
  { label: "Email", href: `mailto:${site.email}`, channel: "email", icon: Mail, external: false },
  { label: "Call", href: telHref, channel: "phone", icon: Phone, external: false },
];

export function ContactShortcuts() {
  const [open, setOpen] = useState(false);
  const group = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!group.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <nav ref={group} className={styles.shortcuts} aria-label="Quick contact" data-open={open}
      onPointerEnter={event => { if (event.pointerType === "mouse") setOpen(true); }}
      onPointerLeave={event => { if (event.pointerType === "mouse") setOpen(false); }}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={event => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } }}>
      <button ref={toggle} type="button" className={styles.toggle} aria-label={open ? "Close contact options" : "Open contact options"}
        aria-expanded={open} aria-controls="quick-contact-options" onClick={() => setOpen(value => !value)}>
        {open ? <X size={24} aria-hidden="true" /> : <MessageCircleMore size={25} aria-hidden="true" />}
      </button>
      <div id="quick-contact-options" className={styles.options} inert={!open}>
      {shortcuts.map(({ label, href, channel, icon: Icon, external }) => (
        <a key={channel} href={href} aria-label={label === "Call" ? `Call ${site.phone}` : `${label} Rightium`}
          target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
          data-channel={channel} onClick={() => { capture("contact_click", { channel }); setOpen(false); }}>
          <Icon size={21} aria-hidden="true" />
          <span className={styles.label} aria-hidden="true">{label}</span>
        </a>
      ))}
      </div>
    </nav>
  );
}
