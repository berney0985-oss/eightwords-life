# 最終驗收對照

狀態定義：**通過**（本環境已實證）／**部分通過**（邏輯層實證、視覺層待部署）／**需部署後驗證**／**未實作**（且不屬 V1 驗收失敗）。

## 一、架構與資料

| 驗收項 | 狀態 | 證據 | 相關檔案 | 測試方式 | 限制 |
|---|---|---|---|---|---|
| 規格原文零改寫轉錄（人格／決策系） | 通過 | 驗證 #1–26＋逐字比對 194 值全命中 | data/personas.ts、clusters.ts、docs/content-source-map.md | scripts/validate-data.ts | 原文問題照錄（data-issues.md 6 項） |
| 底色與外顯雙層模型（無層級高低） | 通過 | 全站文案掃描零違規；LayerExplanation 固定文案 | components/results/LayerExplanation.tsx 等 | 渲染 HTML 掃描＋原始碼 | — |
| 交叉分析型別預留、V1 不實作 | 通過 | types/combination.ts 存在、無資料無 UI | types/combination.ts | 程式碼檢視 | 屬 V2 |
| Schema 3.0.0／巢狀 PersonaProfile | 通過 | build 型別檢查＋驗證 | types/* | npm run build | — |

## 二、題庫與計分

| 驗收項 | 狀態 | 證據 | 相關檔案 | 測試方式 | 限制 |
|---|---|---|---|---|---|
| 18 題×3 選項、每題三系各一 | 通過 | 驗證 #28、#31 | data/questions.ts | npm run validate | — |
| 九人格各 6 主要位、A/B/C 各 2 | 通過 | 驗證 #32–33 | 同上 | 同上 | — |
| 每人格 ≥4 情境、sourceFields 全覆蓋 | 通過 | 驗證 #35–36 | 同上 | 同上 | — |
| 上限：人格 12／系 36 | 通過 | 驗證 #37（動態計算） | lib/scoring.ts | 同上 | — |
| 方案 A（零次要計分） | 通過 | 驗證 #30、#39 | 同上 | 同上 | 次要計分延後（裁決 9.1） |
| 平手兩層規則、不偽造唯一結果 | 通過 | QA 六案例（persona_tie／cluster_tie／full_tie 全實測） | lib/scoring.ts | scripts/phase7/tests.ts | — |
| clarity 20／40 門檻 | 通過 | 六組模擬＋constants 註記 | lib/constants.ts、confidence.ts | 同上 | 未經真實分布校準（裁決 9.2） |
| 題目辨識度／偏誤（實證） | 未實作 | — | — | — | 需真實資料；屬 V2 第一優先，非 V1 驗收失敗 |
| 心理計量信效度 | 未實作 | 免責頁如實揭露 | app/disclaimer | — | 非 V1 驗收項 |

## 三、功能

| 驗收項 | 狀態 | 證據 | 相關檔案 | 測試方式 | 限制 |
|---|---|---|---|---|---|
| 24 route＋404＋sitemap＋robots | 通過 | production server 全 route 實測 | app/* | HTTP 請求 | — |
| 測驗五流程（A–E） | 部分通過 | 邏輯層 27 項 QA 全過 | lib/*、components/assessment | scripts/phase7/tests.ts | 瀏覽器互動層＝需部署後驗證 |
| LocalStorage 三重防護＋12 案注入 | 通過 | QA 注入表全過 | lib/storage.ts、validation.ts | 同上 | — |
| 平手 UI（並列卡、無單一 CTA） | 部分通過 | 程式碼確認＋計分層實測 | components/results/* | 原始碼＋QA | 視覺呈現＝需部署後驗證 |
| Empty State 與錯誤降級 | 通過 | E1–E3 實測 | ResultsShell 等 | QA 腳本 | — |
| Client 島嶼限 4 個 | 通過 | grep 確認 | components | grep "use client" | — |

## 四、品質

| 驗收項 | 狀態 | 證據 | 相關檔案 | 測試方式 | 限制 |
|---|---|---|---|---|---|
| 手機 viewport 視覺走查 | 需部署後驗證 | 程式層佐證（44px、overflow-x-auto、斷點） | — | pre-launch-checklist | 沙箱無瀏覽器 |
| Chrome／Edge／Safari console | 需部署後驗證 | — | — | 同上 | 同上 |
| Hydration warning 實測 | 需部署後驗證 | 架構層已排除（useSyncExternalStore＋server snapshot） | lib/use-storage.ts | 同上 | 同上 |
| 螢幕閱讀器 | 需部署後驗證 | aria 屬性齊備（程式確認） | — | 同上 | 同上 |
| 鍵盤操作 | 部分通過 | 程式碼確認（含 radio 方向鍵衝突修復） | AssessmentShell | 原始碼＋部署後人工 | — |
| 顏色對比 | 需部署後驗證 | 人工目測通過 | globals.css | Lighthouse／axe | 未經工具驗證 |
| 內容一致性（禁用概念） | 通過 | 24 頁渲染 HTML 掃描 0 違規 | — | 掃描腳本＋驗證 #27 | — |
| SEO（title／canonical／sitemap／robots） | 通過 | production server 實測 | app/* | HTTP 請求 | 正式網域 canonical＝需部署後驗證 |
| lint／build／validate 全綠 | 通過 | 本階段最終執行 | — | npm scripts | — |

## 五、誠信條款

| 驗收項 | 狀態 | 證據 |
|---|---|---|
| 零預測語句／零診斷宣稱／零假數據／零假連結 | 通過 | 全站掃描＋驗證 #27＋人工抽查 |
| 模擬案例標示、方案三人工分析標示 | 通過 | 渲染 HTML 確認 |
| 平手不以固定順位偽造結果 | 通過 | QA ③④⑥ 實測 expressedPersona=null |
