import type { SimulatedCase } from "@/types/case";
import { personas } from "@/data/personas";
import Link from "next/link";

const domainLabel = { relationship: "感情", career: "職涯", creation: "創作／創業" } as const;

/** 案例完整分析。文案層級：D（data/cases.ts）。 */
export function CaseAnalysis({ item }: { item: SimulatedCase }) {
  const persona = personas.find((p) => p.id === item.primaryPersonaId);
  const rows: Array<[string, string]> = [
    ["案例背景", item.background],
    ["表面問題", item.surfaceProblem],
    ["決策慣性", item.decisionHabit],
    ["情境失效", item.failureContext],
    ["決策盲點", item.blindspot],
    ["重複錯誤", item.recurringMistake],
    ["修正策略", item.correctionStrategy],
    ["下一步行動", item.nextAction],
  ];

  return (
    <article className="rounded-sm border border-mist bg-paper-raised p-6 sm:p-8">
      <p className="text-xs text-stone">
        {domainLabel[item.domain]}・{item.label}・分析視角之一：
        {persona && (
          <Link href={`/personas/${persona.slug}`} className="text-gold transition-colors hover:text-gold-deep">
            {persona.displayName}
          </Link>
        )}
      </p>
      <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {item.title}
      </h2>
      <dl className="mt-6 divide-y divide-mist border-t border-mist">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
            <dt className="text-sm font-medium text-stone">{label}</dt>
            <dd className="leading-relaxed text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
