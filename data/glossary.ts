/**
 * 名詞定義（Glossary）。
 * 定義文字逐字依規格第 3 章原文搬入；
 * 3.0.0 新增／修訂詞條（talent_blueprint、clarity、expressed_persona 修訂）
 * 依 Version 3.0.0 修訂提案，並以 revisionNote 標示。
 */

export interface GlossaryTerm {
  term: string;
  code: string;
  definition: string;
  /** 規格來源 */
  source: string;
  /** 3.0.0 修訂或新增說明 */
  revisionNote?: string;
}

export const glossary: GlossaryTerm[] = [
  {
    term: "科學八字",
    code: "scientific_bazi",
    definition:
      "以八字符號系統為分類語言的人格與決策分析框架。非算命、非預測。",
    source: "第 3 章",
    revisionNote:
      "3.0.0：品牌架構中降為人格底色方法模組，母品牌為科學決策（Decision Science Lab）。",
  },
  {
    term: "三大決策系",
    code: "cluster",
    definition:
      "L1 分類。依核心需求光譜將九種人格歸為三組：穩定系、自主系、突破系。",
    source: "第 3 章",
  },
  {
    term: "人格底色",
    code: "core_persona",
    definition:
      "L2 分類。依本系統「十神強度演算法」判定之主導人格，代表一個人在長期決策中的核心決策傾向，反映其深層需求與內在驅動。回答：「為什麼會做出這樣的決策？」",
    source: "第 3 章",
    revisionNote:
      "3.0.0：V1 中十神強度演算法未完成，人格底色由八字模型建立初始假設，不得自動產生、不得由行為測驗判定。",
  },
  {
    term: "外顯人格",
    code: "expressed_persona",
    definition:
      "依本系統「外顯人格判定模型」所識別之人格，代表他人在互動中最容易觀察到的決策風格與行為表現。回答：「別人通常怎麼看你的決策方式？」",
    source: "第 3 章",
    revisionNote:
      "3.0.0 修訂定義：目前最容易被觀察到的決策風格，回答「我目前通常如何呈現決策？」判定來源為行為情境測驗（獨立來源，不由人格底色或天賦密碼推導）。",
  },
  {
    term: "核心需求",
    code: "core_need",
    definition:
      "驅動該人格一切思考與決策的根本心理需求。每個人格有且只有一個。",
    source: "第 3 章",
  },
  {
    term: "核心價值",
    code: "core_values",
    definition: "該人格據以評價事物好壞的內在標準。",
    source: "第 3 章",
  },
  {
    term: "決策目標",
    code: "decision_goal",
    definition: "該人格在做決策時，實際上想最大化或守護的東西。",
    source: "第 3 章",
  },
  {
    term: "思考模式",
    code: "thinking_pattern",
    definition:
      "該人格處理資訊的預設方式：先注意什麼、忽略什麼、如何推理。",
    source: "第 3 章",
  },
  {
    term: "行動模式",
    code: "action_pattern",
    definition: "該人格將決策化為行為的典型方式：節奏、力度、持續性。",
    source: "第 3 章",
  },
  {
    term: "決策模式",
    code: "decision_pattern",
    definition:
      "思考模式與行動模式的合稱，即「如何做出並執行決定」的整體風格。",
    source: "第 3 章",
  },
  {
    term: "決策慣性",
    code: "decision_habit",
    definition:
      "中性詞。該人格在無意識狀態下反覆採用的預設決策路徑。慣性本身不是錯，是效率機制。",
    source: "第 3 章",
  },
  {
    term: "決策盲點",
    code: "decision_blindspot",
    definition:
      "風險詞。決策慣性在特定情境下失效時，產生的系統性誤判或系統性忽略。盲點 = 慣性 + 錯誤情境。",
    source: "第 3 章",
  },
  {
    term: "重複錯誤",
    code: "recurring_mistake",
    definition:
      "決策盲點長期未被辨識時，在人生中反覆出現的具體錯誤形態。",
    source: "第 3 章",
  },
  {
    term: "人格優勢",
    code: "strength",
    definition: "該人格的慣性在適配情境下產生的可靠競爭力。",
    source: "第 3 章",
  },
  {
    term: "人格風險",
    code: "risk",
    definition: "人格弱點與決策盲點的合稱，用於報告中的風險章節。",
    source: "第 3 章",
    revisionNote:
      "3.0.0：資料層 weakness 歸屬 DecisionProfile、盲點鏈歸屬 RiskProfile；風險章節需同時讀取兩者（implementation-decisions.md 6.1）。",
  },
  {
    term: "壓力反應",
    code: "stress_response",
    definition:
      "該人格在高壓下的退化行為模式（慣性被放大後的極端版本）。",
    source: "第 3 章",
  },
  {
    term: "修正策略",
    code: "correction_strategy",
    definition:
      "針對特定決策盲點設計的具體行為對策，與盲點 1:1 對應。",
    source: "第 3 章",
  },
  {
    term: "成長方向",
    code: "growth_direction",
    definition: "修正策略的長期版本：該人格持續成熟的發展路徑。",
    source: "第 3 章",
  },
  {
    term: "天賦密碼",
    code: "talent_blueprint",
    definition:
      "人格底色自然延伸出的價值創造方式。回答：「我最自然如何創造價值？」不是另一種人格、不是第二次人格判定、不是能力測驗。包含：天賦主軸、自然優勢、自然貢獻、最佳角色定位、成熟潛能，五項全部附屬於人格底色。",
    source: "Version 3.0.0 修訂提案（原 2.2.0 第 5.10 節，舊欄位名見 implementation-decisions.md 1.3）",
    revisionNote:
      "自 2.2.0 舊欄位名更名而來；內容五項不變，僅改名稱、英文名、架構位置與歸屬。",
  },
  {
    term: "作答傾向清晰度",
    code: "clarity",
    definition:
      "本次作答中最高人格傾向與第二人格傾向的標準化分數差距指標。不代表測驗準確率，也不代表人格固定程度。禁止描述為準確率、人格準確度、可信度百分比、診斷機率。",
    source: "Version 3.0.0 修訂提案（取代 2.2.0 §7.1 confidence）",
    revisionNote: "分帶門檻為 V1 暫定顯示規則，未經實證校準（constants.ts）。",
  },
];
