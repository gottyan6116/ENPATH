import { featureLinks } from "@/content/features";
import type { MetadataRoute } from "next";
import { readyForIndexing, siteUrl } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  return readyForIndexing && baseUrl
    ? [
        { url: baseUrl, changeFrequency: "monthly", priority: 1 },
        ...featureLinks.map((item) => ({
          url: new URL(item.href, baseUrl).href,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ]
    : [];
}
