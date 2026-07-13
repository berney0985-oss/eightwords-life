/**
 * LocalStorage 資料的執行期結構驗證。
 * 任何欄位缺失、型別錯誤或版本不符 → 視為無效，由 storage 層清除並降級。
 *
 * 3.1.0 起：驗證器改為工廠，工作／感情共用同一套結構檢查，只在
 * assessmentVersion 與題數上限（totalQuestions）不同。工作測驗驗證行為不變
 *（isValidProgress / isValidResult 綁定工作版本與 18 題，與原邏輯逐條一致）。
 */

import type { AssessmentProgress } from "@/types/assessment";
import type { AssessmentResult, TieType } from "@/types/result";
import { PERSONA_IDS } from "@/types/persona";
import { CLUSTER_IDS } from "@/types/cluster";
import { SCHEMA_VERSION, ASSESSMENT_VERSION, TOTAL_QUESTIONS } from "./constants";

const isRecord = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null;

const isPersonaId = (x: unknown): boolean =>
  typeof x === "string" && (PERSONA_IDS as readonly string[]).includes(x);

const isClusterId = (x: unknown): boolean =>
  typeof x === "string" && (CLUSTER_IDS as readonly string[]).includes(x);

const isScorePair = (x: unknown): boolean =>
  isRecord(x) && typeof x.raw === "number" && typeof x.normalized === "number";

const TIE_TYPES: TieType[] = ["none", "persona_tie", "cluster_tie", "full_tie"];

/** 進度驗證器工廠：綁定 assessmentVersion 與題數上限。 */
export function makeProgressValidator(assessmentVersion: string, totalQuestions: number) {
  return (x: unknown): x is AssessmentProgress => {
    if (!isRecord(x)) return false;
    if (x.schemaVersion !== SCHEMA_VERSION) return false;
    if (x.assessmentVersion !== assessmentVersion) return false;
    if (!isRecord(x.answers)) return false;
    if (!Object.values(x.answers).every((v) => typeof v === "string")) return false;
    if (typeof x.currentIndex !== "number" || !Number.isInteger(x.currentIndex)) return false;
    if (x.currentIndex < 0 || x.currentIndex > totalQuestions - 1) return false;
    if (typeof x.startedAt !== "string" || typeof x.updatedAt !== "string") return false;
    return true;
  };
}

/** 結果驗證器工廠：綁定 assessmentVersion 與題數上限（answerCount 上限）。 */
export function makeResultValidator(assessmentVersion: string, totalQuestions: number) {
  return (x: unknown): x is AssessmentResult => {
    if (!isRecord(x)) return false;
    if (x.schemaVersion !== SCHEMA_VERSION) return false;
    if (x.assessmentVersion !== assessmentVersion) return false;
    if (typeof x.completedAt !== "string") return false;
    if (!(x.expressedPersona === null || isPersonaId(x.expressedPersona))) return false;
    if (!(x.secondaryPersona === null || isPersonaId(x.secondaryPersona))) return false;
    if (!Array.isArray(x.topPersonas) || !x.topPersonas.every(isPersonaId)) return false;
    if (!(x.primaryCluster === null || isClusterId(x.primaryCluster))) return false;
    if (!isRecord(x.personaScores)) return false;
    for (const pid of PERSONA_IDS) {
      if (!isScorePair((x.personaScores as Record<string, unknown>)[pid])) return false;
    }
    if (!isRecord(x.clusterScores)) return false;
    for (const cid of CLUSTER_IDS) {
      if (!isScorePair((x.clusterScores as Record<string, unknown>)[cid])) return false;
    }
    if (!isRecord(x.clarity)) return false;
    const clarity = x.clarity as Record<string, unknown>;
    if (typeof clarity.value !== "number" || clarity.value < 0 || clarity.value > 100) return false;
    if (!["low", "medium", "high"].includes(clarity.band as string)) return false;
    if (typeof x.answerCount !== "number" || x.answerCount < 0 || x.answerCount > totalQuestions) return false;
    if (typeof x.isTied !== "boolean") return false;
    if (!Array.isArray(x.tiedTopPersonas) || !x.tiedTopPersonas.every(isPersonaId)) return false;
    if (!TIE_TYPES.includes(x.tieType as TieType)) return false;
    // 一致性：非平手必須有唯一人格；平手不得有唯一人格，且並列名單 ≥2
    if (x.isTied && (x.expressedPersona !== null || x.tiedTopPersonas.length < 2)) return false;
    if (!x.isTied && (x.expressedPersona === null || x.tiedTopPersonas.length !== 0)) return false;
    return true;
  };
}

/** 工作測驗驗證器（綁定工作版本與 18 題；行為與 3.0.0 完全一致）。 */
export const isValidProgress = makeProgressValidator(ASSESSMENT_VERSION, TOTAL_QUESTIONS);
export const isValidResult = makeResultValidator(ASSESSMENT_VERSION, TOTAL_QUESTIONS);
