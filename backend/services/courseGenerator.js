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
exports.createCourseFromAI = async (aiData, videos, instructorId, categoryId) => {
  try {
    // ----------------------------------------------------------------
    // Build a fast lookup map: videoId -> video  (used to match
    // AI-assigned lectures back to the real YouTube metadata)
    // ----------------------------------------------------------------
    const videoMap = {};
    videos.forEach((video) => {
      videoMap[video.videoId] = video;
    });

    // ----------------------------------------------------------------
    // Pick the best available thumbnail from the playlist videos.
    // Use the first video's thumbnail; fall back to a placeholder if
    // none of the videos have a thumbnail URL.
    // ----------------------------------------------------------------
    const courseThumbnail =
      videos.find((v) => v.thumbnail)?.thumbnail ||
      "https://placehold.co/600x400/1a1a2e/ffffff?text=Course+Thumbnail";

    // ----------------------------------------------------------------
    // Create the top-level Course document
    // ----------------------------------------------------------------
    const course = await Course.create({
      courseName: aiData.courseName,
      courseDescirption: aiData.courseDescription, // matches model field (note: model has typo)
      whatYouWillLearn: Array.isArray(aiData.whatYouWillLearn)
        ? aiData.whatYouWillLearn.join("\n")
        : aiData.whatYouWillLearn || "",
      instructor: instructorId,
      category: categoryId,
      tags: Array.isArray(aiData.tags) ? aiData.tags : [],
      thumbnail: courseThumbnail,
      price: 0, // AI-generated courses are free by default
    });

    // ----------------------------------------------------------------
    // Create Sections and nested SubSections
    // ----------------------------------------------------------------
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

        // Use AI-generated description if present; otherwise use the
        // video's own YouTube description (truncated to 500 chars) or
        // a sensible default.
        const lectureDescription =
          lecture.description ||
          (matchedVideo?.description
            ? matchedVideo.description.slice(0, 500)
            : `Lecture: ${lecture.title}`);

        // Prefer the real YouTube URL from our fetched data to avoid
        // any URL manipulation by the AI model.
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

    // ----------------------------------------------------------------
    // Attach all sections to the course and persist
    // ----------------------------------------------------------------
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
