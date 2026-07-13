/**
 * 感情分析的 LocalStorage 存取器（獨立命名空間，與工作互不覆蓋）。
 * 使用共用工廠 makeStore ＋ 感情版本驗證器。
 */

import type { AssessmentResult } from "@/types/result";
import type { LoveAssessmentProgress } from "@/types/love-assessment";
import { makeStore } from "./storage";
import { makeProgressValidator, makeResultValidator } from "./validation";
import {
  STORAGE_KEY_LOVE_PROGRESS,
  STORAGE_KEY_LOVE_RESULT,
  LOVE_ASSESSMENT_VERSION,
  LOVE_TOTAL_QUESTIONS,
} from "./constants";

const progressStore = makeStore<LoveAssessmentProgress>(
  STORAGE_KEY_LOVE_PROGRESS,
  makeProgressValidator(LOVE_ASSESSMENT_VERSION, LOVE_TOTAL_QUESTIONS) as (
    x: unknown,
  ) => x is LoveAssessmentProgress,
);

const resultStore = makeStore<AssessmentResult>(
  STORAGE_KEY_LOVE_RESULT,
  makeResultValidator(LOVE_ASSESSMENT_VERSION, LOVE_TOTAL_QUESTIONS),
);

export const loadLoveProgress = progressStore.load;
export const saveLoveProgress = progressStore.save;
export const clearLoveProgress = progressStore.clear;
export const getLoveProgressSnapshot = progressStore.getSnapshot;

export const loadLoveResult = resultStore.load;
export const saveLoveResult = resultStore.save;
export const clearLoveResult = resultStore.clear;
export const getLoveResultSnapshot = resultStore.getSnapshot;
