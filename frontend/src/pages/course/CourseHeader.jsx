export default function CourseHeader({
  course,
  totalLectures,
  completedLectures = 0,
}) {
  const progress =
    totalLectures === 0
      ? 0
      : Math.round(
          (completedLectures / totalLectures) * 100
        );

  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow">

      <h1 className="text-3xl font-bold text-richblack-900">
        {course.courseName}
      </h1>

      <p className="mt-2 text-richblack-500">
        {course.courseDescirption}
      </p>

      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between">

          <span className="font-medium">
            Course Progress
          </span>

          <span className="font-semibold text-yellow-600">
            {progress}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-yellow-400 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="mt-2 flex justify-between text-sm text-gray-500">

          <span>
            {completedLectures} Completed
          </span>

          <span>
            {totalLectures} Lectures
          </span>

        </div>

      </div>

    </div>
  );
}