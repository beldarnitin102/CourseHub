const Course = require("../models/Course"); // Import your Course model
const { generateProjects } = require("../services/ai/projectGenerator"); // Path to your Cohere service file

exports.generateCourseProjectsController = async (req, res) => {
  try {
    // 1. Extract courseId from body matching frontend payload { courseId }
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // 2. Fetch full course context from database to feed into Cohere context prompt
    const courseData = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseData) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 3. Call your generation helper service routine logic block
    const generatedOutput = await generateProjects(courseData);

    // 4. Return the formatted response matching your frontend's parsing structure
    return res.status(200).json({
      success: true,
      message: "Projects generated successfully",
      data: generatedOutput.projects || generatedOutput, // Fallback safety layer
    });

  } catch (error) {
    console.error("Project Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to compile AI generated projects",
    });
  }
};
