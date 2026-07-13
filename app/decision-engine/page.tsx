import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DecisionEngineTool } from "@/components/decision-engine/DecisionEngineTool";

export const metadata: Metadata = {
  title: "決策引擎",
  description:
    "把你正在面對的一個決策整理成清楚的結構。決策引擎是結構化的決策整理工具，它不替你做決定。",
  alternates: { canonical: "/decision-engine" },
};

/**
 * 決策引擎：結構化決策整理工具（規則式、非 AI、不替你做決定）。
 */
export default function DecisionEnginePage() {
  return (
    <PageContainer width="narrow">
      <SectionHeader
        as="h1"
        eyebrow="決策引擎"
        title="決策引擎"
        subtitle="整理你的決策思路。"
      />
      <p className="mb-8 max-w-prose text-sm leading-relaxed text-stone">
        決策引擎是一套結構化的決策整理工具。它把你正在面對的問題整理清楚，
        幫你看見限制、風險與下一步；它不替你做決定，也不是 AI 自動判定。
      </p>
      <DecisionEngineTool />
    </PageContainer>
  );
}
