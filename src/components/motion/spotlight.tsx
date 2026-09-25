"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A div that tracks the pointer into --mx / --my so the `.spotlight`
 * CSS can paint a glow under it. Writes CSS variables directly — no
 * state, no re-render per mouse move.
 */
export function Spotlight({ className, ...rest }: ComponentProps<"div">) {
  return (
    <div
      {...rest}
      className={cn("spotlight", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        rest.onPointerMove?.(e);
      }}
    />
  );
}
