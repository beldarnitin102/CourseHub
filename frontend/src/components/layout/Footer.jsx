export default function Footer() {
return ( <footer className="border-t border-gray-200 bg-white"> <div className="mx-auto max-w-7xl px-6 py-12">

    <div className="grid gap-10 md:grid-cols-4">

      {/* Brand */}
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]">
            <span className="font-bold text-white">CH</span>
          </div>

          <h2 className="text-xl font-bold text-[#111827]">
            CourseHub
          </h2>
        </div>

        <p className="text-gray-500">
          Learn new skills, build projects, and advance your career
          with industry-ready courses.
        </p>
      </div>

      {/* Company */}
      <div>
        <h3 className="mb-4 font-semibold text-[#111827]">
          Company
        </h3>

        <ul className="space-y-2 text-gray-500">
          <li>About</li>
          <li>Careers</li>
          <li>Contact</li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h3 className="mb-4 font-semibold text-[#111827]">
          Resources
        </h3>

        <ul className="space-y-2 text-gray-500">
          <li>Courses</li>
          <li>Blog</li>
          <li>Help Center</li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h3 className="mb-4 font-semibold text-[#111827]">
          Legal
        </h3>

        <ul className="space-y-2 text-gray-500">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>

    </div>

    <div className="mt-10 border-t border-gray-200 pt-6 text-center text-gray-500">
      © {new Date().getFullYear()} CourseHub. All rights reserved.
    </div>

  </div>
</footer>

);
}
