"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export function SharedArticleTitle({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <motion.span layoutId={`insight-title-${slug}`} className="inline-block">
      {children}
    </motion.span>
  );
}

export function SharedPostTitle({
  slug,
  enabled,
  className,
  children,
}: {
  slug: string;
  enabled: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.h3 layoutId={enabled ? `insight-title-${slug}` : undefined} className={className}>
      {children}
    </motion.h3>
  );
}
