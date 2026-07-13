/**
 * 人格資料型別（Schema 3.0.0，巢狀結構）。
 * 對應規格：《科學八字決策系統定義》v2.2.0 + Version 3.0.0 修訂提案。
 * 欄位來源對照見 docs/content-source-map.md。
 */

export const PERSONA_IDS = [
  "persona_pragmatist",
  "persona_commander",
  "persona_idealist",
  "persona_selfmade",
  "persona_strategist",
  "persona_pioneer",
  "persona_challenger",
  "persona_creator",
  "persona_expresser",
] as const;

export type PersonaId = (typeof PERSONA_IDS)[number];

export const PERSONA_SLUGS = [
  "pragmatist",
  "commander",
  "idealist",
  "selfmade",
  "strategist",
  "pioneer",
  "challenger",
  "creator",
  "expresser",
] as const;

export type PersonaSlug = (typeof PERSONA_SLUGS)[number];

import type { ClusterId } from "./cluster";

/** 第一層：內在模型層（人格底色）。回答「我為什麼這樣做決策」。 */
export interface CorePersonaContent {
  positioning: string;
  /** 核心需求：全系統唯一，不得與其他人格重複 */
  coreNeed: string;
  coreValues: string[];
  lifeGoal: string;
  decisionGoal: string;
  thinkingPattern: string;
  actionPattern: string;
  oneLineDefinition: string;
  brandSlogan: string;
  plainExplanation: string;
}

/**
 * 天賦密碼（Talent Blueprint）：人格底色自然延伸出的價值創造方式。
 * 附屬於人格底色，不是另一種人格、不是第二次人格判定。
 * 2.2.0 舊欄位名已於 3.0.0 更名為 talent_blueprint（migration 對照見
 * docs/implementation-decisions.md 1.3）。
 */
export interface TalentBlueprint {
  theme: string;
  naturalAdvantage: string;
  naturalContribution: string;
  /** 角色定位詞，不使用具體職業名稱 */
  bestRole: string;
  growthPotential: string;
}

/**
 * 基礎決策特性：人格定義層（固定）。
 * 描述該人格「如何決策」的中性內容。
 * 資料只有一份，依語境解讀為「人格底色的長期傾向」或
 * 「外顯人格目前呈現的決策風格」，禁止複製為兩份。
 */
export interface DecisionProfile {
  /** 中性詞：無意識反覆採用的預設決策路徑，是效率機制而非缺點 */
  decisionHabit: string;
  strength: string;
  weakness: string;
}

/**
 * 基礎風險輪廓：顧問分析層（可延伸）。
 * 描述慣性失效後的風險鏈：盲點 → 重複錯誤 → 修正 → 成長。
 * 與 DecisionProfile 分離的原因：V2 交叉分析將產生「個人化盲點／
 * 個人化修正策略」（見 PersonaCombinationProfile），基礎風險內容
 * 必須有獨立命名空間，避免與個人化分析混淆。
 * 此處全部為「基礎」內容（basic），個人化內容一律掛在組合分析層。
 */
export interface RiskProfile {
  /** 風險詞：慣性在特定情境失效產生的系統性誤判。與 correctionStrategy 1:1 對應 */
  decisionBlindspot: string;
  blindspotTriggers: string[];
  recurringMistake: string;
  /** 高壓下的退化行為：慣性被放大後的風險表現（歸屬風險層，非中性決策層） */
  stressResponse: string;
  correctionStrategy: string;
  growthDirection: string;
}

export interface PersonaProfile {
  schemaVersion: "3.0.0";
  id: PersonaId;
  slug: PersonaSlug;
  displayName: string;
  baziSource: string;
  clusterId: ClusterId;
  corePersona: CorePersonaContent;
  talentBlueprint: TalentBlueprint;
  decisionProfile: DecisionProfile;
  riskProfile: RiskProfile;
}
