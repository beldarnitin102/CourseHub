import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DashboardLayout from "../dashboard/DashboardLayout";
import CourseProgress from "../../pages/course/CourseProgress";

import { getUserEnrolledCourses } from "../../services/operations/profileAPI";
import { getCourseProgress } from "../../services/operations/courseProgressAPI";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const enrolledCourses = await getUserEnrolledCourses(token);

    if (!enrolledCourses?.success) return;

    setCourses(enrolledCourses.data);

    const progressMap = {};

    for (const course of enrolledCourses.data) {
      const progress = await getCourseProgress(course._id, token);

      progressMap[course._id] = progress?.data || {};
    }

    setProgressData(progressMap);
  };

  const totalCourses = courses.length;

  const completedLectures = useMemo(() => {
    return Object.values(progressData).reduce((acc, item) => {
      return acc + (item.completedVideos?.length || 0);
    }, 0);
  }, [progressData]);

  const totalLectures = useMemo(() => {
    return courses.reduce((acc, course) => {
      const lectures =
        course.courseContent?.reduce(
          (sum, sec) => sum + sec.subSection.length,
          0
        ) || 0;

      return acc + lectures;
    }, 0);
  }, [courses]);

  const overallProgress =
    totalLectures > 0
      ? Math.round((completedLectures / totalLectures) * 100)
      : 0;

  return (
    <DashboardLayout>

      {/* Banner */}

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          Welcome Back, {user?.firstName}
        </h1>

        <p className="mt-3 text-blue-100">
          Continue your learning journey.
        </p>

      </div>

      {/* Stats */}

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow">

          <h3 className="text-gray-500">
            Enrolled Courses
          </h3>

          <p className="mt-2 text-4xl font-bold">
            {totalCourses}
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <h3 className="text-gray-500">
            Completed Lectures
          </h3>

          <p className="mt-2 text-4xl font-bold">
            {completedLectures}
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <h3 className="text-gray-500">
            Total Lectures
          </h3>

          <p className="mt-2 text-4xl font-bold">
            {totalLectures}
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <h3 className="text-gray-500">
            Overall Progress
          </h3>

          <p className="mt-2 text-4xl font-bold">
            {overallProgress}%
          </p>

        </div>

      </div>

      {/* Continue Learning */}

      <h2 className="mb-5 text-2xl font-bold">
        Continue Learning
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">

        {courses.map((course) => {

          const completed =
            progressData[course._id]?.completedVideos?.length || 0;

          const lectures =
            course.courseContent?.reduce(
              (sum, sec) => sum + sec.subSection.length,
              0
            ) || 0;

          const progress =
            lectures > 0
              ? Math.round((completed / lectures) * 100)
              : 0;

          return (
            <div
              key={course._id}
              className="rounded-3xl bg-white p-6 shadow"
            >

              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="mb-4 h-48 w-full rounded-xl object-cover"
              />

              <h3 className="text-xl font-bold">
                {course.courseName}
              </h3>

              <p className="mt-2 text-gray-500">
                {progress}% Completed
              </p>

              <div className="mt-4 h-3 rounded-full bg-gray-200">

                <div
                  className="h-3 rounded-full bg-blue-600"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

              <button
                onClick={() =>
                  navigate(`/view-course/${course._id}`)
                }
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-white"
              >
                Continue Learning
              </button>

            </div>
          );
        })}

      </div>

      {/* Overall Progress */}

      <div className="mt-10">

        <CourseProgress
          totalLectures={totalLectures}
          completedLectures={completedLectures}
        />

      </div>

    </DashboardLayout>
  );
}