import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "關於",
  description:
    "科學決策為什麼存在：從八字走向決策，不做未來預測，專注於決策慣性的辨識與修正。",
  alternates: { canonical: "/about" },
};

/** 文案層級：C 品牌原創。規則：不虛構履歷與資格；使用「創辦人／系統設計者」。 */
export default function AboutPage() {
  return (
    <PageContainer width="narrow">
      <SectionHeader as="h1" eyebrow="ABOUT" title="關於科學決策" />
      <div className="max-w-prose space-y-8 leading-relaxed text-graphite">
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">為什麼存在</h2>
          <p className="mt-3">
            很多人不是不夠聰明，也不是不夠努力，
            而是反覆用同一種方式做決定——換了工作、換了對象、換了城市，
            劇本卻很像。科學決策存在的理由只有一個：
            協助人看見自己的決策慣性，在下一次選擇時修正它。
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">為什麼從八字走向決策</h2>
          <p className="mt-3">
            這套系統的起點是八字。但我們很早就發現，
            對多數人真正有用的不是「你是什麼命」，
            而是「你為什麼總是這樣選」。
            於是八字在系統中退到方法模組的位置：
            以十神符號建立人格底色的初始假設，
            再用行為與實際經驗校正——它是假設的來源，不是答案的來源。
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">為什麼不做未來預測</h2>
          <p className="mt-3">
            因為預測無法被你使用。就算有人告訴你明年會如何，
            你今天還是得做決定。傾向與慣性可以被觀察、被修正；
            預言不能。這是系統的不可變條款：不是預測未來，而是修正決策。
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">目前的限制</h2>
          <p className="mt-3">
            九種決策人格是經驗性模型，沒有經過同儕審查的心理計量驗證；
            免費測驗只辨識外顯人格，人格底色目前由人工分析建立；
            測驗結果是本次作答的傾向描述，不是診斷，也不是定論。
            我們選擇把這些限制寫清楚，而不是假裝它們不存在。
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">如何持續修正</h2>
          <p className="mt-3">
            系統採版本管理：定義、計分與內容的每一次修改都有紀錄、可回溯。
            隨著真實作答資料累積，題庫與清晰度規則會重新校正。
            模型不等於真理——它的價值在於可以被修正。
          </p>
        </section>
        <section className="border-t border-mist pt-8">
          <p className="text-sm text-stone">
            {siteConfig.about.maintainerStatement}
          </p>
          <Link
            href="/assessment"
            className="mt-6 inline-block rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors hover:bg-gold-deep"
          >
            開始免費測驗
          </Link>
        </section>
      </div>
    </PageContainer>
  );
}
