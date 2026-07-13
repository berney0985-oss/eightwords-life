/**
 * 外顯決策風格測驗題庫（assessmentVersion 1.0.0，業主裁決定稿）。
 * 由審查通過之計分矩陣（題庫審查包 v2 修正版）逐列轉入；
 * 平衡保證：九人格主要位各 6、A/B/C 各 2、每題三系各一、
 * 每人格情境 ≥4、sourceFields 三種全覆蓋、人格上限 12、決策系上限 36。
 * 計分：方案 A——每選項僅一個主要人格 +SCORE_PRIMARY；無次要計分。
 * 本檔為純資料轉錄檔（同 personas.ts 例外，implementation-decisions.md 7.1）。
 */

import type { AssessmentQuestion } from "@/types/assessment";
import { SCORE_PRIMARY, ASSESSMENT_VERSION } from "@/lib/constants";

export const questions: AssessmentQuestion[] = [
  {
    id: "q01",
    version: ASSESSMENT_VERSION,
    scenario: "你在找下一份工作，手上有三個條件相近的機會，各有特色。你會優先選哪一種？",
    context: "work_choice",
    sourceDimensions: ["decision_habit", "thinking_pattern"],
    options: [
      { id: "q01_a", text: "難度最高、最能逼自己升級的那一個", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q01_b", text: "薪資與制度最明確、看得見長期累積的那一個", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["decision_habit", "thinking_pattern"] },
      { id: "q01_c", text: "產業人脈最廣、之後轉換空間最大的那一個", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
    ],
  },
  {
    id: "q02",
    version: ASSESSMENT_VERSION,
    scenario: "月底結算，這個月比預期多出一筆閒錢。你最可能怎麼用？",
    context: "money_use",
    sourceDimensions: ["decision_habit", "thinking_pattern"],
    options: [
      { id: "q02_a", text: "直接存起來，或放進原本既定的儲蓄計畫", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q02_b", text: "把該結清的先結清，帳目乾乾淨淨不欠人", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q02_c", text: "花在喜歡的事物上，好好犒賞自己一次", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
    ],
  },
  {
    id: "q03",
    version: ASSESSMENT_VERSION,
    scenario: "你加入一個新專案小組，第一次開會大家還在摸索怎麼分工。你通常會？",
    context: "collaboration",
    sourceDimensions: ["action_pattern", "decision_habit", "thinking_pattern"],
    options: [
      { id: "q03_a", text: "先對目前的做法提出質疑，丟出不同的想法", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "q03_b", text: "先把分工、時程與負責人訂清楚再開始", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "q03_c", text: "先把自己能扛的部分認下來，直接開始做", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["action_pattern", "decision_habit"] },
    ],
  },
  {
    id: "q04",
    version: ASSESSMENT_VERSION,
    scenario: "你要在兩天內對一件不熟悉的事做決定，能拿到的資訊很有限。你會？",
    context: "insufficient_info",
    sourceDimensions: ["decision_habit", "thinking_pattern"],
    options: [
      { id: "q04_a", text: "找前例或請教有經驗的人，照可靠的做法走", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q04_b", text: "相信自己當下的直覺與體感，選感覺對的", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "q04_c", text: "用剩下的時間繼續查證，把能想的先想透", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
    ],
  },
  {
    id: "q05",
    version: ASSESSMENT_VERSION,
    scenario: "你手上的計畫進行到一半，出現一個看起來不錯的新方向。你會？",
    context: "opportunity_tradeoff",
    sourceDimensions: ["action_pattern", "decision_habit", "thinking_pattern"],
    options: [
      { id: "q05_a", text: "選更能做出自己風格、不跟別人一樣的那邊", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q05_b", text: "照原計畫走完，對已經承諾的事有交代", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "q05_c", text: "先接觸新方向，兩邊同時保留、並行推進", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["action_pattern", "decision_habit"] },
    ],
  },
  {
    id: "q06",
    version: ASSESSMENT_VERSION,
    scenario: "你負責推動一個為期三個月的計畫，剛拿到目標。你的第一步通常是？",
    context: "plan_execution",
    sourceDimensions: ["action_pattern", "thinking_pattern"],
    options: [
      { id: "q06_a", text: "先建立流程與檢核點，讓每一步有章法", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "q06_b", text: "先觀察整體局勢，把關鍵環節想清楚再動", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "q06_c", text: "先鎖定最終要拿下什麼，倒推手段直接開打", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "action_pattern"] },
    ],
  },
  {
    id: "q07",
    version: ASSESSMENT_VERSION,
    scenario: "會議上有人當眾否定你負責的部分，語氣不太客氣。你當下最可能？",
    context: "conflict_handling",
    sourceDimensions: ["action_pattern", "thinking_pattern"],
    options: [
      { id: "q07_a", text: "不急著回應，先想他為什麼這樣說、想達到什麼", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "q07_b", text: "先確認爭議是否已經偏離原本的目標，再決定要怎麼回應", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "q07_c", text: "當場回應，把不同意的點直接說清楚", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
    ],
  },
  {
    id: "q08",
    version: ASSESSMENT_VERSION,
    scenario: "這陣子工作量暴增，時間與資源都很緊。你通常的因應方式是？",
    context: "stress_response",
    sourceDimensions: ["action_pattern", "decision_habit"],
    options: [
      { id: "q08_a", text: "先安排讓自己放鬆的事，狀態回來再處理", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q08_b", text: "先砍掉所有非必要的支出與嘗試，守住基本盤", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q08_c", text: "延長工時自己硬扛，撐過去就好", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
    ],
  },
  {
    id: "q09",
    version: ASSESSMENT_VERSION,
    scenario: "你卡在一個超出自己能力範圍的難題上，已經兩個星期沒有進展。你會？",
    context: "help_vs_independence",
    sourceDimensions: ["action_pattern", "decision_habit", "thinking_pattern"],
    options: [
      { id: "q09_a", text: "繼續想辦法自己解，能不開口就不開口", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "q09_b", text: "先重新確認這個難題是否仍值得投入，再決定要繼續、求助或調整方向", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "q09_c", text: "把問題公開拋出來，找人討論、聽不同說法", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
    ],
  },
  {
    id: "q10",
    version: ASSESSMENT_VERSION,
    scenario: "有人邀你加入一個為期一年的長期合作，內容不錯，但需要固定投入。你會？",
    context: "commitment_vs_freedom",
    sourceDimensions: ["decision_habit", "thinking_pattern"],
    options: [
      { id: "q10_a", text: "先確認它符不符合我相信的方向，認同才投入", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "q10_b", text: "談一個保留彈性的合作方式，不把自己綁死", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q10_c", text: "先答應短期試做一段，做起來舒服再說", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
    ],
  },
  {
    id: "q11",
    version: ASSESSMENT_VERSION,
    scenario: "你同時有一件快完成的舊專案和一個很想開始的新點子，時間只夠做一個。你會？",
    context: "start_vs_finish",
    sourceDimensions: ["action_pattern", "decision_habit"],
    options: [
      { id: "q11_a", text: "先去試新點子，舊的之後找時間補完", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q11_b", text: "看哪個現在做起來有感覺，就先做哪個", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q11_c", text: "先把快完成的舊專案收尾，再考慮新點子", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["action_pattern", "decision_habit"] },
    ],
  },
  {
    id: "q12",
    version: ASSESSMENT_VERSION,
    scenario: "公司有一條行之有年的規定，明顯拖慢你手上的案子。你會？",
    context: "rules_vs_flexibility",
    sourceDimensions: ["action_pattern", "decision_habit", "thinking_pattern"],
    options: [
      { id: "q12_a", text: "先弄清楚這條規定當初為什麼存在、卡在哪", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "q12_b", text: "先採取能推進結果的替代做法，程序問題之後再處理", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["action_pattern", "decision_habit"] },
      { id: "q12_c", text: "這一案先依現行規定完成，之後再正式提出修改", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
    ],
  },
  {
    id: "q13",
    version: ASSESSMENT_VERSION,
    scenario: "你在規劃接下來三年的重心，有幾條路可走。你最看重哪一種？",
    context: "long_vs_short_term",
    sourceDimensions: ["action_pattern", "thinking_pattern"],
    options: [
      { id: "q13_a", text: "最能逼我升級、三年後回頭差距最大的路", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "q13_b", text: "我已經看懂遊戲規則、能按自己判斷走的路", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "q13_c", text: "和我相信的事一致、走得越久越值得的路", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "action_pattern"] },
    ],
  },
  {
    id: "q14",
    version: ASSESSMENT_VERSION,
    scenario: "朋友找你合夥一個新生意，回報可觀，但要先投入一筆不小的資金。你會？",
    context: "risk_vs_opportunity",
    sourceDimensions: ["action_pattern", "decision_habit", "thinking_pattern"],
    options: [
      { id: "q14_a", text: "先算清楚最壞情況賠多少，賠不起就不進場", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "q14_b", text: "小額先進場占個位置，同時繼續看別的機會", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["action_pattern", "decision_habit"] },
      { id: "q14_c", text: "評估後認為值得，就集中資源投入", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
    ],
  },
  {
    id: "q15",
    version: ASSESSMENT_VERSION,
    scenario: "好友做了一個你不認同的重大決定，來問你的看法。你會？",
    context: "expression_vs_relationship",
    sourceDimensions: ["action_pattern", "decision_habit", "thinking_pattern"],
    options: [
      { id: "q15_a", text: "先理解他的出發點，再說明我認為重要的原則", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "q15_b", text: "把我看到的風險具體說給他聽", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "q15_c", text: "先聽多問少說，狀況弄清楚之前不下判斷", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
    ],
  },
  {
    id: "q16",
    version: ASSESSMENT_VERSION,
    scenario: "你投入很久的位置出現強勁的競爭者，情勢對你不利。你會？",
    context: "compete_vs_exit",
    sourceDimensions: ["action_pattern", "decision_habit"],
    options: [
      { id: "q16_a", text: "開始物色別的舞台，把重心移往更有空間的地方", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q16_b", text: "正面應戰，加大投入把位置守下來", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "q16_c", text: "守住自己的職責與節奏，按原本的標準做完", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
    ],
  },
  {
    id: "q17",
    version: ASSESSMENT_VERSION,
    scenario: "你有一個放在心裡很久的個人目標，但眼前的現實條件不太允許。你會？",
    context: "ideal_vs_reality",
    sourceDimensions: ["action_pattern", "decision_habit"],
    options: [
      { id: "q17_a", text: "先從眼前能動手的部分玩起來，做多少算多少", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "q17_b", text: "不靠任何人，用自己的時間一點一點硬做出來", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "q17_c", text: "先顧好收入與生活，等條件成熟再說", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
    ],
  },
  {
    id: "q18",
    version: ASSESSMENT_VERSION,
    scenario: "你在考慮一個重要的轉變，想法在腦中轉了很久還沒有結論。你會？",
    context: "analysis_vs_action",
    sourceDimensions: ["action_pattern", "thinking_pattern"],
    options: [
      { id: "q18_a", text: "不再多想，直接動手做，做了才知道行不行", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "q18_b", text: "找人把想法說出來，越說越清楚再決定", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "q18_c", text: "繼續想，直到確定它值得、和我的信念一致", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
    ],
  },
];
