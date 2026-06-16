const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollementEmail,
} = require("../mail/templates/courseEnrollementEmail");
const { mongo, default: mongoose, trusted } = require("mongoose");

//capture payment and intiate razorpay
exports.capturePayment = async (req, res) => {
  // get courseId and UserID
  const { course_id } = req.body;
  const userid = req.body.course_id;
  // validation
  // valid CourseId
  if (!course_id) {
    return res.json({
      success: false,
      message: "Plased provide valid course Id",
    });
  }

  // valid Course Detail
  let course;
  try {
    course = await Course.findById(course_id);

    if (!course) {
      return res.json({
        success: false,
        message: "could not found the course",
      });
    }

    // user already pay for the same course

    //conversion of string to types
    const uid = new mongoose.Types.ObjectId(userid);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: " User alredy enrolled in the course",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  // order create

  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id,
      userid,
    },
  };

  try {
    //intiate the payment

    const paymentResponce = await instance.orders.create(options);
    console.log(paymentResponce);

    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponce.orderId,
      amount: paymentResponce.amount,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "could not intiate the order",
    });
  }
};

exports.verifySignature = async (req,res) => {
  const webhookSecret = "12345678"

  const signature = req.headers("x-razorpay-signature")

  const shasum = crypto.createHmac("sha256", webhookSecret)

  shasum.update(JSON.stringify(re.body))

  const digest = shasum.digest("hex")

  if(signature === digest){
    console.log("payment othorized")

    const {courseId , userId} = req.body.payload.payment.entity.notes

    try {
      //find course and enrolled init 

      const enrolleCourse = await Course.findOneAndUpdate(
        {_id : courseId},
        {$push: {studentsEnrolled:userId}},
        {new:true}
      )

      if(!enrolleCourse){
         return res.status(500).json({
      success: false,
      message: "course not found",
    });
      }

      //find the student and add course and list of enrolled courses 

      const enrolledStudent = await User.findOneAndUpdate(

        {_id:userId},
        {$push: {courses:courseId}},
        {new:true}
      )

      //mail send kardo confirmation wala 

      const emailResponce = await mailSender(
        enrolledStudent.email,
        "congratulation , you are onborded into new codehelp course"
      )

      return res.status(200).json({
      success: true,
      message:"signature verified and course added" ,
    });
    } catch (err) {
      console.log(err)
       return res.status(500).json({
      success: false,
      message: err.message,
    });
    }
  }
  else {
     return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
}
