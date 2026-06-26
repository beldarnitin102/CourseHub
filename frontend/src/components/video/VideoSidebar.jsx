export default function VideoSidebar({
  sections,
  selectedLecture,
  setSelectedLecture,
}) {
  return (
    <div className="h-screen overflow-y-auto p-4">

      <h2 className="mb-5 text-2xl font-bold">
        Course Content
      </h2>

      {sections?.map((section) => (
        <div
          key={section._id}
          className="mb-5"
        >
          <h3 className="mb-2 font-bold">
            {section.sectionName}
          </h3>

          {section.subSection?.map(
            (lecture) => (
              <div
                key={lecture._id}
                onClick={() =>
                  setSelectedLecture(
                    lecture
                  )
                }
                className={`mb-2 cursor-pointer rounded p-2 ${
                  selectedLecture?._id ===
                  lecture._id
                    ? "bg-yellow-200"
                    : "bg-gray-100"
                }`}
              >
                <p className="font-medium">
                  {lecture.title}
                </p>

                <p className="text-xs text-gray-500">
                  {
                    lecture.timeDuration
                  }
                </p>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}