import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLayout from "../../components/dashboard/AdminLayout";
import {
  getCourseDetailsAdmin,
  deleteCourse,
} from "../../services/operations/adminAPI";

export default function AdminCourseDetails() {
  const { courseId } = useParams();

  const { token } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (token) {
      fetchCourse();
    }
  }, [token]);
  async function fetchCourse() {
    const response = await getCourseDetailsAdmin(courseId, token);

    if (response?.success) {
      setCourse(response.data);
    }
  }
  async function handleDelete() {
    const confirmDelete = window.confirm("Delete this course permanently?");

    if (!confirmDelete) return;

    const response = await deleteCourse(courseId, token);

    if (response?.success) {
      window.history.back();
    }
  }

  if (!course) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-xl">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold">{course.courseName}</h1>

            <p className="mt-2 text-gray-500">{course.courseDescription}</p>
          </div>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            Delete Course
          </button>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="mb-6 text-2xl font-bold">Instructor</h2>

          <div className="flex items-center gap-5">
            <img
              src={course.instructor?.[0]?.image}
              className="h-20 w-20 rounded-full"
            />

            <div>
              <h3 className="text-2xl font-bold">
                {course.instructor?.[0]?.firstName}{" "}
                {course.instructor?.[0]?.lastName}
              </h3>

              <p>{course.instructor?.[0]?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="mb-6 text-2xl font-bold">Course Information</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Instructor</span>

                <span>
                  {course.instructor?.length > 0
                    ? `${course.instructor[0].firstName} ${course.instructor[0].lastName}`
                    : "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Category</span>

                <span>{course.category?.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Price</span>

                <span>₹{course.price}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Students</span>

                <span>{course.studentsEnrolled?.length || 0}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Sections</span>

                <span>{course.courseContent?.length || 0}</span>
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
          <h2 className="mb-6 text-2xl font-bold">Course Sections</h2>

          {course.courseContent?.map((section) => (
            <div key={section._id} className="mb-4 rounded-xl border p-5">
              <h3 className="text-xl font-semibold">{section.sectionName}</h3>

              <p className="mt-2 text-gray-500">
                Lectures : {section.subSection?.length || 0}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">Enrolled Students</h2>

          {course.studentsEnrolled?.length === 0 ? (
            <p>No students enrolled.</p>
          ) : (
            <div className="space-y-4">
              {course.studentsEnrolled.map((student) => (
                <div
                  key={student._id}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={student.image}
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />

                    <div>
                      <h3 className="font-semibold">
                        {student.firstName} {student.lastName}
                      </h3>

                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
