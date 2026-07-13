import Link from "next/link";

/** 首頁第八區：科學八字的角色。文案層級：C（依專案指令書第十一節）。 */
export function EightWordsSection() {
  return (
    <section className="border-b border-mist bg-ink text-paper">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          八字不是答案
          <br />
          而是一種人格假設模型
        </h2>
        <div className="mt-8 max-w-prose space-y-4 leading-relaxed text-mist">
          <p>科學決策保留八字架構，但不以出生資料直接替一個人下定論。</p>
          <p>
            八字符號模型用來建立人格底色的初始假設；
            行為作答與實際經驗，則用來比對與校正這個假設。
          </p>
          <p>
            我們不要求你先相信八字。我們關心的是：
            這套模型能不能協助你，看見真實的決策慣性。
          </p>
        </div>
        <Link
          href="/eightwords"
          className="mt-10 inline-block rounded-sm border border-gold px-6 py-3 text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          了解科學八字模型
        </Link>
      </div>
    </section>
  );
}
