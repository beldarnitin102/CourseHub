import { useState } from "react";
import { useSelector } from "react-redux";
import { createSection } from "../../services/operations/courseAPI";

export default function AddSection({
  courseId,
}) {
  const [sectionName, setSectionName] =
    useState("");

  const { token } = useSelector(
    (state) => state.auth
  );

  const handleAddSection =
    async () => {
      if (!sectionName) return;

      const result =
        await createSection(
          {
            sectionName,
            courseId,
          },
          token
        );

      if (result?.success) {
        setSectionName("");
      }
    };

  return (
    <div>

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

    </div>
  );
}