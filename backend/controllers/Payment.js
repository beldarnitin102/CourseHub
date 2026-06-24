const crypto = require("crypto");
const mongoose = require("mongoose");

const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");

const mailSender = require("../utils/mailSender");

const {
  courseEnrollementEmail,
} = require("../mail/templates/courseEnrollementEmail");

//capture payment and intiate razorpay
exports.capturePayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const uid = new mongoose.Types.ObjectId(userId);

    if (course.studentsEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "Student already enrolled",
      });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        courseId,
        userId,
      },
    };

    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      amount: paymentResponse.amount,
      currency: paymentResponse.currency,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifySignature = async (req, res) => {
try {
  console.log("VERIFY HIT");
console.log(req.body);
console.log(req.user);
const {
razorpay_order_id,
razorpay_payment_id,
razorpay_signature,
courseId,
} = req.body;


const userId = req.user.id;

const body =
  razorpay_order_id +
  "|" +
  razorpay_payment_id;

const expectedSignature =
  crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_SECRET
    )
    .update(body.toString())
    .digest("hex");

if (
  expectedSignature !==
  razorpay_signature
) {
  return res.status(400).json({
    success: false,
    message: "Payment Verification Failed",
  });
}
console.log("Adding student to course");
const enrolledCourse =
  await Course.findByIdAndUpdate(
    courseId,
    {
      $addToSet: {
        studentsEnrolled: userId,
      },
    },
    { new: true }
  );
console.log("Student added successfully");
if (!enrolledCourse) {
  return res.status(404).json({
    success: false,
    message: "Course Not Found",
  });
}

const enrolledStudent =
  await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        courses: courseId,
      },
    },
    { new: true }
  );

if (!enrolledStudent) {
  return res.status(404).json({
    success: false,
    message: "Student Not Found",
  });
}

await mailSender(
  enrolledStudent.email,
  "Course Enrollment Successful",
  courseEnrollementEmail(
    enrolledCourse.courseName,
    `${enrolledStudent.firstName}
     ${enrolledStudent.lastName}`
  )
);

return res.status(200).json({
  success: true,
  message:
    "Payment Verified Successfully",
});


} catch (error) {
console.log(error);


return res.status(500).json({
  success: false,
  message: error.message,
});


}
};

