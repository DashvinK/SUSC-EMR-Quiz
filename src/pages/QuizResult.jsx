import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext.jsx";
import { getDepartment } from "../data/departments.js";
import { getQrSource } from "../lib/qrSource.js";
import { submitResult } from "../lib/submit.js";
import { shareCard } from "../lib/shareCard.js";
import ResultCard from "../components/ResultCard.jsx";
import ShareCardPreview from "../components/ShareCardPreview.jsx";
import { EMR_FORM_URL, applyLinkFor } from "../config.js";

export default function QuizResult() {
  const navigate = useNavigate();
  const { result, participant, resetQuiz } = useQuiz();

  const shareRef = useRef(null);
  const submittedRef = useRef(false); // guard against StrictMode double-fire
  const [shareState, setShareState] = useState("idle"); // idle | working | done | error

  // Guard: no result in memory (e.g. refresh / deep link) → back to start.
  useEffect(() => {
    if (!result) navigate("/quiz", { replace: true });
  }, [result, navigate]);

  // Build the base payload once we have a result.
  const dept1 = result ? getDepartment(result.top2[0].slug) : null;
  const dept2 = result ? getDepartment(result.top2[1].slug) : null;

  // §9: fire the submission in the background as soon as the result renders.
  useEffect(() => {
    if (!result || submittedRef.current) return;
    submittedRef.current = true;

    submitResult({
      qrSource: getQrSource(),
      quizLength: result.quizLength,
      dept1: result.top2[0].slug,
      dept2: result.top2[1].slug,
      scoreBreakdown: result.scores,
      name: participant.name,
      studentId: participant.studentId,
    });
    // Best-effort; submitResult never throws and never surfaces errors (§9.3).
  }, [result, participant]);

  if (!result || !dept1 || !dept2) return null;

  // Apply link: prefer the top match's own link, else the central EMR form.
  const applyHref = applyLinkFor(dept1) || EMR_FORM_URL;

  async function handleShare() {
    if (!shareRef.current) return;
    setShareState("working");
    try {
      await shareCard(shareRef.current, {
        title: "My SUSC department match",
        text: `I matched with ${dept1.name} and ${dept2.name} — which SUSC department suits you?`,
        filename: "susc-department-match.png",
      });
      setShareState("done");
    } catch {
      setShareState("error");
    }
  }

  function retake() {
    resetQuiz();
    navigate("/quiz");
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="text-center">
        <span className="sticker animate-wiggle rotate-2">🎉 Ta-da!</span>
        <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
          You're a match for {dept1.name} &amp; {dept2.name}
        </h1>
        <p className="mx-auto mt-2 max-w-md font-medium text-navy/70">
          Based on your answers, here are the two departments that fit you best.
        </p>
      </header>

      {/* Body: single column on mobile, matches | share+email on desktop */}
      <div className="lg:grid lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
        {/* Left: the two matches */}
        <div className="grid gap-4">
          <ResultCard rank={1} department={dept1} score={result.top2[0].score} />
          <ResultCard rank={2} department={dept2} score={result.top2[1].score} />
        </div>

        {/* Right: share card + email (sticky on desktop) */}
        <div className="mt-8 flex flex-col items-center gap-6 lg:mt-0 lg:sticky lg:top-28">
          <section className="flex flex-col items-center gap-4">
            <ShareCardPreview ref={shareRef} dept1={dept1} dept2={dept2} />
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={handleShare}
                className="btn-primary"
                disabled={shareState === "working"}
              >
                {shareState === "working" ? "Preparing…" : "Share my result 📸"}
              </button>
              {shareState === "error" ? (
                <p className="rounded-xl border-2 border-navy bg-white px-3 py-2 text-sm font-bold text-blue-dark">
                  Couldn't generate the image — try again.
                </p>
              ) : null}
            </div>
          </section>

          {/* Apply CTA (post-reveal) */}
          <div className="w-full max-w-sm">
            <div className="card bg-sky p-6 text-center">
              <p className="text-4xl">🚀</p>
              <h3 className="mt-2 text-xl font-bold text-navy">
                Feeling {dept1.name}? Apply now!
              </h3>
              <p className="mt-1 text-sm font-medium text-navy/70">
                SUSC EMR is open. Take your shot — it only takes a few minutes.
              </p>
              {applyHref ? (
                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-4 w-full"
                >
                  Apply to SUSC →
                </a>
              ) : (
                <span className="btn-primary pointer-events-none mt-4 w-full opacity-60">
                  Applications opening soon
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary actions */}
      <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={retake} className="btn-secondary">
          🔄 Retake quiz
        </button>
        <Link to="/departments" className="btn-secondary">
          Explore all departments
        </Link>
      </div>
    </div>
  );
}
