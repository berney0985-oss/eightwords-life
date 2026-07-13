# 科學決策 Decision Science Lab — 最終交付（v3.1.0，第三～九階段）

> 一次交付。全程未觸發停止條件（未破壞工作分析、AssessmentResult、Schema、工作 key、九人格、三大系）。

---

## 1. 完整修改摘要

把單一工作測驗網站升級為母品牌平台「科學決策」，四入口平權：**工作分析、感情分析、科學八字分析、決策引擎**，外加品牌故事頁、差異化頁、Logo 品牌系統、誠實付費牆與 LINE 轉換入口。

- **第三/四階段**：新建 18 題感情題庫（love-1.0.0），共用九人格/三系/方案 A/平手/clarity 引擎，獨立題庫與 LocalStorage key；15 項平衡與敏感情境驗證全過；感情測驗與結果頁上線。
- **第五階段**：整合純函式人格底色引擎（`lib/core-profile`，Schema 1.0.0）；出生資料表單、四柱/五行/十神/底色/天賦密碼摘要、免費預覽＋付費牆；未知出生時間不偽造 00:00。
- **第六階段**：決策引擎（規則式決策整理工具，非 AI）；免費結構整理＋付費完整報告牆。
- **第七階段**：付費型別/資料（products/access/payment）、通用付費牆、服務頁改由 products 呈現、LINE CTA 啟用、存取預設 locked。
- **第八階段**：Logo 全站套用（Header/Footer/Hero/favicon/apple-icon/OG/Twitter）、首頁四入口平權漏斗、品牌核心句、SEO/metadata/sitemap/robots。
- **第九階段**：文件、驗證擴充、回歸、QA、build、部署檢查。

版本：網站 **3.1.0**；資料 Schema **3.0.0**（未變）；感情 **love-1.0.0**；人格底色 **1.0.0**。

## 2. 新增檔案（65 個）

- **路由**：`app/assessment/work/(page,results)`、`app/assessment/love/(page,results)`、`app/science-bazi/(page,results)`、`app/decision-engine/page`、`app/founder/page`、`app/why-not-fortune-telling/page`、`app/icon.png`、`app/apple-icon.png`。
- **型別**：`types/assessment-context`、`types/love-assessment`、`types/core-profile`、`types/payment`、`types/access`、`types/decision-engine`。
- **邏輯**：`lib/assessment-engine`、`lib/love-scoring`、`lib/love-storage`、`lib/core-profile/*`（10 檔）、`lib/core-profile-storage`、`lib/decision-engine`、`lib/cta`、`lib/access`。
- **資料**：`data/love-questions`、`data/products`、`data/founder`。
- **元件**：`components/brand/Logo`、`components/assessment/LoveAssessmentShell`、`components/results/LoveResultsShell`、`components/core-profile/*`（10 檔）、`components/decision-engine/DecisionEngineTool`、`components/paywall/Paywall`、`components/home/{EntriesSection,WhyFourSection,FounderTeaser}`、`components/common/PreparingNotice`。
- **品牌資產**：`public/brand/{logo.png,logo-source.jpg,emblem.png,og.png}`。
- **文件**：`docs/{assessment-contexts,core-profile-integration,paywall-limitations,founder-content-sources,love-question-review-pack}.md`。

## 3. 修改檔案（22 個）

`CHANGELOG`、`README`、`app/{page,layout,assessment/page,results/page,services/page,robots,sitemap}`、
`components/assessment/{AssessmentShell,QuestionCard}`、`components/home/HeroSection`、`components/layout/{Header,Footer}`、
`data/{navigation,site-config}`、`lib/{constants,scoring,storage,use-storage,validation}`、`package.json`、`scripts/validate-data.ts`。

> 工作分析語意/計分未改；`scoring.ts` 僅委派給共用引擎；`storage/validation` 改為工廠但工作匯出與行為不變；
> `AssessmentShell` 僅改完成後導向（`/results`→`/assessment/work/results`）；`QuestionCard` 型別放寬為結構相容。

## 4. QA Report

- `scripts/phase7/tests.ts`：**27／27 通過**（完成/續答/改答重算/重測/Empty/損壞降級/快照穩定性）。工作流程邏輯未變。
- 感情計分煙霧（validate #57）＋工作計分煙霧（#41–42）通過。
- 人格底色引擎進站煙霧：原 fixtures **12／12**（四柱、日主、corePersonaId）。

## 5. Regression Report

- **工作計分 golden 逐位元不變**：重構前擷取 6 組作答輸出，經引擎重構/儲存工廠/驗證工廠/型別放寬後多次比對，**完全相同**（GOLDEN MATCH）。
- 九人格 ID、三系 ID、`AssessmentResult` 型別、schemaVersion「3.0.0」、工作 key 皆未變。
- 舊 `/results` 與舊工作結果：`/results` 永久重導至 `/assessment/work/results`，讀同一 key，不失效。

## 6. Validation Report

- `npm run validate`：**57／57 通過**（26 資料＋1 禁用詞＋13 工作題庫＋2 計分煙霧＋**15 感情題庫**）。
- 感情題庫（#43–57）：18 題×3；每題三系各一；九人格各 6 主要位、A/B/C 各 2；理論最高 12/36；18 情境各一；
  sourceFields 三種全覆蓋；零極端詞；**敏感情境紅線掃描**（控制/冷暴力/情緒勒索/跟蹤/監控/威脅/動手/施暴/查勤/偷看手機＝0）。
- 審查包：`docs/love-question-review-pack.md`（54 列矩陣＋九人格/三系覆蓋＋位置分布＋社會期許/性別刻板/敏感檢查）。

## 7. Build Report

- `npm run lint`：**通過（0 error / 0 warning）**。
- `npx tsc --noEmit`：**通過（strict，0 error）**。
- `npm run build`（Next 16 / prebuild 先跑 validate）：**成功**，SSG **39 頁全靜態**（含 icon.png / apple-icon.png / sitemap.xml / robots.txt）。
- sitemap：29 筆公開頁，**不含任何 results 頁**；robots noindex `/results`、`/assessment/*/results`、`/science-bazi/results`。

## 8. Deployment Checklist（Vercel）

1. 設定環境變數 **`NEXT_PUBLIC_SITE_URL`**＝正式網址（canonical／sitemap／OG 依賴，未設會 fallback localhost）。
2. 匯入 repo → Framework 自動辨識 Next.js → Build `npm run build`（prebuild 自動跑 57 項驗證，失敗即擋部署）。
3. 部署後人工驗證：
   - 首頁 Hero Logo、Header/Footer 徽記、favicon、`/og.png` 於社群分享預覽顯示正常。
   - 四入口可用；工作/感情測驗可完成並產生結果；`/results` 正確重導。
   - 科學八字：輸入出生資料可得免費摘要；未知時間不顯示時柱；付費牆為鎖定名稱（無實際內容外洩）。
   - 決策引擎：填寫後即時整理；頁面標示非 AndI、不替你決定。
   - `/founder`、`/why-not-fortune-telling` 內容正確；付費 CTA 連到 LINE（`~smilemusic1116`）。
4. 定價：於 `data/products.ts` 填入金額並將對應 `isPublished:true`、更新 `displayPrice` 即上線（不需改元件）。
5. （選用）提供 **DS 徽記透明底 PNG**，可再優化 Header 與 favicon 呈現。

## 9. 已知限制

- **付費無金流**：V1 無後端，付費為人工解鎖（LINE 承接）；`accessStatusFor` 恆 locked，無純前端解鎖路徑。價格未定（顯示「詳詢 LINE」）。
- **人格底色引擎為原型**：壽星公式近似節氣（僅到日）、十神權重未經樣本校準、未做真太陽時/經度/DST、特殊格局不修正；分數非準確率。
- **clarity 門檻**未依真實作答分布校準（沿用 3.0.0 保守版）。
- **感情題庫**內容依平衡與敏感度規則撰寫，屬產品原型，非心理計量量表。
- **Logo** 為點陣 JPEG（無向量、無透明、文字內建）；Header 以深色容器承載徽記、favicon 取自徽記裁切；建議日後補透明徽記版。
- **81 種底色×外顯交叉分析**：型別預留，V1 不建（維持不變）。
- 正式上線前必設 `NEXT_PUBLIC_SITE_URL`，否則 SEO 連結錯誤。

## 10. 是否可直接部署

驗證 57／57、QA 27／27、lint 0、tsc 0、build 39 頁全綠、工作計分 golden 逐位元不變、無後端相依。
在設定 `NEXT_PUBLIC_SITE_URL` 後即可部署至 Vercel。

**專案可直接部署。**
