/**
 * 外顯決策風格測驗型別（assessmentVersion 1.0.0）。
 * 題目錨定 D4 思考模式 / D5 行動模式 / D6 決策慣性，禁止抽象自評。
 */

import type { PersonaId } from "./persona";

/** 18 種題目情境類別 */
export const SCENARIO_CATEGORIES = [
  "work_choice",
  "money_use",
  "collaboration",
  "insufficient_info",
  "opportunity_tradeoff",
  "plan_execution",
  "conflict_handling",
  "stress_response",
  "help_vs_independence",
  "commitment_vs_freedom",
  "start_vs_finish",
  "rules_vs_flexibility",
  "long_vs_short_term",
  "risk_vs_opportunity",
  "expression_vs_relationship",
  "compete_vs_exit",
  "ideal_vs_reality",
  "analysis_vs_action",
] as const;

export type ScenarioCategory = (typeof SCENARIO_CATEGORIES)[number];

export type SourceField =
  | "thinking_pattern"
  | "action_pattern"
  | "decision_habit";

/**
 * 測驗選項。
 * 單一資料源原則：選項只保存 personaScores；
 * 決策系分數由 lib/scoring.ts 依 persona.clusterId 自動彙總，不在資料層維護。
 * 統一權重：主要人格 +2、次要人格 +1（至多一個次要）。
 */
export interface AssessmentOption {
  id: string;
  text: string;
  personaScores: Partial<Record<PersonaId, number>>;
  /** 標示題目依據的規格欄位，可回溯 */
  sourceFields: SourceField[];
}

export interface AssessmentQuestion {
  id: string;
  version: string;
  scenario: string;
  context: ScenarioCategory;
  sourceDimensions: SourceField[];
  options: [AssessmentOption, AssessmentOption, AssessmentOption];
}

/** LocalStorage 進度資料（key: decision-science-assessment-v1） */
export interface AssessmentProgress {
  schemaVersion: "3.0.0";
  assessmentVersion: "1.0.0";
  /** questionId → optionId */
  answers: Record<string, string>;
  currentIndex: number;
  startedAt: string;
  updatedAt: string;
}
