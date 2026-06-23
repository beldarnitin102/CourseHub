import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createSubSection } from "../../services/operations/courseAPI";
import { setCourse } from "../../redux/slices/courseSlice";

export default function AddLecture({
  sectionId,
}) {
  const dispatch = useDispatch();

  const { token } = useSelector(
    (state) => state.auth
  );

  const { course } = useSelector(
    (state) => state.course
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
      const result =
        await createSubSection(
          {
            sectionId,
            ...lectureData,
          },
          token
        );

      console.log(result);

      if (result?.success) {
        dispatch(
          setCourse(
            result.updatedCourse
          )
        );

        setLectureData({
          title: "",
          description: "",
          timeduration: "",
          videoUrl: "",
        });
      }
    };

  return (
    <div className="mt-6 rounded-2xl border bg-gray-50 p-6">

      <h4 className="mb-4 text-lg font-semibold">
        Add Lecture
      </h4>

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
        placeholder="https://youtube.com/watch?v=..."
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