/**
 * 感情分析計分。共用引擎（lib/assessment-engine），綁定感情題庫與感情版本。
 * 計分規則、平手、clarity 與工作測驗完全一致；結果存於獨立 key，互不覆蓋。
 */

import type { AssessmentResult } from "@/types/result";
import { loveQuestions } from "@/data/love-questions";
import { SCHEMA_VERSION, LOVE_ASSESSMENT_VERSION } from "./constants";
import { scoreWith } from "./assessment-engine";

export function scoreLove(answers: Record<string, string>): AssessmentResult {
  return scoreWith(loveQuestions, answers, {
    schemaVersion: SCHEMA_VERSION,
    assessmentVersion: LOVE_ASSESSMENT_VERSION,
  });
}
