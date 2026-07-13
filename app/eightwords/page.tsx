import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import Link from "next/link";
import { personas } from "@/data/personas";
import { clusters } from "@/data/clusters";

export const metadata: Metadata = {
  title: "科學八字模型",
  description:
    "科學八字不是預測工具，而是人格底色模型。十神符號映射為九種決策人格，建立人格假設，再以行為資料校正。非預測、非吉凶論斷、非心理診斷。",
  alternates: { canonical: "/eightwords" },
};

/** 文案層級：C 品牌原創；十神映射為規格 §2.3 系統公理（層級 A）。 */
const flow = ["十神符號", "九種決策人格", "人格底色假設", "行為資料校正", "決策慣性", "盲點與修正"];

export default function EightWordsPage() {
  return (
    <PageContainer>
      <SectionHeader
        as="h1"
        eyebrow="EIGHT WORDS MODEL"
        title="科學八字不是預測工具，而是人格底色模型"
        subtitle="科學決策保留八字架構，但不以出生資料直接替一個人下定論。"
      />

      <section className="mb-12 max-w-prose space-y-4 leading-relaxed text-graphite">
        <p>
          在這套系統裡，八字符號模型只做一件事：
          為「人格底色」建立初始假設——長期核心需求與內在決策驅動的假設。
        </p>
        <p>
          假設需要被檢驗。行為情境測驗辨識的外顯人格（你目前通常如何呈現決策），
          與你的實際經驗，都是用來比對與校正這個假設的材料。
          底色與外顯可能相同，也可能不同——它們回答不同的問題，沒有真假之分。
        </p>
        <p>
          我們不要求你先相信八字。我們關心的是：
          這套模型能不能協助你，看見真實的決策慣性。
        </p>
      </section>

      <section aria-label="模型流程" className="mb-12">
        <h2 className="font-serif text-xl font-semibold text-ink">模型如何運作</h2>
        <ol className="mt-6 flex flex-wrap items-center gap-2">
          {flow.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-sm border border-mist bg-paper-raised px-3 py-1.5 text-sm text-ink">{step}</span>
              {i < flow.length - 1 && <span aria-hidden="true" className="text-gold">→</span>}
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="十神映射" className="mb-12">
        <h2 className="font-serif text-xl font-semibold text-ink">十神如何映射為九種決策人格</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-graphite">
          傳統八字有十神，本系統採九型：比肩與劫財皆以「自我、同儕、獨立」為核心，
          明文合併為自立型。此映射為系統公理，所有產品一致引用。
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-mist text-stone">
                <th scope="col" className="py-3 pr-4 font-medium">模型來源</th>
                <th scope="col" className="py-3 pr-4 font-medium">決策人格</th>
                <th scope="col" className="py-3 font-medium">所屬決策系</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((p) => {
                const cluster = clusters.find((c) => c.id === p.clusterId);
                return (
                  <tr key={p.id} className="border-b border-mist">
                    <td className="py-3 pr-4 text-graphite">{p.baziSource}</td>
                    <td className="py-3 pr-4">
                      <Link href={`/personas/${p.slug}`} className="font-medium text-ink transition-colors hover:text-gold">
                        {p.displayName}
                      </Link>
                    </td>
                    <td className="py-3 text-graphite">{cluster?.displayName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="邊界" className="border-t border-mist pt-10">
        <h2 className="font-serif text-xl font-semibold text-ink">這套模型不做的事</h2>
        <p className="mt-4 max-w-prose leading-relaxed text-graphite">
          本系統不做未來事件預測，不做吉凶論斷，不是心理診斷工具。
          這裡沒有線上排盤，沒有流年，沒有財運或感情運查詢——
          因為那些是預測的語言，而這套系統的工作是修正決策。
        </p>
        <Link
          href="/assessment"
          className="mt-8 inline-block rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          從免費測驗開始
        </Link>
      </section>
    </PageContainer>
  );
}
