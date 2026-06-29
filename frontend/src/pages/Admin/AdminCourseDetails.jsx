import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLayout from "../../components/dashboard/AdminLayout";
import { getCourseDetails } from "../../services/operations/courseAPI";
import { deleteCourse } from "../../services/operations/adminAPI";

export default function AdminCourseDetails() {
  const { courseId } = useParams();

  const { token } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  async function fetchCourse() {
    const response = await getCourseDetails(courseId);

    if (response?.success) {
      setCourse(response.data.courseDetails);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Delete this course permanently?"
    );

    if (!confirmDelete) return;

    const response = await deleteCourse(courseId, token);

    if (response?.success) {
      window.history.back();
    }
  }

  if (!course) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-xl">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">

        <div className="flex items-start justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              {course.courseName}
            </h1>

            <p className="mt-2 text-gray-500">
              {course.courseDescription}
            </p>

          </div>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            Delete Course
          </button>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Course Information
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="font-medium">
                  Instructor
                </span>

                <span>
                  {course.instructor?.firstName}{" "}
                  {course.instructor?.lastName}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="font-medium">
                  Category
                </span>

                <span>
                  {course.category?.name}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="font-medium">
                  Price
                </span>

                <span>
                  ₹{course.price}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="font-medium">
                  Students
                </span>

                <span>
                  {course.studentsEnrolled?.length || 0}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="font-medium">
                  Sections
                </span>

                <span>
                  {course.courseContent?.length || 0}
                </span>

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <img
              src={course.thumbnail}
              alt=""
              className="h-80 w-full rounded-2xl object-cover"
            />

          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Course Sections
          </h2>

          {course.courseContent?.map((section) => (

            <div
              key={section._id}
              className="mb-4 rounded-xl border p-5"
            >

              <h3 className="text-xl font-semibold">
                {section.sectionName}
              </h3>

              <p className="mt-2 text-gray-500">
                Lectures :
                {" "}
                {section.subSection?.length || 0}
              </p>

            </div>

          ))}

        </div>

      </div>
    </AdminLayout>
  );
}