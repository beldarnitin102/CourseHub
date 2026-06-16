const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required :true 
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default : Date.now(),
    expires : 5 * 60
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(email, "Verification of email from StudyNotion", otp)

    console.log("mail send succesfully",mailResponse)


  } catch (err) {
    console.log("error occuring while sending email", err)
    throw err
  }
}

otpSchema.pre("Save", async function(next) {
  await sendVerificationEmail(this.email, this.otp)
  next()
  
})

module.exports = mongoose.model("OTP", otpSchema);
