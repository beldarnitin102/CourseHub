import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function InstructorDashboard() {
  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold text-[#111827]">
        Instructor Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3>Total Courses</h3>
          <p className="mt-3 text-4xl font-bold">
            15
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3>Total Students</h3>
          <p className="mt-3 text-4xl font-bold">
            2,450
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3>Total Revenue</h3>
          <p className="mt-3 text-4xl font-bold">
            ₹85K
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
}