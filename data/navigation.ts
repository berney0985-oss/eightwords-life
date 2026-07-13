/** 全站導覽的唯一來源。所有 href 必須對應真實存在的 route（零假連結）。 */

export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/**
 * 分組導覽（供 Header 桌面分組選單與 MobileNavigation 使用，第八階段套用）。
 * 「分析工具」四入口平權；決策引擎為工具，仍列於分析工具組。
 */
export const navGroups: NavGroup[] = [
  {
    label: "分析工具",
    items: [
      { label: "工作分析", href: "/assessment/work" },
      { label: "感情分析", href: "/assessment/love" },
      { label: "科學八字分析", href: "/science-bazi" },
      { label: "決策引擎", href: "/decision-engine" },
    ],
  },
  {
    label: "了解模型",
    items: [
      { label: "九種決策人格", href: "/personas" },
      { label: "三大決策系", href: "/clusters" },
      { label: "分析方法", href: "/methodology" },
      { label: "科學八字模型", href: "/eightwords" },
      { label: "為什麼不是算命？", href: "/why-not-fortune-telling" },
      { label: "案例", href: "/cases" },
      { label: "服務", href: "/services" },
    ],
  },
  {
    label: "品牌",
    items: [
      { label: "品牌故事", href: "/founder" },
      { label: "關於", href: "/about" },
    ],
  },
];

/** 扁平主導覽（現行 Header 使用；第八階段改為分組選單）。 */
export const mainNavigation: NavItem[] = [
  { label: "首頁", href: "/" },
  { label: "工作分析", href: "/assessment/work" },
  { label: "感情分析", href: "/assessment/love" },
  { label: "科學八字分析", href: "/science-bazi" },
  { label: "決策引擎", href: "/decision-engine" },
  { label: "九種決策人格", href: "/personas" },
  { label: "為什麼不是算命？", href: "/why-not-fortune-telling" },
  { label: "品牌故事", href: "/founder" },
];

export const primaryCta: NavItem = { label: "開始免費分析", href: "/assessment" };

export const footerLinks: NavItem[] = [
  { label: "隱私政策", href: "/privacy" },
  { label: "免責聲明", href: "/disclaimer" },
];
