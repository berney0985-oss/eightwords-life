import type { PersonaProfile } from "@/types/persona";

/**
 * 結果頁第三段：決策風格解讀（固定敘事順序，§7.6）。
 * 資料來源＝該人格共用的基礎決策內容（personas.ts），
 * 全段固定標示語境：本次作答所呈現的外顯決策傾向。
 */
export function DecisionAnalysis({ persona }: { persona: PersonaProfile }) {
  const { corePersona, decisionProfile, riskProfile } = persona;
  const blocks: Array<[string, string]> = [
    ["你如何處理資訊", corePersona.thinkingPattern],
    ["你通常如何採取行動", corePersona.actionPattern],
    ["這套決策慣性帶來的優勢", `${decisionProfile.decisionHabit} ${decisionProfile.strength}`],
    [
      "它在什麼情境下容易失效",
      `${riskProfile.decisionBlindspot} 常見的觸發情境：${riskProfile.blindspotTriggers.join("、")}。`,
    ],
    ["可能形成的重複錯誤", riskProfile.recurringMistake],
    ["下一次可以如何修正", riskProfile.correctionStrategy],
  ];

  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl font-semibold text-ink">決策風格解讀</h2>
      <p className="mt-2 text-sm text-stone">
        以下為本次作答所呈現的外顯決策傾向——描述的是傾向，不是定論。
      </p>
      <div className="mt-5 space-y-5">
        {blocks.map(([title, body]) => (
          <div key={title} className="rounded-sm border border-mist bg-paper-raised p-5">
            <h3 className="text-sm font-medium tracking-[0.12em] text-gold">{title}</h3>
            <p className="mt-2 leading-relaxed text-ink">{body}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 max-w-prose border-l-2 border-gold pl-4 text-sm leading-relaxed text-graphite">
        {corePersona.plainExplanation}
      </p>
    </section>
  );
}
