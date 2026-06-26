import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export default function LectureNavigation({
  previousLecture,
  nextLecture,
  setSelectedLecture,
  markCompleted,
  completed,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Previous */}

        <button
          disabled={!previousLecture}
          onClick={() =>
            previousLecture &&
            setSelectedLecture(previousLecture)
          }
          className={`flex items-center gap-2 rounded-lg px-5 py-3 font-semibold transition
          ${
            previousLecture
              ? "bg-slate-100 hover:bg-slate-200"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
          }`}
        >
          <ChevronLeft size={18} />
          Previous Lecture
        </button>

        {/* Complete */}

        <button
          onClick={markCompleted}
          disabled={completed}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition
          ${
            completed
              ? "cursor-not-allowed bg-green-100 text-green-700"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          <CheckCircle size={18} />

          {completed
            ? "Completed"
            : "Mark as Completed"}

        </button>

        {/* Next */}

        <button
          disabled={!nextLecture}
          onClick={() =>
            nextLecture &&
            setSelectedLecture(nextLecture)
          }
          className={`flex items-center gap-2 rounded-lg px-5 py-3 font-semibold transition
          ${
            nextLecture
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
          }`}
        >
          Next Lecture
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}