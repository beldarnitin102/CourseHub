import { useState } from "react";
import { useSelector } from "react-redux";
import {
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { generateStudyPlanner } from "../../services/operations/studyPlannerAPI";
import StudyDayCard from "./StudyDayCard";

export default function StudyPlanner({ courseId }) {
  const { token } = useSelector((state) => state.auth);

  const [planner, setPlanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlanner = async () => {
    setLoading(true);

    const response = await generateStudyPlanner(
      courseId,
      token
    );

    if (response?.success) {
      setPlanner(response.data);
    }

    setLoading(false);
  };

  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <CalendarDays
              className="text-blue-600"
              size={30}
            />

            <h2 className="text-3xl font-bold">
              AI Study Planner
            </h2>

          </div>

          <p className="mt-2 text-gray-500">
            Generate a personalized daily learning roadmap for this course.
          </p>

        </div>

        <button
          onClick={handleGeneratePlanner}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles size={18} />

          {loading
            ? "Generating..."
            : planner
            ? "Regenerate"
            : "Generate"}
        </button>

      </div>

      {/* Empty State */}

      {!planner && !loading && (
        <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">

          <CalendarDays
            size={50}
            className="mx-auto mb-4 text-gray-400"
          />

          <h3 className="text-xl font-semibold">
            No Study Planner Generated
          </h3>

          <p className="mt-2 text-gray-500">
            Click Generate to create your AI learning schedule.
          </p>

        </div>
      )}

      {/* Planner */}

      {planner && (

        <div>

          <div className="mb-8 rounded-xl bg-blue-50 p-5">

            <h3 className="text-xl font-bold">
              Total Duration
            </h3>

            <p className="mt-2 text-2xl font-semibold text-blue-700">
              {planner.totalDuration}
            </p>

          </div>

          <div className="space-y-5">

            {planner.dailyPlan?.map((day) => (
              <StudyDayCard
                key={day.day}
                day={day}
              />
            ))}

          </div>

        </div>

      )}

    </div>
  );
}