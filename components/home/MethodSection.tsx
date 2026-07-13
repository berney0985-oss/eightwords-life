/** 首頁第七區：分析方法。文案層級：C（依專案指令書第十一節）。 */
const modules = [
  { title: "行為情境", body: "觀察你在具體情境中的選擇方式。" },
  { title: "外顯決策風格", body: "辨識目前最常呈現的思考與行動模式。" },
  { title: "人格底色模型", body: "建立長期核心需求與內在驅動的初始假設。" },
  {
    title: "實際情境校正",
    body: "將分析放回工作、感情、金錢、合作與人生選擇中檢查。",
  },
];

export function MethodSection() {
  return (
    <section className="border-b border-mist bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          我們不只看你選了什麼
          <br />
          也看你為什麼這樣選
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => (
            <article key={m.title} className="rounded-sm border border-mist bg-paper p-5">
              <h3 className="font-serif text-lg font-semibold text-ink">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">{m.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
