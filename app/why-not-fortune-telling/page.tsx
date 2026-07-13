import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "為什麼不是算命？",
  description:
    "科學八字與一般八字差在哪？我不預測未來，我不做流年，我不論斷吉凶。我研究的，是你的決策模式。",
  alternates: { canonical: "/why-not-fortune-telling" },
};

const points: { title: string; body: string }[] = [
  {
    title: "我不預測未來",
    body: "這套系統不告訴你未來會發生什麼。它幫助你理解自己現在如何做選擇。",
  },
  {
    title: "我不做流年",
    body: "我不做流年推算，也不用時間去預言你哪一年會好、哪一年會差。",
  },
  {
    title: "我不論斷吉凶",
    body: "沒有好命與壞命，也沒有吉凶論斷。人格底色只描述你的決策傾向，沒有高低好壞。",
  },
  {
    title: "我研究的是決策模式",
    body: "我把八字裡真正有價值的部分留下——能描述一個人決策傾向的結構，用來理解你為什麼會做出現在的選擇。",
  },
];

/**
 * 差異化頁：科學八字 vs 一般八字。
 * 內容完全符合誠信限制：不宣稱八字經科學證明、不預測、不論吉凶；只做定位區隔。
 */
export default function WhyNotFortuneTellingPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "科學八字跟一般八字差在哪？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "科學八字不預測未來、不做流年、不論斷吉凶。它只保留能描述一個人決策傾向的結構，用來建立人格底色模型，理解你為什麼會做出現在的選擇。",
        },
      },
    ],
  };

  return (
    <PageContainer width="narrow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SectionHeader
        as="h1"
        eyebrow="為什麼不是算命？"
        title="為什麼不是算命？"
        subtitle="科學八字跟一般八字，差在看的東西不一樣。"
      />

      <div className="space-y-4">
        {points.map((p) => (
          <div key={p.title} className="rounded-sm border border-mist bg-paper-raised p-6">
            <h2 className="font-serif text-lg font-semibold text-ink">{p.title}</h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-graphite">{p.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-prose leading-relaxed text-graphite">
        科學八字只是科學決策的一部分。整個平台的目的都一樣：不是預測未來，
        而是理解你如何做決定。
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/science-bazi"
          className="rounded-sm bg-gold px-6 py-3 text-center font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          了解科學八字分析
        </Link>
        <Link
          href="/founder"
          className="rounded-sm border border-ink px-6 py-3 text-center text-ink transition-colors hover:bg-mist"
        >
          為什麼會有科學決策
        </Link>
      </div>
    </PageContainer>
  );
}
