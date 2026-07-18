import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CaseAnalysis } from "@/components/cases/CaseAnalysis";
import { cases } from "@/data/cases";

export const metadata: Metadata = {
  title: "決策案例",
  description:
    "問題看起來不同，背後可能是同一套決策慣性。三個決策案例：感情、職涯、創作——示範科學決策的分析流程。",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <PageContainer>
      <SectionHeader
        as="h1"
        eyebrow="CASES"
        title="問題看起來不同，背後可能是同一套決策慣性"
      />
      <div className="mb-10 rounded-sm border border-mist bg-paper-raised p-5">
        <p className="text-sm leading-relaxed text-graphite">
          以下為決策案例，用於說明科學決策的分析流程。
          不是心理診斷，也不是對特定人物的命理判斷。
          每個案例中的人格傾向都只是分析視角之一，不是問題的唯一原因。
        </p>
      </div>
      <div className="space-y-10">
        {cases.map((c) => (
          <CaseAnalysis key={c.id} item={c} />
        ))}
      </div>
      <div className="mt-10 rounded-sm border border-mist bg-paper-raised p-5">
        <p className="text-xs leading-relaxed text-stone">
          為保護當事人隱私，案例中的姓名、背景與部分細節皆經匿名化或適度調整，但案例所呈現的決策模式、分析過程與改善方向皆來自真實案例。
        </p>
      </div>
    </PageContainer>
  );
}
