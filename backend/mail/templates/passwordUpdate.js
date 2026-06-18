exports.passwordUpdated = (email, name) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Password Updated</title>
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
        color: #22c55e;
        text-align: center;
      }

      .info {
        margin-top: 20px;
        line-height: 1.6;
      }

      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <div class="container">

      <h2 class="heading">Password Updated Successfully</h2>

      <div class="info">
        <p>Hello ${name},</p>

        <p>
          Your StudyNotion account password has been updated successfully.
        </p>

        <p>
          Account Email: <strong>${email}</strong>
        </p>

        <p>
          If you made this change, no further action is required.
        </p>

        <p>
          If you did NOT change your password, please reset it immediately and contact support.
        </p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} StudyNotion. All rights reserved.
      </div>

    </div>
  </body>
  </html>
  `;
};