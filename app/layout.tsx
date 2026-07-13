import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * 字體策略：繁中系統字體堆疊（定義於 globals.css），不經 next/font/google。
 * 理由：TC 字體子集龐大、系統字體渲染最快且零外部依賴；
 * 本建置環境亦無法連線 Google Fonts（見 implementation-decisions.md 4.7）。
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "科學決策｜看見決策慣性 修正下一次選擇",
    template: `%s｜${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    locale: "zh_TW",
    type: "website",
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: "科學決策 Decision Science Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-Hant-TW"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
