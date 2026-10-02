import Image from "next/image";
import { proofs } from "@/lib/services";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { SectionHead } from "@/components/ui/section";

/**
 * Case studies with animated spotlight cards and interactive image zooms.
 */
export function Proof() {
  return (
    <section className="bg-surface border-t border-line py-20 md:py-[120px]">
      <div className="shell">
        <SectionHead
          eyebrow="Selected work"
          title="Outcomes, not adjectives."
          lede="Client names are confidential; the mechanics are not. Each started as one question with a deadline attached."
          maxWidth="max-w-[45rem]"
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
          {proofs.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i % 2) * 0.1}
              as="article"
            >
              <Spotlight className="group lift grid grid-cols-1 border border-line bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/40 sm:grid-cols-[minmax(0,1fr)_12.5rem]">
                <div className="flex flex-col p-8 pb-7">
                  <p className="m-0 text-xs font-semibold tracking-[0.14em] uppercase text-accent">
                    {p.sector}
                  </p>
                  <h3 className="font-serif mt-4 text-2xl leading-[1.2] text-ink-heading balance group-hover:text-accent transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-3.5 text-sm leading-[1.6] text-ink-2">{p.body}</p>
                  <div className="mt-auto flex items-baseline gap-3 pt-6">
                    <span className="font-serif text-[2.5rem] leading-none tracking-[-0.02em] text-ink-heading">
                      {p.metric}
                    </span>
                    <span className="text-[0.8125rem] text-ink-2">{p.metricLabel}</span>
                  </div>
                </div>
                <div className="plate order-first min-h-[10rem] overflow-hidden sm:order-none sm:min-h-0">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 200px, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                  />
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
