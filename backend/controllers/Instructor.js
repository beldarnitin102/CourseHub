const User = require("../models/User");
const Course = require("../models/Course");

exports.getInstructorDashboard = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({
      instructor: instructorId,
    });

    let totalStudents = 0;

    courses.forEach((course) => {
      totalStudents += course.studentsEnrolled.length;
    });

    return res.status(200).json({
      success: true,
      data: {
        totalCourses: courses.length,
        totalStudents,
        recentCourses: courses.slice(-5).reverse(),
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Dashboard data fetch failed",
    });
  }
};