import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] shadow-md">
            <span className="text-lg font-bold text-white">
              CH
            </span>
          </div>

          <span className="text-2xl font-bold text-[#111827]">
            CourseHub
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-[#4B5563] transition hover:text-[#2563EB]"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="font-medium text-[#4B5563] transition hover:text-[#2563EB]"
          >
            Courses
          </Link>

          <Link
            to="/about"
            className="font-medium text-[#4B5563] transition hover:text-[#2563EB]"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="font-medium text-[#4B5563] transition hover:text-[#2563EB]"
          >
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
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
      </div>
    </nav>
  );
}