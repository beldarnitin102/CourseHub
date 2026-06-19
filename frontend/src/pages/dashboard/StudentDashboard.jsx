import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function StudentDashboard() {
  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold text-[#111827]">
        Student Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="text-gray-500">
            Enrolled Courses
          </h3>

          <p className="mt-3 text-4xl font-bold">
            12
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="text-gray-500">
            Certificates
          </h3>

          <p className="mt-3 text-4xl font-bold">
            5
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="text-gray-500">
            Completed
          </h3>

          <p className="mt-3 text-4xl font-bold">
            8
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="text-gray-500">
            Progress
          </h3>

          <p className="mt-3 text-4xl font-bold">
            72%
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
}