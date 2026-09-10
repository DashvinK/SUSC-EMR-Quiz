import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Logo from "./Logo.jsx";

function navClass({ isActive }) {
  return [
    "rounded-full border-2 px-3 py-1.5 text-sm font-bold transition-all duration-200 active:scale-95",
    isActive
      ? "border-navy bg-blue text-white shadow-hard-sm"
      : "border-transparent text-navy/70 hover:border-navy hover:bg-white hover:text-navy",
  ].join(" ");
}

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="clip-x flex min-h-dvh flex-col">
      <header className="safe-top sticky top-0 z-20 border-b-[3px] border-navy bg-sky/95 backdrop-blur">
        <div className="safe-x mx-auto flex w-full max-w-6xl items-center justify-between py-3">
          <Link
            to="/"
            className="transition-transform duration-200 hover:-rotate-3 active:scale-95"
            aria-label="SUSC home"
          >
            <Logo size="h-10" />
          </Link>
          <nav className="flex items-center gap-1.5">
            <NavLink to="/quiz" className={navClass}>
              Quiz
            </NavLink>
            <NavLink to="/departments" className={navClass}>
              Departments
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Keyed on the path so each navigation replays the entrance animation.
          Pages set their own inner max-width; the shell just provides the frame. */}
      <main className="safe-x mx-auto w-full max-w-6xl flex-1 py-8 lg:py-12">
        <div key={pathname} className="animate-page-in">
          <Outlet />
        </div>
      </main>

      <footer className="border-t-[3px] border-navy bg-white">
        <div className="safe-x mx-auto w-full max-w-6xl py-6 text-center text-sm font-semibold text-navy/60">
          <p>✨ Sunway University Student Council — Executive Member Recruitment</p>
        </div>
      </footer>
    </div>
  );
}
