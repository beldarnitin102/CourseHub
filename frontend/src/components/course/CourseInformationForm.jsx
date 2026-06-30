import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCourse,
  getCategories,
  updateCourse,
} from "../../services/operations/courseAPI";
import { useDispatch } from "react-redux";
import { setCourse } from "../../redux/slices/courseSlice";

export default function CourseInformationForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [thumbnailImage, setThumbnailImage] = useState(null);

  const [categories, setCategories] = useState([]);

  const { course, editCourse } = useSelector((state) => state.course);

  const [formData, setFormData] = useState({
    courseName: "",
    courseDescirption: "",
    price: "",
    category: "",
    whatYouWillLearn: "",
    tags: "",
  });

  useEffect(() => {
    if (editCourse && course) {
      setFormData({
        courseName: course.courseName || "",
        courseDescirption: course.courseDescription || "",
        price: course.price || "",
        category: course.category?._id || course.category || "",
        whatYouWillLearn: course.whatYouWillLearn || "",
        tags: course.tags?.join(",") || course.tag?.join(",") || "",
      });
    }
  }, [course, editCourse]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();

    data.append("courseName", formData.courseName);

    data.append("courseDescirption", formData.courseDescirption);

    data.append("price", formData.price);

    data.append("category", formData.category);

    data.append("whatYouWillLearn", formData.whatYouWillLearn);

    data.append("tags", formData.tags);

    if (thumbnailImage) {
      data.append("thumbnailImage", thumbnailImage);
    }

    let result;

    if (editCourse) {
      data.append("courseId", course._id);

      result = await updateCourse(data, token);
    } else {
      result = await createCourse(data, token);
    }

    if (result?.success) {
      dispatch(setCourse(result.data));
      localStorage.setItem("courseId", result.data._id);
      navigate("/dashboard/instructor-courses");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();

      if (result?.success) {
        setCategories(result.data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-md">
      <div className="grid gap-6">
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <textarea
          rows="4"
          name="courseDescirption"
          placeholder="Course Description"
          value={formData.courseDescirption}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <textarea
          rows="4"
          name="whatYouWillLearn"
          placeholder="What Students Will Learn"
          value={formData.whatYouWillLearn}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          type="text"
          name="tags"
          placeholder="mern,javascript,node"
          value={formData.tags}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          type="file"
          onChange={(e) => setThumbnailImage(e.target.files[0])}
          className="w-full rounded-xl border p-4"
        />

        <button
          onClick={handleSubmit}
          className="rounded-xl bg-[#2563EB] py-4 font-semibold text-white"
        >
          {editCourse ? "Update Course" : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}
