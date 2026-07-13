/**
 * 測驗語境（外顯人格的作答情境）。
 * 工作與感情共用同一套九人格／三系／計分／平手／clarity 引擎，
 * 但題庫、儲存 key、版本、結果語境文案完全隔離。
 *
 * 注意：兩者量到的都是「該情境的外顯決策傾向」，
 * 不得稱為人格底色／完整人格／真正人格／先天人格。
 */
export type AssessmentContext = "work" | "love";

export const ASSESSMENT_CONTEXTS: readonly AssessmentContext[] = ["work", "love"];
