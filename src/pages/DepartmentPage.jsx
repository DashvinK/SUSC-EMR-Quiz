import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { departments, getDepartment } from "../data/departments.js";
import { applyLinkFor } from "../config.js";

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
  const applyHref = applyLinkFor(department);

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

      {/* Content + sticky action sidebar on desktop; stacked on mobile
          (actions surface right under the header via order utilities). */}
      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-8">
        {/* Action sidebar */}
        <aside className="flex flex-col gap-3 lg:order-2 lg:sticky lg:top-28">
          <div className="card p-5">
            <h2 className="text-lg font-bold text-navy">Interested? 🙌</h2>
            <p className="mt-1 text-sm font-medium leading-relaxed text-navy/70">
              {department.closing || "Take the next step or see if it's your match."}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {applyHref ? (
                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  Apply to {department.name}
                </a>
              ) : (
                <span className="btn-primary pointer-events-none w-full opacity-60">
                  Applications opening soon
                </span>
              )}
              <Link to="/quiz" className="btn-secondary w-full">
                Not sure? Take the quiz
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="mt-8 flex flex-col gap-8 lg:order-1 lg:mt-0">
          <section className="card bg-sky p-6">
            <h2 className="text-xl font-bold text-navy">What they do 🛠️</h2>
            <p className="mt-2 font-medium leading-relaxed text-navy/80">
              {department.longDescription}
            </p>
          </section>

          {/* Events / initiatives / teams */}
          {department.events?.length ? (
            <section>
              <h2 className="mb-4 text-xl font-bold text-navy">
                {department.eventsTitle || "Events & Initiatives"} ✨
              </h2>
              <div className="flex flex-col gap-4">
                {department.events.map((event, i) => (
                  <div
                    key={event.title}
                    className={`card p-5 ${i % 2 ? "-rotate-[0.5deg]" : "rotate-[0.5deg]"}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid h-8 w-8 flex-shrink-0 -rotate-3 place-items-center rounded-xl border-2 border-navy bg-blue text-sm font-bold text-white shadow-hard-sm">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold leading-tight text-navy">
                          {event.title}
                        </h3>
                        {event.tagline ? (
                          <p className="mt-1 text-sm font-semibold text-blue-dark">
                            {event.tagline}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {event.points?.length ? (
                      <ul className="mt-3 flex flex-col gap-1.5 pl-11">
                        {event.points.map((point, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-[15px] font-medium leading-snug text-navy/80"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-navy/50" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

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
        </div>
      </div>
    </article>
  );
}
