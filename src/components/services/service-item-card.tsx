import Link from "next/link";
import type { ServiceItem } from "@/lib/services";
import { serviceCtaHref, serviceCtaLabel } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * One orderable sub-service.
 *
 * The card's footer carries both halves of the offer: the action, and a
 * label saying which kind of engagement it is. "Fixed scope" versus
 * "Scoped together" is the distinction clients actually ask about, so it
 * is set on the card rather than buried in the FAQ.
 */
export function ServiceItemCard({
  item,
  className,
}: {
  item: ServiceItem;
  className?: string;
}) {
  const ordered = item.cta === "order";

  return (
    <article
      id={item.slug}
      className={cn(
        "lift flex scroll-mt-[calc(var(--nav-h)+5rem)] flex-col border border-line-strong bg-white p-7",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[rgba(0,168,182,0.5)]",
        className,
      )}
    >
      <h3 className="font-serif m-0 text-[1.375rem] leading-[1.2] text-ink-heading">
        {item.title}
      </h3>
      <p className="mt-3 text-[0.90625rem] leading-[1.6] text-ink-2">
        {item.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <Link
          href={serviceCtaHref(item)}
          className={cn(
            "inline-flex h-10 items-center border border-deep px-[18px] text-[0.84375rem] font-medium transition-colors duration-[250ms]",
            ordered ? "bg-deep text-white" : "bg-transparent text-deep",
            "[@media(hover:hover)_and_(pointer:fine)]:hover:border-accent",
            "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent",
            "[@media(hover:hover)_and_(pointer:fine)]:hover:text-white",
          )}
        >
          {serviceCtaLabel[item.cta]}
        </Link>
        <span className="text-xs tracking-[0.08em] uppercase text-ink-2">
          {ordered ? "Fixed scope" : "Scoped together"}
        </span>
      </div>
    </article>
  );
}
