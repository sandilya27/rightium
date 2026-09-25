import type { Metadata } from "next";
import "./(frontend)/globals.css";
import { SiteShell } from "@/components/site/site-shell";
import { NotFoundContent } from "@/components/site/not-found-content";
import { site } from "@/lib/site";

// Served for any URL that matches no route. The app has two root
// layouts (site + admin), so this page brings its own document.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `Page not found | ${site.name}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
