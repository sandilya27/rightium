import type { ServiceItem } from "@/lib/services";
import { serviceCtaHref, serviceCtaLabel } from "@/lib/services";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * One orderable sub-service.
 *
 * The card carries the item's slug as its id, so the mega-menu's
 * /services/[category]#[item] links land on it. `:target` gives the
 * landed-on card an accent ring, which tells the visitor which of the
 * cards they clicked through for.
 */
export function ServiceItemCard({
  item,
  className,
}: {
  item: ServiceItem;
  className?: string;
}) {
  return (
    <article
      id={item.slug}
      className={cn(
        "flex h-full scroll-mt-[calc(var(--nav-h)+2rem)] flex-col rounded-card border border-[var(--line)] bg-white p-6 md:p-7",
        "shadow-[0_1px_2px_rgba(10,6,40,0.04)]",
        "transition-[border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--accent-line)]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_24px_50px_-34px_rgba(10,6,40,0.45)]",
        "target:border-accent target:shadow-[0_0_0_4px_var(--accent-glow)]",
        className,
      )}
    >
      <h3 className="font-display text-[1.1875rem] leading-snug tracking-[-0.015em]">
        {item.title}
      </h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
        {item.description}
      </p>
      <div className="mt-auto pt-6">
        <ButtonLink
          href={serviceCtaHref(item)}
          size="sm"
          variant={item.cta === "order" ? "accent" : "outline"}
        >
          {serviceCtaLabel[item.cta]}
          <ArrowRight />
        </ButtonLink>
      </div>
    </article>
  );
}
