/**
 * 付費產品與定價（唯一來源）。價格不得散落 Component。
 *
 * 定價現況（業主 2026-07-12 定案）：
 * - 工作分析、感情分析：全部免費。
 * - 科學八字分析：免費預覽 → 完整版付費。
 * - 決策引擎：免費基本整理 → 完整分析付費。
 * - 購買／解鎖入口一律導向 LINE 官方帳號（人工承接），日後再接金流。
 * - 金額未定：isPublished=false、price=0、displayPrice="詳詢 LINE"。
 *   元件一律 render displayPrice；定價後改 price/displayPrice/isPublished，不需改元件。
 */

import type { Product } from "@/types/payment";

const UNPRICED = {
  isPublished: false,
  price: 0,
  currency: "TWD",
  displayPrice: "詳詢 LINE",
} as const;

export const products: Product[] = [
  {
    id: "work_assessment_free",
    entry: "work_assessment",
    tier: "free",
    name: "工作分析",
    summary: "了解你在工作情境下的外顯決策模式。",
    ...UNPRICED,
    isPublished: true,
    displayPrice: "免費",
    lockedSections: [],
    ctaKind: "start",
    ctaLabel: "開始工作分析",
  },
  {
    id: "love_assessment_free",
    entry: "love_assessment",
    tier: "free",
    name: "感情分析",
    summary: "了解你在感情情境下的外顯決策模式。",
    ...UNPRICED,
    isPublished: true,
    displayPrice: "免費",
    lockedSections: [],
    ctaKind: "start",
    ctaLabel: "開始感情分析",
  },
  {
    id: "core_profile_preview",
    entry: "core_profile",
    tier: "free",
    name: "科學八字分析（免費預覽）",
    summary: "輸入出生資料，建立人格底色模型的免費摘要。",
    ...UNPRICED,
    isPublished: true,
    displayPrice: "免費預覽",
    lockedSections: [],
    ctaKind: "start",
    ctaLabel: "開始科學八字分析",
  },
  {
    id: "core_profile_full",
    entry: "core_profile",
    tier: "paid",
    name: "科學八字分析（完整版）",
    summary: "完整人格底色與天賦密碼、決策慣性、盲點與修正策略的人工分析。",
    ...UNPRICED,
    lockedSections: [
      "完整人格底色",
      "完整天賦密碼",
      "決策慣性",
      "最大優勢",
      "最大弱點",
      "決策盲點",
      "盲點觸發情境",
      "壓力反應",
      "重複錯誤",
      "修正策略",
      "成長方向",
      "完整人工分析說明",
    ],
    ctaKind: "line",
    ctaLabel: "透過 LINE 解鎖完整版",
  },
  {
    id: "decision_engine_free",
    entry: "decision_engine",
    tier: "free",
    name: "決策引擎（基本整理）",
    summary: "把你正在面對的決策整理成清楚的結構。",
    ...UNPRICED,
    isPublished: true,
    displayPrice: "免費",
    lockedSections: [],
    ctaKind: "start",
    ctaLabel: "開始整理決策",
  },
  {
    id: "decision_engine_full",
    entry: "decision_engine",
    tier: "paid",
    name: "決策引擎（完整分析）",
    summary: "完整選項比較、風險控制與行動順序的決策報告。",
    ...UNPRICED,
    lockedSections: [
      "完整選項比較",
      "沉沒成本",
      "最壞情境",
      "停止條件",
      "風險控制",
      "行動順序",
      "完整決策報告",
    ],
    ctaKind: "line",
    ctaLabel: "透過 LINE 取得完整報告",
  },
  {
    id: "decision_analysis",
    entry: "consulting",
    tier: "paid",
    name: "決策慣性分析",
    summary: "聚焦一個你正在面對的具體問題，拆解它背後的決策結構。",
    ...UNPRICED,
    lockedSections: [],
    ctaKind: "line",
    ctaLabel: "透過 LINE 洽詢",
  },
  {
    id: "decision_consultation",
    entry: "consulting",
    tier: "paid",
    name: "一對一決策諮詢",
    summary: "針對你正在面對的實際選擇，把決策整理成可以行動的結構。",
    ...UNPRICED,
    lockedSections: [],
    ctaKind: "line",
    ctaLabel: "透過 LINE 預約",
  },
];

export const productById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const productsByEntry = (entry: Product["entry"]): Product[] =>
  products.filter((p) => p.entry === entry);
