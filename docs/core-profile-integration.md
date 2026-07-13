# docs/core-profile-integration.md — 科學八字分析（人格底色）整合

## 來源
純函式引擎移入自 `scientific-decision-core`（schemaVersion 1.0.0）。公式未改動。

- 引擎：`lib/core-profile/*.ts`（constants／calendar／pillars／ten-gods／five-elements／persona-mapper／validation／completeness／analyze／index）。
- 型別：`types/core-profile.ts`。
- 唯一入口：`analyzeCoreProfile(input, { createdAt, now }) → CoreProfileResult`。純函式，不碰 DOM／localStorage。
- 進站煙霧測試：原 fixtures 12/12（四柱、日主、corePersonaId 一致）。

## 責任分工
- 引擎只輸出 ID 與分數（corePersonaId／candidatePersonaIds／tenGodScores／fiveElementScores／personaScores／平手／完整度／limitations）。
- **人格文案（名稱、定義、天賦密碼、決策慣性…）一律由主站依 corePersonaId 讀 `data/personas.ts`**，引擎不複製。
- 因此使用的是正式九人格名稱，不會出現舊版其他人格名。

## UI（Component 不含排盤公式）
`components/core-profile/`：CoreProfileForm、BirthDataFields、CoreProfileResult、PillarSummary、
ElementSummary、TenGodSummary、CorePersonaSummary、TalentBlueprintSummary、CoreProfilePaywall、CoreProfileDisclaimer。

## 輸入
姓名（可選）、性別、出生日期（必填）、`birthTimeKnown`、出生時間（未知時為 null，**不偽造 00:00**）、
時區（預設 Asia/Taipei、可改）、子時換日（midnight 預設／2300）。引擎 validation 已強制「birthTimeKnown=false 時 birthTime 必須為 null」。

## 免費 vs 付費
- 免費：基本出生資料、四柱摘要（時間未知只顯示可確定柱）、日主、五行摘要、十神摘要、
  人格底色名稱＋一句定義、天賦密碼摘要、一項自然優勢、一項基礎盲點、資料完整度、免責。
- 付費（`core_profile_full`，人工）：完整底色、完整天賦密碼、決策慣性、最大優勢/弱點、盲點、盲點觸發、
  壓力反應、重複錯誤、修正策略、成長方向、完整人工說明。付費內容不預先產生、不送到瀏覽器。

## 誠信
資料完整度只描述輸入是否完整（日期／時間／時區），**不得**稱準確率／可信度／人格確定度。
路由 `/science-bazi`、`/science-bazi/results`（noindex）。暫存 key `decision-science-core-profile-v1`
僅供重看，不作為付費解鎖來源。
