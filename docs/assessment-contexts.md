# docs/assessment-contexts.md — 工作／感情測驗語境隔離

## 概念
兩個外顯人格測驗共用同一套九人格、三大決策系、方案 A 計分、兩層平手、clarity，
差異只在「題庫」與「儲存空間」。`AssessmentContext = "work" | "love"`。

兩者量到的都是「該情境的外顯決策傾向」，**不得**稱為人格底色／完整人格／真正人格／先天人格。

## 共用（單一資料源）
- 計分引擎：`lib/assessment-engine.ts`（`scoreWith(bank, answers, versions)`、`theoreticalMaximaOf(bank)`）。
- 驗證器工廠：`lib/validation.ts`（`makeProgressValidator`、`makeResultValidator`）。
- 儲存工廠：`lib/storage.ts`（`makeStore<T>(key, validate)`）。
- UI 子元件：`QuestionCard`、`AssessmentProgress`、`AssessmentNavigation`、`RestartAssessmentDialog`。

## 隔離對照
| 項目 | 工作 | 感情 |
|---|---|---|
| 題庫 | `data/questions.ts` | `data/love-questions.ts` |
| 版本 | `ASSESSMENT_VERSION = "1.0.0"` | `LOVE_ASSESSMENT_VERSION = "love-1.0.0"` |
| 進度 key | `decision-science-assessment-v1` | `decision-science-love-assessment-v1` |
| 結果 key | `decision-science-result-v1` | `decision-science-love-result-v1` |
| 計分 | `lib/scoring.ts`（`scoreAssessment`） | `lib/love-scoring.ts`（`scoreLove`） |
| 儲存 | `lib/storage.ts`（工作匯出） | `lib/love-storage.ts` |
| Shell | `AssessmentShell` | `LoveAssessmentShell` |
| 結果 Shell | `ResultsShell` | `LoveResultsShell` |
| Route | `/assessment/work`、`/assessment/work/results` | `/assessment/love`、`/assessment/love/results` |

## 相容性
- 工作 key 沿用 3.0.0 原名，舊使用者結果可讀；`/results` 永久重導至 `/assessment/work/results`（同一 key）。
- `AssessmentResult` 型別未改動；感情沿用相同結構、存於獨立 key（assessmentVersion 欄位存 "love-1.0.0"）。
- 工作計分以重構前 golden 輸出逐位元比對，確認不變。

## 感情題庫平衡（validate-data #43–57）
18 題×3 選項；每題三系各一；九人格各 6 主要位、A/B/C 各 2；理論最高人格 12／決策系 36；
18 情境類別各一；每人格 sourceFields 三種全覆蓋；零極端詞；**敏感情境紅線掃描**（#56）。
