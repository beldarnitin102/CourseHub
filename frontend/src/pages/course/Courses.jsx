import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";


import {
getAllCourses,
} from "../../services/operations/courseAPI";

export default function Courses() {

const navigate = useNavigate();
const location = useLocation();

const [courses, setCourses] =
useState([]);

useEffect(() => {
fetchCourses();
}, []);

const fetchCourses = async () => {
const result =
await getAllCourses();

if(result?.data){
setCourses(result.data);
}
};


return (  <div>
   <section className="min-h-screen bg-[#F3F4F6] py-20">


    <div className="mx-auto max-w-7xl px-6">

      <h1 className="mb-10 text-5xl font-bold">
        Explore Courses
      </h1>

      {courses.length === 0 ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow-md">
          No Courses Found
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => {
  if (
    location.pathname.startsWith(
      "/dashboard"
    )
  ) {
    navigate(
      `/dashboard/course/${course._id}`
    );
  } else {
    navigate(
      `/course/${course._id}`
    );
  }
}}
              className="cursor-pointer rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >

              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="mb-5 h-48 w-full rounded-2xl object-cover"
              />

              <h2 className="text-xl font-bold">
                {course.courseName}
              </h2>

              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {
                  course.courseDescription
                }
              </p>

              <div className="mt-4 flex items-center justify-between">

                <span className="text-sm text-gray-500">
                  👥 {
                    course
                      .studentsEnrolled
                      ?.length
                  } Students
                </span>

                <span className="text-xl font-bold text-[#2563EB]">
                  ₹ {course.price}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>

  </section>
  </div>


);
}
