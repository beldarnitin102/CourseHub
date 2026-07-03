import { useState } from "react";

import {
  CheckCircle2,
  Clock,
  BookOpen,
  ClipboardCheck,
  Brain,
  FolderGit2,
} from "lucide-react";

export default function StudyDayCard({ day }) {

  const [completed, setCompleted] = useState(false);

  return (

    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-2xl font-bold">
            Day {day.day}
          </h3>

          <p className="mt-2 font-medium text-gray-700">
            {day.goal}
          </p>

        </div>

        <button
          onClick={() => setCompleted(!completed)}
          className={`rounded-xl px-4 py-2 font-semibold transition ${
            completed
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {completed ? "Completed" : "Mark Complete"}
        </button>

      </div>

      {/* Time */}

      <div className="mt-5 flex items-center gap-2 text-gray-600">

        <Clock size={18} />

        {day.estimatedStudyTime}

      </div>

      {/* Sections */}

      {day.sections?.length > 0 && (

        <div className="mt-6">

          <h4 className="mb-2 flex items-center gap-2 font-semibold">

            <BookOpen size={18} />

            Sections

          </h4>

          <ul className="list-disc space-y-1 pl-6">

            {day.sections.map((section, index) => (

              <li key={index}>{section}</li>

            ))}

          </ul>

        </div>

      )}

      {/* Tasks */}

      <div className="mt-6">

        <h4 className="mb-2 flex items-center gap-2 font-semibold">

          <ClipboardCheck size={18} />

          Tasks

        </h4>

        <ul className="space-y-2">

          {day.tasks?.map((task, index) => (

            <li
              key={index}
              className="flex items-start gap-2"
            >

              <CheckCircle2
                size={18}
                className="mt-1 text-green-500"
              />

              {task}

            </li>

          ))}

        </ul>

      </div>

      {/* Badges */}

      <div className="mt-6 flex flex-wrap gap-3">

        {day.revision && (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
            Revision
          </span>
        )}

        {day.quiz && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Quiz
          </span>
        )}

        {day.assignment && (
          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
            Assignment
          </span>
        )}

      </div>

      {/* Milestone */}

      {day.projectMilestone && (

        <div className="mt-6 rounded-xl bg-green-50 p-4">

          <div className="flex items-center gap-2 font-semibold">

            <FolderGit2 size={18} />

            Project Milestone

          </div>

          <p className="mt-2 text-gray-700">

            {day.projectMilestone}

          </p>

        </div>

      )}

    </div>

  );

}