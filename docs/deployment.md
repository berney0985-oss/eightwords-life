# Vercel 部署文件

本文件提供可操作步驟；實際部署需由專案擁有者以自己的 GitHub 與 Vercel 帳號完成。

## 1. GitHub 專案準備

1. 在 GitHub 建立私有或公開 repository（例：`decision-science-lab`）
2. 將本專案完整推上去（含 `package.json`、`app/`、`data/`、`docs/` 等；`node_modules` 與 `.next` 已被 `.gitignore` 排除）
3. 確認預設分支（通常 `main`）內容為要上線的版本

## 2. 導入 Vercel

1. 登入 https://vercel.com → **Add New… → Project**
2. **Import Git Repository** 選擇上述 repo → Import

## 3. 專案設定

| 項目 | 值 |
|---|---|
| Framework Preset | **Next.js**（Vercel 會自動偵測） |
| Build Command | `npm run build`（保持預設；內含 42 項資料驗證，驗證失敗＝build 失敗＝不會部署壞版本） |
| Output | 保持預設（Next.js 自動處理，不需自訂 output directory） |
| Install Command | `npm install`（預設） |
| Node.js Version | 專案設定頁 → General → Node.js Version 選 **20.x 以上**（開發環境為 22） |

## 4. Environment Variables（部署前必做）

Settings → Environment Variables 新增：

| Name | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 正式網址，例 `https://your-domain.com`（結尾不加斜線） | **Production** |
| `NEXT_PUBLIC_SITE_URL` | 可留空或填 Preview 網址 | Preview（可選） |

**未設定時 canonical／sitemap／OG 會 fallback 到 `http://localhost:3000`——Production 絕對不可如此上線。**

### Production 與 Preview 差異

- **Production**：預設分支的部署，綁定正式網域，使用 Production 環境變數
- **Preview**：每個 branch／PR 自動產生的預覽網址（`*.vercel.app`），用來做真機走查與檢查清單中的「部署後強制人工驗證」，不影響正式站

## 5. 自訂網域與 DNS

1. Settings → Domains → 輸入你的網域
2. 依 Vercel 指示到你的網域註冊商設定 DNS：
   - 根網域（`example.com`）：**A 記錄** 指向 Vercel 提供的 IP（76.76.21.21）
   - 子網域（`www.example.com`）：**CNAME** 指向 `cname.vercel-dns.com`
3. DNS 生效可能需要數分鐘到數小時；Vercel 會自動簽發 HTTPS 憑證
4. 網域生效後，把 `NEXT_PUBLIC_SITE_URL` 改成最終網域並 **Redeploy**

## 6. 部署後重新檢查（每次改網域或環境變數後）

| 檢查 | 方式 | 期望 |
|---|---|---|
| canonical | 任一頁「檢視原始碼」搜 `rel="canonical"` | 正式網域，非 localhost |
| sitemap | 開 `https://你的網域/sitemap.xml` | 23 條、全為正式網域、無 /results |
| robots | 開 `/robots.txt` | `Disallow: /results`＋正確 Sitemap 網址 |
| 404 | 開 `/隨便亂打` 與 `/personas/xxx` | 自訂 404 頁、HTTP 404 |
| /results | 開發者工具看回應 | 頁面 metadata 含 noindex；robots 已擋 |

## 7. 日常操作

- **重新部署**：push 到預設分支即自動部署；或 Deployments → 該筆 → ⋯ → **Redeploy**
- **回滾**：Deployments 找到上一個正常版本 → ⋯ → **Promote to Production**（即時切換，無需重 build）
- **查看 build log**：Deployments → 點該筆部署 → Building 區塊展開完整 log（含 42 項資料驗證輸出）
- **判斷部署失敗**：Deployments 狀態顯示紅色 **Error**；點入看 log——最常見原因：資料驗證未過（訊息會列出第幾項）、TypeScript 錯誤、環境變數拼錯。**驗證失敗擋下部署是設計行為**：修正資料後再 push
