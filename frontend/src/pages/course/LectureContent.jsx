import { useEffect, useState } from "react";
import { Clock, CheckCircle, NotebookPen } from "lucide-react";
import { useSelector } from "react-redux";

import {
  saveLectureNote,
  getLectureNote,
} from "../../services/operations/lectureAPI";

import AIMentor from "../../components/mentor/AIMentor";
import StudyPlanner from "../../components/studyPlanner/StudyPlanner";
import AIProjects from "../../components/aiProjects/AIProjects";
import AIInterview from "../../components/interview/AIInterview";
import AIRecommendations from "../../components/recommendation/AIRecommendations";

import { askMentor } from "../../services/operations/mentorAPI";

export default function LectureContent({
  selectedLecture,
  courseId,
  completed,
  markCompleted,
  completedSections,
  progress,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState("");

  const [mentorLoading, setMentorLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!selectedLecture || !courseId || !token) return;

    const fetchNote = async () => {
      const response = await getLectureNote(
        courseId,
        selectedLecture._id,
        token
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
      token
    );

    if (response?.success) {
      alert("Notes Saved");
    }
  };

  const handleAskMentor = async (question) => {
    setMentorLoading(true);

    const response = await askMentor(
      courseId,
      question,
      token
    );

    setMentorLoading(false);

    return response;
  };

  const tabs = [
    {
      id: "overview",
      title: "Overview",
    },
    {
      id: "notes",
      title: "Notes",
    },
    {
      id: "mentor",
      title: "AI Mentor",
    },
    {
      id: "planner",
      title: "Planner",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "interview",
      title: "Interview",
    },
    {
      id: "insights",
      title: "Insights",
    },
  ];

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

      {/* Tabs */}

      <div className="border-t bg-slate-50">
        <div className="flex overflow-x-auto">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-6 py-4 font-semibold transition

              ${
                activeTab === tab.id
                  ? "border-violet-600 bg-white text-violet-700"
                  : "border-transparent text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab.title}
            </button>
          ))}

        </div>
      </div>

      {/* ================= OVERVIEW ================= */}

      {activeTab === "overview" && (
        <div className="border-b p-6">
          <h3 className="mb-3 text-xl font-semibold">
            About this Lecture
          </h3>

          <p className="leading-8 text-slate-600">
            {selectedLecture.description}
          </p>
        </div>
      )}

      {/* ================= PAGE CONTENT ================= */}

      <div className="p-6">

        {/* NOTES */}

        {activeTab === "notes" && (
          <>
            <div className="mb-5 flex items-center gap-2">
              <NotebookPen
                size={22}
                className="text-blue-600"
              />

              <h3 className="text-xl font-semibold">
                Personal Notes
              </h3>
            </div>

            <textarea
              rows={10}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your personal notes..."
              className="w-full rounded-xl border p-4 outline-none transition focus:border-blue-500"
            />

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleSaveNotes}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Save Notes
              </button>
            </div>
          </>
        )}

        {/* AI MENTOR */}

        {activeTab === "mentor" && (
          <AIMentor
            loading={mentorLoading}
            onAsk={handleAskMentor}
          />
        )}

        {/* STUDY PLANNER */}

        {activeTab === "planner" && (
          <StudyPlanner
            courseId={courseId}
          />
        )}

        {/* AI PROJECTS */}

        {activeTab === "projects" && (
          <AIProjects
            courseId={courseId}
          />
        )}

        {/* AI INTERVIEW */}

        {activeTab === "interview" && (
          <AIInterview
            courseId={courseId}
          />
        )}

        {/* INSIGHTS */}

        {activeTab === "insights" && (
          <AIRecommendations
            courseId={courseId}
            completedSections={completedSections}
            progress={progress}
          />
        )}

      </div>

    </div>
  );
}

