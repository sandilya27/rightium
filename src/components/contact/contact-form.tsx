"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { serviceItems, services } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/button";
import { EASE_OUT } from "@/components/motion/reveal";
import { Field, inputClass } from "./field";
import { Turnstile, turnstileEnabled } from "./turnstile";
import { capture, getStoredUtm } from "@/lib/analytics";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [service, setService] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  // Bumping the key remounts Turnstile for a fresh single-use token.
  const [turnstileKey, setTurnstileKey] = useState(0);
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);

  // Service cards link here as /contact?service=<item-slug>. Read it
  // after mount rather than via useSearchParams, which would force the
  // whole static contact page to render client-side.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = serviceItems.find((i) => i.slug === slug);
    if (match) setService(`${match.category.title} — ${match.title}`);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please tell us who you are.";
    if (!EMAIL.test(data.email ?? "")) next.email = "A work email we can reply to.";
    if (!data.message || data.message.trim().length < 20)
      next.message = "A sentence or two about the question — 20 characters minimum.";

    setErrors(next);
    if (Object.keys(next).length === 0 && turnstileEnabled && !turnstileToken) {
      setServerError("Please complete the verification check above the button.");
      return;
    }
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...getStoredUtm(),
          page: document.referrer ? `${window.location.pathname} (from ${document.referrer})` : window.location.pathname,
          turnstileToken,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Failed");
      }
      setStatus("success");
      capture("enquiry_submitted", {
        service: data.service || "Not sure yet",
        deadline: data.deadline || "No fixed date",
        has_phone: Boolean(data.phone?.trim()),
        has_company: Boolean(data.company?.trim()),
      });
      form.reset();
      setService("");
      setTurnstileToken("");
      setTurnstileKey((k) => k + 1);
    } catch (err) {
      setStatus("error");
      capture("enquiry_failed");
      setTurnstileToken("");
      setTurnstileKey((k) => k + 1);
      setServerError(
        err instanceof Error && err.message !== "Failed"
          ? err.message
          : "Something went wrong sending that. Email us directly and we will pick it up.",
      );
    }
  }

  return (
    <div className="relative rounded-card border border-[var(--line)] bg-white p-7 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, transform: reduce ? "none" : "scale(0.97)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="flex min-h-[420px] flex-col items-start justify-center"
          >
            <motion.span
              className="grid size-12 place-items-center rounded-full bg-[var(--accent-soft)] text-accent"
              initial={{ transform: reduce ? "none" : "scale(0.8)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.22, delay: 0.08 }}
            >
              <Check className="size-6" strokeWidth={2} aria-hidden />
            </motion.span>
            <h3 className="font-display mt-6 text-[1.75rem] leading-tight tracking-[-0.02em]">
              Brief received.
            </h3>
            <p className="prose-lede mt-3 max-w-[46ch]">
              A practice lead will reply within one working day with a scope, a
              price and a date — or a question, if we need one answered first.
            </p>
            <Button
              variant="outline"
              className="mt-8"
              onClick={() => setStatus("idle")}
            >
              Send another brief
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={false}
            exit={{ opacity: 0, transform: "translate3d(0, -6px, 0)" }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="space-y-5"
          >
            {/* Honeypot — real people never fill this. */}
            <div aria-hidden className="absolute -left-[9999px]">
              <label htmlFor="company_website">Company website</label>
              <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" htmlFor="name" required error={errors.name}>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClass}
                  placeholder="Alex Moreau"
                />
              </Field>

              <Field label="Work email" htmlFor="email" required error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputClass}
                  placeholder="alex@company.com"
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company" htmlFor="company" hint="Optional">
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  className={inputClass}
                  placeholder="Northwind Labs"
                />
              </Field>

              <Field label="Service" htmlFor="service">
                <select
                  id="service"
                  name="service"
                  className={inputClass}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">Not sure yet</option>
                  {services.map((s) => (
                    <optgroup key={s.slug} label={s.title}>
                      {s.items.map((item) => (
                        <option key={item.slug} value={`${s.title} — ${item.title}`}>
                          {item.title}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone / WhatsApp" htmlFor="phone" hint="Optional">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className={inputClass}
                  placeholder="+91 98765 43210"
                />
              </Field>

              <Field label="Deadline" htmlFor="deadline" hint="Optional">
                <select id="deadline" name="deadline" className={inputClass} defaultValue="">
                  <option value="">No fixed date</option>
                  <option>Within 48 hours</option>
                  <option>This week</option>
                  <option>This month</option>
                  <option>This quarter</option>
                </select>
              </Field>
            </div>

            <Field
              label="What are you trying to decide?"
              htmlFor="message"
              required
              error={errors.message}
              hint="The more specific, the faster the quote"
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${inputClass} resize-y`}
                placeholder="We're clearing a formulation for launch in the EU and US in Q1 and need to know what stands in the way…"
              />
            </Field>

            <Turnstile key={turnstileKey} onToken={onTurnstileToken} />

            <AnimatePresence>
              {serverError && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.24, ease: EASE_OUT }}
                  className="overflow-hidden rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-[0.875rem] text-accent"
                >
                  {serverError}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="min-w-[13rem]"
              >
                {/* Label crossfades through a blur so the two states read as
                    one element changing, not two swapping. */}
                <span className="relative grid place-items-center">
                  <span
                    className="col-start-1 row-start-1 inline-flex items-center gap-2 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      opacity: status === "submitting" ? 0 : 1,
                      filter: status === "submitting" ? "blur(3px)" : "blur(0px)",
                    }}
                  >
                    Send brief
                    <ArrowRight />
                  </span>
                  <span
                    className="col-start-1 row-start-1 inline-flex items-center gap-2 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      opacity: status === "submitting" ? 1 : 0,
                      filter: status === "submitting" ? "blur(0px)" : "blur(3px)",
                    }}
                  >
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Sending
                  </span>
                </span>
              </Button>

              <p className="text-[0.8125rem] text-ink-3">
                We reply within one working day. Everything you send is treated
                as confidential.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
