"use client";

import Link from "next/link";
import { personas } from "@/data/personas";
import type { PersonaProfile } from "@/types/persona";
import { useStoredCoreProfile } from "@/lib/use-storage";
import { PillarSummary } from "./PillarSummary";
import { ElementSummary } from "./ElementSummary";
import { TenGodSummary } from "./TenGodSummary";
import { CorePersonaSummary } from "./CorePersonaSummary";
import { TalentBlueprintSummary } from "./TalentBlueprintSummary";
import { CoreProfileDisclaimer } from "./CoreProfileDisclaimer";
import { CoreProfilePaywall } from "./CoreProfilePaywall";

const personaById = (id: string | null): PersonaProfile | null =>
  id ? (personas.find((p) => p.id === id) ?? null) : null;

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-8">
    <h2 className="mb-3 font-serif text-lg font-semibold text-ink">{title}</h2>
    {children}
  </section>
);

/** 科學八字分析結果（免費摘要＋付費牆）。人格文案一律由 personas.ts 依 ID 取得。 */
export function CoreProfileResult() {
  const stored = useStoredCoreProfile();

  if (stored === undefined) {
    return (
      <div aria-hidden="true" className="animate-pulse rounded-sm border border-mist bg-paper-raised p-8">
        <div className="h-6 w-1/3 rounded bg-mist" />
        <div className="mt-4 h-4 w-2/3 rounded bg-mist" />
        <div className="mt-8 h-24 rounded bg-mist" />
      </div>
    );
  }

  if (stored === null) {
    return (
      <div className="rounded-sm border border-mist bg-paper-raised p-8 text-center">
        <p className="text-graphite">目前沒有可顯示的分析結果</p>
        <p className="mt-2 text-sm text-stone">請先輸入出生資料進行科學八字分析</p>
        <Link
          href="/science-bazi"
          className="mt-6 inline-block rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          開始科學八字分析
        </Link>
      </div>
    );
  }

  const r = stored;
  const core = personaById(r.corePersonaId);
  const candidates = r.candidatePersonaIds
    .map((id) => personaById(id))
    .filter((p): p is PersonaProfile => p !== null);

  return (
    <div>
      <Block title="基本出生資料">
        <div className="rounded-sm border border-mist bg-paper-raised p-4 text-sm text-graphite">
          {r.input.name && <p>姓名：{r.input.name}</p>}
          <p>性別：{r.input.gender === "male" ? "男" : "女"}</p>
          <p>出生日期：{r.input.birthDate}</p>
          <p>
            出生時間：
            {r.dataCompleteness.birthTimeKnown ? r.input.birthTime : "未知（不使用時柱）"}
          </p>
          <p>時區：{r.input.timezone}</p>
        </div>
      </Block>

      <Block title="四柱摘要"><PillarSummary pillars={r.pillars} /></Block>

      <Block title="日主">
        <p className="font-serif text-2xl font-semibold text-ink">{r.dayMaster}</p>
      </Block>

      <Block title="五行分布"><ElementSummary scores={r.fiveElementScores} /></Block>

      <Block title="十神分布">
        <TenGodSummary scores={r.tenGodScores} primary={r.primaryTenGod} secondary={r.secondaryTenGods} />
      </Block>

      <Block title="人格底色（免費摘要）">
        <CorePersonaSummary persona={core} candidates={candidates} />
      </Block>

      <Block title="天賦密碼（摘要）">
        <TalentBlueprintSummary persona={core} />
      </Block>

      <CoreProfilePaywall />

      <CoreProfileDisclaimer result={r} />

      <div className="mt-8">
        <Link
          href="/science-bazi"
          className="inline-block rounded-sm border border-ink px-6 py-3 text-ink transition-colors hover:bg-mist"
        >
          重新輸入資料
        </Link>
      </div>
    </div>
  );
}
