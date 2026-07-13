/**
 * lib/core-profile/calendar.ts
 *
 * 簡化曆法規則（V1 暫定）：
 *   - 節氣：壽星公式近似（僅到「日」，無精確時刻） + 少量覆寫表
 *   - 日柱：JDN（儒略日）
 *   - 立春換年、五虎遁月柱、子時換日
 *
 * 明確限制（見 docs/core-profile-limitations.md）：
 *   非精準排盤；適用 1900–2099；時間視為輸入時區之當地民用時間；
 *   不做真太陽時 / 經度 / DST 校正；節氣交界需人工複核。
 *
 * 移植來源：bazi_fixed_3.html 之 calEng（jdn / approxDay / termDt / findMonthBranch）。
 */

import { TERMS, TERM_COEFFICIENTS, TERM_OVERRIDE_TABLE } from './constants';

export interface DateTimeParts {
  y: number;
  m: number;
  d: number;
  h: number;
  min: number;
}

export interface TermDateTime extends DateTimeParts {
  /** 'table' = 覆寫表（含時刻）；'approx' = 壽星公式近似（時刻為 0） */
  src: 'table' | 'approx';
}

/** Proleptic Gregorian 儒略日序號 */
export function jdn(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return (
    d +
    Math.floor((153 * mm + 2) / 5) +
    365 * yy +
    Math.floor(yy / 4) -
    Math.floor(yy / 100) +
    Math.floor(yy / 400) -
    32045
  );
}

/** JDN → 西曆年月日（純函式，供子時換日推算次日，避免依賴 Date 物件） */
export function jdnToDate(j: number): { y: number; m: number; d: number } {
  const a = j + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const dd = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * dd) / 4);
  const mm = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * mm + 2) / 5) + 1;
  const month = mm + 3 - 12 * Math.floor(mm / 10);
  const year = 100 * b + dd - 4800 + Math.floor(mm / 10);
  return { y: year, m: month, d: day };
}

/** 壽星公式近似節氣日：Y=year%100, day=floor(Y*0.2422+C)-floor((Y-1)/4) */
export function approxTermDay(name: string, year: number): number {
  const Y = year % 100;
  const coeff = year >= 2000 ? TERM_COEFFICIENTS[name].c21 : TERM_COEFFICIENTS[name].c20;
  return Math.floor(Y * 0.2422 + coeff) - Math.floor((Y - 1) / 4);
}

/** 取得節氣的日期時間（優先覆寫表，否則近似） */
export function termDateTime(name: string, year: number): TermDateTime {
  const override = TERM_OVERRIDE_TABLE[year]?.[name];
  if (override) {
    const [datePart, timePart] = override.split(' ');
    const [y, mo, d] = datePart.split('-').map(Number);
    const [h, mi] = (timePart || '00:00').split(':').map(Number);
    return { y, m: mo, d, h, min: mi, src: 'table' };
  }
  const info = TERMS.find((t) => t.name === name);
  // TERMS 為固定資料，name 由內部呼叫，info 必存在
  return { y: year, m: info!.month, d: approxTermDay(name, year), h: 0, min: 0, src: 'approx' };
}

/** 比較兩個日期時間（回傳 a-b 之號序差；>0 表 a 較晚） */
export function compareDateTime(a: DateTimeParts, b: DateTimeParts): number {
  const n = (dt: DateTimeParts) =>
    dt.y * 100000000 + dt.m * 1000000 + dt.d * 10000 + dt.h * 100 + (dt.min || 0);
  return n(a) - n(b);
}

export interface MonthBranchInfo {
  branch: number;
  name: string;
  termDate: TermDateTime;
  src: 'table' | 'approx' | 'fallback';
}

/** 依出生時刻找出所屬月支（最接近且不晚於出生時刻的節） */
export function findMonthBranch(bdt: DateTimeParts): MonthBranchInfo {
  let best: MonthBranchInfo | null = null;
  for (let yr = bdt.y - 1; yr <= bdt.y; yr++) {
    for (const t of TERMS) {
      const td = termDateTime(t.name, yr);
      if (compareDateTime(td, bdt) <= 0) {
        if (!best || compareDateTime(td, best.termDate) > 0) {
          best = { branch: t.branch, name: t.name, termDate: td, src: td.src };
        }
      }
    }
  }
  return (
    best || {
      branch: 1,
      name: '小寒',
      termDate: { y: bdt.y, m: 1, d: 6, h: 0, min: 0, src: 'approx' },
      src: 'fallback',
    }
  );
}

/** 兩個「日期」相差幾天（忽略時刻，因近似節氣無精確時刻） */
export function dayDifference(
  a: { y: number; m: number; d: number },
  b: { y: number; m: number; d: number },
): number {
  return jdn(a.y, a.m, a.d) - jdn(b.y, b.m, b.d);
}
