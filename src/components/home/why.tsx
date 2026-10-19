import { reasons } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

/**
 * Four reasons on navy, with staggered entrances and one-time accent rules.
 */
export function Why() {
  return (
    <section className="deep-field on-deep py-24 md:py-[130px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 0% 100%, rgba(0,168,182,0.16), transparent 70%)",
        }}
      />
      <div className="shell">
        <Reveal className="max-w-[45rem]">
          <p className="eyebrow m-0">Why teams switch</p>
          <h2 className="display-lg mt-5 balance">
            Most IP reports ask you to take their word for it.{" "}
            <em className="accent-em-bright">Ours do not.</em>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-14 md:gap-8 lg:mt-[72px] lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 0.06}
            >
              <div className="relative border-t border-deep-line bg-deep-well/40 p-6 pt-7">
                <span aria-hidden="true" className="absolute -top-px left-0 h-[2px] w-full bg-accent-bright" />
                <span className="font-serif text-[0.9375rem] text-accent-bright font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif mt-5 text-[1.5rem] leading-[1.18] tracking-[-0.01em] balance text-white ">
                  {r.title}
                </h3>
                <p className="mt-4 text-[0.90625rem] leading-[1.65] text-deep-ink-2">
                  {r.body}
                </p>
                <p className="mt-6 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-deep-ink-3">
                  {r.tag}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
