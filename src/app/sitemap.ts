import type { MetadataRoute } from "next";
import { readyForIndexing, siteUrl } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  return readyForIndexing && siteUrl
    ? [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }]
    : [];
}
