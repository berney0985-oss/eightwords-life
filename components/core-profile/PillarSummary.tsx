import type { Pillars } from "@/types/core-profile";

/** 四柱摘要。出生時間未知時只顯示可確定的三柱，不偽造時柱。 */
export function PillarSummary({ pillars }: { pillars: Pillars }) {
  const cols: { label: string; pillar: Pillars["year"] | null }[] = [
    { label: "年柱", pillar: pillars.year },
    { label: "月柱", pillar: pillars.month },
    { label: "日柱", pillar: pillars.day },
    { label: "時柱", pillar: pillars.hour },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {cols.map((c) => (
          <div key={c.label} className="rounded-sm border border-mist bg-paper-raised p-3 text-center">
            <div className="text-xs text-stone">{c.label}</div>
            <div className="mt-1 font-serif text-lg font-semibold text-ink">
              {c.pillar ? c.pillar.name : "—"}
            </div>
          </div>
        ))}
      </div>
      {!pillars.hour && (
        <p className="mt-2 text-xs text-stone">出生時間未知，本次分析不使用時柱。</p>
      )}
    </div>
  );
}
