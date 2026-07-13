/** 上一題／下一題（或完成）導航。下一題需先作答。 */
export function AssessmentNavigation({
  canGoBack,
  canGoNext,
  isLast,
  onBack,
  onNext,
}: {
  canGoBack: boolean;
  canGoNext: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className="rounded-sm border border-mist px-5 py-3 text-ink transition-colors enabled:hover:bg-mist disabled:cursor-not-allowed disabled:text-stone"
      >
        上一題
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className="rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors enabled:hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLast ? "完成測驗" : "下一題"}
      </button>
    </div>
  );
}
