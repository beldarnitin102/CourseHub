const express = require("express")
const router = express.Router()

const {createCourse, getAllCourses, getCourseDetails} = require("../controllers/Course")

const {showAllCaregories, createCategories, categoryPageDetails} = require("../controllers/Catgorey")

const {createSection, updateSection, deleteSection } = require("../controllers/Section")

const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection")

const {createRating, getAverageRating, getAllRating, getAllRatingAndReview} = require("../controllers/RatingAndReview")

const {auth, isInstructor, isStudent,isAdmin} = require("../middleware/auth")

router.post("../createCourse", auth,isInstructor,createCourse)
router.post("../addSection", auth,isInstructor,createSection)
router.post("../updateSection", auth,isInstructor,updateSection)
router.post("../deleteSection", auth,isInstructor,deleteSection)

router.get("/getAllCourses", getAllCourses)

router.post("/createSubSection", createSubSection)
router.post("/updateSubSection", updateSubSection)
router.post("/deleteSubSection", deleteSubSection)


router.get("/showAllCatogories", showAllCaregories)
router.post("/getCategoryPageDetails", categoryPageDetails)

router.post("/createRating", auth,isStudent,createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingAndReview)