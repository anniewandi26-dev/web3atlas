"use client";

import { TechButton } from "@/components/TechButton";
import type { QuizQuestion } from "@/lib/content";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export function QuizChallenge({ questions }: { questions: QuizQuestion[] }) {
  const t = useTranslations("quiz");
  const tSec = useTranslations("sections");
  const [order, setOrder] = useState(() => questions.map((_, i) => i));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = useMemo(() => questions[order[index]], [questions, order, index]);

  function shuffle() {
    const next = [...order].sort(() => Math.random() - 0.5);
    setOrder(next);
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  function choose(i: number) {
    if (picked !== null || !q) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index >= order.length - 1) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  if (!q) return null;

  return (
    <div className="glass corner-marks rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.2em] text-cyan-300/80">{tSec("quiz")}</p>
          <h3 className="font-display mt-1 text-lg text-white">{tSec("quizTitle")}</h3>
        </div>
        <TechButton variant="ghost" onClick={shuffle} className="!px-3 !py-2 text-xs">
          {tSec("shuffle")}
        </TechButton>
      </div>

      {done ? (
        <div className="space-y-4 text-center">
          <p className="font-display text-2xl gradient-text">{t("done")}</p>
          <p className="text-[var(--muted)]">
            {t("score", { score, total: questions.length })}
          </p>
          <TechButton onClick={restart}>{t("restart")}</TechButton>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-[var(--muted)]">
            {index + 1} / {questions.length}
          </p>
          <p className="text-lg font-medium text-white">{q.question}</p>
          <div className="grid gap-2">
            {q.choices.map((choice, i) => {
              const show = picked !== null;
              const correct = i === q.answer;
              const selected = picked === i;
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => choose(i)}
                  className={[
                    "rounded-xl border px-4 py-3 text-left text-sm transition",
                    show && correct
                      ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
                      : show && selected
                        ? "border-rose-400/50 bg-rose-400/10 text-rose-200"
                        : "border-cyan-400/20 bg-black/20 hover:border-cyan-400/40",
                  ].join(" ")}
                >
                  {choice}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-cyan-200/90">
                {picked === q.answer ? t("correct") : t("wrong")}
              </span>
              <TechButton onClick={next} className="!px-4 !py-2 text-sm">
                {index >= order.length - 1 ? t("done") : t("next")}
              </TechButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
