import { reasons } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

/**
 * Four reasons on navy, each hung under a hairline with a short teal
 * tick at its left end. The rules do the work a card border would, at a
 * quarter of the visual weight — which is what lets four columns sit
 * together without the section turning into a grid of boxes.
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

        <div className="mt-14 grid gap-10 sm:grid-cols-2 md:mt-[72px] md:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 0.09}
              className="relative border-t border-deep-line pt-6"
            >
              <span
                aria-hidden
                className="absolute top-[-1px] left-0 h-px w-12 bg-accent-bright"
              />
              <span className="font-serif text-[0.9375rem] text-accent-bright">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif mt-5.5 text-[1.625rem] leading-[1.15] tracking-[-0.01em] balance">
                {r.title}
              </h3>
              <p className="mt-4 text-[0.90625rem] leading-[1.65] text-deep-ink-2">
                {r.body}
              </p>
              <p className="mt-5.5 text-[0.78125rem] tracking-[0.06em] uppercase text-deep-ink-3">
                {r.tag}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
