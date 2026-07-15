import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import AdminLayout from "../../components/dashboard/AdminLayout";
import { getDashboardStats } from "../../services/operations/adminAPI";
import Loader from "../../components/Loader";

export default function Analytics() {
  const { token } = useSelector((state) => state.auth);

  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getDashboardStats(token);

      if (response?.success) {
        setStats(response.data);
      }
    }

    fetchData();
  }, [token]);

  if (!stats) {
    return (
      <AdminLayout>
        <div className="flex h-96 items-center justify-center text-xl font-semibold">
           <Loader />;
        </div>
      </AdminLayout>
    );
  }

  const cards = [
    {
      title: "Students",
      value: stats.totalStudents,
      icon: <Users size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Instructors",
      value: stats.totalInstructors,
      icon: <GraduationCap size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Courses",
      value: stats.totalCourses,
      icon: <BookOpen size={28} />,
      color: "bg-purple-500",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: <Layers size={28} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Analytics Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Overall performance of your learning platform.
          </p>
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1"
          >
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white ${card.color}`}
            >
              {card.icon}
            </div>

            <p className="text-slate-500">{card.title}</p>

            <h2 className="mt-2 text-4xl font-bold">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Analytics Grid */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl bg-white p-8 shadow">
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="text-blue-600" />
            <h2 className="text-2xl font-bold">
              Platform Growth
            </h2>
          </div>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span>Total Users</span>

              <span className="font-bold">
                {stats.totalStudents +
                  stats.totalInstructors +
                  stats.totalAdmins}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Admins</span>

              <span className="font-bold">
                {stats.totalAdmins}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Courses</span>

              <span className="font-bold">
                {stats.totalCourses}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Categories</span>

              <span className="font-bold">
                {stats.totalCategories}
              </span>
            </div>

          </div>
        </div>

        {/* Revenue */}

        <div className="rounded-3xl bg-white p-8 shadow">
          <div className="mb-6 flex items-center gap-3">
            <IndianRupee className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Revenue
            </h2>
          </div>

          <div className="rounded-2xl bg-green-50 p-8 text-center">

            <h3 className="text-slate-500">
              Total Revenue
            </h3>

            <p className="mt-3 text-5xl font-bold text-green-600">
              ₹
              {stats.totalRevenue
                ? stats.totalRevenue.toLocaleString()
                : 0}
            </p>

          </div>

          <p className="mt-6 text-sm text-slate-500">
            Revenue generated from all paid course enrollments.
          </p>

        </div>

      </div>
    </AdminLayout>
  );
}