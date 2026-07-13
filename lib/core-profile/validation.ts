/**
 * lib/core-profile/validation.ts
 *
 * 輸入安全檢查（純函式）。errors 使 valid=false；warnings 不阻擋但會記錄。
 *
 * 涵蓋裁決要求之錯誤情境：
 *   不合法日期、未來日期（需注入 now）、時間格式錯誤、時區空白、
 *   birthTimeKnown=false 但 birthTime 有值、birthTimeKnown=true 但 birthTime 空白。
 */

import type {
  AnalyzeOptions,
  CoreProfileInput,
  ValidationIssue,
  ValidationResult,
} from '../../types/core-profile';
import { ALLOWED_TIMEZONES, SUPPORTED_YEAR_MIN, SUPPORTED_YEAR_MAX } from './constants';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const IANA_RE = /^[A-Za-z]+(?:\/[A-Za-z0-9_+-]+){1,2}$/;

function isRealDate(y: number, m: number, d: number): boolean {
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const daysInMonth = [
    31,
    (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return d <= daysInMonth[m - 1];
}

export function validateInput(input: CoreProfileInput, opts: AnalyzeOptions = {}): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  // ── gender ──
  if (input.gender !== 'male' && input.gender !== 'female') {
    errors.push({ field: 'gender', code: 'INVALID_GENDER', message: '性別必須為 male 或 female。' });
  }

  // ── birthDate ──
  if (!input.birthDate) {
    errors.push({ field: 'birthDate', code: 'MISSING_BIRTH_DATE', message: '缺少出生日期。' });
  } else if (!DATE_RE.test(input.birthDate)) {
    errors.push({
      field: 'birthDate',
      code: 'INVALID_DATE_FORMAT',
      message: '出生日期格式須為 YYYY-MM-DD。',
    });
  } else {
    const [y, m, d] = input.birthDate.split('-').map(Number);
    if (!isRealDate(y, m, d)) {
      errors.push({ field: 'birthDate', code: 'INVALID_DATE', message: '出生日期不是合法日期。' });
    } else {
      if (y < SUPPORTED_YEAR_MIN || y > SUPPORTED_YEAR_MAX) {
        errors.push({
          field: 'birthDate',
          code: 'YEAR_OUT_OF_RANGE',
          message: `適用年份為 ${SUPPORTED_YEAR_MIN}–${SUPPORTED_YEAR_MAX}。`,
        });
      }
      // 未來日期（僅在提供 now 時檢查）
      if (opts.now && DATE_RE.test(opts.now)) {
        if (input.birthDate > opts.now) {
          errors.push({
            field: 'birthDate',
            code: 'FUTURE_DATE',
            message: '出生日期不可為未來日期。',
          });
        }
      }
    }
  }

  // ── birthTimeKnown / birthTime ──
  if (typeof input.birthTimeKnown !== 'boolean') {
    errors.push({
      field: 'birthTimeKnown',
      code: 'INVALID_TIME_KNOWN',
      message: 'birthTimeKnown 必須為布林值。',
    });
  } else if (input.birthTimeKnown) {
    if (!input.birthTime) {
      errors.push({
        field: 'birthTime',
        code: 'MISSING_BIRTH_TIME',
        message: 'birthTimeKnown 為 true 時必須提供 birthTime。',
      });
    } else if (!TIME_RE.test(input.birthTime)) {
      errors.push({
        field: 'birthTime',
        code: 'INVALID_TIME_FORMAT',
        message: '出生時間格式須為 HH:mm（00:00–23:59）。',
      });
    }
  } else if (input.birthTimeKnown === false) {
    // birthTimeKnown = false：birthTime 必須為 null，避免呼叫端誤以為時間被使用。
    // 依裁決採「直接拒絕輸入」一致規則。
    if (input.birthTime !== null && input.birthTime !== undefined && input.birthTime !== '') {
      errors.push({
        field: 'birthTime',
        code: 'TIME_PROVIDED_BUT_UNKNOWN',
        message: 'birthTimeKnown 為 false 時 birthTime 必須為 null；不接受同時提供時間值。',
      });
    }
  }

  // ── timezone ──
  if (!input.timezone || input.timezone.trim() === '') {
    errors.push({ field: 'timezone', code: 'MISSING_TIMEZONE', message: '時區不可為空字串。' });
  } else if (!IANA_RE.test(input.timezone) && !ALLOWED_TIMEZONES.includes(input.timezone)) {
    errors.push({
      field: 'timezone',
      code: 'INVALID_TIMEZONE',
      message: '時區須符合 IANA 格式或存在於允許清單。',
    });
  } else if (!ALLOWED_TIMEZONES.includes(input.timezone)) {
    warnings.push({
      field: 'timezone',
      code: 'TIMEZONE_NOT_SUPPORTED',
      message: `目前正式支援時區為 ${ALLOWED_TIMEZONES.join('、')}；其他時區僅視為當地民用時間，建議人工複核。`,
    });
  }

  // ── ziPolicy ──
  if (input.ziPolicy !== 'midnight' && input.ziPolicy !== '2300') {
    errors.push({ field: 'ziPolicy', code: 'INVALID_ZI_POLICY', message: 'ziPolicy 必須為 midnight 或 2300。' });
  }

  return { valid: errors.length === 0, errors, warnings };
}

/** 供入口拋出的型別化驗證錯誤 */
export class CoreProfileValidationError extends Error {
  readonly issues: ValidationIssue[];
  constructor(issues: ValidationIssue[]) {
    super('CoreProfileValidationError: ' + issues.map((i) => i.code).join(', '));
    this.name = 'CoreProfileValidationError';
    this.issues = issues;
  }
}
