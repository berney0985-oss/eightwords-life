/**
 * 決策案例（Decision Case）型別。
 * 規則：三案例使用三種不同主要人格（橫跨三大決策系）；
 * 人格傾向只作為分析視角之一，不得描述為問題唯一原因；
 * 案例源自真實發生過的事件，姓名、職業、年齡、部分背景資訊已匿名化或適度修改，
 * 部分案例可能合併多位個案的共同特徵，但分析邏輯與決策模式皆源自真實案例。
 */

import type { PersonaId } from "./persona";

export type CaseDomain = "relationship" | "career" | "creation";

export interface DecisionCase {
  id: string;
  slug: string;
  title: string;
  domain: CaseDomain;
  label: "Decision Case" | "綜合型案例";
  /** 分析視角之一，非唯一原因 */
  primaryPersonaId: PersonaId;
  background: string;
  surfaceProblem: string;
  decisionHabit: string;
  failureContext: string;
  blindspot: string;
  recurringMistake: string;
  correctionStrategy: string;
  nextAction: string;
  /** 可回溯的規格來源欄位 */
  sourceFields: string[];
}
