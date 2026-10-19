"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { slug: string; title: string; index: string };

export function ServiceNavigation({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug);
  const rail = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = (rail.current?.getBoundingClientRect().bottom ?? 140) + 48;
        let current = items[0]?.slug;
        for (const item of items) {
          const section = document.getElementById(item.slug);
          if (section && section.getBoundingClientRect().top <= threshold) current = item.slug;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  useEffect(() => {
    const link = rail.current?.querySelector<HTMLElement>('[aria-current="location"]');
    const container = rail.current;
    if (!link || !container) return;
    const bounds = link.getBoundingClientRect();
    const visible = container.getBoundingClientRect();
    if (bounds.left < visible.left || bounds.right > visible.right) {
      container.scrollLeft += bounds.left - visible.left - (visible.width - bounds.width) / 2;
    }
  }, [active]);

  return (
    <div className="sticky top-[var(--nav-h)] z-20 border-b border-line bg-paper">
      <nav ref={rail} aria-label="Service categories" className="shell flex gap-1 overflow-x-auto [scrollbar-width:none]">
        {items.map((item) => (
          <a key={item.slug} href={`#${item.slug}`} aria-current={active === item.slug ? "location" : undefined}
            style={{ borderBottomColor: active === item.slug ? "var(--accent)" : "transparent" }}
            className={cn("inline-flex shrink-0 items-center gap-2.5 border-b-2 px-3.5 py-[18px] text-[0.84375rem] font-medium text-ink-heading transition-colors duration-200",
              active === item.slug ? "border-accent bg-accent-soft" : "border-transparent hover:border-accent hover:bg-surface")}
          >
            <span className="font-serif text-accent">{item.index}</span>{item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
