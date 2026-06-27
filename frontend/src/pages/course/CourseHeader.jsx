export default function CourseHeader({
  course,
  totalLectures,
  completedLectures,
}) {
  const progress =
    totalLectures > 0
      ? Math.round(
          (completedLectures / totalLectures) * 100
        )
      : 0;

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h1 className="text-3xl font-bold text-slate-800">
        {course.courseName}
      </h1>

      <p className="mt-2 text-slate-500">
        {course.courseDescirption}
      </p>

      <div className="mt-6">
        <div className="mb-2 flex justify-between">
          <span className="font-medium">
            Course Progress
          </span>

          <span className="font-semibold text-yellow-600">
            {completedLectures} / {totalLectures}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-2 text-right text-sm font-semibold text-yellow-600">
          {progress}% Completed
        </p>
      </div>
    </div>
  );
}