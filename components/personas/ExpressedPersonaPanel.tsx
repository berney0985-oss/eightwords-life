"use client";

import Link from "next/link";
import { personas } from "@/data/personas";
import { useStoredResult } from "@/lib/use-storage";

/**
 * 人格頁第三段「你的外顯人格」（client 島嶼）。
 * - 無結果 → 測驗 CTA；
 * - 有結果 → 顯示「目前瀏覽的人格底色模型：X／你的測驗外顯人格：Y」，
 *   說明兩者是不同分析層、不是衝突資料、沒有真假之分；
 * - 平手 → 顯示並列傾向；
 * - 不得暗示外顯人格由本頁人格底色推導。
 */
export function ExpressedPersonaPanel({
  personaDisplayName,
}: {
  personaDisplayName: string;
}) {
  const stored = useStoredResult();

  if (stored === undefined) {
    return (
      <div aria-hidden="true" className="animate-pulse rounded-sm border border-mist bg-paper-raised p-6">
        <div className="h-4 w-2/3 rounded bg-mist" />
        <div className="mt-3 h-4 w-1/2 rounded bg-mist" />
      </div>
    );
  }

  if (stored === null) {
    return (
      <div className="rounded-sm border border-mist bg-paper-raised p-6">
        <p className="text-sm leading-relaxed text-graphite">
          目前瀏覽的人格底色模型：
          <span className="font-medium text-ink">{personaDisplayName}</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-graphite">
          你尚未有測驗結果。外顯人格由行為情境測驗辨識，
          與本頁的人格底色屬於不同分析層——兩者可能相同，也可能不同，沒有真假之分。
        </p>
        <Link
          href="/assessment"
          className="mt-5 inline-block rounded-sm bg-gold px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          開始免費測驗
        </Link>
      </div>
    );
  }

  const result = stored;

  if (result.isTied) {
    const names = result.tiedTopPersonas
      .map((pid) => personas.find((p) => p.id === pid)?.displayName)
      .filter(Boolean)
      .join("、");
    return (
      <div className="rounded-sm border border-mist bg-paper-raised p-6">
        <p className="text-sm leading-relaxed text-graphite">
          目前瀏覽的人格底色模型：
          <span className="font-medium text-ink">{personaDisplayName}</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-graphite">
          你的測驗結果呈現並列傾向：<span className="font-medium text-ink">{names}</span>。
          外顯人格與人格底色屬於不同分析層，沒有真假之分。
        </p>
        <Link href="/results" className="mt-4 inline-block text-sm font-medium text-gold transition-colors hover:text-gold-deep">
          查看完整結果 →
        </Link>
      </div>
    );
  }

  const expressed = personas.find((p) => p.id === result.expressedPersona);
  if (!expressed) return null;
  const same = expressed.displayName === personaDisplayName;

  return (
    <div className="rounded-sm border border-mist bg-paper-raised p-6">
      <dl className="space-y-2 text-sm">
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-stone">目前瀏覽的人格底色模型：</dt>
          <dd className="font-medium text-ink">{personaDisplayName}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-stone">你的測驗外顯人格：</dt>
          <dd className="font-medium text-ink">{expressed.displayName}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-graphite">
        {same
          ? "本次作答呈現的外顯人格，與本頁的人格底色模型同名。兩者仍屬不同分析層——一個回答「為什麼這樣做決策」，一個回答「目前通常如何呈現決策」。"
          : "兩者不同不是衝突資料，也沒有真假之分——它們是同一個人的不同分析層：人格底色回答「為什麼這樣做決策」，外顯人格回答「目前通常如何呈現決策」。"}
      </p>
      <Link href="/results" className="mt-4 inline-block text-sm font-medium text-gold transition-colors hover:text-gold-deep">
        查看完整結果 →
      </Link>
    </div>
  );
}
