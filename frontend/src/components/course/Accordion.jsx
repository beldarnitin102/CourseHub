import { useState } from "react";

export default function Accordion({ section }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">

      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <div>

          <h3 className="text-lg font-semibold text-[#111827]">
            {section.sectionName}
          </h3>

          <p className="text-sm text-gray-500">
            {section.subSections.length} Lectures
          </p>

        </div>

        <span
          className={`text-xl transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>

      </button>

      {/* Content */}
      <div
        className={`transition-all duration-300 ${
          open
            ? "max-h-[500px]"
            : "max-h-0"
        } overflow-hidden`}
      >
        <div className="border-t border-gray-100">

          {section.subSections.map((lecture) => (
            <div
              key={lecture._id}
              className="flex items-center justify-between border-b border-gray-100 px-5 py-4"
            >

              <div>

                <h4 className="font-medium text-[#111827]">
                  {lecture.title}
                </h4>

                <p className="text-sm text-gray-500">
                  {lecture.description}
                </p>

              </div>

              <div className="flex items-center gap-2">

                <span className="text-sm text-gray-500">
                  Preview
                </span>

                <span>
                  🔒
                </span>

              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}