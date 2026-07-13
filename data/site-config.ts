/**
 * 全站品牌設定與外部連結的唯一來源。
 * 規則：
 * - 網址一律由 NEXT_PUBLIC_SITE_URL 環境變數取得，本機 fallback localhost:3000。
 * - 社群連結與聯絡方式以 enabled 開關控制顯示；未啟用時不得建立假連結
 *   （禁止 #、javascript:void(0)、example.com）。
 */

export interface ExternalLink {
  enabled: boolean;
  /** 僅在 enabled 為 true 時使用；未啟用時保持空字串 */
  url: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  englishName: string;
  tagline: string;
  taglineSecondary: string;
  /** 品牌核心句（首頁 Hero／About／OG） */
  brandStatement: string;
  /** 定位句：與一般命理網站區隔（首頁 Hero／About） */
  positioning: string;
  description: string;
  url: string;
  socialLinks: {
    instagram: ExternalLink;
    line: ExternalLink;
  };
  contact: {
    email: { enabled: boolean; address: string };
  };
  booking: ExternalLink;
  legal: {
    /** 顯示於隱私政策頁；正式部署前列入上線檢查清單 */
    privacyLastUpdated: string;
  };
  about: {
    /** 關於頁維護者聲明；未來改為團隊維護時單點更新 */
    maintainerStatement: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "科學決策",
  englishName: "DECISION SCIENCE LAB",
  tagline: "不是預測未來，而是修正決策",
  taglineSecondary: "修正現在，比預測未來更重要",
  brandStatement:
    "科學決策不是告訴你未來，而是幫助你理解自己為什麼會做出現在的選擇。",
  positioning: "不是預測未來，而是理解你如何做決定。",
  description:
    "科學決策是一個決策分析平台。從工作、感情、科學八字到決策工具，幫助你理解自己的決策模式。不是預測未來，而是修正決策。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  socialLinks: {
    instagram: { enabled: false, url: "", label: "Instagram" },
    line: {
      enabled: true,
      url: "https://line.me/R/ti/p/~smilemusic1116",
      label: "LINE",
    },
  },
  contact: {
    email: { enabled: false, address: "" },
  },
  booking: {
    enabled: true,
    url: "https://line.me/R/ti/p/~smilemusic1116",
    label: "透過 LINE 洽詢",
  },
  legal: {
    privacyLastUpdated: "2026 年 7 月",
  },
  about: {
    maintainerStatement:
      "科學決策由創辦人以系統設計者與決策分析顧問角色，獨立開發與維護。",
  },
};
