import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Section furniture.
 *
 * Every section in the design opens the same way: a teal eyebrow, a
 * serif display line, optionally a lede, and optionally an action
 * pushed to the far right on the same baseline. Keeping that in one
 * place is what stops eleven sections drifting apart.
 */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow m-0", className)}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
  /** `split` puts the action on the heading's baseline, far right. */
  layout = "stack",
  size = "lg",
  className,
  maxWidth = "max-w-[40rem]",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  layout?: "stack" | "split";
  size?: "lg" | "md";
  className?: string;
  maxWidth?: string;
}) {
  const head = (
    <div className={maxWidth}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          eyebrow ? "mt-5" : "mt-0",
          size === "lg" ? "display-lg" : "display-md",
          "text-ink-heading balance",
        )}
      >
        {title}
      </h2>
      {lede && <p className="lede mt-5">{lede}</p>}
    </div>
  );

  if (layout === "split") {
    return (
      <Reveal
        className={cn(
          "flex flex-wrap items-end justify-between gap-8",
          className,
        )}
      >
        {head}
        {action}
      </Reveal>
    );
  }

  return (
    <Reveal className={className}>
      {head}
      {action && <div className="mt-8">{action}</div>}
    </Reveal>
  );
}

/** Light section. Vertical rhythm is the one thing sections share. */
export function Section({
  children,
  className,
  id,
  tone = "paper",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "surface" | "deep";
  size?: "md" | "lg";
}) {
  return (
    <section
      id={id}
      className={cn(
        size === "lg" ? "py-24 md:py-[130px]" : "py-20 md:py-[120px]",
        tone === "surface" && "bg-surface border-t border-line",
        tone === "deep" && "deep-field on-deep",
        className,
      )}
    >
      <div className="shell">{children}</div>
    </section>
  );
}
