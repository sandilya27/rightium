import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  invert = false,
  className,
}: {
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-pill border py-1.5 pr-4 pl-3.5",
        invert
          ? "border-[var(--deep-line)] bg-white/5 text-[var(--deep-ink-2)]"
          : "border-[var(--line)] bg-white/70 text-ink-2 backdrop-blur-sm",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", invert ? "bg-accent-bright" : "bg-accent")} />
      <span className="eyebrow">{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  align = "center",
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  action?: ReactNode;
  align?: "start" | "center" | "split";
  invert?: boolean;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        align === "split"
          ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          : centered
            ? "flex flex-col items-center text-center"
            : "flex flex-col",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && (
          <Reveal y={10}>
            <Eyebrow invert={invert}>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <h2
          className={cn(
            "font-display display-md mt-5 text-balance",
            invert && "text-white",
          )}
        >
          <SplitText text={title} />
        </h2>
        {lede && (
          <Reveal delay={0.12}>
            <p
              className={cn(
                "prose-lede mt-5",
                centered && "mx-auto",
                invert && "text-[var(--deep-ink-2)]",
              )}
            >
              {lede}
            </p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={0.16} className={cn("shrink-0", centered && "mt-8")}>
          {action}
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="shell">{children}</div>
    </section>
  );
}
