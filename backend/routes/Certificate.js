const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  generateCertificateController,
  getCertificate,
  downloadCertificate,
} = require("../controllers/Certificate");

// 1. Generate (POST /api/v1/certificate/generate)
router.post("/generate", auth, generateCertificateController);

// 2. Download (GET /api/v1/certificate/download/:certificateId) 
router.get("/download/:certificateId", auth, downloadCertificate);

// 3. Get Certificate (GET /api/v1/certificate/:courseId) - MUST BE AT THE BOTTOM
router.get("/:courseId", auth, getCertificate);

module.exports = router;
