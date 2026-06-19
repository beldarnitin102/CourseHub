import DashboardLayout from "../DashboardLayout";

export default function CourseBuilder() {
  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Course Builder
      </h1>

      <div className="rounded-3xl bg-white p-8 shadow-md">

        <button className="rounded-xl bg-[#2563EB] px-6 py-3 text-white">
          + Add Section
        </button>

      </div>

    </DashboardLayout>
  );
}