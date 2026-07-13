/**
 * lib/core-profile/analyze.ts
 *
 * 核心入口：analyzeCoreProfile(input, options?) → CoreProfileResult
 * 簡易 HTML 與主站只能透過此入口取得結果。
 *
 * 純函式：不碰 DOM / window / localStorage / input element / HTML 渲染。
 * 時間基準（now）與 createdAt 由外部注入以維持可測試性。
 */

import type {
  AnalyzeOptions,
  CoreProfileInput,
  CoreProfileResult,
} from '../../types/core-profile';
import {
  ENGINE_VERSION,
  SCORING_MODEL_VERSION,
  SCHEMA_VERSION,
  STEMS,
  ALLOWED_TIMEZONES,
} from './constants';
import { validateInput, CoreProfileValidationError } from './validation';
import { computePillars } from './pillars';
import { scoreTenGods, basePatternCandidate } from './ten-gods';
import { scoreFiveElements } from './five-elements';
import { mapPersona } from './persona-mapper';
import { computeCompleteness } from './completeness';

export { validateInput, CoreProfileValidationError };

function nowIso(): string {
  return new Date().toISOString();
}

export function analyzeCoreProfile(
  input: CoreProfileInput,
  options: AnalyzeOptions = {},
): CoreProfileResult {
  // 1. 驗證（errors → 拋型別化錯誤；warnings 併入限制說明）
  const validation = validateInput(input, options);
  if (!validation.valid) {
    throw new CoreProfileValidationError(validation.errors);
  }

  const createdAt = options.createdAt ?? nowIso();
  const birthTimeKnown = input.birthTimeKnown === true && !!input.birthTime;

  // 2. 四柱
  const { pillars, dayMasterStem, reviewReasons } = computePillars({
    birthDate: input.birthDate,
    birthTime: input.birthTime,
    birthTimeKnown: input.birthTimeKnown,
    ziPolicy: input.ziPolicy,
  });

  // 3. 五行分布摘要
  const fiveElementScores = scoreFiveElements(pillars);

  // 4. 十神強度
  const { tenGodScores, primaryTenGod, secondaryTenGods } = scoreTenGods(dayMasterStem, pillars);

  // 5. 九人格映射
  const persona = mapPersona(tenGodScores);

  // 6. 普通格局候選（僅顯示，不影響判定）
  const patternCandidate = basePatternCandidate(dayMasterStem, pillars);

  // 7. 資料完整度
  const dataCompleteness = computeCompleteness(input);

  // 8. 曆法複核旗標
  const calendarReviewReasons = [...reviewReasons];
  if (!ALLOWED_TIMEZONES.includes(input.timezone)) {
    calendarReviewReasons.push(
      `時區「${input.timezone}」非正式支援時區，僅視為當地民用時間，未做真太陽時／經度校正，建議人工複核。`,
    );
  }
  const calendarReviewRequired = calendarReviewReasons.length > 0;

  // 9. 限制說明
  const limitations: string[] = [
    '本模型使用簡化曆法規則（壽星公式近似節氣），非精準排盤。',
    '適用年份 1900–2099。',
    '出生時間視為所選時區的當地民用時間，未做真太陽時、經度與 DST 校正。',
    '十神權重為暫定原型（' +
      SCORING_MODEL_VERSION +
      '），尚未經真實樣本校準，數值不代表準確率。',
    '特殊格局（從格、化氣等）目前不另行修正人格底色，部分特殊命盤可能需要人工分析。',
  ];
  if (!birthTimeKnown) {
    limitations.push('出生時間未知，未使用時柱，人格底色為較簡化的三柱初始模型。');
  }
  for (const w of validation.warnings) {
    limitations.push(w.message);
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    engineVersion: ENGINE_VERSION,
    scoringModelVersion: SCORING_MODEL_VERSION,
    createdAt,
    input,
    dataCompleteness,
    pillars,
    dayMaster: STEMS[dayMasterStem],
    fiveElementScores,
    tenGodScores,
    primaryTenGod,
    secondaryTenGods,
    personaScores: persona.personaScores,
    corePersonaId: persona.corePersonaId,
    candidatePersonaIds: persona.candidatePersonaIds,
    rankedPersonaIds: persona.rankedPersonaIds,
    isTied: persona.isTied,
    scoreGap: persona.scoreGap,
    scoreGapRatio: persona.scoreGapRatio,
    basePatternCandidate: patternCandidate,
    modelSource: 'bazi_symbolic_model',
    calendarMethod: 'approximate_solar_terms',
    calendarReviewRequired,
    calendarReviewReasons,
    limitations,
  };
}
