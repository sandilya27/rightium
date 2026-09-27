import { Reveal } from "@/components/motion/reveal";

/**
 * Subscribe band.
 *
 * A GET form to /contact rather than a fake inline success: the email
 * arrives as a query param and the contact form opens with it filled in,
 * so one field is honestly the start of the brief rather than a
 * newsletter signup we have nowhere to store.
 */
export function SubscribeBand() {
  return (
    <section className="bg-surface border-t border-line py-20">
      <Reveal className="shell grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
        <div>
          <p className="eyebrow m-0">Subscribe</p>
          <h2 className="font-serif mt-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.015em] text-ink-heading">
            One note a month. Method, not marketing.
          </h2>
        </div>
        <form action="/contact" method="get" className="flex md:min-w-[26.25rem]">
          <input
            type="email"
            name="email"
            required
            placeholder="Work email"
            aria-label="Work email"
            className="h-[52px] flex-1 border border-r-0 border-deep bg-white px-4.5 text-[0.9375rem] text-ink-heading outline-none"
          />
          <button
            type="submit"
            className="h-[52px] cursor-pointer border border-deep bg-deep px-6 text-[0.90625rem] font-medium text-white transition-colors duration-[250ms] [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent"
          >
            Subscribe
          </button>
        </form>
      </Reveal>
    </section>
  );
}
