"use client";

/**
 * 本機儲存的 React hooks（useSyncExternalStore）。
 * 回傳三態：undefined＝hydration 中尚未讀取（顯示 skeleton）、
 * null＝無有效資料、物件＝有效資料。
 * 伺服器快照固定 undefined，避免 hydration mismatch。
 */

import { useSyncExternalStore } from "react";
import type { AssessmentResult } from "@/types/result";
import type { AssessmentProgress } from "@/types/assessment";
import type { LoveAssessmentProgress } from "@/types/love-assessment";
import type { CoreProfileResult } from "@/types/core-profile";
import { subscribeStorage, getResultSnapshot, getProgressSnapshot } from "./storage";
import { getLoveResultSnapshot, getLoveProgressSnapshot } from "./love-storage";
import { getCoreProfileSnapshot } from "./core-profile-storage";

const serverSnapshot = (): undefined => undefined;

export function useStoredResult(): AssessmentResult | null | undefined {
  return useSyncExternalStore(subscribeStorage, getResultSnapshot, serverSnapshot);
}

export function useStoredProgress(): AssessmentProgress | null | undefined {
  return useSyncExternalStore(subscribeStorage, getProgressSnapshot, serverSnapshot);
}

export function useStoredLoveResult(): AssessmentResult | null | undefined {
  return useSyncExternalStore(subscribeStorage, getLoveResultSnapshot, serverSnapshot);
}

export function useStoredLoveProgress(): LoveAssessmentProgress | null | undefined {
  return useSyncExternalStore(subscribeStorage, getLoveProgressSnapshot, serverSnapshot);
}

export function useStoredCoreProfile(): CoreProfileResult | null | undefined {
  return useSyncExternalStore(subscribeStorage, getCoreProfileSnapshot, serverSnapshot);
}
