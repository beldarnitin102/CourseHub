import { useState } from "react";

export default function AddLecture() {
  const [title, setTitle] =
    useState("");

  const [videoUrl, setVideoUrl] =
    useState("");

  return (
    <div className="rounded-2xl border p-6">

      <input
        type="text"
        placeholder="Lecture Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full rounded-xl border p-4"
      />

      <input
        type="text"
        placeholder="YouTube URL"
        value={videoUrl}
        onChange={(e) =>
          setVideoUrl(e.target.value)
        }
        className="mt-4 w-full rounded-xl border p-4"
      />

      <button className="mt-4 rounded-xl bg-[#2563EB] px-6 py-3 text-white">
        Add Lecture
      </button>

    </div>
  );
}