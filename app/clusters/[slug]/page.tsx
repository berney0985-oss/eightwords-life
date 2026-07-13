import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ClusterDetail } from "@/components/clusters/ClusterDetail";
import { clusters } from "@/data/clusters";
import { CLUSTER_SLUGS } from "@/types/cluster";

/** 合法 slug 全數靜態生成；未知 slug 直接回應預渲染 404，不進 runtime notFound 流程 */
export const dynamicParams = false;

export function generateStaticParams() {
  return CLUSTER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cluster = clusters.find((c) => c.slug === slug);
  if (!cluster) return {};
  return {
    title: cluster.displayName,
    description: cluster.sharedPersona,
    alternates: { canonical: `/clusters/${cluster.slug}` },
  };
}

export default async function ClusterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cluster = clusters.find((c) => c.slug === slug);
  if (!cluster) notFound();

  return (
    <PageContainer>
      <SectionHeader
        as="h1"
        eyebrow="CLUSTER"
        title={cluster.displayName}
        subtitle={cluster.sharedPersona}
      />
      <ClusterDetail cluster={cluster} />
    </PageContainer>
  );
}
