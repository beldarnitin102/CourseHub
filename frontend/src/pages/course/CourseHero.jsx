import {
  BookOpen,
  User,
  Star,
  Award,
  PlayCircle,
} from "lucide-react";

export default function CourseHero({
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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700 p-8 text-white shadow-xl">

      {/* Background */}

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="relative z-10">

        {/* Badge */}

        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 backdrop-blur">

          <BookOpen size={18} />

          <span className="text-sm font-semibold">
            Premium Learning Experience
          </span>

        </div>

        {/* Title */}

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight">

          {course.courseName}

        </h1>

        <p className="mt-4 max-w-3xl text-violet-100 leading-8">

          {course.courseDescirption}

        </p>

        {/* Instructor */}

        <div className="mt-8 flex flex-wrap gap-6">

          <div className="flex items-center gap-2">

            <User size={20} />

            <span>

              {course.instructor?.firstName}{" "}
              {course.instructor?.lastName}

            </span>

          </div>

          <div className="flex items-center gap-2">

            <Star
              size={20}
              className="fill-yellow-300 text-yellow-300"
            />

            <span>4.9 Rating</span>

          </div>

          <div className="flex items-center gap-2">

            <BookOpen size={20} />

            <span>

              {totalLectures} Lectures

            </span>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* Progress */}

          <div>

            <div className="mb-3 flex justify-between">

              <span className="font-semibold">

                Learning Progress

              </span>

              <span>

                {completedLectures}/{totalLectures}

              </span>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-white/20">

              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <p className="mt-3 text-violet-100">

              {progress}% Completed

            </p>

          </div>

          {/* Certificate */}

          <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">

            <div className="flex items-center gap-3">

              <Award
                size={40}
                className="text-yellow-300"
              />

              <div>

                <h3 className="font-bold">

                  Professional Certificate

                </h3>

                <p className="text-sm text-violet-100">

                  Unlock after course completion

                </p>

              </div>

            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-violet-700 transition hover:scale-[1.02]">

              <PlayCircle size={20} />

              Continue Learning

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}