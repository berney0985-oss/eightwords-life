/**
 * 服務方案資料。文案層級：C 品牌原創（項目名稱與內容依專案指令書第二十一節）。
 * 規則：價格不寫死；方案三標示人工分析；CTA 目的地由 site-config 管理。
 */

import type { ServicePlan } from "@/types/service";

export const services: ServicePlan[] = [
  {
    id: "service_free_assessment",
    name: "免費外顯決策風格測驗",
    summary: "從 18 個行為情境開始，看見你目前呈現的決策方式。",
    bullets: [
      "初步辨識目前呈現的決策風格",
      "看見主要人格傾向與基礎盲點",
    ],
    ctaKind: "start_assessment",
    ctaLabel: "開始測驗",
  },
  {
    id: "service_habit_analysis",
    name: "決策慣性分析",
    summary: "聚焦一個你正在面對的具體問題，拆解它背後的決策結構。",
    bullets: [
      "目前情境",
      "決策慣性",
      "盲點觸發",
      "重複錯誤",
      "修正策略",
    ],
    ctaKind: "booking",
    ctaLabel: "預約了解",
  },
  {
    id: "service_full_blueprint",
    name: "完整決策藍圖",
    summary: "從人格底色到具體情境的完整分析。",
    bullets: [
      "人格底色",
      "外顯人格",
      "核心需求",
      "思考模式",
      "行動模式",
      "決策慣性",
      "職涯情境",
      "感情情境",
      "金錢情境",
      "個人修正策略",
    ],
    deliveryNote: "人工分析",
    ctaKind: "booking",
    ctaLabel: "預約了解",
  },
  {
    id: "service_consulting",
    name: "一對一決策諮詢",
    summary: "針對你正在面對的實際選擇，把決策整理成可以行動的結構。",
    bullets: [
      "決策目標",
      "選項",
      "可用資訊",
      "代價",
      "風險",
      "可逆性",
      "行動順序",
      "停止條件",
    ],
    ctaKind: "booking",
    ctaLabel: "預約了解",
  },
];
