import { useState } from "react";

export default function AddLecture() {
  const [lectureTitle, setLectureTitle] =
    useState("");

  return (
    <div className="rounded-2xl border p-6">

      <input
        type="text"
        placeholder="Lecture Title"
        value={lectureTitle}
        onChange={(e) =>
          setLectureTitle(e.target.value)
        }
        className="w-full rounded-xl border p-4"
      />

      <input
        type="file"
        className="mt-4 w-full rounded-xl border p-4"
      />

      <button className="mt-4 rounded-xl bg-[#2563EB] px-6 py-3 text-white">
        Upload Lecture
      </button>

    </div>
  );
}