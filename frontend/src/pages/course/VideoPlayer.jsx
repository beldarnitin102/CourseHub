import { useEffect } from "react";

export default function VideoPlayer({ selectedLecture }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [selectedLecture]);

  if (!selectedLecture) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-richblack-900 text-xl font-semibold text-white shadow-lg">
        Select a Lecture
      </div>
    );
  }

  const videoId =
    selectedLecture.videoUrl
      ?.split("v=")[1]
      ?.split("&")[0];

  return (
    <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">

      <div className="aspect-video">

        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={selectedLecture.title}
          frameBorder="0"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share
          "
          allowFullScreen
        />

      </div>

    </div>
  );
}