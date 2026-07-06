const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const Certificate = require("../models/Certificate");

const {
  generateCertificateData,
} = require("../services/certificate/generateCertificate");

exports.markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;
    const userId = req.user.id;

    if (!courseId || !lectureId) {
      return res.status(400).json({
        success: false,
        message: "Course ID and Lecture ID are required",
      });
    }

    let progress = await CourseProgress.findOne({
      userId,
      courseID: courseId,
    });

    // First lecture
    if (!progress) {
      progress = await CourseProgress.create({
        userId,
        courseID: courseId,
        completedVideos: [lectureId],
        lastViewedVideo: lectureId,
      });
    } else {
      // Prevent duplicate completion
      const alreadyCompleted = progress.completedVideos.some(
        (id) => id.toString() === lectureId,
      );

      if (!alreadyCompleted) {
        progress.completedVideos.push(lectureId);
      }

      progress.lastViewedVideo = lectureId;

      await progress.save();
    }

    // ===========================
    // Certificate Generation Logic
    // ===========================

    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    const totalLectures = course.courseContent.reduce(
      (acc, section) => acc + section.subSection.length,
      0,
    );

    const completedCount = progress.completedVideos.length;

    let certificateUnlocked = false;

    if (completedCount === totalLectures) {
      let certificate = await Certificate.findOne({
        student: userId,
        course: courseId,
      });

      if (!certificate) {
        const certificateData = await generateCertificateData(userId, courseId);

        certificate = await Certificate.create({
          student: certificateData.student,
          course: certificateData.course,
          instructor: certificateData.instructor,
          certificateId: certificateData.certificateId,
          completionDate: certificateData.completionDate,
        });
      }

      certificateUnlocked = true;
    }

    return res.status(200).json({
      success: true,
      message: "Lecture marked completed",
      data: progress,
      certificateUnlocked,
      progressPercentage: Math.round((completedCount / totalLectures) * 100),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    const userId = req.user.id;

    const progress = await CourseProgress.findOne({
      userId,
      courseID: courseId,
    }).populate("completedVideos");

    if (!progress) {
      return res.status(200).json({
        success: true,
        data: {
          completedVideos: [],
          lastViewedVideo: null,
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateLastViewedLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;

    const userId = req.user.id;

    let progress = await CourseProgress.findOne({
      userId,
      courseID: courseId,
    });

    if (!progress) {
      progress = await CourseProgress.create({
        userId,
        courseID: courseId,
        completedVideos: [],
        lastViewedVideo: lectureId,
      });
    } else {
      progress.lastViewedVideo = lectureId;

      await progress.save();
    }

    return res.status(200).json({
      success: true,
      message: "Last viewed lecture updated",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
