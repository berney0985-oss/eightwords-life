/**
 * 題目卡：原生 radio（鍵盤方向鍵可用），選項按鈕 ≥44px 觸控高度。
 * 選項僅顯示情境與文字，不顯示任何計分資訊。
 * 型別採結構最小集，工作題目與感情題目皆相容。
 */
interface QuestionCardQuestion {
  id: string;
  scenario: string;
  options: ReadonlyArray<{ id: string; text: string }>;
}

export function QuestionCard({
  question,
  selectedOptionId,
  onSelect,
}: {
  question: QuestionCardQuestion;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-serif text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
        {question.scenario}
      </legend>
      <div className="mt-6 space-y-3">
        {question.options.map((opt, i) => {
          const checked = selectedOptionId === opt.id;
          return (
            <label
              key={opt.id}
              className={`flex min-h-[44px] cursor-pointer items-start gap-3 rounded-sm border p-4 transition-colors ${
                checked
                  ? "border-gold bg-gold-faint"
                  : "border-mist bg-paper-raised hover:border-stone"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={opt.id}
                checked={checked}
                onChange={() => onSelect(opt.id)}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--gold)]"
              />
              <span className="leading-relaxed text-ink">
                <span className="mr-2 text-sm text-stone">{"ABC"[i]}.</span>
                {opt.text}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
