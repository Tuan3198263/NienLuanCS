// src/api/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// đăng kí
router.post('/register', async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Tài khoản đã tồn tại!' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword,
        });

        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save();

        res.status(201).json({ message: 'Đăng kí thành công!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




// Handler kiểm tra việc đăng nhập
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng trong CSDL
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Tài khoản không tồn tại' });
        }

        // So sánh mật khẩu
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        // Đăng nhập thành công
        res.status(200).json({ message: 'Đăng nhập thành công', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Lỗi đăng nhập' });
    }
});

module.exports = router;
