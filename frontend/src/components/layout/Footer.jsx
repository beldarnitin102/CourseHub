import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]">
                <span className="font-bold text-white">
                  CH
                </span>
              </div>

              <h2 className="text-2xl font-bold">
                CourseHub
              </h2>

            </div>

            <p className="leading-relaxed text-gray-400">
              Learn new skills, build projects, and grow your career
              with industry-focused courses.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Resources
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Courses</li>
              <li>Blog</li>
              <li>Help Center</li>
              <li>Community</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Legal
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-gray-700 pt-8 text-center text-gray-400">
          © {new Date().getFullYear()} CourseHub. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}