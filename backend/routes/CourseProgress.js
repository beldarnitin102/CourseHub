const express = require("express");

const router = express.Router();

const {
  markLectureComplete,
  getCourseProgress,
  updateLastViewedLecture,
} = require("../controllers/CourseProgress");

const { auth } = require("../middleware/auth");

// Mark lecture completed
router.post(
  "/mark-complete",
  auth,
  markLectureComplete
);

// Get course progress
router.get(
  "/:courseId",
  auth,
  getCourseProgress
);

// Update last viewed lecture
router.post(
  "/last-viewed",
  auth,
  updateLastViewedLecture
);

module.exports = router;