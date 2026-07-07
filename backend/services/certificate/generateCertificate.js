const crypto = require("crypto");

const Certificate = require("../../models/Certificate");
const CourseProgress = require("../../models/CourseProgress");
const Course = require("../../models/Course");

exports.generateCertificate = async (userId, courseId) => {
  try {
    // Find progress
    const progress = await CourseProgress.findOne({
      userId,
      courseID: courseId,
    });

    if (!progress) {
      throw new Error("Course progress not found.");
    }

    // Already generated
    if (progress.certificate) {
      const existingCertificate = await Certificate.findById(
        progress.certificate
      );

      return existingCertificate;
    }

    // Get course
    const course = await Course.findById(courseId)
      .populate("courseContent")
      .populate("instructor");

    if (!course) {
      throw new Error("Course not found.");
    }

    // Count total lectures
    const totalLectures = course.courseContent.reduce(
      (total, section) =>
        total + (section.subSection?.length || 0),
      0
    );

    const completedLectures = progress.completedVideos.length;

    if (completedLectures !== totalLectures) {
      throw new Error(
        "Complete the course before generating the certificate."
      );
    }

    // Generate unique certificate id
    const certificateId =
      "CERT-" +
      crypto.randomBytes(4).toString("hex").toUpperCase();

    let instructorId = null;

    if (Array.isArray(course.instructor)) {
      // If it is an array, grab the first instructor's ID safely
      instructorId = course.instructor[0]?._id || course.instructor[0];
    } else {
      // If it's a single item/object
      instructorId = course.instructor?._id || course.instructor;
    }

    if (!instructorId) {
      throw new Error("No instructor found associated with this course.");
    }

    // Create certificate
    const certificate = await Certificate.create({
      student: userId,
      course: courseId,
      instructor:  instructorId,
      certificateId,
      completionDate: new Date(),
    });

    // Save reference
    progress.certificate = certificate._id;
    await progress.save();

    return certificate;
  } catch (err) {
    throw err;
  }
};