import type { TenGod } from "@/types/core-profile";

/** 十神分布摘要（免費：主要十神與次要十神）。 */
export function TenGodSummary({
  scores,
  primary,
  secondary,
}: {
  scores: Record<TenGod, number>;
  primary: TenGod | null;
  secondary: TenGod[];
}) {
  const ranked = (Object.entries(scores) as [TenGod, number][])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  return (
    <div>
      <p className="text-sm text-graphite">
        主要十神：
        <span className="font-medium text-ink">{primary ?? "（無明顯主導）"}</span>
        {secondary.length > 0 && (
          <span className="text-stone">　次要：{secondary.slice(0, 3).join("、")}</span>
        )}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {ranked.map(([g, v]) => (
          <span key={g} className="rounded-sm border border-mist bg-paper-raised px-2 py-1 text-xs text-graphite">
            {g} {v.toFixed(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
