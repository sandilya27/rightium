import { type AssemblyProfile, type ModelAnchor } from "@/components/home/invention-scene";

const anchors: ModelAnchor[] = ["housing", "iris", "lens"];

/** Read surfaces hold the same assembly still so the document stays primary. */
export function readingAssembly(labels: string[], description: string): AssemblyProfile {
  return {
    description,
    motion: "static",
    maxDpr: 1,
    labels: labels.slice(0, 3).map((text, index) => ({ anchor: anchors[index], text })),
  };
}

/** Use complete, short source labels; never clip a CMS heading into a new claim. */
export function editorialAssembly(topic: string, headings: { text: string }[], kind: "article" | "case study"): AssemblyProfile {
  const concise = (text: string) => text.trim().length > 0 && text.trim().length <= 30 && text.trim().split(/\s+/).length <= 5;
  const candidates = [topic, ...headings.map(({ text }) => text)].map(text => text.trim()).filter(concise);
  const labels = [...new Set(candidates)].slice(0, 3);
  if (!labels.length) labels.push(kind === "article" ? "Article" : "Case study", "Contents");
  return readingAssembly(labels, `Conceptual optical assembly accompanying this ${kind}; labels reflect its topic or section headings.`);
}
