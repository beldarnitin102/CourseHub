const express = require("express");
const router = express.Router();

const {
 generateCourseFromPlaylist
} = require("../controllers/AIController");

router.post(
 "/generate-course",
 generateCourseFromPlaylist
);

module.exports = router;