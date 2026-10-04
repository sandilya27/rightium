import { stats } from "@/lib/site";
import { serviceCount } from "@/lib/services";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/motion/counter";
import { BlurReveal } from "@/components/motion/blur-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { PixelBlast } from "@/components/ui/pixel-blast";
import { ShinyText } from "@/components/ui/shiny-text";
import { HeroCaseFiles } from "@/components/home/hero-case-files";
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

      <div className="shell relative z-10 grid flex-1 grid-cols-1 content-center gap-10 pt-[calc(var(--nav-h)+3.5rem)] pb-10 pointer-events-none sm:pt-[calc(var(--nav-h)+4rem)] sm:pb-12 md:grid-cols-[minmax(0,1fr)_minmax(20rem,0.92fr)] md:items-center md:gap-12 md:pt-[calc(var(--nav-h)+2.5rem)] md:pb-16 lg:gap-16">
        {/* Center-aligned hero content */}
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center md:mx-0 md:items-start md:text-left">
          {/* Eyebrow badge */}
          <div
            className="rise m-0 inline-flex max-w-full items-center justify-center gap-1.5 border border-accent-bright/25 bg-[rgba(6,21,36,0.7)] px-2 py-2 text-center text-[0.58rem] leading-none font-semibold tracking-[0.04em] uppercase backdrop-blur-md max-[360px]:gap-1 max-[360px]:px-1.5 max-[360px]:text-[0.5rem] max-[360px]:tracking-[0.02em] md:gap-3 md:px-4 md:py-1.5 md:text-[0.78125rem] md:tracking-[0.16em]"
            style={{ animationDuration: "0.85s" }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-bright opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-bright" />
            </span>
            <span className="whitespace-nowrap md:hidden">
              <ShinyText
                text="Patent & IP · Bengaluru · 90+ jurisdictions"
                color="#3cc4cf"
                shineColor="#ffffff"
                speed={2.6}
                spread={120}
                direction="left"
              />
            </span>
            <span className="hidden whitespace-nowrap md:inline">
              <ShinyText
                text="Patent search & IP intelligence · Bengaluru · 90+ jurisdictions"
                color="#3cc4cf"
                shineColor="#ffffff"
                speed={2.6}
                spread={120}
                direction="left"
              />
            </span>
          </div>

          {/* Centered Display Headline */}
          <h1
            className="display-hero rise mt-6 max-w-[18ch] text-balance text-center sm:mt-7 md:text-left"
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
            className="rise mx-auto mt-5 max-w-[56ch] text-center text-[0.98rem] leading-[1.65] text-deep-ink-2 sm:mt-7 sm:text-[1.0625rem] md:mx-0 md:text-left md:text-[1.0625rem] lg:text-[1.1875rem]"
            style={{ animationDuration: "0.95s", animationDelay: "0.24s" }}
          >
            Examiner-grade search, landscapes, prosecution and licensing support for
            teams whose conclusions have to survive scrutiny — delivered with the
            method, the data and a clear opinion attached.
          </p>

          {/* Centered CTA Buttons */}
          <div
            className="rise mt-7 flex flex-wrap items-center justify-center gap-3 pointer-events-auto min-[420px]:gap-4 sm:mt-9 md:justify-start"
            style={{ animationDuration: "0.95s", animationDelay: "0.36s" }}
          >
            <Magnetic strength={0.25}>
              <ButtonLink href="/contact" size="lg" variant="accent" className="max-[419px]:w-full">
                Request a quote
                <ArrowRight />
              </ButtonLink>
            </Magnetic>

            <Magnetic strength={0.25}>
              <ButtonLink href="/services" size="lg" variant="outline-invert" className="max-[419px]:w-full">
                Explore all {serviceCount} services
              </ButtonLink>
            </Magnetic>
          </div>

          {/* Centered Quality and Compliance Strip */}
          <div
            className="rise mt-8 grid w-full max-w-3xl grid-cols-3 gap-0 border-y border-white/10 py-3 sm:mt-12 sm:gap-4 sm:py-4 md:mt-8"
            style={{ animationDuration: "0.95s", animationDelay: "0.48s" }}
          >
            <div className="flex min-w-0 flex-col items-center gap-1 px-1 text-center sm:px-0">
              <span className="flex min-w-0 items-center gap-1 text-[0.58rem] leading-tight font-semibold text-white md:gap-1.5 md:text-[0.8125rem]">
                <CheckCircle2 className="size-3 shrink-0 text-accent-bright md:size-3.5" />
                <span className="whitespace-nowrap md:hidden">Full logs</span>
                <span className="hidden whitespace-nowrap md:inline">Full Query Logs</span>
              </span>
              <span className="sr-only md:not-sr-only md:text-[0.72rem] md:leading-snug md:text-deep-ink-3">
                All databases &amp; strings disclosed
              </span>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-1 border-l border-white/10 px-1 text-center md:items-center md:gap-1.5 md:border-l md:border-white/10 md:pt-0 md:pl-4">
              <span className="flex min-w-0 items-center gap-1 text-[0.58rem] leading-tight font-semibold text-white md:gap-1.5 md:text-[0.8125rem]">
                <Shield className="size-3 shrink-0 text-accent-bright md:size-3.5" />
                <span className="whitespace-nowrap md:hidden">NDA safe</span>
                <span className="hidden whitespace-nowrap md:inline">Privileged Handling</span>
              </span>
              <span className="sr-only md:not-sr-only md:text-[0.72rem] md:leading-snug md:text-deep-ink-3">
                Strict NDA &amp; air-gapped security
              </span>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-1 border-l border-white/10 px-1 text-center sm:gap-1.5 sm:pl-4">
              <span className="flex min-w-0 items-center gap-1 text-[0.58rem] leading-tight font-semibold text-white md:gap-1.5 md:text-[0.8125rem]">
                <Sparkles className="size-3 shrink-0 text-accent-bright md:size-3.5" />
                <span className="whitespace-nowrap md:hidden">Dual review</span>
                <span className="hidden whitespace-nowrap md:inline">Dual PhD Review</span>
              </span>
              <span className="sr-only md:not-sr-only md:text-[0.72rem] md:leading-snug md:text-deep-ink-3">
                Technical PhD + Patent Agent signed
              </span>
            </div>
          </div>
        </div>

        <HeroCaseFiles />
      </div>

      {/* Numbers Strip at Bottom Edge */}
      <div
        className="rise relative z-10 border-t border-deep-line bg-[rgba(6,21,36,0.6)] backdrop-blur-md"
        style={{ animationDuration: "1s", animationDelay: "0.6s" }}
      >
        <div className="shell grid grid-cols-2 gap-x-4 gap-y-6 py-5 sm:gap-x-8 sm:py-7 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex min-w-0 flex-col gap-1.5 border-l border-white/[0.18] pl-3 sm:pl-5"
            >
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="font-serif num text-[clamp(1.6rem,7vw,2rem)] leading-none tracking-[-0.02em] md:text-[2.375rem]"
              />
              <span className="text-[0.72rem] leading-[1.35] text-deep-ink-3 sm:text-[0.8125rem]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
