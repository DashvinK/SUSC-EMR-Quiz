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

  return (
    <div>
      <ProgressBar current={index + 1} total={questions.length} />

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
        <span className="text-sm font-bold text-navy/50">
          Tap an answer 👆
        </span>
      </div>
    </div>
  );
}
