import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createSection } from "../../services/operations/courseAPI";
import { setCourse } from "../../redux/slices/courseSlice";

import AddLecture from "./AddLecture";

export default function AddSection({ courseId }) {
  const [sectionName, setSectionName] =
    useState("");

  const dispatch = useDispatch();

  const { token } = useSelector(
    (state) => state.auth
  );

  const { course } = useSelector(
    (state) => state.course
  );

  console.log("COURSE =", course);

  const handleAddSection = async () => {
    if (!sectionName) return;

    const result = await createSection(
      {
        sectionName,
        courseId,
      },
      token
    );

    console.log(result);

    if (result?.success) {
      dispatch(
        setCourse(
          result.updatedCourseDetails
        )
      );

      setSectionName("");
    }
  };

  return (
    <div>
      {/* Course Name */}

      <h2 className="mb-2 text-xl font-semibold">
        Course:
        {" "}
        {course?.courseName}
      </h2>

      {/* Add Section Form */}

      <h2 className="mb-4 text-2xl font-bold">
        Add Section
      </h2>

      <input
        type="text"
        placeholder="Enter Section Name"
        value={sectionName}
        onChange={(e) =>
          setSectionName(e.target.value)
        }
        className="w-full rounded-xl border p-4"
      />

      <button
        onClick={handleAddSection}
        className="mt-4 rounded-xl bg-[#2563EB] px-6 py-3 text-white"
      >
        Add Section
      </button>

      {/* Sections List */}

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          Course Sections
        </h2>

        {course?.courseContent?.length >
        0 ? (
          course.courseContent.map(
            (section) => (
              <div
                key={section._id}
                className="mb-4 rounded-xl border p-4"
              >
                <h3 className="mb-4 font-bold">
                  {
                    section.sectionName
                  }
                </h3>

                <AddLecture
                  sectionId={
                    section._id
                  }
                />
              </div>
            )
          )
        ) : (
          <p className="text-gray-500">
            No sections added yet
          </p>
        )}
      </div>
    </div>
  );
}