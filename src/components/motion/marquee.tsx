import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Constant-motion marquee.
 *
 * Deliberately a CSS animation, not JS: it runs continuously, so it
 * must survive the main thread being busy with route loads and image
 * decoding. Linear easing — constant motion has no acceleration.
 * The track is duplicated and translated -50%, so the loop is seamless.
 */
export function Marquee({
  children,
  duration = 42,
  className,
  fade = true,
  reverse = false,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  fade?: boolean;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "marquee-host relative overflow-hidden",
        reverse && "marquee-reverse",
        className,
      )}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            }
          : undefined
      }
    >
      <div
        className="marquee-track flex w-max items-center"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
