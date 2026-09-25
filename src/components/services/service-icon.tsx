import {
  Atom,
  BookCheck,
  DatabaseZap,
  Library,
  Lightbulb,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import type { IconKey } from "@/lib/services";
import { cn } from "@/lib/utils";

const map = {
  search: ScanSearch,
  bulb: Lightbulb,
  database: DatabaseZap,
  library: Library,
  license: BookCheck,
  atom: Atom,
  shield: ShieldCheck,
} as const;

/**
 * Per-category tint. Each category keeps its own hue so a long
 * catalogue stays scannable — the eye finds "the amber one" faster
 * than it reads a heading. Used for small glyphs only; surfaces stay
 * on the indigo accent.
 */
export const iconTint: Record<IconKey, string> = {
  search: "text-[#7c3aed]",
  bulb: "text-[#d97706]",
  database: "text-[#0284c7]",
  library: "text-[#9a3412]",
  license: "text-[#059669]",
  atom: "text-[#2563eb]",
  shield: "text-[#dc2626]",
};

export function ServiceIcon({
  name,
  className,
  tinted = false,
}: {
  name: IconKey;
  className?: string;
  tinted?: boolean;
}) {
  const Icon = map[name];
  return (
    <Icon
      className={cn(tinted && iconTint[name], className)}
      strokeWidth={1.6}
      aria-hidden
    />
  );
}
