const express = require("express");
const router = express.Router();

const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  getInstructorCourses,
  getInstructorDashboard,
} = require("../controllers/Course");

const {
  showAllCatgorey,
  createCatgorey,
  categoriesPageDetails,
} = require("../controllers/Catgorey");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

const {
  createRating,
  getAverageRating,
  getAllRating,
  getAllRatingAndReview,
} = require("../controllers/RatingAndReview");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middleware/auth");



router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.get("/getAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.get("/instructorCourses", auth, isInstructor, getInstructorCourses);
router.get("/instructorDashboard", auth, isInstructor, getInstructorDashboard);

router.post("/createSubSection", createSubSection);
router.post("/updateSubSection", updateSubSection);
router.post("/deleteSubSection", deleteSubSection);

router.get("/showAllCatogories", showAllCatgorey);
router.post("/getCategoryPageDetails", categoriesPageDetails);
router.post("/createCatgorey", auth, isAdmin, createCatgorey);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRatingAndReview", getAllRatingAndReview);
router.get("/getAllRating", getAllRating);

module.exports = router;
