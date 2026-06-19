export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      image: "https://i.pravatar.cc/150?img=11",
      review:
        "CourseHub helped me transition from a beginner to a professional developer. The projects and mentorship were incredibly valuable.",
    },
    {
      name: "Priya Patel",
      role: "Data Analyst",
      image: "https://i.pravatar.cc/150?img=32",
      review:
        "The structured learning path and hands-on assignments gave me confidence to crack interviews and land my first job.",
    },
    {
      name: "Aman Verma",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=15",
      review:
        "One of the best learning platforms I've used. The course quality and support are outstanding.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#2563EB]">
            Success Stories
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#111827]">
            What Our Learners Say
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Thousands of students are achieving their goals with CourseHub.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-[#111827]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>

              </div>

              <div className="mt-5 flex">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="mt-4 leading-relaxed text-gray-600">
                "{item.review}"
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}