"use client";

import { useState } from "react";
import type { DecisionInput, DecisionFreeOutput } from "@/types/decision-engine";
import { organizeDecision } from "@/lib/decision-engine";
import { Paywall } from "@/components/paywall/Paywall";

const EMPTY: DecisionInput = {
  problem: "",
  deadline: "",
  optionA: "",
  optionB: "",
  otherOptions: "",
  worstRisk: "",
  unacceptableCost: "",
  leaning: "",
};

const fieldCls =
  "w-full rounded-sm border border-mist bg-paper px-3 py-2 text-ink focus:border-gold focus:outline-none";
const labelCls = "block text-sm font-medium text-graphite";

/** 欄位（模組層級，避免在 render 內建立元件導致失焦／狀態重置）。 */
function Field({
  id,
  label,
  value,
  onChange,
  textarea,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelCls} htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea id={id} className={`mt-1 ${fieldCls}`} rows={2} value={value}
          onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      ) : (
        <input id={id} className={`mt-1 ${fieldCls}`} value={value}
          onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

/**
 * 決策引擎工具（client）。規則式整理，非 AI、無假 AI 動畫。
 * 免費輸出即時計算；完整分析為付費（人工），以誠實付費牆呈現。
 */
export function DecisionEngineTool() {
  const [input, setInput] = useState<DecisionInput>(EMPTY);
  const [output, setOutput] = useState<DecisionFreeOutput | null>(null);

  const set = (patch: Partial<DecisionInput>) => setInput((p) => ({ ...p, ...patch }));

  const run = () => setOutput(organizeDecision(input));

  return (
    <div>
      <div className="rounded-sm border border-mist bg-paper-raised p-6">
        <div className="space-y-4">
          <Field id="de-problem" label="你正在面對的問題" value={input.problem} onChange={(v) => set({ problem: v })} textarea placeholder="用一句話描述你正在決定什麼" />
          <Field id="de-deadline" label="決策期限" value={input.deadline} onChange={(v) => set({ deadline: v })} placeholder="例：本週內、這個月" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="de-a" label="選項 A" value={input.optionA} onChange={(v) => set({ optionA: v })} />
            <Field id="de-b" label="選項 B" value={input.optionB} onChange={(v) => set({ optionB: v })} />
          </div>
          <Field id="de-other" label="其他選項（可留空）" value={input.otherOptions} onChange={(v) => set({ otherOptions: v })} />
          <Field id="de-risk" label="最擔心的風險" value={input.worstRisk} onChange={(v) => set({ worstRisk: v })} textarea />
          <Field id="de-cost" label="無法接受的代價" value={input.unacceptableCost} onChange={(v) => set({ unacceptableCost: v })} textarea />
          <Field id="de-lean" label="目前最傾向的選項" value={input.leaning} onChange={(v) => set({ leaning: v })} />
        </div>
        <button type="button" onClick={run}
          className="mt-6 rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors hover:bg-gold-deep">
          整理我的決策
        </button>
        <p className="mt-3 text-xs leading-relaxed text-stone">
          這是一套規則式的整理工具，會依你填的內容即時整理，不是 AI、也不會替你做決定。
        </p>
      </div>

      {output && (
        <div className="mt-8 space-y-5">
          <Section title="問題重述">{output.restatement}</Section>
          <Section title="決策目標">{output.goal}</Section>
          <Section title="已知限制">
            <ul className="list-disc space-y-1 pl-5">
              {output.constraints.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </Section>
          <Section title="可逆性提示">{output.reversibilityHint}</Section>
          <Section title="一項盲點提醒">{output.blindspot}</Section>
          <Section title="一個下一步行動">{output.nextAction}</Section>

          <Paywall productId="decision_engine_full" />
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-sm border border-mist bg-paper-raised p-5">
      <h2 className="font-serif text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-2 max-w-prose text-sm leading-relaxed text-graphite">{children}</div>
    </section>
  );
}
