/**
 * 存取狀態（V1，無後端）。
 * 一律回傳 "locked"：付費內容不預先產生、不預先送到瀏覽器，
 * 解鎖交由 LINE 人工承接。不得以純前端切換為 unlocked。
 */

import type { AccessStatus } from "@/types/access";

export function accessStatusFor(productId: string): AccessStatus {
  void productId; // V1：不依產品區分，一律 locked（保留參數供未來後端授權）
  return "locked";
}
