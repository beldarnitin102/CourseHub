import SectionAccordion from "./SectionAccordion";

export default function VideoSidebar({
  sections,
  setSelectedLecture,
}) {
  return (
    <div className="h-full overflow-y-auto bg-white">

      <div className="border-b p-5">

        <h2 className="text-xl font-bold">
          Course Content
        </h2>

      </div>

      {sections.map((section) => (
        <SectionAccordion
          key={section._id}
          section={section}
          setSelectedLecture={setSelectedLecture}
        />
      ))}

    </div>
  );
}