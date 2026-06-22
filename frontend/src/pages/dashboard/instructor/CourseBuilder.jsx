import DashboardLayout from "../DashboardLayout";
import AddSection from "../../../components/course/AddSection";
import { useSelector } from "react-redux";

export default function CourseBuilder() {
  const { course } = useSelector((state) => state.course);

  const courseId = localStorage.getItem("courseId");

  console.log("COURSE ID =", courseId);

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">Course Builder</h1>

      <div className="rounded-3xl bg-white p-8 shadow-md">
        <AddSection courseId={courseId} />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Course Sections</h2>

        {course?.courseContent?.map((section) => (
          <div key={section._id} className="mb-4 rounded-xl border p-4">
            <h3 className="font-semibold">{section.sectionName}</h3>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
