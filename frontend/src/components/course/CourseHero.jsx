export default function CourseHero({ course }) {
  return (
    <div>

      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#2563EB]">
        {course.category}
      </span>

      <h1 className="mt-5 text-5xl font-bold text-[#111827]">
        {course.courseName}
      </h1>

      <p className="mt-5 text-lg text-gray-600">
        {course.courseDescription}
      </p>

      <div className="mt-6 flex flex-wrap gap-6 text-gray-600">

        <span>
          ⭐ {course.rating}
        </span>

        <span>
          👨‍🎓 {course.studentsEnrolled} Students
        </span>

        <span>
          👨‍🏫 {course.instructor}
        </span>

      </div>

    </div>
  );
}