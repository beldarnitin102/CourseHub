import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AdminLayout from "../../components/dashboard/AdminLayout";
import { getAllCourses } from "../../services/operations/adminAPI";

export default function Courses() {

  const { token } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);

  useEffect(() => {

    async function fetchCourses() {

      const response = await getAllCourses(token);

      if (response?.success) {
        setCourses(response.data);
      }

    }

    fetchCourses();

  }, []);

  return (

    <AdminLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Courses
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">

        {courses.map((course) => (

          <div
            key={course._id}
            className="rounded-2xl bg-white p-6 shadow"
          >

            <img
              src={course.thumbnail}
              className="mb-4 h-48 w-full rounded-xl object-cover"
            />

            <h2 className="text-xl font-bold">
              {course.courseName}
            </h2>

            <p className="mt-2 text-gray-500">
              {course.instructor?.firstName}{" "}
              {course.instructor?.lastName}
            </p>

            <p className="mt-4">
              ₹ {course.price}
            </p>

          </div>

        ))}

      </div>

    </AdminLayout>

  );
}