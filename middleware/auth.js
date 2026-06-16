const jwt = require("jsonwebtoken")
require("dotenv").config
const User = require("../models/User")

//token get from body , cokkies , bearer token and best way to get bearer token and avoid from body 

exports.auth = async(req,res,next) => {

  try {
    
    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer","")

    if(!token) {
      return res.status(401).json({
        success : false,
        message : "Token is missing"
      })
    }
     
    //verification of token 

    try {
      const decode = jwt.verify(token , process.env.JWT_SECRET)
      req.user = decode

    } catch (err) {
      return res.status(401).json({
        success : false,
        message : "Token is invalid"
      })
    }

    next()


  } catch (err) {
    console.log(err)
    return res.status(401).json({
        success : false,
        message : "something went wrong with validating the token"
      })
  }
}

exports.isStudent = async (req,res,next) => {
  try {
    
    if(req.user.accountType !== "Student") {
      return res.status(401).json({
        success : false,
        message : "This is protected routes for Students only"
      })
    }

    next()
  } catch (err) {
    return res.status(500).json({
        success : false,
        message : "User role cannot be verified pleased try again"
      })
  }
}

exports.isInstructor = async (req,res,next) => {
  try {
    
    if(req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success : false,
        message : "This is protected routes for Instructr only"
      })
    }

    next()
  } catch (err) {
    return res.status(500).json({
        success : false,
        message : "User role cannot be verified pleased try again"
      })
  }
}

exports.isAdmin = async (req,res,next) => {
  try {
    
    if(req.user.accountType !== "Admin") {
      return res.status(401).json({
        success : false,
        message : "This is protected routes for Admin only"
      })
    }

    next()
  } catch (err) {
    return res.status(500).json({
        success : false,
        message : "User role cannot be verified pleased try again"
      })
  }
}