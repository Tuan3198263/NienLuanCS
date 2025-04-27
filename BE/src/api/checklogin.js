const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); // Đảm bảo bạn có đúng đường dẫn
const { checkAuth } = require('../controllers/authController'); // Import controller, nhớ destructuring
const router = express.Router();

// Route kiểm tra đăng nhập
router.get('/check-auth', authMiddleware, checkAuth); // Sử dụng controller checkAuth

module.exports = router;
