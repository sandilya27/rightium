import { reasons } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";

/**
 * Four reasons on navy with interactive spotlight glow and tactile elevation.
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

        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:mt-[72px] md:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 0.09}
            >
              <Spotlight className="group relative border-t border-deep-line bg-deep-well/40 p-6 pt-7 transition-all duration-300 hover:border-accent-bright hover:bg-deep-lift/30">
                <span
                  aria-hidden
                  className="absolute top-[-1px] left-0 h-[2px] w-12 bg-accent-bright transition-all duration-500 group-hover:w-full"
                />
                <span className="font-serif text-[0.9375rem] text-accent-bright font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif mt-5 text-[1.5rem] leading-[1.18] tracking-[-0.01em] balance text-white group-hover:text-accent-bright transition-colors duration-300">
                  {r.title}
                </h3>
                <p className="mt-4 text-[0.90625rem] leading-[1.65] text-deep-ink-2">
                  {r.body}
                </p>
                <p className="mt-6 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-deep-ink-3">
                  {r.tag}
                </p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
