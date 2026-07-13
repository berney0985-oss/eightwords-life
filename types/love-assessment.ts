/**
 * 感情分析型別（loveAssessmentVersion "love-1.0.0"）。
 * 與工作測驗共用九人格／三系／AssessmentOption／SourceField，
 * 但情境類別（context）與儲存空間完全獨立。
 */

import type { AssessmentOption, SourceField } from "./assessment";

/** 18 種感情情境類別（業主裁決八・情境類別）。 */
export const LOVE_SCENARIO_CATEGORIES = [
  "love_ambiguity",
  "love_security",
  "love_commitment",
  "love_conflict",
  "love_communication",
  "love_space",
  "love_trust",
  "love_jealousy",
  "love_dependence",
  "love_rules",
  "love_breakup",
  "love_future",
  "love_money",
  "love_family",
  "love_expressing_needs",
  "love_sacrifice",
  "love_novelty_stability",
  "love_problem_handling",
] as const;

export type LoveScenarioCategory = (typeof LOVE_SCENARIO_CATEGORIES)[number];

export interface LoveAssessmentQuestion {
  id: string;
  version: string;
  scenario: string;
  context: LoveScenarioCategory;
  sourceDimensions: SourceField[];
  options: [AssessmentOption, AssessmentOption, AssessmentOption];
}

/** LocalStorage 進度資料（key: decision-science-love-assessment-v1）。 */
export interface LoveAssessmentProgress {
  schemaVersion: "3.0.0";
  assessmentVersion: string;
  answers: Record<string, string>;
  currentIndex: number;
  startedAt: string;
  updatedAt: string;
}
