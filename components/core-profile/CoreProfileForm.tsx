"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CoreProfileInput } from "@/types/core-profile";
import { analyzeCoreProfile } from "@/lib/core-profile";
import { CoreProfileValidationError } from "@/lib/core-profile";
import { saveCoreProfile } from "@/lib/core-profile-storage";
import { BirthDataFields } from "./BirthDataFields";

const DEFAULT_INPUT: CoreProfileInput = {
  name: "",
  gender: "female",
  birthDate: "",
  birthTimeKnown: false,
  birthTime: null,
  timezone: "Asia/Taipei",
  ziPolicy: "midnight",
};

const today = () => new Date().toISOString().slice(0, 10);

/**
 * 科學八字分析輸入表單（client）。
 * 排盤與計分全在純函式引擎（analyzeCoreProfile）；本元件不含任何排盤公式。
 */
export function CoreProfileForm() {
  const router = useRouter();
  const [input, setInput] = useState<CoreProfileInput>(DEFAULT_INPUT);
  const [errors, setErrors] = useState<string[]>([]);

  const onChange = (patch: Partial<CoreProfileInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  const submit = () => {
    setErrors([]);
    const payload: CoreProfileInput = {
      ...input,
      name: input.name?.trim() ? input.name.trim() : undefined,
      birthTime: input.birthTimeKnown ? (input.birthTime || null) : null,
    };
    try {
      const result = analyzeCoreProfile(payload, {
        createdAt: new Date().toISOString(),
        now: today(),
      });
      saveCoreProfile(result);
      router.push("/science-bazi/results");
    } catch (e) {
      if (e instanceof CoreProfileValidationError) {
        setErrors(e.issues.map((i) => i.message));
      } else {
        setErrors(["分析時發生問題，請確認輸入的出生資料後再試一次。"]);
      }
    }
  };

  return (
    <div className="rounded-sm border border-mist bg-paper-raised p-6">
      <BirthDataFields value={input} onChange={onChange} />

      {errors.length > 0 && (
        <ul className="mt-5 space-y-1 rounded-sm border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {errors.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={submit}
        className="mt-6 rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors hover:bg-gold-deep"
      >
        開始分析
      </button>
      <p className="mt-3 text-xs leading-relaxed text-stone">
        資料只在你的裝置上計算與暫存，不會上傳伺服器。
      </p>
    </div>
  );
}
