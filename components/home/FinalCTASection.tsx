import Link from "next/link";

/** 首頁第十一區：最終 CTA。文案層級：C（依專案指令書第十一節）。 */
export function FinalCTASection() {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="font-serif text-2xl font-semibold leading-snug text-ink sm:text-4xl">
          你不需要先知道未來
          <br />
          你需要先看懂
          <br />
          現在的自己
        </h2>
        <Link
          href="/assessment"
          className="mt-10 inline-block rounded-sm bg-gold px-8 py-4 text-base font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          開始免費測驗
        </Link>
        <p className="mt-10 text-sm tracking-wide text-stone">
          修正現在，比預測未來更重要
        </p>
      </div>
    </section>
  );
}
