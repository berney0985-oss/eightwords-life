import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "免責聲明",
  description:
    "科學決策不是醫療工具、不是心理診斷工具、不做未來預測。測驗與報告僅供自我覺察、決策整理與行動反思。",
  alternates: { canonical: "/disclaimer" },
};

/** 文案層級：C；依專案指令書第二十六節。 */
export default function DisclaimerPage() {
  return (
    <PageContainer width="narrow">
      <SectionHeader as="h1" eyebrow="DISCLAIMER" title="免責聲明" />
      <div className="max-w-prose space-y-6 leading-relaxed text-graphite">
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">本系統不是什麼</h2>
          <p className="mt-3">
            科學決策不是醫療工具，不是心理診斷工具，不是心理治療，
            不提供財務建議、法律建議或醫療建議。
          </p>
          <p className="mt-3">
            本系統不做未來事件預測，不做吉凶論斷。
            九種決策人格為經驗性分類模型，
            測驗未經同儕審查的心理計量驗證，不具診斷效力。
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">測驗與報告的用途</h2>
          <p className="mt-3">
            所有測驗結果與分析報告僅供自我覺察、決策整理與行動反思。
            內容描述的是傾向與慣性，不是命定，也不是對任何人的定論。
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">決策責任</h2>
          <p className="mt-3">
            系統提供分析與建議，不保證依建議行動後必然得到特定結果。
            最終決策責任由使用者承擔。
            如果你正在經歷心理困擾，請尋求合格醫療或心理專業人員的協助。
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
