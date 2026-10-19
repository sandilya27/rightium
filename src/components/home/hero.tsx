import Link from "next/link";
import { stats } from "@/lib/site";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/motion/counter";
import { InventionScene } from "@/components/home/invention-scene";
import { HeroField } from "@/components/home/hero-field";

export function Hero() {
  return (
    <section className="evidence-hero relative isolate overflow-hidden bg-deep text-white">
      <HeroField />
      <div className="shell evidence-hero-grid">
        <div className="evidence-hero-copy">
          <h1 className="hero-title">Ideas move<br />the world.<br /><span>Evidence moves<br />them forward.</span></h1>
          <p className="hero-description">Know what exists. Find what matters. Make your next IP decision with examiner-grade research and a clear opinion behind it.</p>
          <div className="hero-actions">
            <ButtonLink href="/contact" size="lg" variant="accent">Discuss your project <ArrowRight /></ButtonLink>
            <Link href="/services" className="hero-services">Explore our expertise <ArrowRight /></Link>
          </div>
          <p className="hero-location">Bengaluru, India <span aria-hidden>—</span> Research across 90+ jurisdictions</p>
        </div>
        <div className="glacier-panel">
          <InventionScene />
        </div>
      </div>
      <div className="hero-counter-band">
        <div className="shell hero-counters">
          {stats.map((stat) => (
            <div className="hero-counter" key={stat.label}>
              <Counter margin="0px" value={stat.value} suffix={stat.suffix} className="hero-counter-value" />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
