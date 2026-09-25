import { stats } from "@/lib/site";
import { Counter } from "@/components/motion/counter";
import { Marquee } from "@/components/motion/marquee";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const practices = [
  "Patentability",
  "Invalidity",
  "Freedom to operate",
  "Landscaping",
  "Evidence of use",
  "Prosecution",
  "Chemical safety",
  "IP audit",
];

/**
 * Numbers band. A giant outlined marquee runs behind the counters so
 * the section has motion before the numbers start counting.
 */
export function Stats() {
  return (
    <section className="grain relative isolate overflow-hidden bg-gradient-deep py-24 text-white md:py-32">
      <div aria-hidden className="grid-lines opacity-60" />

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.08]">
        <Marquee duration={60} fade={false}>
          {practices.map((p) => (
            <span
              key={p}
              className="font-display mx-10 text-[clamp(5rem,14vw,12rem)] leading-none whitespace-nowrap"
              style={{ WebkitTextStroke: "1.5px #fff", color: "transparent" }}
            >
              {p}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="shell relative">
        <RevealGroup className="grid gap-px overflow-hidden rounded-block border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {stats.map((s) => (
            <RevealItem key={s.label} className="h-full">
              <div className="h-full bg-[rgba(6,3,24,0.82)] p-8 backdrop-blur-md md:p-10">
                <p className="font-display text-[3.25rem] leading-none tracking-[-0.05em] md:text-[4.25rem]">
                  <Counter value={s.value} suffix={s.suffix} className="text-gradient" />
                </p>
                <p className="mt-5 text-[0.9375rem] text-[var(--deep-ink-2)]">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
