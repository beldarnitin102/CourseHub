import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllCourses } from "../services/operations/courseAPI";

export default function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);

    const result = await getAllCourses();

    if (result?.success) {
      setCourses(result.data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Courses...{" "}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {" "}
      <h1 className="mb-10 text-4xl font-bold">Explore Courses </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course._id}
            className="overflow-hidden rounded-3xl bg-white shadow-md"
          >
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold">{course.courseName}</h2>

              <p className="mt-2 text-sm text-gray-500">
                Instructor: {course.instructor?.firstName}{" "}
                {course.instructor?.lastName}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {course.studentsEnrolled?.length} Students
              </p>

              <p className="mt-3 text-2xl font-bold text-blue-600">
                ₹{course.price}
              </p>

              <button
                onClick={() => {
                  if (location.pathname.startsWith("/dashboard")) {
                    navigate(`/dashboard/course/${course._id}`);
                  } else {
                    navigate(`/course/${course._id}`);
                  }
                }}
                className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
