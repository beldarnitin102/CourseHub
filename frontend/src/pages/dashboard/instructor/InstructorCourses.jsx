import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate  } from "react-router-dom";

import DashboardLayout from "../DashboardLayout";
import { getInstructorDashboard } from "../../../services/operations/courseAPI";

export default function InstructorDashboard() {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const result = await getInstructorDashboard(token);

    console.log(result);

    if (result?.data) {
      setDashboardData(result.data);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">Instructor Dashboard</h1>

      {!dashboardData ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Stats */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-500">
                Total Courses
              </h2>

              <p className="mt-2 text-4xl font-bold">
                {dashboardData.totalCourses}
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-500">
                Total Students
              </h2>

              <p className="mt-2 text-4xl font-bold">
                {dashboardData.totalStudents}
              </p>
            </div>
          </div>

          {/* Recent Courses */}
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">Recent Courses</h2>

            {dashboardData.recentCourses?.length > 0 ? (
              <div className="grid gap-4">
                {dashboardData.recentCourses.map((course) => (
                  <div
                    key={course._id}
                    className="flex items-center gap-4 rounded-xl border p-4"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-20 w-28 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-bold">{course.courseName}</h3>

                      <p className="text-sm text-gray-500">
                        {course.studentsEnrolled?.length} Students
                      </p>

                      <button
                        onClick={() =>
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }
                        className="mt-4 rounded-xl bg-[#2563EB] px-5 py-3 text-white"
                      >
                        Edit Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No courses created yet.</p>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
