const express = require("express");

const router = express.Router();

const { auth } = require("../middleware/auth");

const {
  generateCertificateController,
  getCertificate,
  downloadCertificate,
} = require("../controllers/Certificate");

// ==========================================
// Generate Certificate
// ==========================================

router.post(
  "/generate",
  auth,
  generateCertificateController
);

// ==========================================
// Get Certificate
// ==========================================

router.get(
  "/:courseId",
  auth,
  getCertificate
);

// ==========================================
// Download Certificate
// ==========================================

router.get("/download/:certificateId", auth, downloadCertificate);

module.exports = router;