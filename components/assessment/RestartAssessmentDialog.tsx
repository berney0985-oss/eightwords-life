"use client";

import { useEffect, useRef } from "react";

/** 重新開始確認對話框：破壞性動作前必經確認。Escape 可取消，關閉後 focus 還原至觸發按鈕。 */
export function RestartAssessmentDialog({
  open,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      restoreRef.current?.focus();
    };
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="restart-dialog-title"
        className="w-full max-w-sm rounded-sm border border-mist bg-paper p-6 shadow-lg"
      >
        <h2 id="restart-dialog-title" className="font-serif text-lg font-semibold text-ink">
          重新開始測驗？
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-graphite">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="rounded-sm border border-mist px-4 py-2 text-sm text-ink transition-colors hover:bg-mist"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-sm bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-ink-soft"
          >
            重新開始
          </button>
        </div>
      </div>
    </div>
  );
}
