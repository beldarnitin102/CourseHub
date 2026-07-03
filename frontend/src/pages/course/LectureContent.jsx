import { useEffect, useState } from "react";
import { Clock, CheckCircle, NotebookPen } from "lucide-react";
import { useSelector } from "react-redux";
import {
  saveLectureNote,
  getLectureNote,
} from "../../services/operations/lectureAPI";

import AIMentor from "../../components/mentor/AIMentor";
import MentorAnswer from "../../components/mentor/MentorAnswer";
import { askMentor } from "../../services/operations/mentorAPI";
import StudyPlanner from "../../components/studyPlanner/StudyPlanner";
import AIProjects from "../../components/aiProjects/AIProjects";
import AIInterview from "../../components/interview/AIInterview";
import AIRecommendations from "../../components/recommendation/AIRecommendations";

export default function LectureContent({
  selectedLecture,
  courseId,
  completed,
  markCompleted,
  course,
   completedSections,
  progress,
}) {
  const noteKey = selectedLecture?._id || "";
  const [notes, setNotes] = useState("");
  const [mentorLoading, setMentorLoading] = useState(false);
  const [mentorAnswer, setMentorAnswer] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!selectedLecture || !courseId || !token) return;

    const fetchNote = async () => {
      const response = await getLectureNote(
        courseId,
        selectedLecture._id,
        token,
      );
      if (response?.success) {
        setNotes(response.data?.note || "");
      }
    };

    fetchNote();
  }, [selectedLecture, courseId, token]);

  if (!selectedLecture) return null;

  const handleSaveNotes = async () => {
    const response = await saveLectureNote(
      {
        courseId,
        lectureId: selectedLecture._id,
        note: notes,
      },
      token,
    );

    if (response?.success) {
      alert("Notes Saved");
    }
  };

  // FIX: This function block now ends correctly on line 64
  const handleAskMentor = async (question) => {
    setMentorLoading(true);

    const response = await askMentor(courseId, question, token);
    if (response) {
      setMentorAnswer(response);
    }

    setMentorLoading(false);
  }; // <-- Closes handleAskMentor

  // FIX: Moved completely outside of the handler function above
  const handleClearMentorAnswer = () => {
    setMentorAnswer(null);
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
                  className={completed ? "text-green-500" : "text-gray-400"}
                />
                {completed ? "Completed" : "Not Completed"}
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
        <h3 className="mb-3 text-xl font-semibold">About this Lecture</h3>
        <p className="leading-8 text-slate-600">
          {selectedLecture.description}
        </p>
      </div>

      {/* Notes */}
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <NotebookPen size={22} className="text-blue-600" />
          <h3 className="text-xl font-semibold">Personal Notes</h3>
        </div>

        {/* AI Mentor */}
        <div className="mt-10">
          <AIMentor loading={mentorLoading} onAsk={handleAskMentor} />

          <StudyPlanner courseId={courseId} />

          <AIProjects courseId={courseId} />

          <AIInterview courseId={courseId} />

          <AIRecommendations
          courseId={courseId}
           completedSections={completedSections}
    progress={progress}
          />

          {mentorAnswer && (
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-end">
                <button
                  onClick={handleClearMentorAnswer}
                  className="text-sm font-medium text-slate-500 hover:text-red-600 transition duration-200 bg-slate-100 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  Clear Response
                </button>
              </div>
              <MentorAnswer answer={mentorAnswer} />
            </div>
          )}
        </div>

        <textarea
          rows={7}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes..."
          className="w-full mt-6 rounded-xl border p-4 outline-none focus:border-blue-500"
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
