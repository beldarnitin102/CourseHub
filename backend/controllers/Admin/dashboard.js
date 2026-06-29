const User = require("../../models/User");
const Course = require("../../models/Course");
const Category = require("../../models/Category");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      accountType: "Student",
    });

    const totalInstructors = await User.countDocuments({
      accountType: "Instructor",
    });

    const totalAdmins = await User.countDocuments({
      accountType: "Admin",
    });

    const totalCourses = await Course.countDocuments();

    const totalCategories = await Category.countDocuments();

    const revenue = await Course.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
        },
      },
    ]);

    const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

    return res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalInstructors,
        totalAdmins,
        totalCourses,
        totalCategories,
        totalRevenue,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
