"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { AppShell } from "@/components/ui/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { QuizResult } from "@/components/quiz/QuizResult";
import { quizQuestions } from "@/lib/data/quiz";
import { supabase } from "@/lib/supabase/client";

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const question = quizQuestions[index];

  async function selectAnswer(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === question.correctIndex;
    const points = correct ? 10 : 0;
    if (correct) setScore((value) => value + points);

    const { data } = await supabase.auth.getSession();
    const payload = {
      question_id: question.id,
      chosen_index: optionIndex,
      is_correct: correct,
      points_earned: points
    };

    if (data.session?.user) {
      await supabase.from("quiz_answers").insert({ ...payload, user_id: data.session.user.id });
    } else {
      const existing = JSON.parse(localStorage.getItem("quiz_answers") ?? "[]");
      localStorage.setItem("quiz_answers", JSON.stringify([...existing, payload]));
      setShowSignInPrompt(true);
    }
  }

  function next() {
    if (index === quizQuestions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">Quiz</p>
          <h1 className="mt-2 text-3xl font-black">World Cup sharpener</h1>
        </div>
        {finished ? (
          <QuizResult score={score} total={quizQuestions.length} />
        ) : (
          <Card>
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-500">
                <span>Question {index + 1} of {quizQuestions.length}</span>
                <span>{score} pts</span>
              </div>
              <Progress value={((index + 1) / quizQuestions.length) * 100} />
            </div>
            <h2 className="text-2xl font-black">{question.question}</h2>
            <div className="mt-5 grid gap-3">
              {question.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === question.correctIndex;
                const isSelected = optionIndex === selected;
                return (
                  <button
                    key={option}
                    className={clsx(
                      "rounded-md border p-4 text-left font-semibold transition",
                      selected === null && "border-slate-200 hover:border-coral",
                      selected !== null && isCorrect && "border-green-500 bg-green-50 text-green-800",
                      selected !== null && isSelected && !isCorrect && "border-red-500 bg-red-50 text-red-800",
                      selected !== null && !isSelected && !isCorrect && "border-slate-200 opacity-60"
                    )}
                    onClick={() => selectAnswer(optionIndex)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <Button className="mt-5 w-full sm:w-auto" disabled={selected === null} onClick={next}>
              {index === quizQuestions.length - 1 ? "See results" : "Next question"}
            </Button>
            {showSignInPrompt && (
              <p className="mt-3 rounded-md bg-slate-100 p-3 text-sm font-semibold text-slate-700">
                Sign in to save your score.{" "}
                <Link href="/login" className="text-coral">
                  Go to login
                </Link>
              </p>
            )}
          </Card>
        )}
      </div>
    </AppShell>
  );
}
