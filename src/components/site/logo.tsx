import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark: black lens tile with a teal aperture dot.
 * The dot is the only teal in the header, which is what makes it read
 * as a mark rather than as decoration.
 */
export function Logo({
  className,
  invert = false,
  compact = false,
}: {
  className?: string;
  invert?: boolean;
  compact?: boolean;
}) {
  const tile = invert ? "#ffffff" : "var(--ink)";
  const aperture = invert ? "var(--deep)" : "#ffffff";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 26 26" className="size-[24px] shrink-0" aria-hidden>
        <rect width="26" height="26" rx="8" fill={tile} />
        <circle cx="12" cy="12" r="5.4" fill="none" stroke={aperture} strokeWidth="2" />
        <circle cx="19.5" cy="6.5" r="3.4" fill="var(--accent)" />
      </svg>
      {!compact && (
        <span
          className={cn(
            "font-display text-[1.0625rem] leading-none",
            invert && "text-white",
          )}
          style={{ fontWeight: 700, letterSpacing: "-0.035em" }}
        >
          {site.name}
        </span>
      )}
    </span>
  );
}
