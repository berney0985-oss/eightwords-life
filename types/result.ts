/**
 * 測驗結果型別。
 * AssessmentResult 獨立存在（LocalStorage key: decision-science-result-v1）；
 * expressedPersona 是使用者測驗結果，不得放入 PersonaProfile。
 *
 * 平手規則（業主裁決）：
 * 第一層比較人格原始分；第二層比較所屬決策系總分；
 * 若仍平手，不得以固定人格順位偽造唯一結果——
 * isTied = true、expressedPersona = null、tiedTopPersonas 保存所有並列人格。
 */

import type { PersonaId } from "./persona";
import type { ClusterId } from "./cluster";

export interface ScorePair {
  raw: number;
  /** raw ÷ 理論最高分（人格 12／決策系 36），0–1 */
  normalized: number;
}

/**
 * 作答傾向清晰度。
 * 只表示本次作答中最高傾向與第二傾向的分數差距。
 * 不代表：測驗準確率、結果可信度、人格固定程度、心理計量信度。
 * band 門檻為 V1 顯示規則（lib/constants.ts），尚未依真實作答分布校準。
 */
export interface Clarity {
  /** (top1.normalized − top2.normalized) × 100；平手時為 0 */
  value: number;
  band: "low" | "medium" | "high";
}

export type TieType = "none" | "persona_tie" | "cluster_tie" | "full_tie";

export interface AssessmentResult {
  schemaVersion: "3.0.0";
  assessmentVersion: "1.0.0";
  completedAt: string;
  /** 平手且無法由決策系分數合理區分時為 null，不得偽造唯一結果 */
  expressedPersona: PersonaId | null;
  /** 平手時為 null */
  secondaryPersona: PersonaId | null;
  /** 前三名（僅供顯示；並列時的排列順序不代表判定） */
  topPersonas: PersonaId[];
  primaryCluster: ClusterId | null;
  personaScores: Record<PersonaId, ScorePair>;
  clusterScores: Record<ClusterId, ScorePair>;
  clarity: Clarity;
  answerCount: number;
  isTied: boolean;
  /** isTied 時保存所有並列最高人格；否則為空陣列 */
  tiedTopPersonas: PersonaId[];
  tieType: TieType;
}
