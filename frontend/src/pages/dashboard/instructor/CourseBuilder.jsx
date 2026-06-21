import DashboardLayout from "../DashboardLayout";
import AddSection from "../../../components/course/AddSection";
import { useSelector } from "react-redux";

export default function CourseBuilder() {

  const { course } = useSelector(
    (state) => state.course
  );

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Course Builder
      </h1>

      <div className="rounded-3xl bg-white p-8 shadow-md">

        <AddSection
          courseId={course?._id}
        />

      </div>

    </DashboardLayout>
  );
}