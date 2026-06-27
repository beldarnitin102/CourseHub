import DashboardLayout from "../dashboard/DashboardLayout";

export default function Profile() {

  
  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        My Profile
      </h1>

      <div className="rounded-3xl bg-white p-8 shadow-md">

        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#2563EB] text-4xl font-bold text-white">
            JB
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              John Doe
            </h2>

            <p className="text-gray-500">
              john@gmail.com
            </p>

            <button className="mt-4 rounded-xl bg-[#2563EB] px-5 py-2 text-white">
              Edit Profile
            </button>
          </div>

        </div>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold">
            Personal Details
          </h3>

          <p>First Name: John</p>
          <p>Last Name: Doe</p>
          <p>Contact: +91 9876543210</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold">
            About
          </h3>

          <p className="text-gray-600">
            Passionate learner exploring Full Stack Development.
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
}