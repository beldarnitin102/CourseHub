const PDFDocument = require("pdfkit");

exports.generateCertificatePDF = (certificate, res) => {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
    margin: 40,
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${certificate.certificateId}.pdf"`
  );

  doc.pipe(res);

  // Background

  doc.rect(0, 0, doc.page.width, doc.page.height)
    .fill("#F8FAFC");

  // Outer Border

  doc
    .lineWidth(8)
    .strokeColor("#2563EB")
    .rect(
      20,
      20,
      doc.page.width - 40,
      doc.page.height - 40
    )
    .stroke();

  // Inner Border

  doc
    .lineWidth(2)
    .strokeColor("#CBD5E1")
    .rect(
      35,
      35,
      doc.page.width - 70,
      doc.page.height - 70
    )
    .stroke();

  // Logo / Brand

  doc
    .fontSize(30)
    .fillColor("#2563EB")
    .font("Helvetica-Bold")
    .text("StudyNotion", {
      align: "center",
    });

  doc.moveDown();

  // Title

  doc
    .fontSize(34)
    .fillColor("#111827")
    .font("Helvetica-Bold")
    .text("CERTIFICATE OF COMPLETION", {
      align: "center",
    });

  doc.moveDown(2);

  doc
    .fontSize(18)
    .fillColor("#374151")
    .font("Helvetica")
    .text("This Certificate is proudly presented to", {
      align: "center",
    });

  doc.moveDown();

  // Student Name

  doc
    .fontSize(32)
    .fillColor("#111827")
    .font("Helvetica-Bold")
    .text(certificate.student.fullName, {
      align: "center",
      underline: true,
    });

  doc.moveDown(1.5);

  doc
    .fontSize(18)
    .font("Helvetica")
    .text(
      "for successfully completing the course",
      {
        align: "center",
      }
    );

  doc.moveDown();

  // Course Name

  doc
    .fontSize(26)
    .fillColor("#2563EB")
    .font("Helvetica-Bold")
    .text(certificate.course.courseName, {
      align: "center",
    });

  doc.moveDown(2);

  // Bottom Details

  const leftX = 80;
  const rightX = 520;
  const y = 430;

  doc
    .fontSize(14)
    .fillColor("#374151")
    .font("Helvetica-Bold");

  doc.text(
    `Completion Date`,
    leftX,
    y
  );

  doc.font("Helvetica");

  doc.text(
    new Date(
      certificate.completionDate
    ).toLocaleDateString(),
    leftX,
    y + 20
  );

  doc
    .font("Helvetica-Bold")
    .text(
      "Certificate ID",
      rightX,
      y
    );

  doc
    .font("Helvetica")
    .text(
      certificate.certificateId,
      rightX,
      y + 20
    );

  // Signature

  doc
    .moveTo(280, 470)
    .lineTo(430, 470)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .text(
      "StudyNotion",
      305,
      480
    );

  doc
    .font("Helvetica")
    .fontSize(12)
    .text(
      "Authorized Signature",
      290,
      500
    );

  doc.end();
};