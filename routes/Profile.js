const express = require("express")
const router = express.Router()

const {auth} = require("../middleware/auth")

const {deleteAccount, UpdateProfile, getAllUserDetails, updateDisplayPicture, getEnrolledCourses} = require("../controllers/Profile")

router.delete("/deleteProfile", deleteAccount)
router.put("/updateProfile", auth, UpdateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router
