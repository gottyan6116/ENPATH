import type { MetadataRoute } from "next";
import { readyForIndexing, siteUrl } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(readyForIndexing ? { allow: "/" } : { disallow: "/" }),
    },
    ...(readyForIndexing && siteUrl
      ? { sitemap: new URL("/sitemap.xml", siteUrl).href }
      : {}),
  };
}
