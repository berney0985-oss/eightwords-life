import type { PersonaProfile } from "@/types/persona";
import { clusters } from "@/data/clusters";
import { ExpressedPersonaPanel } from "./ExpressedPersonaPanel";

/**
 * 人格詳細頁六段結構（3.0.0 §7.5）。資料層級：A（personas.ts 原文欄位）。
 * 一、人格底色｜二、天賦密碼｜三、你的外顯人格｜
 * 四、決策慣性與優勢｜五、壓力與決策風險｜六、修正與成長
 */

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-mist py-10 first:border-t-0">
      <h2 className="font-serif text-xl font-semibold text-ink">
        <span className="mr-3 text-sm font-medium tracking-[0.18em] text-gold">
          {index}
        </span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Rows({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="divide-y divide-mist">
      {rows.map(([label, value]) => (
        <div key={label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm font-medium text-stone">{label}</dt>
          <dd className="leading-relaxed text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PersonaDetail({ persona }: { persona: PersonaProfile }) {
  const cluster = clusters.find((c) => c.id === persona.clusterId);
  const { corePersona, talentBlueprint, decisionProfile, riskProfile } = persona;

  return (
    <div>
      {/* 一、人格底色（引用決策慣性內容時屬長期傾向語境） */}
      <Section index="一" title="人格底色">
        <p className="max-w-prose leading-relaxed text-graphite">
          人格底色描述長期核心需求與內在決策驅動，回答「為什麼這樣做決策」。
          以下為{persona.displayName}的內在模型層內容。
        </p>
        <div className="mt-6">
          <Rows
            rows={[
              ["人格定位", corePersona.positioning],
              ["核心需求", corePersona.coreNeed],
              ["核心價值", corePersona.coreValues.join("、")],
              ["人生目標", corePersona.lifeGoal],
              ["決策目標", corePersona.decisionGoal],
              ["思考模式", corePersona.thinkingPattern],
              ["行動模式", corePersona.actionPattern],
              ["一句人格定義", corePersona.oneLineDefinition],
              ["一句品牌標語", corePersona.brandSlogan],
              ["一句白話解釋", corePersona.plainExplanation],
            ]}
          />
        </div>
        <p className="mt-4 text-xs text-stone">
          模型來源：{persona.baziSource}・所屬決策系：{cluster?.displayName}
        </p>
      </Section>

      {/* 二、天賦密碼 */}
      <Section index="二" title="天賦密碼">
        <p className="max-w-prose leading-relaxed text-graphite">
          天賦密碼是這個人格底色自然延伸出的價值創造方式——
          不是另一種人格，不是能力測驗，不是職業推薦，也不是興趣測驗。
          它描述的是這種人格最自然的價值創造方式。
        </p>
        <div className="mt-6">
          <Rows
            rows={[
              ["天賦主軸", talentBlueprint.theme],
              ["自然優勢", talentBlueprint.naturalAdvantage],
              ["自然貢獻", talentBlueprint.naturalContribution],
              ["角色定位", talentBlueprint.bestRole],
              ["成熟潛能", talentBlueprint.growthPotential],
            ]}
          />
        </div>
      </Section>

      {/* 三、你的外顯人格（client 島嶼；本階段僅空狀態） */}
      <Section index="三" title="你的外顯人格">
        <ExpressedPersonaPanel personaDisplayName={persona.displayName} />
      </Section>

      {/* 四、決策慣性與優勢 */}
      <Section index="四" title="決策慣性與優勢">
        <p className="max-w-prose leading-relaxed text-graphite">
          決策慣性本身不是缺點。它是人在熟悉情境中，提高決策效率的預設路徑。
        </p>
        <div className="mt-6">
          <Rows
            rows={[
              ["決策慣性", decisionProfile.decisionHabit],
              ["最大優勢", decisionProfile.strength],
            ]}
          />
        </div>
      </Section>

      {/* 五、壓力與決策風險 */}
      <Section index="五" title="壓力與決策風險">
        <Rows
          rows={[
            ["最大弱點", decisionProfile.weakness],
            ["壓力下的表現", riskProfile.stressResponse],
            ["最大決策盲點", riskProfile.decisionBlindspot],
            ["盲點觸發情境", riskProfile.blindspotTriggers.join("、")],
            ["重複錯誤", riskProfile.recurringMistake],
          ]}
        />
      </Section>

      {/* 六、修正與成長（盲點與修正策略 1:1 對應） */}
      <Section index="六" title="修正與成長">
        <Rows
          rows={[
            ["修正策略", riskProfile.correctionStrategy],
            ["成長方向", riskProfile.growthDirection],
          ]}
        />
        <p className="mt-6 max-w-prose text-sm leading-relaxed text-graphite">
          以上內容描述的是傾向，不是命定；是模型，不是診斷。
          慣性可能在某些情境中失效，下一次可以嘗試對應的修正策略。
        </p>
      </Section>
    </div>
  );
}
