import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CoreProfileForm } from "@/components/core-profile/CoreProfileForm";

export const metadata: Metadata = {
  title: "科學八字分析",
  description:
    "輸入出生資料，建立你的人格底色模型，理解長期核心需求、基礎決策傾向與天賦密碼。免費摘要。",
  alternates: { canonical: "/science-bazi" },
};

/**
 * 科學八字分析輸入頁。科學八字是科學決策平台的核心模型，
 * 用來建立人格底色模型；不預測未來、不做流年、不論斷吉凶。
 */
export default function ScienceBaziPage() {
  return (
    <PageContainer width="narrow">
      <SectionHeader
        as="h1"
        eyebrow="科學八字分析"
        title="科學八字分析"
        subtitle="輸入出生資料，建立你的人格底色模型。"
      />
      <p className="mb-8 max-w-prose text-sm leading-relaxed text-stone">
        科學八字研究的是決策模式，不預測未來，我不做流年，也不論斷吉凶。
        以下分析會建立你的人格底色初始模型，並附上天賦密碼摘要。
      </p>
      <CoreProfileForm />
    </PageContainer>
  );
}
