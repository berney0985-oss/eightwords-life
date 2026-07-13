/**
 * 作答傾向清晰度（clarity）。
 * 公式：(top1.normalized − top2.normalized) × 100，四捨五入至一位小數。
 * 平手（isTied）時 top1 = top2 → 0。
 * 分帶門檻為 V1 顯示規則（constants.ts，業主裁決之保守版），
 * 尚未依真實作答分布校準；顯示上以文字解釋為主、標籤為次要。
 * 禁止將本值描述為：測驗準確率、結果可信度、人格固定程度、心理計量信度。
 */

import type { Clarity } from "@/types/result";
import { CLARITY_BAND_THRESHOLDS } from "./constants";

export function computeClarity(top1Normalized: number, top2Normalized: number): Clarity {
  const value = Math.round((top1Normalized - top2Normalized) * 1000) / 10;
  const band =
    value < CLARITY_BAND_THRESHOLDS.low
      ? "low"
      : value < CLARITY_BAND_THRESHOLDS.high
        ? "medium"
        : "high";
  return { value, band };
}
