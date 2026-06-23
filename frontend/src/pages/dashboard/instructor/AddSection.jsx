import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createSection } from "../../services/operations/courseAPI";
import { setCourse } from "../../redux/slices/courseSlice";

import AddLecture from "./AddLecture";

export default function AddSection({
  courseId,
}) {
  const dispatch = useDispatch();

  const { token } = useSelector(
    (state) => state.auth
  );

  const { course } = useSelector(
    (state) => state.course
  );

  const [sectionName, setSectionName] =
    useState("");

  const handleAddSection = async () => {
    if (!sectionName.trim()) return;

    const result =
      await createSection(
        {
          sectionName,
          courseId,
        },
        token
      );

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
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold">
          {course?.courseName}
        </h2>

        <p className="text-gray-500">
          Build your course content
        </p>
      </div>

      <div className="rounded-2xl border p-6">

        <input
          type="text"
          placeholder="Enter Section Name"
          value={sectionName}
          onChange={(e) =>
            setSectionName(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-4"
        />

        <button
          onClick={handleAddSection}
          className="mt-4 rounded-xl bg-[#2563EB] px-6 py-3 text-white"
        >
          Add Section
        </button>

      </div>

      {course?.courseContent?.length >
      0 ? (
        course.courseContent.map(
          (section) => (
            <div
              key={section._id}
              className="rounded-2xl border p-6"
            >
              <h3 className="text-xl font-bold">
                {
                  section.sectionName
                }
              </h3>

              {section
                ?.subSection?.length >
                0 && (
                <div className="mt-4 space-y-2">
                  {section.subSection.map(
                    (
                      lecture
                    ) => (
                      <div
                        key={
                          lecture._id
                        }
                        className="rounded-lg bg-gray-100 p-3"
                      >
                        <p className="font-semibold">
                          {
                            lecture.title
                          }
                        </p>

                        <p className="text-sm text-gray-500">
                          {
                            lecture.description
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}

              <AddLecture
                sectionId={
                  section._id
                }
              />
            </div>
          )
        )
      ) : (
        <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
          No Sections Added Yet
        </div>
      )}
    </div>
  );
}