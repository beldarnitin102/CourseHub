import { useState } from "react";

export default function AddSection() {
  const [sectionName, setSectionName] = useState("");

  return (
    <div className="rounded-2xl border p-6">

      <input
        type="text"
        placeholder="Enter Section Name"
        value={sectionName}
        onChange={(e) =>
          setSectionName(e.target.value)
        }
        className="w-full rounded-xl border p-4"
      />

      <button className="mt-4 rounded-xl bg-[#2563EB] px-6 py-3 text-white">
        Add Section
      </button>

    </div>
  );
}