import MainLayout from "../layouts/MainLayout";

export default function About() {
  return (
    <MainLayout>
      <section className="bg-[#F3F4F6] py-20">
        <div className="mx-auto max-w-6xl px-6">

          <h1 className="mb-6 text-5xl font-bold text-[#111827]">
            About CourseHub
          </h1>

          <p className="max-w-3xl text-lg text-gray-600">
            CourseHub is a modern learning platform built to help
            students learn in-demand skills, build real projects,
            and grow their careers. Our mission is to make quality
            education accessible and practical.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="mb-3 text-2xl font-bold">
                20K+
              </h3>
              <p className="text-gray-600">
                Students Learning
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="mb-3 text-2xl font-bold">
                1000+
              </h3>
              <p className="text-gray-600">
                Courses Available
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-md">
              <h3 className="mb-3 text-2xl font-bold">
                500+
              </h3>
              <p className="text-gray-600">
                Expert Instructors
              </p>
            </div>

          </div>

        </div>
      </section>
    </MainLayout>
  );
}