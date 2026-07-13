import Link from "next/link";

/**
 * 四入口平權區（首頁）。同尺寸、同樣式、同按鈕，不設主次；
 * 使用者自行選擇分析方式。決策引擎為工具，仍與其他入口平權呈現。
 */
const entries = [
  { title: "工作分析", sub: "了解你的工作決策模式", href: "/assessment/work", tag: "免費" },
  { title: "感情分析", sub: "了解你的感情決策模式", href: "/assessment/love", tag: "免費" },
  { title: "科學八字分析", sub: "建立你的人格底色模型", href: "/science-bazi", tag: "免費預覽" },
  { title: "決策引擎", sub: "整理你的決策思路", href: "/decision-engine", tag: "免費" },
];

export function EntriesSection() {
  return (
    <section id="entries" className="scroll-mt-16 border-b border-mist">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          選擇最適合你的分析方式
        </h2>
        <p className="mt-3 max-w-prose leading-relaxed text-graphite">
          同一個人，在不同情境中，可能呈現不同的決策方式。
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="group flex flex-col rounded-sm border border-mist bg-paper-raised p-6 transition-colors hover:border-ink"
            >
              <span className="text-xs font-medium tracking-[0.14em] text-gold">{e.tag}</span>
              <span className="mt-2 font-serif text-lg font-semibold text-ink">{e.title}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-graphite">{e.sub}</span>
              <span className="mt-5 text-sm font-medium text-ink transition-colors group-hover:text-gold-deep">
                開始 →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
