import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { clusters } from "@/data/clusters";
import { personas } from "@/data/personas";

export const metadata: Metadata = {
  title: "九種決策人格",
  description:
    "不同的人，不是用不同答案生活，而是用不同方式做決定。九種決策人格是一套理解需求、思考、行動與決策慣性的分類語言。",
  alternates: { canonical: "/personas" },
};

export default function PersonasPage() {
  return (
    <PageContainer width="wide">
      <SectionHeader
        as="h1"
        eyebrow="PERSONAS"
        title="九種決策人格"
        subtitle="不同的人，不是用不同答案生活，而是用不同方式做決定。"
      />
      <div className="space-y-12">
        {clusters.map((cluster) => (
          <section key={cluster.id} aria-label={cluster.displayName}>
            <h2 className="text-sm font-medium tracking-[0.18em] text-gold">
              {cluster.displayName}
            </h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-graphite">
              {cluster.coreStrategy}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {cluster.includedPersonaIds.map((pid) => {
                const p = personas.find((x) => x.id === pid);
                if (!p) return null;
                return (
                  <article key={p.id} className="flex flex-col rounded-sm border border-mist bg-paper-raised p-5">
                    <h3 className="font-serif text-lg font-semibold text-ink">{p.displayName}</h3>
                    <p className="mt-1 text-xs text-stone">
                      {cluster.displayName}・核心需求：{p.corePersona.coreNeed}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">
                      {p.corePersona.positioning}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                      {p.corePersona.oneLineDefinition}
                    </p>
                    <p className="mt-4 text-xs text-stone">模型來源：{p.baziSource}</p>
                    <Link
                      href={`/personas/${p.slug}`}
                      className="mt-2 text-sm font-medium text-gold transition-colors hover:text-gold-deep"
                    >
                      查看完整人格 →
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-14 max-w-prose border-t border-mist pt-8 text-sm leading-relaxed text-graphite">
        九種決策人格不是診斷，也不是固定不變的標籤。
        它是一套理解需求、思考、行動與決策慣性的分類語言。
      </p>
    </PageContainer>
  );
}
