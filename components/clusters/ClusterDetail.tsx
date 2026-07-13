import Link from "next/link";
import type { Cluster } from "@/types/cluster";
import { personas } from "@/data/personas";

/**
 * 決策系詳細內容。資料層級：A（clusters.ts 原文欄位）。
 * 顯示名「共同價值」依專案指令書第十二節；資料來源為規格欄位「共同價值觀」
 * （對照見 data-issues.md #4）。
 */
const rows = (c: Cluster): Array<[string, string]> => [
  ["核心策略", c.coreStrategy],
  ["核心需求光譜", c.needSpectrum.join("、")],
  ["共同人格", c.sharedPersona],
  ["共同需求", c.sharedNeed],
  ["共同價值", c.sharedValues],
  ["共同思考模式", c.sharedThinkingPattern],
  ["共同決策模式", c.sharedDecisionPattern],
  ["共同優勢", c.sharedStrength],
  ["共同盲點", c.sharedBlindspot],
  ["共同成長方向", c.sharedGrowthDirection],
];

export function ClusterDetail({ cluster }: { cluster: Cluster }) {
  const members = cluster.includedPersonaIds
    .map((pid) => personas.find((p) => p.id === pid))
    .filter((p) => p !== undefined);

  return (
    <div>
      <section aria-label="包含人格" className="mb-10">
        <h2 className="text-sm font-medium tracking-[0.18em] text-gold">包含人格</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {members.map((p) => (
            <Link
              key={p.id}
              href={`/personas/${p.slug}`}
              className="rounded-sm border border-mist bg-paper-raised p-4 transition-colors hover:border-gold"
            >
              <span className="font-serif text-lg font-semibold text-ink">{p.displayName}</span>
              <span className="mt-1 block text-xs text-stone">模型來源：{p.baziSource}</span>
              <span className="mt-2 block text-sm text-graphite">
                核心需求：{p.corePersona.coreNeed}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <dl className="divide-y divide-mist border-y border-mist">
        {rows(cluster).map(([label, value]) => (
          <div key={label} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="text-sm font-medium text-stone">{label}</dt>
            <dd className="leading-relaxed text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
