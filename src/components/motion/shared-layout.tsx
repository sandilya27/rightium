"use client";

import type { ReactNode } from "react";
import { LayoutGroup } from "motion/react";

export function SharedLayout({ children }: { children: ReactNode }) {
  return <LayoutGroup id="rightium-shared-layout">{children}</LayoutGroup>;
}
