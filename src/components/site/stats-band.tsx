import { stats } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";

/**
 * Numbers on navy, hung under hairlines. Set larger than the hero's
 * band because here they are the section rather than a footnote to it.
 */
export function StatsBand() {
  return (
    <section className="deep-field on-deep py-20 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 100% 50%, rgba(0,168,182,0.16), transparent 70%)",
        }}
      />
      <div className="shell grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.09}
            className="border-t border-deep-line pt-6"
          >
            <Counter
              value={s.value}
              suffix={s.suffix}
              className="font-serif num block text-[clamp(3rem,5vw,4.5rem)] leading-none tracking-[-0.02em]"
            />
            <span className="mt-3.5 block text-sm text-deep-ink-2">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
