import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { founder } from "@/data/founder";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "為什麼會有科學決策",
  description:
    "科學決策的品牌故事：不是想再做一套人格測驗，而是想回答——人為什麼會反覆做出相似的決定。",
  alternates: { canonical: "/founder" },
};

/**
 * 品牌故事頁。內容唯一來源 data/founder.ts（逐字轉錄，零虛構）。
 * 主標為品牌故事取向，非「創辦人」。Person JSON-LD 只含真實資料與允許頭銜。
 */
export default function FounderPage() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.allowedTitles.join("、"),
    worksFor: {
      "@type": "Organization",
      name: `${siteConfig.name} ${siteConfig.englishName}`,
    },
  };

  return (
    <PageContainer width="narrow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <SectionHeader
        as="h1"
        eyebrow="品牌故事"
        title={founder.page.heroTitle}
        subtitle={founder.page.heroSubtitle}
      />

      <div className="space-y-5">
        {founder.story.map((p, i) => (
          <p key={i} className="max-w-prose leading-relaxed text-graphite">
            {p}
          </p>
        ))}
      </div>

      <h2 className="mt-12 font-serif text-xl font-semibold text-ink">模型目前的限制</h2>
      <div className="mt-4 space-y-4">
        {founder.limitations.map((p, i) => (
          <p key={i} className="max-w-prose text-sm leading-relaxed text-stone">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 border-t border-mist pt-8">
        {founder.closing.map((p, i) => (
          <p
            key={i}
            className={
              i === founder.closing.length - 1
                ? "mt-3 font-serif text-lg font-semibold text-ink"
                : "max-w-prose leading-relaxed text-graphite"
            }
          >
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/assessment"
          className="rounded-sm bg-gold px-6 py-3 text-center font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          開始免費分析
        </Link>
        <Link
          href="/why-not-fortune-telling"
          className="rounded-sm border border-ink px-6 py-3 text-center text-ink transition-colors hover:bg-mist"
        >
          為什麼不是算命？
        </Link>
      </div>
    </PageContainer>
  );
}
