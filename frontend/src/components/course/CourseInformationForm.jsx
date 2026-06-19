import { useState } from "react";

export default function CourseInformationForm() {
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    price: "",
    category: "",
    whatYouWillLearn: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-md">

      <div className="grid gap-6">

        <div>
          <label className="mb-2 block font-medium">
            Course Name
          </label>

          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Course Description
          </label>

          <textarea
            rows="5"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border p-4"
            >
              <option>Select Category</option>
              <option>Web Development</option>
              <option>AI & ML</option>
              <option>Data Science</option>
            </select>
          </div>

        </div>

        <div>
          <label className="mb-2 block font-medium">
            What Students Will Learn
          </label>

          <textarea
            rows="4"
            name="whatYouWillLearn"
            value={formData.whatYouWillLearn}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />
        </div>

        <button className="rounded-xl bg-[#2563EB] py-4 font-semibold text-white">
          Save & Continue
        </button>

      </div>

    </div>
  );
}