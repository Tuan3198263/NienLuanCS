require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Đây phải là "gmail", không phải "Mail"
  auth: {
    user: process.env.EMAIL_USER,  // Địa chỉ email của bạn
    pass: process.env.EMAIL_PASS,  // Mật khẩu ứng dụng của bạn
  },
});

module.exports = transporter;