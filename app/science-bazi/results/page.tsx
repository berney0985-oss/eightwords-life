import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CoreProfileResult } from "@/components/core-profile/CoreProfileResult";

export const metadata: Metadata = {
  title: "科學八字分析結果",
  description: "你的人格底色模型分析結果。",
  robots: { index: false },
};

/** 科學八字分析結果頁。個人結果不進 sitemap、robots noindex。 */
export default function ScienceBaziResultsPage() {
  return (
    <PageContainer>
      <SectionHeader
        as="h1"
        eyebrow="科學八字分析結果"
        title="你的人格底色模型"
        subtitle="以下為免費摘要；完整分析為人工進行。"
      />
      <CoreProfileResult />
    </PageContainer>
  );
}
