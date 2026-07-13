import Link from "next/link";

/**
 * 建置中通知（第二階段骨架）。
 * 誠實標示功能尚未開放，不呈現假測驗／假結果／假 AI。
 * 後續階段以正式功能取代本區塊。
 */
export function PreparingNotice({
  message,
  note,
}: {
  message: string;
  note?: string;
}) {
  return (
    <div className="rounded-sm border border-mist bg-paper-raised p-8">
      <p className="text-graphite">{message}</p>
      {note && <p className="mt-3 max-w-prose text-sm leading-relaxed text-stone">{note}</p>}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/assessment"
          className="rounded-sm bg-ink px-5 py-3 text-center text-paper transition-colors hover:bg-ink-soft"
        >
          查看其他分析
        </Link>
        <Link
          href="/"
          className="rounded-sm border border-ink px-5 py-3 text-center text-ink transition-colors hover:bg-mist"
        >
          回到首頁
        </Link>
      </div>
    </div>
  );
}
