import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/post";
import { cn } from "@/lib/utils";

/**
 * Article card. No thumbnail: the insights are about method, and a
 * stock image over a piece on search strings adds nothing the headline
 * does not already say. The meta row carries category and reading time,
 * the footer carries the byline — so the card is scannable from either
 * end.
 */
export function PostCard({
  post,
  className,
  style,
}: {
  post: Post;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={style}
      className={cn(
        "lift flex h-full flex-col border border-line bg-white p-8",
        className,
      )}
    >
      <div className="flex items-center gap-3 text-[0.78125rem] text-ink-2">
        <span className="font-semibold tracking-[0.1em] uppercase text-accent">
          {post.category}
        </span>
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="font-serif mt-5 text-2xl leading-[1.2] text-ink-heading balance">
        {post.title}
      </h3>

      <p className="mt-3.5 text-[0.90625rem] leading-[1.6] text-ink-2">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-7 text-[0.8125rem] text-ink-2">
        <span>
          {post.author.name} · {formatDate(post.date)}
        </span>
        <span className="font-medium text-ink-heading">Read →</span>
      </div>
    </Link>
  );
}

/** The wide navy card that opens the insights index. */
export function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/post grid overflow-hidden bg-deep text-white md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
    >
      <div className="flex flex-col p-10 pb-12 md:p-14 md:pb-12">
        <div className="flex flex-wrap items-center gap-3 text-[0.78125rem] text-deep-ink-3">
          <span className="font-semibold tracking-[0.1em] uppercase text-accent-bright">
            {post.category}
          </span>
          <span aria-hidden>·</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h2 className="font-serif mt-6 text-[clamp(2rem,3.4vw,3rem)] leading-[1.1] tracking-[-0.015em] balance">
          {post.title}
        </h2>
        <p className="mt-5 max-w-[56ch] text-base leading-[1.6] text-deep-ink-2">
          {post.excerpt}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10 text-sm">
          <span className="text-deep-ink-2">
            {post.author.name}
            {post.author.role ? `, ${post.author.role}` : ""}
          </span>
          <span className="inline-flex items-center gap-2.5 border-b-[1.5px] border-accent-bright pb-0.5 font-medium">
            Read the article →
          </span>
        </div>
      </div>
      <div className="plate min-h-[15rem] md:min-h-[23.75rem]">
        <Image
          src={post.coverImage?.url ?? "/images/analysts.jpg"}
          alt=""
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    </Link>
  );
}
