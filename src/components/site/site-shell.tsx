import localFont from "next/font/local";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

// Self-hosted (SIL OFL, see src/fonts/LICENSE-*), so builds never depend
// on fetching from Google Fonts. Variable fonts, Latin subset.
const newsreader = localFont({
  src: [
    { path: "../../fonts/newsreader-latin-variable.woff2", style: "normal" },
    { path: "../../fonts/newsreader-latin-italic-variable.woff2", style: "italic" },
  ],
  variable: "--font-newsreader",
  weight: "300 700",
  display: "swap",
});

const plex = localFont({
  src: "../../fonts/ibm-plex-sans-latin-variable.woff2",
  variable: "--font-plex",
  weight: "400 600",
  display: "swap",
});

/**
 * The public site's document: fonts, site-wide structured data, header
 * and footer. Shared by the (frontend) root layout and the global 404,
 * which Next.js renders outside any layout.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${plex.variable}`}>
      <body className="antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
