/**
 * 人格底色結果的 LocalStorage 存取器（獨立 key，與測驗互不覆蓋）。
 * 注意：LocalStorage 僅用於「暫存最近一次分析結果以便重看」，
 * 不作為付費解鎖狀態來源；付費解鎖不得只存於可竄改的 LocalStorage。
 */

import type { CoreProfileResult } from "@/types/core-profile";
import { makeStore } from "./storage";
import { STORAGE_KEY_CORE_PROFILE } from "./constants";

const isRecord = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null;

/** 輕量結構驗證：版本符合且關鍵欄位存在。 */
export function isValidCoreProfile(x: unknown): x is CoreProfileResult {
  if (!isRecord(x)) return false;
  if (x.schemaVersion !== "1.0.0") return false;
  if (!isRecord(x.pillars)) return false;
  if (!isRecord(x.dataCompleteness)) return false;
  if (!isRecord(x.personaScores)) return false;
  if (!(x.corePersonaId === null || typeof x.corePersonaId === "string")) return false;
  if (typeof x.dayMaster !== "string") return false;
  return true;
}

const store = makeStore<CoreProfileResult>(STORAGE_KEY_CORE_PROFILE, isValidCoreProfile);

export const loadCoreProfile = store.load;
export const saveCoreProfile = store.save;
export const clearCoreProfile = store.clear;
export const getCoreProfileSnapshot = store.getSnapshot;
