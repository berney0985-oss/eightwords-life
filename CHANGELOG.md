# CHANGELOG

## 3.1.0（2026-07）— 平台化升級

> 資料 Schema 維持 3.0.0；人格底色引擎為獨立 Schema 1.0.0。
> 未破壞 AssessmentResult、九人格/三系 ID、工作題目/計分、工作 LocalStorage key。

### 品牌與資訊架構
- 定位為母品牌平台「科學決策（Decision Science Lab）」，四入口平權：工作分析、感情分析、科學八字分析、決策引擎。
- 首頁改為建立品牌認知的漏斗：Hero（品牌核心句＋標語）→ 四入口 → 為什麼有四種分析 → 科學八字模型 → 案例 → 品牌故事 → 結尾 CTA。
- 新增品牌核心句與定位句（site-config `brandStatement`／`positioning`）。
- 新版 Logo 整合：Header／Footer／Hero（深底）、favicon／apple-icon（DS 徽記，來源圖裁切，未改色/未變形）、OG／Twitter（黑底合成 1200×630）。

### 分析入口
- **工作分析**：既有 18 題測驗定位為工作情境外顯分析；route `/assessment/work`（+results），沿用既有 key，`/results` 永久重導。
- **感情分析**：全新 18 題感情題庫（love-1.0.0），共用九人格/三系/方案 A/平手/clarity，獨立題庫與 key；平衡與敏感情境檢查（validate #43–57）。
- **科學八字分析**：整合純函式人格底色引擎（`lib/core-profile`，Schema 1.0.0）；出生資料表單、四柱/五行/十神/底色摘要、天賦密碼摘要、免費預覽＋付費牆；未知出生時間不偽造 00:00。
- **決策引擎**：規則式決策整理工具（非 AI）；免費結構整理＋付費完整報告牆。

### 商業
- 付費型別與資料（`types/payment.ts`、`types/access.ts`、`data/products.ts`）；誠實鎖定（無 CSS 假遮、無假解鎖、預設 locked）。
- LINE 官方帳號 CTA 啟用（site-config）；價格未定顯示「詳詢 LINE」。
- 服務頁改由 products 呈現（免費分析／完整分析與諮詢）。

### 內容
- 新增 `/founder`（品牌故事，逐字轉錄、零虛構）、`/why-not-fortune-telling`（差異化頁，FAQ JSON-LD）。

### 工程
- 抽出共用計分引擎 `lib/assessment-engine.ts`；驗證器與儲存改為工廠；工作計分 golden 逐位元不變。
- 資料驗證擴充至 57 項（新增 15 項感情題庫）；QA 27 項；lint／build 綠燈。
- SEO：sitemap 收錄新公開頁、robots noindex 四個結果頁、各頁 metadata/canonical、OG/Twitter 圖。
- 新文件：assessment-contexts、core-profile-integration、paywall-limitations、founder-content-sources、love-question-review-pack。

## 3.0.0（2026-07）— 科學決策 V1 正式版

### 品牌與模型
- 品牌定名「科學決策 Decision Science Lab」，核心句「不是預測未來，而是修正決策」
- 確立**底色與外顯雙層模型**：內在模型層（人格底色＋附屬天賦密碼）×行為呈現層（外顯人格），兩層無真假高低之分
- 天賦密碼自獨立概念歸入人格底色附屬模組（talent_archetype → talentBlueprint 更名）
- 外顯人格改由 18 題行為情境測驗獨立判定；人格底色 V1 由人工分析建立、不自動判定
- 81 組交叉分析（底色×外顯）型別預留，內容延至 V2

### Schema
- PersonaProfile 巢狀化：corePersona／talentBlueprint／decisionProfile／riskProfile 四區
- decisionProfile（人格定義層）與 riskProfile（顧問分析層）正式拆分
- AssessmentResult 獨立於 PersonaProfile，新增 isTied／tiedTopPersonas／tieType；expressedPersona 型別為 PersonaId | null
- confidence 概念廢止，改為 clarity（作答傾向清晰度），明確不代表準確率或信度

### 測驗與計分
- V1 題庫 1.0.0 定稿：18 情境×3 選項，九人格各 6 主要位、A/B/C 各 2、每題三系各一，八項平衡由 42 項建置驗證鎖定
- 計分採方案 A（每選項單一主要人格 +2），次要計分延後至有真實資料
- 平手規則：人格原始分 → 決策系總分 → 誠實並列（不以固定順位硬選）
- clarity 門檻採保守版 20／40（未經實證校準，已標註）

### 網站
- Next.js 16 SSG 全站：首頁十一區、3 決策系頁、9 人格頁（六段結構）、方法、科學八字模型、3 模擬案例、4 服務方案、關於／隱私／免責
- 測驗完整流程：續答、改答重算、重測確認、Empty State、損壞資料降級
- LocalStorage 為唯一持久層（版本化 key、三重防護、useSyncExternalStore 訂閱）
- SEO：唯一 title／canonical／sitemap（排除 /results）／robots／自訂 404（含動態 slug）
- 無障礙：radio 語意、進度條 aria、Dialog focus 管理與 Escape、prefers-reduced-motion

### 品質
- 42 項資料驗證掛 prebuild（驗證失敗即擋部署）
- QA 腳本 27 項：平手六案例、LocalStorage 損壞注入 12 案、流程邏輯
- 全套交付文件（README、部署、上線檢查、限制、V2 路線、驗收對照、設定總覽）
