import Script from "next/script";

/** Umami analytics. Rendered only when NEXT_PUBLIC_UMAMI_WEBSITE_ID is set at build time. */
export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;
  const src = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js";
  return <Script src={src} data-website-id={websiteId} strategy="lazyOnload" />;
}
