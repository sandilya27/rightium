import posthog from "posthog-js";

/**
 * Thin wrapper over PostHog so components never need to know whether
 * analytics is configured. Without NEXT_PUBLIC_POSTHOG_KEY every call
 * is a no-op.
 */
export function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined" || !posthog.__loaded) return;
  posthog.capture(event, properties);
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
