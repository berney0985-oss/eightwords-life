import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { clusters } from "@/data/clusters";
import { personas } from "@/data/personas";

export const metadata: Metadata = {
  title: "三大決策系",
  description:
    "面對不確定性，每個人都有自己的預設策略。穩定系、自主系、突破系——三種面對不確定性的根本策略。",
  alternates: { canonical: "/clusters" },
};

export default function ClustersPage() {
  return (
    <PageContainer width="wide">
      <SectionHeader
        as="h1"
        eyebrow="CLUSTERS"
        title="三大決策系"
        subtitle="面對不確定性，每個人都有自己的預設策略。三大決策系依人格面對不確定性的根本策略分組。"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {clusters.map((c) => (
          <article key={c.id} className="flex flex-col rounded-sm border border-mist bg-paper-raised p-6">
            <h2 className="font-serif text-xl font-semibold text-ink">{c.displayName}</h2>
            <p className="mt-3 text-sm leading-relaxed text-graphite">{c.coreStrategy}</p>
            <p className="mt-4 text-xs text-stone">
              核心需求光譜：{c.needSpectrum.join("、")}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite">{c.sharedPersona}</p>
            <ul className="mt-5 space-y-1 text-sm text-ink">
              {c.includedPersonaIds.map((pid) => {
                const p = personas.find((x) => x.id === pid);
                return p ? <li key={pid}>{p.displayName}（{p.baziSource}）</li> : null;
              })}
            </ul>
            <Link
              href={`/clusters/${c.slug}`}
              className="mt-6 text-sm font-medium text-gold transition-colors hover:text-gold-deep"
            >
              查看完整定義 →
            </Link>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
