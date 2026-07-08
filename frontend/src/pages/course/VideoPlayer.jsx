import { PlayCircle, Clock3, Maximize, Volume2, Wifi } from "lucide-react";

export default function VideoPlayer({ selectedLecture, onVideoEnd }) {
  if (!selectedLecture) return null;

  const getEmbedUrl = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);

    if (!match) return "";

    return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1&enablejsapi=1`;
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
      {/* Header */}

      <div className="flex items-center justify-between border-b bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {selectedLecture.title}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Clock3 size={16} />
              {selectedLecture.timeDuration}
            </div>

            <div className="flex items-center gap-2">
              <Wifi size={16} />
              HD Streaming
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button className="rounded-xl bg-slate-200 p-3 transition hover:bg-slate-300">
            <Volume2 size={20} />
          </button>

          <button className="rounded-xl bg-slate-200 p-3 transition hover:bg-slate-300">
            <Maximize size={20} />
          </button>
        </div>
      </div>

      {/* Video */}

      <div className="relative bg-black">
        <div className="aspect-video">
          <iframe
            title={selectedLecture.title}
            src={getEmbedUrl(selectedLecture.videoUrl)}
            className="h-full w-full"
            allowFullScreen
          />
        </div>

        {/* Floating Badge */}

        <div className="absolute left-5 top-5 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
          ▶ Now Watching
        </div>
      </div>

      {/* Footer */}

      <div className="flex flex-col gap-5 border-t bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            {selectedLecture.title}
          </h3>

          <p className="mt-2 max-w-3xl text-slate-500">
            Stay focused and complete this lecture before moving to the next
            lesson. Taking notes while watching will help you retain concepts
            much better.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 px-5 py-3 text-center">
            <p className="text-xs text-slate-500">Duration</p>

            <h3 className="font-bold text-violet-700">
              {selectedLecture.timeDuration}
            </h3>
          </div>

          <div className="rounded-2xl bg-yellow-100 px-5 py-3 text-center">
            <p className="text-xs text-slate-500">Status</p>

            <h3 className="font-bold text-yellow-700">Learning</h3>
          </div>
        </div>
      </div>
    </div>
  );
}