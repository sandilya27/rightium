"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/post";
import { FeaturedPostCard, PostCard } from "./post-card";
import { cn } from "@/lib/utils";

/**
 * The insights index: one featured article, then a filtered grid.
 *
 * The filter is a rail of underlined tabs on the section's own hairline
 * rather than a row of pills — it reads as a table of contents, which is
 * what it is. Selecting a category pulls the featured article back into
 * the grid, so nothing is hidden by the filter.
 *
 * Filtering updates immediately, keeping attention on the article choices.
 */
export function BlogIndex({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category))).sort()],
    [posts],
  );

  const [featured, ...rest] = posts;
  const visible =
    active === "All" ? rest : posts.filter((p) => p.category === active);

  return (
    <>
      {active === "All" && featured && <FeaturedPostCard post={featured} />}

      <div className="mt-14 flex items-center justify-between gap-6 border-b border-line-strong">
        <div
          role="group"
          aria-label="Filter insights by category"
          className="min-w-0 flex gap-1 overflow-x-auto [scrollbar-width:none]"
        >
          {categories.map((c) => {
            const selected = c === active;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(c)}
                className={cn(
                  "-mb-px border-b-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-[color,border-color] duration-[250ms]",
                  selected
                    ? "border-accent text-ink-heading"
                    : "border-transparent text-ink-2",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
        <span className="text-[0.8125rem] whitespace-nowrap text-ink-2">
          {visible.length} {visible.length === 1 ? "article" : "articles"}
        </span>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-ink-2">
          Nothing published in this category yet.
        </p>
      )}
    </>
  );
}
