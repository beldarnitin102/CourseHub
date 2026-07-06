import {
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Trophy,
  Lock,
  Award,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function CourseProgress({
  totalLectures = 0,
  completedLectures = 0,
  courseId,
}) {
  const progress =
    totalLectures > 0
      ? Math.round((completedLectures / totalLectures) * 100)
      : 0;

  const remaining = totalLectures - completedLectures;

  return (
    <div className="mb-8 rounded-2xl bg-white shadow-lg">
      <div className="grid gap-8 p-6 lg:grid-cols-[220px_1fr]">
        {/* Left */}

        <div className="flex flex-col items-center justify-center">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
              <span className="text-4xl font-bold text-slate-800">
                {progress}%
              </span>

              <span className="text-sm text-gray-500">Completed</span>
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-gray-500">
            Keep learning to complete this course.
          </p>
        </div>

        {/* Right */}

        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            Learning Progress
          </h2>

          {/* Progress Bar */}

          <div className="mb-8">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium text-gray-600">
                Overall Progress
              </span>

              <span className="text-sm font-semibold text-yellow-600">
                {progress}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Stats */}

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border bg-green-50 p-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={35} className="text-green-600" />

                <div>
                  <p className="text-sm text-gray-500">Completed</p>

                  <h3 className="text-3xl font-bold text-green-700">
                    {completedLectures}
                  </h3>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-blue-50 p-5">
              <div className="flex items-center gap-3">
                <PlayCircle size={35} className="text-blue-600" />

                <div>
                  <p className="text-sm text-gray-500">Remaining</p>

                  <h3 className="text-3xl font-bold text-blue-700">
                    {remaining}
                  </h3>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-yellow-50 p-5">
              <div className="flex items-center gap-3">
                <BookOpen size={35} className="text-yellow-600" />

                <div>
                  <p className="text-sm text-gray-500">Total Lectures</p>

                  <h3 className="text-3xl font-bold text-yellow-700">
                    {totalLectures}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement */}

          <div className="mt-8 rounded-2xl border bg-gradient-to-r from-yellow-50 to-orange-50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {progress === 100 ? (
                  <Award size={40} className="text-yellow-500" />
                ) : (
                  <Lock size={40} className="text-gray-500" />
                )}

                <div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Course Certificate
                  </h3>

                  {progress === 100 ? (
                    <p className="text-sm text-green-600">
                      🎉 Congratulations! Your certificate is unlocked.
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Complete the course to unlock your professional
                      certificate.
                    </p>
                  )}
                </div>
              </div>

              {progress === 100 ? (
                <Link
                  to={`/certificate/${courseId}`}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  View Certificate
                </Link>
              ) : (
                <button
                  disabled
                  className="cursor-not-allowed rounded-xl bg-gray-300 px-6 py-3 font-semibold text-gray-600"
                >
                  Locked
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
