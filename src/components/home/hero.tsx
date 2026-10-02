import { stats } from "@/lib/site";
import { serviceCount } from "@/lib/services";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/motion/counter";
import { BlurReveal } from "@/components/motion/blur-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { PixelBlast } from "@/components/ui/pixel-blast";
import { Shield, Sparkles, CheckCircle2 } from "lucide-react";

/**
 * High-tech executive hero with centered typography and interactive PixelBlast background.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-deep text-white">
      {/* Interactive PixelBlast Canvas Background matching Rightium teal theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto opacity-75">
        <PixelBlast
          color="#00a8b6"
          variant="square"
          pixelSize={3}
          patternScale={2.6}
          patternDensity={1.05}
          enableRipples={true}
          rippleSpeed={0.35}
          rippleThickness={0.12}
          rippleIntensityScale={1.3}
          speed={0.35}
          edgeFade={0.25}
          transparent={true}
          antialias={true}
        />
      </div>

      {/* High-status ambient illumination and subtle contrast vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 38%, rgba(6,21,36,0.65) 0%, rgba(4,14,23,0.88) 75%, rgba(2,11,20,0.98) 100%)",
        }}
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-center pt-[9.5rem] pb-16 md:pt-[11rem] md:pb-20 pointer-events-none">
        
        {/* Left Flank: Live Prior Art & Clearance Telemetry (Visible on widescreen) */}
        <div
          className="rise pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 hidden w-56 flex-col gap-3.5 2xl:left-8 xl:flex"
          style={{ animationDuration: "1s", animationDelay: "0.4s" }}
        >
          {/* Card 1: Clearance Radar */}
          <div className="group flex flex-col gap-2 border border-white/10 bg-[rgba(6,21,36,0.7)] p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-bright/50 hover:shadow-[0_0_20px_rgba(0,168,182,0.15)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] font-semibold tracking-wider text-accent-bright uppercase">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-bright opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent-bright" />
                </span>
                Live Clearance
              </span>
              <span className="font-mono text-[0.625rem] text-deep-ink-3">90+ Offices</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[0.6875rem] font-medium text-white">
                US-11,842,109-B2
              </span>
              <span className="text-[0.7rem] leading-snug text-deep-ink-2">
                Quantum Annealing Architecture
              </span>
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <div className="flex justify-between text-[0.625rem]">
                <span className="text-deep-ink-3">Semantic Closeness</span>
                <span className="font-mono text-accent-bright font-medium">92.4%</span>
              </div>
              <div className="h-1 w-full bg-white/10">
                <div className="h-full w-[92.4%] bg-gradient-to-r from-accent to-accent-bright" />
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-1.5 font-mono text-[0.625rem] text-accent-bright">
              <span>0 FATAL BARS</span>
              <span className="text-deep-ink-3">Claims 1–14</span>
            </div>
          </div>

          {/* Card 2: Confidential Cleanroom */}
          <div className="group flex flex-col gap-1.5 border border-white/10 bg-[rgba(6,21,36,0.7)] p-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-bright/50">
            <div className="flex items-center gap-1.5">
              <Shield className="size-3 text-accent-bright" />
              <span className="font-mono text-[0.6875rem] font-semibold tracking-wider text-white uppercase">
                Air-Gapped Vault
              </span>
            </div>
            <p className="text-[0.6875rem] leading-relaxed text-deep-ink-3">
              Dual-blind analyst protocol. Strict ISO-grade air-gapped repositories.
            </p>
            <div className="font-mono text-[0.5625rem] tracking-tight text-accent-bright/80">
              SHA-256::7E4B...91FA
            </div>
          </div>
        </div>

        {/* Center-aligned hero content */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Eyebrow badge */}
          <div
            className="rise m-0 inline-flex items-center gap-3 border border-accent-bright/25 bg-[rgba(6,21,36,0.7)] px-4 py-1.5 text-[0.78125rem] font-semibold tracking-[0.16em] uppercase text-accent-bright backdrop-blur-md"
            style={{ animationDuration: "0.85s" }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-bright opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-bright" />
            </span>
            Patent search &amp; IP intelligence · Bengaluru · 90+ jurisdictions
          </div>

          {/* Centered Display Headline */}
          <h1
            className="display-hero rise mt-7 max-w-[18ch] text-balance text-center"
            style={{ animationDuration: "0.95s", animationDelay: "0.12s" }}
          >
            The evidence behind every{" "}
            <em className="accent-em-bright inline-block">
              <BlurReveal
                text="IP decision."
                delay={0.3}
                highlightClass="accent-em-bright text-accent-bright"
              />
            </em>
          </h1>

          {/* Centered Lede Copy */}
          <p
            className="rise mx-auto mt-7 max-w-[56ch] text-center text-[1.0625rem] leading-[1.68] text-deep-ink-2 md:text-[1.1875rem]"
            style={{ animationDuration: "0.95s", animationDelay: "0.24s" }}
          >
            Examiner-grade search, landscapes, prosecution and licensing support for
            teams whose conclusions have to survive scrutiny — delivered with the
            method, the data and a clear opinion attached.
          </p>

          {/* Centered CTA Buttons */}
          <div
            className="rise mt-9 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
            style={{ animationDuration: "0.95s", animationDelay: "0.36s" }}
          >
            <Magnetic strength={0.25}>
              <ButtonLink href="/contact" size="lg" variant="accent">
                Request a quote
                <ArrowRight />
              </ButtonLink>
            </Magnetic>

            <Magnetic strength={0.25}>
              <ButtonLink href="/services" size="lg" variant="outline-invert">
                Explore all {serviceCount} services
              </ButtonLink>
            </Magnetic>
          </div>

          {/* Centered Quality and Compliance Strip */}
          <div
            className="rise mt-12 grid w-full grid-cols-1 gap-4 border-y border-white/10 py-4 sm:grid-cols-3 max-w-3xl"
            style={{ animationDuration: "0.95s", animationDelay: "0.48s" }}
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-white">
                <CheckCircle2 className="size-3.5 text-accent-bright" />
                Full Query Logs
              </span>
              <span className="text-[0.72rem] leading-snug text-deep-ink-3">
                All databases &amp; strings disclosed
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 border-t border-white/10 pt-3 text-center sm:border-t-0 sm:border-l sm:border-white/10 sm:pt-0 sm:pl-4">
              <span className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-white">
                <Shield className="size-3.5 text-accent-bright" />
                Privileged Handling
              </span>
              <span className="text-[0.72rem] leading-snug text-deep-ink-3">
                Strict NDA &amp; air-gapped security
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 border-t border-white/10 pt-3 text-center sm:border-t-0 sm:border-l sm:border-white/10 sm:pt-0 sm:pl-4">
              <span className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-white">
                <Sparkles className="size-3.5 text-accent-bright" />
                Dual PhD Review
              </span>
              <span className="text-[0.72rem] leading-snug text-deep-ink-3">
                Technical PhD + Patent Agent signed
              </span>
            </div>
          </div>
        </div>

        {/* Right Flank: Classification Nodes & Scrutiny Telemetry (Visible on widescreen) */}
        <div
          className="rise pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 hidden w-56 flex-col gap-3.5 2xl:right-8 xl:flex"
          style={{ animationDuration: "1s", animationDelay: "0.5s" }}
        >
          {/* Card 1: IPC / CPC Nodes */}
          <div className="group flex flex-col gap-2 border border-white/10 bg-[rgba(6,21,36,0.7)] p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-bright/50 hover:shadow-[0_0_20px_rgba(0,168,182,0.15)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-[0.6875rem] font-semibold tracking-wider text-accent-bright uppercase">
                IPC / CPC Nodes
              </span>
              <span className="font-mono text-[0.625rem] text-accent-bright">14K+ Cites</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] text-white">G06N 10/00</span>
                <span className="text-[0.625rem] text-deep-ink-2">Quantum logic</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] text-white">C07D 471/04</span>
                <span className="text-[0.625rem] text-accent-bright">FTO Cleared</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] text-white">H04L 9/32</span>
                <span className="text-[0.625rem] text-deep-ink-2">Cryptography</span>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-1.5 font-mono text-[0.625rem] text-deep-ink-3">
              <span>USPTO Art Units</span>
              <span className="text-white">2854 · 1621</span>
            </div>
          </div>

          {/* Card 2: Opposition Benchmark */}
          <div className="group flex flex-col gap-1.5 border border-white/10 bg-[rgba(6,21,36,0.7)] p-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-bright/50">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6875rem] font-semibold tracking-wider text-accent-bright uppercase">
                Survival Benchmark
              </span>
              <span className="font-mono text-[0.75rem] font-bold text-accent-bright">
                99.2%
              </span>
            </div>
            <p className="text-[0.6875rem] leading-relaxed text-deep-ink-3">
              Patent trial survival rate at PTAB, EPO Opposition, and Delhi High Court.
            </p>
            <div className="font-mono text-[0.5625rem] tracking-tight text-white/80">
              ✓ Dual PhD &amp; Registered Agent Signed
            </div>
          </div>
        </div>
      </div>

      {/* Numbers Strip at Bottom Edge */}
      <div
        className="rise relative z-10 border-t border-deep-line bg-[rgba(6,21,36,0.6)] backdrop-blur-md"
        style={{ animationDuration: "1s", animationDelay: "0.6s" }}
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
