export default function LectureContent({
  selectedLecture,
}) {
  if (!selectedLecture) return null;

  return (
    <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">

      <h2 className="text-3xl font-bold">
        {selectedLecture.title}
      </h2>

      <p className="mt-4 text-gray-600">
        {selectedLecture.description}
      </p>

    </div>
  );
}