import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/dashboard/AdminLayout";
import { getAllCourses } from "../../services/operations/adminAPI";

export default function AdminCourses() {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      const response = await getAllCourses(token);

      if (response?.success) {
        setCourses(response.data);
      }
    }

    fetchCourses();
  }, [token]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.courseName?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [courses, search]);

  return (
    <AdminLayout>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Course Management
          </h1>

          <p className="mt-2 text-slate-500">Manage all instructor courses.</p>
        </div>

        <input
          placeholder="Search Courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-96 rounded-xl border px-5 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-5 text-left">Course</th>

              <th>Instructor</th>

              <th>Students</th>

              <th>Price</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course._id} className="border-b hover:bg-slate-50">
                <td className="flex items-center gap-4 p-5">
                  <img
                    src={course.thumbnail}
                    alt=""
                    className="h-20 w-28 rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="font-semibold">{course.courseName}</h2>

                    <p className="text-sm text-gray-500">
                      {course.category?.name}
                    </p>
                  </div>
                </td>

                <td>
                  {course.instructor && course.instructor.length > 0
                    ? course.instructor
                        .map((inst) =>
                          `${inst.firstName || ""} ${inst.lastName || ""}`.trim(),
                        )
                        .filter(Boolean)
                        .join(", ") || "-"
                    : "-"}
                </td>

                <td>{course.studentsEnrolled?.length}</td>

                <td>₹{course.price}</td>

                <td>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/admin/course/${course._id}`)
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
