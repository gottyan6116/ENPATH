import { featureLinks } from "@/content/features";
import type { MetadataRoute } from "next";
import { readyForIndexing, siteUrl } from "@/lib/config";
import { getVisibleArticles } from "@/lib/journal";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;
  return readyForIndexing && baseUrl
    ? [
        { url: baseUrl, changeFrequency: "monthly", priority: 1 },
        {
          url: new URL("/journal", baseUrl).href,
          changeFrequency: "weekly",
          priority: 0.7,
        },
        ...(await getVisibleArticles()).map((article) => ({
          url: new URL(`/journal/${article.slug}`, baseUrl).href,
          lastModified: article.updatedAt ?? article.publishedAt!,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
        {
          url: new URL("/app", baseUrl).href,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
        ...featureLinks.map((item) => ({
          url: new URL(item.href, baseUrl).href,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ]
    : [];
}
