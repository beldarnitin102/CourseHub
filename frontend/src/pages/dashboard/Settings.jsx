import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Settings
      </h1>

      <div className="rounded-3xl bg-white p-8 shadow-md">

        <div className="space-y-6">

          <div>
            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              className="w-full rounded-xl border p-4"
              placeholder="Enter Name"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              className="w-full rounded-xl border p-4"
              placeholder="Enter Email"
            />
          </div>

          <button className="rounded-xl bg-[#2563EB] px-8 py-3 text-white">
            Save Changes
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}