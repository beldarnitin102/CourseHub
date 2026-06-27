const express = require("express");
const router = express.Router();

const {
 generateCourseFromPlaylist
} = require("../controllers/AIController");
const { auth, isInstructor } =
require("../middleware/auth");


router.post(
 "/generate-course", auth,
  isInstructor,
 generateCourseFromPlaylist
);

module.exports = router;
