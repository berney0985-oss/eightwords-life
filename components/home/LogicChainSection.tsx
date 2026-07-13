/** 首頁第三區：一個決定不是突然發生的。文案層級：C；邏輯鏈依規格 §1.5。 */
const chain = [
  "核心需求",
  "思考模式",
  "行動模式",
  "決策慣性",
  "決策盲點",
  "重複錯誤",
  "修正策略",
];

export function LogicChainSection() {
  return (
    <section className="border-b border-mist bg-paper-raised">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          一個決定
          <br className="sm:hidden" />
          不是突然發生的
        </h2>
        <ol className="mt-10 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {chain.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-sm border border-mist bg-paper px-3 py-2 text-sm text-ink">
                {step}
              </span>
              {i < chain.length - 1 && (
                <span aria-hidden="true" className="text-gold">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-10 max-w-prose space-y-4 leading-relaxed text-graphite">
          <p>決策慣性本身不是缺點，它是大腦提高效率的預設路徑。</p>
          <p>
            真正的問題是：當情境改變，你仍然使用同一套方法。
          </p>
        </div>
      </div>
    </section>
  );
}
