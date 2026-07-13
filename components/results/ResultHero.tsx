import Link from "next/link";
import type { AssessmentResult } from "@/types/result";
import { personas } from "@/data/personas";
import { clusters } from "@/data/clusters";

const BAND_LABEL = { low: "低", medium: "中", high: "高" } as const;

/**
 * 結果頁第一段：外顯人格＋清晰度。
 * 平手時依裁決顯示並列傾向，不偽造唯一結果、不用固定順序偷選一張。
 * 清晰度以文字解釋為主，低／中／高標籤為次要資訊。
 */
export function ResultHero({ result }: { result: AssessmentResult }) {
  const clarityNote = (top1: string, top2: string) =>
    `本次作答中，最高傾向（${top1}）與第二傾向（${top2}）的分數差距為 ${result.clarity.value} 分（0–100）。` +
    `此數值僅代表本次作答的傾向差距，不代表測驗準確率、結果可信度、人格固定程度或心理計量信度。`;

  if (result.isTied) {
    const tied = result.tiedTopPersonas
      .map((pid) => personas.find((p) => p.id === pid))
      .filter((p) => p !== undefined);
    return (
      <section className="rounded-sm border border-mist bg-paper-raised p-6 sm:p-8">
        <p className="text-xs font-medium tracking-[0.18em] text-gold">你的外顯決策傾向</p>
        <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink sm:text-3xl">
          {tied.length === 2
            ? "你的作答呈現兩種接近的決策傾向"
            : "本次作答尚未形成單一明顯傾向"}
        </h2>
        <p className="mt-4 max-w-prose leading-relaxed text-graphite">
          以下人格在本次作答中得分並列最高，且無法由決策系分數合理區分。
          這不是錯誤——它代表你目前的作答同時呈現了多種決策方式。
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {tied.map((p) => {
            const cluster = clusters.find((c) => c.id === p.clusterId);
            return (
              <article key={p.id} className="rounded-sm border border-mist bg-paper p-5">
                <h3 className="font-serif text-lg font-semibold text-ink">{p.displayName}</h3>
                <p className="mt-1 text-xs text-stone">
                  {cluster?.displayName}・核心需求：{p.corePersona.coreNeed}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-graphite">
                  {p.corePersona.oneLineDefinition}
                </p>
                <Link
                  href={`/personas/${p.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-gold transition-colors hover:text-gold-deep"
                >
                  查看並列人格 →
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-stone">
          作答傾向清晰度：{result.clarity.value}（{BAND_LABEL[result.clarity.band]}）。
          清晰度只表示本次作答中最高傾向與第二傾向的分數差距；並列時差距為 0。
        </p>
      </section>
    );
  }

  const winner = personas.find((p) => p.id === result.expressedPersona);
  const second = personas.find((p) => p.id === result.secondaryPersona);
  const cluster = clusters.find((c) => c.id === result.primaryCluster);
  if (!winner) return null;

  return (
    <section className="rounded-sm border border-mist bg-paper-raised p-6 sm:p-8">
      <p className="text-xs font-medium tracking-[0.18em] text-gold">你的外顯人格</p>
      <h2 className="mt-3 font-serif text-3xl font-semibold text-ink sm:text-4xl">
        {winner.displayName}
      </h2>
      <p className="mt-2 text-sm text-stone">
        主要決策系：{cluster?.displayName}
        {second && <>・第二傾向：{second.displayName}</>}
      </p>
      <p className="mt-4 max-w-prose leading-relaxed text-graphite">
        {winner.corePersona.oneLineDefinition}
      </p>
      <div className="mt-6 border-t border-mist pt-5">
        <p className="text-sm font-medium text-ink">
          作答傾向清晰度：{result.clarity.value}
          <span className="ml-2 rounded-sm border border-mist px-2 py-0.5 text-xs text-stone">
            {BAND_LABEL[result.clarity.band]}
          </span>
        </p>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-stone">
          {second && clarityNote(winner.displayName, second.displayName)}
        </p>
      </div>
    </section>
  );
}
