const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploder");

exports.createCourse = async (req, res) => {
  try {
    //fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tags,
      category,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    //validation

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tags ||
      !thumbnail
    ) {
      console.log(
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        tags,
        thumbnail,
      );
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
      courseDescription,
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
    const getcourseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!getcourseDetails) {
      return res.status(500).json({
        success: false,
        message: `could nor find the course with ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "course detail fetch succesfully ",
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
    });

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};
