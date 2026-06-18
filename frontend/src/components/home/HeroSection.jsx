export default function HeroSection() {
  return (
    <section className="bg-[#F3F4F6]">
      <div className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Content */}
          <div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#2563EB]">
              🚀 Learn Without Limits
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-[#111827] lg:text-7xl">
              Master Skills.
              <br />
              Build Projects.
              <br />
              Launch Your Career.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-600">
              Learn from industry-ready courses designed to help
              you gain real-world skills, build confidence, and
              grow faster in your career.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button className="rounded-xl bg-[#2563EB] px-7 py-4 font-semibold text-white transition hover:scale-105">
                Explore Courses
              </button>

              <button className="rounded-xl border border-gray-300 bg-white px-7 py-4 font-semibold text-[#111827] transition hover:bg-gray-50">
                Become Instructor
              </button>

            </div>

            <div className="mt-12 flex gap-10">

              <div>
                <h3 className="text-3xl font-bold text-[#111827]">
                  20K+
                </h3>
                <p className="text-gray-500">
                  Students
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#111827]">
                  1000+
                </h3>
                <p className="text-gray-500">
                  Courses
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#111827]">
                  500+
                </h3>
                <p className="text-gray-500">
                  Instructors
                </p>
              </div>

            </div>

          </div>

          {/* Right Content */}
          <div className="relative">

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold text-[#111827]">
                  Learning Progress
                </h3>

                <span className="font-semibold text-green-600">
                  75%
                </span>
              </div>

              <div className="h-3 rounded-full bg-gray-200">
                <div className="h-3 w-3/4 rounded-full bg-green-500"></div>
              </div>

              <div className="mt-8 space-y-4">

                <div className="rounded-xl bg-gray-100 p-4">
                  React Development
                </div>

                <div className="rounded-xl bg-gray-100 p-4">
                  Node.js Backend
                </div>

                <div className="rounded-xl bg-gray-100 p-4">
                  MongoDB Database
                </div>

              </div>

            </div>

            <div className="absolute -left-10 top-10 rounded-2xl bg-white p-4 shadow-lg">
              👨‍🎓 20K+ Students
            </div>

            <div className="absolute -right-10 bottom-10 rounded-2xl bg-white p-4 shadow-lg">
              📚 1000+ Courses
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}