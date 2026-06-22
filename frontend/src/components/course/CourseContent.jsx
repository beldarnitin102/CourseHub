import { useState } from "react";

export default function CourseContent({
  sections = [],
}) {
  const [openSection, setOpenSection] =
    useState(null);

  const toggleSection = (id) => {
    if (openSection === id) {
      setOpenSection(null);
    } else {
      setOpenSection(id);
    }
  };

  return (
    <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">
      <h2 className="mb-6 text-3xl font-bold">
        Course Content
      </h2>

      {sections.length === 0 ? (
        <p>No Sections Found</p>
      ) : (
        sections.map((section) => (
          <div
            key={section._id}
            className="mb-4 overflow-hidden rounded-xl border"
          >
            <button
              onClick={() =>
                toggleSection(
                  section._id
                )
              }
              className="flex w-full items-center justify-between bg-gray-100 p-4"
            >
              <span className="font-semibold">
                {section.sectionName}
              </span>

              <span>
                {openSection ===
                section._id
                  ? "-"
                  : "+"}
              </span>
            </button>

            {openSection ===
              section._id && (
              <div className="p-4">
                {section.subSection?.map(
                  (lecture) => (
                    <div
                      key={
                        lecture._id
                      }
                      className="mb-3 rounded-lg border p-3"
                    >
                      <h3 className="font-semibold">
                        {
                          lecture.title
                        }
                      </h3>

                      <p className="text-sm text-gray-600">
                        {
                          lecture.description
                        }
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Duration:
                        {" "}
                        {
                          lecture.timeDuration
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}