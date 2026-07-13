/**
 * 首頁第六區：底色與外顯雙層模型。文案層級：C（依 3.0.0 架構表述）。
 * 規則：不畫三層線性圖；無真假之分；天賦密碼附屬於人格底色。
 */
export function PersonaLayersSection() {
  return (
    <section className="border-b border-mist">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          同一個人
          <br className="sm:hidden" />
          可能有兩種不同的呈現
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-sm border border-mist bg-paper-raised p-6">
            <p className="text-xs font-medium tracking-[0.18em] text-gold">
              內在模型層
            </p>
            <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
              人格底色
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              深層需求、長期驅動、內在決策傾向。
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              回答：為什麼這樣做決策。
            </p>
            <div className="mt-5 border-t border-mist pt-4">
              <p className="text-xs text-stone">附屬模組</p>
              <p className="mt-1 text-sm font-medium text-ink">天賦密碼</p>
              <p className="mt-1 text-sm leading-relaxed text-graphite">
                人格底色自然延伸出的價值創造方式。
              </p>
            </div>
          </article>
          <article className="rounded-sm border border-mist bg-paper-raised p-6">
            <p className="text-xs font-medium tracking-[0.18em] text-gold">
              行為呈現層
            </p>
            <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
              外顯人格
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              行為與互動中，最容易被觀察到的決策方式。
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              回答：通常如何呈現決策。
            </p>
            <p className="mt-5 border-t border-mist pt-4 text-sm leading-relaxed text-graphite">
              由行為情境測驗辨識，是獨立的判定來源。
            </p>
          </article>
        </div>
        <p className="mt-8 max-w-prose leading-relaxed text-graphite">
          兩者可能相同，也可能不同。它們不是誰真誰假，
          而是同一個人的不同分析面向。
        </p>
      </div>
    </section>
  );
}
