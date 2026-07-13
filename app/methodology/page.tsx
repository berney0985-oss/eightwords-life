import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "分析方法",
  description:
    "我們不只看你選了什麼，也看你為什麼這樣選。行為情境、外顯決策風格、人格底色模型與實際情境校正——科學決策的四個分析模組。",
  alternates: { canonical: "/methodology" },
};

/** 文案層級：C 品牌原創；邏輯鏈與名詞依規格 §1.5、§3。 */
const modules = [
  {
    title: "行為情境",
    body: "我們不問「你是否重視穩定」這類抽象自評，而是觀察你在具體情境中的選擇方式：投入三個月的計畫遇上新機會時，你最可能怎麼做。行為比自我描述更接近真實的決策方式。",
  },
  {
    title: "外顯決策風格",
    body: "從行為情境的作答中，辨識你目前最常呈現的思考與行動模式——這就是外顯人格，回答「我目前通常如何呈現決策」。",
  },
  {
    title: "人格底色模型",
    body: "以科學八字模型建立長期核心需求與內在驅動的初始假設，回答「我為什麼這樣做決策」。它是假設，不是定論；目前由人工分析建立，不由測驗自動判定。",
  },
  {
    title: "實際情境校正",
    body: "把分析放回工作、感情、金錢、合作與人生選擇中檢查。模型說得通的留下，說不通的修正——分析框架為現實服務，不是現實為框架服務。",
  },
];

const chain = ["核心需求", "思考模式", "行動模式", "決策慣性", "特定情境失效", "決策盲點", "重複錯誤", "修正策略", "成長方向"];

export default function MethodologyPage() {
  return (
    <PageContainer>
      <SectionHeader
        as="h1"
        eyebrow="METHODOLOGY"
        title="我們不只看你選了什麼，也看你為什麼這樣選"
        subtitle="科學決策以一條固定的因果鏈分析決策：從核心需求出發，到修正策略結束。"
      />

      <section aria-label="核心邏輯鏈" className="mb-12">
        <ol className="flex flex-wrap items-center gap-2">
          {chain.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-sm border border-mist bg-paper-raised px-3 py-1.5 text-sm text-ink">{step}</span>
              {i < chain.length - 1 && <span aria-hidden="true" className="text-gold">→</span>}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-prose leading-relaxed text-graphite">
          決策慣性是中性詞：它是效率機制，不是缺點。
          盲點出現在慣性遇上錯誤情境的時刻——盲點，是慣性加上錯誤情境。
          每一個盲點，都有一對一對應的修正策略。
        </p>
      </section>

      <section aria-label="四個分析模組" className="mb-12">
        <h2 className="font-serif text-xl font-semibold text-ink">四個分析模組</h2>
        <div className="mt-6 space-y-6">
          {modules.map((m, i) => (
            <article key={m.title} className="rounded-sm border border-mist bg-paper-raised p-6">
              <h3 className="font-serif text-lg font-semibold text-ink">
                <span className="mr-3 text-sm font-medium text-gold">{`0${i + 1}`}</span>
                {m.title}
              </h3>
              <p className="mt-3 max-w-prose leading-relaxed text-graphite">{m.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="這裡的科學是什麼意思" className="border-t border-mist pt-10">
        <h2 className="font-serif text-xl font-semibold text-ink">「科學」在這裡的意思</h2>
        <div className="mt-4 max-w-prose space-y-4 leading-relaxed text-graphite">
          <p>
            明確定義、可追溯資料、一致規則、透明計分、可修正模型、版本管理——
            用結構化方式整理決策模式，區分假設與結論。
          </p>
          <p>
            它不代表八字已被科學證實，不代表九種人格已經心理計量驗證，
            也不代表測驗具有診斷效力。結果是目前的傾向描述，
            模型會隨資料與版本持續修正。
          </p>
        </div>
      </section>
    </PageContainer>
  );
}
