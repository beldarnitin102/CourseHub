import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Lock,
  BookOpen,
} from "lucide-react";

export default function VideoSidebar({
  sections,
  selectedLecture,
  setSelectedLecture,
}) {
  const [openSections, setOpenSections] = useState(
    sections?.reduce((acc, section) => {
      acc[section._id] = true;
      return acc;
    }, {}) || {},
  );

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Total lectures
  const totalLectures =
    sections?.reduce(
      (acc, section) => acc + section.subSection.length,
      0,
    ) || 0;

  return (
    <div className="flex h-screen flex-col bg-white">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="sticky top-0 z-30 border-b bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white">

        <h2 className="text-2xl font-bold">
          Course Content
        </h2>

        <p className="mt-1 text-sm text-violet-100">
          Learn step by step
        </p>

        {/* Progress Card */}

        <div className="mt-6 rounded-2xl bg-white/15 p-4 backdrop-blur">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-violet-100">
                Total Lectures
              </p>

              <h3 className="text-3xl font-bold">
                {totalLectures}
              </h3>

            </div>

            <BookOpen
              size={42}
              className="text-white/90"
            />

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* CONTENT */}
      {/* ========================= */}

      <div className="flex-1 overflow-y-auto">

        {sections?.map((section) => (
          <div
            key={section._id}
            className="border-b"
          >
            {/* Section */}

            <button
              onClick={() =>
                toggleSection(section._id)
              }
              className="flex w-full items-center justify-between px-5 py-4 transition hover:bg-slate-50"
            >
              <div className="text-left">

                <h3 className="font-semibold text-slate-800">
                  {section.sectionName}
                </h3>

                <p className="text-xs text-slate-500">
                  {section.subSection.length} Lessons
                </p>

              </div>

              {openSections[section._id] ? (
                <ChevronDown
                  size={20}
                  className="text-slate-500"
                />
              ) : (
                <ChevronRight
                  size={20}
                  className="text-slate-500"
                />
              )}
            </button>

            {/* Lectures */}

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSections[section._id]
                  ? "max-h-[900px]"
                  : "max-h-0"
              }`}
            >
              {section.subSection.map(
                (lecture, index) => {
                  const active =
                    selectedLecture?._id ===
                    lecture._id;

                  return (
                    <button
                      key={lecture._id}
                      onClick={() =>
                        setSelectedLecture(
                          lecture,
                        )
                      }
                      className={`group flex w-full items-center gap-4 border-l-4 px-5 py-4 text-left transition-all duration-300

                      ${
                        active
                          ? "border-violet-600 bg-violet-50"
                          : "border-transparent hover:border-violet-300 hover:bg-slate-50"
                      }`}
                    >
                      {/* Icon */}

                      <div>

                        {active ? (
                          <PlayCircle
                            size={22}
                            className="text-violet-600"
                          />
                        ) : (
                          <CheckCircle2
                            size={22}
                            className="text-slate-300 group-hover:text-violet-500"
                          />
                        )}

                      </div>

                      {/* Content */}

                      <div className="flex-1 overflow-hidden">

                        <p
                          className={`truncate font-semibold transition

                          ${
                            active
                              ? "text-violet-700"
                              : "text-slate-700"
                          }`}
                        >
                          {index + 1}.{" "}
                          {lecture.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {lecture.timeDuration}
                        </p>

                      </div>

                      {/* Current Badge */}

                      {active && (
                        <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                          Now
                        </span>
                      )}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <div className="border-t bg-slate-50 p-5">

        <div className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white">

          <p className="text-sm opacity-90">
            🚀 Keep Learning
          </p>

          <h3 className="mt-1 text-lg font-bold">
            Finish this course to unlock
            your certificate.
          </h3>

        </div>

      </div>
    </div>
  );
}