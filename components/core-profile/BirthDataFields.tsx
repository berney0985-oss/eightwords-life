"use client";

import type { CoreProfileInput } from "@/types/core-profile";

/**
 * 出生資料輸入欄位（受控）。
 * 規則：姓名可選、出生日期必填；出生時間未知時不填時間、不偽造 00:00。
 */
export function BirthDataFields({
  value,
  onChange,
}: {
  value: CoreProfileInput;
  onChange: (patch: Partial<CoreProfileInput>) => void;
}) {
  const field = "w-full rounded-sm border border-mist bg-paper px-3 py-2 text-ink focus:border-gold focus:outline-none";
  const label = "block text-sm font-medium text-graphite";

  return (
    <div className="space-y-5">
      <div>
        <label className={label} htmlFor="cp-name">姓名（可留空）</label>
        <input
          id="cp-name"
          type="text"
          className={`mt-1 ${field}`}
          value={value.name ?? ""}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="不填也可以分析"
        />
      </div>

      <div>
        <span className={label}>性別</span>
        <div className="mt-2 flex gap-3">
          {(["male", "female"] as const).map((g) => (
            <label key={g} className="flex items-center gap-2 text-ink">
              <input
                type="radio"
                name="cp-gender"
                checked={value.gender === g}
                onChange={() => onChange({ gender: g })}
                className="h-4 w-4 accent-[var(--gold)]"
              />
              {g === "male" ? "男" : "女"}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={label} htmlFor="cp-date">出生日期（必填）</label>
        <input
          id="cp-date"
          type="date"
          className={`mt-1 ${field}`}
          value={value.birthDate}
          min="1900-01-01"
          max="2099-12-31"
          onChange={(e) => onChange({ birthDate: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-ink">
          <input
            type="checkbox"
            checked={value.birthTimeKnown}
            onChange={(e) =>
              onChange({
                birthTimeKnown: e.target.checked,
                birthTime: e.target.checked ? (value.birthTime ?? "") : null,
              })
            }
            className="h-4 w-4 accent-[var(--gold)]"
          />
          我知道出生時間
        </label>
        {value.birthTimeKnown ? (
          <input
            aria-label="出生時間"
            type="time"
            className={`mt-3 ${field}`}
            value={value.birthTime ?? ""}
            onChange={(e) => onChange({ birthTime: e.target.value })}
          />
        ) : (
          <p className="mt-2 text-xs leading-relaxed text-stone">
            出生時間未知時，本次分析不使用時柱，會以較少的資料建立初始模型——不會用 00:00 假裝是真實時間。
          </p>
        )}
      </div>

      <div>
        <label className={label} htmlFor="cp-tz">時區</label>
        <input
          id="cp-tz"
          type="text"
          className={`mt-1 ${field}`}
          value={value.timezone}
          onChange={(e) => onChange({ timezone: e.target.value })}
        />
        <p className="mt-2 text-xs text-stone">預設 Asia/Taipei，可自行確認或修改。</p>
      </div>

      <div>
        <span className={label}>子時換日規則</span>
        <div className="mt-2 flex flex-col gap-2">
          <label className="flex items-center gap-2 text-ink">
            <input
              type="radio"
              name="cp-zi"
              checked={value.ziPolicy === "midnight"}
              onChange={() => onChange({ ziPolicy: "midnight" })}
              className="h-4 w-4 accent-[var(--gold)]"
            />
            00:00 子正換日（預設）
          </label>
          <label className="flex items-center gap-2 text-ink">
            <input
              type="radio"
              name="cp-zi"
              checked={value.ziPolicy === "2300"}
              onChange={() => onChange({ ziPolicy: "2300" })}
              className="h-4 w-4 accent-[var(--gold)]"
            />
            23:00 子初換日
          </label>
        </div>
      </div>
    </div>
  );
}
