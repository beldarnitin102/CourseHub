import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import CourseHero from "../../components/course/CourseHero";
import CourseSidebar from "../../components/course/CourseSidebar";
import CourseContent from "../../components/course/CourseContent";

import {
  getCourseDetails,
} from "../../services/operations/courseAPI";

export default function CourseDetails() {
  const { courseId } = useParams();

  const [course, setCourse] =
    useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    const result =
      await getCourseDetails(courseId);

    console.log(result);

    if (result?.success) {
      setCourse(result.data);
    }
  };

  if (!course) {
  return (
    <div className="p-10">
      Loading...
    </div>
  );
}

  return (
    
      <section className="bg-[#F3F4F6] py-16">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

            <div>

              <CourseHero
                course={course}
              />

              <div className="mt-10 rounded-3xl bg-white p-8 shadow-md">
                <h2 className="mb-5 text-3xl font-bold">
                  What You'll Learn
                </h2>

                <p>
                  {
                    course.whatYouWillLearn
                  }
                </p>
              </div>

              <CourseContent
                sections={
                  course.courseContent
                }
              />

            </div>

            <CourseSidebar
              thumbnail={
                course.thumbnail
              }
              price={course.price}
            />

          </div>

        </div>
      </section>
    
  );
}