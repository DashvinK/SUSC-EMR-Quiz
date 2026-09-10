import { Link } from "react-router-dom";

/**
 * Compact department card for the directory grid and result cross-links.
 * @param {{
 *   department: { slug: string, name: string, shortBlurb: string, traits?: string[] },
 *   rank?: number,
 *   tilt?: string   // optional tailwind rotate class for playful variation
 * }} props
 */
export default function DepartmentCard({ department, rank, tilt = "", index = 0 }) {
  return (
    <Link
      to={`/departments/${department.slug}`}
      style={{ animationDelay: `${index * 70}ms` }}
      className={`card group flex h-full animate-pop-in flex-col p-5 transition-all duration-200 hover:rotate-0 hover:-translate-y-1 hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none ${tilt}`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold leading-tight text-navy">
          {department.name}
        </h3>
        {rank ? (
          <span className="flex-shrink-0 -rotate-3 rounded-full border-2 border-navy bg-blue px-2.5 py-1 text-xs font-bold text-white shadow-hard-sm">
            #{rank} match
          </span>
        ) : null}
      </div>

      <p className="flex-1 text-sm font-medium leading-relaxed text-navy/70">
        {department.shortBlurb}
      </p>

      {department.traits?.length ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {department.traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full border-2 border-navy/80 bg-sky px-2.5 py-0.5 text-xs font-bold text-navy/70"
            >
              {trait}
            </span>
          ))}
        </div>
      ) : null}

      <span className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-bold text-blue-dark group-hover:gap-2">
        Learn more →
      </span>
    </Link>
  );
}
