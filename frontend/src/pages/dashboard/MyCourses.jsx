import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



import DashboardLayout from "../../pages/dashboard/DashboardLayout";

import { getUserEnrolledCourses } from "../../services/operations/profileAPI";

export default function MyCourses() {
  const navigate = useNavigate();
  
  const { token } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchCourses = async () => {
    const result = await getUserEnrolledCourses(token);
    
    // Check if result has a .data property or fallback to an empty array
    const coursesArray = result?.data || result || [];
    
    setCourses(Array.isArray(coursesArray) ? coursesArray : []);
    setLoading(false);
  };

  fetchCourses();
}, [token]);

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold">Loading...</h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">My Courses</h1>

      {courses.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 shadow-md">
          <h2 className="text-2xl font-semibold">No Courses Purchased Yet</h2>

          <p className="mt-2 text-gray-500">
            Start learning by enrolling in a course.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course._id}
              className="rounded-3xl bg-white p-6 shadow-md"
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="mb-4 h-48 w-full rounded-2xl object-cover"
              />

              <h3 className="text-xl font-bold">{course.courseName}</h3>

              <p className="mt-2 text-gray-500">{course.courseDescription}</p>

              <button
                onClick={() => navigate(`/view-course/${course._id}`)}
                className="mt-5 rounded-xl bg-[#2563EB] px-5 py-3 text-white"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
