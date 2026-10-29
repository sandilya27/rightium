/** Shared wire types and a strict navigation boundary for model-suggested links. */
export type ChatLink = { label: string; href: string };
export type ChatMessage = { role: "user" | "assistant"; content: string; links?: ChatLink[] };

export function approvedLinks(value: unknown, allowed: Set<string>): ChatLink[] {
  if (!Array.isArray(value)) return [];
  return value.filter((link): link is ChatLink =>
    !!link && typeof link === "object" && typeof link.label === "string" &&
    link.label.trim().length > 0 && link.label.length <= 100 &&
    typeof link.href === "string" && allowed.has(link.href),
  ).slice(0, 3);
}
