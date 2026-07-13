/** 首頁第二區：人生為什麼總是在重播。文案層級：C（依專案指令書第十一節）。 */
const replays = [
  "你明明知道不適合，卻還是被同一種人吸引。",
  "你每次都說想離開，真正做決定時，卻又回到原本的位置。",
  "你總是在最有熱情時開始，在最需要堅持時放棄。",
];

export function ProblemSection() {
  return (
    <section className="border-b border-mist">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          人生為什麼總是在重播
        </h2>
        <div className="mt-8 space-y-6">
          {replays.map((line) => (
            <p key={line} className="max-w-prose leading-relaxed text-graphite">
              {line}
            </p>
          ))}
          <p className="max-w-prose leading-relaxed text-graphite">
            你不是沒有改變，只是每次都用同一套方式改變。
          </p>
        </div>
        <p className="mt-10 max-w-prose border-l-2 border-gold pl-4 leading-relaxed text-ink">
          問題通常不只是選錯，
          <br />
          而是你沒有看見，自己如何做選擇。
        </p>
      </div>
    </section>
  );
}
