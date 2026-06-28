import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AdminLayout from "../../components/dashboard/AdminLayout";
import AdminStatCard from "../../components/dashboard/AdminStatCard";

import {
  getDashboardStats,
} from "../../services/operations/adminAPI";

export default function Dashboard() {

  const { token } = useSelector(
    (state) => state.auth
  );

  const [stats, setStats] = useState(null);

  useEffect(() => {

    async function fetchStats() {

      const response =
        await getDashboardStats(token);

      if (response?.success) {
        setStats(response.data);
      }

    }

    fetchStats();

  }, []);

  if (!stats)
    return <div>Loading...</div>;

  return (

    <AdminLayout>

      <h1 className="mb-10 text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        <AdminStatCard
          title="Students"
          value={stats.totalStudents}
          color="text-blue-600"
        />

        <AdminStatCard
          title="Instructors"
          value={stats.totalInstructors}
          color="text-green-600"
        />

        <AdminStatCard
          title="Admins"
          value={stats.totalAdmins}
          color="text-red-500"
        />

        <AdminStatCard
          title="Courses"
          value={stats.totalCourses}
          color="text-purple-600"
        />

        <AdminStatCard
          title="Categories"
          value={stats.totalCategories}
          color="text-orange-600"
        />

      </div>

    </AdminLayout>
  );
}