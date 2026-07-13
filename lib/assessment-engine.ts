/**
 * 共用計分引擎（方案 A）。工作／感情測驗共用同一套計分、平手、clarity 邏輯，
 * 差異只在「題庫」與「儲存空間」。
 *
 * 設計原則：
 * - 純函式、無副作用、可測試；不得在 React component 中直接計分。
 * - 由呼叫端注入題庫（bank）；不在此寫死 data/questions，讓工作與感情共用。
 * - 計分規則、兩層平手、clarity 與原 lib/scoring.ts 完全一致（工作行為逐位元不變）。
 *
 * lib/scoring.ts 以本引擎實作工作測驗（bank = data/questions），
 * 對外仍匯出 scoreAssessment / theoreticalMaxima，既有匯入者不受影響。
 */

import type { AssessmentResult, TieType } from "@/types/result";
import type { PersonaId } from "@/types/persona";
import type { ClusterId } from "@/types/cluster";
import { PERSONA_IDS } from "@/types/persona";
import { CLUSTER_IDS } from "@/types/cluster";
import { personas } from "@/data/personas";
import { computeClarity } from "./confidence";

/**
 * 引擎僅需題目的結構最小集（id 與選項的 personaScores），
 * 工作題庫（AssessmentQuestion）與感情題庫（LoveAssessmentQuestion）皆結構相容。
 */
export interface QuestionLike {
  id: string;
  options: ReadonlyArray<{
    id: string;
    personaScores: Partial<Record<PersonaId, number>>;
  }>;
}

/** persona → cluster 對照（單一資料源：personas.ts） */
const clusterOf: Record<PersonaId, ClusterId> = Object.fromEntries(
  personas.map((p) => [p.id, p.clusterId]),
) as Record<PersonaId, ClusterId>;

/** 由題庫計算理論最高分（人格 12／決策系 36），不寫死魔術數字 */
export function theoreticalMaximaOf(bank: ReadonlyArray<QuestionLike>): {
  persona: Record<PersonaId, number>;
  cluster: Record<ClusterId, number>;
} {
  const persona = Object.fromEntries(PERSONA_IDS.map((id) => [id, 0])) as Record<PersonaId, number>;
  const cluster = Object.fromEntries(CLUSTER_IDS.map((id) => [id, 0])) as Record<ClusterId, number>;
  for (const q of bank) {
    for (const opt of q.options) {
      for (const [pid, score] of Object.entries(opt.personaScores)) {
        persona[pid as PersonaId] += score ?? 0;
      }
    }
  }
  // 每題僅能作答一個選項：決策系最高分＝每題該系選項得分之和（每題各系恰一選項）
  for (const q of bank) {
    const best: Partial<Record<ClusterId, number>> = {};
    for (const opt of q.options) {
      for (const [pid, score] of Object.entries(opt.personaScores)) {
        const cid = clusterOf[pid as PersonaId];
        best[cid] = Math.max(best[cid] ?? 0, score ?? 0);
      }
    }
    for (const cid of CLUSTER_IDS) cluster[cid] += best[cid] ?? 0;
  }
  return { persona, cluster };
}

/**
 * 依作答計算結果。
 * @param bank    題庫（工作或感情）
 * @param answers questionId → optionId（以最終答案為準；修改答案後重新計分）
 * @param versions schemaVersion／assessmentVersion（由呼叫端注入，工作與感情各自版本）
 */
export function scoreWith(
  bank: ReadonlyArray<QuestionLike>,
  answers: Record<string, string>,
  versions: { schemaVersion: AssessmentResult["schemaVersion"]; assessmentVersion: string },
): AssessmentResult {
  const personaRaw = Object.fromEntries(PERSONA_IDS.map((id) => [id, 0])) as Record<PersonaId, number>;
  let answerCount = 0;

  for (const q of bank) {
    const chosenId = answers[q.id];
    if (!chosenId) continue;
    const opt = q.options.find((o) => o.id === chosenId);
    if (!opt) continue;
    answerCount++;
    for (const [pid, score] of Object.entries(opt.personaScores)) {
      personaRaw[pid as PersonaId] += score ?? 0;
    }
  }

  const clusterRaw = Object.fromEntries(CLUSTER_IDS.map((id) => [id, 0])) as Record<ClusterId, number>;
  for (const pid of PERSONA_IDS) clusterRaw[clusterOf[pid]] += personaRaw[pid];

  const maxima = theoreticalMaximaOf(bank);
  const personaScores = Object.fromEntries(
    PERSONA_IDS.map((pid) => [
      pid,
      { raw: personaRaw[pid], normalized: maxima.persona[pid] > 0 ? personaRaw[pid] / maxima.persona[pid] : 0 },
    ]),
  ) as AssessmentResult["personaScores"];
  const clusterScores = Object.fromEntries(
    CLUSTER_IDS.map((cid) => [
      cid,
      { raw: clusterRaw[cid], normalized: maxima.cluster[cid] > 0 ? clusterRaw[cid] / maxima.cluster[cid] : 0 },
    ]),
  ) as AssessmentResult["clusterScores"];

  // 排名（僅供顯示；並列時以人格定義順序排列，不代表判定）
  const ranked = [...PERSONA_IDS].sort((a, b) => personaRaw[b] - personaRaw[a]);
  const topPersonas = ranked.slice(0, 3);

  // ── 平手判定 ──
  const maxRaw = personaRaw[ranked[0]];
  const tiedByRaw = PERSONA_IDS.filter((pid) => personaRaw[pid] === maxRaw);

  let expressedPersona: PersonaId | null;
  let isTied: boolean;
  let tiedTopPersonas: PersonaId[];
  let tieType: TieType;

  if (tiedByRaw.length === 1) {
    expressedPersona = tiedByRaw[0];
    isTied = false;
    tiedTopPersonas = [];
    tieType = "none";
  } else {
    // 第二層：比較所屬決策系總分
    const bestClusterRaw = Math.max(...tiedByRaw.map((pid) => clusterRaw[clusterOf[pid]]));
    const survivors = tiedByRaw.filter((pid) => clusterRaw[clusterOf[pid]] === bestClusterRaw);
    if (survivors.length === 1) {
      expressedPersona = survivors[0];
      isTied = false;
      tiedTopPersonas = [];
      tieType = "none";
    } else {
      expressedPersona = null;
      isTied = true;
      tiedTopPersonas = survivors;
      const allFlat = PERSONA_IDS.every((pid) => personaRaw[pid] === maxRaw);
      const sameCluster = new Set(survivors.map((pid) => clusterOf[pid])).size === 1;
      tieType = allFlat ? "full_tie" : sameCluster ? "persona_tie" : "cluster_tie";
    }
  }

  // 第二傾向與清晰度
  let secondaryPersona: PersonaId | null = null;
  let clarityTop1 = 0;
  let clarityTop2 = 0;
  if (!isTied && expressedPersona !== null) {
    const rest = ranked.filter((pid) => pid !== expressedPersona);
    secondaryPersona = rest[0] ?? null;
    clarityTop1 = personaScores[expressedPersona].normalized;
    clarityTop2 = secondaryPersona ? personaScores[secondaryPersona].normalized : 0;
  }
  // 平手時 top1 = top2 → clarity 0
  const clarity = isTied ? computeClarity(0, 0) : computeClarity(clarityTop1, clarityTop2);

  const primaryCluster: ClusterId | null =
    expressedPersona !== null ? clusterOf[expressedPersona] : null;

  return {
    schemaVersion: versions.schemaVersion,
    assessmentVersion: versions.assessmentVersion,
    completedAt: new Date().toISOString(),
    expressedPersona,
    secondaryPersona,
    topPersonas,
    primaryCluster,
    personaScores,
    clusterScores,
    clarity,
    answerCount,
    isTied,
    tiedTopPersonas,
    tieType,
  } as AssessmentResult;
}
