"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/post";
import { SharedPostTitle } from "@/components/blog/shared-title";
import type { InsightPost } from "@/components/home/insights";

export function InsightsDeck({ posts }: { posts: InsightPost[] }) {
  const [featured, ...stories] = posts;
  if (!featured) return null;

  return (
    <div className="mt-10 grid border border-line bg-white md:mt-14 md:grid-cols-2">
      <Link
        href={`/blog/${featured.slug}`}
        className="group/featured block border border-transparent p-4 transition-[transform,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_22px_55px_-38px_rgba(6,21,36,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none motion-reduce:transition-none sm:p-6 md:border-r md:border-line md:p-7"
      >
        <div className="plate relative aspect-[1.6/1] overflow-hidden bg-deep">
          <Image
            src={featured.image}
            alt=""
            fill
            priority={false}
            sizes="(min-width: 768px) 48vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/featured:scale-[1.035]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#061524]/85 via-[#061524]/10 to-[#061524]/20 transition-colors duration-500 group-hover/featured:from-[#061524]/75" />
          <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/featured:opacity-100" style={{ background: "radial-gradient(32rem 20rem at 82% 18%, rgba(0,190,202,.32), transparent 68%)" }} />
          <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[0.7rem] font-semibold tracking-[0.14em] uppercase sm:inset-x-7 sm:top-7">
            <span className="text-white">Rightium <span className="text-accent-bright">/</span> Research</span>
            <span className="text-white/75">01</span>
          </div>
          <p className="font-serif absolute inset-x-5 bottom-5 m-0 max-w-[19ch] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.08] text-white balance sm:inset-x-7 sm:bottom-7">
            {featured.title}
          </p>
        </div>

        <div className="pt-5 sm:pt-6">
          <p className="m-0 inline-flex flex-col gap-1.5 text-xs font-medium tracking-[0.12em] text-accent uppercase">
            Featured story
            <span aria-hidden className="h-px w-8 origin-left bg-accent transition-[width] duration-300 group-hover/featured:w-full motion-reduce:transition-none" />
          </p>
          <h3 className="font-serif mt-3 text-[clamp(1.45rem,2.2vw,2rem)] leading-[1.16] text-ink-heading balance transition-colors duration-300 group-hover/featured:text-accent">
            {featured.title}
          </h3>
          <p className="mt-3 max-w-[62ch] text-sm leading-[1.65] text-ink-2 sm:text-[0.9375rem]">
            {featured.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
            <span className="border-b border-accent/40 pb-1 transition-[border-color] duration-300 group-hover/featured:border-accent">Read more</span>
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/featured:translate-x-1 motion-reduce:transition-none" />
          </span>
        </div>
      </Link>

      <div className="divide-y divide-line border-t border-line md:grid md:grid-rows-2 md:border-t-0">
        {stories.map((post, index) => {
          const storyNumber = index + 2;
          const isSharedStory = storyNumber === 3;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group/story grid min-h-[12rem] grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] items-center gap-4 border-l-2 border-transparent p-3 transition-[background-color,border-color,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 hover:border-accent hover:bg-accent-soft/40 focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[15rem] sm:gap-5 sm:p-5 md:min-h-0 md:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] md:gap-5 md:p-5 lg:gap-6 lg:p-6"
            >
              <div className="plate relative aspect-[1.28/1] overflow-hidden bg-deep [perspective:900px]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 24vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/story:scale-105 group-hover/story:rotate-[0.6deg] motion-reduce:transition-none"
                />
                <div aria-hidden className="absolute inset-0 bg-[#061524]/25 transition-colors duration-300 group-hover/story:bg-accent/25" />
                <span className="absolute top-3 left-3 text-[0.6rem] font-semibold tracking-[0.12em] text-white uppercase sm:top-4 sm:left-4">Rightium</span>
                <span className="absolute right-3 bottom-3 text-[0.65rem] font-mono text-white/80 sm:right-4 sm:bottom-4">0{storyNumber}</span>
                <span aria-hidden className="absolute right-3 top-3 grid size-8 translate-y-1 -rotate-12 place-items-center bg-accent text-white opacity-0 transition-[opacity,transform] duration-300 group-hover/story:translate-y-0 group-hover/story:rotate-0 group-hover/story:opacity-100 sm:right-4 sm:top-4">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              <div className="py-2">
                <p className="m-0 inline-flex flex-col gap-1 text-[0.65rem] font-medium tracking-[0.1em] text-accent uppercase sm:text-xs">
                  {post.category}
                  <span aria-hidden className="h-px w-5 origin-left bg-accent transition-[width] duration-300 group-hover/story:w-10 motion-reduce:transition-none" />
                </p>
                {isSharedStory ? (
                  <SharedPostTitle
                    slug={post.slug}
                    enabled
                    className="font-serif mt-3 text-[clamp(1.1rem,1.65vw,1.7rem)] leading-[1.16] text-ink-heading balance transition-colors duration-300 group-hover/story:text-accent"
                  >
                    {post.title}
                  </SharedPostTitle>
                ) : (
                  <h3 className="font-serif mt-3 text-[clamp(1.1rem,1.65vw,1.7rem)] leading-[1.16] text-ink-heading balance transition-colors duration-300 group-hover/story:text-accent">
                    {post.title}
                  </h3>
                )}
                <p className="mt-3 hidden text-sm leading-[1.55] text-ink-2 lg:block">{post.excerpt}</p>
                <p className="mt-4 text-[0.7rem] text-ink-2 sm:text-xs">{post.author.name} · {formatDate(post.date)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
