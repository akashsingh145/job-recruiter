
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBriefcase, FaBars, FaTimes, FaArrowRight } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 transition group-hover:scale-105">
            <FaBriefcase />
          </div>

          <div>
            <h1 className="text-lg font-extrabold leading-none text-slate-900 sm:text-xl">
              Job <span className="text-blue-600">Recurator</span>
            </h1>

            <p className="mt-1 hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
              Build Your Career
            </p>
          </div>
        </Link>

        {/*  DESKTOP MENU */}
        <div className="hidden items-center gap-8 md:flex">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold transition ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Home
                <span
                  className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-blue-600 transition-all ${
                    isActive ? "w-full" : "w-0"
                  }`}
                ></span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/job"
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold transition ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Browse Jobs
                <span
                  className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-blue-600 transition-all ${
                    isActive ? "w-full" : "w-0"
                  }`}
                ></span>
              </>
            )}
          </NavLink>

          {/* LOGIN */}
          <NavLink
            to="/login"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Login
          </NavLink>

          {/* REGISTER */}
          <Link
            to="/register"
            className="group flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Register
            <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
          </Link>

        </div>

        {/*  MOBILE BUTTON  */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU  */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">

          <div className="flex flex-col gap-2">

            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/job"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`
              }
            >
              Browse Jobs
            </NavLink>

            <NavLink
              to="/login"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`
              }
            >
              Login
            </NavLink>

            <Link
              to="/register"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Register
              <FaArrowRight className="text-xs" />
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

