"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loveQuestions } from "@/data/love-questions";
import type { LoveAssessmentProgress } from "@/types/love-assessment";
import { SCHEMA_VERSION, LOVE_ASSESSMENT_VERSION, LOVE_TOTAL_QUESTIONS } from "@/lib/constants";
import {
  saveLoveProgress,
  clearLoveProgress,
  clearLoveResult,
  saveLoveResult,
} from "@/lib/love-storage";
import { useStoredLoveProgress, useStoredLoveResult } from "@/lib/use-storage";
import { scoreLove } from "@/lib/love-scoring";
import { AssessmentProgress as ProgressBar } from "./AssessmentProgress";
import { QuestionCard } from "./QuestionCard";
import { AssessmentNavigation } from "./AssessmentNavigation";
import { RestartAssessmentDialog } from "./RestartAssessmentDialog";

interface QuizState {
  answers: Record<string, string>;
  index: number;
  startedAt: string;
}

const now = () => new Date().toISOString();

/**
 * 感情分析互動外殼（client 島嶼）。
 * 與工作測驗共用子元件與流程結構，但題庫、儲存 key、計分皆為感情獨立命名空間；
 * 不觸碰工作測驗的任何資料。
 */
export function LoveAssessmentShell() {
  const router = useRouter();
  const storedResult = useStoredLoveResult();
  const storedProgress = useStoredLoveProgress();
  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const persist = useCallback((state: QuizState) => {
    const progress: LoveAssessmentProgress = {
      schemaVersion: SCHEMA_VERSION,
      assessmentVersion: LOVE_ASSESSMENT_VERSION,
      answers: state.answers,
      currentIndex: state.index,
      startedAt: state.startedAt,
      updatedAt: now(),
    };
    saveLoveProgress(progress);
  }, []);

  const handleSelect = useCallback(
    (optionId: string) => {
      setQuiz((prev) => {
        if (!prev) return prev;
        const q = loveQuestions[prev.index];
        if (!q) return prev;
        const next = { ...prev, answers: { ...prev.answers, [q.id]: optionId } };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const handleNext = useCallback(() => {
    setQuiz((prev) => {
      if (!prev) return prev;
      const q = loveQuestions[prev.index];
      if (!q || !prev.answers[q.id]) return prev;
      if (prev.index < LOVE_TOTAL_QUESTIONS - 1) {
        const next = { ...prev, index: prev.index + 1 };
        persist(next);
        return next;
      }
      saveLoveResult(scoreLove(prev.answers));
      clearLoveProgress();
      router.push("/assessment/love/results");
      return prev;
    });
  }, [persist, router]);

  const handleBack = useCallback(() => {
    setQuiz((prev) => {
      if (!prev || prev.index === 0) return prev;
      const next = { ...prev, index: prev.index - 1 };
      persist(next);
      return next;
    });
  }, [persist]);

  const startFresh = () => {
    clearLoveProgress();
    clearLoveResult();
    setConfirmOpen(false);
    setQuiz({ answers: {}, index: 0, startedAt: now() });
  };

  const resumeQuiz = () => {
    if (!storedProgress) return;
    setQuiz({
      answers: storedProgress.answers,
      index: Math.min(storedProgress.currentIndex, LOVE_TOTAL_QUESTIONS - 1),
      startedAt: storedProgress.startedAt,
    });
  };

  useEffect(() => {
    if (!quiz) return;
    const onKey = (e: KeyboardEvent) => {
      const onRadio = e.target instanceof HTMLInputElement && e.target.type === "radio";
      if (["1", "2", "3"].includes(e.key)) {
        const q = loveQuestions[quiz.index];
        const opt = q?.options[Number(e.key) - 1];
        if (opt) handleSelect(opt.id);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" && !onRadio) {
        handleBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [quiz, handleSelect, handleNext, handleBack]);

  if (quiz) {
    const question = loveQuestions[quiz.index];
    const selected = question ? (quiz.answers[question.id] ?? null) : null;
    return (
      <div>
        <ProgressBar current={quiz.index + 1} total={LOVE_TOTAL_QUESTIONS} />
        {question && (
          <QuestionCard question={question} selectedOptionId={selected} onSelect={handleSelect} />
        )}
        <AssessmentNavigation
          canGoBack={quiz.index > 0}
          canGoNext={selected !== null}
          isLast={quiz.index === LOVE_TOTAL_QUESTIONS - 1}
          onBack={handleBack}
          onNext={handleNext}
        />
        <p className="mt-6 text-xs text-stone">
          鍵盤操作：1／2／3 選擇選項，Enter 下一題，← 返回上一題。可返回修改答案，計分以最終答案為準。
        </p>
      </div>
    );
  }

  if (storedResult === undefined || storedProgress === undefined) {
    return (
      <div aria-hidden="true" className="animate-pulse rounded-sm border border-mist bg-paper-raised p-8">
        <div className="h-5 w-2/3 rounded bg-mist" />
        <div className="mt-6 space-y-3">
          <div className="h-12 rounded bg-mist" />
          <div className="h-12 rounded bg-mist" />
          <div className="h-12 rounded bg-mist" />
        </div>
      </div>
    );
  }

  if (storedResult) {
    return (
      <div className="rounded-sm border border-mist bg-paper-raised p-6">
        <p className="leading-relaxed text-graphite">你已有一份感情分析結果。</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/assessment/love/results"
            className="rounded-sm bg-gold px-5 py-3 text-center font-medium text-paper transition-colors hover:bg-gold-deep"
          >
            查看結果
          </Link>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-sm border border-ink px-5 py-3 text-ink transition-colors hover:bg-mist"
          >
            重新分析
          </button>
        </div>
        <RestartAssessmentDialog
          open={confirmOpen}
          description="重新分析將刪除目前的感情分析結果，且無法復原。確定要重新開始嗎？"
          onConfirm={startFresh}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    );
  }

  if (storedProgress && Object.keys(storedProgress.answers).length > 0) {
    return (
      <div className="rounded-sm border border-mist bg-paper-raised p-6">
        <p className="leading-relaxed text-graphite">
          你有一份未完成的作答（已完成 {Object.keys(storedProgress.answers).length}／{LOVE_TOTAL_QUESTIONS} 題）。
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={resumeQuiz}
            className="rounded-sm bg-gold px-5 py-3 font-medium text-paper transition-colors hover:bg-gold-deep"
          >
            繼續作答（第 {Math.min(storedProgress.currentIndex, LOVE_TOTAL_QUESTIONS - 1) + 1} 題）
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-sm border border-ink px-5 py-3 text-ink transition-colors hover:bg-mist"
          >
            重新開始
          </button>
        </div>
        <RestartAssessmentDialog
          open={confirmOpen}
          description="重新開始將清除目前的作答進度。確定嗎？"
          onConfirm={startFresh}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-mist bg-paper-raised p-6">
      <p className="leading-relaxed text-graphite">
        共 {LOVE_TOTAL_QUESTIONS} 題感情情境題，每題三個選項，選項沒有好壞之分。
        依你實際上最可能的做法作答即可，約需 5 分鐘。
        作答進度會自動儲存在你裝置的瀏覽器中，可以隨時返回修改答案。
      </p>
      <p className="mt-4 text-sm leading-relaxed text-stone">
        此分析反映你在人際與親密關係情境作答所呈現的外顯決策傾向，
        不是心理診斷、不是人格定論、不是未來預測。
      </p>
      <button
        type="button"
        onClick={() => setQuiz({ answers: {}, index: 0, startedAt: now() })}
        className="mt-6 rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors hover:bg-gold-deep"
      >
        開始作答
      </button>
    </div>
  );
}
