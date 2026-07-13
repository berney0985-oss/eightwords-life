/**
 * 人格底色 × 外顯人格 交叉分析型別（V2 預留，V1 不實作）。
 *
 * 現在就定義型別的原因：避免 V2 導入 81 種組合時再做一次 breaking change。
 * V1 全站不得 import 本檔於任何執行路徑；不得以此偽造交叉分析結果。
 *
 * 職責邊界（3.0.0 架構）：
 * 交叉分析不「產生」決策慣性——基礎慣性、盲點、修正策略屬於九種人格
 * 定義本身（DecisionProfile / RiskProfile）。本層只分析：
 * 一致與差異、強化效應、內外衝突、優勢組合、個人化情境盲點、
 * 個人化修正策略。
 */

import type { PersonaId } from "./persona";

/** 底色與外顯的一致性型態 */
export type AlignmentType =
  /** 同一人格：強化效應為主 */
  | "identical"
  /** 同決策系不同人格：策略相近、手段不同 */
  | "same_cluster"
  /** 跨決策系：內外拉扯可能較明顯 */
  | "cross_cluster";

export type ConflictLevel = "low" | "medium" | "high";

export interface PersonaCombinationProfile {
  schemaVersion: string;
  /** combo_{core}_{expressed}，依規格 §6.1 */
  id: `combo_${string}_${string}`;
  corePersonaId: PersonaId;
  expressedPersonaId: PersonaId;
  alignmentType: AlignmentType;
  conflictLevel: ConflictLevel;
  /** 優勢組合 */
  combinedStrengths: string[];
  /** 個人化情境盲點（區別於 RiskProfile 的基礎盲點） */
  combinedBlindspots: string[];
  /** 個人化修正策略，與 combinedBlindspots 對應 */
  combinedStrategies: string[];
}
