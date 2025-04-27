// src/api/favoriteRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware để kiểm tra token
const favoriteController = require('../controllers/favoriteController');

// Route để thêm công việc vào danh sách yêu thích
router.post('/toggle'  , authMiddleware, favoriteController.toggleFavorite);

// Route để lấy danh sách công việc yêu thích của người dùng
router.get('/list', authMiddleware, favoriteController.getFavorites);

module.exports = router;
