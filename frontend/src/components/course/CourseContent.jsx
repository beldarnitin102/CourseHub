import Accordion from "./Accordion";

export default function CourseContent({ sections }) {
  return (
    <div className="mt-10">

      <h2 className="mb-6 text-3xl font-bold">
        Course Content
      </h2>

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