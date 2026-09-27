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

// The Insights section reads the CMS. Publishing purges this page; the
// timer is a safety net.
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Patent Search & IP Intelligence Firm in Bengaluru`,
  description: site.description,
  path: "/",
});

/**
 * Home. Navy and paper sections alternate so the brand frames the
 * reading: hero → manifesto → practice index → reasons → process →
 * case studies → voices → FAQ → insights → ask.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ServicesSection />
      <Why />
      <Process />
      <Proof />
      <Testimonials />
      <FAQ />
      <Insights />
      <CTA />
    </>
  );
}
