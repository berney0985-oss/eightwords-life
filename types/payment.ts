/**
 * 付費產品型別。價格集中於 data/products.ts，不得散落 Component。
 *
 * 誠信限制（業主裁決十三・十八）：無後端時——
 * - 不得把完整付費內容預先送到瀏覽器再用 CSS 遮蔽；付費內容根本不產生／不輸出。
 * - 不得將解鎖狀態只存於可竄改的 LocalStorage；正式環境預設 locked。
 * - 不得建立假的付款成功流程；購買入口導向人工承接（LINE 官方）。
 */

/** 四個入口與人工顧問服務對應的產品類別。 */
export type ProductEntry =
  | "work_assessment"
  | "love_assessment"
  | "core_profile"
  | "decision_engine"
  | "consulting";

/** 產品定價層級。 */
export type ProductTier = "free" | "paid";

/**
 * CTA 目的地種類。實際網址一律由 site-config 控制（零假連結）。
 * - start：站內開始免費功能
 * - line：導向 LINE 官方帳號（人工承接購買／解鎖）
 * - booking：導向預約表單（若啟用）
 */
export type ProductCtaKind = "start" | "line" | "booking";

export interface Product {
  /** 例 core_profile_full */
  id: string;
  entry: ProductEntry;
  tier: ProductTier;
  name: string;
  summary: string;
  /** 是否已對外公布正式金額；false 時只顯示 displayPrice。 */
  isPublished: boolean;
  /** 數值價格（未定價時為 0，不用 null，避免元件散落 null 判斷）。 */
  price: number;
  currency: "TWD";
  /** 永遠可直接 render 的字串（未定價時為「詳詢 LINE」）。 */
  displayPrice: string;
  /** 付費產品的鎖定內容清單（免費產品為空陣列）。 */
  lockedSections: string[];
  ctaKind: ProductCtaKind;
  ctaLabel: string;
}
