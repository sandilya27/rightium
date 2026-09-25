import Link from "next/link";
import { formatDate, type Post } from "@/lib/post";
import { ArrowRight } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  featured = false,
  className,
}: {
  post: Post;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor="link"
      className={cn(
        "group/post flex h-full flex-col rounded-card border border-[var(--line)] bg-white p-7",
        "transition-[transform,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[3px]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--line-strong)]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_18px_40px_-26px_rgba(20,22,26,0.3)]",
        featured && "md:p-10",
        className,
      )}
    >
      <div className="flex items-center gap-3 text-[0.75rem] text-ink-3">
        <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 font-medium text-accent">
          {post.category}
        </span>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} min</span>
      </div>

      <h3
        className={cn(
          "font-display mt-5 leading-[1.14] tracking-[-0.02em] text-balance",
          featured ? "text-[1.75rem] md:text-[2.25rem]" : "text-[1.3rem]",
        )}
      >
        <span className="link-underline">{post.title}</span>
      </h3>

      <p
        className={cn(
          "mt-3 leading-relaxed text-ink-2",
          featured ? "text-[1.0625rem] md:max-w-[55ch]" : "text-[0.9375rem]",
        )}
      >
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-7">
        <span className="text-[0.8125rem] text-ink-3">{post.author.name}</span>
        <span className="group/btn inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink">
          Read
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
