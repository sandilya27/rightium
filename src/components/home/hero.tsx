import { stats } from "@/lib/site";
import { serviceCount } from "@/lib/services";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/motion/counter";
import { FlowLines, flowMask } from "@/components/motion/flow-lines";

/**
 * Full-viewport navy hero.
 *
 * The headline enters on a hand-tuned stagger rather than a scroll
 * reveal — it is already in view, so there is nothing to wait for, and
 * a 120ms cascade down the column is what tells the eye the order to
 * read in. The numbers band is pinned to the bottom edge so the fold
 * lands on evidence rather than on empty gradient.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-deep text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 85% 50%, var(--deep-lift) 0%, var(--deep) 55%, var(--deep-well) 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-95" style={flowMask.hero}>
        <FlowLines count={34} />
      </div>
      {/* Keeps the left column's contrast off the brightest lines. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--deep) 0%, rgba(10,31,51,0.85) 38%, rgba(10,31,51,0) 70%)",
        }}
      />

      <div className="shell relative flex flex-1 flex-col justify-center pt-[9.5rem] pb-16 md:pt-[10.625rem] md:pb-20">
        <p
          className="rise m-0 flex items-center gap-3.5 text-[0.78125rem] font-semibold tracking-[0.16em] uppercase text-accent-bright"
          style={{ animationDuration: "0.9s" }}
        >
          <span aria-hidden className="inline-block h-px w-9 bg-accent-bright" />
          Patent search &amp; IP intelligence · Bengaluru · 90+ jurisdictions
        </p>

        <h1
          className="display-hero rise mt-7 max-w-[15ch] balance"
          style={{ animationDuration: "1s", animationDelay: "0.12s" }}
        >
          The evidence behind every <em className="accent-em-bright">IP decision.</em>
        </h1>

        <p
          className="rise mt-9 max-w-[52ch] text-[1.05rem] leading-[1.6] text-deep-ink-2 md:text-[1.25rem]"
          style={{ animationDuration: "1s", animationDelay: "0.28s" }}
        >
          Examiner-grade search, landscapes, prosecution and licensing support for
          teams whose conclusions have to survive scrutiny — delivered with the
          method, the data and a clear opinion attached.
        </p>

        <div
          className="rise mt-11 flex flex-wrap items-center gap-3.5"
          style={{ animationDuration: "1s", animationDelay: "0.4s" }}
        >
          <ButtonLink href="/contact" size="lg" variant="accent">
            Request a quote
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/services" size="lg" variant="outline-invert">
            Explore all {serviceCount} services
          </ButtonLink>
        </div>
      </div>

      <div
        className="rise relative border-t border-deep-line bg-[rgba(6,21,36,0.5)] backdrop-blur-md"
        style={{ animationDuration: "1s", animationDelay: "0.7s" }}
      >
        <div className="shell grid grid-cols-2 gap-8 py-7 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1.5 border-l border-white/[0.18] pl-5"
            >
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="font-serif num text-[2rem] leading-none tracking-[-0.02em] md:text-[2.375rem]"
              />
              <span className="text-[0.8125rem] text-deep-ink-3">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
