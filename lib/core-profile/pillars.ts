/**
 * lib/core-profile/pillars.ts
 *
 * 四柱排盤（純函式）。時柱在出生時間未知時為 null，不以 00:00 / 子時替代。
 * 同時回報曆法交界複核旗標。
 *
 * 移植來源：bazi_fixed_3.html 之 baziEng.calculate（年/月/日/時柱）。
 */

import type { Pillar, Pillars, ZiPolicy } from '../../types/core-profile';
import { STEMS, BRANCHES } from './constants';
import {
  jdn,
  jdnToDate,
  termDateTime,
  compareDateTime,
  findMonthBranch,
  dayDifference,
} from './calendar';

/** 六十甲子序號（由干、支反查） */
export function sexagenaryIndex(stem: number, branch: number): number {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stem && i % 12 === branch) return i;
  }
  return -1;
}

function makePillar(stem: number, branch: number): Pillar {
  return {
    stem,
    branch,
    stemChar: STEMS[stem],
    branchChar: BRANCHES[branch],
    name: STEMS[stem] + BRANCHES[branch],
    sexagenaryIndex: sexagenaryIndex(stem, branch),
  };
}

export interface ComputePillarsParams {
  birthDate: string; // 'YYYY-MM-DD'
  birthTime: string | null; // 'HH:mm' | null
  birthTimeKnown: boolean;
  ziPolicy: ZiPolicy;
}

export interface ComputePillarsResult {
  pillars: Pillars;
  /** 日主天干索引 */
  dayMasterStem: number;
  /** 曆法交界複核原因（可能為空） */
  reviewReasons: string[];
}

/** 節氣交界複核的天數門檻（近似節氣無精確時刻，同日或相鄰一日視為需複核） */
const BOUNDARY_REVIEW_DAYS = 1;

export function computePillars(params: ComputePillarsParams): ComputePillarsResult {
  const { birthDate, birthTime, birthTimeKnown, ziPolicy } = params;
  const [bY, bM, bD] = birthDate.split('-').map(Number);

  // 出生時間未知：完全不使用時刻（時柱為 null）。
  // 為了年/月柱的節氣比較，未知時間時以中午 12:00 作為「日內定位」的中性代表，
  // 僅用於節氣先後比較，不會產生任何時柱。
  const hasHour = birthTimeKnown && !!birthTime;
  let bH = 12;
  let bMin = 0;
  if (hasHour) {
    const [h, mi] = birthTime!.split(':').map(Number);
    bH = h;
    bMin = mi;
  }

  const bdt = { y: bY, m: bM, d: bD, h: bH, min: bMin };
  const reviewReasons: string[] = [];

  // ── 年柱（立春換年）──────────────────────────────
  let baziYear = bY;
  const lichun = termDateTime('立春', bY);
  if (compareDateTime(bdt, lichun) < 0) {
    baziYear = bY - 1;
  }
  // 立春交界複核（近似日，年柱可能誤判）
  const lichunDayGap = Math.abs(dayDifference({ y: bY, m: bM, d: bD }, lichun));
  if (lichunDayGap <= BOUNDARY_REVIEW_DAYS) {
    reviewReasons.push(
      `出生日接近立春交界（約 ${lichun.y}-${String(lichun.m).padStart(2, '0')}-${String(lichun.d).padStart(2, '0')}，近似日期），年柱可能有誤差，建議人工複核。`,
    );
  }

  const yIdx = (((baziYear - 1984) % 60) + 60) % 60;
  const yStem = yIdx % 10;
  const yBranch = yIdx % 12;

  // ── 月柱（節氣定月支 + 五虎遁）──────────────────────
  const monthInfo = findMonthBranch(bdt);
  const mBranch = monthInfo.branch;
  const yMSS = (((yStem % 5) * 2 + 2) % 10);
  const mOff = (((mBranch - 2) % 12) + 12) % 12;
  const mStem = (yMSS + mOff) % 10;
  // 月支節氣交界複核
  const monthTermGap = Math.abs(
    dayDifference({ y: bY, m: bM, d: bD }, { y: monthInfo.termDate.y, m: monthInfo.termDate.m, d: monthInfo.termDate.d }),
  );
  if (monthInfo.src !== 'table' && monthTermGap <= BOUNDARY_REVIEW_DAYS) {
    reviewReasons.push(
      `出生日接近節氣「${monthInfo.name}」交界（近似日期，無精確時刻），月柱可能有誤差，建議人工複核。`,
    );
  }

  // ── 日柱（JDN；子時換日）────────────────────────────
  let cY = bY;
  let cM = bM;
  let cD = bD;
  if (ziPolicy === '2300' && hasHour && bH >= 23) {
    const next = jdnToDate(jdn(bY, bM, bD) + 1);
    cY = next.y;
    cM = next.m;
    cD = next.d;
  }
  const birthJdn = jdn(cY, cM, cD);
  const baseJdn = jdn(1984, 1, 31); // 甲子基準
  const dayDiff = birthJdn - baseJdn;
  const dIdx = (((0 + dayDiff) % 60) + 60) % 60;
  const dStem = dIdx % 10;
  const dBranch = dIdx % 12;

  // ── 時柱（僅在出生時間已知時）────────────────────────
  let hourPillar: Pillar | null = null;
  if (hasHour) {
    const hBranch = Math.floor((bH + 1) / 2) % 12;
    const zHSS = (dStem % 5) * 2;
    const hStem = (zHSS + hBranch) % 10;
    hourPillar = makePillar(hStem, hBranch);
  }

  const pillars: Pillars = {
    year: makePillar(yStem, yBranch),
    month: makePillar(mStem, mBranch),
    day: makePillar(dStem, dBranch),
    hour: hourPillar,
  };

  return { pillars, dayMasterStem: dStem, reviewReasons };
}
