import localFont from "next/font/local";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Cursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

// Self-hosted (SIL OFL, see src/fonts/LICENSE-*), so builds never depend
// on fetching from Google Fonts. Variable fonts, Latin subset.
const inter = localFont({
  src: "../../fonts/inter-latin-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const manrope = localFont({
  src: "../../fonts/manrope-latin-variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

/**
 * The public site's document: fonts, site-wide structured data, header
 * and footer. Shared by the (frontend) root layout and the global 404,
 * which Next.js renders outside any layout.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SmoothScroll />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
