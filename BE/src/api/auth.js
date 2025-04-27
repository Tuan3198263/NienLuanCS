// src/api/auth.js
const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Tạo JWT Token
const createToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, 'your_secret_key', {
        expiresIn: '1h', // Token có hiệu lực trong 1 giờ
    });
};

// Đăng ký
router.post('/register', async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Tài khoản đã tồn tại!' });
        }

        // Tạo người dùng mới (không mã hóa mật khẩu)
        const newUser = new User({
            firstName,
            lastName,
            phone,
            email,
            password, // Lưu mật khẩu trực tiếp
        });

        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save();

        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Tài khoản không tồn tại' });
        }

        // So sánh mật khẩu trực tiếp
        if (user.password !== password) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        // Tạo token
        const token = createToken(user);

        // Gửi token về client
        res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user: { email: user.email, firstName: user.firstName, lastName: user.lastName },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Lỗi đăng nhập' });
    }
});

module.exports = router;
