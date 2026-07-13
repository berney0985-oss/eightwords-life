/**
 * 解鎖／存取狀態型別。
 *
 * V1（無後端）：正式環境一律 "locked"。不得聲稱已有安全自動解鎖。
 * 未來接上後端與金流後，才會由伺服器授權切換為 "unlocked"。
 * 本型別刻意不提供任何純前端把 locked 改 unlocked 的路徑。
 */

export type AccessStatus = "locked" | "unlocked";

export interface LockedSectionMeta {
  /** 對應付費內容的識別碼 */
  id: string;
  title: string;
  /** 一句話說明鎖定內容是什麼（不得預先載入實際內容） */
  teaser: string;
}

export interface ProductAccess {
  productId: string;
  /** V1 恆為 locked（來源：預設值，非可竄改的 LocalStorage）。 */
  status: AccessStatus;
}
