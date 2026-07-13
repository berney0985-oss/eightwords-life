/**
 * lib/core-profile/completeness.ts
 *
 * 資料完整度（裁決二・十）。
 *   三柱 = partial（出生時間未知）
 *   四柱 = complete（已提供出生時間）
 *
 * complete 只代表輸入欄位較完整，不得解釋為分析準確 / 人格確定 / 模型可信度高。
 */

import type { CoreProfileInput, DataCompleteness } from '../../types/core-profile';
import { ALLOWED_TIMEZONES } from './constants';

export function computeCompleteness(input: CoreProfileInput): DataCompleteness {
  const birthDateProvided = !!input.birthDate;
  const birthTimeKnown = input.birthTimeKnown === true && !!input.birthTime;
  const timezoneConfirmed = ALLOWED_TIMEZONES.includes(input.timezone);
  const availablePillarCount: 3 | 4 = birthTimeKnown ? 4 : 3;
  const level = birthTimeKnown ? 'complete' : 'partial';

  const label = birthTimeKnown
    ? '資料完整度：四柱（已提供出生時間）'
    : '資料完整度：三柱（出生時間未知，未使用時柱）';

  return {
    birthDateProvided,
    birthTimeKnown,
    timezoneConfirmed,
    availablePillarCount,
    level,
    label,
  };
}
