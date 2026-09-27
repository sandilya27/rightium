import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The wordmark: the name set in Newsreader with a small teal square on
 * the baseline where a full stop would go. The square is the whole
 * mark — it is the only geometric element in the identity, which is
 * what makes it legible at 7px.
 */
export function Logo({
  className,
  size = 26,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span
        className="font-serif leading-none"
        style={{ fontSize: size, fontWeight: 500, letterSpacing: "-0.01em" }}
      >
        {site.name}
      </span>
      <span
        aria-hidden
        className="inline-block bg-accent"
        style={{ width: 7, height: 7, transform: "translateY(-1px)" }}
      />
    </span>
  );
}
