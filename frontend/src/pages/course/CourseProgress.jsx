import {
  CheckCircle,
  PlayCircle,
  Clock,
} from "lucide-react";

export default function CourseProgress({
  totalLectures,
  completedLectures = 0,
}) {
  const remaining =
    totalLectures - completedLectures;

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">

      <div className="rounded-xl bg-white p-5 shadow">

        <div className="flex items-center gap-3">

          <CheckCircle
            className="text-green-500"
            size={32}
          />

          <div>

            <p className="text-sm text-gray-500">
              Completed
            </p>

            <h3 className="text-2xl font-bold">
              {completedLectures}
            </h3>

          </div>

        </div>

      </div>

      <div className="rounded-xl bg-white p-5 shadow">

        <div className="flex items-center gap-3">

          <PlayCircle
            className="text-yellow-500"
            size={32}
          />

          <div>

            <p className="text-sm text-gray-500">
              Remaining
            </p>

            <h3 className="text-2xl font-bold">
              {remaining}
            </h3>

          </div>

        </div>

      </div>

      <div className="rounded-xl bg-white p-5 shadow">

        <div className="flex items-center gap-3">

          <Clock
            className="text-blue-500"
            size={32}
          />

          <div>

            <p className="text-sm text-gray-500">
              Total Lectures
            </p>

            <h3 className="text-2xl font-bold">
              {totalLectures}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}