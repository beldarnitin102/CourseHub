import DashboardLayout from "../DashboardLayout";
import CourseInformationForm from "../../../components/course/CourseInformationForm";

export default function CreateCourse() {
  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#111827]">
          Create New Course
        </h1>

        <p className="mt-2 text-gray-500">
          Fill in the course details and start teaching.
        </p>
      </div>

      <CourseInformationForm />

    </DashboardLayout>
  );
}