const express = require("express");
const router = express.Router();

const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  getInstructorCourses,
  getInstructorDashboard,
  getInstructorCourse,
  updateCourse,
  deleteCourse,
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

const { askMentor } = require("../controllers/Mentor");
const { getRecommendations } = require("../controllers/Recommendation");
const { generateStudyPlan } = require("../controllers/StudyPlanner");
const { generateInterviewMode } = require("../controllers/Interview");

router.post("/generate-interview", auth, generateInterviewMode);
router.post("/recommendations", auth, getRecommendations);
router.post("/generateStudyPlanner", auth, isStudent, generateStudyPlan);
router.post("/mentor", auth, askMentor);
router.post("/createCourse", auth, isInstructor, createCourse); 
router.post("/updateCourse", auth, isInstructor, updateCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.get("/getAllCourses", showAllCourses);
router.get("/getCourseDetails/:courseId", getCourseDetails);
router.get("/instructorCourses", auth, isInstructor, getInstructorCourses);
router.get(
  "/instructorCourse/:courseId",
  auth,
  isInstructor,
  getInstructorCourse,
);
router.get("/instructorDashboard", auth, isInstructor, getInstructorDashboard);

router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

router.post("/createSubSection", auth, isInstructor, createSubSection);

router.post("/updateSubSection", auth, isInstructor, updateSubSection);

router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.get("/showAllCatogories", showAllCatgorey);
router.post("/getCategoryPageDetails", categoriesPageDetails);
router.post("/createCatgorey", auth, isAdmin, createCatgorey);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRatingAndReview", getAllRatingAndReview);
router.get("/getAllRating", getAllRating);

module.exports = router;
