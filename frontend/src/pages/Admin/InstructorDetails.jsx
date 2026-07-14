import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLayout from "../../components/dashboard/AdminLayout";
import { getInstructorDetails } from "../../services/operations/adminAPI";
import Loader from "../../components/Loader";

export default function InstructorDetails() {

  const { id } = useParams();

  const { token } = useSelector(
    (state) => state.auth
  );

  const [data, setData] = useState(null);

  useEffect(() => {

    async function fetchData() {

      const response =
        await getInstructorDetails(id, token);

      if(response?.success){
        setData(response.data);
      }

    }

    fetchData();

  }, []);

  if(!data){
    return (
      <AdminLayout>
        <Loader />;
      </AdminLayout>
    );
  }

  return (

    <AdminLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          {data.instructor.firstName} {data.instructor.lastName}
        </h1>

        <p className="text-gray-500">
          {data.instructor.email}
        </p>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Total Courses</h2>

          <p className="mt-4 text-5xl font-bold text-blue-600">
            {data.totalCourses}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Total Students</h2>

          <p className="mt-4 text-5xl font-bold text-green-600">
            {data.totalStudents}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Total Revenue</h2>

          <p className="mt-4 text-5xl font-bold text-orange-600">
            ₹{data.totalRevenue}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Average Students</h2>

          <p className="mt-4 text-5xl font-bold text-purple-600">
            {
              data.totalCourses
                ? Math.floor(
                    data.totalStudents /
                    data.totalCourses
                  )
                : 0
            }
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
                Students
              </th>

              <th>
                Price
              </th>

            </tr>

          </thead>

          <tbody>

            {data.courses.map((course)=>(

              <tr
                key={course._id}
                className="border-b"
              >

                <td className="p-5">
                  {course.courseName}
                </td>

                <td className="text-center">
                  {course.studentsEnrolled.length}
                </td>

                <td className="text-center">
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