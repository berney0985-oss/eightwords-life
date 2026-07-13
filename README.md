# 科學決策 Decision Science Lab

**修正現在，比預測未來更重要。**

科學決策是一個決策分析平台。透過四個入口——工作分析、感情分析、科學八字分析、決策引擎——
幫助人理解自己的決策模式、看見盲點、修正下一次選擇。網站版本 **3.1.0**（資料 Schema 維持 3.0.0）。

## 平台結構（3.1.0）

```
科學決策（平台）
├── 工作分析      /assessment/work      工作情境外顯決策傾向（既有 18 題）
├── 感情分析      /assessment/love      感情情境外顯決策傾向（新 18 題，love-1.0.0）
├── 科學八字分析   /science-bazi         人格底色模型（純函式引擎，Schema 1.0.0）＋天賦密碼
└── 決策引擎      /decision-engine      規則式決策整理工具（非 AI）
```

模型：人格底色（＋天賦密碼）為內在層；外顯人格（工作／感情情境）為呈現層。兩層無真假高低。
科學八字＝平台核心模型，不預測未來、不做流年、不論吉凶（見 `/why-not-fortune-telling`）。
新文件：`docs/assessment-contexts.md`、`docs/core-profile-integration.md`、`docs/paywall-limitations.md`、
`docs/founder-content-sources.md`、`docs/love-question-review-pack.md`。

## 品牌架構

```
內在模型層
  人格底色（為什麼這樣做決策）
  └── 天賦密碼（人格底色的自然價值創造方式，附屬模組）

行為呈現層
  外顯人格（目前通常如何呈現決策，由行為情境測驗判定）

人格底色 × 外顯人格 → 交叉分析（V2，81 組，型別已預留）
```

兩層沒有真假之分、沒有高低之分。V1 測驗只判定外顯人格；人格底色由人工分析建立。

## V1 功能

首頁（十一區）、三大決策系（總覽＋3 詳頁）、九種決策人格（總覽＋9 詳頁）、外顯決策風格測驗（18 題）、結果頁（含平手處理）、分析方法、科學八字模型、模擬案例（3 案）、服務方案（4 案）、關於、隱私、免責。

## V1 不包含

會員、資料庫、付款、AI API、自動排盤、人格底色自動判定、81 種交叉分析。

## 技術架構

Next.js 16（App Router、SSG）／React 19／TypeScript／Tailwind CSS 4／LocalStorage（唯一持久層）／Vercel（建議部署平台）。無後端、無資料庫、無第三方追蹤。

## 環境需求

- Node.js ≥ 20（開發環境使用 v22.22.2）
- npm ≥ 10

## 安裝與啟動

```bash
npm install        # 安裝
npm run dev        # 本機開發 http://localhost:3000
```

## 驗證指令

```bash
npm run validate           # 42 項資料驗證（prebuild 自動執行）
npx tsx scripts/phase7/tests.ts   # QA 腳本：平手 6 案例＋損壞注入 12 案＋流程邏輯（27 項）
npm run lint               # ESLint
npm run build              # 正式建置（含 validate 與 TypeScript 檢查）
```

## 環境變數

| 變數 | 說明 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 網站正式網址（例：`https://example.com`）。**正式部署前必填。** 未設定時 fallback 為 `http://localhost:3000`——僅供本機開發；**正式網站不得使用 localhost canonical**，否則 SEO（canonical／sitemap／Open Graph）全部錯誤 |

## 資料檔位置

| 內容 | 檔案 |
|---|---|
| 三大決策系 | `data/clusters.ts`（規格原文轉錄，勿改寫） |
| 九種決策人格 | `data/personas.ts`（規格原文轉錄，勿改寫） |
| 測驗題庫 | `data/questions.ts`（業主裁決定稿 1.0.0） |
| 模擬案例 | `data/cases.ts` |
| 服務方案 | `data/services.ts` |
| 站台設定 | `data/site-config.ts`（品牌名、社群、預約、法律日期） |
| 導覽 | `data/navigation.ts` |
| 名詞表 | `data/glossary.ts` |

## 如何修改常見內容（非工程背景適用）

| 想改什麼 | 去哪裡改 | 備註 |
|---|---|---|
| 品牌名稱／標語 | `data/site-config.ts` → `name`／`tagline` | 改後需重新 build |
| Instagram／LINE 連結 | `site-config.ts` → `social.*`（`enabled: true` ＋ `url`） | 未啟用不會顯示，零假連結 |
| 預約連結 | `site-config.ts` → `booking` | 啟用後服務頁 CTA 自動變為外連 |
| 隱私頁更新日期 | `site-config.ts` → `legal.privacyLastUpdated` | 上線前必確認 |
| 關於頁維護者敘述 | `site-config.ts` → `about.maintainerStatement` | 改為團隊時單點更新 |
| 服務方案文案 | `data/services.ts` | 不得加入未實作功能的承諾 |
| 案例文案 | `data/cases.ts` | 必須維持「模擬案例」標示 |
| 各頁 SEO | 各 `app/**/page.tsx` 的 `metadata` | 動態頁在 `generateMetadata` |
| 人格資料 | `data/personas.ts` | ⚠️ 為規格原文轉錄——修改前先更新規格文件並提升版本 |
| 題目 | `data/questions.ts` | ⚠️ 任何修改會破壞平衡保證，見下 |

## ⚠️ 不可隨意修改

以下項目牽動計分正確性與舊資料相容性，修改前必須完整評估並提升版本：

- **persona ID／cluster ID**（`types/persona.ts`、`types/cluster.ts`）：全站與 LocalStorage 結果引用
- **Schema 版本／測驗版本**（`lib/constants.ts`）：改變會使所有使用者本機舊資料失效（設計如此，不遷移）
- **計分規則**（`lib/scoring.ts`）：方案 A 為業主裁決，每選項恰一個主要人格 +2
- **十神→人格對應**（personas.ts `baziSource`）：系統公理
- **題庫權重與配置**：九人格各 6 主要位、A/B/C 各 2、每題三系各一等八項平衡由驗證 #28–40 鎖定，任意改動會使 build 失敗（這是保護，不是 bug）

## LocalStorage 行為

| Key | 內容 | 生命週期 |
|---|---|---|
| `decision-science-assessment-v1` | 工作分析作答進度 | 完成時清除 |
| `decision-science-result-v1` | 工作分析結果 | 重新分析（經確認）時清除 |
| `decision-science-love-assessment-v1` | 感情分析作答進度 | 完成時清除 |
| `decision-science-love-result-v1` | 感情分析結果 | 重新分析（經確認）時清除 |
| `decision-science-core-profile-v1` | 科學八字分析結果暫存 | 重新分析時覆寫（非付費解鎖來源） |

- 資料只存在使用者裝置的瀏覽器，**不上傳任何伺服器**
- 清除瀏覽器資料／換裝置／無痕模式 → 進度與結果消失且無法復原
- 版本不相容或資料損壞 → 三重防護（JSON→結構→版本）自動清除該 key、UI 安全降級為空狀態，不崩潰

## 平手結果

- `AssessmentResult.expressedPersona` 型別為 `PersonaId | null`
- 平手判定：①人格原始分 → ②所屬決策系總分 → 仍平手則 `isTied=true`、`expressedPersona=null`、`tiedTopPersonas` 保存並列人格
- 結果頁顯示並列人格卡與說明；**程式中不存在、也不得加入「固定人格順位硬選一張」的邏輯**——那會系統性偏向排序靠前的人格

## 已知限制

見 `docs/known-limitations.md`（20 項，含使用者影響與改善方向）。

## 部署與上線

- 部署步驟：`docs/deployment.md`
- 上線前檢查：`docs/pre-launch-checklist.md`（含**部署後強制人工驗證**項目）

## V2 路線

見 `docs/v2-roadmap.md`（四組優先序：資料與驗證 → 人格底色 → 交叉分析 → 商業功能）。

## 其他文件

`docs/configuration.md`（設定總覽）、`docs/final-acceptance.md`（驗收對照）、`docs/implementation-decisions.md`（全部工程決策與業主裁決紀錄）、`docs/content-source-map.md`（規格逐欄對照）、`docs/copy-levels.md`（文案層級）、`docs/data-issues.md`（原文問題清單）、`CHANGELOG.md`。
