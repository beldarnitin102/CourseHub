import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DashboardLayout from "./DashboardLayout";

import { getInstructorDashboard }
from "../../services/operations/courseAPI";

export default function InstructorDashboard() {

  const { token } = useSelector(
    (state) => state.auth
  );

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    recentCourses: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const result =
      await getInstructorDashboard(token);

    if (result?.success) {
      setStats(result.data);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Instructor Dashboard
      </h1>

      <div className="mb-8 grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="text-gray-500">
            Total Courses
          </h3>

          <p className="mt-3 text-4xl font-bold">
            {stats.totalCourses}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="text-gray-500">
            Total Students
          </h3>

          <p className="mt-3 text-4xl font-bold">
            {stats.totalStudents}
          </p>
        </div>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow-md">

        <h2 className="mb-6 text-2xl font-bold">
          Recent Courses
        </h2>

        {stats.recentCourses.length === 0 ? (
          <p className="text-gray-500">
            No Courses Created Yet
          </p>
        ) : (
          stats.recentCourses.map((course) => (
            <div
              key={course._id}
              className="mb-4 rounded-xl border p-4"
            >
              <h3 className="font-bold">
                {course.courseName}
              </h3>

              <p className="text-sm text-gray-500">
                Students:
                {" "}
                {course.studentsEnrolled.length}
              </p>
            </div>
          ))
        )}

      </div>

    </DashboardLayout>
  );
}