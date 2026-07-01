const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const { askMentor } = require("../controllers/Mentor");

router.post("/ask", auth, askMentor);

module.exports = router;