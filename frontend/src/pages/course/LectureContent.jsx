import { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  NotebookPen,
} from "lucide-react";

import { useSelector } from "react-redux";
import { saveNotes } from "../../services/operations/courseProgressAPI";

export default function LectureContent({
  selectedLecture,
  completed,
  markCompleted,
}) {
 const noteKey =
  selectedLecture?._id || "";

const [notes, setNotes] = useState("");

const { token } = useSelector(
    (state)=>state.auth
);

useEffect(() => {
  if (!noteKey) return;

  const saved =
    localStorage.getItem(
      `lecture-note-${noteKey}`
    );

  setNotes(saved || "");
}, [noteKey]);

  if (!selectedLecture) return null;

 const handleSaveNotes = async () => {

   const response = await saveNotes(
      selectedLecture._id,
      notes,
      token
   );

   if(response?.success){
      alert("Notes Saved");
   }
};
  return (
    <div className="rounded-2xl bg-white shadow-md">

      {/* Header */}

      <div className="border-b p-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-3xl font-bold text-slate-800">
              {selectedLecture.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-6 text-sm text-slate-500">

              <div className="flex items-center gap-2">
                <Clock size={18} />
                {selectedLecture.timeDuration}
              </div>

              <div className="flex items-center gap-2">

                <CheckCircle
                  size={18}
                  className={
                    completed
                      ? "text-green-500"
                      : "text-gray-400"
                  }
                />

                {completed
                  ? "Completed"
                  : "Not Completed"}

              </div>

            </div>

          </div>

          {!completed && (
            <button
              onClick={markCompleted}
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Mark as Completed
            </button>
          )}

        </div>

      </div>

      {/* Description */}

      <div className="border-b p-6">

        <h3 className="mb-3 text-xl font-semibold">
          About this Lecture
        </h3>

        <p className="leading-8 text-slate-600">
          {selectedLecture.description}
        </p>

      </div>

      {/* Notes */}

      <div className="p-6">

        <div className="mb-4 flex items-center gap-2">

          <NotebookPen
            size={22}
            className="text-blue-600"
          />

          <h3 className="text-xl font-semibold">
            Personal Notes
          </h3>

        </div>

        <textarea
          rows={7}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Write your notes..."
          className="w-full rounded-xl border p-4 outline-none focus:border-blue-500"
        />

        <div className="mt-5 flex justify-end">

          <button
            onClick={handleSaveNotes}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Save Notes
          </button>

        </div>

      </div>

    </div>
  );
}