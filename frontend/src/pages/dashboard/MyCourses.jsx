import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function MyCourses() {
  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        My Courses
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">

        {[1, 2, 3].map((course) => (
          <div
            key={course}
            className="rounded-3xl bg-white p-6 shadow-md"
          >

            <div className="mb-4 h-48 rounded-2xl bg-gray-200"></div>

            <h3 className="text-xl font-bold">
              MERN Stack Development
            </h3>

            <p className="mt-2 text-gray-500">
              Progress 72%
            </p>

            <div className="mt-4 h-3 rounded-full bg-gray-200">

              <div className="h-3 w-[72%] rounded-full bg-[#2563EB]"></div>

            </div>

            <button className="mt-5 rounded-xl bg-[#2563EB] px-5 py-3 text-white">
              Continue Learning
            </button>

          </div>
        ))}

      </div>

    </DashboardLayout>
  );
}