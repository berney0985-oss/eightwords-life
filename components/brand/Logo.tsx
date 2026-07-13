/**
 * 品牌標誌（呈現用，不含連結）。
 * 使用原始 Logo 萃取的 DS 徽記（public/brand/emblem.png，未改色／未變形）。
 * 因網站為淺色主題、Logo 為深色，徽記置於深色圓角容器中以維持對比。
 */
export function Logo({
  showEnglish = true,
  emblemSize = 34,
  tone = "dark",
}: {
  showEnglish?: boolean;
  emblemSize?: number;
  /** dark = 深底文字（頁尾）；default = 淺底文字（Header） */
  tone?: "default" | "dark";
}) {
  const nameColor = tone === "dark" ? "text-paper" : "text-ink";
  const engColor = tone === "dark" ? "text-stone" : "text-stone";
  return (
    <span className="flex items-center gap-2.5">
      <span className="inline-flex items-center justify-center rounded-sm bg-ink p-1 ring-1 ring-ink-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/emblem.png"
          alt="科學決策 標誌"
          width={emblemSize}
          height={emblemSize}
          style={{ width: emblemSize, height: emblemSize }}
          className="block"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`font-serif text-lg font-semibold tracking-wide ${nameColor}`}>
          科學決策
        </span>
        {showEnglish && (
          <span className={`text-[10px] tracking-[0.22em] ${engColor}`}>
            DECISION SCIENCE LAB
          </span>
        )}
      </span>
    </span>
  );
}
