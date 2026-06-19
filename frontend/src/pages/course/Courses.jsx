import MainLayout from "../../components/layout/MainLayout";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Complete MERN Stack Development",
      instructor: "Nitin Beldar",
      price: "₹999",
      students: "2450",
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      instructor: "John Smith",
      price: "₹1499",
      students: "1890",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      instructor: "Sarah Wilson",
      price: "₹799",
      students: "3200",
    },
  ];

  return (
    <MainLayout>
      <section className="bg-[#F3F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-10 text-5xl font-bold text-[#111827]">
            Explore Courses
          </h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-3xl bg-white p-6 shadow-md"
              >
                <div className="mb-5 h-48 rounded-2xl bg-gray-200"></div>

                <h3 className="text-xl font-bold">
                  {course.title}
                </h3>

                <p className="mt-2 text-gray-500">
                  {course.instructor}
                </p>

                <div className="mt-4 flex justify-between">
                  <span>{course.students} Students</span>

                  <span className="font-bold text-[#2563EB]">
                    {course.price}
                  </span>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>
    </MainLayout>
  );
}