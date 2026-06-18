const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const userid = req.userid;

    const { rating, review, courseId } = req.body;

    //check user enrolled or not
    const courseaDetails = await Course.findOne(
      { _id: courseId },
      { studentsEnrolled: { $elemMatch: { $eq: userid } } },
    );

    if (!courseaDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    //check user already not review the course
    const alreadyReviewd = await RatingAndReview.findOne({
      user: userid,
      course: courseId,
    });

    if (alreadyReviewd) {
      return res.status(403).json({
        success: false,
        message: "Course is already review by the User",
      });
    }

    const ratingReview = await RatingAndReview.create({
      rating: review,
      course: courseId,
      user: userid,
    });

    //update course and ratingreview

    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review succesfully updated",
      ratingReview,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    const result = await RatingAndReview.aggregate([
      {
        //entry match which can have course id of these
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if no ratingreview exist
    return res.status(200).json({
      success: true,
      message: "Average rating is 0 no rating given to you all",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllRatingAndReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email Image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All revies fetch succesfully",
      data: allReviews,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllRating = async (req,res) => {
  
}