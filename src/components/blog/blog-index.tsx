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
 * Cards re-enter on a short stagger keyed to the filter, so a change of
 * category is visibly a change rather than a silent content swap.
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
      {active === "All" && <FeaturedPostCard post={featured} />}

      <div className="mt-14 flex items-center justify-between gap-6 border-b border-line-strong">
        <div
          role="tablist"
          aria-label="Filter insights by category"
          className="flex gap-1 overflow-x-auto [scrollbar-width:none]"
        >
          {categories.map((c) => {
            const selected = c === active;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={selected}
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
        {visible.map((post, i) => (
          <PostCard
            // Keyed on the filter too, so the entrance replays on change.
            key={`${active}-${post.slug}`}
            post={post}
            className="rise"
            style={{ animationDuration: "0.6s", animationDelay: `${i * 60}ms` }}
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
