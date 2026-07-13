import Link from "next/link";

/** 首頁靠近 Footer 前的品牌故事引導區。 */
export function FounderTeaser() {
  return (
    <section className="border-b border-mist">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          這套系統是如何開始的
        </h2>
        <p className="mt-4 max-w-prose leading-relaxed text-graphite">
          科學決策最初從八字與人格結構的研究開始，但真正想處理的，
          不是預測未來，而是一個人為什麼會反覆做出相似的選擇。
        </p>
        <Link
          href="/founder"
          className="mt-8 inline-block rounded-sm border border-ink px-6 py-3 text-ink transition-colors hover:bg-mist"
        >
          為什麼會有科學決策
        </Link>
      </div>
    </section>
  );
}
