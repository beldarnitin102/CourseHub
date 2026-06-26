import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
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
    }, {}) || {}
  );

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex h-screen flex-col bg-white">

      {/* Header */}

      <div className="sticky top-0 z-20 border-b bg-white p-5 shadow-sm">

        <h2 className="text-2xl font-bold text-slate-800">
          Course Content
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {sections?.length || 0} Sections
        </p>

      </div>

      {/* Sections */}

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
              className="flex w-full items-center justify-between bg-slate-100 px-5 py-4 text-left transition hover:bg-slate-200"
            >

              <div>

                <h3 className="font-semibold text-slate-800">
                  {section.sectionName}
                </h3>

                <p className="text-xs text-gray-500">
                  {section.subSection.length} Lectures
                </p>

              </div>

              {openSections[section._id] ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}

            </button>

            {/* Lectures */}

            {openSections[section._id] && (

              <div className="bg-white">

                {section.subSection.map((lecture) => {

                  const active =
                    selectedLecture?._id ===
                    lecture._id;

                  return (
                    <button
                      key={lecture._id}
                      onClick={() =>
                        setSelectedLecture(
                          lecture
                        )
                      }
                      className={`flex w-full items-center gap-3 border-l-4 px-5 py-3 text-left transition

                      ${
                        active
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-transparent hover:bg-slate-50"
                      }
                    `}
                    >

                      <PlayCircle
                        size={20}
                        className={
                          active
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }
                      />

                      <div className="flex-1 overflow-hidden">

                        <p
                          className={`truncate font-medium ${
                            active
                              ? "text-yellow-700"
                              : "text-slate-700"
                          }`}
                        >
                          {lecture.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {lecture.timeDuration}
                        </p>

                      </div>

                    </button>
                  );
                })}

              </div>

            )}

          </div>
        ))}

      </div>

    </div>
  );
}