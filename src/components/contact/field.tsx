"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between text-[0.8125rem] font-medium text-ink"
      >
        <span>
          {label}
          {required && <span className="ml-1 text-accent">*</span>}
        </span>
        {hint && <span className="text-[0.75rem] font-normal text-ink-3">{hint}</span>}
      </label>

      {children}

      {/* Error slides in from behind the field edge rather than popping,
          so the layout shift reads as the message arriving. */}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            key="error"
            id={`${htmlFor}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, transform: "translate3d(0, -4px, 0)" }}
            animate={{ opacity: 1, height: "auto", transform: "translate3d(0, 0px, 0)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
            className="overflow-hidden text-[0.8125rem] text-accent"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export const inputClass =
  "w-full rounded-xl border border-[var(--line-strong)] bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-3 " +
  "transition-[border-color,box-shadow,background-color] duration-[200ms] ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "hover:border-ink-3 focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none " +
  "aria-[invalid=true]:border-accent";
