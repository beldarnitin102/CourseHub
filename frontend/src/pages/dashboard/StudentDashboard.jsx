import DashboardLayout from "../dashboard/DashboardLayout";
import { useSelector } from "react-redux";

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.profile);

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563EB] to-indigo-600 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Welcome Back, {user?.firstName || "Student"} 👋
        </h1>

        <p className="mt-3 text-lg text-blue-100">
          Continue your learning journey and achieve your goals.
        </p>

        <button className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-[#2563EB] transition hover:scale-105">
          Continue Learning
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1">
          <p className="text-4xl">📚</p>
          <h3 className="mt-4 text-gray-500">
            Enrolled Courses
          </h3>
          <p className="mt-2 text-4xl font-bold text-[#111827]">
            12
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1">
          <p className="text-4xl">🏆</p>
          <h3 className="mt-4 text-gray-500">
            Certificates
          </h3>
          <p className="mt-2 text-4xl font-bold text-[#111827]">
            5
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1">
          <p className="text-4xl">✅</p>
          <h3 className="mt-4 text-gray-500">
            Completed Lessons
          </h3>
          <p className="mt-2 text-4xl font-bold text-[#111827]">
            48
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1">
          <p className="text-4xl">📈</p>
          <h3 className="mt-4 text-gray-500">
            Progress
          </h3>
          <p className="mt-2 text-4xl font-bold text-[#111827]">
            72%
          </p>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mt-10">
        <h2 className="mb-5 text-2xl font-bold text-[#111827]">
          Continue Learning
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2].map((course) => (
            <div
              key={course}
              className="rounded-3xl bg-white p-6 shadow-lg"
            >
              <div className="mb-4 h-48 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100"></div>

              <h3 className="text-xl font-bold">
                MERN Stack Development
              </h3>

              <p className="mt-2 text-gray-500">
                72% Completed
              </p>

              <div className="mt-4 h-3 rounded-full bg-gray-200">
                <div className="h-3 w-[72%] rounded-full bg-[#2563EB]"></div>
              </div>

              <button className="mt-5 rounded-xl bg-[#2563EB] px-5 py-3 text-white transition hover:bg-blue-700">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-5 text-2xl font-bold">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl bg-gray-50 p-4">
              ✅ Completed React Hooks Module
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              🎯 Finished Node.js Assignment
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              📚 Enrolled in AI Fundamentals
            </div>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-5 text-2xl font-bold">
            Weekly Goal
          </h2>

          <p className="mb-4 text-gray-600">
            5 of 10 learning hours completed
          </p>

          <div className="h-4 rounded-full bg-gray-200">
            <div className="h-4 w-1/2 rounded-full bg-green-500"></div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Keep going! You're halfway there 🚀
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}