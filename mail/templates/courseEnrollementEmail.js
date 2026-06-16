exports.courseEnrollementEmail = (
  courseName,
  studentName
) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Course Enrollment Successful</title>

    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }

      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 30px;
        border-radius: 10px;
      }

      .heading {
        color: #2563eb;
        text-align: center;
      }

      .course-box {
        background: #eff6ff;
        border-left: 5px solid #2563eb;
        padding: 15px;
        margin: 20px 0;
      }

      .footer {
        margin-top: 30px;
        text-align: center;
        color: #666;
        font-size: 12px;
      }
    </style>
  </head>

  <body>
    <div class="container">

      <h2 class="heading">
        Enrollment Successful 🎉
      </h2>

      <p>Hello <strong>${studentName}</strong>,</p>

      <p>
        Congratulations! You have successfully enrolled in the following course:
      </p>

      <div class="course-box">
        <strong>${courseName}</strong>
      </div>

      <p>
        You can now access all course content, videos, and resources from your dashboard.
      </p>

      <p>
        We wish you a great learning journey and hope you achieve your goals.
      </p>

      <p>
        Happy Learning 🚀
      </p>

      <div class="footer">
        © ${new Date().getFullYear()} StudyNotion
      </div>

    </div>
  </body>
  </html>
  `;
};