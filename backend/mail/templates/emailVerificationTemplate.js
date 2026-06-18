exports.emailVerificationTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Email Verification</title>
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
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .logo {
              text-align: center;
              font-size: 28px;
              font-weight: bold;
              color: #4f46e5;
              margin-bottom: 20px;
          }

          .otp-box {
              background: #4f46e5;
              color: white;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 5px;
              text-align: center;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
          }

          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #777;
              text-align: center;
          }
      </style>
  </head>

  <body>
      <div class="container">

          <div class="logo">
              StudyNotion
          </div>

          <h2>Email Verification</h2>

          <p>
              Thank you for signing up with StudyNotion.
              Use the OTP below to verify your email address.
          </p>

          <div class="otp-box">
              ${otp}
          </div>

          <p>
              This OTP is valid for <strong>5 minutes</strong>.
          </p>

          <p>
              If you did not request this verification, please ignore this email.
          </p>

          <div class="footer">
              © ${new Date().getFullYear()} StudyNotion. All rights reserved.
          </div>

      </div>
  </body>
  </html>
  `;
};