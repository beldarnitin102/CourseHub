import MainLayout from "../../layouts/MainLayout";
import { useSearchParams } from "react-router-dom";
import coursesData from "../../data/coursesData"; // Utilizing your external data file
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const categories = [
    "All",
    "Web Development",
    "AI & Machine Learning",
    "Data Science",
    "Cyber Security",
    "Cloud Computing",
    "Mobile Development",
  ];

  // Filter courses based on selected category query parameter
  const filteredCourses =
    selectedCategory && selectedCategory !== "All"
      ? coursesData.filter((course) => course.category === selectedCategory)
      : coursesData;

  // Handle smooth route search parameter updates without page refreshes
  const handleCategoryClick = (category) => {
    if (category === "All") {
      setSearchParams({}); // Clears the parameter
    } else {
      setSearchParams({ category }); // Sets ?category=...
    }
  };

  const navigate = useNavigate();

  return (
    <MainLayout>
      <section className="bg-[#F3F4F6] min-h-screen py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-10 text-5xl font-bold text-[#111827]">
            Explore Courses
          </h1>

          {/* 1. Categories Section (Placed neatly above the grid) */}
          <div className="mb-12 flex flex-wrap gap-3">
            {categories.map((category) => {
              // Highlight "All" button when no category parameter is present
              const isActive =
                selectedCategory === category ||
                (!selectedCategory && category === "All");

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`rounded-full px-5 py-2.5 font-medium transition-all shadow-sm cursor-pointer ${
                    isActive
                      ? "bg-[#2563EB] text-white"
                      : "bg-white text-[#4B5563] hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* 2. Courses Grid Display Layout */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl shadow-sm">
              <p className="text-xl text-gray-500">
                No courses found in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="cursor-pointer rounded-3xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* Course Banner Placeholder */}
                  <div className="mb-5 h-48 rounded-2xl bg-gray-200 overflow-hidden flex items-center justify-center">
                    <span className="text-gray-400">📚 Course Thumbnail</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111827] line-clamp-2 min-h-[3.5rem]">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-gray-500 text-sm">
                    By {course.instructor || "Nitin Beldar"}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm text-gray-500">
                      👥 {course.students || "0"} Students
                    </span>
                    <span className="text-xl font-bold text-[#2563EB]">
                      {course.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
