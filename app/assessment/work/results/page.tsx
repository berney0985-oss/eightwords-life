import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ResultsShell } from "@/components/results/ResultsShell";

export const metadata: Metadata = {
  title: "工作分析結果",
  description: "你的工作情境外顯決策傾向分析結果。",
  robots: { index: false },
};

/**
 * 工作分析結果頁。讀取既有工作結果 key（decision-science-result-v1），
 * 與舊 /results 相容；個人結果不進 sitemap、robots noindex。
 */
export default function WorkResultsPage() {
  return (
    <PageContainer>
      <SectionHeader
        as="h1"
        eyebrow="工作分析結果"
        title="工作分析結果"
        subtitle="本結果反映你在工作與職涯情境作答中呈現的外顯決策傾向。"
      />
      <ResultsShell />
    </PageContainer>
  );
}
