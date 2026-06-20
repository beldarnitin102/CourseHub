import MainLayout from "../../layouts/MainLayout";
import CourseHero from "../../components/course/CourseHero";
import CourseSidebar from "../../components/course/CourseSidebar";
import CourseContent from "../../components/course/CourseContent";

export default function CourseDetails() {
  const course = {
    courseName: "Complete MERN Stack Development",

    courseDescription:
      "Master React, Node.js, Express and MongoDB by building real-world projects.",

    instructor: "Nitin Beldar",

    category: "Web Development",

    rating: 4.8,

    studentsEnrolled: 2450,

    price: 999,

    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",

    learn: [
      "Build Full Stack MERN Applications",
      "Create REST APIs",
      "JWT Authentication",
      "Cloudinary File Uploads",
      "Razorpay Integration",
      "Deploy Production Applications",
    ],
  };

  const sections = [
    {
      _id: 1,
      sectionName: "Introduction",

      subSections: [
        {
          _id: 11,
          title: "Welcome",
          description: "Course Overview",
        },

        {
          _id: 12,
          title: "Setup",
          description: "Install Tools",
        },
      ],
    },

    {
      _id: 2,
      sectionName: "React Fundamentals",

      subSections: [
        {
          _id: 21,
          title: "Components",
          description: "Understanding Components",
        },

        {
          _id: 22,
          title: "Hooks",
          description: "React Hooks Deep Dive",
        },
      ],
    },

    {
      _id: 3,
      sectionName: "Backend Development",

      subSections: [
        {
          _id: 31,
          title: "Express Server",
          description: "Creating APIs",
        },

        {
          _id: 32,
          title: "MongoDB",
          description: "Database Integration",
        },
      ],
    },
  ];

  return (
    <MainLayout>
      <section className="bg-[#F3F4F6] py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

            {/* LEFT */}
            <div>

              <CourseHero course={course} />

              {/* What You'll Learn */}
              <div className="mt-12 rounded-3xl bg-white p-8 shadow-md">

                <h2 className="mb-6 text-3xl font-bold text-[#111827]">
                  What You'll Learn
                </h2>

                <div className="grid gap-4 md:grid-cols-2">

                  {course.learn.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="text-green-600">
                        ✓
                      </span>

                      <p className="text-gray-700">
                        {item}
                      </p>
                    </div>
                  ))}

                </div>

              </div>

              {/* Requirements */}
              <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">

                <h2 className="mb-5 text-3xl font-bold">
                  Requirements
                </h2>

                <ul className="space-y-3 text-gray-600">

                  <li>
                    • Basic Computer Knowledge
                  </li>

                  <li>
                    • Internet Connection
                  </li>

                  <li>
                    • Passion To Learn
                  </li>

                </ul>

              </div>

              {/* Course Content */}
              <CourseContent sections={sections} />

            </div>

            {/* RIGHT SIDEBAR */}
            <CourseSidebar
              thumbnail={course.thumbnail}
              price={course.price}
            />

          </div>

        </div>

      </section>
    </MainLayout>
  );
}