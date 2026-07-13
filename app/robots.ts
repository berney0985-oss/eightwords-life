import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

/**
 * 個人結果頁一律 disallow，不讓使用者個人結果被索引。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/results",
        "/assessment/work/results",
        "/assessment/love/results",
        "/science-bazi/results",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
