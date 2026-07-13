# 實作決策紀錄（Implementation Decisions）

原始規格：《科學八字決策系統定義（Final）》v2.2.0（原文不修改）。
本專案依業主裁決之 **Version 3.0.0 修訂提案** 實作。差異與決策記錄如下。

## 1. 品牌與命名

| # | 決策 | 說明 |
|---|---|---|
| 1.1 | 母品牌改為「科學決策 Decision Science Lab」 | 科學八字降為人格底色方法模組 |
| 1.2 | 對外統一使用「九種決策人格」 | 禁止九型人格等 Enneagram 混淆命名 |
| 1.3 | `talent_archetype` → `talent_blueprint` | Archetype 易被誤解為另一種人格原型。Migration：2.2.0 `talent_archetype` → 3.0.0 `talent_blueprint`；五項內容不變，僅改名稱、英文名、架構位置與歸屬 |

## 2. 架構（3.0.0）

| # | 決策 | 說明 |
|---|---|---|
| 2.1 | 底色與外顯雙層模型 | 內在模型層（人格底色＋附屬天賦密碼）／行為呈現層（外顯人格）；禁止三層線性表述；交叉分析（81 組合）為 V2 交付 |
| 2.2 | 版本號 3.0.0（非 2.3.0） | 依原規格 §8：架構層級變動屬主版本。原 2.3.0 提案經裁決升為 3.0.0 |
| 2.3 | `decisionProfile` 僅一份 | 依語境解讀為長期傾向或外顯呈現；禁止複製為 core/expressed 兩份 |
| 2.4 | 規格 §7.1 反轉 | 2.2.0 規定測驗判定 core_persona（必要）；本專案 V1 測驗只判定 expressed_persona；core_persona 由八字模型建立、V1 不自動產生 |
| 2.5 | 外顯人格定義措辭 | 2.2.0「別人怎麼看你」→ 3.0.0「我目前通常如何呈現決策」（自填測驗測不到他人觀感） |

## 3. 測驗與計分

| # | 決策 | 說明 |
|---|---|---|
| 3.1 | `confidence` 廢止，改 `clarity`（作答傾向清晰度） | 禁止描述為準確率／可信度／診斷機率 |
| 3.2 | **清晰度分帶門檻為暫定值** | 低 <10、中 10–25、高 >25（`lib/constants.ts`）。此門檻**尚未經實證作答分布校準**，屬產品顯示用暫定規則；取得真實作答分布後應重新校正。結果頁以分數差距數值＋文字解釋為主，分帶標籤為次要 |
| 3.3 | 選項不保存 `clusterScores` | 單一資料源：`AssessmentOption` 只保存 `personaScores`；決策系分數由 `lib/scoring.ts` 依 `persona.clusterId` 自動彙總。驗證改為：personaScores 的 PersonaId 均合法、每個 PersonaId 可對應 clusterId |
| 3.4 | Tie-break 確定性規則 | 原始分 → 主要計分次數 → 所屬決策系總分 → 固定人格順位；禁止隨機 |
| 3.5 | 統一權重 | 主要 +2、次要 +1（至多一個次要） |
| 3.6 | 每人格 ≥6 題主要計分機會 | 含八條平衡規則與計分覆蓋矩陣（第六階段交付前置） |

## 4. 技術

| # | 決策 | 說明 |
|---|---|---|
| 4.1 | /assessment 與 /results 頁面維持 Server Component | 互動由 AssessmentShell / ResultsShell（client 島嶼）承載，保留 metadata 與靜態結構 |
| 4.2 | 人格頁的本機結果讀取獨立為 ExpressedPersonaPanel（client） | 人格頁其餘維持 Server Component |
| 4.3 | 網址統一 `NEXT_PUBLIC_SITE_URL` | 本機 fallback `http://localhost:3000`；canonical / OG / sitemap / robots / metadataBase 全走 site-config |
| 4.4 | 社群連結 enabled 開關 | 未啟用不顯示或顯示「即將開放」；禁止假連結 |
| 4.5 | LocalStorage 版本升級策略 | v1 → v2 舊 key 直接淘汰不遷移（免費測驗重測成本低） |
| 4.6 | 套件版本 | 以 create-next-app 官方相容組合為準（見 README），不追最新 major（TS 7 / ESLint 10 未被 Next 16 模板採用） |

## 5. 誠信邊界

- V1 不宣稱心理計量驗證；清晰度不等於準確率。
- 方案三（完整決策藍圖）標示人工分析；禁止「自動生成／AI 精準分析」。
- 建議未來將 3.0.0 修訂正式併入規格文件並發布 Version 3.0.0 正式版。

| 4.7 | 字體採繁中系統字體堆疊 | 不使用 next/font/google：TC 字體子集龐大、系統字體零外部依賴且渲染最快；建置環境亦無法連線 fonts.googleapis.com。CSS fallback 順序：PingFang TC → Noto Sans TC → Microsoft JhengHei（內文）；Noto Serif TC → Songti TC（標題）。未來如需自載字體，建議 next/font/local 搭配子集化字檔 |

## 6. Schema 精修（第三階段後裁決）

| # | 決策 | 說明 |
|---|---|---|
| 6.1 | `DecisionProfile` 拆分為 `DecisionProfile` ＋ `RiskProfile` | 人格定義層（固定）：decisionHabit、strength、weakness。顧問分析層（可延伸）：decisionBlindspot、blindspotTriggers、recurringMistake、stressResponse、correctionStrategy、growthDirection。目的：V2 交叉分析將產生「個人化盲點／個人化修正策略」，基礎風險內容需獨立命名空間避免混淆。stressResponse 與 recurringMistake 歸入 RiskProfile 之依據：規格 Glossary 定義壓力反應為「慣性被放大後的退化行為」、重複錯誤為「盲點長期未辨識的結果」，皆屬風險鏈而非中性決策特性；此歸位與人格頁第五段（壓力與決策風險）一致。注意：weakness 依裁決留在 DecisionProfile（人格定義層），與 Glossary「人格風險＝弱點＋盲點合稱」存在措辭張力，報告「風險章節」引用時需同時取 decisionProfile.weakness 與 riskProfile.* |
| 6.2 | `PersonaCombinationProfile` 型別現在定義、V1 不實作 | types/combination.ts：corePersonaId、expressedPersonaId、alignmentType（identical / same_cluster / cross_cluster）、conflictLevel、combinedStrengths、combinedBlindspots、combinedStrategies。V1 不得 import 於任何執行路徑；避免 V2 breaking change |

## 7. 檔案行數例外（第五階段前裁決）

| # | 決策 | 說明 |
|---|---|---|
| 7.1 | data/personas.ts 允許超過單檔 300 行限制 | 該檔為**純資料轉錄檔**：不包含條件邏輯、不包含 UI、不包含計分、不包含副作用，僅為規格原文的結構化轉錄（545 行）。**此例外不得延伸到** Component、Utility、Hook、Scoring、Storage、Validation——上述類別一律維持約 300 行上限 |

## 8. 文案來源層級制度（第五階段起全站適用）

| 層級 | 定義 | 規則 |
|---|---|---|
| A 規格原文 | 直接引用 data/personas.ts、clusters.ts、glossary.ts 欄位 | 不得改寫、不得摘要、不得潤飾 |
| B 規格短版文案 | 由規格欄位縮短的版本 | 必須保留 sourceField 與 sourceSection；不得改變原意 |
| C 品牌原創文案 | 首頁敘事、方法頁、關於頁等新創作 | 不得冒充規格定義、不得寫成心理診斷、不得寫成科學驗證結論、不得使用未來預測語句 |
| D 案例文案 | 模擬案例 | 必須標示「模擬案例」或「綜合型案例」；人格只能是分析視角之一，不得描述為問題唯一原因 |

全站新增文案的層級標示集中於 docs/copy-levels.md。

## 9. 測驗計分裁決（第六階段）

| # | 決策 | 說明 |
|---|---|---|
| 9.1 | V1 採方案 A：主要人格單一計分 | 每選項僅 1 個主要人格 +2；無次要計分。方案 B（+2/+1）被否決：54 個次要配分中 36 個語意牽強、為配平而存在、同系次要壓縮組內區辨。**次要人格計分延後至有真實作答資料可驗證權重後再評估**。方案 B 保留於審查文件作為被否決方案紀錄 |
| 9.2 | 清晰度門檻採保守版：<20 低／20–40 中／≥40 高 | 語意：0（平分）＝低、16.7（差一選項）＝低、33.3（差兩選項）＝中、50+（差三選項以上）＝高。**為 V1 顯示規則，尚未依真實作答分布校準，取得資料後必須重新檢查**。結果頁以文字解釋為主、標籤次要；禁止描述為準確率／可信度／人格固定程度／心理計量信度 |
| 9.3 | 平手不以固定順位偽造結果 | 規則：①人格原始分 → ②所屬決策系總分 → 仍平手則 isTied=true、expressedPersona=null、tiedTopPersonas 保存並列人格、tieType ∈ persona_tie／cluster_tie／full_tie。結果頁顯示並列傾向文案與並列人格卡，不假裝唯一結果。topPersonas 與並列卡的排列順序僅供顯示，不代表判定 |
| 9.4 | 題庫定稿 assessmentVersion 1.0.0 | 依裁決完成 Q7／Q9／Q11／Q12／Q14／Q15 改寫。兩項連鎖修正**待業主追認**：(a) Q13 理想型補掛 action_pattern（Q9 改寫使理想型失去 action 錨點；依據「認定的事可以做很久」）；(b) Q17 創作型「立刻」為禁用極端詞，改「眼前」。questions.ts 由審查通過矩陣程式化生成，為純資料轉錄檔（適用 7.1 例外） |
| 9.5 | 理論最高分不寫死 | scoring.theoreticalMaxima() 由題庫動態計算（人格 12／決策系 36 由驗證 37 確認），避免題庫調整後魔術數字失真 |
