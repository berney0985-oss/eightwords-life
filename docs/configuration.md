# 設定總覽

「舊結果失效」＝使用者瀏覽器內既有測驗結果／進度會被判定為版本不符而清除（設計行為，不遷移）。所有變更皆需重新 build（本專案為靜態站）。

| 設定 | 檔案位置 | 欄位 | 用途 | 修改風險 | 需重 build | 舊結果失效 |
|---|---|---|---|---|---|---|
| 網站名稱 | data/site-config.ts | name／shortName | 全站標題、Header、OG | 低 | 是 | 否 |
| 網站描述 | data/site-config.ts | description | 預設 meta description | 低 | 是 | 否 |
| 品牌核心句 | data/site-config.ts | tagline | Hero／Footer | 低（不得改為預測語） | 是 | 否 |
| Base URL | 環境變數 NEXT_PUBLIC_SITE_URL | — | canonical／sitemap／OG | **高**：未設＝localhost canonical | 是（Vercel 重部署） | 否 |
| 社群連結 | data/site-config.ts | social.instagram／line 等（enabled＋url） | Footer 連結 | 低；enabled=false 即隱藏，禁填假連結 | 是 | 否 |
| 預約連結 | data/site-config.ts | booking.enabled／url | 服務頁 CTA | 中：啟用前確認外部服務可用 | 是 | 否 |
| 聯絡 Email | data/site-config.ts | contact.email | 頁尾／關於 | 低 | 是 | 否 |
| 隱私更新日期 | data/site-config.ts | legal.privacyLastUpdated | 隱私頁 | 低；上線檢查必項 | 是 | 否 |
| 維護者敘述 | data/site-config.ts | about.maintainerStatement | 關於頁 | 低；不得虛構資格 | 是 | 否 |
| clarity 門檻 | lib/constants.ts | CLARITY_BAND_THRESHOLDS | 低/中/高分帶 | **高**：業主裁決值；改動需同步結果頁文案與決策紀錄 | 是 | 否（僅顯示層） |
| 測驗版本 | lib/constants.ts | ASSESSMENT_VERSION | 題庫版本戳記 | **高**：升版＝所有舊進度／結果失效 | 是 | **是** |
| Schema 版本 | lib/constants.ts | SCHEMA_VERSION | 結果結構版本 | **高**：同上 | 是 | **是** |
| LocalStorage keys | lib/constants.ts | STORAGE_KEY_PROGRESS／RESULT | 本機儲存鍵名 | **高**：改名＝舊資料變孤兒 | 是 | **是** |
| 導覽項目 | data/navigation.ts | mainNavigation／footerNavigation | Header／Footer | 中：href 必須為既有 route | 是 | 否 |
| 服務方案 | data/services.ts | services[] | 服務頁／首頁第十區 | 中：禁未實作承諾；方案三保留人工分析標示 | 是 | 否 |
| 案例 | data/cases.ts | cases[] | 案例頁／首頁第九區 | 中：必須維持模擬標示與「視角之一」表述 | 是 | 否 |
| 人格／決策系資料 | data/personas.ts、clusters.ts | — | 全站內容核心 | **極高**：規格原文轉錄；先改規格、記錄版本，且 ID 不可動 | 是 | ID 變動＝是 |
| 題庫 | data/questions.ts | questions[] | 測驗 | **極高**：平衡由驗證 #28–40 鎖定；任何實質變更應升 ASSESSMENT_VERSION | 是 | 升版＝是 |
