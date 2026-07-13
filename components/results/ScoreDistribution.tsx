import type { AssessmentResult } from "@/types/result";
import { personas } from "@/data/personas";
import { clusters } from "@/data/clusters";

/** 結果頁第二段：三大決策系分布＋九種人格前三名。數值與文字並列，不只靠顏色。 */
export function ScoreDistribution({ result }: { result: AssessmentResult }) {
  return (
    <section className="mt-8">
      <h2 className="font-serif text-xl font-semibold text-ink">分數分布</h2>
      <div className="mt-5 space-y-3">
        {clusters.map((c) => {
          const s = result.clusterScores[c.id];
          const percent = Math.round(s.normalized * 100);
          return (
            <div key={c.id}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-ink">{c.displayName}</span>
                <span className="text-stone">
                  {s.raw} 分（{percent}%）
                </span>
              </div>
              <div
                role="img"
                aria-label={`${c.displayName} ${s.raw} 分，佔理論最高分 ${percent}%`}
                className="mt-1 h-2 overflow-hidden rounded-full bg-mist"
              >
                <div className="h-full bg-gold" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="mt-8 text-sm font-medium tracking-[0.18em] text-gold">
        九種人格前三名
      </h3>
      <ol className="mt-3 space-y-2">
        {result.topPersonas.map((pid, i) => {
          const p = personas.find((x) => x.id === pid);
          if (!p) return null;
          const s = result.personaScores[pid];
          return (
            <li
              key={pid}
              className="flex items-baseline justify-between rounded-sm border border-mist bg-paper-raised px-4 py-3"
            >
              <span className="text-ink">
                <span className="mr-3 text-sm text-stone">{i + 1}</span>
                {p.displayName}
              </span>
              <span className="text-sm text-stone">{s.raw}／12 分</span>
            </li>
          );
        })}
      </ol>
      {result.isTied && (
        <p className="mt-3 text-xs text-stone">
          排名中並列分數的排列順序僅供閱讀，不代表判定先後。
        </p>
      )}
    </section>
  );
}
