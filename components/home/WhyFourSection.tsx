/** 首頁「為什麼有四種分析？」說明區。建立「科學決策＝平台」認知。 */
const items = [
  { title: "工作分析", body: "看你在工作情境下的外顯決策模式。" },
  { title: "感情分析", body: "看你在感情情境下的外顯決策模式。" },
  { title: "科學八字分析", body: "建立你的人格底色模型。" },
  { title: "決策引擎", body: "整理你當前面臨的重要決策。" },
];

export function WhyFourSection() {
  return (
    <section className="border-b border-mist bg-paper-raised">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">為什麼有四種分析？</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-graphite">
          方法不同，目的一致：不是預測未來，而是理解你如何做決定。
        </p>
        <dl className="mt-8 space-y-5">
          {items.map((x) => (
            <div key={x.title} className="border-l-2 border-gold/50 pl-4">
              <dt className="font-serif text-lg font-medium text-ink">{x.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-graphite">{x.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
