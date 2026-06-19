import MainLayout from "../../components/layout/MainLayout";

export default function CourseDetails() {
  return (
    <MainLayout>
      <section className="bg-[#F3F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

            <div>
              <div className="h-96 rounded-3xl bg-gray-300"></div>

              <h1 className="mt-8 text-5xl font-bold">
                Complete MERN Stack Development
              </h1>

              <p className="mt-6 text-lg text-gray-600">
                Learn React, Node.js, Express and MongoDB
                by building real-world projects.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="text-4xl font-bold text-[#2563EB]">
                ₹999
              </h2>

              <button className="mt-6 w-full rounded-xl bg-[#2563EB] py-4 font-semibold text-white">
                Enroll Now
              </button>

            </div>

          </div>

        </div>
      </section>
    </MainLayout>
  );
}