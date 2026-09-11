import { Link } from "react-router-dom";
import { applyLinkFor } from "../config.js";

/**
 * On-page display of a single matched department in the result view.
 * @param {{
 *   rank: number,
 *   department: {
 *     slug: string, name: string, longDescription: string,
 *     traits?: string[], applyLink?: string
 *   },
 *   score: number
 * }} props
 */
export default function ResultCard({ rank, department }) {
  const isTop = rank === 1;
  const applyHref = applyLinkFor(department);
  return (
    <article
      style={{ animationDelay: `${(rank - 1) * 140}ms` }}
      className={`card animate-pop-in p-6 ${isTop ? "bg-sky" : "bg-white"}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`grid h-12 w-12 flex-shrink-0 -rotate-6 place-items-center rounded-2xl border-[3px] border-navy text-lg font-bold shadow-hard-sm ${
            isTop ? "bg-blue text-white" : "bg-white text-navy"
          }`}
        >
          #{rank}
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-dark">
            {isTop ? "🏆 Your top match" : "🥈 Runner-up"}
          </p>
          <h3 className="text-2xl font-bold leading-tight text-navy">
            {department.name}
          </h3>
        </div>
      </div>

      <p className="text-[15px] font-medium leading-relaxed text-navy/80">
        {department.longDescription}
      </p>

      {department.traits?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {department.traits.map((trait) => (
            <span key={trait} className="sticker">
              {trait}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <Link to={`/departments/${department.slug}`} className="btn-secondary">
          See department
        </Link>
        {applyHref ? (
          <a
            href={applyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Apply
          </a>
        ) : null}
      </div>
    </article>
  );
}
