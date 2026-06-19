export default function VideoPlayer({
  selectedLecture,
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-black shadow-lg">

      <div className="aspect-video flex items-center justify-center text-white">

        {selectedLecture?.videoUrl ? (
          <video
            controls
            className="h-full w-full"
            src={selectedLecture.videoUrl}
          />
        ) : (
          <h2 className="text-2xl">
            Select a Lecture
          </h2>
        )}

      </div>

    </div>
  );
}