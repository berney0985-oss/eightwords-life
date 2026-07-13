/** 三大決策系型別（Schema 3.0.0）。內容來源：規格第 4 章。 */

import type { PersonaId } from "./persona";

export const CLUSTER_IDS = [
  "cluster_stability",
  "cluster_autonomy",
  "cluster_breakthrough",
] as const;

export type ClusterId = (typeof CLUSTER_IDS)[number];

export const CLUSTER_SLUGS = ["stability", "autonomy", "breakthrough"] as const;

export type ClusterSlug = (typeof CLUSTER_SLUGS)[number];

export interface Cluster {
  schemaVersion: "3.0.0";
  id: ClusterId;
  slug: ClusterSlug;
  displayName: string;
  /** 面對不確定性的根本策略（第 4 章分類邏輯） */
  coreStrategy: string;
  includedPersonaIds: PersonaId[];
  needSpectrum: string[];
  sharedPersona: string;
  sharedNeed: string;
  sharedValues: string;
  sharedThinkingPattern: string;
  sharedDecisionPattern: string;
  sharedStrength: string;
  sharedBlindspot: string;
  sharedGrowthDirection: string;
}
