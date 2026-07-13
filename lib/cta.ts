/**
 * CTA 目的地解析。實際網址一律由 site-config 控制（零假連結）。
 * 未啟用時回傳 null，呼叫端據此顯示引導文字而非假連結。
 */

import { siteConfig } from "@/data/site-config";
import type { ProductCtaKind } from "@/types/payment";

export function lineHref(): string | null {
  const l = siteConfig.socialLinks.line;
  return l.enabled && l.url ? l.url : null;
}

export function ctaHref(kind: ProductCtaKind): string | null {
  if (kind === "line" || kind === "booking") return lineHref();
  return null; // "start" 由頁面自行處理站內導向
}
