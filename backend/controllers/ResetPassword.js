const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto");
require("dotenv").config()

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "Your email is not register with us",
      });
    }

    const token = crypto.randomUUID();

    const updatedDetails = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true,
        //new true return the updated document from db
      },
    );

    const url = `${process.env.FRONTEND_URL}/update-password/${token}`;

    await mailSender(
      email,
      "password reset link",
      `password reset link ${url}`,
    );

    return res.json({
      success: true,
      message: "Email send Succesfully , please check email",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while sending password with email and pwd  ",
    });
  }
};


exports.resetPassword = async (req,res) => {
  //data fetch 
  //validation 
  //get user datail from token 
  //if no entry invalid detail 
  //token time check 
  //hash pwd 
  //password update


  try {
    
    const {password , confirmPassword, token } = req.body

  if(password !== confirmPassword) {
     return res.json({
      success: false,
      message: "Password is not matching",
    });
  }

  //get detail from db using token
  const userDetails = await User.findOne({token:token})

  if(!userDetails){
    return res.json({
      success: false,
      message: "token is invalid",
    });
  }

  if(userDetails.resetPasswordExpires < Date.now()) {
    return res.json({
      success: false,
      message: "token is expires pleased regenerated",
    });
  }

  //hash pass
  const hashedPassword = await bcrypt.hash(password,10)

  await User.findOneAndUpdate(
    { token:token },
  {password: hashedPassword},
{new:true})

 return res.status(200).json({
      success: true,
      message:
        "Password succesfully updated",
    });


  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message:
        "error getting in updating the password ",
    });

  }

}

