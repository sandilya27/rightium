"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { services, serviceCount } from "@/lib/services";
import { Reveal } from "@/components/motion/reveal";

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ServicesSection() {
  const [active, setActive] = useState(services[0].slug);
  const reduceMotion = useReducedMotion();
  const stopAnchor = useRef<() => void>(() => {});
  useEffect(() => () => stopAnchor.current(), []);

  function selectPractice(slug: string, trigger: HTMLButtonElement) {
    stopAnchor.current();
    const top = trigger.getBoundingClientRect().top;
    let started: number | undefined;
    let frame = 0;
    setActive(active === slug ? "" : slug);
    // Compensate only for the collapsing panel above the clicked heading.
    // A wheel, touch or key gesture immediately returns control to the reader.
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
    stopAnchor.current = cancel;
    window.addEventListener("wheel", cancel, { once: true, passive: true });
    window.addEventListener("touchstart", cancel, { once: true, passive: true });
    window.addEventListener("keydown", cancel, { once: true });
    const track = (now: number) => {
      started ??= now;
      if (!cancelled && trigger.isConnected) {
        const delta = trigger.getBoundingClientRect().top - top;
        if (Math.abs(delta) > 0.5) window.scrollBy({ top: delta, behavior: "instant" });
      }
      if (!cancelled && now - started < 450) {
        frame = requestAnimationFrame(track);
      } else {
        window.removeEventListener("wheel", cancel);
        window.removeEventListener("touchstart", cancel);
        window.removeEventListener("keydown", cancel);
      }
    };
    frame = requestAnimationFrame(track);
  }

  return (
    <section id="services" className="practice-explorer" aria-labelledby="practices-heading">
      <div className="shell">
        <Reveal className="practice-intro">
          <h2 id="practices-heading">What we do.</h2>
          <div>
            <p>Seven practices.<br />One standard of evidence.</p>

          </div>
        </Reveal>

        <div className="practice-collection">
          {services.map((service) => {
            const expanded = active === service.slug;
            return (
              <article key={service.slug} className="practice-entry" data-expanded={expanded}>
                <h3>
                  <button
                    type="button"
                    id={`practice-${service.slug}`}
                    aria-expanded={expanded}
                    aria-controls={`practice-panel-${service.slug}`}
                    onClick={(event) => selectPractice(service.slug, event.currentTarget)}
                    className="practice-trigger"
                  >
                    <span>{service.title}</span>
                    <span className="practice-short">{service.short}</span>
                    <span className="practice-toggle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
                  </button>
                </h3>
                <motion.div
                  id={`practice-panel-${service.slug}`}
                  role="region"
                  aria-labelledby={`practice-${service.slug}`}
                  aria-hidden={!expanded}
                  inert={!expanded}
                  initial={false}
                  animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="practice-collapse"
                >
                <div className="practice-panel">
                  <motion.div className="practice-image" initial={false} animate={{ opacity: expanded ? 1 : 0.6, transform: expanded || reduceMotion ? "scale(1)" : "scale(0.985)" }} transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.23, 1, 0.32, 1] }}>
                    <Image src={service.image} alt="" fill sizes="(min-width: 900px) 42vw, 100vw" className="object-cover" />
                  </motion.div>
                  <motion.div className="practice-detail" initial={false} animate={{ opacity: expanded ? 1 : 0, y: expanded || reduceMotion ? 0 : 8 }} transition={{ duration: reduceMotion ? 0 : 0.22, delay: expanded && !reduceMotion ? 0.14 : 0 }}>
                    <p className="practice-description">{service.short}</p>
                    <ul className="practice-offerings">
                      {service.items.map((item) => (
                        <li key={item.slug}><Link href={`/services/${service.slug}#${item.slug}`}>{item.title}<Arrow /></Link></li>
                      ))}
                    </ul>
                    <div className="practice-bottom">
                      <p>Turnaround <strong>{service.turnaround}</strong></p>
                      <Link href={`/services/${service.slug}`} className="practice-action">View practice <Arrow /></Link>
                    </div>
                  </motion.div>
                </div>
                </motion.div>
              </article>
            );
          })}
        </div>
        <div className="practice-footer">
          <Link href="/services" className="practice-all practice-action">Explore all {serviceCount} services <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
