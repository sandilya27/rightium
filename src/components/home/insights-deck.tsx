"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { formatDate } from "@/lib/post";
import { SharedPostTitle } from "@/components/blog/shared-title";
import type { InsightPost } from "@/components/home/insights";

function ArticleImage({ post, sizes }: { post: InsightPost; sizes: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? "/images/analysts.jpg" : post.image}
      alt=""
      fill
      sizes={sizes}
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:transform-none"
    />
  );
}

function ArticleArrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`size-5 ${className}`}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function InsightsDeck({ posts }: { posts: InsightPost[] }) {
  const reduce = useReducedMotion();
  const [featured, ...stories] = posts;
  if (!featured) return null;

  return (
    <motion.div initial={false} whileInView="shown" viewport={{ once: true, amount: 0.15 }} className={`research-grid mt-8 grid gap-8 lg:mt-10 lg:gap-12 ${stories.length ? "lg:grid-cols-[1.18fr_1fr]" : ""}`}>
      <motion.div className="flex min-w-0" variants={{ hidden: { opacity: 0, transform: reduce ? "none" : "translateY(12px)" }, shown: { opacity: 1, transform: "none", transition: { duration: 0.3 } } }}>
      <Link
        href={`/blog/${featured.slug}`}
        className="research-feature group flex w-full min-w-0 flex-col overflow-hidden bg-deep text-deep-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:active:scale-[0.995]"
      >
        <motion.div initial={false} whileInView={reduce ? undefined : { clipPath: ["inset(0 0 12% 0)", "inset(0 0 0% 0)"] }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-[2/1] overflow-hidden bg-deep-lift sm:aspect-[2.2/1]">
          <ArticleImage post={featured} sizes="(min-width: 1024px) 52vw, 100vw" />
        </motion.div>
        <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-deep-ink-2">
            <span>{featured.category}</span>
            <span>{featured.readingMinutes} min read</span>
          </div>
          <h3 className="font-serif mt-5 max-w-[25ch] text-[clamp(1.8rem,2.8vw,2.65rem)] leading-[1.08] tracking-[-0.02em] text-deep-ink balance">
            {featured.title}
          </h3>
          <p className="mt-4 max-w-[60ch] text-sm leading-[1.75] text-deep-ink-2 sm:text-[0.9375rem]">{featured.excerpt}</p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-deep-line pt-5">
            <time dateTime={featured.date} className="text-xs text-deep-ink-2">{formatDate(featured.date)}</time>
            <span className="inline-flex items-center gap-3 text-sm font-medium text-accent-bright">
              Read article <ArticleArrow className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          </div>
        </div>
      </Link>
      </motion.div>

      {stories.length > 0 && (
        <div className="grid content-start divide-y divide-line border-y border-line">
          {stories.map((post, index) => (
            <motion.div key={post.slug} variants={{ hidden: { opacity: 0, transform: reduce ? "none" : "translateY(12px)" }, shown: { opacity: 1, transform: "none", transition: { duration: 0.3, delay: reduce ? 0 : (index + 1) * 0.06 } } }}>
            <Link href={`/blog/${post.slug}`} className="research-story group grid min-w-0 grid-cols-[1fr_6rem] gap-x-5 gap-y-4 py-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid-cols-[1fr_8.5rem] sm:gap-x-7 sm:py-8 motion-safe:active:scale-[0.995]">
              <div className="min-w-0">
                <p className="m-0 text-xs font-medium text-accent">{post.category}</p>
                <SharedPostTitle slug={post.slug} enabled={index === 1} className="font-serif mt-3 text-[clamp(1.45rem,2.1vw,1.95rem)] leading-[1.12] tracking-[-0.015em] text-ink-heading balance transition-colors duration-200 group-hover:text-accent">
                  {post.title}
                </SharedPostTitle>
              </div>
              <div className="relative aspect-square self-start overflow-hidden bg-surface-2">
                <ArticleImage post={post} sizes="(min-width: 640px) 136px, 96px" />
              </div>
              <p className="col-span-2 m-0 max-w-[60ch] text-sm leading-[1.7] text-ink-2">{post.excerpt}</p>
              <div className="col-span-2 flex items-center justify-between gap-3">
                <p className="m-0 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-2">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">/</span>
                  <span>{post.readingMinutes} min read</span>
                </p>
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center border border-line-strong text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                  <ArticleArrow className="transition-transform duration-300 group-hover:-rotate-45 motion-reduce:transition-none" />
                </span>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
