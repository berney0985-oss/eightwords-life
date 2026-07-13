import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { PERSONA_SLUGS } from "@/types/persona";
import { CLUSTER_SLUGS } from "@/types/cluster";

/**
 * 僅列公開、可索引頁。
 * 使用者個人結果頁（/results 與各分析的 results 子頁）一律排除，
 * 不進 sitemap（robots 亦 noindex）。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/assessment",
    "/assessment/work",
    "/assessment/love",
    "/science-bazi",
    "/decision-engine",
    "/founder",
    "/why-not-fortune-telling",
    "/methodology",
    "/clusters",
    "/personas",
    "/eightwords",
    "/cases",
    "/services",
    "/about",
    "/privacy",
    "/disclaimer",
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}` })),
    ...CLUSTER_SLUGS.map((slug) => ({ url: `${base}/clusters/${slug}` })),
    ...PERSONA_SLUGS.map((slug) => ({ url: `${base}/personas/${slug}` })),
  ];
}
