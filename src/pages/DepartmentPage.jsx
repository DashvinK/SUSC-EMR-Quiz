import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { departments, getDepartment } from "../data/departments.js";

export default function DepartmentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const department = getDepartment(slug);

  useEffect(() => {
    if (!department) navigate("/departments", { replace: true });
  }, [department, navigate]);

  if (!department) return null;

  const index = departments.findIndex((d) => d.slug === slug);
  const next = departments[(index + 1) % departments.length];

  return (
    <article className="flex flex-col gap-8">
      <Link
        to="/departments"
        className="w-fit rounded-full border-2 border-navy bg-white px-4 py-1.5 text-sm font-bold text-navy shadow-hard-sm transition-all hover:-translate-x-0.5"
      >
        ← All departments
      </Link>

      <header>
        <span className="sticker -rotate-2">Department</span>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-navy">
          {department.name}
        </h1>
        <p className="mt-2 text-lg font-medium text-navy/70">
          {department.shortBlurb}
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
      </header>

      <section className="card bg-sky p-6">
        <h2 className="text-xl font-bold text-navy">What they do 🛠️</h2>
        <p className="mt-2 font-medium leading-relaxed text-navy/80">
          {department.longDescription}
        </p>
      </section>

      {/* Past-event photos (§11: 2–3 per department pending). */}
      <section>
        <h2 className="mb-3 text-xl font-bold text-navy">In action 📸</h2>
        {department.photos?.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {department.photos.map((photo, i) => (
              <img
                key={i}
                src={photo.src ?? photo}
                alt={photo.alt ?? `${department.name} event photo ${i + 1}`}
                loading="lazy"
                className="aspect-square w-full rounded-2xl border-[3px] border-navy object-cover"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["📷", "🎉", "🤝"].map((emoji, i) => (
              <div
                key={i}
                className="grid aspect-square w-full place-items-center rounded-2xl border-[3px] border-dashed border-navy/40 bg-white text-3xl"
              >
                <span className="opacity-60">{emoji}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Actions */}
      <section className="flex flex-wrap gap-3">
        {department.applyLink ? (
          <a
            href={department.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Apply to {department.name}
          </a>
        ) : (
          <span className="btn-primary pointer-events-none opacity-60">
            Applications opening soon
          </span>
        )}
        <Link to="/quiz" className="btn-secondary">
          Not sure? Take the quiz
        </Link>
      </section>

      {/* Next department */}
      <nav className="border-t-[3px] border-navy pt-6">
        <Link
          to={`/departments/${next.slug}`}
          className="group flex items-center justify-between rounded-chunk border-[3px] border-navy bg-white p-4 shadow-hard-sm transition-all hover:-translate-y-0.5 hover:shadow-hard"
        >
          <span className="text-sm font-bold text-navy/60">Next up →</span>
          <span className="font-display text-lg font-bold text-navy">
            {next.name}
          </span>
        </Link>
      </nav>
    </article>
  );
}
