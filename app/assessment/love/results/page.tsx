import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoveResultsShell } from "@/components/results/LoveResultsShell";

export const metadata: Metadata = {
  title: "感情分析結果",
  description: "你的感情情境外顯決策模式分析結果。",
  robots: { index: false },
};

/** 感情分析結果頁。讀取感情獨立結果 key；個人結果不進 sitemap、robots noindex。 */
export default function LoveResultsPage() {
  return (
    <PageContainer>
      <SectionHeader
        as="h1"
        eyebrow="感情分析結果"
        title="感情分析結果"
        subtitle="本結果反映你在人際與親密關係情境作答中呈現的外顯決策傾向。"
      />
      <LoveResultsShell />
    </PageContainer>
  );
}
