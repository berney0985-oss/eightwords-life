import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { products } from "@/data/products";
import type { Product, ProductEntry } from "@/types/payment";
import { ctaHref } from "@/lib/cta";

export const metadata: Metadata = {
  title: "服務方案",
  description:
    "免費工作分析、感情分析、科學八字分析摘要；完整人格底色分析、決策慣性分析與一對一決策諮詢。",
  alternates: { canonical: "/services" },
};

/** 免費工具的站內入口。 */
const START_HREF: Partial<Record<ProductEntry, string>> = {
  work_assessment: "/assessment/work",
  love_assessment: "/assessment/love",
  core_profile: "/science-bazi",
  decision_engine: "/decision-engine",
};

function Cta({ product }: { product: Product }) {
  if (product.ctaKind === "start") {
    const href = START_HREF[product.entry] ?? "/assessment";
    return (
      <Link href={href} className="mt-6 inline-block rounded-sm bg-gold px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-gold-deep">
        {product.ctaLabel}
      </Link>
    );
  }
  const href = ctaHref(product.ctaKind);
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-sm border border-ink px-5 py-2.5 text-sm text-ink transition-colors hover:bg-mist">
        {product.ctaLabel}
      </a>
    );
  }
  return (
    <span className="mt-6 inline-block cursor-default rounded-sm border border-mist px-5 py-2.5 text-sm text-stone">
      {product.ctaLabel}（即將開放）
    </span>
  );
}

function Card({ product }: { product: Product }) {
  return (
    <article className="flex flex-col rounded-sm border border-mist bg-paper-raised p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold leading-snug text-ink">{product.name}</h3>
        <span className="shrink-0 text-sm font-medium text-gold-deep">{product.displayPrice}</span>
      </div>
      <p className="mt-3 leading-relaxed text-graphite">{product.summary}</p>
      {product.lockedSections.length > 0 && (
        <ul className="mt-5 flex-1 space-y-1.5 text-sm text-ink">
          {product.lockedSections.map((b) => (
            <li key={b} className="flex gap-2"><span aria-hidden="true" className="text-gold">·</span>{b}</li>
          ))}
        </ul>
      )}
      <div><Cta product={product} /></div>
    </article>
  );
}

export default function ServicesPage() {
  const free = products.filter((p) => p.tier === "free");
  const paid = products.filter((p) => p.tier === "paid");

  return (
    <PageContainer width="wide">
      <SectionHeader
        as="h1"
        eyebrow="SERVICES"
        title="服務方案"
        subtitle="從免費分析開始。需要更深入時，完整分析由人工進行。"
      />

      <h2 className="font-serif text-lg font-semibold text-ink">免費分析</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {free.map((p) => <Card key={p.id} product={p} />)}
      </div>

      <h2 className="mt-14 font-serif text-lg font-semibold text-ink">完整分析與諮詢</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {paid.map((p) => <Card key={p.id} product={p} />)}
      </div>

      <p className="mt-10 max-w-prose text-sm leading-relaxed text-graphite">
        完整分析目前以人工交付，透過 LINE 官方帳號承接；系統尚未提供線上自動解鎖與自動排盤。
        所有結果為傾向描述與決策整理，最終決策責任由你承擔。
      </p>
    </PageContainer>
  );
}
