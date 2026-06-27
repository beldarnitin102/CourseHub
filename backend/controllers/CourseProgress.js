const CourseProgress = require("../models/CourseProgress");

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

    // First lecture of course

    if (!progress) {
      progress = await CourseProgress.create({
        userId,
        courseID: courseId,
        completedVideos: [lectureId],
        lastViewedVideo: lectureId,
      });

      return res.status(200).json({
        success: true,
        message: "Lecture marked completed",
        data: progress,
      });
    }

    // Prevent duplicate completion

    if (
      !progress.completedVideos.includes(lectureId)
    ) {
      progress.completedVideos.push(lectureId);
    }

    progress.lastViewedVideo = lectureId;

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Lecture marked completed",
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


exports.getCourseProgress = async (req, res) => {

  try {

    const { courseId } = req.params;

    const userId = req.user.id;

    const progress =
      await CourseProgress.findOne({
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

    let progress =
      await CourseProgress.findOne({
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