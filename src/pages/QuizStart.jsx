import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext.jsx";
import { QUIZ_LENGTHS } from "../data/questions.js";

const OPTIONS = [
  {
    ...QUIZ_LENGTHS.quick,
    emoji: "⚡",
    tagline: "The fast read",
    description: "Ten questions, about two minutes. Great if you just want a match.",
    tilt: "-rotate-1",
  },
  {
    ...QUIZ_LENGTHS.thorough,
    emoji: "🔍",
    tagline: "The sharp read",
    description:
      "Fifteen questions. Adds tie-breakers to separate close departments more precisely.",
    tilt: "rotate-1",
  },
];

export default function QuizStart() {
  const navigate = useNavigate();
  const { startQuiz } = useQuiz();

  function choose(length) {
    startQuiz(length);
    navigate("/quiz/play");
  }

  return (
    <div>
      <div className="mb-10 text-center">
        <span className="sticker rotate-2">Step 1</span>
        <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
          Pick your quiz length 📏
        </h1>
        <p className="mx-auto mt-2 max-w-md font-medium text-navy/70">
          Both match you to your top 2 departments. Longer just means a sharper
          result.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {OPTIONS.map((opt, i) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => choose(opt.key)}
            style={{ animationDelay: `${i * 110}ms` }}
            className={`card group flex animate-pop-in flex-col p-6 text-left transition-all duration-200 hover:rotate-0 hover:-translate-y-1 hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none ${opt.tilt}`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl border-[3px] border-navy bg-sky text-3xl">
              {opt.emoji}
            </span>
            <span className="mt-4 text-sm font-bold uppercase tracking-wide text-blue-dark">
              {opt.tagline}
            </span>
            <span className="text-3xl font-bold text-navy">{opt.label}</span>
            <span className="mt-1 text-sm font-bold text-navy/60">
              {opt.count} questions
            </span>
            <span className="mt-3 flex-1 text-sm font-medium leading-relaxed text-navy/70">
              {opt.description}
            </span>
            <span className="mt-4 inline-flex w-fit rounded-full border-2 border-navy bg-blue px-4 py-1.5 text-sm font-bold text-white transition group-hover:bg-blue-dark">
              Start →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
