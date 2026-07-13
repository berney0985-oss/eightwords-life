/**
 * lib/core-profile/constants.ts
 *
 * 干支 / 五行 / 藏干 / 節氣係數之最小子集。
 * 純資料常數，不依賴 DOM / window / localStorage。
 *
 * 移植來源（審計對照）：bazi_fixed_3.html 之 `C`（僅取排盤與十神所需部分；
 * 舊 C.DTYPE / C.PAT_TYPE / C.DS / C.M_SC / C.T_SC / 用神相關常數不移植）。
 */

import type { Element, TenGod } from '../../types/core-profile';

/** 十天干 */
export const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;

/** 十二地支 */
export const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;

/** 天干 → 五行索引（0=木 1=火 2=土 3=金 4=水） */
export const STEM_ELEMENT: readonly number[] = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];

/** 天干 → 陰陽（0=陽 1=陰） */
export const STEM_YINYANG: readonly number[] = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

/** 五行索引 → 名稱 */
export const ELEMENTS: readonly Element[] = ['木', '火', '土', '金', '水'];

/**
 * 地支藏干（依主氣 → 中氣 → 餘氣排序，值為天干索引）。
 * V1 權重不採用逐支表，而是依「位置」套用固定基礎權重（見 HIDDEN_STEM_BASE_WEIGHTS）。
 * 這是暫定、透明、可替換的原型設定，與舊版逐支加權表刻意不同（見 docs/core-profile-field-map.md）。
 */
export const HIDDEN_STEMS: readonly (readonly number[])[] = [
  [9], // 子：癸
  [5, 9, 7], // 丑：己 癸 辛
  [0, 2, 4], // 寅：甲 丙 戊
  [1], // 卯：乙
  [4, 1, 9], // 辰：戊 乙 癸
  [2, 4, 6], // 巳：丙 戊 庚
  [3, 5], // 午：丁 己
  [5, 3, 1], // 未：己 丁 乙
  [6, 8, 4], // 申：庚 壬 戊
  [7], // 酉：辛
  [4, 7, 3], // 戌：戊 辛 丁
  [8, 0], // 亥：壬 甲
];

/** 藏干基礎權重（依位置）：主氣 0.7 / 中氣 0.2 / 餘氣 0.1 */
export const HIDDEN_STEM_BASE_WEIGHTS: readonly number[] = [0.7, 0.2, 0.1];

/**
 * 柱位權重（十神計分用）：年 1.0 / 月 1.5 / 日 1.0 / 時 1.0。
 * 索引對應 [year, month, day, hour]。
 */
export const PILLAR_BRANCH_WEIGHTS = {
  year: 1.0,
  month: 1.5,
  day: 1.0,
  hour: 1.0,
} as const;

/**
 * 天干權重（十神計分用）：年干 1.0 / 月干 1.2 / 時干 1.0。
 * 日干為日主本身，不計入十神分數。
 */
export const PILLAR_STEM_WEIGHTS = {
  year: 1.0,
  month: 1.2,
  hour: 1.0,
} as const;

/** 月令額外加權：月支主氣所對應十神額外 +0.5 */
export const MONTH_COMMANDER_BONUS = 0.5;

/** 十神清單（固定順序，作為同分穩定排序之依據） */
export const TEN_GODS: readonly TenGod[] = [
  '比肩',
  '劫財',
  '食神',
  '傷官',
  '偏財',
  '正財',
  '七殺',
  '正官',
  '偏印',
  '正印',
];

/** 十二節（定義月柱邊界）。b = 節氣所屬地支索引 */
export const TERMS: readonly { name: string; month: number; branch: number }[] = [
  { name: '小寒', month: 1, branch: 1 },
  { name: '立春', month: 2, branch: 2 },
  { name: '驚蟄', month: 3, branch: 3 },
  { name: '清明', month: 4, branch: 4 },
  { name: '立夏', month: 5, branch: 5 },
  { name: '芒種', month: 6, branch: 6 },
  { name: '小暑', month: 7, branch: 7 },
  { name: '立秋', month: 8, branch: 8 },
  { name: '白露', month: 9, branch: 9 },
  { name: '寒露', month: 10, branch: 10 },
  { name: '立冬', month: 11, branch: 11 },
  { name: '大雪', month: 12, branch: 0 },
];

/** 壽星公式係數（c20 用於 <2000，c21 用於 ≥2000）。適用約 1900–2099。 */
export const TERM_COEFFICIENTS: Record<string, { c20: number; c21: number }> = {
  小寒: { c20: 6.11, c21: 5.4055 },
  立春: { c20: 4.6295, c21: 3.87 },
  驚蟄: { c20: 6.3826, c21: 5.63 },
  清明: { c20: 5.59, c21: 4.81 },
  立夏: { c20: 6.318, c21: 5.52 },
  芒種: { c20: 6.5, c21: 5.678 },
  小暑: { c20: 7.928, c21: 7.108 },
  立秋: { c20: 8.35, c21: 7.5 },
  白露: { c20: 8.44, c21: 7.646 },
  寒露: { c20: 9.098, c21: 8.318 },
  立冬: { c20: 8.218, c21: 7.438 },
  大雪: { c20: 7.9, c21: 7.18 },
};

/** 已知精確節氣覆寫表（優先於公式）。格式 'YYYY-MM-DD HH:mm' */
export const TERM_OVERRIDE_TABLE: Record<number, Record<string, string>> = {
  2005: { 驚蟄: '2005-03-05 23:09' },
};

/** 適用年份範圍（含端點） */
export const SUPPORTED_YEAR_MIN = 1900;
export const SUPPORTED_YEAR_MAX = 2099;

/** V1 允許時區清單（預留擴充） */
export const ALLOWED_TIMEZONES: readonly string[] = ['Asia/Taipei'];

/** 版本標記 */
export const ENGINE_VERSION = 'core-profile-engine@0.1.0';
export const SCORING_MODEL_VERSION = 'ten-god-weighting@0.1.0';
export const SCHEMA_VERSION = '1.0.0';
