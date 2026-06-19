export default function BecomeInstructor() {
  return (
    <section className="bg-[#F3F4F6] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="overflow-hidden rounded-[40px] bg-[#111827] p-12 text-white lg:p-20">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                Become an Instructor
              </span>

              <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
                Share Your Knowledge.
                <br />
                Inspire Thousands.
              </h2>

              <p className="mt-6 text-lg text-gray-300">
                Create courses, teach learners around the world,
                and grow your impact while earning income.
              </p>

              <button className="mt-8 rounded-xl bg-[#2563EB] px-8 py-4 font-semibold text-white transition hover:scale-105">
                Start Teaching Today
              </button>
            </div>

            <div className="flex justify-center">

              <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-md">

                <div className="mb-6 text-center text-5xl">
                  👨‍🏫
                </div>

                <div className="space-y-5">

                  <div className="rounded-xl bg-white/10 p-4">
                    🎥 Create Courses
                  </div>

                  <div className="rounded-xl bg-white/10 p-4">
                    🌎 Reach Global Learners
                  </div>

                  <div className="rounded-xl bg-white/10 p-4">
                    💰 Earn Revenue
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}