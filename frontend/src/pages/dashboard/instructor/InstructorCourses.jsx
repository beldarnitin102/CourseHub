import DashboardLayout from "../DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function InstructorCourses() {
  const navigate = useNavigate();

  // Temporary sample array. Change to an empty array [] to test the "No Courses Yet" state.
  const courses = [1, 2, 3]; 

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">My Courses</h1>
        <button
          onClick={() => navigate("/dashboard/create-course")}
          className="rounded-xl bg-[#2563EB] px-5 py-3 text-white"
        >
          + Create Course
        </button>
      </div>

      {courses.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <div key={course} className="rounded-3xl bg-white p-6 shadow-md">
              <div className="mb-4 h-48 rounded-2xl bg-gray-200"></div>
              <h2 className="text-xl font-bold">MERN Stack Development</h2>
              <p className="mt-2 text-gray-500">24 Students Enrolled</p>
              <button
                onClick={() => navigate("/dashboard/create-course")}
                className="mt-4 rounded-xl bg-[#2563EB] px-5 py-3 text-white"
              >
                Edit Course
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-10 text-center shadow-md">
          <h2 className="text-2xl font-semibold">No Courses Yet</h2>
          <p className="mt-3 text-gray-500">
            Create your first course and start teaching.
          </p>
          <button
            onClick={() => navigate("/dashboard/create-course")}
            className="mt-6 rounded-xl bg-[#2563EB] px-6 py-3 text-white"
          >
            Create Course
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}