// src/api/userRoutes.js
const express = require('express');
const  getUserProfile  = require('../controllers/userController').getUserProfile;
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware xác thực
const router = express.Router();


// Route để lấy thông tin người dùng
router.get('/profile', authMiddleware, getUserProfile); // Thêm middleware vào đây

module.exports = router;
