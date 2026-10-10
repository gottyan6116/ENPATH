export function safeHttpsUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

export const bookingUrl = safeHttpsUrl(process.env.NEXT_PUBLIC_BOOKING_URL);
export const siteUrl = safeHttpsUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const readyForIndexing =
  process.env.SITE_READY_FOR_INDEXING === "true" && Boolean(siteUrl);
export const gtmId = /^GTM-[A-Z0-9]+$/.test(
  process.env.NEXT_PUBLIC_GTM_ID ?? "",
)
  ? process.env.NEXT_PUBLIC_GTM_ID
  : undefined;
