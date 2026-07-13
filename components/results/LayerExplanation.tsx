/**
 * 結果頁第四段：不同分析層說明（固定文案，業主裁決）。
 * 禁用：更深層／較高層／真正人格／完整的你。
 */
export function LayerExplanation() {
  return (
    <section className="mt-10 rounded-sm border border-mist bg-paper-raised p-6">
      <h2 className="font-serif text-xl font-semibold text-ink">不同分析層</h2>
      <div className="mt-4 max-w-prose space-y-3 text-sm leading-relaxed text-graphite">
        <p>
          本次測驗辨識的是<strong className="font-medium text-ink">外顯人格</strong>——
          你目前在行為情境作答中，最常呈現的決策方式。
        </p>
        <p>
          <strong className="font-medium text-ink">人格底色</strong>描述的是長期核心需求與內在決策驅動；
          <strong className="font-medium text-ink">天賦密碼</strong>描述的是人格底色最自然的價值創造方式。
        </p>
        <p>
          三者回答不同問題。外顯人格不是較淺或較假的人格，人格底色也不是唯一真實人格。
          V1 測驗不判定人格底色，也不產生天賦密碼結果。
        </p>
      </div>
    </section>
  );
}
