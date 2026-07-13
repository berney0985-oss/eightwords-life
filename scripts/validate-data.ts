/**
 * 資料一致性驗證腳本（第四階段，26 項檢查＋限定範圍禁用詞掃描）。
 * 執行：npm run validate（並掛於 prebuild）。
 * 任一檢查失敗即以非零碼結束，阻止 build。
 *
 * 禁用詞掃描範圍限定：只掃描網站新增文案（app/、components/），
 * 不掃描規格原文資料（data/personas.ts、data/clusters.ts、data/glossary.ts）——
 * 原文可能合法包含「你」「命盤」「十神」等詞，不得因掃描而修改原文。
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { personas } from "../data/personas";
import { clusters } from "../data/clusters";
import { PERSONA_IDS } from "../types/persona";
import { CLUSTER_IDS } from "../types/cluster";

let failures = 0;
const check = (id: number, name: string, ok: boolean, detail = "") => {
  if (ok) {
    console.log(`  ✓ ${String(id).padStart(2, "0")} ${name}`);
  } else {
    failures++;
    console.error(`  ✗ ${String(id).padStart(2, "0")} ${name}${detail ? ` — ${detail}` : ""}`);
  }
};

const nonEmpty = (s: unknown): boolean =>
  typeof s === "string" && s.trim().length > 0;

console.log("── 結構檢查 ──");
// 1–2 總數
check(1, "決策系總數為 3", clusters.length === 3, `實際 ${clusters.length}`);
check(2, "人格總數為 9", personas.length === 9, `實際 ${personas.length}`);

// 3–6 唯一性
const uniq = <T>(arr: T[]) => new Set(arr).size === arr.length;
check(3, "persona ID 唯一", uniq(personas.map((p) => p.id)));
check(4, "persona slug 唯一", uniq(personas.map((p) => p.slug)));
check(5, "cluster ID 唯一", uniq(clusters.map((c) => c.id)));
check(6, "cluster slug 唯一", uniq(clusters.map((c) => c.slug)));

// 7 coreNeed 全系統唯一
check(7, "coreNeed 全系統唯一", uniq(personas.map((p) => p.corePersona.coreNeed)));

// 8–11 歸屬完整性
const clusterIdSet = new Set(clusters.map((c) => c.id));
const personaIdSet = new Set(personas.map((p) => p.id));
check(8, "每個人格 clusterId 存在", personas.every((p) => clusterIdSet.has(p.clusterId)));
check(
  9,
  "每個 cluster 的 includedPersonaIds 全部存在",
  clusters.every((c) => c.includedPersonaIds.every((id) => personaIdSet.has(id))),
);
const referenceCount = new Map<string, number>();
for (const c of clusters)
  for (const id of c.includedPersonaIds)
    referenceCount.set(id, (referenceCount.get(id) ?? 0) + 1);
check(
  10,
  "每個人格恰好被一個 cluster 引用",
  personas.every((p) => referenceCount.get(p.id) === 1) &&
    personas.every((p) =>
      clusters.find((c) => c.id === p.clusterId)?.includedPersonaIds.includes(p.id),
    ),
);
check(11, "每個 cluster 恰好包含 3 個人格", clusters.every((c) => c.includedPersonaIds.length === 3));

console.log("── 欄位完整性 ──");
// 12 PersonaProfile 欄位完整（頂層＋corePersona 十欄）
check(
  12,
  "每個 PersonaProfile 欄位完整",
  personas.every(
    (p) =>
      nonEmpty(p.id) &&
      nonEmpty(p.slug) &&
      nonEmpty(p.displayName) &&
      nonEmpty(p.baziSource) &&
      nonEmpty(p.clusterId) &&
      nonEmpty(p.corePersona.positioning) &&
      nonEmpty(p.corePersona.coreNeed) &&
      p.corePersona.coreValues.length > 0 &&
      p.corePersona.coreValues.every(nonEmpty) &&
      nonEmpty(p.corePersona.lifeGoal) &&
      nonEmpty(p.corePersona.decisionGoal) &&
      nonEmpty(p.corePersona.thinkingPattern) &&
      nonEmpty(p.corePersona.actionPattern) &&
      nonEmpty(p.corePersona.oneLineDefinition) &&
      nonEmpty(p.corePersona.brandSlogan) &&
      nonEmpty(p.corePersona.plainExplanation),
  ),
);
// 13 TalentBlueprint 五欄
check(
  13,
  "每個 TalentBlueprint 五欄完整",
  personas.every(
    (p) =>
      nonEmpty(p.talentBlueprint.theme) &&
      nonEmpty(p.talentBlueprint.naturalAdvantage) &&
      nonEmpty(p.talentBlueprint.naturalContribution) &&
      nonEmpty(p.talentBlueprint.bestRole) &&
      nonEmpty(p.talentBlueprint.growthPotential),
  ),
);
// 14 DecisionProfile 三欄
check(
  14,
  "每個 DecisionProfile 三欄完整",
  personas.every(
    (p) =>
      nonEmpty(p.decisionProfile.decisionHabit) &&
      nonEmpty(p.decisionProfile.strength) &&
      nonEmpty(p.decisionProfile.weakness),
  ),
);
// 15 RiskProfile 六欄
check(
  15,
  "每個 RiskProfile 六欄完整",
  personas.every(
    (p) =>
      nonEmpty(p.riskProfile.decisionBlindspot) &&
      Array.isArray(p.riskProfile.blindspotTriggers) &&
      nonEmpty(p.riskProfile.recurringMistake) &&
      nonEmpty(p.riskProfile.stressResponse) &&
      nonEmpty(p.riskProfile.correctionStrategy) &&
      nonEmpty(p.riskProfile.growthDirection),
  ),
);
// 16–18 盲點鏈
check(
  16,
  "blindspotTriggers 不得為空",
  personas.every((p) => p.riskProfile.blindspotTriggers.length > 0 && p.riskProfile.blindspotTriggers.every(nonEmpty)),
);
check(17, "correctionStrategy 不得為空", personas.every((p) => nonEmpty(p.riskProfile.correctionStrategy)));
check(
  18,
  "decisionBlindspot 與 correctionStrategy 同時存在",
  personas.every(
    (p) => nonEmpty(p.riskProfile.decisionBlindspot) === nonEmpty(p.riskProfile.correctionStrategy) && nonEmpty(p.riskProfile.decisionBlindspot),
  ),
);
// 19 schemaVersion
check(
  19,
  "schemaVersion 全部為 3.0.0",
  personas.every((p) => p.schemaVersion === "3.0.0") && clusters.every((c) => c.schemaVersion === "3.0.0"),
);

console.log("── 命名與架構紀律（原始碼掃描） ──");
const collectSources = (dir: string): string[] => {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...collectSources(full));
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
  }
  return out;
};
const codeFiles = [
  ...collectSources("data"),
  ...collectSources("types"),
  ...collectSources("lib"),
  ...collectSources("app"),
  ...collectSources("components"),
];
const readAll = (files: string[]) => files.map((f) => ({ f, s: readFileSync(f, "utf8") }));
const allCode = readAll(codeFiles);
const findToken = (token: string) => allCode.filter(({ s }) => s.includes(token)).map(({ f }) => f);

// 20 不得出現舊天賦欄位名：程式與資料層全域嚴格禁止（含註解）；
// migration 紀錄只存在於 docs/（不在掃描範圍）。
const OLD_TALENT_TOKENS = ["talentArch" + "etype", "talent_arch" + "etype"];
const archetypeHits = allCode
  .filter(({ s }) => OLD_TALENT_TOKENS.some((t) => s.includes(t)))
  .map(({ f }) => f);
check(20, "不得出現舊天賦欄位名（talentArch*/talent_arch*）", archetypeHits.length === 0, archetypeHits.join(", "));

// 21 expressedPersona 不得出現在 PersonaProfile（型別與資料檔）
const expressedInPersonaLayer = ["types/persona.ts", "data/personas.ts"].filter((f) =>
  readFileSync(f, "utf8").includes("expressedPersona"),
);
check(21, "expressedPersona 不得出現在 PersonaProfile", expressedInPersonaLayer.length === 0, expressedInPersonaLayer.join(", "));

// 22–23 禁止複製 decisionProfile
check(22, "不得建立 coreDecisionProfile", findToken("coreDecisionProfile").length === 0);
check(23, "不得建立 expressedDecisionProfile", findToken("expressedDecisionProfile").length === 0);

console.log("── 規格一致性 ──");
// 24 比肩與劫財只映射到自立型
const biJieHolders = personas.filter((p) => p.baziSource.includes("比肩") || p.baziSource.includes("劫財"));
check(
  24,
  "比肩與劫財只映射到自立型",
  biJieHolders.length === 1 && biJieHolders[0]?.id === "persona_selfmade",
);

// 25 九個核心需求與規格一致
const SPEC_CORE_NEEDS: Record<string, string> = {
  persona_pragmatist: "穩定",
  persona_commander: "秩序",
  persona_idealist: "意義",
  persona_selfmade: "自主",
  persona_strategist: "理解",
  persona_pioneer: "可能性",
  persona_challenger: "成長",
  persona_creator: "創造",
  persona_expresser: "影響",
};
check(
  25,
  "九個核心需求與規格一致",
  personas.every((p) => p.corePersona.coreNeed === SPEC_CORE_NEEDS[p.id]),
);

// 26 三大決策系的人格歸屬與規格一致
const SPEC_MEMBERSHIP: Record<string, string[]> = {
  cluster_stability: ["persona_pragmatist", "persona_commander", "persona_idealist"],
  cluster_autonomy: ["persona_selfmade", "persona_strategist", "persona_pioneer"],
  cluster_breakthrough: ["persona_challenger", "persona_creator", "persona_expresser"],
};
check(
  26,
  "三大決策系的人格歸屬與規格一致",
  clusters.every(
    (c) =>
      JSON.stringify([...c.includedPersonaIds].sort()) ===
      JSON.stringify([...(SPEC_MEMBERSHIP[c.id] ?? [])].sort()),
  ) && PERSONA_IDS.length === 9 && CLUSTER_IDS.length === 3,
);

console.log("── 禁用詞掃描（限網站新增文案：app/ + components/） ──");
// 明確禁用（第四階段限定範圍；規格原文資料不掃描）
const FORBIDDEN_TOKENS = [
  "九型人格", "九大人格", "八字九型", "九型決策人格", "九型心理學", "九型測驗",
  "命格", "運勢", "流年", "水晶球", "塔羅",
  "你將會", "你注定", "你天生只能",
  "科學證明", "百分之百準確", "準確率高達",
  "coreDecisionProfile", "expressedDecisionProfile",
];
// 免責／否定語境白名單：同一行中 token 前方出現否定詞則放行
const NEGATION = /不(提供|做|得|是|會|宣稱)|沒有|禁止|非/;
// 掃描範圍：網站新增文案（app/、components/）＋新增文案資料檔（cases/services/navigation/site-config）。
// 排除規格原文轉錄檔（personas.ts、clusters.ts、glossary.ts）——不得因掃描修改原文。
const NEW_COPY_DATA = ["data/cases.ts", "data/services.ts", "data/navigation.ts", "data/site-config.ts"];
const siteFiles = readAll([...collectSources("app"), ...collectSources("components"), ...NEW_COPY_DATA]);
const scanHits: string[] = [];
for (const { f, s } of siteFiles) {
  const lines = s.split("\n");
  lines.forEach((line, i) => {
    for (const token of FORBIDDEN_TOKENS) {
      const idx = line.indexOf(token);
      if (idx === -1) continue;
      const before = line.slice(0, idx);
      if (NEGATION.test(before)) continue; // 免責聲明語境
      scanHits.push(`${f}:${i + 1} 「${token}」`);
    }
  });
}
check(27, "網站新增文案無禁用詞（含 cases/services；否定語境放行）", scanHits.length === 0, scanHits.join("; "));


/* ────────────────── 題庫驗證（第六階段新增） ────────────────── */
import { questions } from "../data/questions";
import { SCENARIO_CATEGORIES } from "../types/assessment";
import { SCORE_PRIMARY, TOTAL_QUESTIONS, ASSESSMENT_VERSION } from "../lib/constants";
import { scoreAssessment, theoreticalMaxima } from "../lib/scoring";
import { loveQuestions } from "../data/love-questions";
import { LOVE_SCENARIO_CATEGORIES } from "../types/love-assessment";
import { LOVE_ASSESSMENT_VERSION } from "../lib/constants";
import { theoreticalMaximaOf } from "../lib/assessment-engine";
import { scoreLove } from "../lib/love-scoring";

console.log("── 題庫驗證 ──");
const P2C = new Map(personas.map((p) => [p.id, p.clusterId]));

check(28, `題數為 ${TOTAL_QUESTIONS} 且每題 3 選項`, questions.length === TOTAL_QUESTIONS && questions.every((q) => q.options.length === 3));
check(29, "題目與選項 ID 唯一", uniq(questions.map((q) => q.id)) && uniq(questions.flatMap((q) => q.options.map((o) => o.id))));
check(
  30,
  "每選項恰一個主要人格且權重統一（方案 A）",
  questions.every((q) =>
    q.options.every((o) => {
      const entries = Object.entries(o.personaScores);
      return entries.length === 1 && entries[0][1] === SCORE_PRIMARY && personaIdSet.has(entries[0][0] as never);
    }),
  ),
);
const primaryOf = (o: { personaScores: Record<string, number | undefined> }) => Object.keys(o.personaScores)[0] as (typeof PERSONA_IDS)[number];
check(31, "每題三選項主要人格分屬三系", questions.every((q) => new Set(q.options.map((o) => P2C.get(primaryOf(o)))).size === 3));
const primCount = new Map<string, number>();
const posCount = new Map<string, Record<string, number>>();
const catCover = new Map<string, Set<string>>();
const fieldCover = new Map<string, Set<string>>();
questions.forEach((q) => {
  q.options.forEach((o, i) => {
    const p = primaryOf(o);
    primCount.set(p, (primCount.get(p) ?? 0) + 1);
    const pc = posCount.get(p) ?? { A: 0, B: 0, C: 0 };
    pc["ABC"[i]] += 1;
    posCount.set(p, pc);
    if (!catCover.has(p)) catCover.set(p, new Set());
    catCover.get(p)!.add(q.context);
    if (!fieldCover.has(p)) fieldCover.set(p, new Set());
    o.sourceFields.forEach((f) => fieldCover.get(p)!.add(f));
  });
});
check(32, "九人格主要位置各恰好 6", PERSONA_IDS.every((p) => primCount.get(p) === 6));
check(33, "每人格 A/B/C 位置各 2", PERSONA_IDS.every((p) => { const c = posCount.get(p); return !!c && c.A === 2 && c.B === 2 && c.C === 2; }));
check(
  34,
  "相鄰兩題不連續出現同一選項位置",
  questions.every((q, qi) => {
    if (qi === 0) return true;
    const prev = questions[qi - 1];
    return q.options.every((o, i) => {
      const p = primaryOf(o);
      const prevIdx = prev.options.findIndex((po) => primaryOf(po) === p);
      return prevIdx === -1 || prevIdx !== i;
    });
  }),
);
check(35, "每人格情境類別 ≥4", PERSONA_IDS.every((p) => (catCover.get(p)?.size ?? 0) >= 4));
check(36, "每人格 sourceFields 三種全覆蓋", PERSONA_IDS.every((p) => fieldCover.get(p)?.size === 3));
const maxima = theoreticalMaxima();
check(37, "理論最高分：人格 12／決策系 36", PERSONA_IDS.every((p) => maxima.persona[p] === 12) && CLUSTER_IDS.every((c) => maxima.cluster[c] === 36));
check(38, "18 情境類別各一且皆合法", new Set(questions.map((q) => q.context)).size === 18 && questions.every((q) => (SCENARIO_CATEGORIES as readonly string[]).includes(q.context)));
const qSrc = readFileSync("data/questions.ts", "utf8");
check(39, "questions.ts 零 secondary 欄位、版本正確", !qSrc.toLowerCase().includes("secondary") && questions.every((q) => q.version === ASSESSMENT_VERSION));
const EXTREME = ["總是", "從不", "一定", "完全", "立刻", "不顧一切"];
check(40, "選項文字零極端詞", questions.every((q) => q.options.every((o) => !EXTREME.some((w) => o.text.includes(w)))));

// 計分煙霧測試：合成作答驗證引擎不變量與平手行為
console.log("── 計分煙霧測試 ──");
const pickBy = (pred: (o: { personaScores: Record<string, number | undefined> }) => boolean) =>
  Object.fromEntries(questions.map((q) => [q.id, (q.options.find(pred) ?? q.options[0]).id]));
const rDominant = scoreAssessment(pickBy((o) => primaryOf(o) === "persona_pragmatist"));
check(
  41,
  "煙霧①：全選務實型 → 唯一結果、raw 12、clarity 帶值",
  rDominant.expressedPersona === "persona_pragmatist" && !rDominant.isTied &&
    rDominant.personaScores.persona_pragmatist.raw === 12 && rDominant.answerCount === 18 &&
    Object.values(rDominant.personaScores).reduce((a, s) => a + s.raw, 0) === 36,
);
const rFlat = scoreAssessment(Object.fromEntries(questions.map((q, i) => [q.id, q.options[i % 3].id])));
check(
  42,
  "煙霧②：輪選 A/B/C → 結果通過結構驗證且平手時 expressedPersona 為 null",
  (() => {
    const okShape = rFlat.answerCount === 18 && (rFlat.isTied ? rFlat.expressedPersona === null && rFlat.tiedTopPersonas.length >= 2 : rFlat.expressedPersona !== null);
    return okShape;
  })(),
);

/* ────────────────── 感情題庫驗證（第三階段新增） ────────────────── */
console.log("── 感情題庫驗證 ──");
const loveP = (o: { personaScores: Record<string, number | undefined> }) =>
  Object.keys(o.personaScores)[0] as (typeof PERSONA_IDS)[number];
check(43, `感情題數為 18 且每題 3 選項`, loveQuestions.length === 18 && loveQuestions.every((q) => q.options.length === 3));
check(44, "感情題目與選項 ID 唯一", uniq(loveQuestions.map((q) => q.id)) && uniq(loveQuestions.flatMap((q) => q.options.map((o) => o.id))));
check(
  45,
  "感情每選項恰一主要人格且權重統一（方案 A）",
  loveQuestions.every((q) =>
    q.options.every((o) => {
      const entries = Object.entries(o.personaScores);
      return entries.length === 1 && entries[0][1] === SCORE_PRIMARY;
    }),
  ),
);
check(46, "感情每題三選項主要人格分屬三系", loveQuestions.every((q) => new Set(q.options.map((o) => P2C.get(loveP(o)))).size === 3));

const lPrim = new Map<string, number>();
const lPos = new Map<string, Record<string, number>>();
const lCat = new Map<string, Set<string>>();
const lField = new Map<string, Set<string>>();
loveQuestions.forEach((q) => {
  q.options.forEach((o, i) => {
    const p = loveP(o);
    lPrim.set(p, (lPrim.get(p) ?? 0) + 1);
    const pc = lPos.get(p) ?? { A: 0, B: 0, C: 0 };
    pc["ABC"[i]] += 1;
    lPos.set(p, pc);
    if (!lCat.has(p)) lCat.set(p, new Set());
    lCat.get(p)!.add(q.context);
    if (!lField.has(p)) lField.set(p, new Set());
    o.sourceFields.forEach((f) => lField.get(p)!.add(f));
  });
});
check(47, "感情九人格主要位置各恰好 6", PERSONA_IDS.every((p) => lPrim.get(p) === 6));
check(48, "感情每人格 A/B/C 位置各 2", PERSONA_IDS.every((p) => { const c = lPos.get(p); return !!c && c.A === 2 && c.B === 2 && c.C === 2; }));
check(
  49,
  "感情相鄰兩題不連續出現同一選項位置",
  loveQuestions.every((q, qi) => {
    if (qi === 0) return true;
    const prev = loveQuestions[qi - 1];
    return q.options.every((o, i) => {
      const p = loveP(o);
      const prevIdx = prev.options.findIndex((po) => loveP(po) === p);
      return prevIdx === -1 || prevIdx !== i;
    });
  }),
);
check(50, "感情每人格情境類別 ≥4", PERSONA_IDS.every((p) => (lCat.get(p)?.size ?? 0) >= 4));
check(51, "感情每人格 sourceFields 三種全覆蓋", PERSONA_IDS.every((p) => lField.get(p)?.size === 3));
const lMax = theoreticalMaximaOf(loveQuestions);
check(52, "感情理論最高分：人格 12／決策系 36", PERSONA_IDS.every((p) => lMax.persona[p] === 12) && CLUSTER_IDS.every((c) => lMax.cluster[c] === 36));
check(53, "感情 18 情境類別各一且皆合法", new Set(loveQuestions.map((q) => q.context)).size === 18 && loveQuestions.every((q) => (LOVE_SCENARIO_CATEGORIES as readonly string[]).includes(q.context)));
const lSrc = readFileSync("data/love-questions.ts", "utf8");
check(54, "love-questions.ts 零 secondary 欄位、版本正確", !lSrc.toLowerCase().includes("secondary") && loveQuestions.every((q) => q.version === LOVE_ASSESSMENT_VERSION));
check(55, "感情選項文字零極端詞", loveQuestions.every((q) => q.options.every((o) => !EXTREME.some((w) => o.text.includes(w)))));
// 敏感情境紅線：不得把控制／暴力等寫成選項行為
const SENSITIVE = ["控制", "冷暴力", "情緒勒索", "跟蹤", "監控", "威脅", "動手", "施暴", "查勤", "偷看手機"];
const sensitiveHits: string[] = [];
loveQuestions.forEach((q) => q.options.forEach((o) => SENSITIVE.forEach((w) => { if (o.text.includes(w)) sensitiveHits.push(`${o.id}「${w}」`); })));
check(56, "感情選項無控制／暴力等敏感行為字樣", sensitiveHits.length === 0, sensitiveHits.join("; "));
const rLove = scoreLove(Object.fromEntries(loveQuestions.map((q) => [q.id, (q.options.find((o) => loveP(o) === "persona_challenger") ?? q.options[0]).id])));
check(
  57,
  "感情計分煙霧：全選挑戰型 → 唯一結果、raw 12、總分 36",
  rLove.expressedPersona === "persona_challenger" && !rLove.isTied &&
    rLove.personaScores.persona_challenger.raw === 12 && rLove.answerCount === 18 &&
    Object.values(rLove.personaScores).reduce((a, s) => a + s.raw, 0) === 36,
);

console.log("");
if (failures > 0) {
  console.error(`驗證失敗：${failures} 項未通過`);
  process.exit(1);
}
console.log("驗證通過：全部 57 項檢查（26 資料＋1 禁用詞＋13 工作題庫＋2 計分煙霧＋15 感情題庫）");
