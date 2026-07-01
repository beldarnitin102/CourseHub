const Course = require("../models/Course");
const { generateStudyPlanner } = require("../services/ai/studyPlannerGenerator");

exports.generateStudyPlan = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

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

    const planner = await generateStudyPlanner(course);

    course.aiResources.studyPlanner = planner;

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Study Planner generated successfully.",
      data: planner,
    });

  } catch (error) {

    console.error("Study Planner Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};