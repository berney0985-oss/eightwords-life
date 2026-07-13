/**
 * 服務方案型別。
 * 規則：價格不寫死；CTA 目的地由 site-config 統一管理；
 * 方案三（完整決策藍圖）必須標示人工分析，
 * 禁止「自動生成 / 即時產生 / AI 精準分析」表述。
 */

export type ServiceCtaKind = "start_assessment" | "booking" | "coming_soon";

export interface ServicePlan {
  id: string;
  name: string;
  summary: string;
  bullets: string[];
  /** 例如「人工分析」；無則省略 */
  deliveryNote?: string;
  ctaKind: ServiceCtaKind;
  ctaLabel: string;
}
