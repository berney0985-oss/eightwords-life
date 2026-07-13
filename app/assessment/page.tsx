import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "選擇你想開始的分析",
  description:
    "科學決策提供四種分析入口：工作分析、感情分析、科學八字分析、決策引擎。選擇最適合你的分析方式。",
  alternates: { canonical: "/assessment" },
};

/**
 * 分析入口選擇頁（第二階段）。四入口平權，同尺寸、同樣式，使用者自行選擇。
 * 舊 /assessment（直接開始工作測驗）改為選擇頁，工作測驗移至 /assessment/work，
 * 不造成 404。
 */
const entries: { title: string; sub: string; href: string; tag: string }[] = [
  { title: "工作分析", sub: "了解工作情境下的決策模式", href: "/assessment/work", tag: "免費" },
  { title: "感情分析", sub: "了解感情中的決策模式", href: "/assessment/love", tag: "免費" },
  { title: "科學八字分析", sub: "建立你的人格底色模型", href: "/science-bazi", tag: "免費預覽" },
  { title: "決策引擎", sub: "整理你的決策思路", href: "/decision-engine", tag: "免費" },
];

const explain: { title: string; body: string }[] = [
  { title: "工作分析", body: "看你在工作情境下的外顯決策模式。" },
  { title: "感情分析", body: "看你在感情情境下的外顯決策模式。" },
  { title: "科學八字分析", body: "建立你的人格底色模型。" },
  { title: "決策引擎", body: "整理你當前面臨的重要決策。" },
];

export default function AssessmentEntryPage() {
  return (
    <PageContainer>
      <SectionHeader
        as="h1"
        eyebrow="開始分析"
        title="選擇你想開始的分析"
        subtitle="同一個人，在不同情境中，可能呈現不同的決策方式。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {entries.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="group flex flex-col rounded-sm border border-mist bg-paper-raised p-6 transition-colors hover:border-ink"
          >
            <span className="text-xs font-medium tracking-[0.14em] text-gold">{e.tag}</span>
            <span className="mt-2 font-serif text-xl font-semibold text-ink">{e.title}</span>
            <span className="mt-2 text-sm leading-relaxed text-graphite">{e.sub}</span>
            <span className="mt-5 text-sm font-medium text-ink transition-colors group-hover:text-gold-deep">
              開始 →
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-xl font-semibold text-ink">為什麼有四種分析？</h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-stone">
          方法不同，目的一致：不是預測未來，而是理解你如何做決定。
        </p>
        <dl className="mt-6 space-y-4">
          {explain.map((x) => (
            <div key={x.title} className="border-l-2 border-mist pl-4">
              <dt className="font-medium text-ink">{x.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-graphite">{x.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </PageContainer>
  );
}
