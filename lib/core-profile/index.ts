/**
 * lib/core-profile/index.ts
 * 對外統一匯出（供 Next.js 主站 import）。
 *
 * 唯一核心入口：analyzeCoreProfile。
 */

export { analyzeCoreProfile, validateInput, CoreProfileValidationError } from './analyze';
export { TEN_GOD_TO_PERSONA, PERSONA_IDS, mapPersona, toPersonaScores } from './persona-mapper';
export { tenGodOf, scoreTenGods, basePatternCandidate } from './ten-gods';
export { scoreFiveElements } from './five-elements';
export { computePillars, sexagenaryIndex } from './pillars';
export { computeCompleteness } from './completeness';
export {
  ENGINE_VERSION,
  SCORING_MODEL_VERSION,
  SCHEMA_VERSION,
  ALLOWED_TIMEZONES,
  SUPPORTED_YEAR_MIN,
  SUPPORTED_YEAR_MAX,
} from './constants';

export type {
  CoreProfileInput,
  CoreProfileResult,
  Pillar,
  Pillars,
  PersonaId,
  TenGod,
  Element,
  Gender,
  ZiPolicy,
  DataCompleteness,
  DataCompletenessLevel,
  ValidationResult,
  ValidationIssue,
  AnalyzeOptions,
} from '../../types/core-profile';
