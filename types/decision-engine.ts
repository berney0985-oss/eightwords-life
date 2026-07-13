/** 決策引擎（結構化決策整理工具）型別。規則式、透明，非 AI。 */

export interface DecisionInput {
  /** 正在面對的問題 */
  problem: string;
  /** 決策期限（自由文字，例：本週內／這個月） */
  deadline: string;
  optionA: string;
  optionB: string;
  /** 其他選項（可空） */
  otherOptions: string;
  /** 最擔心的風險 */
  worstRisk: string;
  /** 無法接受的代價 */
  unacceptableCost: string;
  /** 目前最傾向的選項 */
  leaning: string;
}

export interface DecisionFreeOutput {
  restatement: string;
  goal: string;
  constraints: string[];
  reversibilityHint: string;
  blindspot: string;
  nextAction: string;
}
