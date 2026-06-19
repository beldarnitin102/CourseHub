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
  };

  const sections = [
    {
      _id: 1,
      sectionName: "Introduction",

      subSections: [
        {
          _id: 11,
          title: "Welcome",
          description:
            "Course Overview",
        },

        {
          _id: 12,
          title: "Setup",
          description:
            "Install Tools",
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
          description:
            "Understanding Components",
        },

        {
          _id: 22,
          title: "Hooks",
          description:
            "React Hooks Deep Dive",
        },
      ],
    },
  ];

  return (
    <MainLayout>

      <section className="bg-[#F3F4F6] py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

            <div>

              <CourseHero course={course} />

              <div className="mt-12 rounded-3xl bg-white p-8 shadow-md">

                <h2 className="mb-4 text-3xl font-bold">
                  What You'll Learn
                </h2>

                <p className="text-gray-600">
                  Build complete full stack applications,
                  authentication systems, REST APIs,
                  payment integrations and deployment.
                </p>

              </div>

              <CourseContent sections={sections} />

            </div>

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