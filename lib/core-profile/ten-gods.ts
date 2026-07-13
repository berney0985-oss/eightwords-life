/**
 * lib/core-profile/ten-gods.ts
 *
 * 十神計算與暫定強度彙總（scoringModelVersion: ten-god-weighting@0.1.0）。
 *
 * ⚠ 暫定原型：透明、可測試、可替換；尚未經真實樣本校準。
 *   不得宣稱為已驗證算法 / 科學準確 / 心理計量模型 / 人格準確率。
 *
 * 移植來源：bazi_fixed_3.html 之 analEng.tg（十神判定邏輯）。
 * 權重規則依第一階段裁決二（V1 暫定計分規則）。
 */

import type { Pillars, TenGod } from '../../types/core-profile';
import {
  STEM_ELEMENT,
  STEM_YINYANG,
  HIDDEN_STEMS,
  HIDDEN_STEM_BASE_WEIGHTS,
  PILLAR_BRANCH_WEIGHTS,
  PILLAR_STEM_WEIGHTS,
  MONTH_COMMANDER_BONUS,
  TEN_GODS,
} from './constants';

/** 以日主判定某天干的十神 */
export function tenGodOf(dayMasterStem: number, otherStem: number): TenGod {
  const de = STEM_ELEMENT[dayMasterStem];
  const oe = STEM_ELEMENT[otherStem];
  const sameYinYang = STEM_YINYANG[dayMasterStem] === STEM_YINYANG[otherStem];
  if (oe === de) return sameYinYang ? '比肩' : '劫財';
  if ((oe + 1) % 5 === de) return sameYinYang ? '偏印' : '正印'; // 生我 → 印
  if ((de + 1) % 5 === oe) return sameYinYang ? '食神' : '傷官'; // 我生 → 食傷
  if ((oe + 2) % 5 === de) return sameYinYang ? '七殺' : '正官'; // 剋我 → 官殺
  return sameYinYang ? '偏財' : '正財'; // 我剋 → 財
}

function emptyScores(): Record<TenGod, number> {
  const s = {} as Record<TenGod, number>;
  for (const g of TEN_GODS) s[g] = 0;
  return s;
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export interface TenGodScoreResult {
  tenGodScores: Record<TenGod, number>;
  primaryTenGod: TenGod | null;
  secondaryTenGods: TenGod[];
}

/**
 * 十神強度彙總。
 *  - 天干：年 1.0 / 月 1.2 / 時 1.0（日干為日主，不計）
 *  - 地支藏干：基礎權重(主0.7/中0.2/餘0.1) × 柱位權重(年1.0/月1.5/日1.0/時1.0)
 *  - 月令額外加權：月支主氣所對應十神 +0.5
 *  - 出生時間未知：完全不含時干、時支、時支藏干（不縮放）
 */
export function scoreTenGods(dayMasterStem: number, pillars: Pillars): TenGodScoreResult {
  const scores = emptyScores();

  // ── 天干（日干除外）──
  scores[tenGodOf(dayMasterStem, pillars.year.stem)] += PILLAR_STEM_WEIGHTS.year;
  scores[tenGodOf(dayMasterStem, pillars.month.stem)] += PILLAR_STEM_WEIGHTS.month;
  if (pillars.hour) {
    scores[tenGodOf(dayMasterStem, pillars.hour.stem)] += PILLAR_STEM_WEIGHTS.hour;
  }

  // ── 地支藏干（含日支；時支僅在四柱時計入）──
  const branchEntries: { branch: number; weight: number }[] = [
    { branch: pillars.year.branch, weight: PILLAR_BRANCH_WEIGHTS.year },
    { branch: pillars.month.branch, weight: PILLAR_BRANCH_WEIGHTS.month },
    { branch: pillars.day.branch, weight: PILLAR_BRANCH_WEIGHTS.day },
  ];
  if (pillars.hour) {
    branchEntries.push({ branch: pillars.hour.branch, weight: PILLAR_BRANCH_WEIGHTS.hour });
  }
  for (const { branch, weight } of branchEntries) {
    const hidden = HIDDEN_STEMS[branch];
    hidden.forEach((stemIdx, rank) => {
      const baseW = HIDDEN_STEM_BASE_WEIGHTS[rank] ?? 0;
      scores[tenGodOf(dayMasterStem, stemIdx)] += baseW * weight;
    });
  }

  // ── 月令額外加權（月支主氣對應十神 +0.5）──
  const monthMainStem = HIDDEN_STEMS[pillars.month.branch][0];
  scores[tenGodOf(dayMasterStem, monthMainStem)] += MONTH_COMMANDER_BONUS;

  // 四捨五入
  for (const g of TEN_GODS) scores[g] = round3(scores[g]);

  // 排序（分數降冪，同分依固定十神順序穩定排序）
  const ranked = [...TEN_GODS].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    return TEN_GODS.indexOf(a) - TEN_GODS.indexOf(b);
  });

  const primaryTenGod = scores[ranked[0]] > 0 ? ranked[0] : null;
  const secondaryTenGods = ranked
    .filter((g) => g !== primaryTenGod && scores[g] > 0)
    .slice(0, 3);

  return { tenGodScores: scores, primaryTenGod, secondaryTenGods };
}

/**
 * 普通格局候選標籤（僅供顯示；不影響 corePersonaId 的 V1 判定）。
 * 由月支主氣所對應十神映射。比肩→建祿格、劫財→月劫格，其餘 <十神>格。
 */
export function basePatternCandidate(dayMasterStem: number, pillars: Pillars): string {
  const monthMainStem = HIDDEN_STEMS[pillars.month.branch][0];
  const g = tenGodOf(dayMasterStem, monthMainStem);
  const map: Record<TenGod, string> = {
    比肩: '建祿格',
    劫財: '月劫格',
    食神: '食神格',
    傷官: '傷官格',
    偏財: '偏財格',
    正財: '正財格',
    七殺: '七殺格',
    正官: '正官格',
    偏印: '偏印格',
    正印: '正印格',
  };
  return map[g];
}
