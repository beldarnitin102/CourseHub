const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP verified successfully");

    let info = await transporter.sendMail({
      from: `StudyNotion || Codehelp - by Nitin <beldarjon@11665422.brevosend.com>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    return info;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = mailSender;
