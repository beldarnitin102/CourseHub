import { useSelector } from "react-redux";

export default function ProfileCard() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
      
      {/* Cover */}
      <div className="h-40 bg-gradient-to-r from-[#2563EB] to-indigo-600"></div>

      {/* Profile Content */}
      <div className="relative px-8 pb-8">

        {/* Profile Image */}
        <div className="-mt-16">
          <img
            src={
              user?.image ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName}`
            }
            alt="profile"
            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-[#111827]">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="mt-2 text-gray-500">
            {user?.email}
          </p>

          <span className="mt-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#2563EB]">
            {user?.accountType}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl bg-gray-50 p-5 text-center">
            <h3 className="text-3xl font-bold text-[#2563EB]">
              12
            </h3>
            <p className="text-gray-500">
              Courses
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5 text-center">
            <h3 className="text-3xl font-bold text-green-600">
              8
            </h3>
            <p className="text-gray-500">
              Completed
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5 text-center">
            <h3 className="text-3xl font-bold text-orange-500">
              72%
            </h3>
            <p className="text-gray-500">
              Progress
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}