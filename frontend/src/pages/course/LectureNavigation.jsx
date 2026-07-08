import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function LectureNavigation({
  previousLecture,
  nextLecture,
  setSelectedLecture,
  markCompleted,
  completed,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      {/* Header */}

      <div className="border-b border-slate-100 px-8 py-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Continue Learning
        </h2>

        <p className="mt-1 text-slate-500">
          Navigate through your course smoothly.
        </p>
      </div>

      {/* Content */}

      <div className="grid gap-6 p-8 lg:grid-cols-3">
        {/* Previous */}

        <button
          disabled={!previousLecture}
          onClick={() =>
            previousLecture && setSelectedLecture(previousLecture)
          }
          className={`group flex h-40 flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-300

          ${
            previousLecture
              ? "border-slate-200 bg-white hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
              : "cursor-not-allowed border-slate-200 bg-slate-100 opacity-60"
          }`}
        >
          <ChevronLeft
            className="text-slate-500 group-hover:text-violet-600"
            size={32}
          />

          <div>
            <p className="text-sm text-slate-500">Previous Lecture</p>

            <h3 className="mt-2 line-clamp-2 font-semibold text-slate-800">
              {previousLecture?.title || "No Previous Lecture"}
            </h3>
          </div>
        </button>

        {/* Complete */}

        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-lg">
          <CheckCircle2 size={55} />

          <h3 className="mt-5 text-2xl font-bold">
            {completed ? "Completed" : "Complete Lecture"}
          </h3>

          <p className="mt-2 text-center text-violet-100">
            Mark this lecture to continue your journey.
          </p>

          <button
            onClick={markCompleted}
            disabled={completed}
            className={`mt-6 rounded-xl px-8 py-3 font-semibold transition-all

            ${
              completed
                ? "cursor-not-allowed bg-white/20"
                : "bg-white text-violet-700 hover:scale-105 hover:bg-slate-100"
            }`}
          >
            {completed ? "Already Completed" : "Mark Completed"}
          </button>
        </div>

        {/* Next */}

        <button
          disabled={!nextLecture}
          onClick={() =>
            nextLecture && setSelectedLecture(nextLecture)
          }
          className={`group flex h-40 flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-300

          ${
            nextLecture
              ? "border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 hover:-translate-y-1 hover:shadow-lg"
              : "cursor-not-allowed border-slate-200 bg-slate-100 opacity-60"
          }`}
        >
          <div className="flex justify-end">
            <ArrowRight
              className="text-violet-600 group-hover:translate-x-1 transition"
              size={32}
            />
          </div>

          <div>
            <p className="text-sm text-violet-600 font-medium">
              Next Lecture
            </p>

            <h3 className="mt-2 line-clamp-2 font-semibold text-slate-800">
              {nextLecture?.title || "Course Finished 🎉"}
            </h3>
          </div>
        </button>
      </div>
    </div>
  );
}