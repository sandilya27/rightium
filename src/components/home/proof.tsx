"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { proofs } from "@/lib/services";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { SectionHead } from "@/components/ui/section";

export function Proof() {
  const [selected, setSelected] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const selectedProof = selected === null ? null : proofs[selected];

  useEffect(() => {
    if (selectedProof === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProof]);

  return (
    <section className="bg-surface border-t border-line py-20 md:py-[120px]">
      <div className="shell">
        <SectionHead
          eyebrow="Selected work"
          title="Outcomes, not adjectives."
          lede="Client names are confidential; the mechanics are not. Each started as one question with a deadline attached."
          maxWidth="max-w-[45rem]"
        />

        <motion.div layout className="mt-12 grid gap-5 md:mt-16 md:grid-cols-12">
          <AnimatePresence initial={false} mode="popLayout">
            {proofs.map((proof, index) =>
              selected === index ? null : (
                <Reveal
                  key={proof.title}
                  delay={(index % 2) * 0.08}
                  className={index % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}
                >
                  <motion.article
                    layoutId={`proof-card-${index}`}
                    className="h-full"
                    transition={{ duration: reduce ? 0 : 0.48, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Spotlight className="group relative isolate flex min-h-[24rem] h-full overflow-hidden bg-deep text-white shadow-sm md:min-h-[28rem]">
                      <Image
                        src={proof.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 55vw, 100vw"
                        className="-z-10 object-cover opacity-55 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                      />
                      <div aria-hidden className="absolute inset-0 -z-[1] bg-gradient-to-t from-[#061524] via-[#061524]/55 to-[#061524]/10" />
                      <div className="relative z-[1] flex min-h-[24rem] w-full flex-col p-6 sm:p-8 md:min-h-[28rem] md:p-10">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-xs font-semibold tracking-[0.14em] text-accent-bright uppercase">
                            {proof.sector}
                          </span>
                          <span className="font-mono text-[0.7rem] tracking-[0.12em] text-white/60">
                            CASE 0{index + 1}
                          </span>
                        </div>
                        <h3 className="font-serif mt-auto max-w-[18ch] text-[clamp(1.75rem,3vw,2.65rem)] leading-[1.08] tracking-[-0.015em] text-white balance transition-transform duration-500 group-hover:translate-x-1">
                          {proof.title}
                        </h3>
                        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-white/20 pt-5">
                          <div className="flex items-baseline gap-3">
                            <span className="font-serif text-[2.5rem] leading-none tracking-[-0.02em] text-accent-bright">
                              {proof.metric}
                            </span>
                            <span className="max-w-[10rem] text-[0.8125rem] leading-snug text-white/70">
                              {proof.metricLabel}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelected(index)}
                            className="inline-flex items-center gap-2 border-b border-accent-bright pb-1 text-sm font-medium text-white transition-[color,gap] duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:gap-3 [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent-bright"
                          >
                            Open case file <ArrowRight className="size-4" />
                          </button>
                        </div>
                      </div>
                    </Spotlight>
                  </motion.article>
                </Reveal>
              ),
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedProof && selected !== null && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-[#061524]/75 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <motion.article
              layoutId={`proof-card-${selected}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-file-title"
              className="relative w-full max-w-[54rem] overflow-hidden bg-deep text-white shadow-2xl"
              transition={{ duration: reduce ? 0 : 0.48, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="plate relative aspect-[16/8] min-h-[15rem]">
                <Image src={selectedProof.image} alt="" fill sizes="(min-width: 900px) 864px, 100vw" className="object-cover opacity-65" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#061524] via-[#061524]/35 to-transparent" />
                <button
                  type="button"
                  aria-label="Close case file"
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-10 grid size-11 place-items-center border border-white/35 bg-[#061524]/65 text-white transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white [@media(hover:hover)_and_(pointer:fine)]:hover:text-deep"
                >
                  <X className="size-5" />
                </button>
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-9">
                  <p className="text-xs font-semibold tracking-[0.14em] text-accent-bright uppercase">{selectedProof.sector} · Case 0{selected + 1}</p>
                  <h3 id="case-file-title" className="font-serif mt-3 max-w-[22ch] text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.08]">{selectedProof.title}</h3>
                </div>
              </div>
              <div className="grid gap-8 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-10">
                <p className="m-0 max-w-[62ch] text-[0.98rem] leading-[1.75] text-deep-ink-2">{selectedProof.body}</p>
                <div className="border-l border-accent-bright pl-5">
                  <p className="font-serif m-0 text-4xl leading-none text-accent-bright">{selectedProof.metric}</p>
                  <p className="mt-2 max-w-[12rem] text-sm text-deep-ink-2">{selectedProof.metricLabel}</p>
                </div>
              </div>
            </motion.article>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
