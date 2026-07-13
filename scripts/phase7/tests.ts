/* 第七階段：平手六案例＋LocalStorage 損壞注入＋流程邏輯測試（tsx，polyfill localStorage） */
class LS {
  store = new Map<string, string>();
  getItem(k: string) { return this.store.has(k) ? (this.store.get(k) as string) : null; }
  setItem(k: string, v: string) { this.store.set(k, String(v)); }
  removeItem(k: string) { this.store.delete(k); }
}
// @ts-expect-error polyfill
globalThis.window = { localStorage: new LS(), addEventListener() {}, removeEventListener() {} };

import { questions } from "../../data/questions";
import { scoreAssessment } from "../../lib/scoring";
import { loadResult, saveResult, clearResult, loadProgress, saveProgress, clearProgress, getResultSnapshot } from "../../lib/storage";
import { STORAGE_KEY_RESULT, STORAGE_KEY_PROGRESS, SCHEMA_VERSION, ASSESSMENT_VERSION } from "../../lib/constants";
import { personas } from "../../data/personas";

const ls = (globalThis as unknown as { window: { localStorage: LS } }).window.localStorage;
let pass = 0, fail = 0;
const t = (name: string, cond: boolean, extra = "") => {
  if (cond) { pass++; console.log(`  ✓ ${name}${extra ? "｜" + extra : ""}`); }
  else { fail++; console.log(`  ✗ ${name}${extra ? "｜" + extra : ""}`); }
};
const primaryOf = (o: { personaScores: Record<string, number | undefined> }) => Object.keys(o.personaScores)[0];
const optOf = (qid: string, pid: string) => {
  const q = questions.find((x) => x.id === qid)!;
  return q.options.find((o) => primaryOf(o) === pid)!.id;
};
const fillRest = (answers: Record<string, string>, plan: Record<string, string>) => {
  for (const [qid, pid] of Object.entries(plan)) answers[qid] = optOf(qid, pid);
  return answers;
};

console.log("── 五／平手六案例 ──");
// 1 唯一最高
const a1: Record<string, string> = {};
for (const q of questions) a1[q.id] = (q.options.find((o) => primaryOf(o) === "persona_pragmatist") ?? q.options[0]).id;
const r1 = scoreAssessment(a1);
t("① 唯一最高：務實 12、無平手", r1.expressedPersona === "persona_pragmatist" && !r1.isTied && r1.tieType === "none" && r1.personaScores.persona_pragmatist.raw === 12);

// 2 兩(多)人格同分、決策系可區分（prag6/self6/chall6 → 突破系最高 → 挑戰）
const a2 = fillRest({}, { q01:"persona_pragmatist", q02:"persona_pragmatist", q08:"persona_pragmatist",
  q03:"persona_selfmade", q09:"persona_selfmade", q17:"persona_selfmade",
  q06:"persona_challenger", q12:"persona_challenger", q13:"persona_challenger",
  q04:"persona_commander", q16:"persona_commander", q05:"persona_pioneer", q14:"persona_pioneer",
  q07:"persona_expresser", q18:"persona_expresser", q10:"persona_idealist", q15:"persona_idealist", q11:"persona_creator" });
const r2 = scoreAssessment(a2);
t("② 三型同分(務實/自立/挑戰)、決策系可區分：穩定系最高 → 務實型、isTied=false",
  r2.expressedPersona === "persona_pragmatist" && !r2.isTied && r2.tieType === "none",
  `系分 穩${r2.clusterScores.cluster_stability.raw}/自${r2.clusterScores.cluster_autonomy.raw}/突${r2.clusterScores.cluster_breakthrough.raw}`);

// 3 跨系同分且決策系也同分 → cluster_tie（strat6/chall6，auto=brk=14）
const a3 = fillRest({}, { q04:"persona_strategist", q06:"persona_strategist", q07:"persona_strategist",
  q01:"persona_challenger", q12:"persona_challenger", q14:"persona_challenger",
  q02:"persona_selfmade", q03:"persona_selfmade", q05:"persona_pioneer", q10:"persona_pioneer",
  q08:"persona_creator", q11:"persona_creator", q15:"persona_expresser", q18:"persona_expresser",
  q09:"persona_idealist", q16:"persona_commander", q17:"persona_pragmatist", q13:"persona_idealist" });
const r3 = scoreAssessment(a3);
t("③ 跨系且系同分：isTied、tieType=cluster_tie、expressed=null",
  r3.isTied && r3.tieType === "cluster_tie" && r3.expressedPersona === null &&
  JSON.stringify([...r3.tiedTopPersonas].sort()) === JSON.stringify(["persona_challenger","persona_strategist"]),
  `系分 自${r3.clusterScores.cluster_autonomy.raw}=突${r3.clusterScores.cluster_breakthrough.raw}`);

// 4 同系平手 → persona_tie（prag6/comm6）
const a4 = fillRest({}, { q01:"persona_pragmatist", q02:"persona_pragmatist", q08:"persona_pragmatist",
  q03:"persona_commander", q04:"persona_commander", q05:"persona_commander",
  q06:"persona_strategist", q07:"persona_expresser", q09:"persona_selfmade", q10:"persona_creator",
  q11:"persona_creator", q12:"persona_challenger", q13:"persona_idealist", q14:"persona_challenger",
  q15:"persona_expresser", q16:"persona_pioneer", q17:"persona_selfmade", q18:"persona_idealist" });
const r4 = scoreAssessment(a4);
t("④ 同系平手：tieType=persona_tie、並列=務實+領導",
  r4.isTied && r4.tieType === "persona_tie" &&
  JSON.stringify([...r4.tiedTopPersonas].sort()) === JSON.stringify(["persona_commander","persona_pragmatist"]));

// 5 跨系平手（系可區分版）已由②涵蓋；此處驗證第二名/清晰度行為
t("⑤ 跨系平手經系區分後 clarity 存在且非負", !r2.isTied && r2.clarity.value >= 0 && ["low","medium","high"].includes(r2.clarity.band));

// 6 九型高度平分 → full_tie（每人格恰 2 題，透過回溯匹配）
const byPersona: Record<string, string[]> = {};
for (const q of questions) for (const o of q.options) {
  const p = primaryOf(o); (byPersona[p] ??= []).push(q.id);
}
const pids = Object.keys(byPersona);
const used = new Set<string>(); const chosen: Record<string, string[]> = {};
function bt(i: number): boolean {
  if (i === pids.length) return true;
  const p = pids[i];
  const qs = byPersona[p];
  for (let x = 0; x < qs.length; x++) for (let y = x + 1; y < qs.length; y++) {
    if (used.has(qs[x]) || used.has(qs[y])) continue;
    used.add(qs[x]); used.add(qs[y]); chosen[p] = [qs[x], qs[y]];
    if (bt(i + 1)) return true;
    used.delete(qs[x]); used.delete(qs[y]); delete chosen[p];
  }
  return false;
}
const matched = bt(0);
const a6: Record<string, string> = {};
if (matched) for (const [p, qs] of Object.entries(chosen)) for (const qid of qs) a6[qid] = optOf(qid, p);
const r6 = matched ? scoreAssessment(a6) : null;
t("⑥ 九型全 4：full_tie、九型並列、expressed=null",
  !!r6 && r6.isTied && r6.tieType === "full_tie" && r6.tiedTopPersonas.length === 9 && r6.expressedPersona === null);
const badNames = r6 ? r6.tiedTopPersonas.filter((pid) => !personas.some((p) => p.id === pid)) : ["x"];
t("⑥b 並列名單全為合法人格 ID（UI 不會出現空白名稱）", badNames.length === 0);

console.log("── 六／LocalStorage 損壞注入（12 案）──");
const validResult = scoreAssessment(a1);
const inject = (name: string, key: string, raw: string, loader: () => unknown) => {
  ls.setItem(key, raw);
  let crashed = false; let out: unknown = "sentinel";
  try { out = loader(); } catch { crashed = true; }
  const cleared = ls.getItem(key) === null;
  t(name, !crashed && out === null && cleared, `null=${out === null} 清除=${cleared}`);
};
const R = STORAGE_KEY_RESULT, P = STORAGE_KEY_PROGRESS;
const mut = (patch: Record<string, unknown>) => JSON.stringify({ ...validResult, ...patch });
inject("1 非 JSON 字串", R, "not-json{{{", loadResult);
inject("2 空物件", R, "{}", loadResult);
inject("3 缺 schemaVersion", R, (() => { const c = JSON.parse(JSON.stringify(validResult)) as Record<string, unknown>; delete c.schemaVersion; return JSON.stringify(c); })(), loadResult);
inject("4 schemaVersion 錯誤", R, mut({ schemaVersion: "9.9.9" }), loadResult);
inject("5 assessmentVersion 錯誤", R, mut({ assessmentVersion: "0.0.1" }), loadResult);
inject("6 answers 錯誤型別", P, JSON.stringify({ schemaVersion: SCHEMA_VERSION, assessmentVersion: ASSESSMENT_VERSION, answers: [1,2,3], currentIndex: 0, startedAt: "x", updatedAt: "x" }), loadProgress);
inject("7 currentIndex 超出範圍", P, JSON.stringify({ schemaVersion: SCHEMA_VERSION, assessmentVersion: ASSESSMENT_VERSION, answers: { q01: "q01_a" }, currentIndex: 999, startedAt: "x", updatedAt: "x" }), loadProgress);
inject("8 expressedPersona 不存在 ID", R, mut({ expressedPersona: "persona_ghost" }), loadResult);
inject("9 isTied 與 expressedPersona 矛盾", R, mut({ isTied: true, tiedTopPersonas: ["persona_pragmatist","persona_commander"] }), loadResult);
inject("10 isTied=true 但 tiedTopPersonas 空", R, mut({ isTied: true, expressedPersona: null, tiedTopPersonas: [] }), loadResult);
inject("11 personaScores 缺人格", R, (() => { const c = JSON.parse(mut({})); delete c.personaScores.persona_creator; return JSON.stringify(c); })(), loadResult);
inject("12 clarity 超出合理範圍", R, mut({ clarity: { value: 999, band: "high" } }), loadResult);

console.log("── 四／流程邏輯層測試 ──");
// A 全新完整作答
clearResult(); clearProgress();
saveProgress({ schemaVersion: SCHEMA_VERSION, assessmentVersion: ASSESSMENT_VERSION, answers: a1, currentIndex: 17, startedAt: "s", updatedAt: "u" });
saveResult(scoreAssessment(a1)); clearProgress();
t("A 完成後：結果 key 存在、進度 key 已清除", loadResult() !== null && ls.getItem(P) === null);
// B 中途續答
clearResult(); clearProgress();
const seven: Record<string, string> = {};
questions.slice(0, 7).forEach((q) => { seven[q.id] = q.options[0].id; });
saveProgress({ schemaVersion: SCHEMA_VERSION, assessmentVersion: ASSESSMENT_VERSION, answers: seven, currentIndex: 6, startedAt: "s", updatedAt: "u" });
const pb = loadProgress();
t("B 續答：進度保留、回到第 7 題、答案保留", !!pb && pb.currentIndex === 6 && Object.keys(pb.answers).length === 7 && pb.answers.q01 === questions[0].options[0].id);
// C 返回修改答案 → 最終計分不同
const base: Record<string, string> = {}; questions.forEach((q) => { base[q.id] = q.options[0].id; });
const modified = { ...base, q06: questions[5].options[1].id };
const rBase = scoreAssessment(base); const rMod = scoreAssessment(modified);
const diff = JSON.stringify(rBase.personaScores) !== JSON.stringify(rMod.personaScores);
t("C 修改答案後：以最終答案計分（分數確實改變）", diff && rMod.answerCount === 18);
// D 重新測驗：清舊結果建新進度
saveResult(rBase);
clearProgress(); clearResult();
saveProgress({ schemaVersion: SCHEMA_VERSION, assessmentVersion: ASSESSMENT_VERSION, answers: {}, currentIndex: 0, startedAt: "s", updatedAt: "u" });
t("D 重新測驗序列：舊結果已清、新進度建立", loadResult() === null && loadProgress() !== null);
// E 結果頁三態
clearResult(); clearProgress();
t("E1 無結果：snapshot 為 null（Empty State）", getResultSnapshot() === null);
saveResult(rBase);
t("E2 有結果：snapshot 有效", getResultSnapshot() !== null);
ls.setItem(R, "corrupted%%%");
t("E3 損壞結果：load 清除並回 null", loadResult() === null && ls.getItem(R) === null);

console.log("── 快照穩定性 ──");
clearResult(); saveResult(rBase);
const s1 = getResultSnapshot(); const s2 = getResultSnapshot();
t("同一 raw 值回傳同一參考（useSyncExternalStore 不會無限重繪）", s1 === s2 && s1 !== null);

console.log(`\n結果：${pass} 通過／${fail} 失敗`);
if (fail > 0) process.exit(1);
