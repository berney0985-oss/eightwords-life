/**
 * 模擬案例型別。
 * 規則：三案例使用三種不同主要人格（橫跨三大決策系）；
 * 人格傾向只作為分析視角之一，不得描述為問題唯一原因；
 * 必須標示模擬案例或綜合型案例，不得冒充真實客戶。
 */

import type { PersonaId } from "./persona";

export type CaseDomain = "relationship" | "career" | "creation";

export interface SimulatedCase {
  id: string;
  slug: string;
  title: string;
  domain: CaseDomain;
  label: "模擬案例" | "綜合型案例";
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
