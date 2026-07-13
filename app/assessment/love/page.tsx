import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoveAssessmentShell } from "@/components/assessment/LoveAssessmentShell";

export const metadata: Metadata = {
  title: "感情分析",
  description:
    "透過親密關係、溝通、承諾與衝突情境，辨識你在感情中呈現的外顯決策模式。18 題行為情境分析，非心理診斷。",
  alternates: { canonical: "/assessment/love" },
};

/**
 * 感情分析。獨立題庫、獨立 LocalStorage key、獨立版本；與工作分析互不覆蓋。
 * 共用九人格／三系／方案 A 計分／平手／clarity。
 */
export default function LoveAssessmentPage() {
  return (
    <PageContainer width="narrow">
      <SectionHeader
        as="h1"
        eyebrow="感情分析"
        title="感情分析"
        subtitle="了解你在人際與親密關係情境中呈現的外顯決策模式。"
      />
      <p className="mb-8 max-w-prose text-sm leading-relaxed text-stone">
        本分析反映你在感情情境作答中呈現的外顯決策傾向，用來看見你在關係裡的決策慣性與盲點。
        它不是人格底色，也不是完整人格、真正人格或先天人格。
      </p>
      <LoveAssessmentShell />
    </PageContainer>
  );
}
