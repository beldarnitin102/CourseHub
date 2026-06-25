const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createCourseFromAI = async (
  aiData,
  instructorId,
  categoryId
) => {
  try {

    // Create Course
    const course = await Course.create({
      courseName: aiData.courseName,
      courseDescription:
        aiData.courseDescription,

      whatYouWillLearn:
        aiData.whatYouWillLearn.join("\n"),

      instructor: instructorId,

      category: categoryId,

      tags: aiData.tags,

      thumbnail:
        "https://placehold.co/600x400/png",
    });

    const sectionIds = [];

    // Create Sections
    for (const section of aiData.sections) {

      const createdSection =
        await Section.create({
          sectionName:
            section.sectionName,
          subSection: [],
        });

      const subSectionIds = [];

      // Create Lectures
      for (const lecture of section.lectures) {

        const createdLecture =
          await SubSection.create({
            title: lecture,

            description:
              "AI Generated Lecture",

            timeDuration: "0",

            videoUrl: "",
          });

        subSectionIds.push(
          createdLecture._id
        );
      }

      createdSection.subSection =
        subSectionIds;

      await createdSection.save();

      sectionIds.push(
        createdSection._id
      );
    }

    course.courseContent =
      sectionIds;

    await course.save();

    return course;

  } catch (error) {
    throw error;
  }
};