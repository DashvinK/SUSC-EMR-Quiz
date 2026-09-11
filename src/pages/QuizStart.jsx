import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext.jsx";
import { QUIZ_LENGTHS } from "../data/questions.js";

const OPTIONS = [
  {
    ...QUIZ_LENGTHS.quick,
    emoji: "⚡",
    tagline: "The fast read",
    description: "The fast set, about two minutes. Great if you just want a match.",
    tilt: "-rotate-1",
  },
  {
    ...QUIZ_LENGTHS.thorough,
    emoji: "🔍",
    tagline: "The sharp read",
    description:
      "The full set. Adds tie-breakers to separate close departments more precisely.",
    tilt: "rotate-1",
  },
];

const INPUT_CLASS =
  "rounded-2xl border-[3px] border-navy bg-white px-4 py-3 text-base font-medium text-navy shadow-hard-sm transition-all duration-200 placeholder:text-navy/40 focus:-translate-y-0.5 focus:shadow-hard focus:outline-none";

export default function QuizStart() {
  const navigate = useNavigate();
  const { participant, setParticipant, startQuiz } = useQuiz();

  const [name, setName] = useState(participant.name || "");
  const [studentId, setStudentId] = useState(participant.studentId || "");
  const [error, setError] = useState("");
  const formRef = useRef(null);

  function choose(length) {
    const cleanName = name.trim();
    const cleanId = studentId.trim();

    if (!cleanName) {
      setError("Pop your name in first, then pick a length 👇");
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!/^\d{8}$/.test(cleanId)) {
      setError("Your student ID should be exactly 8 digits.");
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setParticipant({ name: cleanName, studentId: cleanId });
    startQuiz(length);
    navigate("/quiz/play");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <span className="sticker rotate-2">Step 1</span>
        <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
          First, the basics 📝
        </h1>
        <p className="mx-auto mt-2 max-w-md font-medium text-navy/70">
          Tell us who you are, then pick your quiz length. Both match you to your
          top 2 departments.
        </p>
      </div>

      {/* Identity form */}
      <div ref={formRef} className="card mb-6 p-6">
        <h2 className="text-lg font-bold text-navy">Who's taking the quiz?</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-navy/80">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              autoComplete="name"
              placeholder="e.g. Dashvin Kumar"
              className={INPUT_CLASS}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-navy/80">Student ID</span>
            <input
              type="text"
              value={studentId}
              onChange={(e) => {
                // digits only, max 8
                setStudentId(e.target.value.replace(/\D/g, "").slice(0, 8));
                if (error) setError("");
              }}
              inputMode="numeric"
              autoComplete="off"
              maxLength={8}
              placeholder="e.g. 23012345"
              className={INPUT_CLASS}
            />
          </label>
        </div>
        {error ? (
          <p
            className="mt-3 rounded-xl border-2 border-navy bg-white px-3 py-2 text-sm font-bold text-blue-dark"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>

      {/* Quiz length */}
      <h2 className="mb-4 text-center text-lg font-bold text-navy">
        Now pick your quiz length 📏
      </h2>
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
