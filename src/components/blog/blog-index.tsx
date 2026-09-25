"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Post } from "@/lib/post";
import { PostCard } from "./post-card";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function BlogIndex({ posts }: { posts: Post[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category))).sort()],
    [posts],
  );

  const [featured, ...rest] = posts;
  const visible =
    active === "All" ? rest : posts.filter((p) => p.category === active);

  return (
    <>
      {active === "All" && (
        <div className="mb-4">
          <PostCard post={featured} featured />
        </div>
      )}

      <div
        className="mb-10 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter insights by category"
      >
        {categories.map((c) => {
          const selected = c === active;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={selected}
              data-cursor="link"
              onClick={() => setActive(c)}
              className={cn(
                "relative rounded-full px-4 py-2 text-[0.8125rem] transition-[color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
                selected ? "text-white" : "text-ink-2 hover:text-ink",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                  transition={{
                    type: "spring",
                    duration: reduce ? 0 : 0.42,
                    bounce: 0.14,
                  }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((post, i) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, transform: "translate3d(0, 14px, 0)" }}
              animate={{ opacity: 1, transform: "translate3d(0, 0px, 0)" }}
              exit={{ opacity: 0, transform: "translate3d(0, 6px, 0)" }}
              transition={{
                duration: reduce ? 0.15 : 0.42,
                delay: reduce ? 0 : i * 0.04,
                ease: EASE_OUT,
              }}
              className="h-full"
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-ink-3">
          Nothing published in this category yet.
        </p>
      )}
    </>
  );
}
