import { useState } from "react";
import { useSelector } from "react-redux";
import { createSubSection } from "../../services/operations/courseAPI";

export default function AddLecture({
  sectionId,
}) {
  const { token } = useSelector(
    (state) => state.auth
  );

  const [lectureData, setLectureData] =
    useState({
      title: "",
      description: "",
      timeduration: "",
      videoUrl: "",
    });

  const handleChange = (e) => {
    setLectureData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleAddLecture =
    async () => {
      const data = {
        sectionId,
        ...lectureData,
      };

      const result =
        await createSubSection(
          data,
          token
        );

      if (result?.success) {
        setLectureData({
          title: "",
          description: "",
          timeduration: "",
          videoUrl: "",
        });
      }
    };

  return (
    <div className="mt-6 rounded-2xl border p-6">

      <h3 className="mb-4 text-xl font-bold">
        Add Lecture
      </h3>

      <input
        type="text"
        name="title"
        placeholder="Lecture Title"
        value={lectureData.title}
        onChange={handleChange}
        className="mb-4 w-full rounded-xl border p-4"
      />

      <textarea
        rows="3"
        name="description"
        placeholder="Lecture Description"
        value={lectureData.description}
        onChange={handleChange}
        className="mb-4 w-full rounded-xl border p-4"
      />

      <input
        type="text"
        name="timeduration"
        placeholder="10 min"
        value={lectureData.timeduration}
        onChange={handleChange}
        className="mb-4 w-full rounded-xl border p-4"
      />

      <input
        type="text"
        name="videoUrl"
        placeholder="YouTube Video URL"
        value={lectureData.videoUrl}
        onChange={handleChange}
        className="mb-4 w-full rounded-xl border p-4"
      />

      <button
        onClick={handleAddLecture}
        className="rounded-xl bg-[#2563EB] px-6 py-3 text-white"
      >
        Add Lecture
      </button>

    </div>
  );
}