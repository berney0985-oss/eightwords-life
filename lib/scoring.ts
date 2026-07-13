/**
 * 工作測驗計分（方案 A，業主裁決定稿）。
 *
 * 3.1.0 起：計分邏輯抽入共用引擎 lib/assessment-engine.ts（工作／感情共用），
 * 本檔僅將工作題庫（data/questions）與工作版本綁定至引擎，對外匯出維持不變：
 *   - scoreAssessment(answers) → 工作測驗結果
 *   - theoreticalMaxima()      → 工作題庫理論最高分
 * 既有匯入者（AssessmentShell、validate-data、phase7 tests）不受影響，
 * 工作測驗計分輸出逐位元不變。
 *
 * 計分規則（不變）：每選項僅一個主要人格 +SCORE_PRIMARY；無次要計分；
 * clusterScores 由 personaScores 與 persona.clusterId 彙總；
 * 平手：①人格原始分 → ②決策系總分 → 仍平手則 isTied=true、expressedPersona=null。
 */

import type { AssessmentResult } from "@/types/result";
import type { PersonaId } from "@/types/persona";
import type { ClusterId } from "@/types/cluster";
import { questions } from "@/data/questions";
import { SCHEMA_VERSION, ASSESSMENT_VERSION } from "./constants";
import { scoreWith, theoreticalMaximaOf } from "./assessment-engine";

/** 由工作題庫計算理論最高分（人格 12／決策系 36）。 */
export function theoreticalMaxima(): {
  persona: Record<PersonaId, number>;
  cluster: Record<ClusterId, number>;
} {
  return theoreticalMaximaOf(questions);
}

/**
 * 依作答計算工作測驗結果。
 * @param answers questionId → optionId（以最終答案為準；修改答案後重新計分）
 */
export function scoreAssessment(answers: Record<string, string>): AssessmentResult {
  return scoreWith(questions, answers, {
    schemaVersion: SCHEMA_VERSION,
    assessmentVersion: ASSESSMENT_VERSION,
  });
}
