export default function FeaturedCourses() {
  const featuredCourses = [
    {
      id: 1,
      title: "Complete MERN Stack Development",
      instructor: "Nitin Beldar",
      students: "2,450",
      rating: "4.8",
      price: "₹999",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },
    {
      id: 2,
      title: "AI & Machine Learning Bootcamp",
      instructor: "John Smith",
      students: "1,890",
      rating: "4.9",
      price: "₹1,499",
      image:
        "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      instructor: "Sarah Wilson",
      students: "3,120",
      rating: "4.7",
      price: "₹799",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-[#111827]">
            Featured Courses
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Most popular courses chosen by our learners.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid gap-8 lg:grid-cols-3">

          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Thumbnail */}
              <div className="h-56 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">

                <h3 className="line-clamp-2 text-xl font-bold text-[#111827]">
                  {course.title}
                </h3>

                <p className="mt-2 text-gray-500">
                  By {course.instructor}
                </p>

                {/* Rating + Students */}
                <div className="mt-4 flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">
                      ⭐
                    </span>

                    <span className="font-semibold">
                      {course.rating}
                    </span>
                  </div>

                  <span className="text-sm text-gray-500">
                    {course.students} Students
                  </span>

                </div>

                {/* Price */}
                <div className="mt-5 flex items-center justify-between">

                  <span className="text-2xl font-bold text-[#2563EB]">
                    {course.price}
                  </span>

                  <button className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-medium text-white transition hover:bg-blue-700">
                    Enroll
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <button className="rounded-xl border border-[#2563EB] px-8 py-3 font-semibold text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white">
            View All Courses
          </button>
        </div>

      </div>
    </section>
  );
}