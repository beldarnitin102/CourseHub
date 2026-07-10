const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

/**
 * Creates a full Course document (with Sections and SubSections) from
 * AI-generated data and the raw YouTube playlist video list.
 *
 * @param {Object} aiData        - Parsed JSON from the Groq AI response
 * @param {Array}  videos        - Raw video objects from youtubeService
 * @param {string} instructorId  - Authenticated instructor's user ID
 * @param {string} categoryId    - MongoDB ObjectId of the target category
 * @returns {Object}             - The saved Mongoose Course document
 */
exports.createCourseFromAI = async (
  aiData,
  videos,
  instructorId,
  categoryId,
   aiResources
) => {
  try {
    const videoMap = {};
    videos.forEach((video) => {
      videoMap[video.videoId] = video;
    });

    const courseThumbnail =
      videos.find((v) => v.thumbnail)?.thumbnail ||
      "https://placehold.co/600x400/1a1a2e/ffffff?text=Course+Thumbnail";

   const course = await Course.create({
    courseName: aiData.courseName,

    courseDescirption: aiData.courseDescription,

    whatYouWillLearn:
        Array.isArray(aiData.whatYouWillLearn)
            ? aiData.whatYouWillLearn.join("\n")
            : aiData.whatYouWillLearn || "",

    instructor: instructorId,

    category: categoryId,

    tags: Array.isArray(aiData.tags)
        ? aiData.tags
        : [],

    thumbnail: courseThumbnail,

    price: 15,

    aiResources
});

    const sectionIds = [];

    for (const section of aiData.sections) {
      const createdSection = await Section.create({
        sectionName: section.sectionName,
        subSection: [],
      });

      const subSectionIds = [];

      for (const lecture of section.lectures) {
        // Match by videoId (primary) then fall back to videoUrl lookup
        const matchedVideo =
          videoMap[lecture.videoId] ||
          videos.find((v) => v.videoUrl === lecture.videoUrl) ||
          null;

        const lectureDescription =
          lecture.description ||
          (matchedVideo?.description
            ? matchedVideo.description.slice(0, 500)
            : `Lecture: ${lecture.title}`);

        const lectureVideoUrl =
          matchedVideo?.videoUrl || lecture.videoUrl || "";

        await SubSection.create({
          title: lecture.title,
          description: lectureDescription,
          timeDuration: matchedVideo?.duration || "0",
          videoUrl: lectureVideoUrl,
        }).then((createdLecture) => {
          subSectionIds.push(createdLecture._id);
        });
      }

      createdSection.subSection = subSectionIds;
      await createdSection.save();
      sectionIds.push(createdSection._id);
    }

    course.courseContent = sectionIds;
    await course.save();

    // Return a fully populated course object
    return await Course.findById(course._id)
      .populate("instructor", "firstName lastName email image")
      .populate("category", "name description")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });
  } catch (error) {
    console.error("[courseGenerator] Error creating course:", error.message);
    throw error;
  }
};
