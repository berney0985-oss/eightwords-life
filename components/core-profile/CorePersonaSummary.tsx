import type { PersonaProfile } from "@/types/persona";

/**
 * 人格底色摘要（免費）：底色名稱＋一句定義＋一項自然優勢＋一項基礎盲點。
 * 完整內容（決策慣性、盲點觸發、修正策略…）屬付費，不在此顯示。
 */
export function CorePersonaSummary({
  persona,
  candidates,
}: {
  persona: PersonaProfile | null;
  candidates: PersonaProfile[];
}) {
  if (!persona) {
    return (
      <div>
        <p className="text-graphite">你的人格底色呈現並列傾向：</p>
        <p className="mt-2 font-serif text-lg font-semibold text-ink">
          {candidates.map((p) => p.displayName).join("、") || "（資料不足以判定）"}
        </p>
        <p className="mt-2 text-sm text-stone">
          並列代表幾個底色的傾向相近，可由完整分析進一步區分。
        </p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-sm text-stone">你的人格底色</p>
      <h3 className="mt-1 font-serif text-2xl font-semibold text-ink">{persona.displayName}</h3>
      <p className="mt-2 max-w-prose leading-relaxed text-graphite">
        {persona.corePersona.oneLineDefinition}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-sm border border-mist bg-paper-raised p-4">
          <div className="text-xs font-medium tracking-wide text-gold">一項自然優勢</div>
          <p className="mt-1 text-sm leading-relaxed text-graphite">{persona.decisionProfile.strength}</p>
        </div>
        <div className="rounded-sm border border-mist bg-paper-raised p-4">
          <div className="text-xs font-medium tracking-wide text-gold">一項基礎盲點</div>
          <p className="mt-1 text-sm leading-relaxed text-graphite">{persona.riskProfile.decisionBlindspot}</p>
        </div>
      </div>
    </div>
  );
}
