import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../DashboardLayout";
import AddSection from "../../../components/course/AddSection";

import { setCourse } from "../../../redux/slices/courseSlice";
import { getInstructorCourse } from "../../../services/operations/courseAPI";

export default function CourseBuilder() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const courseId = localStorage.getItem("courseId");

 useEffect(() => {
  async function fetchCourse() {
    if (!courseId || !token) return;

    const response = await getInstructorCourse(courseId, token);

    if (response?.success) {
      dispatch(setCourse(response.data));
    }
  }

  fetchCourse();
}, [courseId, token]);

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">
        Course Builder
      </h1>

      <div className="rounded-3xl bg-white p-8 shadow-md">
        <AddSection courseId={courseId} />
      </div>
    </DashboardLayout>
  );
}