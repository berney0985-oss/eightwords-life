/**
 * lib/core-profile/persona-mapper.ts
 *
 * 十神強度 → 九人格分數 → corePersonaId 判定（V1）。
 *
 * ⚠ 本模組只輸出 ID 與分數。人格名稱 / 定義 / 文案一律由主站
 *   依 corePersonaId 讀取 data/personas.ts，本引擎不得複製人格文案。
 *
 * 平手規則（裁決二・六）：
 *   - top1 = 0 → corePersonaId = null, isTied = true, candidates = []
 *   - 最高分完全同分（>0）→ corePersonaId = null, isTied = true,
 *       candidates 至少含所有最高分人格
 *   - 唯一最高分 → corePersonaId = 該人格, isTied = false
 *   - 不使用「次高達最高 90%」門檻（缺乏實證），僅「數值完全相同」視為平手
 *   - 另輸出 scoreGap / scoreGapRatio 供未來校準（不得顯示為準確率）
 */

import type { PersonaId, TenGod } from '../../types/core-profile';

/** 正式十神 → 人格 一對一映射（比肩＋劫財合併入 persona_selfmade） */
export const TEN_GOD_TO_PERSONA: Record<TenGod, PersonaId> = {
  正財: 'persona_pragmatist',
  正官: 'persona_commander',
  正印: 'persona_idealist',
  比肩: 'persona_selfmade',
  劫財: 'persona_selfmade',
  偏印: 'persona_strategist',
  偏財: 'persona_pioneer',
  七殺: 'persona_challenger',
  食神: 'persona_creator',
  傷官: 'persona_expresser',
};

/** 九人格固定清單（作為初始化與穩定排序依據） */
export const PERSONA_IDS: readonly PersonaId[] = [
  'persona_pragmatist',
  'persona_commander',
  'persona_idealist',
  'persona_selfmade',
  'persona_strategist',
  'persona_pioneer',
  'persona_challenger',
  'persona_creator',
  'persona_expresser',
];

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export interface PersonaMappingResult {
  personaScores: Record<PersonaId, number>;
  corePersonaId: PersonaId | null;
  candidatePersonaIds: PersonaId[];
  rankedPersonaIds: PersonaId[];
  isTied: boolean;
  scoreGap: number;
  scoreGapRatio: number;
}

/** 由十神分數彙總九人格分數（比肩＋劫財合併） */
export function toPersonaScores(tenGodScores: Record<TenGod, number>): Record<PersonaId, number> {
  const scores = {} as Record<PersonaId, number>;
  for (const id of PERSONA_IDS) scores[id] = 0;
  (Object.keys(tenGodScores) as TenGod[]).forEach((g) => {
    scores[TEN_GOD_TO_PERSONA[g]] += tenGodScores[g];
  });
  for (const id of PERSONA_IDS) scores[id] = round3(scores[id]);
  return scores;
}

export function mapPersona(tenGodScores: Record<TenGod, number>): PersonaMappingResult {
  const personaScores = toPersonaScores(tenGodScores);

  // 依分數降冪排序；同分時以 PersonaId 字串升冪排序（僅序列化穩定性，非優先級）
  const ranked = [...PERSONA_IDS].sort((a, b) => {
    const diff = personaScores[b] - personaScores[a];
    if (diff !== 0) return diff;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  const top1 = personaScores[ranked[0]];
  const top2 = ranked.length > 1 ? personaScores[ranked[1]] : 0;
  const scoreGap = round3(top1 - top2);
  const scoreGapRatio = top1 > 0 ? round3(scoreGap / top1) : 0;

  const tiedTop = PERSONA_IDS.filter((id) => personaScores[id] === top1);

  let corePersonaId: PersonaId | null;
  let candidatePersonaIds: PersonaId[];
  let isTied: boolean;

  if (top1 === 0) {
    // 全為 0：無法映射
    corePersonaId = null;
    isTied = true;
    candidatePersonaIds = [];
  } else if (tiedTop.length > 1) {
    // 正式平手：完全同分
    corePersonaId = null;
    isTied = true;
    // candidates：所有最高分人格在前，補至最少三名（僅取分數 > 0 者）
    candidatePersonaIds = buildCandidates(ranked, personaScores, tiedTop);
  } else {
    // 唯一最高分
    corePersonaId = ranked[0];
    isTied = false;
    candidatePersonaIds = ranked.filter((id) => personaScores[id] > 0).slice(0, 3);
  }

  return {
    personaScores,
    corePersonaId,
    candidatePersonaIds,
    rankedPersonaIds: ranked,
    isTied,
    scoreGap,
    scoreGapRatio,
  };
}

/**
 * 平手時的候選清單：先放所有最高分人格（依 PersonaId 字串排序，僅穩定性），
 * 再依排名補入次高（分數 > 0）直到至少三名。
 */
function buildCandidates(
  ranked: PersonaId[],
  scores: Record<PersonaId, number>,
  tiedTop: PersonaId[],
): PersonaId[] {
  const tiedSorted = [...tiedTop].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const out: PersonaId[] = [...tiedSorted];
  for (const id of ranked) {
    if (out.length >= 3) break;
    if (out.includes(id)) continue;
    if (scores[id] > 0) out.push(id);
  }
  return out;
}
