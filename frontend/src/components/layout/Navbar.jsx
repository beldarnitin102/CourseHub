import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-[#2563EB]"
        : "text-[#4B5563] hover:text-[#2563EB]"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] shadow-md">
            <span className="text-lg font-bold text-white">
              CH
            </span>
          </div>

          <span className="text-2xl font-bold text-[#111827]">
            CourseHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink
            to="/courses"
            className={navLinkClass}
          >
            Courses
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
          >
            Contact
          </NavLink>
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-[#111827] transition hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-medium text-white transition hover:scale-105"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-[#111827]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">

          <div className="flex flex-col px-6 py-4">

            <NavLink
              to="/"
              className="py-3 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/courses"
              className="py-3 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Courses
            </NavLink>

            <NavLink
              to="/about"
              className="py-3 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className="py-3 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>

            <hr className="my-3" />

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-3 font-medium"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-[#2563EB] px-5 py-3 text-center font-medium text-white"
            >
              Signup
            </Link>

          </div>

        </div>
      )}
    </nav>
  );
}