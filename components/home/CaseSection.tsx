import Link from "next/link";
import { cases } from "@/data/cases";

const domainLabel = { relationship: "感情", career: "職涯", creation: "創作" } as const;

/** 首頁第九區：案例。資料層級：D（data/cases.ts）。 */
export function CaseSection() {
  return (
    <section className="border-b border-mist">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          問題看起來不同
          <br />
          背後可能是同一套決策慣性
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <article key={c.id} className="flex flex-col rounded-sm border border-mist bg-paper-raised p-6">
              <p className="text-xs text-stone">
                {domainLabel[c.domain]}・{c.label}
              </p>
              <h3 className="mt-2 flex-1 font-serif text-lg font-semibold leading-snug text-ink">
                {c.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                {c.surfaceProblem}
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/cases"
          className="mt-8 inline-block text-sm font-medium text-gold transition-colors hover:text-gold-deep"
        >
          閱讀完整案例分析 →
        </Link>
      </div>
    </section>
  );
}
