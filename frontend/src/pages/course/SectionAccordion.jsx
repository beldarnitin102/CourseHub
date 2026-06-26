import { useState } from "react";

export default function SectionAccordion({
  section,
  setSelectedLecture,
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4"
      >
        <span className="font-semibold">
          {section.sectionName}
        </span>

        <span>
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div>

          {section.subSections.map((lecture) => (
            <button
              key={lecture._id}
              onClick={() =>
                setSelectedLecture(lecture)
              }
              className="block w-full px-8 py-3 text-left transition hover:bg-blue-50"
            >
              📹 {lecture.title}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}