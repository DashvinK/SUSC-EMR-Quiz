import { Link } from "react-router-dom";
import { departments } from "../data/departments.js";

const PILL_TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function Landing() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-chunk border-[3px] border-navy bg-blue px-6 py-14 text-center text-white shadow-hard-lg sm:px-10"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 85% 0%, #1A6E96 0%, #115C80 55%, #0E4A68 100%)",
        }}
      >
        {/* floating sticker decorations */}
        <span className="pointer-events-none absolute left-5 top-6 hidden animate-float text-3xl sm:block">
          🎯
        </span>
        <span className="pointer-events-none absolute right-6 top-10 hidden animate-float text-3xl [animation-delay:1.2s] sm:block">
          ✨
        </span>
        <span className="pointer-events-none absolute bottom-6 right-10 hidden animate-float text-3xl [animation-delay:0.6s] sm:block">
          💬
        </span>

        <span className="sticker animate-bounce-in -rotate-2 bg-white text-navy">
          SUSC · EMR
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-[1.08] sm:text-5xl">
          Which SUSC department suits you?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base font-medium text-white/90">
          Answer a few honest questions and we'll match you to your top 2 of
          eight departments. Takes about two minutes. 🕑
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-navy bg-white px-7 py-3.5 text-lg font-bold text-navy shadow-hard transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Take the quiz →
          </Link>
          <Link
            to="/departments"
            className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-white/70 px-7 py-3.5 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            Browse departments
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="mb-5 inline-block -rotate-1 text-2xl font-bold text-navy">
          How it works 👇
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {[
            { n: 1, e: "🙋", t: "Answer honestly", d: "10 quick questions (or 15 for a sharper read).", tilt: "-rotate-1" },
            { n: 2, e: "🎯", t: "Get matched", d: "We surface your top 2 departments instantly.", tilt: "rotate-1" },
            { n: 3, e: "🚀", t: "Explore & apply", d: "Read what each does and take the next step.", tilt: "-rotate-1" },
          ].map((step, i) => (
            <li
              key={step.n}
              style={{ animationDelay: `${i * 90}ms` }}
              className={`card animate-pop-in p-5 hover:-translate-y-1 hover:rotate-0 hover:shadow-hard-lg ${step.tilt}`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border-[3px] border-navy bg-sky text-2xl">
                {step.e}
              </span>
              <h3 className="mt-3 text-lg font-bold text-navy">
                {step.n}. {step.t}
              </h3>
              <p className="mt-1 text-sm font-medium text-navy/70">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Department teaser */}
      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-navy">Eight departments 🏛️</h2>
          <Link
            to="/departments"
            className="text-sm font-bold text-blue-dark hover:underline"
          >
            See all →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {departments.map((d, i) => (
            <Link
              key={d.slug}
              to={`/departments/${d.slug}`}
              style={{ animationDelay: `${i * 55}ms` }}
              className={`animate-pop-in rounded-full border-[3px] border-navy bg-white px-4 py-2 text-sm font-bold text-navy shadow-hard-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue hover:text-white hover:shadow-hard active:translate-y-0 active:shadow-none ${
                PILL_TILTS[i % PILL_TILTS.length]
              } hover:rotate-0`}
            >
              {d.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
