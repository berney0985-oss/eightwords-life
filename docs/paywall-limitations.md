# docs/paywall-limitations.md — 付費牆安全限制（無後端）

## 現況
V1 無後端、無金流、無帳號。付費為**誠實鎖定**：

- **不**把完整付費內容預先送到瀏覽器再用 CSS 遮蔽——付費內容根本不產生、不輸出。
- **不**把解鎖狀態存於可竄改的 LocalStorage。`lib/access.ts` 的 `accessStatusFor()` 一律回傳 `"locked"`。
- **不**建立假的付款成功流程、**不**聲稱自動解鎖。
- 購買／解鎖入口一律導向 LINE 官方帳號（人工承接）。

## 定價
價格集中於 `data/products.ts`，每項採 `{ isPublished, price, displayPrice, currency }`。
目前金額未定：`isPublished:false`、`price:0`、`displayPrice:"詳詢 LINE"`（免費項目顯示「免費／免費預覽」）。
元件一律 render `displayPrice`（永遠是字串）。定價時改 products.ts 即可，不需改元件。

## 產品 ID
`work_assessment_free`、`love_assessment_free`、`core_profile_preview`、`core_profile_full`、
`decision_engine_free`、`decision_engine_full`、`decision_analysis`、`decision_consultation`。

## CTA 目的地
由 `data/site-config.ts` 的 `socialLinks.line`（enabled + url）控制。目前 LINE 官方帳號
`smilemusic1116` 已啟用（`https://line.me/R/ti/p/~smilemusic1116`）。未啟用時顯示「即將開放」，不放假連結。

## 元件
`components/paywall/Paywall.tsx`（通用鎖定區＋CTA）；
`CoreProfilePaywall`（core_profile_full）、決策引擎付費段（decision_engine_full）皆複用之。

## 未來
接上後端與金流後，由伺服器授權將 `accessStatusFor` 改為依實際購買回傳 `"unlocked"`；
本版刻意不提供任何純前端把 locked 改 unlocked 的路徑。
