import Accordion from "./Accordion";

export default function CourseContent({ sections }) {
  return (
    <div className="mt-10">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Course Content
        </h2>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#2563EB]">
          {sections.length} Sections
        </span>

      </div>

      <div className="space-y-4">

        {sections.map((section) => (
          <Accordion
            key={section._id}
            section={section}
          />
        ))}

      </div>

    </div>
  );
}