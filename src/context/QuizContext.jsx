import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getQuestions } from "../data/questions.js";
import { scoreQuiz } from "../lib/scoring.js";
import { captureQrSource } from "../lib/qrSource.js";

const QuizContext = createContext(null);

/**
 * Holds the quiz state shared across QuizStart → QuizPlay → QuizResult:
 * chosen length, per-question answers, and the computed result. Also captures
 * the QR `?src=` param once on mount.
 */
export function QuizProvider({ children }) {
  const [quizLength, setQuizLength] = useState(null); // "quick" | "thorough"
  const [answers, setAnswers] = useState({}); // { [questionId]: optionIndex }
  const [result, setResult] = useState(null); // { top2, scores, quizLength }

  // Capture QR source on first load (§10).
  useEffect(() => {
    captureQrSource();
  }, []);

  const questions = useMemo(
    () => (quizLength ? getQuestions(quizLength) : []),
    [quizLength]
  );

  function startQuiz(length) {
    setQuizLength(length);
    setAnswers({});
    setResult(null);
  }

  function answerQuestion(questionId, optionIndex) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  // Compute and store the result. Accepts an explicit answers map so callers can
  // finalize on the same tick they record the last answer (React state is async).
  function finishQuiz(finalAnswers = answers) {
    const answeredOptions = questions.map((q) => q.options[finalAnswers[q.id]]);
    const { top2, scores } = scoreQuiz(answeredOptions);
    const computed = { top2, scores, quizLength };
    setResult(computed);
    return computed;
  }

  function resetQuiz() {
    setQuizLength(null);
    setAnswers({});
    setResult(null);
  }

  const value = useMemo(
    () => ({
      quizLength,
      questions,
      answers,
      result,
      startQuiz,
      answerQuestion,
      finishQuiz,
      resetQuiz,
    }),
    [quizLength, questions, answers, result]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within a QuizProvider");
  return ctx;
}
