# 文案來源層級標示（Copy Levels）

層級定義見 implementation-decisions.md 第 8 節。A＝規格原文（不得改寫）、
B＝規格短版（保留 sourceField/sourceSection）、C＝品牌原創、D＝案例文案。

| 位置 | 內容 | 層級 | 備註 |
|---|---|---|---|
| components/home/HeroSection | 主標、副標、雙 CTA、品牌核心句 | C | 文字依專案指令書第十一節第一區 |
| components/home/ProblemSection | 三個重播場景＋收尾 | C | 依指令書第二區 |
| components/home/LogicChainSection | 邏輯鏈與慣性中性說明 | C | 鏈條步驟名依規格 §1.5（A） |
| components/home/ClusterSection | 區塊標題與副標 | C | 卡片內 coreStrategy／人格名為 A（原文欄位） |
| components/home/PersonaSection | 區塊說明文字 | C | 卡片內容全為 A（coreNeed／oneLineDefinition／baziSource） |
| components/home/PersonaLayersSection | 雙層模型說明 | C | 依 3.0.0 架構表述；「深層需求、長期驅動、內在決策傾向」依指令書第六區 |
| components/home/MethodSection | 四模組文案 | C | 依指令書第七區 |
| components/home/EightWordsSection | 八字角色敘事 | C | 依指令書第八區 |
| components/home/CaseSection | 區塊標題 | C | 卡片內容為 D（cases.ts） |
| components/home/ServicesSection / FinalCTASection | 區塊文案 | C | 依指令書第十、十一區 |
| app/clusters + components/clusters | 頁面標題副標 | C | 全部欄位值為 A（clusters.ts 原文）；顯示名「共同價值」見 data-issues #4 |
| app/personas + components/personas/PersonaDetail | 六段段首說明、段名 | C | 全部欄位值為 A（personas.ts 原文）；六段結構依 3.0.0 §7.5 |
| components/personas/ExpressedPersonaPanel | 空狀態文案 | C | 雙層模型表述；無假結果 |
| app/methodology | 全頁 | C | 邏輯鏈步驟名與名詞為 A；「科學的意思」依指令書第六節允許用語 |
| app/eightwords | 敘事文案 | C | 十神映射表為 A（§2.3 公理，取自 personas.baziSource） |
| data/cases.ts + app/cases | 三案例全文 | D | 標示模擬案例；人格為分析視角之一；sourceFields 記錄錨定欄位 |
| data/services.ts + app/services | 四方案 | C | 項目名與內容依指令書第二十一節；方案三標示人工分析 |
| app/about | 全頁 | C | 無虛構履歷；限制誠實揭露 |
| app/privacy / app/disclaimer | 全頁 | C | 依指令書第二十五、二十六節 |
| app/assessment（骨架）/ app/results（骨架） | 測驗名稱、聲明、Empty State | C | 名稱與聲明依指令書第十五、十八節 |

## B 層（規格短版文案）使用情況

第五階段**未產生** B 層文案：所有規格內容均以原文欄位完整呈現（A），
無縮短需求。若第六階段結果頁需要短版，將建立含 sourceField/sourceSection 的
短版資料結構後再使用。
