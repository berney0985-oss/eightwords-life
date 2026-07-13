/**
 * lib/core-profile/five-elements.ts
 *
 * 五行分布摘要（符號分布）。
 *
 * 說明：此為「分布摘要」，與十神強度權重是不同計算。
 *   - 天干（含日主本身）：每個 +1.0
 *   - 地支藏干：依位置基礎權重（主0.7/中0.2/餘0.1），不套用柱位權重
 *   - 出生時間未知：不含時柱
 * 目的是給使用者一個透明的五行占比條狀圖，不作為人格判定依據。
 */

import type { Element, Pillars } from '../../types/core-profile';
import { STEM_ELEMENT, ELEMENTS, HIDDEN_STEMS, HIDDEN_STEM_BASE_WEIGHTS } from './constants';

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export function scoreFiveElements(pillars: Pillars): Record<Element, number> {
  const raw = [0, 0, 0, 0, 0];

  const stems = [pillars.year.stem, pillars.month.stem, pillars.day.stem];
  const branches = [pillars.year.branch, pillars.month.branch, pillars.day.branch];
  if (pillars.hour) {
    stems.push(pillars.hour.stem);
    branches.push(pillars.hour.branch);
  }

  for (const s of stems) raw[STEM_ELEMENT[s]] += 1.0;
  for (const b of branches) {
    HIDDEN_STEMS[b].forEach((stemIdx, rank) => {
      raw[STEM_ELEMENT[stemIdx]] += HIDDEN_STEM_BASE_WEIGHTS[rank] ?? 0;
    });
  }

  const out = {} as Record<Element, number>;
  ELEMENTS.forEach((el, i) => {
    out[el] = round3(raw[i]);
  });
  return out;
}
