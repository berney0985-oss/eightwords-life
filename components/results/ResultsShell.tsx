"use client";

import Link from "next/link";
import { personas } from "@/data/personas";
import { useStoredResult } from "@/lib/use-storage";
import { ResultHero } from "./ResultHero";
import { ScoreDistribution } from "./ScoreDistribution";
import { DecisionAnalysis } from "./DecisionAnalysis";
import { LayerExplanation } from "./LayerExplanation";
import { ResultDisclaimer } from "./ResultDisclaimer";
import { ResultActions } from "./ResultActions";

/**
 * 結果渲染外殼（client 島嶼）。
 * 以 useSyncExternalStore 讀取本機結果；無效或無資料 → Empty State（不偽造結果、不崩潰）。
 * 平手（isTied）時：Hero 顯示並列傾向，跳過單一人格的決策風格解讀，
 * 改由並列人格卡承載，各段固定聲明照常顯示。
 */
export function ResultsShell() {
  const stored = useStoredResult();

  if (stored === undefined) {
    return (
      <div aria-hidden="true" className="animate-pulse rounded-sm border border-mist bg-paper-raised p-8">
        <div className="h-6 w-1/3 rounded bg-mist" />
        <div className="mt-4 h-4 w-2/3 rounded bg-mist" />
        <div className="mt-8 h-24 rounded bg-mist" />
      </div>
    );
  }

  if (stored === null) {
    return (
      <div className="rounded-sm border border-mist bg-paper-raised p-8 text-center">
        <p className="text-graphite">目前沒有可顯示的測驗結果</p>
        <p className="mt-2 text-sm text-stone">請先完成外顯決策風格測驗</p>
        <Link
          href="/assessment"
          className="mt-6 inline-block rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          開始測驗
        </Link>
      </div>
    );
  }

  const result = stored;
  const winner = personas.find((p) => p.id === result.expressedPersona);

  return (
    <div>
      <ResultHero result={result} />
      <ScoreDistribution result={result} />
      {!result.isTied && winner ? (
        <DecisionAnalysis persona={winner} />
      ) : (
        <section className="mt-10 rounded-sm border border-mist bg-paper-raised p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">接下來可以怎麼做</h2>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-graphite">
            並列傾向通常代表你在不同情境會切換不同的決策方式。
            你可以先閱讀上方並列人格的完整定義，看哪一種更接近你在重要決策中的實際做法；
            也可以重新測驗，依「最常見的做法」而非「理想中的做法」作答。
          </p>
        </section>
      )}
      <LayerExplanation />
      <ResultDisclaimer />
      <ResultActions result={result} />
    </div>
  );
}
