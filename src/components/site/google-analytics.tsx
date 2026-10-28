import Script from "next/script";

/** Public measurement ID; override when deploying a different property. */
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-WZKBE4WHF9";

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview") return null;
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return null;

  return (
    <Script id="rightium-google-analytics" strategy="afterInteractive">
      {`(function () {
        if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', '${measurementId}', {
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=${measurementId}';
        document.head.appendChild(script);
      })();`}
    </Script>
  );
}
