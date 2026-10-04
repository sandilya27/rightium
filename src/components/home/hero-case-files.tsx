"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { proofs } from "@/lib/services";

export function HeroCaseFiles() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeProof = proofs[activeIndex];

  useEffect(() => {
    if (paused || reduceMotion || proofs.length < 2) return;
    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % proofs.length);
    }, 4800);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, paused, reduceMotion]);

  return (
    <div
      className="hero-case-files pointer-events-auto min-w-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected case files"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="mb-4">
        <p className="m-0 text-[0.7rem] font-semibold tracking-[0.16em] text-accent-bright uppercase">Selected case files</p>
      </div>
      <div className="hero-case-stage" aria-live="off">
        <a
          href="#case-studies"
          className="block text-white no-underline"
          aria-label={`View selected work: ${activeProof.title}`}
          key={activeProof.title}
        >
          <article className="hero-case-card">
            <Image src={activeProof.image} alt="" fill sizes="(min-width: 768px) 42vw, 90vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#061524] via-[#061524]/55 to-[#061524]/10" />
            <div className="relative z-10 flex min-h-[21rem] flex-col p-5 sm:min-h-[24rem] sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[0.68rem] font-semibold tracking-[0.13em] text-accent-bright uppercase">{activeProof.sector}</span>
                <span className="font-mono text-[0.65rem] text-white/60">CASE 0{activeIndex + 1}</span>
              </div>
              <h2 className="font-serif mt-auto max-w-[19ch] text-[clamp(1.45rem,2.25vw,2.2rem)] leading-[1.08] text-white balance">{activeProof.title}</h2>
              <div className="mt-4 flex items-end gap-3 border-t border-white/20 pt-4">
                <span className="font-serif text-3xl leading-none text-accent-bright">{activeProof.metric}</span>
                <span className="max-w-[10rem] text-xs leading-snug text-white/70">{activeProof.metricLabel}</span>
              </div>
            </div>
          </article>
        </a>
      </div>
      <div className="hero-case-indicators mt-3 flex items-center gap-2" role="group" aria-label="Choose a case file">
        {proofs.map((proof, index) => (
          <button
            key={proof.title}
            type="button"
            aria-label={`Show case ${index + 1}: ${proof.sector}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className="hero-case-indicator"
          >
            <span className={activeIndex === index && !paused && !reduceMotion ? "is-playing" : undefined} />
          </button>
        ))}
      </div>
    </div>
  );
}
