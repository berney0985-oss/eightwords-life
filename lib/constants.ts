/** 全站常數。magic number 一律集中於此。 */

export const SCHEMA_VERSION = "3.0.0" as const;

/**
 * 工作測驗版本。感情測驗使用獨立版本（LOVE_ASSESSMENT_VERSION），
 * 兩者結果與進度存於不同 LocalStorage key，互不覆蓋。
 */
export const ASSESSMENT_VERSION = "1.0.0" as const;

/** 感情測驗版本（與工作隔離；題庫審查通過前為預留值）。 */
export const LOVE_ASSESSMENT_VERSION = "love-1.0.0" as const;

/**
 * LocalStorage keys（版本化，工作／感情／人格底色完全隔離，互不覆蓋）。
 * ⚠ 工作 key 沿用 3.0.0 原名，確保既有使用者結果可讀（不得更名）。
 */
export const STORAGE_KEY_PROGRESS = "decision-science-assessment-v1";
export const STORAGE_KEY_RESULT = "decision-science-result-v1";
export const STORAGE_KEY_LOVE_PROGRESS = "decision-science-love-assessment-v1";
export const STORAGE_KEY_LOVE_RESULT = "decision-science-love-result-v1";
export const STORAGE_KEY_CORE_PROFILE = "decision-science-core-profile-v1";

/** 測驗題數（工作與感情皆 18 題）。 */
export const TOTAL_QUESTIONS = 18;
export const LOVE_TOTAL_QUESTIONS = 18;

/** 統一計分權重：每選項主要人格 +2、次要人格 +1（至多一個次要） */
export const SCORE_PRIMARY = 2;
export const SCORE_SECONDARY = 1;

/**
 * 作答傾向清晰度分帶門檻（V1 顯示規則，業主裁決之保守版）。
 * value < 20 = 低；20 ≤ value < 40 = 中；value ≥ 40 = 高。
 * 方案 A 下 clarity 以約 16.7 為級距，實際語意：
 * 0（完全平分）＝低；16.7（只差一個選項）＝低；
 * 33.3（差兩個選項）＝中；50 以上（差三個以上選項）＝高。
 * 注意：此門檻尚未依真實作答分布校準；未來取得資料後必須重新檢查
 * （docs/implementation-decisions.md）。
 * 結果頁以文字解釋為主，低／中／高標籤為次要資訊。
 */
export const CLARITY_BAND_THRESHOLDS = {
  /** value < low 為低清晰度 */
  low: 20,
  /** low ≤ value < high 為中清晰度；value ≥ high 為高清晰度 */
  high: 40,
} as const;
