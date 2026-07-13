# 正式上線前檢查清單

規則：全部勾選才可宣布上線。標示 **【部署後強制人工驗證】** 的項目必須在 Vercel Preview／Production 以真實瀏覽器與真機完成，**不得因開發沙箱測不到就默認通過**。

## 環境設定

- [ ] `NEXT_PUBLIC_SITE_URL` 已設定為正式網址（Production 環境變數）
- [ ] Production 任一頁 canonical 不含 localhost
- [ ] `/sitemap.xml` 全部使用正式網址
- [ ] Open Graph URL 使用正式網址

## 品牌與聯絡

- [ ] Instagram 連結設定正確（`site-config.ts` → social）
- [ ] LINE 連結設定正確
- [ ] booking URL 設定正確（或維持未啟用）
- [ ] 未啟用項目確實不顯示（無假連結、無死按鈕誤導）
- [ ] About 頁創辦人敘述確認（`site-config.ts` → about.maintainerStatement）

## 法律

- [ ] 隱私頁更新日期確認（`site-config.ts` → legal.privacyLastUpdated）
- [ ] 免責聲明全文確認
- [ ] LocalStorage 說明與實際行為一致
- [ ] 全站沒有未實作功能的錯誤承諾

## 內容

- [ ] 所有模擬案例標示清楚（3 案皆有「模擬案例」）
- [ ] 零假評論
- [ ] 零假數據（人數、成功率等）
- [ ] 零假專業資格
- [ ] 服務方案三仍標示「人工分析」
- [ ] 沒有預測或診斷語句（可用 `npm run validate` 佐證）

## 測驗（Production 網址實測一輪）

- [ ] 全新作答 18 題完成 → 結果正確顯示
- [ ] 作答中途重新整理 → 續答且答案保留
- [ ] 返回修改答案 → 結果以最終答案計算
- [ ] 已有結果時進 /assessment → 顯示查看／重新測驗，重新測驗有確認
- [ ] 無結果直開 /results → Empty State
- [ ] DevTools 注入損壞 localStorage → 自動清除、不崩潰
- [ ] 唯一結果案例正常
- [ ] 平手案例顯示並列人格（可用 QA 腳本的④構造答案重現）
- [ ] 九型全平顯示「尚未形成單一明顯傾向」

## 手機實測 【部署後強制人工驗證】

- [ ] 320×568
- [ ] 375×667
- [ ] 390×844
- [ ] 430×932
- [ ] iPhone Safari 真機
- [ ] Android Chrome 真機
- [ ] 全站無水平捲動
- [ ] Dialog 不被遮擋、可完整操作
- [ ] 頁面底部 CTA 不被瀏覽器工具列遮住
- [ ] eightwords 對照表可橫向捲動
- [ ] 測驗可單手操作、選項好點

## 瀏覽器 【部署後強制人工驗證】

- [ ] Chrome 最新版
- [ ] Edge 最新版
- [ ] Safari 最新版
- [ ] Console 無錯誤
- [ ] 無 hydration warning
- [ ] 無 React warning

## 無障礙 【部署後強制人工驗證】

- [ ] Tab 順序合理、可完整操作測驗
- [ ] radio 可用 Space／方向鍵
- [ ] 1／2／3 快捷鍵正常，focus 在選項上時 ← 不會誤觸回上一題
- [ ] focus 樣式清楚可見
- [ ] Dialog 開啟 focus 進入、關閉後回到觸發按鈕、Escape 可關閉
- [ ] 螢幕閱讀器基礎測試（VoiceOver 或 NVDA 過一輪測驗）
- [ ] 顏色對比檢查（可用 Lighthouse／axe）

## SEO

- [ ] 每頁 title 唯一
- [ ] 每頁 description 合理
- [ ] canonical 正確
- [ ] sitemap 完整（23 條、無 /results）
- [ ] robots 屏蔽 /results
- [ ] 404 正常（含 /personas/亂打、/clusters/亂打）
- [ ] 動態人格頁 metadata 正確（抽 2 頁看原始碼）
- [ ] 動態決策系頁 metadata 正確

## 最終

- [ ] `npm run validate` 42 項全過
- [ ] `npx tsx scripts/phase7/tests.ts` 27 項全過
- [ ] `npm run lint` 零錯誤零警告
- [ ] `npm run build` 成功零警告
- [ ] Vercel Production deployment 成功
- [ ] 真機走查完成（上方三個【部署後強制人工驗證】區塊全數勾選）
