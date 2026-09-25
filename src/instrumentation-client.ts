import posthog from "posthog-js";
import { capture, storeUtmFromUrl } from "@/lib/analytics";

/**
 * Client-side analytics (PostHog, free tier: 1M events/month).
 * Runs once before the app hydrates. Requests go through /ingest on our
 * own domain (see next.config.ts) so ad blockers don't drop them.
 */
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const isAdmin = window.location.pathname.startsWith("/admin");

storeUtmFromUrl();

if (key && !isAdmin) {
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST || "https://us.posthog.com",
    defaults: "2026-08-30",
    // Anonymous visitors only; no profiles are created for them.
    person_profiles: "identified_only",
    respect_dnt: true,
    capture_exceptions: true,
    // Form inputs are never recorded in session replays.
    session_recording: { maskAllInputs: true },
  });

  // Name the high-intent clicks so they're easy to chart as conversions.
  document.addEventListener(
    "click",
    (event) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const channel = href.startsWith("tel:")
        ? "phone"
        : href.startsWith("mailto:")
          ? "email"
          : href.includes("wa.me/")
            ? "whatsapp"
            : href.includes("google.com/maps")
              ? "map"
              : null;
      if (channel) capture("contact_click", { channel, href, page: window.location.pathname });
    },
    { capture: true },
  );
}
