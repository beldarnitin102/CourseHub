import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../DashboardLayout";
import { getInstructorCourses } from "../../../services/operations/courseAPI";

export default function InstructorCourses() {
const navigate = useNavigate();

const { token } = useSelector(
(state) => state.auth
);

console.log("TOKEN =", token);

const [courses, setCourses] =
useState([]);

useEffect(() => {
  if(token){
    fetchCourses();
  }
}, [token]);

const fetchCourses = async () => {
const result =
await getInstructorCourses(
token
);


console.log(result);

if (result?.data?.data) {
  setCourses(
    result.data.data
  );
}


};

return ( <DashboardLayout> <h1 className="mb-8 text-4xl font-bold">
My Courses </h1>


  {courses.length === 0 ? (
    <div className="rounded-3xl bg-white p-8 shadow-md">
      No Courses Created Yet
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

          <h2 className="text-xl font-bold">
            {course.courseName}
          </h2>

          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
  {course.courseDescription}
</p>

          <p className="mt-2 text-gray-500">
            {
              course.studentsEnrolled
                ?.length
            } Students Enrolled
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() =>
                navigate(
                  `/course/${course._id}`
                )
              }
              className="rounded-xl bg-green-600 px-5 py-3 text-white"
            >
              View
            </button>

            <button
              onClick={() =>
                navigate(
                  `/dashboard/edit-course/${course._id}`
                )
              }
              className="rounded-xl bg-[#2563EB] px-5 py-3 text-white"
            >
              Edit
            </button>

            <button
  onClick={async () => {
    const result =
      await deleteCourse(
        course._id,
        token
      );

    if(result?.success){
      fetchCourses();
    }
  }}
  className="rounded-xl bg-red-600 px-5 py-3 text-white"
>
  Delete
</button>
          </div>
        </div>
      ))}
    </div>
  )}
</DashboardLayout>

);
}
