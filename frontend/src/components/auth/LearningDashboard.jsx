export default function LearningDashboard() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">

      {/* Background */}
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-blue-50 via-white to-blue-100" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-5xl font-bold leading-tight text-[#111827]">
            Learn.
            <br />
            Build.
            <br />
            Grow.
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Transform your goals into real-world skills and
            accelerate your career with industry-ready courses.
          </p>
        </div>

        {/* Progress Cards */}
        <div className="space-y-5">

          <div className="animate-float-slow rounded-3xl bg-white p-5 shadow-xl">
            <div className="flex justify-between">
              <span className="font-semibold">
                React Development
              </span>

              <span className="text-blue-600">
                85%
              </span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-gray-200">
              <div className="h-2 w-[85%] rounded-full bg-[#2563EB]" />
            </div>
          </div>

          <div className="animate-float-medium rounded-3xl bg-white p-5 shadow-xl">
            <div className="flex justify-between">
              <span className="font-semibold">
                Backend Engineering
              </span>

              <span className="text-blue-600">
                72%
              </span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-gray-200">
              <div className="h-2 w-[72%] rounded-full bg-[#2563EB]" />
            </div>
          </div>

          <div className="animate-float-slow rounded-3xl bg-white p-5 shadow-xl">
            <div className="flex justify-between">
              <span className="font-semibold">
                Interview Ready
              </span>

              <span className="text-blue-600">
                64%
              </span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-gray-200">
              <div className="h-2 w-[64%] rounded-full bg-[#2563EB]" />
            </div>
          </div>

        </div>

        {/* Stats */}
        <div className="mt-10 flex gap-12">

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
              1K+
            </h3>

            <p className="text-gray-500">
              Courses
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}