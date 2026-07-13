import Link from "next/link";
import { siteConfig } from "@/data/site-config";

/**
 * 首頁 Hero。先建立品牌認知（這是什麼），再引導選擇分析方式。
 * 主標為品牌標語；副標一句話定位；不以八字為主視覺。
 */
export function HeroSection() {
  return (
    <section className="border-b border-mist bg-ink text-paper">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-serif text-sm tracking-[0.2em] text-stone">
          科學決策　DECISION SCIENCE LAB
        </p>
        <h1 className="mt-5 font-serif text-3xl font-semibold leading-snug sm:text-5xl sm:leading-tight">
          修正現在
          <br />
          比預測未來更重要
        </h1>
        <p className="mt-8 max-w-prose leading-relaxed text-mist">
          從工作、感情、科學八字到決策工具，幫助你理解自己的決策模式。
        </p>
        <p className="mt-4 max-w-prose leading-relaxed text-stone">
          {siteConfig.brandStatement}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#entries"
            className="rounded-sm bg-gold px-6 py-3 text-center text-base font-medium text-paper transition-colors hover:bg-gold-deep"
          >
            開始免費分析
          </a>
          <Link
            href="/why-not-fortune-telling"
            className="rounded-sm border border-paper/40 px-6 py-3 text-center text-base text-paper transition-colors hover:bg-ink-soft"
          >
            為什麼不是算命？
          </Link>
        </div>
      </div>
    </section>
  );
}
