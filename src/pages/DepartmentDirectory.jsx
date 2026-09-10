import { Link } from "react-router-dom";
import { departments } from "../data/departments.js";
import DepartmentCard from "../components/DepartmentCard.jsx";

const TILTS = ["-rotate-1", "rotate-1"];

export default function DepartmentDirectory() {
  return (
    <div>
      <header className="mb-10 text-center">
        <span className="sticker -rotate-2">The whole crew</span>
        <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
          The eight departments 🏛️
        </h1>
        <p className="mx-auto mt-2 max-w-lg font-medium text-navy/70">
          Every part of SUSC that keeps the council running. Not sure where you
          fit?{" "}
          <Link
            to="/quiz"
            className="font-bold text-blue-dark underline decoration-2 underline-offset-2"
          >
            Take the quiz
          </Link>
          .
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((department, i) => (
          <DepartmentCard
            key={department.slug}
            department={department}
            tilt={TILTS[i % TILTS.length]}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
