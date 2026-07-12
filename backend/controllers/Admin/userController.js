const User = require("../../models/User");
const Course = require("../../models/Course");
const CourseProgress = require("../../models/CourseProgress");

exports.getInstructorDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await User.findById(id) 
      .populate("additionalDetails")
      .select("-password");

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const courses = await Course.find({
      instructor: id,
    })
      .populate("studentsEnrolled", "_id")
      .populate("category", "name");

    let totalStudents = 0;
    let totalRevenue = 0;

    courses.forEach((course) => {
      totalStudents += course.studentsEnrolled.length;

      totalRevenue +=
        course.studentsEnrolled.length *
        course.price;
    });

    return res.status(200).json({
      success: true,
      data: {
        instructor,
        courses,
        stats: {
          totalCourses: courses.length,
          totalStudents,
          totalRevenue,
        },
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor details",
    });
  }
};

exports.getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findById(id)
      .populate("additionalDetails")
      .select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const enrolledCourses = await Course.find({
      studentsEnrolled: id,
    }).populate("instructor", "firstName lastName");

    const progress = await CourseProgress.find({
      userId: id,
    });

    let totalCompletedLectures = 0;

    progress.forEach((item) => {
      totalCompletedLectures += item.completedVideos.length;
    });

    return res.status(200).json({
      success: true,
      data: {
        student,
        enrolledCourses,
        stats: {
          totalCourses: enrolledCourses.length,
          completedLectures: totalCompletedLectures,
        },
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch student details",
    });
  }
};