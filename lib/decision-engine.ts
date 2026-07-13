/**
 * 決策引擎：規則式決策整理（純函式、透明、非 AI）。
 * 只做「把使用者輸入整理成清楚的結構」，不替使用者做決定、不預測結果。
 * 所有輸出都是依明確規則由輸入組合而成，沒有隱藏模型、沒有隨機性。
 */

import type { DecisionInput, DecisionFreeOutput } from "@/types/decision-engine";

const clean = (s: string): string => s.trim().replace(/\s+/g, " ");

export function organizeDecision(input: DecisionInput): DecisionFreeOutput {
  const problem = clean(input.problem);
  const deadline = clean(input.deadline);
  const risk = clean(input.worstRisk);
  const cost = clean(input.unacceptableCost);
  const leaning = clean(input.leaning);

  const restatement = problem
    ? `你正在決定的是：${problem}`
    : "你還沒把問題寫清楚——先用一句話描述你正在決定什麼。";

  const goal = deadline
    ? `在「${deadline}」之前，做出一個你能承擔後果的選擇。`
    : "先確定這個決定的期限——沒有期限的決定容易一直拖。";

  const constraints: string[] = [];
  if (cost) constraints.push(`不能接受的代價：${cost}`);
  if (risk) constraints.push(`最擔心的風險：${risk}`);
  if (deadline) constraints.push(`時間限制：${deadline}`);
  if (constraints.length === 0)
    constraints.push("你還沒寫下任何限制。先想清楚有什麼是你不能接受的，選擇會變簡單。");

  const reversibilityHint =
    "先判斷這個決定可不可逆：可逆的決定可以快一點做、邊做邊修；" +
    "不可逆、代價很大的決定，值得多花一點時間把資訊補齊再決定。";

  let blindspot: string;
  if (leaning) {
    blindspot = `你已經傾向「${leaning}」。小心別只蒐集支持這個選擇的理由——` +
      "試著認真找一個「它可能不對」的原因。";
  } else if (risk) {
    blindspot = "注意別讓單一最怕的風險放大成唯一考量，那會讓你忽略其他同樣重要的因素。";
  } else {
    blindspot = "你還沒寫下傾向與風險。人在資訊不足時容易憑當下情緒決定——先把事實列出來。";
  }

  let nextAction: string;
  if (risk) {
    nextAction = `把「${risk}」寫下來，想一個能讓它變小的具體動作，今天就先做一件。`;
  } else if (input.optionA && input.optionB) {
    nextAction = "把選項 A 與 B 各寫下三個實際差異，明天再看一次，通常會更清楚。";
  } else {
    nextAction = "先把可能的選項至少列出兩個，再回來整理。";
  }

  return { restatement, goal, constraints, reversibilityHint, blindspot, nextAction };
}
