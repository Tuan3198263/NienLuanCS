const express = require("express");
const router = express.Router();
const { sendStatusEmail } = require("../controllers/emailController"); // Đảm bảo đúng đường dẫn

router.post("/send-status-email", sendStatusEmail); // sendStatusEmail phải được định nghĩa

module.exports = router;
