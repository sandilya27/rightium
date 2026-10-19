import type { AssemblyProfile, ModelAnchor } from "@/components/home/invention-scene";

// Matrix labels describe existing offerings; anchor identity is independent of count.
const anchors: ModelAnchor[] = ["housing", "iris", "lens", "fins", "base"];
function profile(description: string, labels: string[]): AssemblyProfile {
  return { description, labels: labels.map((text, i) => ({ anchor: anchors[i], text })) };
}

export const servicesAssembly = profile("Conceptual optical assembly introducing Rightium's IP service practices", [
  "Search", "Intelligence", "Prosecution", "Licensing", "Consulting",
]);

export const serviceAssemblies: Record<string, AssemblyProfile> = {
  "search-solutions": profile("Optical assembly showing the search practice's research topics", [
    "Patentability", "Invalidity", "FTO", "Patent Watch", "State of the Art",
  ]),
  "intelligence-solutions": profile("Optical assembly showing IP intelligence research topics", [
    "Quick Lens", "Landscapes", "Competitor Intelligence", "Innovation Scouting",
  ]),
  "patent-database-strategy": profile("Optical assembly showing the two database strategy services", [
    "Database Evaluation", "Database Migration",
  ]),
  "prep-and-prosecution": profile("Optical assembly showing preparation and prosecution support", [
    "Drafting", "Prosecution", "Paralegal Support", "Docketing",
  ]),
  licensing: profile("Optical assembly showing licensing research services", [
    "Portfolio Mining", "Evidence of Use", "Directed Prosecution",
  ]),
  "chemical-safety-intelligence": profile("Optical assembly showing chemical safety research topics", [
    "Rapid Tox Data", "Literature Search", "Chemical Safety Report",
  ]),
  "ip-consulting-and-audit": profile("Optical assembly showing the three IP audit services", [
    "IP Strategy Audit", "IP Process Audit", "IP Asset Audit",
  ]),
};
