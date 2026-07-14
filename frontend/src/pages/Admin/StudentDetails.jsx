import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLayout from "../../components/dashboard/AdminLayout";

import { getStudentDetails } from "../../services/operations/adminAPI";
import Loader from "../../components/Loader";

export default function StudentDetails() {

  const { id } = useParams();

  const { token } = useSelector(
    (state) => state.auth
  );

  const [data, setData] = useState(null);

  useEffect(() => {

    async function fetchData() {

      const response =
        await getStudentDetails(id, token);

      if (response?.success) {
        setData(response.data);
      }

    }

    fetchData();

  }, []);

  if (!data) {

    return (
      <AdminLayout>
         <Loader />;
      </AdminLayout>
    );

  }

  return (

    <AdminLayout>

      <h1 className="mb-10 text-4xl font-bold">

        {data.student.firstName} {data.student.lastName}

      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="rounded-3xl bg-white p-6 shadow">

          <h2>Email</h2>

          <p>{data.student.email}</p>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow">

          <h2>Phone</h2>

          <p>

            {data.student.contactNumber || "-"}

          </p>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">

        <div className="rounded-3xl bg-white p-6 shadow">

          <h2>Total Courses</h2>

          <p className="mt-4 text-5xl font-bold text-blue-600">

            {data.stats.totalCourses}

          </p>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow">

          <h2>Completed Lectures</h2>

          <p className="mt-4 text-5xl font-bold text-green-600">

            {data.stats.completedLectures}

          </p>

        </div>

      </div>

      <div className="mt-10 rounded-3xl bg-white shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-5 text-left">

                Course

              </th>

              <th>

                Instructor

              </th>

              <th>

                Price

              </th>

            </tr>

          </thead>

          <tbody>

            {data.enrolledCourses.map((course) => (

              <tr
                key={course._id}
                className="border-b"
              >

                <td className="p-5">

                  {course.courseName}

                </td>

                <td>

                  {course.instructor.firstName}{" "}
                  {course.instructor.lastName}

                </td>

                <td>

                  ₹{course.price}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

}