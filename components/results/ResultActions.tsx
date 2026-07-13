import Link from "next/link";
import type { AssessmentResult } from "@/types/result";
import { personas } from "@/data/personas";

/**
 * 結果頁第六段 CTA。
 * 平手時不顯示單一「查看完整人格」（並列人格卡已各自有連結），
 * 重新測驗導向 /assessment（該處有確認對話框，避免未確認即刪除結果）。
 */
export function ResultActions({ result }: { result: AssessmentResult }) {
  const winner = personas.find((p) => p.id === result.expressedPersona);
  return (
    <section className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {!result.isTied && winner && (
        <Link
          href={`/personas/${winner.slug}`}
          className="rounded-sm bg-gold px-5 py-3 text-center font-medium text-paper transition-colors hover:bg-gold-deep"
        >
          查看完整人格
        </Link>
      )}
      <Link
        href="/eightwords"
        className="rounded-sm border border-ink px-5 py-3 text-center text-ink transition-colors hover:bg-mist"
      >
        了解人格底色模型
      </Link>
      <Link
        href="/services"
        className="rounded-sm border border-ink px-5 py-3 text-center text-ink transition-colors hover:bg-mist"
      >
        {result.isTied ? "了解完整決策分析" : "預約完整決策分析"}
      </Link>
      <Link
        href="/assessment"
        className="rounded-sm border border-mist px-5 py-3 text-center text-graphite transition-colors hover:bg-mist"
      >
        重新測驗
      </Link>
    </section>
  );
}
