/** 測驗進度：題號文字＋可讀進度條（不只靠顏色）。 */
export function AssessmentProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="mb-6">
      <p className="text-sm text-graphite">
        第 <span className="font-medium text-ink">{current}</span> 題／共 {total} 題
      </p>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`測驗進度：第 ${current} 題，共 ${total} 題`}
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-mist"
      >
        <div className="h-full bg-gold transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
