const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploder");

exports.createCourse = async (req, res) => {
  try {
    //fetch data
    const {
      courseName,
      courseDescirption,
      whatYouWillLearn,
      price,
      tags,
      category,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    //validation

    if (
      !courseName ||
      !courseDescirption ||
      !whatYouWillLearn ||
      !price ||
      !tags ||
      !category ||
      !thumbnail
    ) {
      console.log(
        courseName,
        courseDescirption,
        whatYouWillLearn,
        price,
        tags,
        thumbnail,
      );
      console.log(req.body);
      return res.status(400).json({
        success: false,
        message: " All fileds are required",
      });
    }

    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: " Instructor details are not found",
      });
    }

    // check category valid or not

    const CategoreyDetails = await Category.findById(category);
    console.log("Category:", category);

    if (!CategoreyDetails) {
      console.log(err.message);
      return res.status(400).json({
        success: false,
        message: " category details are not found",
      });
    }

    //upload image to cloudinary

    const thumbnailuploder = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
    );

    //ENTRY CREATE FOR NEW COURSE

    const newCourse = await Course.create({
      courseName,
      courseDescirption,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      category: CategoreyDetails._id,
      tags,
      thumbnail: thumbnailuploder.secure_url,
    });

    //add course into the user schema of instructor

    await User.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true },
    );

    //update tags schema

    return res.status(200).json({
      success: true,
      message: " Course created succesfully",
      data: newCourse,
      courseId: newCourse._id,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: " Failure occur in creating course",
    });
    console.error(err);
  }
};

exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      },
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: " Data All courses fetch succesfully ",
      data: allCourses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: " Failure occur in creating course",
    });
    console.error(err);
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const getcourseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("studentsEnrolled")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    if (!getcourseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find course with id ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: getcourseDetails,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({
      instructor: instructorId,
    })
      .populate("category")
      .populate("studentsEnrolled")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor courses",
    });
  }
};

exports.getInstructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user.id,
    })
      .populate("studentsEnrolled")
      .sort({ createdAt: -1 });

    const totalCourses = courses.length;

    const totalStudents = courses.reduce(
      (acc, course) => acc + course.studentsEnrolled.length,
      0,
    );

    const recentCourses = courses.slice(0, 5);

    return res.status(200).json({
      success: true,
      data: {
        totalCourses,
        totalStudents,
        recentCourses,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};

exports.getInstructorCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate("courseContent")
      .populate("category");

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const {
      courseId,
      courseName,
      courseDescription,
      price,
      category,
      whatYouWillLearn,
      tags,
    } = req.body;

    const updateData = {
      courseName,
      courseDescription,
      price,
      category,
      whatYouWillLearn,
      tags,
    };

    if (req.files && req.files.thumbnailImage) {
      const thumbnail = await uploadImageToCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME,
      );

      updateData.thumbnail = thumbnail.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};
