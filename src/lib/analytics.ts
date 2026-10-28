import posthog from "posthog-js";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispatch to configured analytics providers. Google receives only
 * the allowlisted events below, never enquiry text or contact details.
 */
export function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (navigator.doNotTrack === "1" || (window as Window & { doNotTrack?: string }).doNotTrack === "1") return;
  if (posthog.__loaded) posthog.capture(event, properties);
  // Only known events and non-identifying fields reach Google Analytics.
  if (event === "enquiry_submitted") {
    window.gtag?.("event", "generate_lead", { form_name: "contact" });
  } else if (event === "enquiry_failed") {
    window.gtag?.("event", "enquiry_failed", { form_name: "contact" });
  } else if (event === "contact_click") {
    window.gtag?.("event", "contact_click", { contact_channel: properties?.channel });
  }
}

const UTM_KEY = "rightium_utm";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/** Remember the campaign a visitor arrived from, for the enquiry record. */
export function storeUtmFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      UTM_PARAMS.flatMap((key) => (params.get(key) ? [[key, params.get(key)]] : [])),
    );
    if (Object.keys(utm).length > 0) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {
    // Storage blocked (private mode, strict settings) — attribution is optional.
  }
}

export function getStoredUtm(): Partial<Record<(typeof UTM_PARAMS)[number], string>> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}");
  } catch {
    return {};
  }
}
