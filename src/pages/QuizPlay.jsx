import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import QuestionCard from "../components/QuestionCard.jsx";

export default function QuizPlay() {
  const navigate = useNavigate();
  const { quizLength, questions, answers, answerQuestion, finishQuiz } = useQuiz();
  const [index, setIndex] = useState(0);

  // Guard: if someone deep-links here without starting a quiz, send them to start.
  useEffect(() => {
    if (!quizLength) navigate("/quiz", { replace: true });
  }, [quizLength, navigate]);

  if (!quizLength || questions.length === 0) return null;

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const selectedIndex = answers[question.id];

  function handleSelect(optionIndex) {
    answerQuestion(question.id, optionIndex);

    if (isLast) {
      // Finalize with the last answer merged in, then reveal the result.
      const finalAnswers = { ...answers, [question.id]: optionIndex };
      finishQuiz(finalAnswers);
      navigate("/quiz/result");
    } else {
      setIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  const pct = Math.round(((index + 1) / questions.length) * 100);

  return (
    <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-10">
      {/* Progress: full-width bar on mobile, sticky side rail on desktop */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="lg:hidden">
          <ProgressBar current={index + 1} total={questions.length} />
        </div>
        <div className="hidden lg:block">
          <span className="sticker -rotate-2">Quiz in progress</span>
          <p className="mt-4 font-display text-5xl font-bold text-navy">{pct}%</p>
          <p className="mt-1 text-sm font-bold text-navy/60">
            Question {index + 1} of {questions.length}
          </p>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full border-[3px] border-navy bg-white">
            <div
              className="h-full rounded-full bg-blue transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-6 text-sm font-medium leading-relaxed text-navy/60">
            Go with your gut — there are no wrong answers. Click one to continue.
          </p>
        </div>
      </aside>

      <div className="mx-auto w-full max-w-2xl lg:mx-0">
        <QuestionCard
          key={question.id}
          question={question}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
        />

        <div className="mt-7 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={index === 0}
            className="rounded-full border-2 border-navy bg-white px-4 py-1.5 text-sm font-bold text-navy shadow-hard-sm transition-all hover:-translate-x-0.5 disabled:invisible"
          >
            ← Back
          </button>
          <span className="text-sm font-bold text-navy/50">Tap an answer 👆</span>
        </div>
      </div>
    </div>
  );
}
