import type { CoreProfileResult } from "@/types/core-profile";

/**
 * 人格底色免責與資料完整度。
 * 資料完整度只描述輸入是否完整，不得稱準確率／可信度／人格確定度。
 */
export function CoreProfileDisclaimer({ result }: { result: CoreProfileResult }) {
  return (
    <section className="mt-8 rounded-sm border border-mist bg-paper-raised p-6">
      <p className="text-sm font-medium text-ink">{result.dataCompleteness.label}</p>
      <p className="mt-1 text-xs leading-relaxed text-stone">
        資料完整度只表示你提供的出生資料是否完整（日期、時間、時區），
        不代表分析準確率、可信度或人格確定度。
      </p>
      <ul className="mt-4 space-y-1 text-xs leading-relaxed text-stone">
        {result.limitations.map((l, i) => (
          <li key={i}>・{l}</li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-stone">
        人格底色是你決策傾向的初始模型，不是「真正的你」，也不預測未來。
        它描述的是傾向，不是命運。
      </p>
    </section>
  );
}
