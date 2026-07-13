/**
 * 感情分析題庫（loveAssessmentVersion "love-1.0.0"，題庫審查包 v1）。
 * 與工作題庫獨立；共用九人格／三系／方案 A 計分／平手／clarity。
 * 平衡保證（validate-love 鎖定）：九人格主要位各 6、A/B/C 各 2、每題三系各一、
 * 每人格情境類別 6（皆相異）、每人格 sourceFields 三種全覆蓋、人格上限 12、決策系上限 36。
 * 敏感情境（衝突、嫉妒、界線、分手）一律以健康的決策風格呈現，
 * 不得將控制、冷暴力、情緒勒索、暴力、跟蹤寫成人格特色或正常偏好。
 */

import type { LoveAssessmentQuestion } from "@/types/love-assessment";
import { SCORE_PRIMARY, LOVE_ASSESSMENT_VERSION } from "@/lib/constants";

export const loveQuestions: LoveAssessmentQuestion[] = [
  {
    id: "love_q01",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "你和一個曖昧對象相處一陣子了，關係還沒有明確定義。你通常會？",
    context: "love_ambiguity",
    sourceDimensions: ["thinking_pattern"],
    options: [
      { id: "love_q01_a", text: "主動把話講開，把關係要往哪走說清楚", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "love_q01_b", text: "順著相處的默契慢慢感覺，讓關係自然成形", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "love_q01_c", text: "先觀察對方的態度與訊號，想清楚再決定要不要挑明", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
    ],
  },
  {
    id: "love_q02",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "當你在一段關係裡感到不安時，你比較可能？",
    context: "love_security",
    sourceDimensions: ["thinking_pattern"],
    options: [
      { id: "love_q02_a", text: "回到你們在一起的初衷，確認彼此還在同一條路上", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "love_q02_b", text: "直接把不安說出來，讓對方知道你需要什麼", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "love_q02_c", text: "先靠自己把情緒穩住，不想把不安全丟給對方", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
    ],
  },
  {
    id: "love_q03",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "對方希望你們的關係更進一步、給出明確承諾。你會？",
    context: "love_commitment",
    sourceDimensions: ["thinking_pattern"],
    options: [
      { id: "love_q03_a", text: "先看實際生活與條件穩不穩得住，再談承諾", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "love_q03_b", text: "想保留一些彈性，不急著把每件事都定下來", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
      { id: "love_q03_c", text: "把它當成要一起面對的事，願意往前跨一步", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["thinking_pattern"] },
    ],
  },
  {
    id: "love_q04",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "你和伴侶因為一件事吵起來了，當下你通常會？",
    context: "love_conflict",
    sourceDimensions: ["action_pattern"],
    options: [
      { id: "love_q04_a", text: "把想法直接講出來，把問題攤開來談", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "love_q04_b", text: "想先講好我們該怎麼談、怎麼收尾", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "love_q04_c", text: "先讓彼此冷靜、把空間拉開，換個時間再談", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
    ],
  },
  {
    id: "love_q05",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "有件放在心裡的事想跟伴侶談，你會怎麼開口？",
    context: "love_communication",
    sourceDimensions: ["action_pattern", "decision_habit"],
    options: [
      { id: "love_q05_a", text: "從你們共同在乎的價值談起，讓對方懂這對你的意義", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "love_q05_b", text: "直接說重點，把自己的感受與需要講明白", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "love_q05_c", text: "先想好怎麼說、預想對方反應，再挑時機談", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
    ],
  },
  {
    id: "love_q06",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "伴侶最近想要多一點自己的時間和空間，你會？",
    context: "love_space",
    sourceDimensions: ["action_pattern", "decision_habit"],
    options: [
      { id: "love_q06_a", text: "覺得很正常，你自己也需要空間，各自過得好也重要", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "love_q06_b", text: "把它看成關係要調整的地方，主動去面對", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "love_q06_c", text: "回到你們對關係的想像，思考這對彼此的意義", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
    ],
  },
  {
    id: "love_q07",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "對方有件事沒有第一時間告訴你，你發現後會？",
    context: "love_trust",
    sourceDimensions: ["decision_habit", "thinking_pattern"],
    options: [
      { id: "love_q07_a", text: "先了解前因後果，弄清楚發生什麼再反應", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "love_q07_b", text: "想跟對方把什麼事該說、界線在哪重新講清楚", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "love_q07_c", text: "直接說出你的在意，讓對方知道這讓你不舒服", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
    ],
  },
  {
    id: "love_q08",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "看到伴侶和某個人互動讓你有點吃味，你會？",
    context: "love_jealousy",
    sourceDimensions: ["decision_habit", "action_pattern"],
    options: [
      { id: "love_q08_a", text: "把它當成自己要處理的情緒，正面去理解它", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "love_q08_b", text: "看實際上有沒有問題，沒有的話就不放大它", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "love_q08_c", text: "提醒自己關係不用綁太緊，給彼此一些餘地", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
    ],
  },
  {
    id: "love_q09",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "你遇到低潮、需不需要靠伴侶幫忙時，你偏向？",
    context: "love_dependence",
    sourceDimensions: ["action_pattern", "thinking_pattern", "decision_habit"],
    options: [
      { id: "love_q09_a", text: "順著當下的感覺，想靠近就靠近、想說就說", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["action_pattern"] },
      { id: "love_q09_b", text: "覺得能互相扶持正是關係的意義，願意讓對方參與", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "love_q09_c", text: "傾向先自己撐住，真的需要才開口", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
    ],
  },
  {
    id: "love_q10",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "你們在討論關係裡的一些界線（例如報備、相處規則）。你會？",
    context: "love_rules",
    sourceDimensions: ["thinking_pattern", "decision_habit"],
    options: [
      { id: "love_q10_a", text: "希望保留各自的空間，界線少一點、彼此信任就好", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "love_q10_b", text: "願意一起把難談的界線談開，即使過程不太舒服", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "love_q10_c", text: "傾向把規則講清楚，大家照著走比較安心", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
    ],
  },
  {
    id: "love_q11",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "關係走得很不順、也想過要不要結束時，你會？",
    context: "love_breakup",
    sourceDimensions: ["decision_habit", "thinking_pattern", "action_pattern"],
    options: [
      { id: "love_q11_a", text: "冷靜評估實際狀況，看這段關係還撐不撐得下去", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "love_q11_b", text: "想清楚問題到底出在哪、有沒有解，再決定", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "love_q11_c", text: "把心裡的話講出來，讓彼此至少把話說清楚", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["action_pattern", "thinking_pattern"] },
    ],
  },
  {
    id: "love_q12",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "談到未來（同居、結婚、長期規劃）時，你比較會？",
    context: "love_future",
    sourceDimensions: ["action_pattern", "thinking_pattern", "decision_habit"],
    options: [
      { id: "love_q12_a", text: "想把時程與步驟排清楚，一步一步來", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["action_pattern", "thinking_pattern"] },
      { id: "love_q12_b", text: "想先保留幾種可能，不急著鎖定唯一版本", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "love_q12_c", text: "把未來當成要一起努力的目標，願意去拚", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["action_pattern", "thinking_pattern"] },
    ],
  },
  {
    id: "love_q13",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "關於你們之間的金錢（分帳、共同支出）你偏向？",
    context: "love_money",
    sourceDimensions: ["decision_habit", "action_pattern", "thinking_pattern"],
    options: [
      { id: "love_q13_a", text: "不太想被規則綁，看當下情況與心意來", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["decision_habit"] },
      { id: "love_q13_b", text: "先把數字和方式算清楚，弄懂再決定怎麼分", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["action_pattern", "thinking_pattern"] },
      { id: "love_q13_c", text: "訂一套清楚的分擔方式，照著走", personaScores: { persona_commander: SCORE_PRIMARY }, sourceFields: ["decision_habit", "action_pattern"] },
    ],
  },
  {
    id: "love_q14",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "伴侶和你的家人之間出現一些為難，你會？",
    context: "love_family",
    sourceDimensions: ["decision_habit", "action_pattern", "thinking_pattern"],
    options: [
      { id: "love_q14_a", text: "先搞清楚雙方各自在意什麼，再想怎麼調解", personaScores: { persona_strategist: SCORE_PRIMARY }, sourceFields: ["decision_habit", "action_pattern"] },
      { id: "love_q14_b", text: "順著感覺去緩和氣氛，用自己的方式化解", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
      { id: "love_q14_c", text: "回到家人與伴侶對你都重要的核心，找平衡", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["action_pattern", "thinking_pattern"] },
    ],
  },
  {
    id: "love_q15",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "當你在關係裡有個需求還沒被滿足，你通常？",
    context: "love_expressing_needs",
    sourceDimensions: ["decision_habit", "action_pattern", "thinking_pattern"],
    options: [
      { id: "love_q15_a", text: "直接說出來，讓對方清楚知道你要什麼", personaScores: { persona_expresser: SCORE_PRIMARY }, sourceFields: ["decision_habit", "action_pattern"] },
      { id: "love_q15_b", text: "能自己解決的先自己來，未必要對方一起處理", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["action_pattern", "thinking_pattern"] },
      { id: "love_q15_c", text: "挑實際可行的方式提，讓需求容易被滿足", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["thinking_pattern", "decision_habit"] },
    ],
  },
  {
    id: "love_q16",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "為了這段關係，需要你讓步或犧牲一些自己的東西時，你會？",
    context: "love_sacrifice",
    sourceDimensions: ["action_pattern", "thinking_pattern", "decision_habit"],
    options: [
      { id: "love_q16_a", text: "盡量找兩全的方式，不想把任何一邊放掉", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["action_pattern", "thinking_pattern"] },
      { id: "love_q16_b", text: "看這個讓步值不值得、符不符合你們的價值", personaScores: { persona_idealist: SCORE_PRIMARY }, sourceFields: ["decision_habit", "action_pattern"] },
      { id: "love_q16_c", text: "憑當下的心意決定，願意就給、不勉強自己", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["action_pattern", "thinking_pattern"] },
    ],
  },
  {
    id: "love_q17",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "關係進入平穩期、少了點新鮮感時，你偏向？",
    context: "love_novelty_stability",
    sourceDimensions: ["decision_habit", "action_pattern", "thinking_pattern"],
    options: [
      { id: "love_q17_a", text: "主動製造一起成長的新目標，讓關係往前", personaScores: { persona_challenger: SCORE_PRIMARY }, sourceFields: ["decision_habit", "action_pattern"] },
      { id: "love_q17_b", text: "各自去發展自己的生活，關係自然有新養分", personaScores: { persona_selfmade: SCORE_PRIMARY }, sourceFields: ["decision_habit", "action_pattern"] },
      { id: "love_q17_c", text: "覺得穩定本身就很好，不太需要刻意求新", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["action_pattern", "thinking_pattern"] },
    ],
  },
  {
    id: "love_q18",
    version: LOVE_ASSESSMENT_VERSION,
    scenario: "關係裡的小問題累積了一陣子，你通常會？",
    context: "love_problem_handling",
    sourceDimensions: ["decision_habit", "action_pattern"],
    options: [
      { id: "love_q18_a", text: "換個方式、換個角度，試著鬆動卡住的地方", personaScores: { persona_pioneer: SCORE_PRIMARY }, sourceFields: ["decision_habit", "action_pattern"] },
      { id: "love_q18_b", text: "挑最實際、最該先處理的那個問題著手", personaScores: { persona_pragmatist: SCORE_PRIMARY }, sourceFields: ["decision_habit", "action_pattern"] },
      { id: "love_q18_c", text: "憑感覺找一個切入點，先把氣氛打開再說", personaScores: { persona_creator: SCORE_PRIMARY }, sourceFields: ["decision_habit", "action_pattern"] },
    ],
  },
];
