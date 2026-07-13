import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AssessmentShell } from "@/components/assessment/AssessmentShell";

export const metadata: Metadata = {
  title: "工作分析",
  description:
    "透過工作、職涯、合作與風險情境，辨識你目前最常呈現的外顯決策傾向。18 題行為情境分析，非心理診斷。",
  alternates: { canonical: "/assessment/work" },
};

/**
 * 工作分析（既有 18 題工作測驗的正式定位頁）。
 * 重用既有 AssessmentShell 與工作 LocalStorage key，舊結果仍可讀取；
 * 題目語意、計分、平手、clarity 皆不變。
 */
export default function WorkAssessmentPage() {
  return (
    <PageContainer width="narrow">
      <SectionHeader
        as="h1"
        eyebrow="工作分析"
        title="工作分析"
        subtitle="了解你在工作與職涯情境下的外顯決策模式。"
      />
      <p className="mb-8 max-w-prose text-sm leading-relaxed text-stone">
        本分析反映你在工作與職涯情境作答中呈現的外顯決策傾向，
        用來看見目前的決策慣性與基礎盲點。它不是人格底色，也不是完整人格、
        真正人格或先天人格；它描述的是你此刻在工作情境中通常怎麼做選擇。
      </p>
      <AssessmentShell />
    </PageContainer>
  );
}
