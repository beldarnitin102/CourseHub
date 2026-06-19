import { useState } from "react";

export default function Accordion({ section }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left"
      >
        <span className="font-semibold">
          {section.sectionName}
        </span>

        <span>
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="bg-white">

          {section.subSections.map((lecture) => (
            <div
              key={lecture._id}
              className="border-t px-5 py-4"
            >
              <p className="font-medium">
                📹 {lecture.title}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {lecture.description}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}