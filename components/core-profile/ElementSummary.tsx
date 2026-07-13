import type { Element } from "@/types/core-profile";

/** 五行分布摘要。 */
export function ElementSummary({ scores }: { scores: Record<Element, number> }) {
  const order: Element[] = ["木", "火", "土", "金", "水"];
  const max = Math.max(1, ...order.map((e) => scores[e] ?? 0));
  return (
    <div className="space-y-2">
      {order.map((e) => {
        const v = scores[e] ?? 0;
        return (
          <div key={e} className="flex items-center gap-3">
            <span className="w-6 font-serif text-ink">{e}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-mist">
              <div className="h-full bg-gold" style={{ width: `${(v / max) * 100}%` }} />
            </div>
            <span className="w-10 text-right text-sm text-graphite">{v.toFixed(1)}</span>
          </div>
        );
      })}
    </div>
  );
}
