import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "accent"
  | "glass"
  | "outline"
  | "ghost"
  | "invert"
  | "glass-dark";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn pill-sheen relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill font-medium whitespace-nowrap " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "pill-gloss-dark bg-ink text-white border border-transparent " +
    "shadow-[0_1px_2px_rgba(0,0,0,0.18),0_12px_30px_-14px_rgba(0,0,0,0.75)] " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#191919] " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_2px_4px_rgba(0,0,0,0.2),0_18px_40px_-16px_rgba(0,0,0,0.8)]",
  accent:
    "pill-gloss-dark bg-gradient-accent text-white border border-transparent " +
    "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_14px_32px_-14px_var(--accent)] " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent-hover",
  glass:
    "pill-gloss border border-white/80 bg-white/55 text-ink backdrop-blur-xl backdrop-saturate-150 " +
    "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_36px_-20px_rgba(0,0,0,0.4)] " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/80 " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_2px_6px_rgba(0,0,0,0.05),0_20px_44px_-22px_rgba(0,0,0,0.45)]",
  outline:
    "border border-[var(--line-strong)] bg-transparent text-ink " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:border-ink [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[rgba(0,0,0,0.04)]",
  ghost:
    "border border-transparent bg-transparent text-ink-2 " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:text-ink [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[rgba(0,0,0,0.05)]",
  invert:
    "pill-gloss bg-white text-ink border border-transparent shadow-[0_10px_30px_-16px_rgba(0,0,0,0.6)] " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/92",
  "glass-dark":
    "pill-gloss-dark border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.12] " +
    "[@media(hover:hover)_and_(pointer:fine)]:hover:border-white/25",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.875rem]",
  lg: "h-[52px] px-7 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
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
      data-cursor="link"
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      data-cursor="link"
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
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
        "size-4 shrink-0 transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
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

/** Small circular arrow badge — the template's card affordance. */
export function ArrowBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full border border-[var(--line)] bg-white text-ink",
        "transition-[background-color,color,border-color,transform] duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
        "[@media(hover:hover)_and_(pointer:fine)]:group-hover/card:bg-accent",
        "[@media(hover:hover)_and_(pointer:fine)]:group-hover/card:text-white",
        "[@media(hover:hover)_and_(pointer:fine)]:group-hover/card:border-accent",
        "[@media(hover:hover)_and_(pointer:fine)]:group-hover/card:rotate-[-45deg]",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" className="size-[14px]">
        <path
          d="M3 8h10m0 0L9 4m4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
