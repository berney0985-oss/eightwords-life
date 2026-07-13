import type { PersonaProfile } from "@/types/persona";

/** 天賦密碼摘要（免費：主題＋自然優勢方向）。完整天賦密碼屬付費。 */
export function TalentBlueprintSummary({ persona }: { persona: PersonaProfile | null }) {
  if (!persona) return null;
  const t = persona.talentBlueprint;
  return (
    <div className="rounded-sm border border-mist bg-paper-raised p-5">
      <div className="text-xs font-medium tracking-wide text-gold">天賦密碼</div>
      <h4 className="mt-1 font-serif text-lg font-semibold text-ink">{t.theme}</h4>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-graphite">{t.naturalAdvantage}</p>
    </div>
  );
}
