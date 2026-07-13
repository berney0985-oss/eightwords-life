"use client";

import Link from "next/link";
import { personas } from "@/data/personas";
import { useStoredLoveResult } from "@/lib/use-storage";
import { ResultHero } from "./ResultHero";
import { ScoreDistribution } from "./ScoreDistribution";
import { DecisionAnalysis } from "./DecisionAnalysis";

/**
 * 感情分析結果外殼（client 島嶼）。
 * 讀取感情獨立結果 key；渲染沿用工作結果的分數與人格解讀元件，
 * 但語境文案、重新分析導向皆為感情。平手時跳過單一人格解讀。
 */
export function LoveResultsShell() {
  const stored = useStoredLoveResult();

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
        <p className="text-graphite">目前沒有可顯示的感情分析結果</p>
        <p className="mt-2 text-sm text-stone">請先完成感情分析</p>
        <Link
          href="/assessment/love"
          className="mt-6 inline-block rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          開始感情分析
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
            並列傾向通常代表你在不同關係情境會切換不同的決策方式，這很正常。
          </p>
        </section>
      )}

      <section className="mt-10 rounded-sm border border-mist bg-paper-raised p-6">
        <p className="text-sm leading-relaxed text-graphite">
          此分析為產品原型。結果反映的是你在人際與親密關係情境作答所呈現的外顯決策傾向——
          不是心理診斷、不是人格定論、不是未來預測，也不是人格底色。
        </p>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/assessment/love"
          className="rounded-sm border border-ink px-6 py-3 text-center text-ink transition-colors hover:bg-mist"
        >
          重新分析
        </Link>
        <Link
          href="/science-bazi"
          className="rounded-sm bg-gold px-6 py-3 text-center font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          了解你的人格底色
        </Link>
      </div>
    </div>
  );
}
