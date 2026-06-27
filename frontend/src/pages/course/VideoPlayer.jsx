export default function VideoPlayer({
  selectedLecture,
  onVideoEnd,
}) {
  if (!selectedLecture) return null;

  const getEmbedUrl = (url) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    );

    if (!match) return "";

    return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&rel=0`;
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-black shadow-lg">

      <div className="aspect-video">

        <iframe
          title={selectedLecture.title}
          src={getEmbedUrl(selectedLecture.videoUrl)}
          className="h-full w-full"
          allowFullScreen
        />

      </div>

    </div>
  );
}