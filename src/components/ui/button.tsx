import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Square buttons, four variants, no radius anywhere.
 *
 * `accent` is the one that asks for money; `ink` is the working
 * default; `outline` and `outline-invert` are the alternative on light
 * and dark ground. Every variant resolves to teal on hover, so the
 * accent colour marks the moment of commitment rather than decorating
 * the page.
 */
type Variant = "accent" | "ink" | "outline" | "outline-invert" | "invert";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-3 font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform] duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "disabled:pointer-events-none disabled:opacity-70";

const hover = "[@media(hover:hover)_and_(pointer:fine)]:hover:";

const variants: Record<Variant, string> = {
  accent: `bg-accent text-white border border-accent ${hover}bg-accent-hover ${hover}border-accent-hover ${hover}-translate-y-px`,
  ink: `bg-deep text-white border border-deep ${hover}bg-accent ${hover}border-accent`,
  outline: `border border-deep bg-transparent text-deep ${hover}bg-deep ${hover}text-white`,
  "outline-invert": `border border-white/45 bg-transparent text-white ${hover}bg-white ${hover}text-deep ${hover}border-white`,
  invert: `bg-white text-deep border border-white ${hover}bg-accent-soft`,
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-[18px] text-[0.84375rem]",
  md: "h-[50px] px-6 text-[0.90625rem]",
  lg: "h-[54px] px-7 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "accent",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "accent",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

/** Arrow that steps forward on hover and returns on leave. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn(
        "size-[15px] shrink-0 transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
        "[@media(hover:hover)_and_(pointer:fine)]:group-hover/btn:translate-x-[3px]",
        className,
      )}
    >
      <path
        d="M2.5 8h11m0 0L9.25 3.75M13.5 8l-4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The teal check the deliverable lists are built from. */
export function Tick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("size-4 shrink-0", className)}
    >
      <path
        d="M3 8.5l3 3 7-7"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Text link with a teal rule under it — the design's "more" affordance.
 * Used wherever a section points at its own index page.
 */
export function TextLink({
  href,
  children,
  className,
  invert = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/btn inline-flex items-center gap-2.5 border-b-[1.5px] border-accent pb-[3px] text-[0.90625rem] font-medium",
        invert ? "text-white" : "text-deep",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-[14px]" />
    </Link>
  );
}
