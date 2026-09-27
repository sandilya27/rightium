"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Labelled field. The label wraps the control, so the whole block is a
 * hit target and no `for`/`id` pair can drift — but the ids stay for
 * `aria-describedby` on the error.
 */
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
        className="flex flex-wrap items-baseline gap-x-1.5 text-[0.8125rem] font-medium text-ink-heading"
      >
        <span>
          {label}
          {required && <span className="ml-1 text-accent">*</span>}
        </span>
        {hint && <span className="font-normal text-ink-2">— {hint}</span>}
      </label>

      {children}

      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="m-0 text-[0.78125rem] font-normal text-[var(--danger)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/** Square field, teal focus ring. Errors turn the border red. */
export const inputClass = "field";
export const inputErrorClass = "field field-error";
