/**
 * LocalStorage 唯一存取層。UI 與計分不得直接觸碰 localStorage。
 * 三重防護：JSON 解析 → 結構驗證 → 版本驗證；任一失敗即清除該 key 並回傳 null。
 * SSR 安全：非瀏覽器環境一律回傳 null／靜默略過。
 * 版本策略：key 版本化；升版時舊 key 直接淘汰不遷移（implementation-decisions.md 4.5）。
 *
 * 3.1.0 起：新增泛型工廠 makeStore()，供感情測驗（lib/love-storage）與
 * 人格底色（lib/core-profile-storage）建立各自隔離的存取器；工作測驗既有匯出
 * （loadResult/saveResult…、getResultSnapshot…）維持不變，key 與行為皆與 3.0.0 相同。
 */

import type { AssessmentProgress } from "@/types/assessment";
import type { AssessmentResult } from "@/types/result";
import { STORAGE_KEY_PROGRESS, STORAGE_KEY_RESULT } from "./constants";
import { isValidProgress, isValidResult } from "./validation";

const isBrowser = (): boolean => typeof window !== "undefined";

function read<T>(key: string, validate: (x: unknown) => x is T): T | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!validate(parsed)) {
      window.localStorage.removeItem(key);
      return null;
    }
    return parsed;
  } catch {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* storage 不可用時靜默降級 */
    }
    return null;
  }
}

function write(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 容量或權限問題時靜默降級：測驗仍可於記憶體中完成 */
  }
  emit();
}

function remove(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* 靜默 */
  }
  emit();
}

/* ── useSyncExternalStore 支援：訂閱與快照（供 client 殼層以無 effect 方式讀取） ── */

type Listener = () => void;
const listeners = new Set<Listener>();
const emit = (): void => listeners.forEach((l) => l());

/** 訂閱本機儲存變化（含本頁寫入與跨分頁 storage 事件）。所有 key 共用同一訂閱。 */
export function subscribeStorage(listener: Listener): () => void {
  listeners.add(listener);
  if (isBrowser()) window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    if (isBrowser()) window.removeEventListener("storage", listener);
  };
}

/** 快照快取：raw 字串不變即回傳同一參考，符合 getSnapshot 穩定性要求。 */
function makeSnapshot<T>(key: string, validate: (x: unknown) => x is T): () => T | null {
  let cache: { raw: string | null; value: T | null } | null = null;
  return () => {
    if (!isBrowser()) return null;
    let raw: string | null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return null;
    }
    if (cache && cache.raw === raw) return cache.value;
    let value: T | null = null;
    if (raw !== null) {
      try {
        const parsed: unknown = JSON.parse(raw);
        if (validate(parsed)) value = parsed;
      } catch {
        value = null; // 損壞資料：快照層保持純函式，僅回傳 null；清除交由 load* 或重寫時處理
      }
    }
    cache = { raw, value };
    return value;
  };
}

/**
 * 泛型存取器工廠：給定 key 與驗證器，產出一組隔離的 load/save/clear/snapshot。
 * 感情測驗、人格底色各自呼叫本工廠建立獨立命名空間，彼此不覆蓋。
 */
export function makeStore<T>(key: string, validate: (x: unknown) => x is T) {
  return {
    load: (): T | null => read(key, validate),
    save: (value: T): void => write(key, value),
    clear: (): void => remove(key),
    getSnapshot: makeSnapshot(key, validate),
  };
}

/* ── 工作測驗存取器（既有，行為與 key 不變） ── */

export const loadProgress = (): AssessmentProgress | null =>
  read(STORAGE_KEY_PROGRESS, isValidProgress);
export const saveProgress = (p: AssessmentProgress): void =>
  write(STORAGE_KEY_PROGRESS, p);
export const clearProgress = (): void => remove(STORAGE_KEY_PROGRESS);

export const loadResult = (): AssessmentResult | null =>
  read(STORAGE_KEY_RESULT, isValidResult);
export const saveResult = (r: AssessmentResult): void =>
  write(STORAGE_KEY_RESULT, r);
export const clearResult = (): void => remove(STORAGE_KEY_RESULT);

export const getResultSnapshot = makeSnapshot(STORAGE_KEY_RESULT, isValidResult);
export const getProgressSnapshot = makeSnapshot(STORAGE_KEY_PROGRESS, isValidProgress);
