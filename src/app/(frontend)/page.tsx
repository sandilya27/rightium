import { getWorks } from "@/lib/works";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Hero } from "@/components/home/hero";
import { Statement } from "@/components/home/statement";
import { ServicesSection } from "@/components/home/services-section";
import { Why } from "@/components/home/why";
import { Process } from "@/components/home/process";
import { Proof } from "@/components/home/proof";
import { Testimonials } from "@/components/home/testimonials";
import { FAQ } from "@/components/home/faq";
import { Insights } from "@/components/home/insights";
import { CTA } from "@/components/site/cta";
import "./home.css";

// The Insights section reads the CMS. Publishing purges this page; the
// timer is a safety net.
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: `Patent Search & IP Intelligence in Bengaluru | ${site.name}`,
  description: site.description,
  path: "/",
});

/**
 * Home. Slate and cool-white sections alternate so the brand frames the
 * reading: hero → selected work → insights → manifesto → practice index →
 * reasons → process → voices → FAQ → ask.
 */
export default async function HomePage() {
  const proofs = await getWorks();
  return (
    <div className="home-slate">
      <Hero />
      {proofs.length > 0 && <Proof proofs={proofs} />}
      <Insights />
      <Statement />
      <ServicesSection />
      <Why />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
