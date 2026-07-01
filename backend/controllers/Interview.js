const Course = require("../models/Course");

const {
  generateInterview,
} = require("../services/ai/interviewGenerator");

exports.generateInterviewMode = async (req, res) => {
  try {

    const { courseId } = req.body;

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const interview = await generateInterview(course);

    course.aiResources.interviewMode = interview;

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Interview Mode generated successfully.",
      data: interview,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};