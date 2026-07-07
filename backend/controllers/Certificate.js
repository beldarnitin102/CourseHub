const Certificate = require("../models/Certificate");
const { generateCertificate } = require("../services/certificate/generateCertificate");

// ==========================================
// Generate Certificate
// ==========================================

exports.generateCertificateController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    const certificate = await generateCertificate(userId, courseId);

    certificate = await Certificate.findById(certificate._id)
      .populate("student", "firstName lastName email")
      .populate("course", "courseName")
      .populate("instructor", "firstName lastName");

    return res.status(200).json({
      success: true,
      message: "Certificate generated successfully.",
      data: certificate,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// Get Certificate
// ==========================================

exports.getCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const certificate = await Certificate.findOne({
      student: userId,
      course: courseId,
    })
      .populate("student", "firstName lastName email")
      .populate("course", "courseName")
      .populate("instructor", "firstName lastName");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }
    

    return res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// Download Certificate (Placeholder)
// ==========================================

exports.downloadCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findById(certificateId);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "PDF generation will be added in the next phase.",
      data: certificate,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};