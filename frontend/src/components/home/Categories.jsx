import { useNavigate } from "react-router-dom";

export default function Categories() {
  // 1. Hooks must be declared here, inside the component but BEFORE the return statement
  const navigate = useNavigate();
  
  const categories = [
    {
      title: "Web Development",
      icon: "💻",
      courses: "120+ Courses",
    },
    {
      title: "AI & Machine Learning",
      icon: "🤖",
      courses: "80+ Courses",
    },
    {
      title: "Data Science",
      icon: "📊",
      courses: "65+ Courses",
    },
    {
      title: "Cyber Security",
      icon: "🔒",
      courses: "45+ Courses",
    },
    {
      title: "Cloud Computing",
      icon: "☁️",
      courses: "50+ Courses",
    },
    {
      title: "Mobile Development",
      icon: "📱",
      courses: "70+ Courses",
    },
  ];

  return (
    <section className="bg-[#F3F4F6] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-[#111827]">
            Explore Categories
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Choose a learning path that matches your goals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <div
              key={category.title}
              className="group rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 text-5xl">
                {category.icon}
              </div>

              <h3 className="text-xl font-bold text-[#111827]">
                {category.title}
              </h3>

              <p className="mt-2 text-gray-500">
                {category.courses}
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/courses?category=${encodeURIComponent(
                      category.title
                    )}`
                  )
                }
                className="mt-6 font-semibold text-[#2563EB] cursor-pointer"
              >
                Explore →
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}