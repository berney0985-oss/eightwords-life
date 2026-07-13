import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PersonaDetail } from "@/components/personas/PersonaDetail";
import { personas } from "@/data/personas";
import { clusters } from "@/data/clusters";
import { PERSONA_SLUGS } from "@/types/persona";

/** 合法 slug 全數靜態生成；未知 slug 直接回應預渲染 404，不進 runtime notFound 流程 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PERSONA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const persona = personas.find((p) => p.slug === slug);
  if (!persona) return {};
  return {
    title: `${persona.displayName}｜九種決策人格`,
    description: persona.corePersona.oneLineDefinition,
    alternates: { canonical: `/personas/${persona.slug}` },
  };
}

export default async function PersonaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const persona = personas.find((p) => p.slug === slug);
  if (!persona) notFound();
  const cluster = clusters.find((c) => c.id === persona.clusterId);

  return (
    <PageContainer>
      <SectionHeader
        as="h1"
        eyebrow={`${cluster?.displayName ?? ""}・模型來源：${persona.baziSource}`}
        title={persona.displayName}
        subtitle={persona.corePersona.positioning}
      />
      <PersonaDetail persona={persona} />
    </PageContainer>
  );
}
