/**
 * types/core-profile.ts
 *
 * 人格底色分析 (Core Persona Profile) — 型別定義
 * 品牌母體：科學決策 Decision Science Lab
 *
 * 責任分工：
 *   八字符號模型 (bazi_symbolic_model) → corePersonaId
 *   行為情境測驗 (由主站負責)          → expressedPersona（本模組不輸出）
 *
 * 注意：本模組只負責「判定 corePersonaId」。
 * 正式人格文案（corePersona / talentBlueprint / decisionProfile / riskProfile）
 * 一律由科學決策主站依 corePersonaId 讀取 data/personas.ts，
 * 不得複製進本引擎。
 */

/** 五行 */
export type Element = '木' | '火' | '土' | '金' | '水';

/** 十神（十類，日主本身不計） */
export type TenGod =
  | '比肩'
  | '劫財'
  | '食神'
  | '傷官'
  | '偏財'
  | '正財'
  | '七殺'
  | '正官'
  | '偏印'
  | '正印';

/**
 * 正式九種人格 ID（唯一權威來源為主站 data/personas.ts / types/persona.ts）。
 * 本檔僅作為 PersonaId 型別占位，不含任何人格文案。
 */
export type PersonaId =
  | 'persona_pragmatist' // 務實型
  | 'persona_commander'  // 領導型
  | 'persona_idealist'   // 理想型
  | 'persona_selfmade'   // 自立型（比肩＋劫財合併）
  | 'persona_strategist' // 謀略型
  | 'persona_pioneer'    // 開拓型
  | 'persona_challenger' // 挑戰型
  | 'persona_creator'    // 創作型
  | 'persona_expresser'; // 表達型

export type Gender = 'male' | 'female';

/** 子時換日規則：midnight = 00:00 子正（預設）；2300 = 23:00 子初 */
export type ZiPolicy = 'midnight' | '2300';

/** 曆法方法標記 */
export type CalendarMethod = 'approximate_solar_terms';

/** 模型來源標記 */
export type ModelSource = 'bazi_symbolic_model';

/** ─────────────────────────────────────────── 輸入 ─────────────────────────────────────────── */
export interface CoreProfileInput {
  name?: string;
  gender: Gender;
  /** 'YYYY-MM-DD' */
  birthDate: string;
  birthTimeKnown: boolean;
  /** 'HH:mm'；出生時間未知時為 null */
  birthTime: string | null;
  /** IANA timezone，例 'Asia/Taipei' */
  timezone: string;
  ziPolicy: ZiPolicy;
}

/** ─────────────────────────────────────────── 四柱 ─────────────────────────────────────────── */
export interface Pillar {
  /** 天干索引 0–9 */
  stem: number;
  /** 地支索引 0–11 */
  branch: number;
  stemChar: string;
  branchChar: string;
  /** 例 '甲子' */
  name: string;
  /** 六十甲子序號 0–59 */
  sexagenaryIndex: number;
}

export interface Pillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  /** 出生時間未知時為 null，不得以 00:00 / 子時替代 */
  hour: Pillar | null;
}

/** ───────────────────────────────────── 資料完整度 ───────────────────────────────────── */
export type DataCompletenessLevel = 'partial' | 'complete';

export interface DataCompleteness {
  birthDateProvided: boolean;
  birthTimeKnown: boolean;
  timezoneConfirmed: boolean;
  availablePillarCount: 3 | 4;
  /** partial = 三柱（時間未知）；complete = 四柱（已提供時間） */
  level: DataCompletenessLevel;
  /** 顯示文字。只稱「資料完整度」，不得稱準確率／可信度 */
  label: string;
}

/** ───────────────────────────────────────── 結果 ───────────────────────────────────────── */
export interface CoreProfileResult {
  schemaVersion: '1.0.0';
  /** 例 'core-profile-engine@0.1.0' */
  engineVersion: string;
  /** 例 'ten-god-weighting@0.1.0'（暫定原型，未經樣本校準） */
  scoringModelVersion: string;
  /** ISO 8601，由呼叫端注入 */
  createdAt: string;

  input: CoreProfileInput;
  dataCompleteness: DataCompleteness;

  pillars: Pillars;
  /** 日主天干字 */
  dayMaster: string;

  /** 五行分布摘要（符號分布，與十神權重為不同計算） */
  fiveElementScores: Record<Element, number>;

  /** 十神原始分數（暫定權重） */
  tenGodScores: Record<TenGod, number>;
  /** 最高分十神；若全為 0 則為 null */
  primaryTenGod: TenGod | null;
  /** 次要十神（分數 > 0，依分數排序） */
  secondaryTenGods: TenGod[];

  /** 九人格分數（比肩＋劫財合併入 persona_selfmade） */
  personaScores: Record<PersonaId, number>;
  /** 唯一最高分時有值；平手或最高分為 0 時為 null */
  corePersonaId: PersonaId | null;
  /** 平手時至少含所有最高分人格；最高分為 0 時為 []；否則為最高三名 */
  candidatePersonaIds: PersonaId[];
  /** 依分數排序的所有人格（最多九個）。同分時以 PersonaId 字串排序，僅為序列化穩定性，非人格優先級 */
  rankedPersonaIds: PersonaId[];
  isTied: boolean;
  /** top1 - top2（人格分數） */
  scoreGap: number;
  /** top1 > 0 ? scoreGap / top1 : 0。不得顯示為準確率 */
  scoreGapRatio: number;

  /** 普通格局候選標籤（僅供顯示，不影響 corePersonaId 的 V1 判定） */
  basePatternCandidate: string | null;

  modelSource: ModelSource;

  calendarMethod: CalendarMethod;
  calendarReviewRequired: boolean;
  calendarReviewReasons: string[];

  /** 一般性限制說明字串 */
  limitations: string[];
}

/** ───────────────────────────────────────── 驗證 ───────────────────────────────────────── */
export interface ValidationIssue {
  field: string;
  code: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

/** analyzeCoreProfile 選項（保持純函式：時間基準與 createdAt 由外部注入） */
export interface AnalyzeOptions {
  /** ISO 8601；未提供時由入口以系統時間補上 */
  createdAt?: string;
  /** 'YYYY-MM-DD'；提供時才進行「未來日期」檢查 */
  now?: string;
}
