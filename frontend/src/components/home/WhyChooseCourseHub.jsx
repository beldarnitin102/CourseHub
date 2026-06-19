export default function WhyChooseCourseHub() {
  const features = [
    {
      icon: "🎯",
      title: "Industry-Focused Learning",
      description:
        "Learn skills that companies actually look for through practical and up-to-date courses.",
    },
    {
      icon: "💼",
      title: "Real-World Projects",
      description:
        "Build portfolio-ready projects that showcase your abilities and strengthen your resume.",
    },
    {
      icon: "🏆",
      title: "Certificates & Recognition",
      description:
        "Earn certificates on course completion to demonstrate your achievements and progress.",
    },
    {
      icon: "🚀",
      title: "Career Growth",
      description:
        "Prepare for interviews, improve problem-solving skills, and accelerate your professional journey.",
    },
  ];

  return (
    <section className="bg-[#F3F4F6] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#2563EB]">
            Why CourseHub
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#111827] lg:text-5xl">
            Learn Smarter, Grow Faster
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Everything you need to build skills, gain confidence,
            and move closer to your dream career.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                {feature.icon}
              </div>

              <h3 className="mb-3 text-2xl font-bold text-[#111827]">
                {feature.title}
              </h3>

              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

        {/* Bottom Stats */}
        <div className="mt-20 rounded-[32px] bg-[#2563EB] p-10 text-white">

          <div className="grid gap-8 text-center md:grid-cols-4">

            <div>
              <h3 className="text-4xl font-bold">
                20K+
              </h3>
              <p className="mt-2 text-blue-100">
                Active Learners
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">
                1K+
              </h3>
              <p className="mt-2 text-blue-100">
                Courses
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">
                500+
              </h3>
              <p className="mt-2 text-blue-100">
                Instructors
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">
                95%
              </h3>
              <p className="mt-2 text-blue-100">
                Satisfaction Rate
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}