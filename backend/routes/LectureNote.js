const express = require("express");

const router = express.Router();

const {
  saveNote,
  getNote,
} = require("../controllers/LectureNote");

const { auth } = require("../middleware/auth");

router.post("/save-note", auth, saveNote);

router.get(
  "/get-note/:courseId/:lectureId",
  auth,
  getNote
);

module.exports = router;